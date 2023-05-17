import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import {
    ResetPasswordUsingToken,
    SignInAndUp as TPSignInAndUp,
    ThirdPartySignInAndUpCallback,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";

function AppWithReactDomRouter(props) {
    /**
     * For user context tests we add this query param so the additional routes
     * don't interfere with other tests
     */
    const urlParams = new URLSearchParams(window.location.search);
    const isForUserContext = urlParams.get("forUserContext") === "true";
    const [claimValidators, setClaimValidators] = useState(undefined);
    window.setClaimValidators = setClaimValidators;
    const keyWithClaimValidators =
        claimValidators !== undefined ? claimValidators.map((a) => a.id).join("_") : undefined;
    const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    let recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
    if (authRecipe === "thirdparty") {
        recipePreBuiltUIList = [ThirdPartyPreBuiltUI];
    } else if (authRecipe === "emailpassword") {
        recipePreBuiltUIList = [EmailPasswordPreBuiltUI];
    } else if (authRecipe === "both") {
        recipePreBuiltUIList = [EmailPasswordPreBuiltUI, ThirdPartyPreBuiltUI];
    } else if (authRecipe === "thirdpartyemailpassword") {
        recipePreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI];
    } else if (authRecipe === "passwordless") {
        recipePreBuiltUIList = [PasswordlessPreBuiltUI];
    } else if (authRecipe === "thirdpartypasswordless") {
        recipePreBuiltUIList = [ThirdPartyPasswordlessPreBuiltUI];
    }
    if (emailVerificationMode !== "OFF") {
        recipePreBuiltUIList.push(EmailVerificationPreBuiltUI);
    }

    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Routes caseSensitive>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), recipePreBuiltUIList)}
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
