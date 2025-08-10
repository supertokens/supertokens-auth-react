import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import EmailVerification from "supertokens-node/recipe/emailverification";
import MultiFactorAuth, { FactorIds } from "supertokens-node/recipe/multifactorauth";
import AccountLinking from "supertokens-node/recipe/accountlinking";
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
        connectionURI: "https://try.supertokens.com",
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
                            const phoneNumber = parsePhoneNumber(emailField.value as string);
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
                            const phoneNumber = parsePhoneNumber(emailField.value as string);
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
                    async consumeCodePOST(input) {
                        // Here we try to verify the phone number as an email address before
                        if (input.session !== undefined) {
                            if (!("userInputCode" in input)) {
                                throw new Error("We only enabled OTP");
                            }
                            const checkRes = await Passwordless.checkCode({
                                deviceId: input.deviceId,
                                userInputCode: input.userInputCode,
                                preAuthSessionId: input.preAuthSessionId,
                                tenantId: input.tenantId,
                                userContext: input.userContext,
                            });

                            if (checkRes.status === "OK" && checkRes.consumedDevice.phoneNumber !== undefined) {
                                const tokenRes = await EmailVerification.createEmailVerificationToken(
                                    "public",
                                    input.session.getRecipeUserId(),
                                    checkRes.consumedDevice.phoneNumber
                                );
                                if (tokenRes.status === "OK") {
                                    await EmailVerification.verifyEmailUsingToken("public", tokenRes.token, false);
                                }
                            }
                        }
                        return oI.consumeCodePOST!(input);
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
                    async getMFARequirementsForAuth(input) {
                        // By requiring
                        if (!(await input.factorsSetUpForUser).includes(FactorIds.OTP_PHONE)) {
                            return [FactorIds.OTP_PHONE];
                        }
                        return [];
                    },
                }),
                apis: (oI) => ({
                    ...oI,
                    resyncSessionAndFetchMFAInfoPUT: async (input) => {
                        const resp = await oI.resyncSessionAndFetchMFAInfoPUT!(input);

                        if (resp.status === "OK") {
                            resp.phoneNumbers = {
                                [FactorIds.OTP_PHONE]: resp.emails[FactorIds.EMAILPASSWORD],
                            };
                            // We want to remove "otp-email" and add "otp-phone", but it's simpler to just replace the array
                            resp.factors.alreadySetup = [FactorIds.OTP_PHONE];
                        }
                        return resp;
                    },
                }),
            },
        }),
        AccountLinking.init({
            shouldDoAutomaticAccountLinking: async () => ({
                shouldAutomaticallyLink: true,
                shouldRequireVerification: true,
            }),
        }),
        EmailVerification.init({
            mode: "OPTIONAL",
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

app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: any, res) => {
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
