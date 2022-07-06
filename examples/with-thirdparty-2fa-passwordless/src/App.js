import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdParty, { ThirdPartyAuth } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import SecondFactor from "./SecondFactor";

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
        ThirdParty.init({
            getRedirectionURL: async function (context) {
                if (context.action === "SUCCESS") {
                    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                    if (accessTokenPayload["auth"].length === 2) {
                        // we have completed both the factors and the user is going back to /auth manually for some reason.
                        return "/";
                    }
                    // we successfully logged in via google workspaces,
                    // we must now show the user sign in with passwordless
                    return "/second-factor";
                }
            },
            signInAndUpFeature: {
                disableDefaultUI: true,
                providers: [
                    {
                        id: "google-workspaces",
                        name: "Google Workspaces",
                        // buttonComponent: <div></div> - TODO: You can provide your own JSX here
                    },
                ],
            },
        }),
        Passwordless.init({
            signInUpFeature: {
                disableDefaultUI: true,
                emailOrPhoneFormStyle: {
                    headerTitle: {
                        display: "none",
                    },
                },
            },
            getRedirectionURL: function (context) {
                if (context.action === "SIGN_IN_AND_UP") {
                    return "/second-factor";
                }
            },
            contactMethod: "PHONE",
            override: {
                components: {
                    PasswordlessSignInUpHeader_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <>
                                <div
                                    style={{
                                        fontSize: "30px",
                                    }}>
                                    Second factor Auth
                                </div>
                                <DefaultComponent {...props} />
                            </>
                        );
                    },
                },
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
                            if (input.userContext.forceOriginalCheck) {
                                return true;
                            }
                            let accessTokenPayload = await this.getAccessTokenPayloadSecurely(input);
                            if (accessTokenPayload["auth"].length !== 2) {
                                // if both the factors have not been completed, we return false.
                                // this is so that the frontend's <ThirdPartyAuth> component
                                // allows showing protected pages only if both the factors
                                // are completed.
                                return false;
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
                                    <ThirdPartyAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </ThirdPartyAuth>
                                }
                            />
                            <Route
                                path="/auth"
                                element={
                                    <ThirdParty.SignInAndUp
                                        userContext={{
                                            forceOriginalCheck: true,
                                        }}
                                    />
                                }
                            />
                            <Route path="/second-factor" element={<SecondFactor />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
