import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
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
        <Router>
            <div className="App">
                <SuperTokensWrapper>
                    <div className="fill">
                        <Routes>
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                            <Route
                                path="/"
                                element={
                                    <SessionAuth>
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </SuperTokensWrapper>
            </div>
        </Router>
    );
}

export default App;
