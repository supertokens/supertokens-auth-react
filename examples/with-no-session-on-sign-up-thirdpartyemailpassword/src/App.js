import React from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import {
    getSuperTokensRoutesForReactRouterDom,
    AuthRecipeComponentsOverrideContextProvider,
} from "supertokens-auth-react/ui";
import ThirdParty, { Google, Github, Apple } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

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
            onHandleEvent: (context) => {
                if (context.action === "SUCCESS") {
                    if (context.isNewRecipeUser) {
                        // we save info in localstorage to indicate to the UI that we should show
                        // a sign in message in the sign in page.
                        localStorage.setItem("showSignInMessage", "true");
                    }
                }
            },
        }),
        ThirdParty.init({
            onHandleEvent: (context) => {
                if (context.action === "SUCCESS") {
                    if (context.isNewRecipeUser) {
                        // we save info in localstorage to indicate to the UI that we should show
                        // a sign in message in the sign in page.
                        localStorage.setItem("showSignInMessage", "true");
                    }
                }
            },
            signInAndUpFeature: {
                providers: [Github.init(), Google.init(), Apple.init()],
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <AuthRecipeComponentsOverrideContextProvider
                components={{
                    AuthPageHeader_Override: ({ DefaultComponent, ...props }) => {
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
                }}>
                <div className="App">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                    ThirdPartyPreBuiltUI,
                                    EmailPasswordPreBuiltUI,
                                ])}

                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows 
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                                        <SessionAuth>
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </AuthRecipeComponentsOverrideContextProvider>
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
                }}
                id="signInMessage">
                Sign up successful. Please login to continue.
            </div>
        );
    } else {
        return null;
    }
}
