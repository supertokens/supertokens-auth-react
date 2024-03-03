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
import Passwordless from "supertokens-node/recipe/passwordless";

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

    res.json({
        user: user.toJson(),
    });
});

app.post("/addPassword", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session!;
    // First we check that the current session (and the user it belongs to) can have a user linked to it.
    const user = await getUser(session.getRecipeUserId().getAsString());
    if (!user) {
        throw new Session.Error({ type: Session.Error.UNAUTHORISED, message: "user removed" });
    }

    const currentLoginMethod = user.loginMethods.find(
        (m) => m.recipeUserId.getAsString() === session.getRecipeUserId().getAsString()
    );
    if (!currentLoginMethod) {
        throw new Error("This should never happen");
    }

    if (currentLoginMethod.recipeId === "emailpassword") {
        return res.json({
            status: "GENERAL_ERROR",
            message: "This user already logged in using a password",
        });
    }

    if (!currentLoginMethod.verified) {
        return res.json({
            status: "GENERAL_ERROR",
            message: "You can only add a password when logged in using a verified account",
        });
    }

    if (currentLoginMethod.email === undefined) {
        return res.json({
            status: "GENERAL_ERROR",
            message: "You can only add a password to accounts associated with email addresses",
        });
    }

    // We then "add the password" by signing up with a new user
    let password: string = req.body.password;
    const signUpResp = await ThirdPartyEmailPassword.emailPasswordSignUp(
        session.getTenantId(),
        currentLoginMethod.email,
        password
    );

    if (signUpResp.status === "EMAIL_ALREADY_EXISTS_ERROR") {
        // In this case the current user has an email that has already signed up
        // If they are not linked, the other user can be deleted on the dashboard
        // (or merged here if you provide an app specific implementation, but that is a longer/separate topic)
        return res.json({
            status: "GENERAL_ERROR",
            message: "This user has already signed up using a password.",
        });
    }

    // Here we can assume the user in signUpResp is not a primary user since it was just created
    // Plus the linkAccounts checks anyway
    const newRecipeUserId = signUpResp.user.loginMethods[0].recipeUserId;

    const linkResp = await AccountLinking.linkAccounts(newRecipeUserId, session.getUserId());
    if (linkResp.status !== "OK") {
        return res.json({
            status: "GENERAL_ERROR",
            message: `Account linking failed (${linkResp.status})`,
        });
    }
    // if the access token payload contains any information that'd change based on the new account, we'd want to update it here.

    return res.json({
        status: "OK",
        user: linkResp.user,
    });
});

app.post("/addPhoneNumber", verifySession(), async (req: SessionRequest, res) => {
    const session = req.session!;
    // First we check that the current session (and the user it belongs to) can have a user linked to it.
    const user = await getUser(session.getRecipeUserId().getAsString());
    if (!user) {
        throw new Session.Error({ type: Session.Error.UNAUTHORISED, message: "user removed" });
    }
    const loginMethod = user.loginMethods.find(
        (m) => m.recipeUserId.getAsString() === session.getRecipeUserId().getAsString()
    );
    if (!loginMethod) {
        throw new Error("This should never happen");
    }

    if (!loginMethod.verified) {
        return res.json({
            status: "GENERAL_ERROR",
            message: "You can only add a phone number when logged in using a verified account",
        });
    }

    const phoneNumber = req.body.phoneNumber;
    const signUpResp = await Passwordless.signInUp({
        tenantId: session.getTenantId(),
        phoneNumber,
        userContext: { doNotLink: true },
    });

    if (signUpResp.createdNewRecipeUser === false) {
        return res.json({
            status: "GENERAL_ERROR",
            message: "You can only add a phone number to a single user",
        });
    }
    const newRecipeUserId = signUpResp.user.loginMethods[0].recipeUserId;

    const linkResp = await AccountLinking.linkAccounts(newRecipeUserId, session.getUserId());
    if (linkResp.status !== "OK") {
        return res.json({
            status: "GENERAL_ERROR",
            message: `Account linking failed (${linkResp.status})`,
        });
    }
    // if the access token payload contains any information that'd change based on the new account, we'd want to update it here.

    return res.json({
        status: "OK",
        user: linkResp.user,
    });
});

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
