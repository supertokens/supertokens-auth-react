import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import jwt from "jsonwebtoken";
import { getSupabase } from "../utils/supabase";

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
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            thirdPartySignInUpPOST: async function (input) {
                                if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                let response = await originalImplementation.thirdPartySignInUpPOST(input);

                                if (response.status === "OK") {
                                    // retrieve the supabase_token from the accessTokenPayload
                                    const accessTokenPayload = response.session.getAccessTokenPayload();

                                    // create a supabase client whose JWT contains the user's id
                                    const supabase = getSupabase(accessTokenPayload.supabase_token);

                                    // store the user's email mapped to their userId in Supabase
                                    const { error } = await supabase
                                        .from("users")
                                        .insert({ email: response.user.email, user_id: response.user.id });

                                    if (error !== null) {
                                        if (error.message.includes("duplicate key value violates unique constraint")) {
                                            // if the user has already signed up and the email-userId mapping already exists in the
                                            // supabase table, the insert will throw a duplicate key exception. We can ignore this error
                                        } else {
                                            // Since Row Level Security is enabled in our Supabase tables, if a policy for inserting
                                            // rows to a table has not been defined, insertion will throw an error.
                                            throw new Error(error);
                                        }
                                    }
                                }

                                return response;
                            },

                            emailPasswordSignUpPOST: async function (input) {
                                if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                let response = await originalImplementation.emailPasswordSignUpPOST(input);

                                if (response.status === "OK") {
                                    // retrieve the supabase_token from the accessTokenPayload
                                    const accessTokenPayload = response.session.getAccessTokenPayload();

                                    // create a supabase client whose JWT contains the user's id
                                    const supabase = getSupabase(accessTokenPayload.supabase_token);

                                    // store the user's email mapped to their userId in Supabase
                                    const { error } = await supabase
                                        .from("users")
                                        .insert({ email: response.user.email, user_id: response.user.id });

                                    if (error !== null) {
                                        if (error.message.includes("duplicate key value violates unique constraint")) {
                                            // if the email-userId mapping already exists in the supabase table, the insert will throw a
                                            // duplicate key exception. We can ignore this error
                                        } else {
                                            // Since Row Level Security is enabled in our Supabase tables, if a policy for inserting
                                            // rows to a table has not been defined, insertion will throw an error.
                                            throw new Error(error);
                                        }
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
        ],
        isInServerlessEnv: true,
    };
};
