const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { override } = require("./override");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                ThirdPartyEmailPassword.Google({
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                }),
                ThirdPartyEmailPassword.Github({
                    clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    clientId: process.env.GITHUB_CLIENT_ID,
                }),
            ],
            override: {
                functions: (ogImpl) => {
                    // this returns a new set of functions
                    // that use the customizes the behaviour of the
                    // original implementation
                    return override(ogImpl);
                },
            },
        }),
        Session.init(),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(morgan("dev"));
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(supertokens.middleware());

// custom API that requires session verification
app.get("/sessioninfo", Session.verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});

app.use(supertokens.errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
