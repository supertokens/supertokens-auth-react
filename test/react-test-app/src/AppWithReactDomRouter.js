import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getSuperTokensRoutesForReactRouterDom} from 'supertokens-auth-react';
import {SignInAndUp} from 'supertokens-auth-react/recipe/emailpassword';
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
            <Route path="/custom-supertokens-login">
              <SignInAndUp />
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
        <li key="custom"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/custom-supertokens-login">Custom-supertokens-login</Link></li>
      </ul>
    </nav>
  </div>
  )
}

export default AppWithReactDomRouter;
