import express from "express";
import cors from "cors";
import supertokens, { getUser, listUsersByAccountInfo } from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "./config";
import EmailVerification from "supertokens-node/recipe/emailverification";
import AccountLinking from "supertokens-node/recipe/accountlinking";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { MultiFactorAuthClaim } from "supertokens-node/recipe/multifactorauth";
import { getUserMetadata, updateUserMetadata } from "supertokens-node/recipe/usermetadata";

supertokens.init(SuperTokensConfig);

const app = express();

app.use(
    cors({
        origin: getWebsiteDomain(),
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());
app.use(express.json());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

app.get(
    "/sessioninfo-2fa",
    verifySession({
        overrideGlobalClaimValidators: (gv) => [
            ...gv,
            MultiFactorAuthClaim.validators.hasCompletedFactors([{ oneOf: ["otp-phone", "otp-email", "totp"] }]),
        ],
    }),
    async (req: SessionRequest, res) => {
        let session = req.session;
        res.send({
            sessionHandle: session!.getHandle(),
            userId: session!.getUserId(),
            accessTokenPayload: session!.getAccessTokenPayload(),
        });
    }
);

app.get(
    "/sessioninfo-3fa",
    verifySession({
        overrideGlobalClaimValidators: (gv) => [
            ...gv,
            MultiFactorAuthClaim.validators.hasCompletedFactors(["totp", { oneOf: ["otp-phone", "otp-email"] }]),
        ],
    }),
    async (req: SessionRequest, res) => {
        let session = req.session;
        res.send({
            sessionHandle: session!.getHandle(),
            userId: session!.getUserId(),
            accessTokenPayload: session!.getAccessTokenPayload(),
        });
    }
);

app.get("/userInfo", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session!;
    const user = await getUser(session.getRecipeUserId().getAsString());
    if (!user) {
        throw new Session.Error({ type: Session.Error.UNAUTHORISED, message: "user removed" });
    }
    const metadata = await getUserMetadata(user.id);

    res.json({
        user: user.toJson(),
        metadata: metadata.metadata,
    });
});

app.post("/updateMFA", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session!;

    const updateRes = await updateUserMetadata(session.getUserId(), {
        enable2FA: !!req.body.enable2FA,
        enable3FA: !!req.body.enable3FA,
    });

    return res.json(updateRes);
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
