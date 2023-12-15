import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import { PreBuiltUIList, SuperTokensConfig } from "./config";
import { MultiFactorAuthClaim } from "supertokens-auth-react/recipe/multifactorauth";
import RecoveryCode from "./RecoveryCode";
import { TOTPComponentsOverrideProvider } from "supertokens-auth-react/recipe/totp";

SuperTokens.init(SuperTokensConfig);

function App() {
    return (
        <SuperTokensWrapper>
            <TOTPComponentsOverrideProvider
                components={{
                    TOTPCodeVerificationFooter_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <NavLink
                                    to="/recover"
                                    data-supertokens="lostDevice"
                                    style={{
                                        display: "block",
                                        marginTop: "10px",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Rubik, sans-serif",
                                        letterSpacing: "0.4px",
                                        textDecoration: "none",
                                        color: "#808080",
                                    }}>
                                    Lost my device
                                </NavLink>
                                <DefaultComponent {...props} />
                            </div>
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
                                    path="/recover"
                                    element={
                                        /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                        <SessionAuth key={"2fa"} overrideGlobalClaimValidators={() => []}>
                                            <RecoveryCode />
                                        </SessionAuth>
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        /* This protects the "/" route so that it shows
                                  <Home /> only if the user is logged in.
                                  Else it redirects the user to "/auth" */
                                        <SessionAuth>
                                            <Home mfaRequirements="no MFA" />
                                        </SessionAuth>
                                    }
                                />
                            </Routes>
                        </div>
                    </Router>
                </div>
            </TOTPComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;
