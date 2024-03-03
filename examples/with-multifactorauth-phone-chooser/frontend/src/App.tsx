import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { PreBuiltUIList, SuperTokensConfig } from "./config";
import SelectPhone from "./SelectPhone";
import { PasswordlessComponentsOverrideProvider } from "supertokens-auth-react/recipe/passwordless";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

SuperTokens.init(SuperTokensConfig);

function App() {
    return (
        <SuperTokensWrapper>
            <PasswordlessComponentsOverrideProvider
                components={{
                    PasswordlessMFAOTPFooter_Override: ({ DefaultComponent, ...props }) => {
                        const hasOtherPhoneNumbers = (props.loginAttemptInfo as any).hasOtherPhoneNumbers;
                        return (
                            <>
                                {hasOtherPhoneNumbers && (
                                    <a
                                        data-supertokens="secondaryText changePhoneNumber"
                                        style={{ marginTop: "10px", cursor: "pointer" }}
                                        onClick={() => {
                                            Passwordless.clearLoginAttemptInfo().then(() => window.history.back());
                                        }}>
                                        Change phone number
                                    </a>
                                )}
                                <DefaultComponent {...props} />
                            </>
                        );
                    },
                }}>
                <div className="App app-container">
                    <Router>
                        <div className="fill">
                            <Routes>
                                {/* This shows the login UI on "/auth" route */}
                                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}

                                <Route
                                    path="/select-phone"
                                    element={
                                        /* This protects the "/" route so that it shows
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                                        <SessionAuth key={"select-phone"} overrideGlobalClaimValidators={() => []}>
                                            <SelectPhone />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows
                                    <Home /> only if the user is logged in.
                                    Else it redirects the user to "/auth" */
                                        <SessionAuth key="0fa">
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </PasswordlessComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
