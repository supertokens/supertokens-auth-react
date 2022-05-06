import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import NextCors from "nextjs-cors";
import { backendConfig } from "../../config/backendConfig";

supertokens.init(backendConfig());

export default async function user(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        credentials: true,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    });

    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res
    );

    return res.json({
        note: "Fetch any data from your application for authenticated user after using verifySession middleware",
        userId: req.session.getUserId(),
        sessionHandle: req.session.getHandle(),
        accessTokenPayload: req.session.getAccessTokenPayload(),
    });
}
