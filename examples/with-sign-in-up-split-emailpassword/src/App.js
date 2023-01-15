import { useState, useEffect } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword, { EmailPasswordComponentsOverrideProvider } from "supertokens-auth-react/recipe/emailpassword";
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
    recipeList: [
        EmailPassword.init({
            signInAndUpFeature: {
                disableDefaultImplementation: true, // this disables showing the default sign in + sign up component

                signInForm: {
                    // hides the element that shows switch to the sign up form and the divider in the sign in UI
                    style: `
                        [data-supertokens~=headerSubtitle] {
                            display: none;
                        }
                        [data-supertokens~=divider] {
                            display: none; 
                        }
                    `,
                },
                signUpForm: {
                    // hides the element that shows switch to the sign in form
                    style: `
                        [data-supertokens~=headerSubtitle] {
                            display: none;
                        }
                    `,
                },
            },
            getRedirectionURL: function (context) {
                if (context.action === "SIGN_IN_AND_UP") {
                    // if the user is not logged in, we want to send
                    // them to the sign in page.
                    return "/signin";
                }
            },
        }),
        Session.init(),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <SuperTokensWrapper>
            <EmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignIn_Override: ({ DefaultComponent, ...props }) => {
                        /* if the user visits the /signin route, we want to show the
                             default implementation. If thy visit the /signup 
                             route (which also renders the <SignInUp> component),
                             we want to show the sign up UI, so we set the query parm to ?show=signup
                             which shows the sign up UI.
                            */
                        const [showUI, setShowUI] = useState(false);
                        useEffect(() => {
                            if (window.location.pathname === "/signin") {
                                setShowUI(true);
                            } else if (window.location.pathname === "/signup") {
                                window.location.href = "/signup?show=signup";
                            } else {
                                setShowUI(true);
                            }
                        }, []);
                        if (showUI) {
                            return <DefaultComponent {...props} />;
                        } else {
                            return null;
                        }
                    },
                    EmailPasswordSignUp_Override: ({ DefaultComponent, ...props }) => {
                        /* if the user visits the /signup route, we want to show the
                             default implementation. If thy visit the /signin?show=signup
                             route, we want to show the sign in UI, so we redirect them to /signin
                             which shows the sign in UI.
                            */
                        const [showUI, setShowUI] = useState(false);
                        useEffect(() => {
                            if (window.location.pathname === "/signup") {
                                setShowUI(true);
                            } else if (window.location.pathname === "/signin") {
                                window.location.href = "/signin";
                            } else {
                                setShowUI(true);
                            }
                        }, []);
                        if (showUI) {
                            return <DefaultComponent {...props} />;
                        } else {
                            return null;
                        }
                    },
                    EmailPasswordSignInHeader_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                                Click{" "}
                                <a id="signupLink" href="/signup?show=signup">
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
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

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
                                <Route path="/signin" element={<EmailPassword.SignInAndUp />} />

                                {/* we want to render the sign up component in /signup.
                                We will override the <SignInAndUp> component to only show the sign up
                            UI on this route. See the init function call above for how to do this*/}
                                <Route path="/signup" element={<EmailPassword.SignInAndUp />} />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </EmailPasswordComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
