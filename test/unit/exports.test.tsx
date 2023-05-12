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
                generateStateToSendToOAuthProvider,
                getAuthCodeFromURL,
                getAuthErrorFromURL,
                getAuthStateFromURL,
                getAuthorisationURLFromBackend,
                getAuthorisationURLWithQueryParamsAndSetState,
                getStateAndOtherInfoFromStorage,
                setStateAndOtherInfoToStorage,
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
                generateStateToSendToOAuthProvider !== undefined &&
                    _default.generateStateToSendToOAuthProvider !== undefined
            );
            assert(getAuthCodeFromURL !== undefined && _default.getAuthCodeFromURL !== undefined);
            assert(getAuthErrorFromURL !== undefined && _default.getAuthErrorFromURL !== undefined);
            assert(getAuthStateFromURL !== undefined && _default.getAuthStateFromURL !== undefined);
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(
                getStateAndOtherInfoFromStorage !== undefined && _default.getStateAndOtherInfoFromStorage !== undefined
            );
            assert(setStateAndOtherInfoToStorage !== undefined && _default.setStateAndOtherInfoToStorage !== undefined);
            assert(signInAndUp !== undefined && _default.signInAndUp !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(verifyAndGetStateOrThrowError !== undefined && _default.verifyAndGetStateOrThrowError !== undefined);

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

    describe("Third Party Email Password", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdpartyemailpassword");
            let {
                init,
                doesEmailExist,
                emailPasswordSignIn,
                emailPasswordSignUp,
                generateStateToSendToOAuthProvider,
                getAuthCodeFromURL,
                getAuthErrorFromURL,
                getAuthStateFromURL,
                getAuthorisationURLFromBackend,
                getAuthorisationURLWithQueryParamsAndSetState,
                getResetPasswordTokenFromURL,
                getStateAndOtherInfoFromStorage,
                sendPasswordResetEmail,
                setStateAndOtherInfoToStorage,
                signOut,
                submitNewPassword,
                thirdPartySignInAndUp,
                verifyAndGetStateOrThrowError,
                redirectToThirdPartyLogin,
                Apple,
                Facebook,
                Github,
                Google,
            } = require("../../recipe/thirdpartyemailpassword");
            let _defaultPreBuiltUI = require("../../recipe/thirdpartyemailpassword/prebuiltui");
            let {
                ResetPasswordUsingToken,
                ResetPasswordUsingTokenTheme,
                SignInAndUp,
                SignInAndUpTheme,
                ThirdPartySignInAndUpCallback,
                ThirdPartySignInAndUpCallbackTheme,
            } = require("../../recipe/thirdpartyemailpassword/prebuiltui");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(emailPasswordSignIn !== undefined && _default.emailPasswordSignIn !== undefined);
            assert(emailPasswordSignUp !== undefined && _default.emailPasswordSignUp !== undefined);
            assert(
                generateStateToSendToOAuthProvider !== undefined &&
                    _default.generateStateToSendToOAuthProvider !== undefined
            );
            assert(getAuthCodeFromURL !== undefined && _default.getAuthCodeFromURL !== undefined);
            assert(getAuthErrorFromURL !== undefined && _default.getAuthErrorFromURL !== undefined);
            assert(getAuthStateFromURL !== undefined && _default.getAuthStateFromURL !== undefined);
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(
                getStateAndOtherInfoFromStorage !== undefined && _default.getStateAndOtherInfoFromStorage !== undefined
            );
            assert(sendPasswordResetEmail !== undefined && _default.sendPasswordResetEmail !== undefined);
            assert(setStateAndOtherInfoToStorage !== undefined && _default.setStateAndOtherInfoToStorage !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
            assert(verifyAndGetStateOrThrowError !== undefined && _default.verifyAndGetStateOrThrowError !== undefined);

            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(ResetPasswordUsingToken !== undefined && _defaultPreBuiltUI.ResetPasswordUsingToken !== undefined);
            assert(
                ResetPasswordUsingTokenTheme !== undefined &&
                    _defaultPreBuiltUI.ResetPasswordUsingTokenTheme !== undefined
            );
            assert(SignInAndUp !== undefined && _defaultPreBuiltUI.SignInAndUp !== undefined);
            assert(SignInAndUpTheme !== undefined && _defaultPreBuiltUI.SignInAndUpTheme !== undefined);
            assert(
                ThirdPartySignInAndUpCallback !== undefined &&
                    _defaultPreBuiltUI.ThirdPartySignInAndUpCallback !== undefined
            );
            assert(
                ThirdPartySignInAndUpCallbackTheme !== undefined &&
                    _defaultPreBuiltUI.ThirdPartySignInAndUpCallbackTheme !== undefined
            );
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

    describe("Third Party Passwordless", function () {
        it("Index", function () {
            let _default = require("../../recipe/thirdpartypasswordless");
            let {
                init,
                clearPasswordlessLoginAttemptInfo,
                consumePasswordlessCode,
                createPasswordlessCode,
                doesPasswordlessUserEmailExist,
                doesPasswordlessUserPhoneNumberExist,
                generateThirdPartyStateToSendToOAuthProvider,
                getAuthorisationURLFromBackend,
                getPasswordlessLinkCodeFromURL,
                getPasswordlessLoginAttemptInfo,
                getPasswordlessPreAuthSessionIdFromURL,
                getThirdPartyAuthCodeFromURL,
                getThirdPartyAuthErrorFromURL,
                getThirdPartyAuthStateFromURL,
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
                getThirdPartyStateAndOtherInfoFromStorage,
                resendPasswordlessCode,
                setPasswordlessLoginAttemptInfo,
                setThirdPartyStateAndOtherInfoToStorage,
                signOut,
                thirdPartySignInAndUp,
                verifyAndGetThirdPartyStateOrThrowError,
                redirectToThirdPartyLogin,
                Apple,
                Facebook,
                Github,
                Google,
            } = require("../../recipe/thirdpartypasswordless");
            let _defaultPreBuiltUI = require("../../recipe/thirdpartypasswordless/prebuiltui");
            let {
                PasswordlessLinkClicked,
                SignInAndUp,
                SignInUpTheme,
                ThirdPartySignInAndUpCallback,
            } = require("../../recipe/thirdpartypasswordless/prebuiltui");

            assert(init !== undefined && _default.init !== undefined);
            assert(
                clearPasswordlessLoginAttemptInfo !== undefined &&
                    _default.clearPasswordlessLoginAttemptInfo !== undefined
            );
            assert(consumePasswordlessCode !== undefined && _default.consumePasswordlessCode !== undefined);
            assert(createPasswordlessCode !== undefined && _default.createPasswordlessCode !== undefined);
            assert(
                doesPasswordlessUserEmailExist !== undefined && _default.doesPasswordlessUserEmailExist !== undefined
            );
            assert(
                doesPasswordlessUserPhoneNumberExist !== undefined &&
                    _default.doesPasswordlessUserPhoneNumberExist !== undefined
            );
            assert(
                generateThirdPartyStateToSendToOAuthProvider !== undefined &&
                    _default.generateThirdPartyStateToSendToOAuthProvider !== undefined
            );
            assert(
                getAuthorisationURLFromBackend !== undefined && _default.getAuthorisationURLFromBackend !== undefined
            );
            assert(
                getPasswordlessLinkCodeFromURL !== undefined && _default.getPasswordlessLinkCodeFromURL !== undefined
            );
            assert(
                getPasswordlessLoginAttemptInfo !== undefined && _default.getPasswordlessLoginAttemptInfo !== undefined
            );
            assert(
                getPasswordlessPreAuthSessionIdFromURL !== undefined &&
                    _default.getPasswordlessPreAuthSessionIdFromURL !== undefined
            );
            assert(getThirdPartyAuthCodeFromURL !== undefined && _default.getThirdPartyAuthCodeFromURL !== undefined);
            assert(getThirdPartyAuthErrorFromURL !== undefined && _default.getThirdPartyAuthErrorFromURL !== undefined);
            assert(getThirdPartyAuthStateFromURL !== undefined && _default.getThirdPartyAuthStateFromURL !== undefined);
            assert(
                getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined &&
                    _default.getThirdPartyAuthorisationURLWithQueryParamsAndSetState !== undefined
            );
            assert(
                getThirdPartyStateAndOtherInfoFromStorage !== undefined &&
                    _default.getThirdPartyStateAndOtherInfoFromStorage !== undefined
            );
            assert(resendPasswordlessCode !== undefined && _default.resendPasswordlessCode !== undefined);
            assert(
                setPasswordlessLoginAttemptInfo !== undefined && _default.setPasswordlessLoginAttemptInfo !== undefined
            );
            assert(
                setThirdPartyStateAndOtherInfoToStorage !== undefined &&
                    _default.setThirdPartyStateAndOtherInfoToStorage !== undefined
            );
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(thirdPartySignInAndUp !== undefined && _default.thirdPartySignInAndUp !== undefined);
            assert(
                verifyAndGetThirdPartyStateOrThrowError !== undefined &&
                    _default.verifyAndGetThirdPartyStateOrThrowError !== undefined
            );

            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(PasswordlessLinkClicked !== undefined && _defaultPreBuiltUI.PasswordlessLinkClicked !== undefined);
            assert(SignInAndUp !== undefined && _defaultPreBuiltUI.SignInAndUp !== undefined);
            assert(SignInUpTheme !== undefined && _defaultPreBuiltUI.SignInUpTheme !== undefined);
            assert(
                ThirdPartySignInAndUpCallback !== undefined &&
                    _defaultPreBuiltUI.ThirdPartySignInAndUpCallback !== undefined
            );
        });
    });
});
