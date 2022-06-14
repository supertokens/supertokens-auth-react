"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recipeImplementation_1 = tslib_1.__importDefault(require("../../passwordless/recipeImplementation"));
var recipeImplementation_2 = tslib_1.__importDefault(require("../../thirdparty/recipeImplementation"));
var passwordlessImplementation_1 = tslib_1.__importDefault(require("./passwordlessImplementation"));
var thirdPartyImplementation_1 = tslib_1.__importDefault(require("./thirdPartyImplementation"));
function getRecipeImplementation(recipeInput) {
    var passwordlessImpl = recipeImplementation_1.default(tslib_1.__assign({}, recipeInput));
    var thirdPartyImpl = recipeImplementation_2.default(tslib_1.__assign({}, recipeInput));
    return {
        consumePasswordlessCode: function (input) {
            return passwordlessImpl.consumeCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        createPasswordlessCode: function (input) {
            return passwordlessImpl.createCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(passwordlessImplementation_1.default(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        passwordlessImpl.doesEmailExist.bind(passwordlessImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        resendPasswordlessCode: function (input) {
            return passwordlessImpl.resendCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        clearPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))(input);
        },
        getPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.getLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))(input);
        },
        setPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return passwordlessImpl.getLinkCodeFromURL.bind(passwordlessImplementation_1.default(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(passwordlessImplementation_1.default(this))(input);
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
        thirdPartySignInAndUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.signInAndUp.bind(thirdPartyImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(thirdPartyImplementation_1.default(this))(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                thirdPartyImplementation_1.default(this)
            )(input);
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(thirdPartyImplementation_1.default(this))(
                input
            );
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(thirdPartyImplementation_1.default(this))(input);
        },
    };
}
exports.default = getRecipeImplementation;
