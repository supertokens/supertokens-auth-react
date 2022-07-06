import React, { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import { addCustomInterceptorsToGlobalFetch, addCustomInterceptosToAxios } from "./utils";

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

// This will modify the global fetch so that it adds the session tokens before the request to
// the API, and also saves the tokens in case of sign in or token change.
addCustomInterceptorsToGlobalFetch();

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        // this override is only required if you are using axios
                        addAxiosInterceptors: function (input) {
                            addCustomInterceptosToAxios(input);
                            return oI.addAxiosInterceptors(input);
                        },
                        signOut: async function (input) {
                            await oI.signOut(input);
                            localStorage.removeItem("st-cookie");
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
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

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
