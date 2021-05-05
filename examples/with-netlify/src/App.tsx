import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword, { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
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
        <Router>
            <div className="App">
                <div className="fill">
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route path="/">
                            <EmailPasswordAuth>
                                <Home />
                            </EmailPasswordAuth>
                        </Route>
                    </Switch>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
