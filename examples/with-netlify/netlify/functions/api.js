"use strict";
const express = require("express");
const serverless = require("serverless-http");
let bodyParser = require("body-parser");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

supertokens.init({
    supertokens: {
        connectionURI: "https://try.supertokens.io"
    },
    appInfo: {
        appName: "SuperTokens Demo",
        apiDomain: process.env.SITE_NAME + ".netlify.app",
        websiteDomain: process.env.SITE_NAME + ".netlify.app",
        apiBasePath: "/.netlify/functions/api"
    },
    recipeList: [EmailPassword.init(), Session.init()],
    isInServerlessEnv: true
});

app.use(supertokens.middleware());

app.get("/.netlify/functions/api/sessioninfo", Session.verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData()
    });
});

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    console.log(err);
    res.send(
        "Something went wrong. Please see error here: https://app.netlify.com/sites/hardcore-goodall-fd3278/functions/api"
    );
});

module.exports.app = app;
module.exports.handler = serverless(app);
