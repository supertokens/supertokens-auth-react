import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import { getApiDomain, getAuthDomain, getRedirectionUrlForUser } from "./utils";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
        websiteBasePath: "/",
    },
    recipeList: [
        EmailPassword.init({
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    // redirect users to their associated subdomain e.g abc.example.com for user abc
                    const redirectionUrl = await getRedirectionUrlForUser();
                    return redirectionUrl;
                }
            },
        }),
        Session.init({
            sessionScope: ".example.com",
        }),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {/* Present users with login/signup when they are on auth.example.com. 
                                If not try rendering our protected route. In case the user is unauthenticated 
                                the auth wrapper will simply redirect them to the login page */}
                            {window.location.origin === getAuthDomain() ? (
                                getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))
                            ) : (
                                <Route
                                    path="/"
                                    element={
                                        <SessionAuth>
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                            )}
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
