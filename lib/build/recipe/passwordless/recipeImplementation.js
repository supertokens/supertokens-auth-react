"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recipeImplementation_1 = require("supertokens-web-js/recipe/passwordless/recipeImplementation");
function getRecipeImplementation(recipeInput) {
    var webJsImplementation = (0, recipeImplementation_1.getRecipeImplementation)({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        createCode: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.createCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: false,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        resendCode: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.resendCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: true,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.consumeCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: response.createdUser,
                                    user: response.user,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        getLinkCodeFromURL: function (input) {
            return webJsImplementation.getLinkCodeFromURL.bind(this)(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return webJsImplementation.getPreAuthSessionIdFromURL.bind(this)(input);
        },
        doesEmailExist: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.doesEmailExist.bind(this)(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        doesPhoneNumberExist: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.doesPhoneNumberExist.bind(this)(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getLoginAttemptInfo: function (input) {
            return webJsImplementation.getLoginAttemptInfo.bind(this)(input);
        },
        setLoginAttemptInfo: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, webJsImplementation.setLoginAttemptInfo.bind(this)(input)];
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return webJsImplementation.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}
exports.default = getRecipeImplementation;
