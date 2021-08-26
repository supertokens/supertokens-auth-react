"use strict";
let supertokens = require("supertokens-node");
let { verifySession } = require("supertokens-node/recipe/session/framework/awsLambda");
let middy = require("@middy/core");
let cors = require("@middy/http-cors");
let { getBackendConfig } = require("./config");

supertokens.init(getBackendConfig());

const handler = async (event, _) => {
    return {
        body: JSON.stringify({
            sessionHandle: event.session.getHandle(),
            userId: event.session.getUserId(),
            jwtPayload: event.session.getJWTPayload(),
        }),
    };
};

module.exports.handler = middy(verifySession(handler)).use(
    cors({
        origin: getBackendConfig().appInfo.websiteDomain,
        credentials: true,
        headers: ["Content-Type", ...supertokens.getAllCORSHeaders()].join(", "),
        methods: "OPTIONS,POST,GET,PUT,DELETE",
    })
);
