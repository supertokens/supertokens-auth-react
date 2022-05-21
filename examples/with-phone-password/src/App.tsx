import React, { useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";

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
        EmailPassword.init({
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    // this means that the first login challenge is done. Now we should
                    // redirect the user to the second login challenge
                    if (context.redirectToPath !== undefined) {
                        return "/auth/verify-phone?redirectToPath=" + context.redirectToPath;
                    } else {
                        return "/auth/verify-phone";
                    }
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
                                // TODO: we need to validate the phone number
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
                        doesSessionExist: async function (config) {
                            let sessionExists = await oI.doesSessionExist(config);
                            if (!sessionExists) {
                                // none of the login challenges are complete. So we do not give access
                                return false;
                            }

                            if (window.location.pathname.startsWith("/auth")) {
                                return sessionExists;
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
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        <Route path="/auth/verify-phone" element={<div>haha</div>} />
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
    );
}

export default App;
