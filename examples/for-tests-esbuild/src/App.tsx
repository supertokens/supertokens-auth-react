import { useState } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, redirectToAuth } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdPartyEmailPassword, {
    Github,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import * as reactRouter from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";

export function getApiDomain() {
    const apiPort = 3001;
    const apiUrl = `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = 3000;
    const websiteUrl = `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [Github.init()],
            },
        }),
        Session.init(),
    ],
});

function App() {
    const [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <SuperTokensWrapper>
            <ThirdpartyEmailPasswordComponentsOverrideProvider
                components={{
                    ThirdPartySignInAndUpProvidersForm_Override: ({
                        DefaultComponent,
                        ...props
                    }: {
                        DefaultComponent: any;
                    }) => (
                        <div>
                            <DefaultComponent {...props} />
                            <div
                                id="passwordlessLoginBtn"
                                style={{
                                    display: "flex",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                    border: "2px",
                                    borderStyle: "solid",
                                    borderRadius: "8px",
                                    marginTop: "10px",
                                    cursor: "pointer",
                                    maxWidth: "240px",
                                    margin: "0 auto",
                                }}
                                onClick={() => {
                                    redirectToAuth({
                                        queryParams: {
                                            rid: "passwordless",
                                        },
                                        redirectBack: false,
                                    });
                                }}>
                                Passwordless login
                            </div>
                        </div>
                    ),
                }}>
                <div className="App">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {getSuperTokensRoutesForReactRouterDom(reactRouter, [
                                    ThirdPartyEmailPasswordPreBuiltUI,
                                ])}
                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows 
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                                        <SessionAuth
                                            onSessionExpired={() => {
                                                updateShowSessionExpiredPopup(true);
                                            }}>
                                            <Home />
                                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                        <Footer />
                    </Router>
                </div>
            </ThirdpartyEmailPasswordComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
