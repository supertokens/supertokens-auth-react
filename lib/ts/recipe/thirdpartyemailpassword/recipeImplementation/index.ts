import { NormalisedConfig, RecipeInterface, SignInAndUpInput, SignInAndUpOutput } from "../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../emailpassword/types";
import { NormalisedConfig as TPConfig, StateObject } from "../../thirdparty/types";
import DerivedEP from "./emailPasswordImplementation";
import DerivedTP from "./thirdPartyImplementation";
import WebJSEmailPassword from "supertokens-web-js/lib/build/recipe/emailpassword/recipe";
import EmailVerification from "../../emailverification/recipe";
import WebJSThirdParty from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";

export default function getRecipeImplementation(
    config: NormalisedConfig,
    emailVerificationInstance: EmailVerification | undefined
): RecipeInterface {
    // TODO NEMI: This is temporary to fix types for email password, will be refactored when tpep is implemented
    const webJsEmailPassword = new WebJSEmailPassword(
        {
            appInfo: config.appInfo,
            recipeId: config.recipeId,
            preAPIHook: config.preAPIHook,
            postAPIHook: config.postAPIHook,
        },
        {
            emailVerification: emailVerificationInstance?.webJsRecipe,
        }
    );

    // TODO NEMI: This is temporary to fix types for third party, will be refactored when tpep is implemented
    const thirdPartyEmailPassword = new WebJSThirdParty(
        {
            appInfo: config.appInfo,
            recipeId: config.recipeId,
            preAPIHook: config.preAPIHook,
            postAPIHook: config.postAPIHook,
        },
        {
            emailVerification: emailVerificationInstance?.webJsRecipe,
        }
    );

    const emailpasswordImpl = EmailPasswordRecipeImplementation(webJsEmailPassword);
    const thirdPartyImpl = ThirdPartyRecipeImplementation(thirdPartyEmailPassword);

    return {
        submitNewPassword: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            token: string;
            config: EPConfig;
            userContext: any;
        }) {
            return emailpasswordImpl.submitNewPassword.bind(DerivedEP(this))(input);
        },
        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: EPConfig;
            userContext: any;
        }) {
            return emailpasswordImpl.sendPasswordResetEmail.bind(DerivedEP(this))(input);
        },
        doesEmailExist: async function (input: { email: string; config: EPConfig; userContext: any }) {
            return emailpasswordImpl.doesEmailExist.bind(DerivedEP(this))(input);
        },
        getOAuthAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            config: TPConfig;
            userContext: any;
        }) {
            return thirdPartyImpl.getOAuthAuthorisationURLFromBackend.bind(DerivedTP(this))(input);
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
                    // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                    fetchResponse: {} as any,
                };
            }
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedTP(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedTP(this))(input);
        },
        redirectToThirdPartyLogin: function (input: {
            thirdPartyId: string;
            config: TPConfig;
            state?: StateObject;
            userContext: any;
        }) {
            return thirdPartyImpl.redirectToThirdPartyLogin.bind(DerivedTP(this))(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedTP(this))(input);
        },
        verifyStateFromOAuthProvider: function (input) {
            return thirdPartyImpl.verifyStateFromOAuthProvider.bind(DerivedTP(this))(input);
        },
    };
}
