// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { superTokensNextWrapper } from "supertokens-node/nextjs";
import supertokens from "supertokens-node";
import * as SuperTokensConfig from "../../../config/supertokensConfig";
import NextCors from "nextjs-cors";

supertokens.init(SuperTokensConfig.backendConfig());

export default async function superTokens(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        credentials: true,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    });

    await superTokensNextWrapper(
        async (next) => {
            await supertokens.middleware()(req, res, next);
        },
        req,
        res
    );
    if (!res.writableEnded) {
        res.status(404).send("Not found");
    }
}
