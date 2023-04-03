import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-domv5";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";

const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";
const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

let routesRenderer = EmailPasswordPreBuiltUI.getReactRouterDomRoutes;
if (authRecipe === "thirdparty") {
    routesRenderer = ThirdPartyPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "emailpassword") {
    routesRenderer = EmailPasswordPreBuiltUI.getReactRouterDomRoutes;
} else if (authRecipe === "both") {
    routesRenderer = (router) => {
        return [
            ...EmailPasswordPreBuiltUI.getReactRouterDomRoutes(router),
            ...ThirdPartyPreBuiltUI.getReactRouterDomRoutes(router),
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
    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Switch>
                        {routesRenderer(require("react-router-domv5"))}
                        {emailVerificationMode !== "OFF" &&
                            EmailVerificationPreBuiltUI.getReactRouterDomRoutes(require("react-router-dom"))}
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/CasE/Case-SensItive1-PAth" sensitive>
                            <SessionAuth {...props}>
                                <Dashboard />
                            </SessionAuth>
                        </Route>

                        <Route path="/dashboard-no-auth">
                            <SessionAuth requireAuth={false} {...props}>
                                <DashboardNoAuthRequired />
                            </SessionAuth>
                        </Route>

                        {/* Logged In Components */}
                        <Route path="/dashboard">
                            <SessionAuth {...props}>
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
                            <SignInAndUp />
                        </Route>
                    </Switch>
                </BaseComponent>
            </Router>
        </div>
    );
}

export default AppWithReactDomRouter;
