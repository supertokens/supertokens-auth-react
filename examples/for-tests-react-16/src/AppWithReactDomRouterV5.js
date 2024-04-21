import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-domv5";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui";
import { TOTPPreBuiltUI } from "supertokens-auth-react/recipe/totp/prebuiltui";
import { getEnabledRecipes, getTestContext } from "./testContext";

function AppWithReactDomRouter(props) {
    const context = getTestContext();
    const enabledRecipes = getEnabledRecipes();
    const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

    let recipePreBuiltUIList = [TOTPPreBuiltUI];
    if (enabledRecipes.includes("emailpassword")) {
        recipePreBuiltUIList.push(EmailPasswordPreBuiltUI);
    }
    if (enabledRecipes.includes("thirdparty")) {
        recipePreBuiltUIList.push(ThirdPartyPreBuiltUI);
    }
    if (enabledRecipes.includes("thirdpartyemailpassword")) {
        recipePreBuiltUIList.push(ThirdPartyEmailPasswordPreBuiltUI);
    }
    if (enabledRecipes.includes("passwordless")) {
        recipePreBuiltUIList.push(PasswordlessPreBuiltUI);
    }
    if (enabledRecipes.includes("thirdpartypasswordless")) {
        recipePreBuiltUIList.push(ThirdPartyPasswordlessPreBuiltUI);
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
                            <AuthPage preBuiltUIList={[EmailPasswordPreBuiltUI]} />
                        </Route>
                    </Switch>
                </BaseComponent>
            </Router>
        </div>
    );
}

export default AppWithReactDomRouter;
