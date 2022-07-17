import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
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
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdPartyPasswordless.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            signInUpFeature: {
                providers: [
                    ThirdPartyPasswordless.Github.init(),
                    ThirdPartyPasswordless.Google.init(),
                    ThirdPartyPasswordless.Apple.init(),
                ],
            },
            contactMethod: "EMAIL_OR_PHONE",
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
                                    <ThirdPartyPasswordless.ThirdPartyPasswordlessAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </ThirdPartyPasswordless.ThirdPartyPasswordlessAuth>
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
