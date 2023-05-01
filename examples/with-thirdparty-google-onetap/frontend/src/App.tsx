import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { SuperTokensConfig } from "./config";
import { ThirdpartyComponentsOverrideProvider } from "supertokens-auth-react/recipe/thirdparty";
import GoogleOneTapLogin from './google-one-tap';
import { useNavigate } from "react-router-dom";


import ThirdParty from 'supertokens-auth-react/recipe/thirdparty'

SuperTokens.init(SuperTokensConfig);

function App() {
    const doLogin = async (data: any) => {

        if (data.credential) {
            await ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({ providerId: "google", authorisationURL: window.location.toString() })
            const stateInfo = await ThirdParty.getStateAndOtherInfoFromStorage();
            if (data.credential && stateInfo !== undefined) {
                // Save for the overrides to read
                window.localStorage.setItem("oneTapCredential", data.credential);
                window.localStorage.setItem("oneTapState", stateInfo.stateForAuthProvider);

                await ThirdParty.signInAndUp({ userContext: { oneTap: true }});
                document.location.href="/";
            }
        }
    }

    return (
        <SuperTokensWrapper>
            <ThirdpartyComponentsOverrideProvider
                components={{
                    // In this case, the <ThirdPartyPasswordlessHeader_Override> 
                    // will render the original component
                    // wrapped in a div with an octocat picture above it.
                    ThirdPartySignInAndUpProvidersForm_Override: ({DefaultComponent, providers, ...props}) => {
                        return (
                            <div>
                                {(() => {
                                    return (
                                        <div>
                                            <div id="google-onetap-container"></div>
                                            <GoogleOneTapLogin onSuccess={doLogin} googleAccountConfigs={{ client_id: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com", prompt_parent_id: "google-onetap-container", cancel_on_tap_outside: false }} />
                                            <DefaultComponent providers={providers.filter((provider) => provider.id !== 'google')} {...props} />
                                        </div>
                                    );
                                })()}
                            </div>
                        );
                    }
                }}>
                <div className="App app-container">
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
