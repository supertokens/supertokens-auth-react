const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdParty = require("supertokens-node/recipe/thirdparty");
let Passwordless = require("supertokens-node/recipe/passwordless");
// let Twilio = require("twilio");
let axios = require("axios").default;
let { mailTransporter, getEmailBody } = require("./mailer");
let Dashboard = require("supertokens-node/recipe/dashboard");
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
const deeplinkProtocol = "supertokens-demo";

const APP_NAME = "SuperTokens Demo App"; // TODO: Your app name
supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: APP_NAME, // TODO: Your app name
        apiDomain, // TODO: Change to your app's API domain
        websiteDomain, // TODO: Change to your app's website domain
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            emailDelivery: {
                service: {
                    sendEmail: async function (input) {
                        let finalUrlWithLinkCode;

                        if (input.urlWithLinkCode !== undefined) {
                            /**
                             * Electron uses file protocol for production builds. SuperTokens does not currently support
                             * file protocol URLs, as a workaround we add a `/auth/verify` route that redirects to the
                             * eletron app using deeplinking.
                             *
                             * Here we modify the magic link to use the apiDomain instead of the websiteDomain
                             */
                            let currentUrlWithLinkCode = new URL(input.urlWithLinkCode);
                            finalUrlWithLinkCode = input.urlWithLinkCode.replace(
                                currentUrlWithLinkCode.origin,
                                apiDomain
                            );
                        }

                        console.log("OTP is: " + input.userInputCode);
                        console.log("Magic link is: " + input.urlWithLinkCode);
                    },
                },
            },
            smsDelivery: {
                service: {
                    sendSms: async function (input) {
                        if (input.urlWithLinkCode !== undefined) {
                            /**
                             * Electron uses file protocol for production builds. SuperTokens does not currently support
                             * file protocol URLs, as a workaround we add a `/auth/verify` route that redirects to the
                             * eletron app using deeplinking.
                             *
                             * Here we modify the magic link to use the apiDomain instead of the websiteDomain
                             */
                            let currentUrlWithLinkCode = new URL(input.urlWithLinkCode);
                            finalUrlWithLinkCode = input.urlWithLinkCode.replace(
                                currentUrlWithLinkCode.origin,
                                apiDomain
                            );
                        }
                        console.log("OTP is: " + input.userInputCode);
                        console.log("Magic link is: " + input.urlWithLinkCode);
                    },
                },
            },
        }),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [
                                {
                                    clientId:
                                        "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                    clientSecret: "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",
                                },
                            ],
                        },
                    },
                    {
                        config: {
                            thirdPartyId: "github",
                            clients: [
                                {
                                    clientId: "467101b197249757c71f",
                                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                                },
                            ],
                        },
                    },
                    {
                        config: {
                            thirdPartyId: "apple",
                            clients: [
                                {
                                    clientId: "4398792-io.supertokens.example.service",
                                    additionalConfig: {
                                        keyId: "7M48Y4RYDL",
                                        privateKey:
                                            "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                                        teamId: "YWQCXGJRJL",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        }),
        /**
         * Electron does not work well with same site and secure cookies. This makes cookies set by
         * SuperTokens use SameSite: None and Secure: false
         */
        Session.init({
            cookieSameSite: "none",
            cookieSecure: true,
        }),
        Dashboard.init(),
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
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

/**
 * Social providers do not support HashRouter compatible links and because electron uses file protocol
 * in production mode, routing on the frontend app will fail. To get around this we use the apiDomain
 * when configuring a redirect url for the social provider.
 *
 * This route redirects to the app using deeplinking
 */
app.get("/auth/callback/:providerId", async (req, res) => {
    res.redirect(
        307,
        `${deeplinkProtocol}://` + "auth/callback/" + req.params.providerId + "?" + req.url.split("?")[1]
    );
});

/**
 * Electron uses file protocol in production mode. SuperTokens does not currently support file protocol URLs,
 * as a workaround the magic link uses the apiDomain and this route redirects to the app using deeplinks.
 */
app.get("/auth/verify", async (req, res) => {
    res.redirect(307, `${deeplinkProtocol}://auth/verify` + "?" + req.url.split("?")[1]);
});

app.use(errorHandler());

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
