import React, { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import PhoneVerification from "./PhoneVerification";
import PhoneNumberVerificationFooter from "./PhoneVerification/Footer";

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
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    languageTranslations: {
        translations: {
            en: {
                EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an SMS to reset your password",
                EMAIL_PASSWORD_EMAIL_LABEL: "Phone number",
                EMAIL_PASSWORD_RESET_SEND_BTN: "Send SMS",
                EMAIL_PASSWORD_RESET_SEND_SUCCESS: "Please check your SMS for the password recovery link. ",
                EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect phone and password combination",
                EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This phone number already exists. Please sign in instead.",
                "This email already exists. Please sign in instead.":
                    "This phone number already exists. Please sign in instead",
            },
        },
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "PHONE",
            signInUpFeature: {
                // this will not show the passwordless UI unless we render it ourselves.
                disableDefaultUI: true,
            },
            override: {
                components: {
                    PasswordlessUserInputCodeFormFooter_Override: ({ DefaultComponent, ...props }) => {
                        return <PhoneNumberVerificationFooter recipeImplementation={props.recipeImplementation} />;
                    },
                    PasswordlessSignInUpHeader_Override: () => {
                        return null;
                    },
                    PasswordlessPhoneForm_Override: ({ DefaultComponent, ...props }) => {
                        React.useEffect(() => {
                            /**
                             * When the backend creates a session after the first login challenge,
                             * it also adds the user's phone number in the access token payload.
                             *
                             * We can use that to send it an OTP.
                             */
                            Session.getAccessTokenPayloadSecurely()
                                .then(async (accessTokenPayload) => {
                                    let phoneNumber = accessTokenPayload.phoneNumber;

                                    // This will send the user an OTP and also display the enter OTP screen.
                                    await props.recipeImplementation.createCode({
                                        phoneNumber: phoneNumber,
                                        userContext: {},
                                    });
                                })
                                .catch((err) => {
                                    // it can come here if a session doesn't exist.
                                    // in this case, the screen we will should redirect to the
                                    // first login challenge
                                    EmailPassword.redirectToAuth({
                                        redirectBack: false,
                                    });
                                });
                        }, []);
                        return null;
                    },
                },
            },
        }),
        EmailPassword.init({
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    // this means that the first login challenge is done. Now we should
                    // redirect the user to the second login challenge
                    return "/auth/verify-phone";
                }
                return undefined;
            },
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [
                        {
                            id: "email",
                            label: "Phone number",
                            placeholder: "Phone number",
                            validate: async (value) => {
                                // We can provide validation logic here.. but the backend
                                // checks for a valid phone number anyway
                                return undefined;
                            },
                        },
                    ],
                },
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        doesSessionExist: async function (input) {
                            let sessionExists = await oI.doesSessionExist(input);
                            if (!sessionExists) {
                                // none of the login challenges are complete. So we do not give access
                                return false;
                            }

                            if (input.userContext.forceOriginalCheck === true) {
                                return true;
                            }

                            if (window.location.pathname.startsWith("/auth")) {
                                if (window.location.pathname === "/auth/verify-phone") {
                                    // this is a special case route where even if a session exists,
                                    // we say it doesn't exist unless the second login challenge is solved
                                    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                                    return accessTokenPayload.phoneNumberVerified === true;
                                }
                                return true;
                            } else {
                                // these are routes on which the user's app pages exist. So we must allow
                                // access to them only when they also have their phone number verified
                                let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                                return accessTokenPayload.phoneNumberVerified === true;
                            }
                        },
                    };
                },
            },
        }),
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
                            <Route path="/auth/verify-phone" element={<PhoneVerification />} />
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows
                                        <Home /> only if the user is logged in.
                                        Else it redirects the user to "/auth" */
                                    <EmailPassword.EmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </EmailPassword.EmailPasswordAuth>
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
