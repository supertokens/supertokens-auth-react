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
const { default: SessionRaw } = require("supertokens-node/lib/build/recipe/session/recipe");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let ThirdParty = require("supertokens-node/recipe/thirdparty");
let EmailVerification = require("supertokens-node/recipe/emailverification");
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
    stopST,
    mockThirdPartyProvider,
} = require("./utils");
let { version: nodeSDKVersion } = require("supertokens-node/lib/build/version");
const fetch = require("isomorphic-fetch");
const { readFile } = require("fs/promises");

const PasswordlessRaw = require("supertokens-node/lib/build/recipe/passwordless/recipe").default;
const Passwordless = require("supertokens-node/recipe/passwordless");

const UserRolesRaw = require("supertokens-node/lib/build/recipe/userroles/recipe").default;
const UserRoles = require("supertokens-node/recipe/userroles");

const MultitenancyRaw = require("supertokens-node/lib/build/recipe/multitenancy/recipe").default;
const Multitenancy = require("supertokens-node/recipe/multitenancy");

const AccountLinkingRaw = require("supertokens-node/lib/build/recipe/accountlinking/recipe").default;
const AccountLinking = require("supertokens-node/recipe/accountlinking");

const UserMetadataRaw = require("supertokens-node/lib/build/recipe/usermetadata/recipe").default;
const UserMetadata = require("supertokens-node/recipe/usermetadata");

const MultiFactorAuthRaw = require("supertokens-node/lib/build/recipe/multifactorauth/recipe").default;
const MultiFactorAuth = require("supertokens-node/recipe/multifactorauth");

const TOTPRaw = require("supertokens-node/lib/build/recipe/totp/recipe").default;
const TOTP = require("supertokens-node/recipe/totp");

let OAuth2ProviderRaw = undefined;
let OAuth2Provider = undefined;
try {
    OAuth2ProviderRaw = require("supertokens-node/lib/build/recipe/oauth2provider/recipe").default;
    OAuth2Provider = require("supertokens-node/recipe/oauth2provider");
} catch {
    // OAuth2Provider is not supported by the tested version of the node SDK
}

let WebauthnRaw = undefined;
let Webauthn = undefined;
try {
    WebauthnRaw = require("supertokens-node/lib/build/recipe/webauthn/recipe").default;
    Webauthn = require("supertokens-node/recipe/webauthn");
} catch {
    // Webauthn is not supported by the tested version of the node SDK
}

const OTPAuth = require("otpauth");

require("./webauthn/wasm_exec");

let generalErrorSupported;

if (maxVersion(nodeSDKVersion, "9.9.9") === "9.9.9") {
    // General error is only supported by 10.0.0 and above
    generalErrorSupported = false;
} else {
    generalErrorSupported = true;
}

const fullProviderList = [
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

let webauthnStore = new Map();
const saveWebauthnToken = async ({ user, recoverAccountLink }) => {
    const webauthn = webauthnStore.get(user.email) || {
        email: user.email,
        recoverAccountLink: "",
        token: "",
    };
    webauthn.recoverAccountLink = recoverAccountLink;

    // Parse the token from the recoverAccountLink
    const token = recoverAccountLink.split("token=")[1].replace("&tenantId=public", "");
    webauthn.token = token;

    webauthnStore.set(user.email, webauthn);
};

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

let connectionURI = "http://localhost:9000";
let passwordlessConfig = {};
let accountLinkingConfig = {};
let enabledProviders = undefined;
let enabledRecipes = undefined;
let mfaInfo = {};

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

app.post("/startst", async (req, res) => {
    try {
        connectionURI = await startST(req.body);
        console.log("Connection URI: " + connectionURI);
        const OPAQUE_KEY_WITH_ALL_FEATURES_ENABLED =
            "N2yITHflaFS4BPm7n0bnfFCjP4sJoTERmP0J=kXQ5YONtALeGnfOOe2rf2QZ0mfOh0aO3pBqfF-S0jb0ABpat6pySluTpJO6jieD6tzUOR1HrGjJO=50Ob3mHi21tQHJ";

        await fetch(`${connectionURI}/ee/license`, {
            method: "PUT",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                licenseKey: OPAQUE_KEY_WITH_ALL_FEATURES_ENABLED,
            }),
        });
        initST();
        res.send(connectionURI + "");
    } catch (err) {
        console.log(err);
        res.status(500).send(err.toString());
    }
});

app.post("/beforeeach", async (req, res) => {
    deviceStore = new Map();

    mfaInfo = {};
    accountLinkingConfig = {};
    passwordlessConfig = {};
    enabledProviders = undefined;
    enabledRecipes = undefined;

    await killAllST();
    await setupST();
    initST();
    res.send();
});

app.post("/after", async (req, res) => {
    await killAllST();
    await cleanST();
    res.send();
});

app.post("/stopst", async (req, res) => {
    await stopST(req.body.pid);
    res.send("");
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

app.post("/setMFAInfo", async (req, res) => {
    mfaInfo = req.body;

    res.send({ status: "OK" });
});

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

app.post("/test/setFlow", (req, res) => {
    passwordlessConfig = {
        contactMethod: req.body.contactMethod,
        flowType: req.body.flowType,

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
    };
    initST();
    res.sendStatus(200);
});

app.post("/test/setAccountLinkingConfig", (req, res) => {
    accountLinkingConfig = {
        ...req.body,
    };
    initST();
    res.sendStatus(200);
});

app.post("/test/setEnabledRecipes", (req, res) => {
    enabledRecipes = req.body.enabledRecipes;
    enabledProviders = req.body.enabledProviders;
    initST();
    res.sendStatus(200);
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
    if (Webauthn) {
        available.push("webauthn");
    }

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

app.get("/test/webauthn/get-token", async (req, res) => {
    const webauthn = webauthnStore.get(req.query.email);
    if (!webauthn) {
        res.status(404).send({ error: "Webauthn not found" });
        return;
    }
    res.send({ token: webauthn.token });
});

app.post("/test/webauthn/create-and-assert-credential", async (req, res) => {
    try {
        const { registerOptionsResponse, signInOptionsResponse, rpId, rpName, origin } = req.body;

        const { createAndAssertCredential } = await getWebauthnLib();
        const credential = createAndAssertCredential(registerOptionsResponse, signInOptionsResponse, {
            rpId,
            rpName,
            origin,
            userNotPresent: false,
            userNotVerified: false,
        });

        res.send({ credential });
    } catch (error) {
        console.error("Error in create-and-assert-credential:", error);
        res.status(500).send({ error: error.message });
    }
});

app.post("/test/webauthn/create-credential", async (req, res) => {
    try {
        const { registerOptionsResponse, rpId, rpName, origin } = req.body;

        const { createCredential } = await getWebauthnLib();
        const credential = createCredential(registerOptionsResponse, {
            rpId,
            rpName,
            origin,
            userNotPresent: false,
            userNotVerified: false,
        });

        res.send({ credential });
    } catch (error) {
        console.error("Error in create-credential:", error);
        res.status(500).send({ error: error.message });
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
server.listen(process.env.NODE_PORT === undefined ? 8080 : process.env.NODE_PORT, "0.0.0.0");

/*
 * Setup and start the core when running the test application when running with  the following command:
 * START=true TEST_MODE=testing INSTALL_PATH=../../../supertokens-root NODE_PORT=8082 node .
 * or
 * npm run server
 */
(async function (shouldSpinUp) {
    if (shouldSpinUp) {
        console.log(`Start supertokens for test app`);
        try {
            await killAllST();
            await cleanST();
        } catch (e) {}

        await setupST();
        connectionURI = await startST();
        console.log("Connection URI: " + connectionURI);
    }
})(process.env.START === "true");

function initST() {
    if (process.env.TEST_MODE) {
        mfaInfo = {};

        UserRolesRaw.reset();
        PasswordlessRaw.reset();
        if (WebauthnRaw) {
            WebauthnRaw.reset();
        }
        MultitenancyRaw.reset();
        AccountLinkingRaw.reset();
        UserMetadataRaw.reset();
        MultiFactorAuthRaw.reset();
        TOTPRaw.reset();
        if (OAuth2ProviderRaw) {
            OAuth2ProviderRaw.reset();
        }

        EmailVerificationRaw.reset();
        EmailPasswordRaw.reset();
        ThirdPartyRaw.reset();
        SessionRaw.reset();

        SuperTokensRaw.reset();
    }

    const recipeList = [
        [
            "emailverification",
            EmailVerification.init({
                mode: "OPTIONAL",
                emailDelivery: {
                    override: (oI) => {
                        return {
                            ...oI,
                            sendEmail: async (input) => {
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
        ],
        [
            "emailpassword",
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
        ],
        [
            "thirdparty",
            ThirdParty.init({
                signInAndUpFeature: {
                    providers:
                        enabledProviders !== undefined
                            ? fullProviderList.filter(({ config }) => enabledProviders.includes(config.thirdPartyId))
                            : fullProviderList,
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
        ],
        [
            "session",
            Session.init({
                overwriteSessionDuringSignIn: true,
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
        ],
    ];
    if (OAuth2Provider) {
        recipeList.push(["oauth2provider", OAuth2Provider.init()]);
    }
    if (Webauthn) {
        recipeList.push([
            "webauthn",
            Webauthn.init({
                emailDelivery: {
                    override: (oI) => {
                        return {
                            ...oI,
                            sendEmail: async (input) => {
                                await saveWebauthnToken(input);
                            },
                        };
                    },
                },
            }),
        ]);
    }

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

    recipeList.push([
        "passwordless",
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

                            const resp = await originalImplementation.consumeCodePOST(input);

                            return resp;
                        },
                    };
                },
            },
        }),
    ]);

    recipeList.push(["userroles", UserRoles.init()]);

    recipeList.push([
        "multitenancy",
        Multitenancy.init({
            getAllowedDomainsForTenantId: (tenantId) => [
                `${tenantId}.example.com`,
                websiteDomain.replace(/https?:\/\/([^:\/]*).*/, "$1"),
            ],
        }),
    ]);

    accountLinkingConfig = {
        enabled: false,
        shouldAutoLink: {
            ...accountLinkingConfig?.shouldAutoLink,
            shouldAutomaticallyLink: true,
            shouldRequireVerification: true,
        },
        ...accountLinkingConfig,
    };
    if (accountLinkingConfig.enabled) {
        recipeList.push([
            "accountlinking",
            AccountLinking.init({
                shouldDoAutomaticAccountLinking: () => ({
                    ...accountLinkingConfig.shouldAutoLink,
                }),
            }),
        ]);
    }
    recipeList.push([
        "multifactorauth",
        MultiFactorAuth.init({
            firstFactors: mfaInfo.firstFactors,
            override: {
                functions: (oI) => ({
                    ...oI,
                    getFactorsSetupForUser: async (input) => {
                        const res = await oI.getFactorsSetupForUser(input);
                        if (mfaInfo?.alreadySetup) {
                            return mfaInfo.alreadySetup;
                        }
                        return res;
                    },
                    assertAllowedToSetupFactorElseThrowInvalidClaimError: async (input) => {
                        if (mfaInfo?.allowedToSetup) {
                            if (!mfaInfo.allowedToSetup.includes(input.factorId)) {
                                throw new Session.Error({
                                    type: "INVALID_CLAIMS",
                                    message: "INVALID_CLAIMS",
                                    payload: [
                                        {
                                            id: "test",
                                            reason: "test override",
                                        },
                                    ],
                                });
                            }
                        } else {
                            await oI.assertAllowedToSetupFactorElseThrowInvalidClaimError(input);
                        }
                    },
                    getMFARequirementsForAuth: async (input) => {
                        const res = await oI.getMFARequirementsForAuth(input);
                        if (mfaInfo?.requirements) {
                            return mfaInfo.requirements;
                        }
                        return res;
                    },
                }),
                apis: (oI) => ({
                    ...oI,
                    resyncSessionAndFetchMFAInfoPUT: async (input) => {
                        const res = await oI.resyncSessionAndFetchMFAInfoPUT(input);

                        if (res.status === "OK") {
                            if (mfaInfo.alreadySetup) {
                                res.factors.alreadySetup = [...mfaInfo.alreadySetup];
                            }
                        }
                        if (mfaInfo.noContacts) {
                            res.emails = {};
                            res.phoneNumbers = {};
                        }
                        return res;
                    },
                }),
            },
        }),
    ]);

    recipeList.push([
        "totp",
        TOTP.init({
            defaultPeriod: 1,
            defaultSkew: 30,
        }),
    ]);

    SuperTokens.init({
        appInfo: {
            appName: "SuperTokens",
            apiDomain: "localhost:" + (process.env.NODE_PORT === undefined ? 8080 : process.env.NODE_PORT),
            websiteDomain,
        },
        supertokens: {
            connectionURI,
        },
        debug: process.env.DEBUG === "true",
        recipeList:
            enabledRecipes !== undefined
                ? recipeList.filter(([key]) => enabledRecipes.includes(key)).map(([_key, recipeFunc]) => recipeFunc)
                : recipeList.map(([_key, recipeFunc]) => recipeFunc),
    });
}

function convertToRecipeUserIdIfAvailable(id) {
    if (SuperTokens.convertToRecipeUserId !== undefined) {
        return SuperTokens.convertToRecipeUserId(id);
    }
    return id;
}

const getWebauthnLib = async () => {
    const wasmBuffer = await readFile(__dirname + "/webauthn/webauthn.wasm");

    // Set up the WebAssembly module instance
    const go = new Go();
    const { instance } = await WebAssembly.instantiate(wasmBuffer, go.importObject);
    go.run(instance);

    // Export extractURL from the global object
    const createCredential = (
        registerOptions,
        { userNotPresent = true, userNotVerified = true, rpId, rpName, origin }
    ) => {
        const registerOptionsString = JSON.stringify(registerOptions);
        const result = global.createCredential(
            registerOptionsString,
            rpId,
            rpName,
            origin,
            userNotPresent,
            userNotVerified
        );

        if (!result) {
            throw new Error("Failed to create credential");
        }

        try {
            const credential = JSON.parse(result);
            return credential;
        } catch (e) {
            throw new Error("Failed to parse credential");
        }
    };

    const createAndAssertCredential = (
        registerOptions,
        signInOptions,
        { userNotPresent = false, userNotVerified = false, rpId, rpName, origin }
    ) => {
        const registerOptionsString = JSON.stringify(registerOptions);
        const signInOptionsString = JSON.stringify(signInOptions);

        const result = global.createAndAssertCredential(
            registerOptionsString,
            signInOptionsString,
            rpId,
            rpName,
            origin,
            userNotPresent,
            userNotVerified
        );

        if (!result) {
            throw new Error("Failed to create/assert credential");
        }

        try {
            const parsedResult = JSON.parse(result);
            return { attestation: parsedResult.attestation, assertion: parsedResult.assertion };
        } catch (e) {
            throw new Error("Failed to parse result");
        }
    };

    return { createCredential, createAndAssertCredential };
};
