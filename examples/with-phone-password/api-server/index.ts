import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import MultiFactorAuth from "supertokens-node/recipe/multifactorauth";
import parsePhoneNumber from "libphonenumber-js/max";
import Dashboard from "supertokens-node/recipe/dashboard";
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "http://localhost:3567",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailPassword.init({
            emailDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendEmail: async function (input) {
                            if (input.type === "PASSWORD_RESET") {
                                // TODO: send SMS to user.email (it is actually a phone number)
                                console.log("Send password reset link to: ", input.user.email);
                                console.log("Password reset  link:", input.passwordResetLink);
                            } else {
                                return oI.sendEmail(input);
                            }
                        },
                    };
                },
            },
            signUpFeature: {
                formFields: [
                    {
                        id: "email",
                        validate: async (value) => {
                            if (typeof value !== "string") {
                                return "Phone number is invalid";
                            }

                            let parsedPhoneNumber = parsePhoneNumber(value);
                            if (parsedPhoneNumber === undefined || !parsedPhoneNumber.isValid()) {
                                return "Phone number is invalid";
                            }
                            return undefined;
                        },
                    },
                ],
            },
            override: {
                apis: (oI) => ({
                    ...oI,
                    signUpPOST(input, ...rest) {
                        if (oI.signUpPOST === undefined) {
                            throw new Error("Should never come here");
                        }

                        // We format the phone number here to get it to a standard format
                        const emailField = input.formFields.find((field) => field.id === "email");
                        if (emailField) {
                            const phoneNumber = parsePhoneNumber(emailField.value);
                            if (phoneNumber !== undefined && phoneNumber.isValid()) {
                                emailField.value = phoneNumber.number;
                            }
                        }

                        return oI.signUpPOST(input, ...rest);
                    },
                    signInPOST(input, ...rest) {
                        if (oI.signInPOST === undefined) {
                            throw new Error("Should never come here");
                        }

                        // We format the phone number here to get it to a standard format
                        const emailField = input.formFields.find((field) => field.id === "email");
                        if (emailField) {
                            const phoneNumber = parsePhoneNumber(emailField.value);
                            if (phoneNumber !== undefined && phoneNumber.isValid()) {
                                emailField.value = phoneNumber.number;
                            }
                        }

                        return oI.signInPOST(input, ...rest);
                    },
                }),
            },
        }),
        Passwordless.init({
            contactMethod: "PHONE",
            flowType: "USER_INPUT_CODE",
            override: {
                apis: (oI) => ({
                    ...oI,
                    consumeCodePOST: async (input) => {
                        const resp = await oI.consumeCodePOST!(input);
                        if (resp.status === "OK") {
                            // We can this here without any additional checks, since we know that this is only used as a secondary factor
                            // with exactly this (phone + otp) config
                            await MultiFactorAuth.addToRequiredSecondaryFactorsForUser(resp.user.id, "otp-phone");
                        }
                        return resp;
                    },
                }),
            },
        }),
        Session.init(),
        MultiFactorAuth.init({
            firstFactors: ["emailpassword"],
            override: {
                functions: (oI) => ({
                    ...oI,
                    getMFARequirementsForAuth(input) {
                        if (!input.defaultRequiredFactorIdsForUser.includes("otp-phone")) {
                            return ["otp-phone"];
                        }
                        return [];
                    },
                }),
                apis: (oI) => ({
                    ...oI,
                    mfaInfoGET: async (input) => {
                        const resp = await oI.mfaInfoGET(input);

                        if (resp.status === "OK") {
                            resp.phoneNumber = resp.email;
                            // We want to remove "otp-email" and add "otp-phone", but it's simpler to just replace the array
                            resp.factors.isAlreadySetup = ["otp-phone"];
                        }
                        return resp;
                    },
                }),
            },
        }),
        Dashboard.init(),
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

app.use((middleware as any)());

// An example API that requires session verification
app.get("/sessioninfo", (verifySession as any)(), async (req: any, res) => {
    let session = req.session!;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use((errorHandler as any)());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
