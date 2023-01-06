"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
function getRecipeImplementation(recipeInput) {
    const { webJSRecipe } = recipeInput;
    return {
        getAuthorisationURLFromBackend: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJSRecipe.getAuthorisationURLFromBackend.bind(this)(Object.assign({}, input));
                return response;
            });
        },
        signInAndUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJSRecipe.signInAndUp.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "SUCCESS",
                        isNewUser: response.createdNewUser,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return webJSRecipe.getStateAndOtherInfoFromStorage.bind(this)({
                userContext: input.userContext,
            });
        },
        setStateAndOtherInfoToStorage: function (input) {
            return webJSRecipe.setStateAndOtherInfoToStorage.bind(this)({
                state: Object.assign(Object.assign({}, input.state), {
                    rid: recipeInput.recipeId,
                    redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                }),
                userContext: input.userContext,
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                return webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState.bind(this)(Object.assign({}, input));
            });
        },
        getAuthStateFromURL: function (input) {
            return webJSRecipe.getAuthStateFromURL.bind(this)(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJSRecipe.generateStateToSendToOAuthProvider.bind(this)(Object.assign({}, input));
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJSRecipe.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },
        getAuthCodeFromURL: function (input) {
            return webJSRecipe.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
        getAuthErrorFromURL: function (input) {
            return webJSRecipe.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
exports.default = getRecipeImplementation;
