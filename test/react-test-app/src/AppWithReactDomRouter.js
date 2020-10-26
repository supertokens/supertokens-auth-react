import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getSuperTokensRoutesForReactRouterDom} from 'supertokens-auth-react';

import {BaseComponent, Home, About, Contact} from './App';

function AppWithReactDomRouter() {
  return (
    <div className="App">
      <Router>
        <Nav/> 
        <h1>With Routing</h1>
        <a href="/home?router=no-router">Switch</a>
        <BaseComponent>
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
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
    <div class="header__menu menu">
    <div class="menu__icon icon-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="menu__body">
      <ul class="menu__list">
        <li><Link className="menu__link" style={{ textDecoration: 'none' }} to="/">Home</Link></li>
        <li><Link className="menu__link" style={{ textDecoration: 'none' }} to="/about">About</Link></li>
        <li><Link className="menu__link" style={{ textDecoration: 'none' }} to="/contact">Contact</Link></li>
        <li><Link className="menu__link" style={{ textDecoration: 'none' }} to="/auth">Auth</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default AppWithReactDomRouter;
