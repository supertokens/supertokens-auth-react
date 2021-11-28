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
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let ThirdParty = require("supertokens-node/recipe/thirdparty");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
const crypto = require("crypto");
let express = require("express");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let http = require("http");
let cors = require("cors");
let { startST, killAllST, setupST, cleanST } = require("./utils");

let urlencodedParser = bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 });
let jsonParser = bodyParser.json({ limit: "20mb" });

let app = express();
app.use(urlencodedParser);
app.use(jsonParser);
app.use(cookieParser());

const WEB_PORT = process.env.WEB_PORT || 3031;
const websiteDomain = `http://localhost:${WEB_PORT}`;
let latestURLWithToken = "";

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
SuperTokens.init({
    appInfo: {
        appName: "SuperTokens",
        apiDomain: "localhost:" + (process.env.NODE_PORT === undefined ? 8080 : process.env.NODE_PORT),
        websiteDomain,
    },
    supertokens: {
        connectionURI: "http://localhost:9000",
    },
    recipeList: [
        EmailPassword.init({
            signUpFeature: {
                formFields,
            },
            resetPasswordUsingTokenFeature: {
                createAndSendCustomEmail: (_, passwordResetURLWithToken) => {
                    console.log(passwordResetURLWithToken);
                    latestURLWithToken = passwordResetURLWithToken;
                },
            },
            emailVerificationFeature: {
                createAndSendCustomEmail: (_, emailVerificationURLWithToken) => {
                    console.log(emailVerificationURLWithToken);
                    latestURLWithToken = emailVerificationURLWithToken;
                },
            },
        }),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    ThirdParty.Google({
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        clientId: process.env.GOOGLE_CLIENT_ID,
                    }),
                    ThirdParty.Github({
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        clientId: process.env.GITHUB_CLIENT_ID,
                    }),
                    ThirdParty.Facebook({
                        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                        clientId: process.env.FACEBOOK_CLIENT_ID,
                    }),
                ],
            },
        }),
        ThirdPartyEmailPassword.init({
            signUpFeature: {
                formFields,
            },
            providers: [
                ThirdPartyEmailPassword.Google({
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                }),
                ThirdPartyEmailPassword.Github({
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    clientId: process.env.GITHUB_CLIENT_ID,
                }),
                ThirdPartyEmailPassword.Facebook({
                    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    clientId: process.env.FACEBOOK_CLIENT_ID,
                }),
            ],
        }),
        Session.init({}),
    ],
});

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
    let pid = await startST();
    res.send(pid + "");
});

app.post("/beforeeach", async (req, res) => {
    users = [];
    deviceStore = new Map();
    maximumCodeInputAttempts = 3;

    await killAllST();
    await setupST();
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
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    if (session.getJWTPayload !== undefined) {
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getJWTPayload(),
            sessionData: await session.getSessionData(),
        });
    } else {
        res.send({
            sessionHandle: session.getHandle(),
            userId: session.getUserId(),
            accessTokenPayload: session.getAccessTokenPayload(),
            sessionData: await session.getSessionData(),
        });
    }
});

app.get("/token", async (_, res) => {
    res.send({
        latestURLWithToken,
    });
});

// Passwordless mocks
let users = [];
let deviceStore = new Map();
let maximumCodeInputAttempts = 3;

function getUserId() {
    return crypto.randomUUID();
}

function getOrCreateUser(email, phoneNumber) {
    let user = users.find((u) => u.email === email || u.phone === phoneNumber);
    let createdNewUser = !user;
    if (createdNewUser) {
        user = {
            id: getUserId(),
            email,
            phoneNumber,
        };
        users.push(user);
    }
    return { createdNewUser, user };
}

function getDeviceId() {
    return crypto.randomBytes(32).toString("base64");
}

function urlSafe(str) {
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function getPreAuthSessionId() {
    return urlSafe(crypto.randomBytes(32).toString("base64"));
}

function getLinkCode() {
    return urlSafe(crypto.randomBytes(32).toString("base64"));
}

function getAndStoreNewDevice(email, phone, flowType) {
    const device = {
        email,
        phone,
        deviceId: getDeviceId(),
        preAuthSessionId: getPreAuthSessionId(),
        flowType,
        failedAttempts: 0,
        codes: [
            {
                linkCode: getLinkCode(),
                userInputCode: "1111",
            },
        ],
    };
    deviceStore.set(device.deviceId, device);
    return device;
}

app.post("/auth/signinup/code", (req, res) => {
    let device;
    if (req.body.deviceId) {
        device = deviceStore.get(req.body.deviceId);
        if (!device) {
            res.send({
                status: "RESTART_FLOW_ERROR",
            });
            return;
        }
        device.codes.push({
            userInputCode: device.codes[device.codes.length - 1] + "x",
            linkCode: getLinkCode(),
        });
    } else {
        const flowType = (req.body.email || req.body.phoneNumber).startsWith("link")
            ? "MAGICLINK"
            : "USER_INPUT_CODE_AND_LINK";
        device = getAndStoreNewDevice(req.body.email, req.body.phoneNumber, flowType);
    }

    res.send({
        status: "OK",
        preAuthSessionId: device.preAuthSessionId,
        deviceId: device.deviceId,
        flowType: device.flowType,
    });
});

app.post("/auth/signinup/code/consume", async (req, res) => {
    if (req.body.deviceId) {
        const dev = deviceStore.get(req.body.deviceId);
        if (!dev) {
            res.send({
                status: "RESTART_FLOW_ERROR",
            });
            return;
        }
        if (dev.codes.some((code) => code.userInputCode === req.body.userInputCode)) {
            const userInfo = getOrCreateUser(dev.email, dev.phone);
            await Session.createNewSession(res, userInfo.user.id);
            res.send({
                status: "OK",
                ...userInfo,
            });
            return;
        } else {
            ++dev.failedAttempts;
            if (dev.failedAttempts >= maximumCodeInputAttempts) {
                res.send({
                    status: "RESTART_FLOW_ERROR",
                });
                return;
            } else if (req.body.userInputCode.startsWith("expire")) {
                res.send({
                    status: "EXPIRED_USER_INPUT_CODE_ERROR",
                    failedCodeInputAttemptCount: dev.failedAttempts,
                    maximumCodeInputAttempts,
                });
                return;
            } else {
                res.send({
                    status: "INCORRECT_USER_INPUT_CODE_ERROR",
                    failedCodeInputAttemptCount: dev.failedAttempts,
                    maximumCodeInputAttempts,
                });
                return;
            }
        }
    } else {
        const dev = Array.from(deviceStore.values()).find((d) =>
            d.codes.some((code) => code.linkCode === req.body.linkCode)
        );
        if (!dev) {
            res.send({
                status: "RESTART_FLOW_ERROR",
            });
            return;
        } else {
            const userInfo = getOrCreateUser(dev.email, dev.phone);
            await Session.createNewSession(res, userInfo.user.id);
            res.send({
                status: "OK",
                ...userInfo,
            });
        }
    }
});

app.get("/test/getDevice", (req, res) => {
    console.log(deviceStore.get(req.query.deviceId));
    res.send(deviceStore.get(req.query.deviceId));
});

app.get("/test/getAllDevices", (req, res) => {
    res.send({
        devices: Array.from(deviceStore.values()),
    });
});

app.use(errorHandler());

app.use(async (err, req, res, next) => {
    try {
        res.sendStatus(500).send(err);
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
        const pid = await startST();
        console.log(`Application started on http://localhost:${process.env.NODE_PORT | 8080}`);
        console.log(`processId: ${pid}`);
    }
})(process.env.START === "true");
