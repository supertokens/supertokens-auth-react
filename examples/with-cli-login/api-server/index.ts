import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { v4 as uuidv4 } from "uuid";
import JWT from "supertokens-node/recipe/jwt";
require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

export const emailVerificationOn = true;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "https://try.supertokens.com",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                ThirdPartyEmailPassword.Google({
                    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                    clientSecret: "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",
                }),
                ThirdPartyEmailPassword.Github({
                    clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                    clientId: "467101b197249757c71f",
                }),
                ThirdPartyEmailPassword.Apple({
                    clientId: "4398792-io.supertokens.example.service",
                    clientSecret: {
                        keyId: "7M48Y4RYDL",
                        privateKey:
                            "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                        teamId: "YWQCXGJRJL",
                    },
                }),
            ],
        }),
        UserMetadata.init(),
        JWT.init({
            jwtValiditySeconds: 3153600000, // 100 years..
        }),
        Passwordless.init({
            contactMethod: "EMAIL",
            flowType: "MAGIC_LINK",
            override: {
                apis: (oI) => {
                    // we disable all of the default APIs for this recipe.
                    return {
                        ...oI,
                        consumeCodePOST: undefined,
                        createCodePOST: undefined,
                        resendCodePOST: undefined,
                    };
                },
            },
        }),
        Session.init(),
    ],
});

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: websiteDomain,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(middleware());

// An example API that requires session verification
app.post("/consumetoken", verifySession(), async (req: SessionRequest, res) => {
    let token = req.body.token;
    let preAuthSessionId = req.body.preAuthSessionId;

    let response = await Passwordless.consumeCode({
        preAuthSessionId,
        linkCode: token,
    });
    if (response.status === "OK") {
        // token has been consumed.
        let userId = req.session!.getUserId();

        // we save this so that the CLI can know that we have successfully logged in the user
        await UserMetadata.updateUserMetadata(preAuthSessionId, {
            userId,
        });

        // cleanup of passwordless user.
        await supertokens.deleteUser(response.user.id);
        return res.send({});
    }
    res.status(400).send("Could not consume code");
});

app.get("/getmagiclink", async (req, res) => {
    let link = await Passwordless.createMagicLink({
        email: uuidv4(),
    });
    res.status(200).send(link);
});

// this should be called by the CLI periodically to wait for the
// user to finish logging in
app.get("/waitforlogin", async (req, res) => {
    let preAuthSessionId: any = req.query.preAuthSessionId;
    let metadata = (await UserMetadata.getUserMetadata(preAuthSessionId)).metadata;
    if (metadata.userId === undefined) {
        // not consumed yet
        return res.send("Not consumed. Try again in sometime");
    } else {
        // we want to return a JWT to the CLI
        let jwt = await JWT.createJWT({
            sub: metadata.userId,
        });
        if (jwt.status === "OK") {
            res.send(jwt.jwt);
            await UserMetadata.clearUserMetadata(preAuthSessionId);
        } else {
            throw new Error("Should never come here");
        }
    }
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
