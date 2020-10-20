import React from 'react';
import './App.css';
import AppWithReactDomRouter from './AppWithReactDomRouter';
import AppWithoutRouter from './AppWithoutRouter';

import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens",
    websiteDomain: "supertokens.io",
    apiDomain: "dev.supertokens.io"
  },
  recipeList: [
    // EmailPassword.init()
  ]
});

function App() {
  const router = getRouterFromLocationQueryParams();

  if (router === 'no-router') {
    return <AppWithoutRouter />
  }
  
  return <AppWithReactDomRouter />
}

function getRouterFromLocationQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('router');
}

export default App;
