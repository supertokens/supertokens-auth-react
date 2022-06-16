"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var recipeImplementation_1 = require("supertokens-web-js/recipe/thirdparty/recipeImplementation");
function getRecipeImplementation(recipeInput) {
    var webJsImplementation = (0, recipeImplementation_1.getRecipeImplementation)({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        getAuthorisationURLFromBackend: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.getAuthorisationURLFromBackend.bind(this)({
                                    providerId: input.providerId,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.signInAndUp.bind(this)({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: response.createdNewUser,
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return webJsImplementation.getStateAndOtherInfoFromStorage.bind(this)({
                userContext: input.userContext,
            });
        },
        setStateAndOtherInfoToStorage: function (input) {
            return webJsImplementation.setStateAndOtherInfoToStorage.bind(this)({
                state: tslib_1.__assign(tslib_1.__assign({}, input.state), {
                    rid: recipeInput.recipeId,
                    redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                }),
                userContext: input.userContext,
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        webJsImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(this)(
                            tslib_1.__assign({}, input)
                        ),
                    ];
                });
            });
        },
        getAuthStateFromURL: function (input) {
            return webJsImplementation.getAuthStateFromURL.bind(this)(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJsImplementation.generateStateToSendToOAuthProvider.bind(this)(tslib_1.__assign({}, input));
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsImplementation.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },
        getAuthCodeFromURL: function (input) {
            return webJsImplementation.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
        getAuthErrorFromURL: function (input) {
            return webJsImplementation.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
exports.default = getRecipeImplementation;
