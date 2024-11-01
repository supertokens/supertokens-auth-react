import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import parsePhoneNumber from "libphonenumber-js/max";
import { PhoneVerifiedClaim } from "./phoneVerifiedClaim";
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
                apis: (oI) => {
                    return {
                        ...oI,
                        createCodePOST: async function (input) {
                            if (oI.createCodePOST === undefined) {
                                throw new Error("Should never come here");
                            }
                            /**
                             *
                             * We want to make sure that the OTP being generated is for the
                             * same number that was used in the first login challenge. Otherwise
                             * someone could "hack" the frontend to change the phone number
                             * being sent for the second login challenge.
                             */

                            let session = await Session.getSession(input.options.req, input.options.res, {
                                overrideGlobalClaimValidators: () => [],
                            });
                            if (session === undefined) {
                                throw new Error("Should never come here");
                            }

                            let phoneNumber: string = session.getAccessTokenPayload().phoneNumber;

                            if (!("phoneNumber" in input) || input.phoneNumber !== phoneNumber) {
                                throw new Error("Should never come here");
                            }

                            return oI.createCodePOST(input);
                        },
                        consumeCodePOST: async function (input) {
                            if (oI.consumeCodePOST === undefined) {
                                throw new Error("Should never come here");
                            }
                            // we should already have a session here since this is called
                            // after phone password login
                            let session = await Session.getSession(input.options.req, input.options.res, {
                                overrideGlobalClaimValidators: () => [],
                            });
                            if (session === undefined) {
                                throw new Error("Should never come here");
                            }

                            // we add the session to the user context so that the createNewSession
                            // function doesn't create a new session
                            input.userContext.session = session;
                            let resp = await oI.consumeCodePOST(input);

                            if (resp.status === "OK") {
                                // OTP verification was successful. We can now mark the
                                // session's payload as PhoneVerifiedClaim: true so that
                                // the user has access to API routes and the frontend UI
                                await session.setClaimValue(PhoneVerifiedClaim, true, input.userContext);
                                resp.user = (await supertokens.getUser(session.getUserId()))!;
                            }

                            return resp;
                        },
                    };
                },
            },
        }),
        Session.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        getGlobalClaimValidators: (input) => [
                            ...input.claimValidatorsAddedByOtherRecipes,
                            PhoneVerifiedClaim.validators.hasValue(true),
                        ],
                        createNewSession: async function (input) {
                            if (input.userContext.session !== undefined) {
                                // if it comes here, it means that we already have an
                                // existing session
                                return input.userContext.session;
                            } else {
                                // this is via phone number and password login. The user
                                // still needs to verify the phone number via an OTP

                                // we also get the phone number of the user and save it in the
                                // session so that the OTP can be sent to it directly
                                let userInfo = await supertokens.getUser(input.userId, input.userContext);
                                return originalImplementation.createNewSession({
                                    ...input,
                                    accessTokenPayload: {
                                        ...input.accessTokenPayload,
                                        ...PhoneVerifiedClaim.build(
                                            input.userId,
                                            input.recipeUserId,
                                            input.tenantId,
                                            input.accessTokenPayload,
                                            input.userContext
                                        ),
                                        phoneNumber: userInfo?.emails[0],
                                    },
                                });
                            }
                        },
                    };
                },
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

app.use(middleware());

// An example API that requires session verification
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
