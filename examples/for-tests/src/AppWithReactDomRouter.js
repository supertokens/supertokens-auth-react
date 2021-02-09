import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {getSuperTokensRoutesForReactRouterDom} from 'supertokens-auth-react';
import {SignInAndUp, EmailPasswordAuth} from 'supertokens-auth-react/recipe/emailpassword';
import {BaseComponent, Home, Contact, Dashboard} from './App';

function AppWithReactDomRouter() {

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
              <EmailPasswordAuth>
                <Dashboard />
              </EmailPasswordAuth>
            </Route>
            <Route path="/redirect-to-this-custom-path">
              <EmailPasswordAuth>
                <Dashboard />
              </EmailPasswordAuth>
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
