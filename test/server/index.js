/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
let SuperTokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
let express = require("express");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let http = require("http");
let { startST, stopST, killAllST, setupST, cleanST, setKeyValueInConfig } = require("./utils");
let { package_version } = require("../../lib/build/version");
let cors = require("cors");

let urlencodedParser = bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 });
let jsonParser = bodyParser.json({ limit: "20mb" });

let app = express();
app.use(urlencodedParser);
app.use(jsonParser);
app.use(cookieParser());

SuperTokens.init({
    supertokens: {
        connectionURI: "http://localhost:8080"
    },
    appInfo: {
        appName: "SuperTokens",
        websiteDomain: "http://localhost:3031",
        apiDomain: "http://localhost:9000"
    },
     recipeList: [
        EmailPassword.init({
            signUpFeature: {
                privacyPolicyLink: "http://localhost:3031/privacy",
                termsAndConditionsLink: "http://localhost:3031/terms",
                formFields: [{
                  id: "company"
                }, {
                  id: "First Name"
                }, {
                  id: "Last Name"
                },  {
                  id: "City",
                  optional: true
                }]
            }
        }),
        Session.init({
            hosts: "http://localhost:8080",
            cookieSameSite: "lax"
        })
     ]

});


app.use(
    cors({
        origin: "http://localhost.org:3031",
        allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true
    })
);

app.use(SuperTokens.middleware());

app.post("/login", async (req, res) => {
    let userId = req.body.userId;
    let session = await SuperTokens.createNewSession(res, userId);
    res.header("Access-Control-Allow-Origin", "http://localhost.org:3031");
    res.header("Access-Control-Allow-Credentials", true);
    res.send(session.userId);
});

app.post("/startst", async (req, res) => {
    let accessTokenValidity = req.body.accessTokenValidity === undefined ? 1 : req.body.accessTokenValidity;
    let enableAntiCsrf = req.body.enableAntiCsrf === undefined ? true : req.body.enableAntiCsrf;
    await setKeyValueInConfig("access_token_validity", accessTokenValidity);
    await setKeyValueInConfig("enable_anti_csrf", enableAntiCsrf);
    let pid = await startST();
    res.send(pid + "");
});

app.post("/beforeeach", async (req, res) => {
    noOfTimesRefreshCalledDuringTest = 0;
    noOfTimesGetSessionCalledDuringTest = 0;
    await killAllST();
    await setupST();
    await setKeyValueInConfig("cookie_domain", '"localhost.org"');
    await setKeyValueInConfig("cookie_secure", "false");
    await setKeyValueInConfig("refresh_api_path", "/refresh");
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

app.get("/", SuperTokens.middleware(true), async (req, res) => {
    noOfTimesGetSessionCalledDuringTest += 1;
    res.header("Access-Control-Allow-Origin", "http://localhost.org:3031");
    res.header("Access-Control-Allow-Credentials", true);
    res.send(req.session.getUserId());
});


app.get("/ping", async (req, res) => {
    res.send("success");
});

app.get("/stop", async (req, res) => {
    process.exit();
});

app.use("*", async (req, res, next) => {
    res.status(404).send();
});

app.use(
    SuperTokens.errorHandler({
        onTryRefreshToken: (err, req, res) => {
            res.header("Access-Control-Allow-Origin", "http://localhost.org:3031");
            res.header("Access-Control-Allow-Credentials", true);
            res.status(401).send();
        },
        onUnauthorised: (err, req, res) => {
            res.header("Access-Control-Allow-Origin", "http://localhost.org:3031");
            res.header("Access-Control-Allow-Credentials", true);
            res.status(401).send();
        }
    })
);

app.use(async (err, req, res, next) => {
    console.log(err);
    res.send(500).send(err);
});

let server = http.createServer(app);
server.listen(process.env.NODE_PORT === undefined ? 8082 : process.env.NODE_PORT, "0.0.0.0");
