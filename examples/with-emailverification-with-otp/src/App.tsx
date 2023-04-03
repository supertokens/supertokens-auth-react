import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyEmailpassword, { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import EmailVerification, {
    EmailVerificationComponentsOverrideProvider,
} from "supertokens-auth-react/recipe/emailverification";
import "./App.css";
import Home from "./Home";
import OtpScreen from "./OtpScreen";
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
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        ThirdPartyEmailpassword.init({
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
            <EmailVerificationComponentsOverrideProvider
                components={{
                    EmailVerificationSendVerifyEmail_Override: () => <OtpScreen />,
                }}>
                <div className="App">
                    <Router>
                        <Routes>
                            {ThirdPartyEmailPasswordPreBuiltUI.getReactRouterDomRoutes(require("react-router-dom"))}
                            {EmailVerificationPreBuiltUI.getReactRouterDomRoutes(require("react-router-dom"))}
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
            </EmailVerificationComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
