const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let EmailVerification = require("supertokens-node/recipe/emailverification");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const { BooleanClaim } = require("supertokens-node/recipe/session/claims");

const RealPasswordClaim = new BooleanClaim({
    fetchValue: () => false,
    key: "uses-real-password",
});

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

/* unique password which will act as a place holder password 
for this user until they have actually set a password. This will also indicate to the 
other backend APIs that the user hasn't fully signed up yet. */
const FAKE_PASSWORD = "fakeUniqueSuperTokensRandomPass-sdfa452sadf342-24352";

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailVerification.init({ mode: "REQUIRED" }),
        ThirdPartyEmailPassword.init({
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        thirdPartySignInUpPOST: async (input) => {
                            const res = await oI.thirdPartySignInUpPOST(input);
                            await res.session.setClaimValue(RealPasswordClaim, true, input.userContext);
                            return res;
                        },
                        emailPasswordEmailExistsGET: async function (input) {
                            let email = input.email;
                            let signInResponse = await ThirdPartyEmailPassword.emailPasswordSignIn(
                                email,
                                FAKE_PASSWORD
                            );
                            if (signInResponse.status === "OK") {
                                // this means that the user had signed up, but not set their password.
                                // so we the email doesn't yet exist for sign in purposes
                                return {
                                    status: "OK",
                                    exists: false,
                                };
                            } else {
                                return oI.emailPasswordEmailExistsGET(input);
                            }
                        },
                        emailPasswordSignInPOST: async function (input) {
                            let password = input.formFields.filter((i) => i.id === "password")[0].value;
                            if (password === FAKE_PASSWORD) {
                                return {
                                    status: "WRONG_CREDENTIALS_ERROR",
                                };
                            }
                            return oI.emailPasswordSignInPOST(input);
                        },
                        emailPasswordSignUpPOST: async function (input) {
                            // We remove claim checking here, since this needs to be callable without the second factor completed
                            let session = await Session.getSession(input.options.req, input.options.res, {
                                sessionRequired: false,
                                overrideGlobalClaimValidators: () => [],
                            });
                            if (session === undefined) {
                                // copied from https://github.com/supertokens/supertokens-node/blob/master/lib/ts/recipe/emailpassword/api/implementation.ts#L137
                                let email = input.formFields.filter((f) => f.id === "email")[0].value;
                                let password = input.formFields.filter((f) => f.id === "password")[0].value;

                                let response = await input.options.recipeImplementation.signUp({ email, password });
                                if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                                    // if the input password is the fake password, and that's
                                    // what's in the db too, then we shall treat this as a success,
                                    // but unverify their email.
                                    let signInResponse = await ThirdPartyEmailPassword.emailPasswordSignIn(
                                        email,
                                        FAKE_PASSWORD
                                    );
                                    if (signInResponse.status === "WRONG_CREDENTIALS_ERROR") {
                                        return response;
                                    } else {
                                        await EmailVerification.unverifyEmail(signInResponse.user.id, email);
                                        response = {
                                            status: "OK",
                                            user: signInResponse.user,
                                        };
                                    }
                                }
                                let user = response.user;

                                // we have just created a user with the fake password.
                                // so we mark their session as unusable by the APIs
                                await Session.createNewSession(
                                    input.options.req,
                                    input.options.res,
                                    user.id,
                                    {
                                        ...RealPasswordClaim.build(user.id, input.userContext),
                                    },
                                    {}
                                );
                                return {
                                    status: "OK",
                                    user,
                                };
                            } else {
                                // session exists.. so the user is trying to change their password now
                                let userId = session.getUserId();
                                let password = input.formFields.filter((f) => f.id === "password")[0].value;

                                if (password === FAKE_PASSWORD) {
                                    throw new Error("User should not use this password");
                                }

                                // now we modify the user's password to the new password + change the session to set RealPasswordClaim to true
                                await ThirdPartyEmailPassword.updateEmailOrPassword({
                                    userId,
                                    password,
                                });

                                await session.setClaimValue(RealPasswordClaim, true);

                                let user = await ThirdPartyEmailPassword.getUserById(userId);
                                return {
                                    status: "OK",
                                    user,
                                };
                            }
                        },
                    };
                },
            },
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                ThirdPartyEmailPassword.Google({
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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",
                }),
                ThirdPartyEmailPassword.Github({
                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                    clientId: "467101b197249757c71f",
                }),
                ThirdPartyEmailPassword.Apple({
                    clientId: "4398792-io.supertokens.example.service",
                    clientSecret: {
                        keyId: "7M48Y4RYDL",
                        privateKey:
                            "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                        teamId: "YWQCXGJRJL",
                    },
                }),
            ],
        }),
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: (input) => [
                        ...input.claimValidatorsAddedByOtherRecipes,
                        RealPasswordClaim.validators.isTrue(),
                    ],
                }),
            },
        }),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
