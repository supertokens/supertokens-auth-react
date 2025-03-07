/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
require("dotenv").config();
let SuperTokens = require("supertokens-node");
let { default: SuperTokensRaw } = require("supertokens-node/lib/build/supertokens");
const { default: EmailVerificationRaw } = require("supertokens-node/lib/build/recipe/emailverification/recipe");
const { default: EmailPasswordRaw } = require("supertokens-node/lib/build/recipe/emailpassword/recipe");
const { default: ThirdPartyRaw } = require("supertokens-node/lib/build/recipe/thirdparty/recipe");
const {
    default: ThirdPartyEmailPasswordRaw,
} = require("supertokens-node/lib/build/recipe/thirdpartyemailpassword/recipe");
const { default: SessionRaw } = require("supertokens-node/lib/build/recipe/session/recipe");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let ThirdParty = require("supertokens-node/recipe/thirdparty");
let EmailVerification = require("supertokens-node/recipe/emailverification");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let express = require("express");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let http = require("http");
let cors = require("cors");
const morgan = require("morgan");
let {
    startST,
    killAllST,
    setupST,
    cleanST,
    setKeyValueInConfig,
    customAuth0Provider,
    maxVersion,
    setupCoreApplication,
    addLicense,
    mockThirdPartyProvider,
} = require("./utils");
let { version: nodeSDKVersion } = require("supertokens-node/lib/build/version");
const fetch = require("isomorphic-fetch");

let passwordlessSupported;
let PasswordlessRaw;
let Passwordless;

try {
    PasswordlessRaw = require("supertokens-node/lib/build/recipe/passwordless/recipe").default;
    Passwordless = require("supertokens-node/recipe/passwordless");
    passwordlessSupported = true;
} catch (ex) {
    passwordlessSupported = false;
}

let thirdPartyPasswordlessSupported;
let ThirdPartyPasswordlessRaw;
let ThirdPartyPasswordless;

try {
    ThirdPartyPasswordlessRaw = require("supertokens-node/lib/build/recipe/thirdpartypasswordless/recipe").default;
    ThirdPartyPasswordless = require("supertokens-node/recipe/thirdpartypasswordless");
    thirdPartyPasswordlessSupported = true;
} catch (ex) {
    thirdPartyPasswordlessSupported = false;
}

try {
    UserRolesRaw = require("supertokens-node/lib/build/recipe/userroles/recipe").default;
    UserRoles = require("supertokens-node/recipe/userroles");
    userRolesSupported = true;
} catch (ex) {
    userRolesSupported = false;
}

let Multitenancy, MultitenancyRaw, multitenancySupported;
try {
    MultitenancyRaw = require("supertokens-node/lib/build/recipe/multitenancy/recipe").default;
    Multitenancy = require("supertokens-node/lib/build/recipe/multitenancy");
    multitenancySupported = true;
} catch {
    multitenancySupported = false;
}

let generalErrorSupported;

if (maxVersion(nodeSDKVersion, "9.9.9") === "9.9.9") {
    // General error is only supported by 10.0.0 and above
    generalErrorSupported = false;
} else {
    generalErrorSupported = true;
}

const providers = [
    {
        config: {
            thirdPartyId: "google",
            clients: [
                {
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                },
            ],
        },
    },
    {
        config: {
            thirdPartyId: "github",
            clients: [
                {
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    clientId: process.env.GITHUB_CLIENT_ID,
                },
            ],
        },
    },
    {
        config: {
            thirdPartyId: "facebook",
            clients: [
                {
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    clientId: process.env.FACEBOOK_CLIENT_ID,
                },
            ],
        },
    },
    customAuth0Provider(),
    mockThirdPartyProvider,
];

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body && req.body["formFields"]);
});
app.use(morgan("[:date[iso]] :url :method :status :response-time ms - :res[content-length] - :body"));
app.use(urlencodedParser);
app.use(jsonParser);
app.use(cookieParser());

const WEB_PORT = process.env.WEB_PORT || 3031;
const websiteDomain = `http://localhost:${WEB_PORT}`;
let latestURLWithToken = "";

let deviceStore = new Map();
function saveCode({ email, phoneNumber, preAuthSessionId, urlWithLinkCode, userInputCode }) {
    console.log(arguments[0]);
    const device = deviceStore.get(preAuthSessionId) || {
        preAuthSessionId,
        codes: [],
    };
    device.codes.push({
        urlWithLinkCode,
        userInputCode,
    });
    deviceStore.set(preAuthSessionId, device);
}
const formFields = (process.env.MIN_FIELDS && []) || [
    {
        id: "name",
    },
    {
        id: "age",
        validate: async (value) => {
            if (parseInt(value) < 18) {
                return "You must be over 18 to register";
            }

            // If no error, return undefined.
            return undefined;
        },
    },
    {
        id: "country",
        optional: true,
    },
];
initST();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

app.get("/ping", async (req, res) => {
    res.send("success");
});

/**
 * Create a core application and initialize ST with the required config
 * @returns URL for the new core application
 */
async function setupApp({
    appId,
    coreConfig,
} = {}) {
    const coreAppUrl = await setupCoreApplication({ appId, coreConfig });
    console.log("Connection URI: " + coreAppUrl);

    if (loginMethods.thirdParty.providers !== undefined) {
        for (const provider of loginMethods.thirdParty.providers) {
            await Multitenancy.createOrUpdateThirdPartyConfig(tenantId, provider);
        }
    }
    res.send(coreResp);
};

function initST({
    coreUrl = getCoreUrl(),
    accountLinkingConfig = {},
    enabledRecipes,
    enabledProviders,
    passwordlessFlowType,
    passwordlessContactMethod,
    mfaInfo = {},
} = {}) {
    console.error('initST called')
    if (process.env.TEST_MODE) {
        if (userRolesSupported) {
            UserRolesRaw.reset();
        }

        if (thirdPartyPasswordlessSupported) {
            ThirdPartyPasswordlessRaw.reset();
        }

        if (passwordlessSupported) {
            PasswordlessRaw.reset();
        }

        if (multitenancySupported) {
            MultitenancyRaw.reset();
        }

        EmailVerificationRaw.reset();
        EmailPasswordRaw.reset();
        ThirdPartyRaw.reset();
        ThirdPartyEmailPasswordRaw.reset();
        SessionRaw.reset();

        SuperTokensRaw.reset();
    }

    const recipeList = [
        EmailVerification.init({
            mode: "OPTIONAL",
            emailDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendEmail: async (input) => {
                            console.log(input.emailVerifyLink);
                            latestURLWithToken = input.emailVerifyLink;
                        },
                    };
                },
            },
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        generateEmailVerifyTokenPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API email verification code",
                                };
                            }
                            return oI.generateEmailVerifyTokenPOST(input);
                        },
                        verifyEmailPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API email verify",
                                };
                            }
                            return oI.verifyEmailPOST(input);
                        },
                    };
                },
            },
        }),
        EmailPassword.init({
            override: {
                apis: (oI) => {
                    return {
                        ...oI,
                        passwordResetPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API reset password consume",
                                };
                            }
                            return oI.passwordResetPOST(input);
                        },
                        generatePasswordResetTokenPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API reset password",
                                };
                            }
                            return oI.generatePasswordResetTokenPOST(input);
                        },
                        emailExistsGET: async function (input) {
                            let generalError = input.options.req.getKeyValueFromQuery("generalError");
                            if (generalError === "true") {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API email exists",
                                };
                            }
                            return oI.emailExistsGET(input);
                        },
                        signUpPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API sign up",
                                };
                            }
                            return oI.signUpPOST(input);
                        },
                        signInPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                let message = "general error from API sign in";

                                if (body.generalErrorMessage !== undefined) {
                                    message = body.generalErrorMessage;
                                }

                                return {
                                    status: "GENERAL_ERROR",
                                    message,
                                };
                            }
                            return oI.signInPOST(input);
                        },
                    };
                },
            },
            signUpFeature: {
                formFields,
            },
            emailDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendEmail: async (input) => {
                            console.log(input.passwordResetLink);
                            latestURLWithToken = input.passwordResetLink;
                        },
                    };
                },
            },
        }),
        ThirdParty.init({
            signInAndUpFeature: {
                providers,
            },
            override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        authorisationUrlGET: async function (input) {
                            let generalErrorFromQuery = input.options.req.getKeyValueFromQuery("generalError");
                            if (generalErrorFromQuery === "true") {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API authorisation url get",
                                };
                            }

                            return originalImplementation.authorisationUrlGET(input);
                        },
                        signInUpPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API sign in up",
                                };
                            }

                            return originalImplementation.signInUpPOST(input);
                        },
                    };
                },
            },
        }),
        ThirdPartyEmailPassword.init({
            signUpFeature: {
                formFields,
            },
            emailDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendEmail: async (input) => {
                            console.log(input.passwordResetLink);
                            latestURLWithToken = input.passwordResetLink;
                        },
                    };
                },
            },
            providers,
            override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        emailPasswordSignUpPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API sign up",
                                };
                            }

                            return originalImplementation.emailPasswordSignUpPOST(input);
                        },
                        passwordResetPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API reset password consume",
                                };
                            }
                            return originalImplementation.passwordResetPOST(input);
                        },
                        generatePasswordResetTokenPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API reset password",
                                };
                            }
                            return originalImplementation.generatePasswordResetTokenPOST(input);
                        },
                        emailPasswordEmailExistsGET: async function (input) {
                            let generalError = input.options.req.getKeyValueFromQuery("generalError");
                            if (generalError === "true") {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API email exists",
                                };
                            }
                            return originalImplementation.emailPasswordEmailExistsGET(input);
                        },
                        emailPasswordSignInPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API sign in",
                                };
                            }
                            return originalImplementation.emailPasswordSignInPOST(input);
                        },
                        authorisationUrlGET: async function (input) {
                            let generalErrorFromQuery = input.options.req.getKeyValueFromQuery("generalError");
                            if (generalErrorFromQuery === "true") {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API authorisation url get",
                                };
                            }

                            return originalImplementation.authorisationUrlGET(input);
                        },
                        thirdPartySignInUpPOST: async function (input) {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from API sign in up",
                                };
                            }

                            return originalImplementation.thirdPartySignInUpPOST(input);
                        },
                    };
                },
            },
        }),
        Session.init({
            override: {
                apis: function (originalImplementation) {
                    return {
                        ...originalImplementation,
                        signOutPOST: async (input) => {
                            let body = await input.options.req.getJSONBody();
                            if (body.generalError === true) {
                                return {
                                    status: "GENERAL_ERROR",
                                    message: "general error from signout API",
                                };
                            }
                            return originalImplementation.signOutPOST(input);
                        },
                    };
                },
            },
        }),
    ];

    passwordlessConfig = {
        contactMethod: "EMAIL_OR_PHONE",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        emailDelivery: {
            override: (oI) => {
                return {
                    ...oI,
                    sendEmail: saveCode,
                };
            },
        },
        smsDelivery: {
            override: (oI) => {
                return {
                    ...oI,
                    sendSms: saveCode,
                };
            },
        },
        ...passwordlessConfig,
    };
    if (passwordlessSupported) {
        recipeList.push(
            Passwordless.init({
                ...passwordlessConfig,
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            createCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API create code",
                                    };
                                }
                                return originalImplementation.createCodePOST(input);
                            },
                            resendCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API resend code",
                                    };
                                }
                                return originalImplementation.resendCodePOST(input);
                            },
                            consumeCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API consume code",
                                    };
                                }
                                return originalImplementation.consumeCodePOST(input);
                            },
                        };
                    },
                },
            })
        );
    }

    if (thirdPartyPasswordlessSupported) {
        recipeList.push(
            ThirdPartyPasswordless.init({
                ...passwordlessConfig,
                providers,
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            authorisationUrlGET: async function (input) {
                                let generalErrorFromQuery = input.options.req.getKeyValueFromQuery("generalError");
                                if (generalErrorFromQuery === "true") {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API authorisation url get",
                                    };
                                }

                                return originalImplementation.authorisationUrlGET(input);
                            },
                            thirdPartySignInUpPOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API sign in up",
                                    };
                                }

                                return originalImplementation.thirdPartySignInUpPOST(input);
                            },
                            createCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API create code",
                                    };
                                }
                                return originalImplementation.createCodePOST(input);
                            },
                            resendCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API resend code",
                                    };
                                }
                                return originalImplementation.resendCodePOST(input);
                            },
                            consumeCodePOST: async function (input) {
                                let body = await input.options.req.getJSONBody();
                                if (body.generalError === true) {
                                    return {
                                        status: "GENERAL_ERROR",
                                        message: "general error from API consume code",
                                    };
                                }
                                return originalImplementation.consumeCodePOST(input);
                            },
                        };
                    },
                },
            })
        );
    }

    if (userRolesSupported) {
        recipeList.push(UserRoles.init());
    }

    if (multitenancySupported) {
        recipeList.push(
            Multitenancy.init({
                getAllowedDomainsForTenantId: (tenantId) => [
                    `${tenantId}.example.com`,
                    websiteDomain.replace(/https?:\/\/([^:\/]*).*/, "$1"),
                ],
            })
        );
    }

    SuperTokens.init({
        appInfo: {
            appName: "SuperTokens",
            apiDomain: "localhost:" + (process.env.NODE_PORT === undefined ? 8080 : process.env.NODE_PORT),
            websiteDomain,
        },
        supertokens: {
            connectionURI: "http://localhost:9000",
        },
        recipeList,
    });
}

function convertToRecipeUserIdIfAvailable(id) {
    if (SuperTokens.convertToRecipeUserId !== undefined) {
        return SuperTokens.convertToRecipeUserId(id);
    }
    return id;
}


let urlencodedParser = bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 });
let jsonParser = bodyParser.json({ limit: "20mb" });

let app = express();

const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.__custombody__ = body;
};

morgan.token("body", function (req, res) {
    return JSON.stringify(req.body);
});

morgan.token("res-body", function (req, res) {
    return typeof res.__custombody__ === "string" ? res.__custombody__ : JSON.stringify(res.__custombody__);
});

app.use(urlencodedParser);
app.use(jsonParser);

app.use(morgan("[:date[iso]] :url :method :body", { immediate: true }));
app.use(morgan("[:date[iso]] :url :method :status :response-time ms - :res[content-length] :res-body"));

app.use(cookieParser());

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

app.get("/ping", async (req, res) => {
    res.send("success");
});

app.post("/test/before", (_, res) => {
    res.send();
});

app.post("/test/beforeEach", (_, res) => {
    deviceStore = new Map();
    res.send();
});

app.post("/test/afterEach", (_, res) => {
    res.send();
});

app.post("/test/after", (_, res) => {
    res.send();
});

app.post("/test/setup/app", async (req, res) => {
    try {
        res.send(await setupApp(req.body));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.toString());
    }
});

app.post("/test/setup/st", async (req, res) => {
    try {
        res.send(await initST(req.body));
    } catch (err) {
        console.log(err);
        res.status(500).send(err.toString());
    }
});

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res, next) => {
    let session = req.session;
    const accessTokenPayload =
        session.getJWTPayload !== undefined ? session.getJWTPayload() : session.getAccessTokenPayload();

    try {
        const sessionData = session.getSessionData
            ? await session.getSessionData()
            : await session.getSessionDataFromDatabase();
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            recipeUserId: session.getRecipeUserId().getAsString(),
            accessTokenPayload,
            sessionData,
        });
    } catch (err) {
        next(err);
    }
});

app.post("/deleteUser", async (req, res) => {
    const users = await SuperTokens.listUsersByAccountInfo("public", req.body);
    res.send(await SuperTokens.deleteUser(users[0].id));
});

app.post("/changeEmail", async (req, res) => {
    let resp;
    if (req.body.rid === "emailpassword") {
        resp = await EmailPassword.updateEmailOrPassword({
            recipeUserId: convertToRecipeUserIdIfAvailable(req.body.recipeUserId),
            email: req.body.email,
            tenantIdForPasswordPolicy: req.body.tenantId,
        });
    } else if (req.body.rid === "thirdparty") {
        const user = await SuperTokens.getUser({ userId: req.body.recipeUserId });
        const loginMethod = user.loginMethod.find((lm) => lm.recipeUserId.getAsString() === req.body.recipeUserId);
        resp = await ThirdParty.manuallyCreateOrUpdateUser(
            req.body.tenantId,
            loginMethod.thirdParty.id,
            loginMethod.thirdParty.userId,
            req.body.email,
            false
        );
    } else if (req.body.rid === "passwordless") {
        resp = await Passwordless.updateUser({
            recipeUserId: convertToRecipeUserIdIfAvailable(req.body.recipeUserId),
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        });
    }
    res.json(resp);
});

app.get("/unverifyEmail", verifySession(), async (req, res) => {
    let session = req.session;
    await EmailVerification.unverifyEmail(session.getRecipeUserId());
    await session.fetchAndSetClaim(EmailVerification.EmailVerificationClaim, {});
    res.send({ status: "OK" });
});

app.post("/setRole", verifySession(), async (req, res) => {
    let session = req.session;
    await UserRoles.createNewRoleOrAddPermissions(req.body.role, req.body.permissions);
    await UserRoles.addRoleToUser(session.getTenantId(), session.getUserId(), req.body.role);
    await session.fetchAndSetClaim(UserRoles.UserRoleClaim, {});
    await session.fetchAndSetClaim(UserRoles.PermissionClaim, {});
    res.send({ status: "OK" });
});

app.post(
    "/checkRole",
    verifySession({
        overrideGlobalClaimValidators: async (gv, _session, userContext) => {
            const res = [...gv];
            const body = await userContext._default.request.getJSONBody();
            if (body.role !== undefined) {
                const info = body.role;
                res.push(UserRoles.UserRoleClaim.validators[info.validator](...info.args));
            }

            if (body.permission !== undefined) {
                const info = body.permission;
                res.push(UserRoles.PermissionClaim.validators[info.validator](...info.args));
            }
            return res;
        },
    }),
    async (req, res) => {
        res.send({ status: "OK" });
    }
);

app.post("/completeFactor", verifySession(), async (req, res) => {
    let session = req.session;

    await MultiFactorAuth.markFactorAsCompleteInSession(session, req.body.id);

    res.send({ status: "OK" });
});

app.post("/addRequiredFactor", verifySession(), async (req, res) => {
    let session = req.session;

    await MultiFactorAuth.addToRequiredSecondaryFactorsForUser(session.getUserId(), req.body.factorId);

    res.send({ status: "OK" });
});

app.post("/mergeIntoAccessTokenPayload", verifySession(), async (req, res) => {
    let session = req.session;

    await session.mergeIntoAccessTokenPayload(req.body);

    res.send({ status: "OK" });
});

app.get("/token", async (_, res) => {
    res.send({
        latestURLWithToken,
    });
});

app.post("/setupTenant", async (req, res) => {
    const { tenantId, loginMethods, coreConfig } = req.body;
    let firstFactors = [];
    if (loginMethods.emailPassword?.enabled === true) {
        firstFactors.push("emailpassword");
    }
    if (loginMethods.passwordless?.enabled === true) {
        firstFactors.push("otp-phone", "otp-email", "link-phone", "link-email");
    }
    if (loginMethods.thirdParty?.enabled === true) {
        firstFactors.push("thirdparty");
    }
    let coreResp = await Multitenancy.createOrUpdateTenant(tenantId, {
        firstFactors,
        coreConfig,
    });

    if (loginMethods.thirdParty.providers !== undefined) {
        for (const provider of loginMethods.thirdParty.providers) {
            await Multitenancy.createOrUpdateThirdPartyConfig(tenantId, provider);
        }
    }
    res.send(coreResp);
});

app.post("/addUserToTenant", async (req, res) => {
    const { tenantId, recipeUserId } = req.body;
    let coreResp = await Multitenancy.associateUserToTenant(tenantId, convertToRecipeUserIdIfAvailable(recipeUserId));
    res.send(coreResp);
});

app.post("/removeUserFromTenant", async (req, res) => {
    const { tenantId, recipeUserId } = req.body;
    let coreResp = await Multitenancy.disassociateUserFromTenant(
        tenantId,
        convertToRecipeUserIdIfAvailable(recipeUserId)
    );
    res.send(coreResp);
});

app.post("/removeTenant", async (req, res) => {
    const { tenantId } = req.body;
    let coreResp = await Multitenancy.deleteTenant(tenantId);
    res.send(coreResp);
});

app.get("/test/getDevice", (req, res) => {
    res.send(deviceStore.get(req.query.preAuthSessionId));
});

app.post("/test/getTOTPCode", (req, res) => {
    res.send(JSON.stringify({ totp: new OTPAuth.TOTP({ secret: req.body.secret, digits: 6, period: 1 }).generate() }));
});

app.get("/test/featureFlags", (req, res) => {
    const available = [];

    available.push("passwordless");
    available.push("thirdpartypasswordless");
    available.push("generalerror");
    available.push("userroles");
    available.push("multitenancy");
    available.push("multitenancyManagementEndpoints");
    available.push("accountlinking");
    available.push("mfa");
    available.push("recipeConfig");
    available.push("oauth2");
    available.push("accountlinking-fixes");

    res.send({
        available,
    });
});

app.post("/test/create-oauth2-client", async (req, res, next) => {
    try {
        const { client } = await OAuth2Provider.createOAuth2Client(req.body);
        res.send({ client });
    } catch (e) {
        next(e);
    }
});

app.use(errorHandler());

app.use(async (err, req, res, next) => {
    try {
        console.error(err);
        res.status(500).send(err);
    } catch (ignored) {}
});

let server = http.createServer(app);
server.listen(process.env?.NODE_PORT ?? 8080, "0.0.0.0");
