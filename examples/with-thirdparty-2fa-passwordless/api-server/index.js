const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdParty = require("supertokens-node/recipe/thirdparty");
let Passwordless = require("supertokens-node/recipe/passwordless");
let consumeCodePOST = require("./customConsumeCodePOST").consumeCodePOST;
let { mapping } = require("./thirdPartyUserIdToPhoneNumberMapping");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    ThirdParty.Google({
                        clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                        clientSecret: "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",
                    }),
                    ThirdParty.Github({
                        clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                        clientId: "467101b197249757c71f",
                    }),
                    ThirdParty.Apple({
                        clientId: "4398792-io.supertokens.example.service",
                        clientSecret: {
                            keyId: "7M48Y4RYDL",
                            privateKey:
                                "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                            teamId: "YWQCXGJRJL",
                        },
                    }),
                ],
            },
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        signInUp: async function (input) {
                            if (input.userContext.isFromAPI) {
                                // if this is being called from the API, we want to disable
                                // sign up. So we add the below condition.
                                if (
                                    (await ThirdParty.getUserByThirdPartyInfo(
                                        input.thirdPartyId,
                                        input.thirdPartyUserId
                                    )) === undefined
                                ) {
                                    // this third party user doesn't exist in the db. Therefore we reject the request
                                    return {
                                        status: "FIELD_ERROR",
                                        error: "Signing up is disabled. Please ask support to create an account for you instead",
                                    };
                                }
                            }
                            return oI.signInUp(input);
                        },
                    };
                },
                apis: (oI) => {
                    return {
                        ...oI,
                        signInUpPOST: async function (input) {
                            // we provide a custom user context here to indicate to the
                            // recipe's signInUp function that it is called from an API, so that
                            // we can disable sign up.
                            return oI.signInUpPOST({
                                ...input,
                                userContext: { isFromAPI: true },
                            });
                        },
                    };
                },
            },
        }),
        Passwordless.init({
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        consumeCodePOST,
                        createCodePOST: async function (input) {
                            let session = await Session.getSession(input.options.req, input.options.res);
                            let userId = session.getUserId();

                            // we check that if this userId has an associated mobile number (meaning that this is a returning user),
                            // then the input mobile is equal to that.

                            if (mapping[userId] !== undefined && mapping[userId] !== input.phoneNumber) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "Incorrect mobile number used for 2fa",
                                };
                            }

                            return oI.createCodePOST(input);
                        },
                    };
                },
            },
            contactMethod: "PHONE",
            flowType: "USER_INPUT_CODE",
            smsDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendSms: async function (input) {
                            console.log(input);
                        },
                    };
                },
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        createNewSession: async function (input) {
                            // this is called post third party sign in / up.
                            // here, we want to set the access token payload to reflect that
                            // the second factor is still pending
                            input.accessTokenPayload = {
                                ...input.accessTokenPayload,
                                // "auth" key will signify which auth factors
                                // have been completed so far. Since this is called
                                // only during third party sign in / up, we only put
                                // ["tp"] in it. "tp" stands for third party
                                auth: ["tp"],
                            };
                            return oI.createNewSession(input);
                        },
                    };
                },
            },
        }),
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

app.use(morgan("dev"));
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(middleware());

// An example API that requires session verification
app.get(
    "/sessioninfo",
    verifySession(),
    async (req, res, next) => {
        // here we enforce second factor
        let accessTokenPayload = req.session.getAccessTokenPayload();
        if (accessTokenPayload["auth"].length !== 2) {
            // we have not completed second factor yet. So the API call must not be allowed
            res.send(401);
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
