import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../emailpassword/types";
import { NormalisedConfig as TPConfig, StateObject } from "../../thirdparty/types";
import DerivedEP from "./emailPasswordImplementation";
import DerivedTP from "./thirdPartyImplementation";

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
            return emailpasswordImpl.submitNewPassword.bind(DerivedEP(this))(input);
        },
        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: EPConfig;
        }) {
            return emailpasswordImpl.sendPasswordResetEmail.bind(DerivedEP(this))(input);
        },
        doesEmailExist: async function (input: { email: string; config: EPConfig }) {
            return emailpasswordImpl.doesEmailExist.bind(DerivedEP(this))(input);
        },
        getOAuthAuthorisationURL: async function (input: { thirdPartyId: string; config: TPConfig }) {
            return thirdPartyImpl.getOAuthAuthorisationURL.bind(DerivedTP(this))(input);
        },
        signInAndUp: async function (input: SignInAndUpInput): Promise<SignInAndUpOutput> {
            if (input.type === "emailpassword") {
                if (input.isSignIn) {
                    const response = await emailpasswordImpl.signIn.bind(DerivedEP(this))(input);
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
                    const response = await emailpasswordImpl.signUp.bind(DerivedEP(this))(input);
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
                const response = await thirdPartyImpl.signInAndUp.bind(DerivedTP(this))(input);
                return {
                    ...response,
                    type: "thirdparty",
                };
            }
        },
        getOAuthState: function () {
            return thirdPartyImpl.getOAuthState.bind(DerivedTP(this))();
        },
        setOAuthState: function (input: StateObject) {
            return thirdPartyImpl.setOAuthState.bind(DerivedTP(this))(input);
        },
        redirectToThirdPartyLogin: function (input: { thirdPartyId: string; config: TPConfig; state?: StateObject }) {
            return thirdPartyImpl.redirectToThirdPartyLogin.bind(DerivedTP(this))(input);
        },
    };
}
