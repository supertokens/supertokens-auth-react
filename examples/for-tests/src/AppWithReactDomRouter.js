import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getSuperTokensRoutesForReactRouterDom} from 'supertokens-auth-react';
import {SignInAndUp, EmailPasswordAuth} from 'supertokens-auth-react/recipe/emailpassword';
import {BaseComponent, Home, About, Contact, Dashboard} from './App';
import SignInAndUpCustom from './themes/signInAndUp';

function AppWithReactDomRouter() {

  return (
    <div className="App">
      <Router>
        <Nav/> 
        <div className="routing-header">
          <h3>With Routing</h3>
          <a href="/home?router=no-router">Switch</a>
        </div>
        <BaseComponent>
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
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
            <Route path="/custom-theme">
              <SignInAndUp >
                <SignInAndUpCustom/>
              </SignInAndUp >
            </Route>
          </Switch>
        </BaseComponent>
      </Router>
    </div>
  );
}

function Nav () {
  return (
    <div className="header__menu menu">
    <div className="menu__icon icon-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav className="menu__body">
      <ul className="menu__list">
        <li key="home"><Link  className="menu__link" style={{ textDecoration: 'none' }} to="/">Home</Link></li>
        <li key="about"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/about">About</Link></li>
        <li key="contact"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/contact">Contact</Link></li>
        <li key="auth"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/auth">Auth</Link></li>
        <li key="custom2"><a className="menu__link" style={{ textDecoration: 'none' }} href="/dashboard">Dashboard (Logged In)</a></li>
        <li key="custom6"><a className="menu__link" style={{ textDecoration: 'none' }} href="/auth/reset-password">Reset Password</a></li>
        <li key="custom4"><a className="menu__link" style={{ textDecoration: 'none' }} href="/custom-theme">Custom theme</a></li>
      </ul>
    </nav>
  </div>
  )
}

export default AppWithReactDomRouter;
