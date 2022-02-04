const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");

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
        ThirdPartyEmailPassword.init({
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        emailExistsGET: async function (input) {
                            let email = input.email;
                            let signInResponse = await ThirdPartyEmailPassword.signIn(email, FAKE_PASSWORD);
                            if (signInResponse.status === "OK") {
                                // this means that the user had signed up, but not set their password.
                                // so we the email doesn't yet exist for sign in purposes
                                return {
                                    status: "OK",
                                    exists: false,
                                };
                            } else {
                                return oI.emailExistsGET(input);
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
                            let session = await Session.getSession(input.options.req, input.options.res, {
                                sessionRequired: false,
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
                                    let signInResponse = await ThirdPartyEmailPassword.signIn(email, FAKE_PASSWORD);
                                    if (signInResponse.status === "WRONG_CREDENTIALS_ERROR") {
                                        return response;
                                    } else {
                                        await ThirdPartyEmailPassword.unverifyEmail(signInResponse.user.id);
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
                                    input.options.res,
                                    user.id,
                                    {
                                        isUsingFakePassword: true,
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

                                // now we modify the user's password to the new password + change the session to set isUsingFakePassword to false
                                await ThirdPartyEmailPassword.updateEmailOrPassword({
                                    userId,
                                    password,
                                });

                                await session.updateAccessTokenPayload({
                                    isUsingFakePassword: false,
                                });

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
        Session.init(),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
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

// custom API that requires session verification
app.get(
    "/sessioninfo",
    verifySession(),
    async (req, res, next) => {
        let accessTokenPayload = req.session.getAccessTokenPayload();
        if (accessTokenPayload.isUsingFakePassword) {
            // this means that the user has not changed their password after signing up yet.
            // so we don't allow them access to the API
            return res.send(401);
        } else {
            next();
        }
    },
    async (req, res) => {
        let session = req.session;
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getAccessTokenPayload(),
        });
    }
);

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
