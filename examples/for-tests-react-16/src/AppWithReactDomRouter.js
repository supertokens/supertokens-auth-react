import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import {
    ResetPasswordUsingToken,
    SignInAndUp as TPSignInAndUp,
    ThirdPartySignInAndUpCallback,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/preBuiltUI";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/preBuiltUI";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/preBuiltUI";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/preBuiltUI";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty";

const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";

let routesRenderer = EmailPasswordPreBuiltUI.getReactRouterDomRoutes;
if (authRecipe === "thirdparty") {
    routesRenderer = ThirdPartyPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "emailpassword") {
    routesRenderer = EmailPasswordPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "both") {
    routesRenderer = (router) => {
        return [
            ...ThirdPartyPreBuiltUI.getReactRouterDomRoutes(router),
            ...EmailPasswordPreBuiltUI.getReactRouterDomRoutes(router),
        ];
    };
} else if (authRecipe === "thirdpartyemailpassword") {
    routesRenderer = ThirdPartyEmailPasswordPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "passwordless") {
    routesRenderer = PasswordlessPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "thirdpartypasswordless") {
    routesRenderer = ThirdPartyPasswordlessPreBuiltUI.getReactRouterDomRoutes;
}

function AppWithReactDomRouter(props) {
    /**
     * For user context tests we add this query param so the additional routes
     * dont interfere with other tests
     */
    const urlParams = new URLSearchParams(window.location.search);
    const isForUserContext = urlParams.get("forUserContext") === "true";
    const [claimValidators, setClaimValidators] = useState(undefined);
    window.setClaimValidators = setClaimValidators;
    const keyWithClaimValidators =
        claimValidators !== undefined ? claimValidators.map((a) => a.id).join("_") : undefined;
    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Routes caseSensitive>
                        {routesRenderer(require("react-router-dom"))}
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/CasE/Case-SensItive1-PAth"
                            element={
                                <SessionAuth {...props}>
                                    <Dashboard />
                                </SessionAuth>
                            }
                        />

                        <Route
                            path="/dashboard-no-auth"
                            element={
                                <SessionAuth
                                    requireAuth={false}
                                    key={keyWithClaimValidators}
                                    {...props}
                                    overrideGlobalClaimValidators={
                                        claimValidators !== undefined ? () => claimValidators : undefined
                                    }>
                                    <DashboardNoAuthRequired />
                                </SessionAuth>
                            }
                        />

                        {/* Logged In Components */}
                        <Route
                            path="/dashboard"
                            element={
                                <SessionAuth
                                    {...props}
                                    key={keyWithClaimValidators}
                                    overrideGlobalClaimValidators={
                                        claimValidators !== undefined ? () => claimValidators : undefined
                                    }>
                                    <Dashboard />
                                </SessionAuth>
                            }
                        />
                        <Route
                            path="/redirect-to-this-custom-path"
                            element={
                                <SessionAuth {...props}>
                                    <Dashboard />
                                </SessionAuth>
                            }
                        />

                        <Route path="/contact" element={<Contact />} />
                        <Route path="/custom-supertokens-login" element={<SignInAndUp />} />

                        {/* User context paths */}
                        {isForUserContext && (
                            <Route
                                path="/auth/reset-password"
                                element={
                                    <ResetPasswordUsingToken
                                        userContext={{
                                            key: "value",
                                        }}
                                    />
                                }
                            />
                        )}

                        <Route
                            path="/auth/customcallback/auth0"
                            element={
                                <ThirdPartySignInAndUpCallback
                                    userContext={{
                                        key: "value",
                                    }}
                                />
                            }
                        />

                        {isForUserContext && (
                            <Route
                                path="/auth"
                                element={
                                    <TPSignInAndUp
                                        userContext={{
                                            key: "value",
                                        }}
                                    />
                                }
                            />
                        )}
                    </Routes>
                </BaseComponent>
            </Router>
        </div>
    );
}

export default AppWithReactDomRouter;
