import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig } from "./config";
import { ThirdpartyComponentsOverrideProvider } from "supertokens-auth-react/recipe/thirdparty";
import thirdParty from "supertokens-auth-react/recipe/thirdparty";
import { getWebsiteDomain } from "./config";

SuperTokens.init(SuperTokensConfig);

function App() {
    return (
        <SuperTokensWrapper>
            <ThirdpartyComponentsOverrideProvider
                components={{
                    // In this case, the <ThirdPartyPasswordlessHeader_Override>
                    // will render the original component
                    // wrapped in a div with an octocat picture above it.
                    ThirdPartySignInAndUpProvidersForm_Override: ({ DefaultComponent, providers, ...props }) => {
                        return (
                            <div>
                                {(() => {
                                    return providers.map((provider) => {
                                        return (
                                            <div>
                                                <button
                                                    onClick={async () => {
                                                        const authUrl =
                                                            await thirdParty.getAuthorisationURLWithQueryParamsAndSetState(
                                                                {
                                                                    providerId: provider.id,
                                                                    authorisationURL: `${getWebsiteDomain()}/auth/callback/${
                                                                        provider.id
                                                                    }`,
                                                                }
                                                            );
                                                        const win = window.open(
                                                            authUrl,
                                                            "_blank",
                                                            "width=600,height=600"
                                                        );
                                                        const timer = setInterval(() => {
                                                            if (win && win.closed) {
                                                                clearInterval(timer);
                                                                window.location.replace("/");
                                                            }
                                                        }, 1000);
                                                    }}>
                                                    Login with {provider.id}
                                                </button>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        );
                    },
                }}>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                    ThirdPartyPreBuiltUI,
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
                        </div>
                    </Router>
                </div>
            </ThirdpartyComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
