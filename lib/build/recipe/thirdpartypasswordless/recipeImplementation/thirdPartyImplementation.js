"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRecipeImplementation(originalImplementation) {
    return {
        generateStateToSendToOAuthProvider:
            originalImplementation.generateStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getAuthStateFromURL.bind(originalImplementation),
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getAuthorizationURLWithQueryParamsAndSetState:
            originalImplementation.getAuthorizationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getStateAndOtherInfoFromStorage.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setStateAndOtherInfoToStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetStateOrThrowError.bind(originalImplementation),
    };
}
exports.default = getRecipeImplementation;
