import React from "react";
import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import jwt_decode from "jwt-decode";

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
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            preAPIHook: async (context) => {
                let jwt = localStorage.getItem("jwt");
                if (jwt !== null) {
                    (context.requestInit.headers as any)["Authorization"] = "Bearer " + jwt;
                }
                return context;
            },
            postAPIHook: async (context) => {
                if (context.action === "EMAIL_PASSWORD_SIGN_IN" || context.action === "EMAIL_PASSWORD_SIGN_UP") {
                    let responseBody = await context.fetchResponse.json();
                    let jwt = responseBody.jwt;
                    localStorage.setItem("jwt", jwt);
                }
            },
        }),
        Session.init({
            preAPIHook: async (context) => {
                let jwt = localStorage.getItem("jwt");
                if (jwt !== null) {
                    (context.requestInit.headers as any)["Authorization"] = "Bearer " + jwt;
                }
                return context;
            },
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        addAxiosInterceptors: function () {
                            throw new Error("Unsupported exception");
                        },
                        addFetchInterceptorsAndReturnModifiedFetch: function (input) {
                            return input.originalFetch;
                        },
                        doesSessionExist: async function () {
                            return localStorage.getItem("jwt") !== null;
                        },
                        getAccessTokenPayloadSecurely: async function () {
                            let jwt = localStorage.getItem("jwt")!;
                            return jwt_decode(jwt);
                        },
                        getUserId: async function (input) {
                            let accessTokenPayload = await this.getAccessTokenPayloadSecurely(input);
                            return accessTokenPayload.sub;
                        },
                        signOut: async function (input) {
                            localStorage.removeItem("jwt");
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
