import React, { useState } from "react";
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
        ThirdPartyEmailPassword.init({
            onHandleEvent: (context) => {
                if (context.action === "SUCCESS") {
                    if (context.isNewUser) {
                        // we save info in localstorage to indicate to the UI that we should show
                        // a sign in message in the sign in page.
                        localStorage.setItem("showSignInMessage", "true");
                    }
                }
            },
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
            override: {
                components: {
                    ThirdPartyEmailPasswordHeader_Override: ({ DefaultComponent, ...props }) => {
                        if (props.isSignUp) {
                            return <DefaultComponent {...props} />;
                        } else {
                            return (
                                <>
                                    <SignInMessage />
                                    <DefaultComponent {...props} />
                                </>
                            );
                        }
                    },
                },
            },
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
                                    <ThirdPartyEmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <>
                                            <Home />
                                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                                        </>
                                    </ThirdPartyEmailPasswordAuth>
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

function SignInMessage() {
    const [showMessage, setShowMessage] = React.useState(false);
    React.useEffect(() => {
        if (localStorage.getItem("showSignInMessage") === "true") {
            setShowMessage(true);

            // we remove this flag from localstorage so that this message is not shown again
            // until there is a sign up again.
            localStorage.removeItem("showSignInMessage");
        }
    }, []);
    if (showMessage) {
        return (
            <div
                style={{
                    color: "#ff9b33",
                }}>
                Sign up successful. Please login to continue.
            </div>
        );
    } else {
        return null;
    }
}
