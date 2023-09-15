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
    let user = await supertokens.getUser(userId);
    if (user === undefined) {
        throw new Error("Should never come here");
    }

    return res.send(user.emails[0]);
});

// This API is called from the frontend when the user enters their new email.
app.post("/change-email", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    let email = req.body.email;

    // Basic check to make sure that the input is a valid email ID.
    if (!isValidEmail(email)) {
        return res.status(400).send("Email is invalid");
    }

    // First we check if the new email is already associated with another user.
    // If it is, then we throw an error. If it's already associated with this user,
    // then we return a success response with an appropriate message.
    let users = await supertokens.listUsersByAccountInfo(session.getTenantId(), { email });
    const existingUser = users[0];
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
    let isVerified = await EmailVerification.isEmailVerified(session.getRecipeUserId(), email);

    if (!isVerified) {
        // Now we send the email verification link to the user for the new email.
        const sendEmailRes = await EmailVerification.sendEmailVerificationEmail(
            session.getTenantId(),
            session.getUserId(),
            session.getRecipeUserId(),
            email
        );

        if (sendEmailRes.status === "OK") {
            return res.status(200).send("Email verification email sent");
        }
        // else case is that the email is already verified (which can happen cause
        // of some race condition). So we continue below..
    }

    // Since the email is verified, we try and do an update
    let resp = await EmailPassword.updateEmailOrPassword({
        recipeUserId: session.getRecipeUserId(),
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
