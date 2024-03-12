import express from "express";
import cors from "cors";
import crypto from "crypto";
import supertokens, { getUser } from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "./config";
import Session from "supertokens-node/recipe/session";
import { getUserMetadata, updateUserMetadata } from "supertokens-node/recipe/usermetadata";
import { RecoveryCodeExistsClaim } from "./recoveryCodeExistsClaim";

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

app.post("/createRecoveryCode", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session!;

    const recoveryCode = crypto.randomUUID();

    const updateRes = await updateUserMetadata(session.getUserId(), {
        recoveryCodeHash: hash(recoveryCode),
    });
    await session.setClaimValue(RecoveryCodeExistsClaim, true);

    return res.json({ status: updateRes.status, recoveryCode });
});

app.post(
    "/useRecoveryCode",
    verifySession({ overrideGlobalClaimValidators: () => [] }),
    async (req: SessionRequest, res) => {
        const session = req.session!;
        const userId = session.getUserId();

        const recoveryCode = req.body.recoveryCode;
        const recoveryCodeHash = hash(recoveryCode);

        const metadata = await getUserMetadata(userId);

        if (metadata.metadata.recoveryCodeHash === recoveryCodeHash) {
            await session.mergeIntoAccessTokenPayload({ recoveryCodeHash });

            return res.json({ status: "OK" });
        }

        return res.json({ status: "ERROR" });
    }
);

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));

function hash(recoveryCode: string) {
    return crypto.createHash("sha256").update(recoveryCode).digest("base64");
}
