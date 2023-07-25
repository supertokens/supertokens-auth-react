const express = require("express");
const cors = require("cors");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let { verifySession } = require("supertokens-node/recipe/session/framework/express");
let { middleware, errorHandler } = require("supertokens-node/framework/express");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let ThirdPartyPasswordless = require("supertokens-node/recipe/thirdpartypasswordless");
let Dashboard = require("supertokens-node/recipe/dashboard");
let Multitenancy = require("supertokens-node/recipe/multitenancy");
let EmailVerification = require("supertokens-node/recipe/emailverification");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://example.com:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        //apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
            emailDelivery: {
                override: (oI) => ({
                    ...oI,
                    sendEmail: (input) => {
                        input.emailVerifyLink = input.emailVerifyLink.replace(
                            "//example.com",
                            `//${input.tenantId}.example.com`
                        );
                        return oI.sendEmail(input);
                    },
                }),
            },
        }),
        Multitenancy.init({
            getAllowedDomainsForTenantId: async (tenantId, userContext) => {
                // query your db to get the allowed domain for the input tenantId
                // or you can make the tenantId equal to the sub domain itself
                return [tenantId + ".example.com"];
            },
        }),
        ThirdPartyPasswordless.init({
            contactMethod: "EMAIL",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            emailDelivery: {
                override: (oI) => ({
                    ...oI,
                    sendEmail: (input) => {
                        input.urlWithLinkCode = input.urlWithLinkCode.replace(
                            "//example.com",
                            `//${input.tenantId}.example.com`
                        );
                        return oI.sendEmail(input);
                    },
                }),
            },
        }),
        ThirdPartyEmailPassword.init({
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
        origin: [/^(https?:\/\/([a-z0-9]+[.])example[.]com(?::\d{1,5})?)$/, "http://example.com:3000"],
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
