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

    // retrieve user's email from supabase
    const { data } = await supabase.from("users").select("email").eq("user_id", userId);

    let email = data[0].email;

    return res.json({
        note: "Fetch any data from your application for authenticated user after using verifySession middleware",
        userId,
        email,
        sessionHandle: req.session.getHandle(),
        accessTokenPayload,
    });
}
