import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import { getApiDomain, getAuthDomain } from "./utils";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
    },
    recipeList: [
        EmailPassword.init(),
        Session.init({
            sessionScope: ".example.com:3000",
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
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                            <Route
                                path="/"
                                element={
                                    <EmailPassword.EmailPasswordAuth>
                                        <Home />
                                    </EmailPassword.EmailPasswordAuth>
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
