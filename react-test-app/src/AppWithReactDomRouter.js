import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SuperTokensRoute from 'supertokens-auth-react/components/superTokensRoute';

function AppWithReactDomRouter() {
  return (
    <div className="App">
      <Router>
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
        <BaseComponent>
          <SuperTokensRoute/>
          <Switch>
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

function Home () {
  return (
      <div>/Home</div>
    )
}

function About () {
  return (
      <div>/About</div>

    )
}

function Contact () {
  return (
      <div>/Contact</div>

    )
}
function BaseComponent ({children}) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {children}
    </header>
  )
}
export default AppWithReactDomRouter;
