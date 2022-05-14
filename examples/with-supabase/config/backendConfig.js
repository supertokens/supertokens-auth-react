import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import jwt from "jsonwebtoken";

export let backendConfig = () => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "https://try.supertokens.io",
        },
        appInfo,
        recipeList: [
            ThirdPartyEmailPasswordNode.init({
                providers: [
                    // We have provided you with development keys which you can use for testing.
                    // IMPORTANT: Please replace them with your own OAuth keys for production use.
                    ThirdPartyEmailPasswordNode.Google({
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    }),
                    ThirdPartyEmailPasswordNode.Github({
                        clientId: process.env.GITHUB_CLIENT_ID,
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    }),
                    ThirdPartyEmailPasswordNode.Apple({
                        clientId: process.env.APPLE_CLIENT_ID,
                        clientSecret: {
                            keyId: process.env.APPLE_KEY_ID,
                            privateKey: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                            teamId: process.env.APPLE_TEAM_ID,
                        },
                    }),
                ],
            }),
            SessionNode.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            // We want to create a JWT which contains the users email signed with Supabase's secret so
                            // it can be used by Supabase to validate the user when retrieving user data from their service.
                            // We store this token in the accessTokenPayload so it can be accessed on the frontend and on the backend.
                            createNewSession: async function (input) {
                                let email = (await ThirdPartyEmailPasswordNode.getUserById(input.userId)).email;
                                const payload = {
                                    email,
                                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                                };

                                const supabase_jwt_token = jwt.sign(payload, process.env.SUPABASE_SIGNING_SECRET);

                                input.accessTokenPayload = {
                                    ...input.accessTokenPayload,
                                    supabase_token: supabase_jwt_token,
                                };

                                return await originalImplementation.createNewSession(input);
                            },
                        };
                    },
                },
            }),
        ],
        isInServerlessEnv: true,
    };
};
