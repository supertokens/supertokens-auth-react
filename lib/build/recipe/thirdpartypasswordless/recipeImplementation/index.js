"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var recipeImplementation_1 = tslib_1.__importDefault(require("../../passwordless/recipeImplementation"));
var recipeImplementation_2 = tslib_1.__importDefault(require("../../thirdparty/recipeImplementation"));
var passwordlessImplementation_1 = tslib_1.__importDefault(require("./passwordlessImplementation"));
var thirdPartyImplementation_1 = tslib_1.__importDefault(require("./thirdPartyImplementation"));
function getRecipeImplementation(recipeInput) {
    var passwordlessImpl = (0, recipeImplementation_1.default)(tslib_1.__assign({}, recipeInput));
    var thirdPartyImpl = (0, recipeImplementation_2.default)(tslib_1.__assign({}, recipeInput));
    return {
        consumePasswordlessCode: function (input) {
            return passwordlessImpl.consumeCode.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        createPasswordlessCode: function (input) {
            return passwordlessImpl.createCode.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return passwordlessImpl.doesPhoneNumberExist.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        passwordlessImpl.doesEmailExist.bind((0, passwordlessImplementation_1.default)(this))(input),
                    ];
                });
            });
        },
        resendPasswordlessCode: function (input) {
            return passwordlessImpl.resendCode.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        clearPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        getPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.getLoginAttemptInfo.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        setPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return passwordlessImpl.getLinkCodeFromURL.bind((0, passwordlessImplementation_1.default)(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind((0, passwordlessImplementation_1.default)(this))(
                input
            );
        },
        getAuthorisationURLFromBackend: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind(
                            (0, thirdPartyImplementation_1.default)(this)
                        )(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.signInAndUp.bind((0, thirdPartyImplementation_1.default)(this))(input),
                    ];
                });
            });
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind((0, thirdPartyImplementation_1.default)(this))(
                input
            );
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind((0, thirdPartyImplementation_1.default)(this))(
                input
            );
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                (0, thirdPartyImplementation_1.default)(this)
            )(input);
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(
                (0, thirdPartyImplementation_1.default)(this)
            )(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind((0, thirdPartyImplementation_1.default)(this))(
                input
            );
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind((0, thirdPartyImplementation_1.default)(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind((0, thirdPartyImplementation_1.default)(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind((0, thirdPartyImplementation_1.default)(this))(input);
        },
    };
}
exports.default = getRecipeImplementation;
