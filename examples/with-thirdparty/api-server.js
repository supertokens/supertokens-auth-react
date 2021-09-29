const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdParty = require("supertokens-node/recipe/thirdparty");

const apiPort = process.env.API_PORT || 3001;
const apiDomain = process.env.API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.WEBSITE_PORT || 3000;
const websiteDomain = process.env.WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    ThirdParty.Google({
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        clientId: process.env.GOOGLE_CLIENT_ID,
                    }),
                    ThirdParty.Github({
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        clientId: process.env.GITHUB_CLIENT_ID,
                    }),

                    // we have commented the below because our app domain (thirdparty.demo.supertokens.io) is not approved by Facebook since it's only a demo app.
                    // ThirdParty.Facebook({
                    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
                    //     clientId: process.env.FACEBOOK_CLIENT_ID
                    // })
                ],
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
app.use(middleware());

// custom API that requires session verification
app.get("/sessioninfo", verifySession(), async (req, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        jwtPayload: session.getJWTPayload(),
        sessionData: await session.getSessionData(),
    });
});

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
