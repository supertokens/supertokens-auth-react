import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
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
        <div className="App">
            <Router>
                <div className="fill">
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route path="/">
                            <EmailPassword.EmailPasswordAuth>
                                <Home />
                            </EmailPassword.EmailPasswordAuth>
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
