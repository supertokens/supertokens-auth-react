import express from "express";
import supertokens, { deleteUser } from "supertokens-node";
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
                    const token = new URL(url).searchParams.get("token");
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

app.get("/remove-user", async (req, res) => {
    let response = await deleteUser("f6d6d593-7ec1-4599-a894-9ad48dd3d333");
    res.send(response);
});

// Add this AFTER all your routes
app.use(errorHandler());

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
