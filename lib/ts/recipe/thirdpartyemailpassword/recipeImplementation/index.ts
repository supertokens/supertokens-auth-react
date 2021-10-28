import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../emailpassword/types";
import { NormalisedConfig as TPConfig, StateObject } from "../../thirdparty/types";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const emailpasswordImpl = EmailPasswordRecipeImplementation(recipeId, appInfo);
    const thirdPartyImpl = ThirdPartyRecipeImplementation(recipeId, appInfo);

    return {
        submitNewPassword: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            token: string;
            config: EPConfig;
        }) {
            return emailpasswordImpl.submitNewPassword(input);
        },
        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: EPConfig;
        }) {
            return emailpasswordImpl.sendPasswordResetEmail(input);
        },
        doesEmailExist: async function (input: { email: string; config: EPConfig }) {
            return emailpasswordImpl.doesEmailExist(input);
        },
        getOAuthAuthorisationURL: async function (input: { thirdPartyId: string; config: TPConfig }) {
            return thirdPartyImpl.getOAuthAuthorisationURL(input);
        },
        signInAndUp: async function (input: SignInAndUpInput): Promise<SignInAndUpOutput> {
            if (input.type === "emailpassword") {
                if (input.isSignIn) {
                    const response = await emailpasswordImpl.signIn(input);
                    if (response.status === "OK") {
                        return {
                            ...response,
                            createdNewUser: false,
                            type: "emailpassword",
                        };
                    } else {
                        return {
                            ...response,
                            type: "emailpassword",
                        };
                    }
                } else {
                    const response = await emailpasswordImpl.signUp(input);
                    if (response.status === "OK") {
                        return {
                            ...response,
                            createdNewUser: true,
                            type: "emailpassword",
                        };
                    } else {
                        return {
                            ...response,
                            type: "emailpassword",
                        };
                    }
                }
            } else {
                const response = await thirdPartyImpl.signInAndUp(input);
                return {
                    ...response,
                    type: "thirdparty",
                };
            }
        },
        getOAuthState: function () {
            return thirdPartyImpl.getOAuthState();
        },
        setOAuthState: function (input: StateObject) {
            return thirdPartyImpl.setOAuthState(input);
        },
        redirectToThirdPartyLogin: function (input: { thirdPartyId: string; config: TPConfig; state?: StateObject }) {
            return thirdPartyImpl.redirectToThirdPartyLogin(input);
        },
    };
}
