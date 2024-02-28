import React, { useEffect } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui";
import Session, { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import Passwordless, { PasswordlessComponentsOverrideProvider } from "supertokens-auth-react/recipe/passwordless";

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
    getRedirectionURL: async (ctx) => {
        if (ctx.action === "TO_AUTH") {
            return "/auth?rid=thirdpartyemailpassword";
        }
    },
    recipeList: [
        MultiFactorAuth.init(),
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    ThirdPartyEmailPassword.Github.init(),
                    ThirdPartyEmailPassword.Google.init(),
                    ThirdPartyEmailPassword.Apple.init(),
                ],
            },
        }),
        Passwordless.init({
            signInUpFeature: {
                disableDefaultUI: true,
            },
            contactMethod: "PHONE",
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <PasswordlessComponentsOverrideProvider
                components={{
                    PasswordlessSignInUpHeader_Override: () => {
                        return (
                            <div
                                style={{
                                    fontSize: "30px",
                                    marginBottom: "10px",
                                }}>
                                Second factor auth
                            </div>
                        );
                    },
                    // we override the component which shows the change phone number button
                    PasswordlessUserInputCodeFormFooter_Override: ({
                        DefaultComponent,
                        ...props
                    }: {
                        DefaultComponent: any;
                    }) => {
                        const session = useSessionContext();

                        if (session.loading !== true && session.accessTokenPayload.phoneNumber === undefined) {
                            // this will show the change phone number button
                            return <DefaultComponent {...props} />;
                        }

                        // this will hide the change phone number button
                        return null;
                    },
                }}>
                <div className="App">
                    <div className="fill">
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                ThirdPartyEmailPasswordPreBuiltUI,
                                EmailVerificationPreBuiltUI,
                                PasswordlessPreBuiltUI,
                                MultiFactorAuthPreBuiltUI,
                            ])}
                            <Route
                                path="/"
                                element={
                                    <SessionAuth>
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </PasswordlessComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
