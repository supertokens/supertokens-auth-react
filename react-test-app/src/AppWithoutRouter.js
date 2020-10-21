import React from 'react';
import {BaseComponent, Home} from './App';
import {canHandleRoute, getRoutingComponent} from 'supertokens-auth-react';

function AppWithoutRouter() {

  return (
    <>
      <h1>Without Routing</h1>
      <Nav />
      <Routing></Routing>
    </>
  )
}

function Routing () {
  if (canHandleRoute()) {
    const SuperTokensComponent = getRoutingComponent();
    debugger;
    return (<BaseComponent>
      <SuperTokensComponent />
    </BaseComponent>);
  }

  // Custom router...

  return (<BaseComponent>
    <Home />
  </BaseComponent>)
}

function Nav () {
  return (
    <nav>
        <ul>
          <li>
            <a href="/?router=no-router">Home</a>
          </li>
          <li>
            <a href="/auth?router=no-router">Auth</a>
          </li>
        </ul>
    </nav>
  )
}
export default AppWithoutRouter;
