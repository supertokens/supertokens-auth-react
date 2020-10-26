import React from 'react';
import {BaseComponent, Home} from './App';
import {canHandleRoute, getRoutingComponent} from 'supertokens-auth-react';

function AppWithoutRouter() {

  return (
    <div className="App">
      <Nav />
        <h1>Without Routing</h1>
        <a href="/home">Switch</a>
      <Routing></Routing>
    </div>
  )
}

function Routing () {
  if (canHandleRoute()) {
    const SuperTokensComponent = getRoutingComponent();

    return (<BaseComponent>
        <SuperTokensComponent />
      </BaseComponent>
    );
  }

  // Custom router...

  return (<BaseComponent>
    <Home />
  </BaseComponent>)
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
        <li><a  className="menu__link" href="/home?router=no-router">Home</a></li>
        <li><a  className="menu__link"  href="/auth?router=no-router">Auth</a></li>
      </ul>
    </nav>
  </div>
  )
}
export default AppWithoutRouter;
