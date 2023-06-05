import React, { useEffect } from "react";
import { EmailVerificationClaim } from "supertokens-auth-react/recipe/emailverification";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session, { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import Passwordless, { PasswordlessComponentsOverrideProvider } from "supertokens-auth-react/recipe/passwordless";
import SecondFactor from "./SecondFactor";
import { SecondFactorClaim } from "./secondFactorClaim";
import { useNavigate } from "react-router-dom";

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
        EmailVerification.init({
            mode: "OPTIONAL",
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
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => {
                        return [SecondFactorClaim.validators.isTrue(), ...claimValidatorsAddedByOtherRecipes];
                    },
                }),
            },
        }),
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
                            ])}
                            <Route
                                path="/"
                                element={
                                    <SessionAuth>
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                            <Route
                                path="/second-factor"
                                element={
                                    <SessionAuth>
                                        <SecondFactor />
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
