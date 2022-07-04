import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
    ThirdPartyEmailPasswordAuth,
    Google,
    Github,
    Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import React from "react";
import SetPassword from "./SetPassword";
import CustomSignUp from "./CustomSignUp";

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
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
            getRedirectionURL: async function (context) {
                if (context.action === "SUCCESS") {
                    // this is called after sign up / in and after email is verified
                    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                    if (accessTokenPayload.isUsingFakePassword) {
                        return "/set-password?show=signup"; // we ask the user to set their password now
                    }
                }
            },
            override: {
                components: {
                    ThirdPartySignInAndUpProvidersForm_Override: ({ DefaultComponent, ...props }) => {
                        if (window.location.pathname === "/set-password") {
                            return null;
                        } else {
                            return <DefaultComponent {...props} />;
                        }
                    },
                    EmailPasswordSignUpForm_Override: CustomSignUp,
                },
            },
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        doesSessionExist: async function (input) {
                            if (!(await oI.doesSessionExist(input))) {
                                return false;
                            }

                            if (window.location.pathname.startsWith("/auth")) {
                                // we are showing one of the auth related UIs..
                                return true;
                            }

                            let accessTokenPayload = await this.getAccessTokenPayloadSecurely();
                            if (accessTokenPayload.isUsingFakePassword) {
                                // we are showing an application specific UI here
                                let emailVerified = await ThirdPartyEmailPassword.isEmailVerified();

                                if (emailVerified) {
                                    // in this case, the user has verified their email, but not set
                                    // their password. So this will redirect them to the /auth route
                                    // which will redirect them to the set password route.
                                    return false;
                                } else {
                                    // in this case, the user has NOT verified their email, so the auth
                                    // protector route will take them to the email verification UI
                                    return true;
                                }
                            }
                            return true;
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
                                    <ThirdPartyEmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </ThirdPartyEmailPasswordAuth>
                                }
                            />
                            <Route path="/set-password" element={<SetPassword />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
