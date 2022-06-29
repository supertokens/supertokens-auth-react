import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

function updateHeaders(res: any) {
    if (!res.original.headersSent) {
        const cookies = res.original.getHeader("Set-Cookie");
        if (cookies) {
            // We need to copy the Set-Cookie header into another one, since Set-Cookie is not accessible on the frontend
            res.original.setHeader("st-cookie", cookies);
            // We need to make the new header accessible to the frontend
            res.original.setHeader(
                "access-control-expose-headers",
                `st-cookie, ${res.original.getHeader("access-control-expose-headers")}`
            );

            // This is not strictly necessary, it's more for testing purposes
            res.original.removeHeader("Set-Cookie");
        }
    }
}

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
        EmailPassword.init(),
        Session.init({
            // // CSRF protection is not necessary in this case, because there are no cookies that would be automatically sent
            // antiCsrf: "NONE",
            // override: {
            //     functions: (origImpl) => {
            //         return {
            //             ...origImpl,
            //             createNewSession: async function (input) {
            //                 // We start with calling the original implementation because it doesn't need a session
            //                 const session = await origImpl.createNewSession(input);
            //                 // We need to copy the Set-Cookies header into the custom header in the response.
            //                 updateHeaders(input.res);
            //                 return session;
            //             },
            //             refreshSession: async function (input) {
            //                 // Before calling the original implementation, we need to check the custom header.
            //                 const stCookies = input.req.original.headers["st-cookie"];
            //                 // If it was defined, we should overwrite the original cookies header with it.
            //                 // Since the format matches, SuperTokens can access and parse them.
            //                 if (stCookies) {
            //                     input.req.original.headers["cookie"] = input.req.original.headers["st-cookie"];
            //                 }
            //                 // Calling the original implementation
            //                 const session = await origImpl.refreshSession(input);
            //                 // We need to copy the Set-Cookies header into the custom header in the response.
            //                 updateHeaders(input.res);
            //                 return session;
            //             },
            //             getSession: async function (input) {
            //                 // Before calling the original implementation, we need to check the custom header.
            //                 const stCookies = input.req.original.headers["st-cookie"];
            //                 // If it was defined, we should overwrite the original cookies header with it.
            //                 // Since the format matches, SuperTokens can access and parse them.
            //                 if (stCookies) {
            //                     input.req.original.headers["cookie"] = input.req.original.headers["st-cookie"];
            //                 }
            //                 // Calling the original implementation
            //                 const res = origImpl.getSession(input);
            //                 // This method can change cookie values, so we need to copy the Set-Cookies header into the custom header in the response.
            //                 updateHeaders(input.res);
            //                 return res;
            //             },
            //         };
            //     },
            //     apis: (origImpl) => {
            //         return {
            //             ...origImpl,
            //             signOutPOST: async function (input) {
            //                 // We don't need to overwrite cookies before calling the original implementation since it loads the session using the
            //                 // getSession function we already handled above
            //                 let resp = await origImpl.signOutPOST!(input);
            //                 // signOutPOST clears cookie values, so we need to copy the Set-Cookies header into the custom header in the response.
            //                 updateHeaders(input.options.res);
            //                 return resp;
            //             },
            //         };
            //     },
            // },
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

app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
        sessionData: await session.getSessionData(),
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
