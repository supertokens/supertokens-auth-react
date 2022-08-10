const express = require("express");
const cors = require("cors");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://example.com:${websitePort}`;
let whitelist = /^(https?:\/\/([a-z0-9]+[.])example[.]com(?::\d{1,5})?)$/;

let getUserDomain = (email) => {
    // extracts the userDomain from the email used to sign up
    // ex. from employee@supertokens.com, "supertokens" will be extracted as the userDomain
    let userDomain = email.split("@")[1].split(".")[0];
    return userDomain;
};
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailPassword.init({
            resetPasswordUsingTokenFeature: {
                getResetPasswordURL: async (user) => {
                    let { id, email } = user;

                    // getUserDomain is your implementation
                    let userDomain = await getUserDomain(email);

                    return `http://${userDomain}.example.com:${websitePort}/auth/reset-password`;
                },
            },
        }),
        Session.init(),
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

app.get("/user-subdomain", verifySession(), async (req, res) => {
    const session = req.session;
    const userDetails = await EmailPassword.getUserById(session.getUserId());
    const subdomain = getUserDomain(userDetails.email);
    res.send({ subdomain });
});

app.use(errorHandler());

app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
