import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { NormalisedConfig } from "./types";

export default function getRecipeImplementation(
    webJsRecipe: RecipeInterface,
    authReactConfig: NormalisedConfig
): RecipeInterface {
    return {
        submitNewPassword: async function (input) {
            return webJsRecipe.submitNewPassword(input);
        },
        sendPasswordResetEmail: async function (input) {
            return webJsRecipe.sendPasswordResetEmail(input);
        },
        doesEmailExist: async function (input) {
            return webJsRecipe.doesEmailExist(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return webJsRecipe.getResetPasswordTokenFromURL(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return webJsRecipe.getAuthorisationURLFromBackend(input);
        },
        getAuthorizationURLWithQueryParamsAndSetState: async function (input) {
            return webJsRecipe.getAuthorizationURLWithQueryParamsAndSetState(input);
        },
        emailPasswordSignIn: async function (input) {
            return webJsRecipe.emailPasswordSignIn(input);
        },
        emailPasswordSignUp: async function (input) {
            return webJsRecipe.emailPasswordSignUp(input);
        },
        thirdPartySignInAndUp: async function (input) {
            const response = await webJsRecipe.thirdPartySignInAndUp(input);

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }

            return response;
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return webJsRecipe.getStateAndOtherInfoFromStorage(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return webJsRecipe.setStateAndOtherInfoToStorage(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJsRecipe.generateStateToSendToOAuthProvider(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsRecipe.verifyAndGetStateOrThrowError(input);
        },
        getAuthCodeFromURL: function (input) {
            return webJsRecipe.getAuthCodeFromURL(input);
        },
        getAuthErrorFromURL: function (input) {
            return webJsRecipe.getAuthErrorFromURL(input);
        },
        getAuthStateFromURL: function (input) {
            return webJsRecipe.getAuthStateFromURL(input);
        },
    };
}
