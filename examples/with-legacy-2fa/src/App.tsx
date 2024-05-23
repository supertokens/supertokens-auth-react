import React, { useEffect } from "react";
import { EmailVerificationClaim } from "supertokens-auth-react/recipe/emailverification";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import {
    getSuperTokensRoutesForReactRouterDom,
    AuthRecipeComponentsOverrideContextProvider,
} from "supertokens-auth-react/ui";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
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
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";

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
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [ThirdParty.Github.init(), ThirdParty.Google.init(), ThirdParty.Apple.init()],
            },
        }),
        Passwordless.init({
            contactMethod: "PHONE",
        }),
        MultiFactorAuth.init({
            firstFactors: ["emailpassword", "thirdparty"],
        }),
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => {
                        return [
                            SecondFactorClaim.validators.isTrue(),
                            ...claimValidatorsAddedByOtherRecipes.filter(
                                (v) => v.id !== MultiFactorAuth.MultiFactorAuthClaim.id
                            ),
                        ];
                    },
                }),
            },
        }),
    ],
});

const prebuiltUIs = [
    ThirdPartyPreBuiltUI,
    EmailPasswordPreBuiltUI,
    EmailVerificationPreBuiltUI,
    PasswordlessPreBuiltUI,
];

function App() {
    return (
        <SuperTokensWrapper>
            <AuthRecipeComponentsOverrideContextProvider
                components={{
                    AuthPageHeader_Override: ({ DefaultComponent, ...props }) => {
                        if (props.factorIds.includes("otp-phone")) {
                            <div
                                style={{
                                    fontSize: "30px",
                                    marginBottom: "10px",
                                }}>
                                Second factor auth
                            </div>;
                        }
                        return <DefaultComponent {...props} />;
                    },
                }}>
                <PasswordlessComponentsOverrideProvider
                    components={{
                        // we override the component which shows the change phone number button
                        PasswordlessUserInputCodeFormFooter_Override: ({ DefaultComponent, ...props }) => {
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
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), prebuiltUIs)}
                                <Route
                                    path="/"
                                    element={
                                        <SessionAuth key="/">
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/second-factor"
                                    element={
                                        <SessionAuth key="/second-factor">
                                            <SecondFactor />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </PasswordlessComponentsOverrideProvider>
            </AuthRecipeComponentsOverrideContextProvider>
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
