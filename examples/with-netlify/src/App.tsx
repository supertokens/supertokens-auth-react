import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword, { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Footer";

export function getDomain() {
    let host = window.location.hostname;
    let port = window.location.port;
    if (port !== "0" && port !== "80" && port !== "443" && port !== "") {
        return host + ":" + port;
    }
    return host;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getDomain(),
        websiteDomain: getDomain(),
        apiBasePath: "/.netlify/functions/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
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
                                    <EmailPasswordAuth>
                                        <Home />
                                    </EmailPasswordAuth>
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
