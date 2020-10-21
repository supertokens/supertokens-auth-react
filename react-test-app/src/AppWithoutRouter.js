import React from 'react';
import logo from './logo.svg';

import {canHandleRoute, getRoutingComponent} from 'supertokens-auth-react';

function AppWithoutRouter() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App without router lib
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default AppWithoutRouter;
