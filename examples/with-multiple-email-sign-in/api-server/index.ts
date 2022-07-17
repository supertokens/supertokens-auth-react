import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { associateNewEmailWithPrimaryEmail } from "./emailLinkingMap";
import { epOverride } from "./epOverride";
import { evOverride } from "./evOverride";
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
            emailDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendEmail: async function (input) {
                            if (input.userContext.unverifiedAssociatedEmail !== undefined) {
                                input.user.email = input.userContext.unverifiedAssociatedEmail;
                            }
                            // console log for development purposes.
                            console.log(input);
                            return oI.sendEmail(input);
                        },
                    };
                },
            },
            override: {
                emailVerificationFeature: {
                    functions: (oI) => {
                        return evOverride(oI);
                    },
                },
                functions: (oI) => {
                    return epOverride(oI);
                },
            },
        }),
        Session.init(),
    ],
});

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: websiteDomain, // TODO: Change to your app's website domain
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// This API adds a new email to a given user (who is logged in)
app.post("/add-email", verifySession(), async (req: SessionRequest, res) => {
    let userId = req.session!.getUserId();
    let emailToAdd = req.body.email;
    let success = associateNewEmailWithPrimaryEmail(emailToAdd, (await EmailPassword.getUserById(userId))!.email);
    res.send({
        status: success ? "OK" : "INPUT_EMAIL_ASSOCIATED_WITH_ANOTHER_USER",
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
