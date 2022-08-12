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
                redirectToAuth,
                EmailPasswordAuth,
                ResetPasswordUsingToken,
                ResetPasswordUsingTokenTheme,
                SignInAndUp,
                SignInAndUpTheme,
            } = require("../../recipe/emailpassword");

            assert(init !== undefined && _default.init !== undefined);
            assert(doesEmailExist !== undefined && _default.doesEmailExist !== undefined);
            assert(getResetPasswordTokenFromURL !== undefined && _default.getResetPasswordTokenFromURL !== undefined);
            assert(signIn !== undefined && _default.signIn !== undefined);
            assert(signOut !== undefined && _default.signOut !== undefined);
            assert(signUp !== undefined && _default.signUp !== undefined);
            assert(submitNewPassword !== undefined && _default.submitNewPassword !== undefined);

            assert(redirectToAuth !== undefined && _default.redirectToAuth !== undefined);
            assert(EmailPasswordAuth !== undefined && _default.EmailPasswordAuth !== undefined);
            assert(ResetPasswordUsingToken !== undefined && _default.ResetPasswordUsingToken !== undefined);
            assert(ResetPasswordUsingTokenTheme !== undefined && _default.ResetPasswordUsingTokenTheme !== undefined);
            assert(SignInAndUp !== undefined && _default.SignInAndUp !== undefined);
            assert(SignInAndUpTheme !== undefined && _default.SignInAndUpTheme !== undefined);
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
                redirectToAuth,
                redirectToThirdPartyLogin,
                Facebook,
                Apple,
                Github,
                Google,
                SignInAndUp,
                SignInAndUpCallback,
                SignInAndUpCallbackTheme,
                SignInAndUpTheme,
                ThirdPartyAuth,
            } = require("../../recipe/thirdparty");

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

            assert(redirectToAuth !== undefined && _default.redirectToAuth !== undefined);
            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(SignInAndUp !== undefined && _default.SignInAndUp !== undefined);
            assert(SignInAndUpCallback !== undefined && _default.SignInAndUpCallback !== undefined);
            assert(SignInAndUpCallbackTheme !== undefined && _default.SignInAndUpCallbackTheme !== undefined);
            assert(SignInAndUpTheme !== undefined && _default.SignInAndUpTheme !== undefined);
            assert(ThirdPartyAuth !== undefined && _default.ThirdPartyAuth !== undefined);
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
                redirectToAuth,
                redirectToThirdPartyLogin,
                Apple,
                Facebook,
                Github,
                Google,
                ResetPasswordUsingToken,
                ResetPasswordUsingTokenTheme,
                SignInAndUp,
                SignInAndUpTheme,
                ThirdPartyEmailPasswordAuth,
                ThirdPartySignInAndUpCallback,
                ThirdPartySignInAndUpCallbackTheme,
            } = require("../../recipe/thirdpartyemailpassword");

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

            assert(redirectToAuth !== undefined && _default.redirectToAuth !== undefined);
            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(ResetPasswordUsingToken !== undefined && _default.ResetPasswordUsingToken !== undefined);
            assert(ResetPasswordUsingTokenTheme !== undefined && _default.ResetPasswordUsingTokenTheme !== undefined);
            assert(SignInAndUp !== undefined && _default.SignInAndUp !== undefined);
            assert(SignInAndUpTheme !== undefined && _default.SignInAndUpTheme !== undefined);
            assert(ThirdPartyEmailPasswordAuth !== undefined && _default.ThirdPartyEmailPasswordAuth !== undefined);
            assert(ThirdPartySignInAndUpCallback !== undefined && _default.ThirdPartySignInAndUpCallback !== undefined);
            assert(
                ThirdPartySignInAndUpCallbackTheme !== undefined &&
                    _default.ThirdPartySignInAndUpCallbackTheme !== undefined
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
                redirectToAuth,
                LinkClicked,
                PasswordlessAuth,
                SignInUp,
                SignInUpTheme,
            } = require("../../recipe/passwordless");

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

            assert(redirectToAuth !== undefined && _default.redirectToAuth !== undefined);
            assert(LinkClicked !== undefined && _default.LinkClicked !== undefined);
            assert(PasswordlessAuth !== undefined && _default.PasswordlessAuth !== undefined);
            assert(SignInUp !== undefined && _default.SignInUp !== undefined);
            assert(SignInUpTheme !== undefined && _default.SignInUpTheme !== undefined);
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
                redirectToAuth,
                redirectToThirdPartyLogin,
                Apple,
                Facebook,
                Github,
                Google,
                PasswordlessLinkClicked,
                SignInAndUp,
                SignInUpTheme,
                ThirdPartyPasswordlessAuth,
                ThirdPartySignInAndUpCallback,
            } = require("../../recipe/thirdpartypasswordless");

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

            assert(redirectToAuth !== undefined && _default.redirectToAuth !== undefined);
            assert(redirectToThirdPartyLogin !== undefined && _default.redirectToThirdPartyLogin !== undefined);
            assert(Apple !== undefined && _default.Apple !== undefined);
            assert(Facebook !== undefined && _default.Facebook !== undefined);
            assert(Github !== undefined && _default.Github !== undefined);
            assert(Google !== undefined && _default.Google !== undefined);
            assert(PasswordlessLinkClicked !== undefined && _default.PasswordlessLinkClicked !== undefined);
            assert(SignInAndUp !== undefined && _default.SignInAndUp !== undefined);
            assert(SignInUpTheme !== undefined && _default.SignInUpTheme !== undefined);
            assert(ThirdPartyPasswordlessAuth !== undefined && _default.ThirdPartyPasswordlessAuth !== undefined);
            assert(ThirdPartySignInAndUpCallback !== undefined && _default.ThirdPartySignInAndUpCallback !== undefined);
        });
    });
});
