const express = require("express");
const cors = require("cors");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let Dashboard = require("supertokens-node/recipe/dashboard");
let MultiTenancy = require("supertokens-node/recipe/multitenancy");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://example.com:${websitePort}`;
let whitelist = /^(https?:\/\/([a-z0-9]+[.])example[.]com(?::\d{1,5})?)$/;

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        MultiTenancy.init({
            getAllowedDomainsForTenantId: async (tenantId, userContext) => {
                // query your db to get the allowed domain for the input tenantId
                // or you can make the tenantId equal to the sub domain itself
                return [tenantId + ".example.com"];
            },
        }),
        ThirdPartyEmailPassword.init({
            providers: [
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                clientSecret: "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",
                            },
                        ],
                    },
                },
            ],
            emailDelivery: {
                override: (oI) => ({
                    ...oI,
                    sendEmail: (input) => {
                        input.passwordResetLink = input.passwordResetLink.replace(
                            "//example.com",
                            `//${input.tenantId}.example.com`
                        );
                        return oI.sendEmail(input);
                    },
                }),
            },
        }),
        Session.init(),
        Dashboard.init(),
    ],
});

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: [whitelist, "http://example.com:3000"],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
