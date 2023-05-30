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

app.post("/change-email", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    let email = req.body.email;

    if (!isValidEmail(email)) {
        return res.status(400).send("Email is invalid");
    }

    // this resets the state of the session.
    await session.mergeIntoAccessTokenPayload({
        toUpdateEmail: null,
    });

    // first we check if this email is already associated with another user or not.
    // if it is, then we throw an error.
    let existingUser = await EmailPassword.getUserByEmail(email);
    if (existingUser !== undefined) {
        if (existingUser.id === session.getUserId()) {
            return res.status(200).send("Email already belongs to this account");
        } else {
            return res.status(400).send("Email already exists with another user");
        }
    }

    // first we check if the email is verified for this user or not.
    let isVerified = await EmailVerification.isEmailVerified(session.getUserId(), email);

    if (isVerified) {
        let resp = await EmailPassword.updateEmailOrPassword({
            userId: session.getUserId(),
            email: email,
        });

        if (resp.status === "OK") {
            return res.status(200).send("Successfully updated email");
        }
        if (resp.status === "EMAIL_ALREADY_EXISTS_ERROR") {
            return res.status(400).send("Email already exists with another user");
        }
        throw new Error("Should never come here");
    } else {
        // now we add to the access token payload that the email needs to be verified,
        // and we update the session claim to set the value of email verification to false,
        // so that the frontend redirects to the email verification screen.

        // The email verification functions will read the custom access token payload
        // and then do the email verification flow on the new email.

        // Once the verification is done, the email verification API will also call the
        // updateEmailOrPassword on the new email to complete the flow.

        await session.mergeIntoAccessTokenPayload({
            toUpdateEmail: email,
        });

        await session.setClaimValue(EmailVerification.EmailVerificationClaim, false);

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
