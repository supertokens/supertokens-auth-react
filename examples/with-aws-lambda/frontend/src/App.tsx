import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
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
    return "<YOUR_API_GATEWAY_ENDPOINT>";
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getAPIDomain(),
        websiteDomain: getDomain(),
        apiBasePath: "/auth",
        apiGatewayPath: "/dev",
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    ThirdPartyEmailPassword.Google.init(),
                    ThirdPartyEmailPassword.Github.init(),
                    ThirdPartyEmailPassword.Apple.init(),
                ],
            },
        }),
        Session.init(),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <Router>
                <div className="App">
                    <div className="fill">
                        <Routes>
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                ThirdPartyEmailPasswordPreBuiltUI,
                            ])}
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
