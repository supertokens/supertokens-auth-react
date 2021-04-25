"use strict";
const express = require("express");
const serverless = require("serverless-http");
let supertokens = require("supertokens-node");
let { getBackendConfig } = require("../../config/supertokensConfig");

const app = express();

supertokens.init(getBackendConfig());

app.use(supertokens.middleware());

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send(
        "Something went wrong. Please see error here: https://app.netlify.com/sites/hardcore-goodall-fd3278/functions/auth"
    );
});

module.exports.handler = serverless(app);
