import React from 'react';
import './App.css';
import './App.css';
import AppWithoutRouter from './AppWithoutRouter';
import AppWithReactDomRouter from './AppWithReactDomRouter';

/* SuperTokens imports */
import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
SuperTokens.init({
  appInfo: {
    appName: "SuperTokens",
    websiteDomain: "localhost:3031",
    apiDomain: "localhost:9090" // Not used yet.
  },
  recipeList: [
    EmailPassword.init()
  ]
});


/* App */
function App() {
  const router = getRouterFromLocationQueryParams();

  if (router === 'no-router') {
    return <AppWithoutRouter />
  }
  
  return <AppWithReactDomRouter/>
}

function getRouterFromLocationQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('router');
}

export default App;

export function BaseComponent ({children}) {
  return (
    <header className="App-header">
      {children}
    </header>
  )
}

export function Home () {
  return (
      <div>/Home</div>
    )
}

export function About () {
  return (
      <div>/About</div>

    )
}

export function Contact () {
  return (
      <div>/Contact</div>

    )
}