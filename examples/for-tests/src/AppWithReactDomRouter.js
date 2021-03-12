import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword";
import { BaseComponent, Home, Contact, Dashboard } from "./App";
import Auth from "./Auth";

function AppWithReactDomRouter(props) {
  return (
    <div className="App">
      <Router>
        <BaseComponent>
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route exact path="/">
              <Home />
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
