import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import Session from "supertokens-node/recipe/session";
import Passwordless from "supertokens-node/recipe/passwordless";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import EmailVerification from "supertokens-node/recipe/emailverification";
import { TypeInput } from "supertokens-node/types";
import MultiFactorAuth from "supertokens-node/recipe/multifactorauth";
import TOTP from "supertokens-node/recipe/totp";
import Dashboard from "supertokens-node/recipe/dashboard";

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // this is the location of the SuperTokens core.
        // connectionURI: "https://try.supertokens.com",
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        UserMetadata.init(),
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        TOTP.init({
            override: {
                apis: (oI) => ({
                    ...oI,
                    verifyDevicePOST: async (input) => {
                        const resp = await oI.verifyDevicePOST(input);
                        if (resp.status === "OK") {
                            const payload = input.session.getAccessTokenPayload();
                            const recoveryCodeHash = payload.recoveryCodeHash;
                            if (recoveryCodeHash) {
                                // await input.session.mergeIntoAccessTokenPayload({ recoveryCodeHash: null });
                                await UserMetadata.updateUserMetadata(input.session.getUserId(), {
                                    recoveryCodeHash: null,
                                });
                            }
                        }
                        return resp;
                    },
                }),
            },
        }),
        MultiFactorAuth.init({
            firstFactors: ["thirdparty", "emailpassword"], // This is basically disallows using passwordless to sign in
            override: {
                functions: (oI) => ({
                    ...oI,
                    getMFARequirementsForAuth: async () => ["totp"],
                    isAllowedToSetupFactor: async (input) => {
                        const resp = await oI.isAllowedToSetupFactor(input);

                        if (resp) {
                            return resp;
                        }

                        const payload = input.session.getAccessTokenPayload();
                        const recoveryCodeHash = payload.recoveryCodeHash;
                        const userId = input.session.getUserId();
                        const { metadata } = await UserMetadata.getUserMetadata(userId);
                        return metadata.recoveryCodeHash === recoveryCodeHash;
                    },
                }),
            },
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
            ],
        }),
        Session.init(),
        Dashboard.init(),
    ],
};