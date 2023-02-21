import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";

import DerivedEP from "./emailPasswordImplementation";
import DerivedTP from "./thirdPartyImplementation";

import type { NormalisedAppInfo } from "../../../types";
import type {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../../recipeModule/types";
import type { OnHandleEventContext, PreAndPostAPIHookAction } from "../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface {
    const emailpasswordImpl = EmailPasswordRecipeImplementation({
        ...recipeInput,
    });
    const thirdPartyImpl = ThirdPartyRecipeImplementation({
        ...recipeInput,
    });

    return {
        submitNewPassword: async function (input) {
            return emailpasswordImpl.submitNewPassword.bind(DerivedEP(this))(input);
        },
        sendPasswordResetEmail: async function (input) {
            return emailpasswordImpl.sendPasswordResetEmail.bind(DerivedEP(this))(input);
        },
        doesEmailExist: async function (input) {
            return emailpasswordImpl.doesEmailExist.bind(DerivedEP(this))(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return emailpasswordImpl.getResetPasswordTokenFromURL.bind(DerivedEP(this))(input);
        },
        emailPasswordSignIn: async function (input) {
            return await emailpasswordImpl.signIn.bind(DerivedEP(this))(input);
        },
        emailPasswordSignUp: async function (input) {
            return emailpasswordImpl.signUp.bind(DerivedEP(this))(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return thirdPartyImpl.getAuthorisationURLFromBackend.bind(DerivedTP(this))(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(DerivedTP(this))(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return await thirdPartyImpl.signInAndUp.bind(DerivedTP(this))(input);
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedTP(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedTP(this))(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedTP(this))(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(DerivedTP(this))(input);
        },
        getAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(DerivedTP(this))(input);
        },
        getAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(DerivedTP(this))(input);
        },
        getAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(DerivedTP(this))(input);
        },
    };
}
