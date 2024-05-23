import { useState, useEffect } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import {
    getSuperTokensRoutesForReactRouterDom,
    AuthPage,
    AuthRecipeComponentsOverrideContextProvider,
} from "supertokens-auth-react/ui";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
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
    disableAuthRoute: true,
    style: `
        [data-supertokens~=headerSubtitle] {
            display: none;
        }
        [data-supertokens~=divider] {
            display: none; 
        }
    `,
    getRedirectionURL: function (context) {
        if (context.action === "TO_AUTH") {
            // if the user is not logged in, we want to send
            // them to the sign in page.
            return "/signin";
        }
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <SuperTokensWrapper>
            <AuthRecipeComponentsOverrideContextProvider
                components={{
                    AuthPageHeader_Override: ({ DefaultComponent, ...props }) => {
                        return props.isSignUp ? (
                            <div>
                                <DefaultComponent {...props} />
                                Click{" "}
                                <a id="signinLink" href="/signin">
                                    here
                                </a>{" "}
                                to sign in
                            </div>
                        ) : (
                            <div>
                                <DefaultComponent {...props} />
                                Click{" "}
                                <a id="signupLink" href="/signup">
                                    here
                                </a>{" "}
                                to sign up
                            </div>
                        );
                    },
                }}>
                <div className="App">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                    EmailPasswordPreBuiltUI,
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
                                {/* we want to render the sign in component in /signin.
                                    We will override the <SignInAndUp> component to only show the sign in
                                UI on this route. See the init function call above for how to do this*/}
                                <Route
                                    path="/signin"
                                    element={<AuthPage isSignUp={false} preBuiltUIList={[EmailPasswordPreBuiltUI]} />}
                                />

                                {/* we want to render the sign up component in /signup.
                                    We will override the <SignInAndUp> component to only show the sign up
                                UI on this route. See the init function call above for how to do this*/}
                                <Route
                                    path="/signup"
                                    element={<AuthPage isSignUp={true} preBuiltUIList={[EmailPasswordPreBuiltUI]} />}
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
