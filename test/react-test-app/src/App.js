import React, {Fragment} from 'react';
import './App.css';

import AppWithoutRouter from './AppWithoutRouter';
import AppWithReactDomRouter from './AppWithReactDomRouter';
import Footer from "./Footer";
/* SuperTokens imports */
import SuperTokens from 'supertokens-auth-react';
import EmailPassword, {signOut} from 'supertokens-auth-react/recipe/emailpassword';

import Session, {doesSessionExist} from 'supertokens-auth-react/recipe/session';


const colors = getQueryParams('theme') === 'dark' ? {
  background: '#333',
  textTitle: "white",
  textLabel: "white",
  textPrimary: "white",
  textLink: '#c31e1e'
} : {};

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens",
    websiteDomain: "localhost:3031",
    apiDomain: "localhost:8082"
  },
  recipeList: [
    EmailPassword.init({
      palette: {
        colors
      },
      signInAndUpFeature: {
        onSuccessRedirectURL: '/dashboard',
        signUpForm: {
          privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
          // termsAndConditionsLink: "https://supertokens.io/legal/terms-and-conditions",
          formFields: [{
                id: "name",
                label: "Full name",
                placeholder: "First name and last name"
            },{
                id: "age",
                label: "Your age",
                placeholder: "How old are you?",
                validate: async (value) => {
                  if (parseInt(value) > 18) {
                      return undefined;
                  }

                  return "You must be over 18 to register";;
                }
              }, {
                id: "country",
                label: "Your Country",
                placeholder: "Where do you live?",
                optional: true
            }]
          }
      }
    }),
    Session.init()
  ]
});

/* App */
function App() {
  const router = getQueryParams('router');

  if (router === 'no-router') {
    return <AppWithoutRouter />
  }
  
  return <AppWithReactDomRouter/>
}


function getQueryParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export default App;

export function BaseComponent ({children}) {
  return (
       <Fragment>
       <div className="page">
          {children}
       </div>
        <Footer/>
      </Fragment>
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

export function Dashboard () {
  if (!doesSessionExist()) {
    window.location.href = "/auth";
  }

  async function logout() {
    await signOut();
    window.location.href = "/auth";

  }

  return (
    <>
      <h2>/Dashboard</h2>
      <span onClick={logout} >Logout</span>
    </>)
}