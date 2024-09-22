import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResetPasswordUsingToken } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom, AuthPage } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { ThirdPartyPreBuiltUI, SignInAndUpCallback } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { OAuth2ProviderPreBuiltUI } from "supertokens-auth-react/recipe/oauth2provider/prebuiltui";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui";
import { TOTPPreBuiltUI } from "supertokens-auth-react/recipe/totp/prebuiltui";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import { getEnabledRecipes, getTestContext } from "./testContext";
import OAuth2Page from "./OAuth2Page";

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

    const context = getTestContext();
    const enabledRecipes = getEnabledRecipes();
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";
    const websiteBasePath = window.localStorage.getItem("websiteBasePath") || undefined;

    let recipePreBuiltUIList = [TOTPPreBuiltUI, OAuth2ProviderPreBuiltUI];
    if (enabledRecipes.some((r) => r.startsWith("thirdparty"))) {
        recipePreBuiltUIList.push(ThirdPartyPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("emailpassword"))) {
        recipePreBuiltUIList.push(EmailPasswordPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("passwordless"))) {
        recipePreBuiltUIList.push(PasswordlessPreBuiltUI);
    }
    if (emailVerificationMode !== "OFF") {
        recipePreBuiltUIList.push(EmailVerificationPreBuiltUI);
    }

    if (context.enableMFA) {
        recipePreBuiltUIList.push(MultiFactorAuthPreBuiltUI);
    }

    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Routes caseSensitive>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), recipePreBuiltUIList)}
                        {websiteBasePath && websiteBasePath.startsWith("/en") && (
                            <Route
                                path="/en"
                                element={getSuperTokensRoutesForReactRouterDom(
                                    require("react-router-dom"),
                                    recipePreBuiltUIList,
                                    "/en"
                                )}
                            />
                        )}
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
                                    accessDeniedScreen={AccessDeniedScreen}
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
                        <Route
                            path="/custom-supertokens-login"
                            element={
                                <AuthPage factors={["emailpassword"]} preBuiltUIList={[EmailPasswordPreBuiltUI]} />
                            }
                        />
                        <Route
                            path="/auth-for-factors"
                            element={
                                <AuthPage
                                    preBuiltUIList={recipePreBuiltUIList}
                                    userContext={{
                                        key: "value",
                                    }}
                                    factors={new URLSearchParams(window.location.search).get("factors")?.split(",")}
                                />
                            }
                        />

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
                                <SignInAndUpCallback
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
                                    <AuthPage
                                        preBuiltUIList={[ThirdPartyPreBuiltUI]}
                                        userContext={{
                                            key: "value",
                                        }}
                                        factors={["thirdparty"]}
                                    />
                                }
                            />
                        )}

                        <Route path="/oauth/login" element={<OAuth2Page />} />
                        <Route path="/oauth/callback" element={<OAuth2Page />} />
                    </Routes>
                </BaseComponent>
            </Router>
        </div>
    );
}

export default AppWithReactDomRouter;
