import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getSuperTokensRoutesForReactDomRouter} from 'supertokens-auth-react';

import {BaseComponent, Home, About, Contact} from './App';

function AppWithReactDomRouter() {
  return (
    <div className="App">
      <Router>
        <h1>With Routing</h1>
        <Nav/> 
        <BaseComponent>
          <Switch>
            {getSuperTokensRoutesForReactDomRouter()}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </BaseComponent>
      </Router>
    </div>
  );
}

function Nav () {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
      </ul>
    </nav> 
  )
}

export default AppWithReactDomRouter;
