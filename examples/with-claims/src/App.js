import { useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import { RolesClaim } from "./claims/rolesClaim";
import MissingClaimPopup from "./MissingClaimPopup";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Route1 } from "./Route1/route1.component";
import { Route2 } from "./Route1/route2.component";
import { EmailVerifiedClaim } from "./claims/emailVerifiedClaim";
import HeaderWrapper from "./header/header.component";

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
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "OFF",
            },
        }),
        Session.init({
            onHandleEvent: console.log,
        }),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <ThemeProvider theme={{}}>
                <CssBaseline />
                <Router>
                    <div className="fill">
                        <HeaderWrapper />
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                            <Route
                                path="/route1"
                                element={
                                    <EmailPassword.EmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}
                                        requiredClaims={[EmailVerifiedClaim.isVerified, RolesClaim.hasRole("admin")]}
                                        onMissingClaim={(claimId) => {
                                            console.log("route1 missing", claimId);
                                            window.location.pathname = "/route2";
                                        }}>
                                        <Route1 />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </EmailPassword.EmailPasswordAuth>
                                }
                            />
                            <Route
                                path="/route2"
                                element={
                                    <EmailPassword.EmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}
                                        requiredClaims={[EmailVerifiedClaim.isVerified, RolesClaim.hasRole("user")]}
                                        onMissingClaim={(claimId) => {
                                            console.log("route2 missing", claimId);
                                            window.location.pathname = "/";
                                        }}>
                                        <Route2 />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </EmailPassword.EmailPasswordAuth>
                                }
                            />
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
            </ThemeProvider>
        </div>
    );
}

export default App;
