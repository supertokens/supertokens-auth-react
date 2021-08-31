const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

function updateHeaders(res) {
    if (!res.headersSent) {
        const cookies = res.getHeader("Set-Cookie");
        if (cookies) {
            // We need to copy the Set-Cookie header into another one, since Set-Cookie is not accessible on the frontend
            res.setHeader("st-cookie", cookies);
            // We need to make the new header accessible to the frontend
            res.setHeader(
                "access-control-expose-headers",
                `st-cookie, ${res.getHeader("access-control-expose-headers")}`
            );

            // This is not strictly necessary
            res.removeHeader("Set-Cookie");
        }
    }
}

supertokens.init({
    supertokens: {
        connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailPassword.init(),
        Session.init({
            // CSRF protection is not necessary in this case, because there are no cookies that would be automatically sent
            antiCsrf: "NONE",
            override: {
                functions: (origImpl) => {
                    return {
                        ...origImpl,

                        createNewSession: async (input) => {
                            const session = await origImpl.createNewSession(input);

                            updateHeaders(session.res);

                            return session;
                        },

                        refreshSession: async (input) => {
                            const session = await origImpl.refreshSession(input);

                            updateHeaders(session.res);

                            return session;
                        },

                        getSession: async (input) => {
                            const stCookies = input.req.headers["st-cookie"];

                            if (stCookies) {
                                input.req.headers["cookie"] = input.req.headers["st-cookie"];
                            }
                            const res = origImpl.getSession(input);

                            updateHeaders(input.res);

                            return res;
                        },
                    };
                },

                apis: (origImpl) => {
                    return {
                        ...origImpl,

                        signOutPOST: async (input) => {
                            await origImpl.signOutPOST(input);

                            updateHeaders(input.options.res);
                        },

                        verifySession: async (input) => {
                            const stCookies = input.options.req.headers["st-cookie"];

                            if (stCookies) {
                                input.options.req.headers["cookie"] = input.options.req.headers["st-cookie"];
                            }

                            await origImpl.verifySession(input);

                            updateHeaders(input.options.res);
                        },

                        refreshPOST: async (input) => {
                            const stCookies = input.options.req.headers["st-cookie"];

                            if (stCookies) {
                                input.options.req.headers["cookie"] = input.options.req.headers["st-cookie"];
                            }

                            await origImpl.refreshPOST(input);

                            updateHeaders(input.options.res);
                        },
                    };
                },
            },
        }),
    ],
});

const app = express();

app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", "st-cookie", ...supertokens.getAllCORSHeaders()],
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
