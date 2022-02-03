import { defaultTranslationsCommon } from "../../../../translation/translations";
import { defaultTranslationsEmailVerification } from "../../../emailverification/components/themes/translations";

export const defaultTranslationsEmailPassword = {
    en: {
        ...defaultTranslationsCommon.en,
        ...defaultTranslationsEmailVerification.en,

        EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "Sign In",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "Not registered yet?",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "Sign Up",
        EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
        EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "Forgot password?",
        EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
        EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect email and password combination",

        EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "Sign Up",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: "Already have an account?",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: "Sign In",
        EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: "",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "By continuing, you agree to our",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "Terms of Service",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " and ",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "Privacy Policy",
        EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
        EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",

        EMAIL_PASSWORD_EMAIL_NON_STRING: "Email must be of type string",
        EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This email already exists. Please sign in instead",

        EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
        EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an email to reset your password",
        EMAIL_PASSWORD_RESET_SEND_SUCCESS: "Please check your email for the password recovery link. ",
        EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend",
        EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",

        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "Your password has been updated successfully",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",

        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: "Enter a new password below to change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "Change password",
        EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "Invalid password reset token",
    },
};
