import Multitenancy from "supertokens-node/recipe/multitenancy";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import Passwordless from "supertokens-node/recipe/passwordless";
import Session, { getOpenIdDiscoveryConfiguration } from "supertokens-node/recipe/session";
import OAuth2Provider from "supertokens-node/recipe/oauth2provider";
import OAuth2Client from "supertokens-node/recipe/oauth2client";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";
import { readFile, writeFile } from "fs/promises";

export const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
export const apiPort = process.env.REACT_APP_API_PORT || 3001;

export function getApiDomain() {
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

export const SuperTokensConfig: TypeInput = {
    supertokens: {
        // this is the location of the SuperTokens core.
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
        Multitenancy.init(),
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [
                                {
                                    clientId:
                                        "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
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
                    {
                        config: {
                            thirdPartyId: "twitter",
                            clients: [
                                {
                                    clientId: "4398792-WXpqVXRiazdRMGNJdEZIa3RVQXc6MTpjaQ",
                                    clientSecret: "BivMbtwmcygbRLNQ0zk45yxvW246tnYnTFFq-LH39NwZMxFpdC",
                                },
                            ],
                        },
                    },
                ],
            },
        }),
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            getCustomUserInputCode: async (userContext) => {
                return "123456";
            },
            emailDelivery: {
                override: (oI) => ({
                    ...oI,
                    sendEmail: async (input) => {
                        console.log(input);
                    },
                }),
            },
            smsDelivery: {
                override: (oI) => ({
                    ...oI,
                    sendSms: async (input) => {
                        console.log(input);
                    },
                }),
            },
        }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
        OAuth2Provider.init(),
    ],
};

let clients: Record<string, { clientId: string; clientSecret: string | undefined }> = {};

export async function setupTenants() {
    try {
        const data = await readFile("../clients.json", "utf8");
        clients = JSON.parse(data);
    } catch (e) {
        console.error(e);
    }

    if (Object.keys(clients).length === 0) {
        const client1 = await OAuth2Provider.createOAuth2Client({
            redirectUris: ["http://localhost:3011/auth/callback"],
            tokenEndpointAuthMethod: "client_secret_post",
        });
        if (client1.status !== "OK") {
            throw new Error("Failed to create client1");
        }
        clients["tenant1"] = {
            clientId: client1.client.clientId,
            clientSecret: client1.client.clientSecret,
        };

        const client2 = await OAuth2Provider.createOAuth2Client({
            redirectUris: ["http://localhost:3012/auth/callback"],
            postLogoutRedirectUris: ["http://localhost:3012/loggedout"],
            policyUri: "http://localhost:3012/policy",
            clientName: "Tenant 2",
            clientUri: "http://localhost:3012",
            logoUri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
            tokenEndpointAuthMethod: "none",
        });
        if (client2.status !== "OK") {
            throw new Error("Failed to create client2");
        }
        clients["tenant2"] = {
            clientId: client2.client.clientId,
            clientSecret: client2.client.clientSecret,
        };

        const client3 = await OAuth2Provider.createOAuth2Client({
            redirectUris: ["http://localhost:3013/oauth2/redirect"],
            logoUri: "https://www.passportjs.org/images/logo.svg",
            scope: "openid profile email phoneNumber test",
            tokenEndpointAuthMethod: "client_secret_post",
        });
        if (client3.status !== "OK") {
            throw new Error("Failed to create client3");
        }
        clients["tenant3"] = {
            clientId: client3.client.clientId,
            clientSecret: client3.client.clientSecret,
        };

        await writeFile("../clients.json", JSON.stringify(clients, null, 2));
    }
}
