"use strict";
const express = require("express");
const serverless = require("serverless-http");
let supertokens = require("supertokens-node");
let { getBackendConfig } = require("../../config/supertokensConfig");
let Session = require("supertokens-node/recipe/session");

const app = express();

supertokens.init(getBackendConfig());

app.get("/.netlify/functions/user", Session.verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload()
    });
});

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send(
        "Something went wrong. Please see error here: https://app.netlify.com/sites/hardcore-goodall-fd3278/functions/user"
    );
});

module.exports.handler = serverless(app);
