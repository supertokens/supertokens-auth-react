import assert from "assert";
import SuperTokens from "../../lib/ts/superTokens";

describe("Exports", function () {
    beforeEach(function () {
        SuperTokens.reset();
    });

    describe("Email Password", function () {
        it("Index", function () {
            let _default = require("../../recipe/emailpassword");
            let {
                init,
                doesEmailExist,
                getResetPasswordTokenFromURL,
                signIn,
                signOut,
                signUp,
                submitNewPassword,
            } = require("../../recipe/emailpassword");
            let _defaultPreBuiltUI = require("../../recipe/emailpassword/prebuiltui");
            let {
                ResetPasswordUsingToken,
                ResetPasswordUsingTokenTheme,
                SignInAndUp,
                SignInAndUpTheme,
            } = require("../../recipe/emailpassword/prebuiltui");
            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(signIn !== undefined && _default.signIn !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(signUp !== undefined && _default.signUp !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);

            assert(ResetPasswordUsingToken !== undefined && _defaultPreBuiltUI.ResetPasswordUsingToken !== undefined);
            assert(
                ResetPasswordUsingTokenTheme !== undefined &&
                    _defaultPreBuiltUI.ResetPasswordUsingTokenTheme !== undefined
            );
            assert(SignInAndUp !== undefined && _defaultPreBuiltUI.SignInAndUp !== undefined);
            assert(SignInAndUpTheme !== undefined && _defaultPreBuiltUI.SignInAndUpTheme !== undefined);
        });
    });

    describe("Third Party", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdparty");
            let {
                init,
                getAuthorisationURLFromBackend,
                getAuthorisationURLWithQueryParamsAndSetState,
                signInAndUp,
                signOut,
                verifyAndGetStateOrThrowError,
                redirectToThirdPartyLogin,
                Facebook,
                Apple,
                Github,
                Google,
            } = require("../../recipe/thirdparty");
            let _defaultPreBuiltUI = require("../../recipe/thirdparty/prebuiltui");
            let {
                SignInAndUp,
                SignInAndUpCallback,
                SignInAndUpCallbackTheme,
                SignInAndUpTheme,
            } = require("../../recipe/thirdparty/prebuiltui");

            assert(init !== undefined && _default.init !== undefined);

            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(signInAndUp !== undefined && _default.signInAndUp !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);

            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(SignInAndUp !== undefined && _defaultPreBuiltUI.SignInAndUp !== undefined);
            assert(SignInAndUpCallback !== undefined && _defaultPreBuiltUI.SignInAndUpCallback !== undefined);
            assert(SignInAndUpCallbackTheme !== undefined && _defaultPreBuiltUI.SignInAndUpCallbackTheme !== undefined);
            assert(SignInAndUpTheme !== undefined && _defaultPreBuiltUI.SignInAndUpTheme !== undefined);
        });
    });

    describe("Passwordless", function () {
        it("Index", function () {
            let _default = require("../../recipe/passwordless");
            let {
                consumeCode,
                createCode,
                doesEmailExist,
                doesPhoneNumberExist,
                clearLoginAttemptInfo,
                getLinkCodeFromURL,
                getLoginAttemptInfo,
                getPreAuthSessionIdFromURL,
                resendCode,
                init,
                setLoginAttemptInfo,
                signOut,
            } = require("../../recipe/passwordless");
            let _defaultPreBuiltUI = require("../../recipe/passwordless/prebuiltui");
            let { LinkClicked, SignInUp, SignInUpTheme } = require("../../recipe/passwordless/prebuiltui");

            assert(consumeCode !== undefined && _default.consumeCode !== undefined);
            assert(createCode !== undefined && _default.createCode !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(doesPhoneNumberExist !== undefined && _default.doesPhoneNumberExist !== undefined);
            assert(clearLoginAttemptInfo !== undefined && _default.clearLoginAttemptInfo !== undefined);
            assert(getLinkCodeFromURL !== undefined && _default.getLinkCodeFromURL !== undefined);
            assert(getLoginAttemptInfo !== undefined && _default.getLoginAttemptInfo !== undefined);
            assert(getPreAuthSessionIdFromURL !== undefined && _default.getPreAuthSessionIdFromURL !== undefined);
            assert(resendCode !== undefined && _default.resendCode !== undefined);
            assert(init !== undefined && _default.init !== undefined);
            assert(setLoginAttemptInfo !== undefined && _default.setLoginAttemptInfo !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);

            assert(LinkClicked !== undefined && _defaultPreBuiltUI.LinkClicked !== undefined);
            assert(SignInUp !== undefined && _defaultPreBuiltUI.SignInUp !== undefined);
            assert(SignInUpTheme !== undefined && _defaultPreBuiltUI.SignInUpTheme !== undefined);
        });
    });
});
