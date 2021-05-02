"use strict";
const express = require("express");
const serverless = require("serverless-http");
let supertokens = require("supertokens-node");
let { getBackendConfig } = require("./config");
const cors = require("cors");

const app = express();

supertokens.init(getBackendConfig());

app.use(
    cors({
        origin: true,
        allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    })
);

app.use(supertokens.middleware());

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong");
});

module.exports.handler = serverless(app);
