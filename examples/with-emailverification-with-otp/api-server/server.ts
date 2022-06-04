import express from "express";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword, { Google, Github } from "supertokens-node/recipe/thirdpartyemailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import cors from "cors";
import { generateOtpAndMapToToken, mailTransporter, getMessageBody } from "./utils";

import dotenv from "dotenv";
dotenv.config();

let otpToTokenMapping = new Map<string, string>();

const apiPort = 3001;
const apiDomain = `http://localhost:${apiPort}`;
const websitePort = 3000;
const websiteDomain = `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.io",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                Google({
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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",
                }),
                Github({
                    clientId: "467101b197249757c71f",
                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                }),
            ],
            emailVerificationFeature: {
                createAndSendCustomEmail: async (user, url) => {
                    // retrieve the token from the url
                    const token = new URL(url).searchParams.get("token");

                    if (token !== null) {
                        // generate a 6 digit otp
                        let otp = generateOtpAndMapToToken(token, otpToTokenMapping);

                        // send a mail to the user with the otp
                        await mailTransporter.sendMail({
                            from: process.env.NODEMAILER_USER,
                            to: user.email,
                            subject: "SuperTokens Demo OTP",
                            html: getMessageBody(otp, user.email),
                        });
                    }
                },
            },
            override: {
                emailVerificationFeature: {
                    apis: (oI) => {
                        return {
                            ...oI,
                            verifyEmailPOST: async (input) => {
                                if (oI.verifyEmailPOST === undefined) {
                                    throw Error("should not come here");
                                }

                                // retrieve the token mapped to the otp if it exists
                                let superTokensToken = otpToTokenMapping.get(input.token);

                                if (superTokensToken !== undefined) {
                                    input.token = superTokensToken;
                                }

                                // use the token to verify the user's email, if a token could not be retrieved
                                // it will use the otp sent in the query which result in failure
                                let response = await oI.verifyEmailPOST(input);
                                return response;
                            },
                        };
                    },
                },
            },
        }),
        Session.init(), // initializes session features
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

app.use(middleware());

app.use(errorHandler());

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
