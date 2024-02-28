import express from "express";
import cors from "cors";
import supertokens, { getUser } from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Passwordless from "supertokens-node/recipe/passwordless";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import EmailVerification from "supertokens-node/recipe/emailverification";
import AccountLinking from "supertokens-node/recipe/accountlinking";
import MultiFactorAuth, { FactorIds, MultiFactorAuthClaim } from "supertokens-node/recipe/multifactorauth";
import Dashboard from "supertokens-node/recipe/dashboard";

require("dotenv").config();

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const apiDomain = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
const websiteDomain = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;

supertokens.init({
    framework: "express",
    supertokens: {
        // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
        connectionURI: "http://localhost:3567",
        apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain,
        websiteDomain,
    },
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        ThirdPartyEmailPassword.init({
            providers: [
                // We have provided you with development keys which you can use for testing.
                // IMPORTANT: Please replace them with your own OAuth keys for production use.
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                                clientSecret: "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",
                            },
                        ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "github",
                        clients: [
                            {
                                clientId: "467101b197249757c71f",
                                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                            },
                        ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "apple",
                        clients: [
                            {
                                clientId: "4398792-io.supertokens.example.service",
                                additionalConfig: {
                                    keyId: "7M48Y4RYDL",
                                    privateKey:
                                        "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                                    teamId: "YWQCXGJRJL",
                                },
                            },
                        ],
                    },
                },
            ],
        }),
        MultiFactorAuth.init({
            firstFactors: [FactorIds.EMAILPASSWORD, FactorIds.THIRDPARTY],
            override: {
                functions: (oI) => ({
                    ...oI,
                    getMFARequirementsForAuth: () => [FactorIds.OTP_PHONE],
                }),
                apis: (oI) => ({
                    ...oI,
                    resyncSessionAndFetchMFAInfoPUT: async (input) => {
                        if (oI.resyncSessionAndFetchMFAInfoPUT === undefined) {
                            throw new Error("This should never happen");
                        }

                        const user = await getUser(input.session.getUserId());
                        if (!user) {
                            throw new Error("This shouldn't happen");
                        }
                        const { metadata } = await UserMetadata.getUserMetadata(user.id);
                        if (
                            metadata.passwordlessUserId !== undefined &&
                            !user.loginMethods.some(
                                (lm) => lm.recipeUserId.getAsString() === metadata.passwordlessUserId
                            )
                        ) {
                            if (!user.isPrimaryUser) {
                                const res = await AccountLinking.createPrimaryUser(user.loginMethods[0].recipeUserId);
                                if (res.status !== "OK") {
                                    throw new Error(res.status);
                                }
                            }
                            const linkRes = await AccountLinking.linkAccounts(
                                supertokens.convertToRecipeUserId(metadata.passwordlessUserId),
                                user.id
                            );
                            if (linkRes.status !== "OK") {
                                throw new Error(linkRes.status);
                            }
                        }

                        const accessTokenPayload = input.session.getAccessTokenPayload();
                        const newClaimVal = await input.session.getClaimValue(MultiFactorAuthClaim);
                        const oldClaimValue = accessTokenPayload["2fa-completed"]?.v ?? false;
                        if (oldClaimValue && (newClaimVal === undefined || !newClaimVal.v)) {
                            await input.session.fetchAndSetClaim(MultiFactorAuthClaim);
                            await MultiFactorAuth.markFactorAsCompleteInSession(input.session, FactorIds.OTP_PHONE);
                        }

                        return oI.resyncSessionAndFetchMFAInfoPUT(input);
                    },
                }),
            },
        }),
        UserMetadata.init(),
        Passwordless.init({
            contactMethod: "PHONE",
            flowType: "USER_INPUT_CODE",
            smsDelivery: {
                override: (oI) => {
                    return {
                        ...oI,
                        sendSms: async function (input) {
                            console.log(input);
                        },
                    };
                },
            },
        }),
        AccountLinking.init({
            shouldDoAutomaticAccountLinking: async () => ({
                shouldAutomaticallyLink: true,
                shouldRequireVerification: true,
            }),
        }),
        Session.init(),
        Dashboard.init(),
    ],
});

const app = express();

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
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session!;
    res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

app.use(errorHandler());

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    res.status(500).send("Internal error: " + err.message);
});

app.listen(apiPort, () => console.log(`API Server listening on port ${apiPort}`));
