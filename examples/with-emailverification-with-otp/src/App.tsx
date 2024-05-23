import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdParty, { Github, Google } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import "./App.css";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

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
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        MultiFactorAuth.init({
            firstFactors: ["emailpassword", "thirdparty"],
        }),
        Passwordless.init({
            contactMethod: "EMAIL",
        }),
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Github.init(), Google.init()],
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <Routes>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                            ThirdPartyPreBuiltUI,
                            EmailPasswordPreBuiltUI,
                            PasswordlessPreBuiltUI,
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
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
