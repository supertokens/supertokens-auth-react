import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { getFunctionOverrides as getThirdpartyFunctionOverrides } from "../thirdparty/functionOverrides";
import { getFunctionOverrides as getPasswordlessFunctionOverrides } from "../passwordless/functionOverrides";
import getThirdpartyRecipeImplementation from "./recipeImplementation/thirdPartyImplementation";
import getPasswordlessRecipeImplementation from "./recipeImplementation/passwordlessImplementation";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => {
        const thirdpartyOverrides = getThirdpartyFunctionOverrides(
            recipeId,
            onHandleEvent
        )(getThirdpartyRecipeImplementation(originalImp));
        const passwordlessOverrides = getPasswordlessFunctionOverrides(onHandleEvent)(
            getPasswordlessRecipeImplementation(originalImp)
        );
        return {
            ...thirdpartyOverrides,
            ...passwordlessOverrides,
            thirdPartySignInAndUp: thirdpartyOverrides.signInAndUp,
            getThirdPartyStateAndOtherInfoFromStorage: thirdpartyOverrides.getStateAndOtherInfoFromStorage,
            setThirdPartyStateAndOtherInfoToStorage: thirdpartyOverrides.setStateAndOtherInfoToStorage,
            getThirdPartyAuthorisationURLWithQueryParamsAndSetState:
                thirdpartyOverrides.getAuthorisationURLWithQueryParamsAndSetState,
            generateThirdPartyStateToSendToOAuthProvider: thirdpartyOverrides.generateStateToSendToOAuthProvider,
            verifyAndGetThirdPartyStateOrThrowError: thirdpartyOverrides.verifyAndGetStateOrThrowError,
            getThirdPartyAuthCodeFromURL: thirdpartyOverrides.getAuthCodeFromURL,
            getThirdPartyAuthErrorFromURL: thirdpartyOverrides.getAuthErrorFromURL,
            getThirdPartyAuthStateFromURL: thirdpartyOverrides.getAuthStateFromURL,
            createPasswordlessCode: passwordlessOverrides.createCode,
            resendPasswordlessCode: passwordlessOverrides.resendCode,
            consumePasswordlessCode: passwordlessOverrides.consumeCode,
            getPasswordlessLinkCodeFromURL: passwordlessOverrides.getLinkCodeFromURL,
            getPasswordlessPreAuthSessionIdFromURL: passwordlessOverrides.getPreAuthSessionIdFromURL,
            doesPasswordlessUserEmailExist: passwordlessOverrides.doesEmailExist,
            doesPasswordlessUserPhoneNumberExist: passwordlessOverrides.doesPhoneNumberExist,
            getPasswordlessLoginAttemptInfo: passwordlessOverrides.getLoginAttemptInfo,
            setPasswordlessLoginAttemptInfo: passwordlessOverrides.setLoginAttemptInfo,
            clearPasswordlessLoginAttemptInfo: passwordlessOverrides.clearLoginAttemptInfo,
        };
    };
