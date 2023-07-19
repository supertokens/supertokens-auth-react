const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let MultiTenancy = require("supertokens-node/recipe/multitenancy");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let ThirdPartyPasswordless = require("supertokens-node/recipe/thirdpartypasswordless");
let Dashboard = require("supertokens-node/recipe/dashboard");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://auth.example.com:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
        websiteBasePath: "/",
    },
    recipeList: [
        MultiTenancy.init({
            getAllowedDomainsForTenantId: async (tenantId, userContext) => {
                // query your db to get the allowed domain for the input tenantId
                // or you can make the tenantId equal to the sub domain itself
                return [tenantId + ".example.com"];
            },
        }),
        ThirdPartyEmailPassword.init({}),
        ThirdPartyPasswordless.init({ contactMethod: "EMAIL", flowType: "USER_INPUT_CODE_AND_MAGIC_LINK" }),
        Session.init(),
        Dashboard.init(),
    ],
});

const app = express();

app.use(
    cors({
        origin: [/^(https?:\/\/([a-z0-9]+[.])example[.]com(?::\d{1,5})?)$/, "http://example.com:3000"],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.use(morgan("dev"));
app.use(
    helmet({
        contentSecurityPolicy: false,
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
