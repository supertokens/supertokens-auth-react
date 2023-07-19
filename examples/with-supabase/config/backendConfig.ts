import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import EmailVerificationNode from "supertokens-node/recipe/emailverification";
import { appInfo } from "./appInfo";
import jwt from "jsonwebtoken";
import { getSupabase } from "../utils/supabase";
import { TypeInput } from "supertokens-node/lib/build/types";
import Dashboard from "supertokens-node/recipe/dashboard";

export let backendConfig = (): TypeInput => {
    return {
        framework: "express",
        supertokens: {
            connectionURI: "https://try.supertokens.com",
        },
        appInfo,
        recipeList: [
            EmailVerificationNode.init({
                mode: "REQUIRED",
            }),
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
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            // the thirdPartySignInUpPost function handles sign up/in via Social login
                            thirdPartySignInUpPOST: async function (input) {
                                if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                // call the sign up/in api for social login
                                let response = await originalImplementation.thirdPartySignInUpPOST(input);

                                // check that there is no issue with sign up and that a new user is created
                                if (response.status === "OK" && response.createdNewUser) {
                                    // retrieve the supabase_token from the accessTokenPayload
                                    const accessTokenPayload = response.session.getAccessTokenPayload();

                                    // create a supabase client with the supabase_token from the accessTokenPayload
                                    const supabase = getSupabase(accessTokenPayload.supabase_token);

                                    // store the user's email mapped to their userId in Supabase
                                    const { error } = await supabase
                                        .from("users")
                                        .insert({ email: response.user.email, user_id: response.user.id });

                                    if (error !== null) {
                                        throw error;
                                    }
                                }

                                return response;
                            },

                            // the emailPasswordSignUpPOST function handles sign up via Email-Password
                            emailPasswordSignUpPOST: async function (input) {
                                if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                let response = await originalImplementation.emailPasswordSignUpPOST(input);

                                if (response.status === "OK") {
                                    // retrieve the accessTokenPayload from the user's session
                                    const accessTokenPayload = response.session.getAccessTokenPayload();

                                    // create a supabase client with the supabase_token from the accessTokenPayload
                                    const supabase = getSupabase(accessTokenPayload.supabase_token);

                                    // store the user's email mapped to their userId in Supabase
                                    const { error } = await supabase
                                        .from("users")
                                        .insert({ email: response.user.email, user_id: response.user.id });

                                    if (error !== null) {
                                        throw error;
                                    }
                                }

                                return response;
                            },
                        };
                    },
                },
            }),
            SessionNode.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            // We want to create a JWT which contains the users userId signed with Supabase's secret so
                            // it can be used by Supabase to validate the user when retrieving user data from their service.
                            // We store this token in the accessTokenPayload so it can be accessed on the frontend and on the backend.
                            createNewSession: async function (input) {
                                const payload = {
                                    sub: input.userId,
                                    userId: input.userId,
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
            Dashboard.init(),
        ],
        isInServerlessEnv: true,
    };
};
