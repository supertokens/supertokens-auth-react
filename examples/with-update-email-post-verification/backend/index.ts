import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { getWebsiteDomain, SuperTokensConfig } from "./config";
import EmailVerification from "supertokens-node/recipe/emailverification";
import EmailPassword from "supertokens-node/recipe/emailpassword";

supertokens.init(SuperTokensConfig);

const app = express();

app.use(express.json());

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

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

app.get("/email", verifySession(), async (req: SessionRequest, res) => {
    let userId = req.session!.getUserId();
    let user = await EmailPassword.getUserById(userId);
    if (user === undefined) {
        throw new Error("Should never come here");
    }

    return res.send(user.email);
});

// This API is called from the frontend when the user enters their new email.
app.post("/change-email", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    let email = req.body.email;

    // Basic check to make sure that the input is a valid email ID.
    if (!isValidEmail(email)) {
        return res.status(400).send("Email is invalid");
    }

    // This resets the state of the session related to the email update.
    // We do this here cause there are many code flow branches below which result in
    // not triggering the email verification flow, in which we want to do this.
    // So instead of duplicating this code below, we do it once on top. If the
    // toUpdateEmail doesn't exist in the session, this is a no-op.
    await session.mergeIntoAccessTokenPayload({
        toUpdateEmail: null,
    });

    // First we check if the new email is already associated with another user.
    // If it is, then we throw an error. If it's already associated with this user,
    // then we return a success response with an appropriate message.
    let existingUser = await EmailPassword.getUserByEmail(email);
    if (existingUser !== undefined) {
        if (existingUser.id === session.getUserId()) {
            return res.status(200).send("Email already belongs to this account");
        } else {
            return res.status(400).send("Email already exists with another user");
        }
    }

    // Then, we check if the email is verified for this user ID or not.
    // It is important to understand that SuperTokens stores email verification
    // status based on the user ID AND the email, and not just the email.
    let isVerified = await EmailVerification.isEmailVerified(session.getUserId(), email);

    if (isVerified) {
        // This means that the user has already verified the email at some point in time
        // in the past. So we attempt a direct update.
        let resp = await EmailPassword.updateEmailOrPassword({
            userId: session.getUserId(),
            email: email,
        });

        if (resp.status === "OK") {
            return res.status(200).send("Successfully updated email");
        }
        if (resp.status === "EMAIL_ALREADY_EXISTS_ERROR") {
            // Technically it should never come here cause we have
            // checked for this above already, but just in case (some sort of race condition).
            return res.status(400).send("Email already exists with another user");
        }
        throw new Error("Should never come here");
    } else {
        // Now we need to start the email verification flow. Usually, the
        // email verification APIs use the email that is associated with the user's
        // ID, but here we want to instruct it to use the input email.

        // We do this by adding a custom payload to the access token, which will
        // be read by the email verification recipe (see backend/config.ts file)
        // and the flow will be done on this email.

        // We also set the email verification claim value to false for this session
        // so that the frontend redirects to the email verification screen (this happens
        // automatically for the pre built UI). Setting it to false also ensures that
        // the user no longer has access to any other application's APIs that is protected
        // by verifySession / getSession until they verify the new email, or re-login with their
        // older email.

        await session.mergeIntoAccessTokenPayload({
            toUpdateEmail: email,
        });

        await session.setClaimValue(EmailVerification.EmailVerificationClaim, false);

        // status code 202 is not a special value here. You can use any other status code as well.
        // But you need to make sure that the redirection to the email verification page
        // happens via the frontend, so that the access token payload is correctly updated
        // on the frontend as well.
        return res.status(202).send("Redirect to email verification screen");
    }
});

function isValidEmail(email: string) {
    let regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
}

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
