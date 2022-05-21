import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
// import { tpepOverride } from "./tpepOverride";
// import { plessOverride } from "./plessOverride";
// import { evOverride } from "./evOverride";
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
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [
        EmailPassword.init({
            resetPasswordUsingTokenFeature: {
                createAndSendCustomEmail: async (user, link, userContext) => {
                    // TODO: send SMS to user.email (it is actually a phone number)
                    console.log("Send password reset link to: ", user.email);
                    console.log("Password reset  link:", link);
                },
            },
            signUpFeature: {
                formFields: [
                    {
                        id: "email",
                        validate: async (value) => {
                            return undefined;
                        },
                    },
                ],
            },
        }),
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            createAndSendCustomEmail: async function (input) {
                // TODO: implement sending of email
                console.log(input);
            },
            createAndSendCustomTextMessage: async function (input) {
                // TODO: implement sending of text message
                console.log(input);
            },
            // override: {
            //     functions: (originalImplementation) => {
            //         return plessOverride(originalImplementation);
            //     },
            // },
        }),
        Session.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        createNewSession: async function (input) {
                            return originalImplementation.createNewSession({
                                ...input,
                                accessTokenPayload: {
                                    ...input.accessTokenPayload,
                                    isPasswordless: input.userContext.isPasswordless === true,
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
        origin: websiteDomain, // TODO: Change to your app's website domain
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
