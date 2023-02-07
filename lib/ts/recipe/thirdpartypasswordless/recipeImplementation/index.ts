import PasswordlessRecipeImplementation from "../../passwordless/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";

import DerivedPwless from "./passwordlessImplementation";
import DerivedTP from "./thirdPartyImplementation";

import type { NormalisedAppInfo } from "../../../types";
import type {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../../recipeModule/types";
import type { PreAndPostAPIHookAction, OnHandleEventContext } from "../types";
import type { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): TPPWlessRecipeInterface {
    const passwordlessImpl = PasswordlessRecipeImplementation({
        ...recipeInput,
    });
    const thirdPartyImpl = ThirdPartyRecipeImplementation({
        ...recipeInput,
    });

    return {
        consumePasswordlessCode(input) {
            return passwordlessImpl.consumeCode.bind(DerivedPwless(this))(input);
        },
        createPasswordlessCode(input) {
            return passwordlessImpl.createCode.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist(input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserEmailExist: async function (input) {
            return passwordlessImpl.doesEmailExist.bind(DerivedPwless(this))(input);
        },
        resendPasswordlessCode(input) {
            return passwordlessImpl.resendCode.bind(DerivedPwless(this))(input);
        },
        clearPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind(DerivedPwless(this))(input);
        },
        getPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.getLoginAttemptInfo.bind(DerivedPwless(this))(input);
        },
        setPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(DerivedPwless(this))(input);
        },
        getPasswordlessLinkCodeFromURL(input) {
            return passwordlessImpl.getLinkCodeFromURL.bind(DerivedPwless(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL(input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(DerivedPwless(this))(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return thirdPartyImpl.getAuthorisationURLFromBackend.bind(DerivedTP(this))(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return thirdPartyImpl.signInAndUp.bind(DerivedTP(this))(input);
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedTP(this))(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedTP(this))(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(DerivedTP(this))(input);
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(DerivedTP(this))(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(DerivedTP(this))(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(DerivedTP(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(DerivedTP(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(DerivedTP(this))(input);
        },
    };
}
