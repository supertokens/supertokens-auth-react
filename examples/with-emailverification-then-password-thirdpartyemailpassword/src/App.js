import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensReactRouterDomRoutes } from "supertokens-auth-react/prebuiltui";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import ThirdPartyEmailPassword, {
    Google,
    Github,
    Apple,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import React from "react";
import SetPassword from "./SetPassword";
import CustomSignUp from "./CustomSignUp";
import { RealPasswordClaim } from "./realPasswordClaim";

/* unique password which will act as a place holder password 
for this user until they have actually set a password. This will also indicate to the 
other backend APIs that the user hasn't fully signed up yet. */
export const FAKE_PASSWORD = "fakeUniqueSuperTokensRandomPass-sdfa452sadf342-24352";

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
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
            getRedirectionURL: async function (context) {
                if (context.action === "SUCCESS") {
                    // this is called after sign up / in and after email is verified
                    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                    if (RealPasswordClaim.getValueFromPayload(accessTokenPayload) !== true) {
                        return "/set-password?show=signup"; // we ask the user to set their password now
                    }
                }
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getGlobalClaimValidators: (input) => [
                            ...input.claimValidatorsAddedByOtherRecipes,
                            RealPasswordClaim.validators.isTrue(),
                        ],
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
            <ThirdpartyEmailPasswordComponentsOverrideProvider
                components={{
                    ThirdPartySignInAndUpProvidersForm_Override: ({ DefaultComponent, ...props }) => {
                        if (window.location.pathname === "/set-password") {
                            return null;
                        } else {
                            return <DefaultComponent {...props} />;
                        }
                    },
                    EmailPasswordSignUpForm_Override: CustomSignUp,
                }}>
                <div className="App">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensReactRouterDomRoutes(require("react-router-dom"), [
                                    ThirdPartyEmailPasswordPreBuiltUI,
                                    EmailVerificationPreBuiltUI,
                                ])}
                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows 
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                                        <SessionAuth
                                            onSessionExpired={() => {
                                                updateShowSessionExpiredPopup(true);
                                            }}>
                                            <Home />
                                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/set-password"
                                    element={
                                        <SessionAuth>
                                            <SetPassword />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </ThirdpartyEmailPasswordComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
