import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import { backendConfig } from "../../config/backendConfig";
import { getSupabase } from "../../utils/supabase";

supertokens.init(backendConfig());

export default async function user(req, res) {
    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res
    );

    const accessTokenPayload = req.session.getAccessTokenPayload();
    const userId = req.session.getUserId();

    const supabase = getSupabase(accessTokenPayload.supabase_token);

    // retrieve user name from supabase
    const { data } = await supabase.from("user_name").select("user_name").eq("user_id", userId);

    let userName = "";

    if (data[0] !== undefined) {
        userName = data[0].user_name;
    }

    return res.json({
        note: "Fetch any data from your application for authenticated user after using verifySession middleware",
        userId,
        userName,
        sessionHandle: req.session.getHandle(),
        accessTokenPayload,
    });
}
