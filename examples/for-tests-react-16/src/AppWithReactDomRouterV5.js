import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-domv5";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword";
import { BaseComponent, Home, Contact, Dashboard, DashboardNoAuthRequired } from "./App";
import Auth from "./Auth";

function AppWithReactDomRouter(props) {
    return (
        <div className="App">
            <Router>
                <BaseComponent>
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-domv5"))}
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/CasE/Case-SensItive1-PAth" sensitive>
                            <Auth {...props}>
                                <Dashboard />
                            </Auth>
                        </Route>

                        <Route path="/dashboard-no-auth">
                            <Auth requireAuth={false} {...props}>
                                <DashboardNoAuthRequired />
                            </Auth>
                        </Route>

                        {/* Logged In Components */}
                        <Route path="/dashboard">
                            <Auth {...props}>
                                <Dashboard />
                            </Auth>
                        </Route>
                        <Route path="/redirect-to-this-custom-path">
                            <Auth {...props}>
                                <Dashboard />
                            </Auth>
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
