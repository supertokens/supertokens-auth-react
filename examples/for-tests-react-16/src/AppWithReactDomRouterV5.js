import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-domv5";
import { getSuperTokensRoutesForReactRouterDom, AuthPage } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui";
import { TOTPPreBuiltUI } from "supertokens-auth-react/recipe/totp/prebuiltui";
import { getEnabledRecipes, getTestContext } from "./testContext";
import { WebauthnPreBuiltUI } from "supertokens-auth-react/recipe/webauthn/prebuiltui";

function AppWithReactDomRouter(props) {
    const context = getTestContext();
    const enabledRecipes = getEnabledRecipes();
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    let recipePreBuiltUIList = [TOTPPreBuiltUI];
    if (enabledRecipes.some((r) => r.startsWith("thirdparty"))) {
        recipePreBuiltUIList.push(ThirdPartyPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("emailpassword"))) {
        recipePreBuiltUIList.push(EmailPasswordPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("passwordless"))) {
        recipePreBuiltUIList.push(PasswordlessPreBuiltUI);
    }
    if (enabledRecipes.some((r) => r.endsWith("webauthn"))) {
        recipePreBuiltUIList.push(WebauthnPreBuiltUI);
    }
    if (emailVerificationMode !== "OFF") {
        recipePreBuiltUIList.push(EmailVerificationPreBuiltUI);
    }

    if (context.enableMFA) {
        recipePreBuiltUIList.push(MultiFactorAuthPreBuiltUI);
    }

    const websiteBasePath = window.localStorage.getItem("websiteBasePath") || undefined;

    const [claimValidators, setClaimValidators] = useState(undefined);
    window.setClaimValidators = setClaimValidators;
    const keyWithClaimValidators =
        claimValidators !== undefined ? claimValidators.map((a) => a.id).join("_") : undefined;

    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-domv5"), recipePreBuiltUIList)}
                        {websiteBasePath && websiteBasePath.startsWith("/en") && (
                            <Route
                                path="/en"
                                element={getSuperTokensRoutesForReactRouterDom(
                                    require("react-router-domv5"),
                                    recipePreBuiltUIList,
                                    "/en"
                                )}
                            />
                        )}
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/CasE/Case-SensItive1-PAth" sensitive>
                            <SessionAuth {...props}>
                                <Dashboard />
                            </SessionAuth>
                        </Route>

                        <Route path="/dashboard-no-auth">
                            <SessionAuth
                                requireAuth={false}
                                {...props}
                                key={keyWithClaimValidators}
                                overrideGlobalClaimValidators={
                                    claimValidators !== undefined ? () => claimValidators : undefined
                                }>
                                <DashboardNoAuthRequired />
                            </SessionAuth>
                        </Route>

                        {/* Logged In Components */}
                        <Route path="/dashboard">
                            <SessionAuth
                                {...props}
                                key={keyWithClaimValidators}
                                overrideGlobalClaimValidators={
                                    claimValidators !== undefined ? () => claimValidators : undefined
                                }
                                accessDeniedScreen={AccessDeniedScreen}>
                                <Dashboard />
                            </SessionAuth>
                        </Route>
                        <Route path="/redirect-to-this-custom-path">
                            <SessionAuth {...props}>
                                <Dashboard />
                            </SessionAuth>
                        </Route>

                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/custom-supertokens-login">
                            <AuthPage factors={["emailpassword"]} preBuiltUIList={[EmailPasswordPreBuiltUI]} />
                        </Route>
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
                    </Switch>
                </BaseComponent>
            </Router>
        </div>
    );
}

export default AppWithReactDomRouter;
