const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdPartyPasswordless = require("supertokens-node/recipe/thirdpartypasswordless");
// let Twilio = require("twilio");
let axios = require("axios").default;
let { mailTransporter, getEmailBody } = require("./mailer");
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

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
        ThirdPartyPasswordless.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                ThirdPartyPasswordless.Google({
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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",
                }),
                ThirdPartyPasswordless.Github({
                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                    clientId: "467101b197249757c71f",
                }),
                ThirdPartyPasswordless.Apple({
                    clientId: "4398792-io.supertokens.example.service",
                    clientSecret: {
                        keyId: "7M48Y4RYDL",
                        privateKey:
                            "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                        teamId: "YWQCXGJRJL",
                    },
                }),
            ],
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            createAndSendCustomEmail: async function (input) {
                let htmlBody = getEmailBody(
                    APP_NAME,
                    Math.ceil(input.codeLifetime / 1000),
                    input.urlWithLinkCode,
                    input.userInputCode,
                    input.email
                );
                await mailTransporter.sendMail({
                    html: htmlBody,
                    to: input.email,
                    from: `Team Supertokens <${process.env.NODEMAILER_USER}>`,
                    sender: process.env.NODEMAILER_USER,
                    subject: `Login to ${APP_NAME}`,
                });
            },
            createAndSendCustomTextMessage: async function (input) {
                /*
                 * Following is an example of how SMS sending setup can
                 * be done using Twilio. The actual API that is being called
                 * in this function is doing exactly the same thing.
                 */

                /*
                const accountSid = process.env.TWILIO_ACCOUNT_SID;
                const authToken = process.env.TWILIO_AUTH_TOKEN;
                const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
                let twilio = Twilio(accountSid, authToken);
                let message = "";
                if (input.urlWithLinkCode !== undefined && input.userInputCode !== undefined) {
                    message = `Enter OTP: ${input.userInputCode} OR click this link: ${input.urlWithLinkCode} to login`;
                } else if (input.urlWithLinkCode !== undefined) {
                    message = `Click this link: ${input.urlWithLinkCode} to login`;
                } else {
                    message = `Enter OTP: ${input.userInputCode} to login`;
                }
                message += ` It will expire in ${input.codeLifetime} seconds.`;
                console.log(input.urlWithLinkCode)
                await twilio.messages.create({
                    body: message,
                    to: input.phoneNumber,
                    from: twilioPhoneNumber
                });
                */
                try {
                    await axios({
                        method: "post",
                        baseURL: "https://api.supertokens.com",
                        url: "/0/st/twilio/message",
                        headers: {
                            "api-version": "0",
                        },
                        data: {
                            to: input.phoneNumber,
                            appName: APP_NAME,
                            codeLifetime: Math.ceil(input.codeLifetime / 1000),
                            urlWithLinkCode: input.urlWithLinkCode,
                            userInputCode: input.userInputCode,
                        },
                    });
                } catch (err) {
                    if (err.response.status !== 429) {
                        throw err;
                    }
                    throw Error(
                        "Too many requests made for passwordless sign-in/up with phone number. The number of requests are restricted for this demo app. Please try again after 24 hours."
                    );
                }
            },
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

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
