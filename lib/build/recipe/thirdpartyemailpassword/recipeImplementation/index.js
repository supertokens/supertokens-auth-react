"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recipeImplementation_1 = tslib_1.__importDefault(require("../../emailpassword/recipeImplementation"));
var recipeImplementation_2 = tslib_1.__importDefault(require("../../thirdparty/recipeImplementation"));
var emailPasswordImplementation_1 = tslib_1.__importDefault(require("./emailPasswordImplementation"));
var thirdPartyImplementation_1 = tslib_1.__importDefault(require("./thirdPartyImplementation"));
function getRecipeImplementation(recipeInput) {
    var emailpasswordImpl = recipeImplementation_1.default(tslib_1.__assign({}, recipeInput));
    var thirdPartyImpl = recipeImplementation_2.default(tslib_1.__assign({}, recipeInput));
    return {
        submitNewPassword: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.submitNewPassword.bind(emailPasswordImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        sendPasswordResetEmail: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.sendPasswordResetEmail.bind(emailPasswordImplementation_1.default(this))(
                            input
                        ),
                    ];
                });
            });
        },
        doesEmailExist: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.doesEmailExist.bind(emailPasswordImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        getResetPasswordTokenFromURL: function (input) {
            return emailpasswordImpl.getResetPasswordTokenFromURL.bind(emailPasswordImplementation_1.default(this))(
                input
            );
        },
        emailPasswordSignIn: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                emailpasswordImpl.signIn.bind(emailPasswordImplementation_1.default(this))(input),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        emailPasswordSignUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.signUp.bind(emailPasswordImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        getAuthorisationURLFromBackend: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind(thirdPartyImplementation_1.default(this))(
                            input
                        ),
                    ];
                });
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                            thirdPartyImplementation_1.default(this)
                        )(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                thirdPartyImpl.signInAndUp.bind(thirdPartyImplementation_1.default(this))(input),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(thirdPartyImplementation_1.default(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(thirdPartyImplementation_1.default(this))(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(thirdPartyImplementation_1.default(this))(
                input
            );
        },
        verifyAndGetStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
    };
}
exports.default = getRecipeImplementation;
