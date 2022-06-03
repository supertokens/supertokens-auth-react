import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import parsePhoneNumber from "libphonenumber-js/max";
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
            // resetPasswordUsingTokenFeature: {
            //     createAndSendCustomEmail: async (user, link, userContext) => {
            //         // TODO: send SMS to user.email (it is actually a phone number)
            //         console.log("Send password reset link to: ", user.email);
            //         console.log("Password reset  link:", link);
            //     },
            // },
            // signUpFeature: {
            //     formFields: [
            //         {
            //             id: "email",
            //             validate: async (value) => {
            //                 if (typeof value !== "string") {
            //                     return "Phone number is invalid";
            //                 }

            //                 let parsedPhoneNumber = parsePhoneNumber(value);
            //                 if (parsedPhoneNumber === undefined || !parsedPhoneNumber.isValid()) {
            //                     return "Phone number is invalid";
            //                 }
            //                 return undefined;
            //             },
            //         },
            //     ],
            // },
        }),
        // Passwordless.init({
        //     contactMethod: "PHONE",
        //     flowType: "USER_INPUT_CODE",
        //     createAndSendCustomTextMessage: async function (input) {
        //         // TODO: implement sending of text message with OTP
        //         console.log("SMS OTP:", input);
        //     },
        //     override: {
        //         apis: (oI) => {
        //             return {
        //                 ...oI,
        //                 createCodePOST: async function (input) {
        //                     if (oI.createCodePOST === undefined) {
        //                         throw new Error("Should never come here");
        //                     }
        //                     /**
        //                      *
        //                      * We want to make sure that the OTP being generated is for the
        //                      * same number that was used in the first login challenge. Otherwise
        //                      * someone could "hack" the frontend to change the phone number
        //                      * being sent for the second login challenge.
        //                      */

        //                     let session = await Session.getSession(input.options.req, input.options.res);
        //                     if (session === undefined) {
        //                         throw new Error("Should never come here");
        //                     }

        //                     let phoneNumber: string = session.getAccessTokenPayload().phoneNumber;

        //                     if (!("phoneNumber" in input) || input.phoneNumber !== phoneNumber) {
        //                         throw new Error("Should never come here");
        //                     }

        //                     return oI.createCodePOST(input);
        //                 },
        //                 consumeCodePOST: async function (input) {
        //                     if (oI.consumeCodePOST === undefined) {
        //                         throw new Error("Should never come here");
        //                     }
        //                     // we should already have a session here since this is called
        //                     // after phone password login
        //                     let session = await Session.getSession(input.options.req, input.options.res);
        //                     if (session === undefined) {
        //                         throw new Error("Should never come here");
        //                     }

        //                     // we add the session to the user context so that the createNewSession
        //                     // function doesn't create a new session
        //                     input.userContext.session = session;
        //                     let resp = await oI.consumeCodePOST(input);

        //                     if (resp.status === "OK") {
        //                         // OTP verification was successful. We can now mark the
        //                         // session's payload as phoneNumberVerified: true so that
        //                         // the user has access to API routes and the frontend UI
        //                         await resp.session.updateAccessTokenPayload({
        //                             ...resp.session.getAccessTokenPayload(),
        //                             phoneNumberVerified: true,
        //                         });
        //                     }

        //                     return resp;
        //                 },
        //             };
        //         },
        //     },
        // }),
        Session.init({
            // override: {
            //     functions: (originalImplementation) => {
            //         return {
            //             ...originalImplementation,
            //             createNewSession: async function (input) {
            //                 if (input.userContext.session !== undefined) {
            //                     // if it comes here, it means that we already have an
            //                     // existing session
            //                     return input.userContext.session;
            //                 } else {
            //                     // this is via phone number and password login. The user
            //                     // still needs to verify the phone number via an OTP
            //                     // we also get the phone number of the user and save it in the
            //                     // session so that the OTP can be sent to it directly
            //                     let userInfo = await ThirdPartyEmailPassword.getUserById(input.userId, input.userContext);
            //                     return originalImplementation.createNewSession({
            //                         ...input,
            //                         accessTokenPayload: {
            //                             ...input.accessTokenPayload,
            //                             phoneNumberVerified: false,
            //                             phoneNumber: userInfo?.email,
            //                         },
            //                     });
            //                 }
            //             },
            //         };
            //     },
            // },
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
    // (req: SessionRequest, res, next) => {
    //     // this is a custom middleware which will make sure that the user
    //     // has access to the APIs only when they have finished both the login
    //     // challenges
    //     let accessTokenPayload = req.session?.getAccessTokenPayload();
    //     if (accessTokenPayload.phoneNumberVerified !== true) {
    //         // we do not use 401 cause that is a reserved status code for supertokens in case
    //         // the session doesn't exist
    //         res.status(403).send("You need to verify your phone number via an OTP");
    //     } else {
    //         next();
    //     }
    // },
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
