import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
    ThirdPartyEmailPasswordAuth,
    Google,
    Github,
    Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import i18next from "i18next";

// Initialize i18next as you normally would
i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option

    fallbackLng: "en",
    debug: true,

    resources: {
        en: {
            translation: {
                THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or",
                THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",

                THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
                THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
                THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
                THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
                THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
                THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
                THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",

                THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
                BRANDING_POWERED_BY_START: "Powered by ",
                BRANDING_POWERED_BY_END: "",
                SOMETHING_WENT_WRONG_ERROR: "Something went wrong. Please try again",
                EMAIL_VERIFICATION_RESEND_SUCCESS: "Email resent",
                EMAIL_VERIFICATION_SEND_TITLE: "Verify your email address",
                EMAIL_VERIFICATION_SEND_DESC_START: "",
                EMAIL_VERIFICATION_SEND_DESC_STRONG: "Please click on the link",
                EMAIL_VERIFICATION_SEND_DESC_END: " in the email we just sent you to confirm your email address.",
                EMAIL_VERIFICATION_RESEND_BTN: "Resend Email",
                EMAIL_VERIFICATION_LOGOUT: "Logout ",
                EMAIL_VERIFICATION_SUCCESS: "Email verification successful!",
                EMAIL_VERIFICATION_CONTINUE_BTN: "CONTINUE",
                EMAIL_VERIFICATION_CONTINUE_LINK: "Continue",
                EMAIL_VERIFICATION_EXPIRED: "The email verification link has expired",
                EMAIL_VERIFICATION_ERROR_TITLE: "Something went wrong",
                EMAIL_VERIFICATION_ERROR_DESC:
                    "We encountered an unexpected error. Please contact support for assistance",
                EMAIL_PASSWORD_EMAIL_LABEL: "Email",
                EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",

                EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
                EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",

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
                EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "By continuing, you agree to our ",
                EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "Terms of Service",
                EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " and ",
                EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "Privacy Policy",
                EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
                EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",

                EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This email already exists. Please sign in instead",

                EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
                EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an email to reset your password",
                EMAIL_PASSWORD_RESET_SEND_SUCCESS: "Please check your email for the password recovery link. ",
                EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend",
                EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",

                EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
                EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "Your password has been updated successfully",
                EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",

                EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "New password",
                EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "New password",
                EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm password",
                EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your password",

                EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
                EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: "Enter a new password below to change your password",
                EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "CHANGE PASSWORD",
                EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "Invalid password reset token",

                ERROR_EMAIL_NON_STRING: "Email must be of type string",
                ERROR_EMAIL_INVALID: "Email is invalid",

                ERROR_PASSWORD_NON_STRING: "Password must be of type string",
                ERROR_PASSWORD_TOO_SHORT: "Password must contain at least 8 characters, including a number",
                ERROR_PASSWORD_TOO_LONG: "Password's length must be lesser than 100 characters",
                ERROR_PASSWORD_NO_ALPHA: "Password must contain at least one alphabet",
                ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
                ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",

                ERROR_NON_OPTIONAL: "Field is not optional",
            },
        },
        hu: {
            translation: {
                EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "Bejelentkezés",
                EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "Regisztráció",
            },
        },
    },
});
// These are used to trigger a re-rendering since the SDK can't detect the change otherwise.
i18next
    .on("languageChanged", (lng) => SuperTokens.changeLanguage(lng))
    .on("loaded", () => SuperTokens.loadTranslation({}));

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    languageTranslations: {
        translationFunc: i18next.t.bind(i18next),
    },
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init(),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows 
                                        <Home /> only if the user is logged in.
                                        Else it redirects the user to "/auth" */
                                    <ThirdPartyEmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </ThirdPartyEmailPasswordAuth>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
