"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionOverrides = void 0;
var functionOverrides_1 = require("../thirdparty/functionOverrides");
var functionOverrides_2 = require("../passwordless/functionOverrides");
var thirdPartyImplementation_1 = __importDefault(require("./recipeImplementation/thirdPartyImplementation"));
var passwordlessImplementation_1 = __importDefault(require("./recipeImplementation/passwordlessImplementation"));
var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        var thirdpartyOverrides = (0, functionOverrides_1.getFunctionOverrides)(
            recipeId,
            onHandleEvent
        )((0, thirdPartyImplementation_1.default)(originalImp));
        var passwordlessOverrides = (0, functionOverrides_2.getFunctionOverrides)(onHandleEvent)(
            (0, passwordlessImplementation_1.default)(originalImp)
        );
        return __assign(__assign(__assign({}, thirdpartyOverrides), passwordlessOverrides), {
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
        });
    };
};
exports.getFunctionOverrides = getFunctionOverrides;
