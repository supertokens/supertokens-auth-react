import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/preBuiltUI";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

export function getDomain() {
    let host = window.location.hostname;
    let port = window.location.port;
    if (port !== "0" && port !== "80" && port !== "443" && port !== "") {
        return host + ":" + port;
    }
    return host;
}
export function getAPIDomain() {
    return "https://0ktsu4mmb6.execute-api.us-east-1.amazonaws.com";
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getAPIDomain(),
        websiteDomain: getDomain(),
        apiBasePath: "/auth",
        apiGatewayPath: "/dev",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
    return (
        <SuperTokensWrapper>
            <Router>
                <div className="App">
                    <div className="fill">
                        <Routes>
                            {EmailPasswordPreBuiltUI.getReactRouterDomRoutes(require("react-router-dom"))}
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
                    <div className="footer">
                        <Footer />
                    </div>
                </div>
            </Router>
        </SuperTokensWrapper>
    );
}

export default App;
