"use strict";
let supertokens = require("supertokens-node");
let { middleware } = require("supertokens-node/framework/awsLambda");
let middy = require("@middy/core");
let cors = require("@middy/http-cors");
let { getBackendConfig } = require("./config");

supertokens.init(getBackendConfig());

module.exports.handler = middy(middleware())
    .use(
        cors({
            origin: getBackendConfig().appInfo.websiteDomain,
            credentials: true,
            headers: ["Content-Type", ...supertokens.getAllCORSHeaders()].join(", "),
            methods: "OPTIONS,POST,GET,PUT,DELETE",
        })
    )
    .onError((request) => {
        throw request.error;
    });
