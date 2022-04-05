import { TPPWlessRecipeInterface, PreAndPostAPIHookAction, OnHandleEventContext } from "../types";
import { NormalisedAppInfo } from "../../../types";
import PasswordlessRecipeImplementation from "../../passwordless/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import DerivedPwless from "./passwordlessImplementation";
import DerivedTP from "./thirdPartyImplementation";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../../recipeModule/types";

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
        consumeCode(input) {
            return passwordlessImpl.consumeCode.bind(DerivedPwless(this))(input);
        },
        createCode(input) {
            return passwordlessImpl.createCode.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist(input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserEmailExist: async function (input) {
            return passwordlessImpl.doesEmailExist.bind(DerivedPwless(this))(input);
        },
        resendCode(input) {
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
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(DerivedTP(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(DerivedTP(this))(input);
        },
        getAuthorizationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorizationURLWithQueryParamsAndSetState.bind(DerivedTP(this))(input);
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
