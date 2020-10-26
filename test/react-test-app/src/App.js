import React from 'react';
import './App.css';
import './App.css';
import AppWithoutRouter from './AppWithoutRouter';
import AppWithReactDomRouter from './AppWithReactDomRouter';
import Footer from "./Footer";
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
       <>
       <div className="page">
          {children}
       </div>
        <Footer/>
      </>
  )
}

export function Home () {
  return (
      <h2>/Home</h2>
    )
}

export function About () {
  return (
      <h2>/About</h2>

    )
}

export function Contact () {
  return (
      <h2>/Contact</h2>

    )
}