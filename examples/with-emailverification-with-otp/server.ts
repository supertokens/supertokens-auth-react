import express from "express";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import cors from "cors";
import { generateString } from "./utils";

let { Google, Github } = ThirdPartyEmailPassword;

const apiPort = 3001;
const apiDomain = `http://localhost:${apiPort}`;
const websitePort = 3000;
const websiteDomain = `http://localhost:${websitePort}`;

let otpToTokenMapping = new Map<String, String>();

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "http://localhost:3567",
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
                // We have provided you with development keys which you can use for testsing.
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
                    const testUrl = new URL(url);
                    console.log(url);
                    console.log(testUrl.searchParams.get("token"));

                    const urlSearchParams = new URLSearchParams(url);
                    const params = Object.fromEntries(urlSearchParams.entries());
                    // console.log(params.token)

                    let otp = generateString(5);

                    // console.log(url);
                },
            },
        }),
        Session.init(), // initializes session features
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);

app.use(middleware());

// Add this AFTER all your routes
app.use(errorHandler());

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
