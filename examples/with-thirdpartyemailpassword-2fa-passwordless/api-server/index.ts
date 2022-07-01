import express, { response } from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import UserMetadata from "supertokens-node/recipe/usermetadata";
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

export const emailVerificationOn = true;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
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
        UserMetadata.init(),
        Passwordless.init({
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
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        createCodePOST: async function (input) {
                            if (oI.createCodePOST === undefined) {
                                throw new Error("Should never come here");
                            }
                            /**
                             *
                             * We want to make sure that the OTP being generated is for the
                             * same number that belongs to this user.
                             */

                            let session = await Session.getSession(input.options.req, input.options.res);
                            if (session === undefined) {
                                throw new Error("Should never come here");
                            }

                            let phoneNumber: string = session.getAccessTokenPayload().phoneNumber;

                            if (phoneNumber !== undefined) {
                                if (!("phoneNumber" in input) || input.phoneNumber !== phoneNumber) {
                                    throw new Error("Should never come here");
                                }
                            }

                            return oI.createCodePOST(input);
                        },
                        consumeCodePOST: async function (input) {
                            if (oI.consumeCodePOST === undefined) {
                                throw new Error("Should never come here");
                            }
                            // we should already have a session here since this is called
                            // after phone password login
                            let session = await Session.getSession(input.options.req, input.options.res);
                            if (session === undefined) {
                                throw new Error("Should never come here");
                            }

                            // we add the session to the user context so that the createNewSession
                            // function doesn't create a new session
                            input.userContext.session = session;
                            let resp = await oI.consumeCodePOST(input);

                            if (resp.status === "OK") {
                                // OTP verification was successful. We can now mark the
                                // session's payload as phoneNumberVerified: true so that
                                // the user has access to API routes and the frontend UI
                                await resp.session.updateAccessTokenPayload({
                                    ...resp.session.getAccessTokenPayload(),
                                    phoneNumberVerified: true,
                                });

                                // we associate the passwordless user ID with the thirdpartyemailpassword
                                // user ID, so that later on, we can fetch the phone number.
                                await UserMetadata.updateUserMetadata(session.getUserId(), {
                                    passwordlessUserId: resp.user.id,
                                });
                            }

                            return resp;
                        },
                    };
                },
            },
        }),
        Session.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        createNewSession: async function (input) {
                            if (input.userContext.session !== undefined) {
                                /**
                                 * This will be true for passwordless login.
                                 */
                                return input.userContext.session;
                            }
                            let userMetadata = await UserMetadata.getUserMetadata(input.userId);
                            let phoneNumber: string | undefined = undefined;
                            if (userMetadata.metadata.passwordlessUserId !== undefined) {
                                // we alreay have a phone number associated with this user,
                                // so we will add it to the access token payload so that
                                // we can send an OTP to it without asking the end user.
                                let passwordlessUserInfo = await Passwordless.getUserById({
                                    userId: userMetadata.metadata.passwordlessUserId as string,
                                    userContext: input.userContext,
                                });
                                phoneNumber = passwordlessUserInfo?.phoneNumber;
                            }
                            return originalImplementation.createNewSession({
                                ...input,
                                accessTokenPayload: {
                                    ...input.accessTokenPayload,
                                    phoneNumberVerified: false,
                                    phoneNumber,
                                },
                            });
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
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// An example API that requires session verification
app.get(
    "/sessioninfo",
    verifySession(),
    (req: SessionRequest, res, next) => {
        // this is a custom middleware which will make sure that the user
        // has access to the APIs only when they have finished both the login
        // challenges
        let accessTokenPayload = req.session?.getAccessTokenPayload();
        if (accessTokenPayload.phoneNumberVerified !== true) {
            // we do not use 401 cause that is a reserved status code for supertokens in case
            // the session doesn't exist
            res.status(403).send("You need to verify your phone number via an OTP");
        } else {
            next();
        }
    },
    async (req: SessionRequest, res) => {
        let session = req.session!;
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getAccessTokenPayload(),
        });
    }
);

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
