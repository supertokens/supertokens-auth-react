import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { apiPort, getWebsiteDomain, setupTenants, SuperTokensConfig } from "./config";
import OAuth2Provider from "supertokens-node/recipe/oauth2provider";

supertokens.init(SuperTokensConfig);

const app = express();

app.use(
    cors({
        origin: [getWebsiteDomain(), "http://localhost:3011", "http://localhost:3012", "http://localhost:3013"],
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

const testObj = {
    name: "John Doe",
    age: 30,
    email: "john.doe@client.localhost",
};

app.get("/test", async (req, res) => {
    let you: any = "not authorized";
    if (req.headers.authorization) {
        const token = await OAuth2Provider.validateOAuth2AccessToken(req.headers.authorization.split(" ")[1]);
        you = token.payload;
    }

    res.send({
        resp: testObj[req.query.prop as keyof typeof testObj] ?? "no query?",
        you,
    });
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, async () => {
    console.log("Setting up tenants");
    await setupTenants();
    console.log("Tenants setup complete");
    console.log(`API Server listening on port ${apiPort}`);
});
