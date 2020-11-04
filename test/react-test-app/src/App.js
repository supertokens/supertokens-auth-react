import React, {Fragment} from 'react';
import './App.css';
import './App.css';
import AppWithoutRouter from './AppWithoutRouter';
import AppWithReactDomRouter from './AppWithReactDomRouter';
import Footer from "./Footer";
/* SuperTokens imports */
import SuperTokens from 'supertokens-auth-react';
import EmailPassword, {signOut} from 'supertokens-auth-react/recipe/emailpassword';

import Session, {doesSessionExist} from 'supertokens-auth-react/recipe/session';


SuperTokens.init({
  appInfo: {
    appName: "SuperTokens",
    websiteDomain: "localhost:3031",
    apiDomain: "localhost:8082"
  },
  recipeList: [
    EmailPassword.init({
      // palette: {
      //   colors: {
      //     primary: '#1d1d50',
      //     background: '#2f4566',
      //     textPrimary: "white",
      //     textSecondary: "#fff",
      //     textLink: 'red'
      //   }
      // },
      signInAndUpFeature: {
        onSuccessRedirectURL: '/dashboard',
        signUpForm: {
          privacyPolicyLink: "http://localhost:3031/privacy",
          termsAndConditionsLink: "http://localhost:3031/terms",
          formFields: [{
            id: "company",
            label: "Company",
            placeholder: "Your company name"
          }, {
            id: "First Name",
            label: "First Name",
            placeholder: "First Name",
            optional: false
          }, {
            id: "Last Name",
            label: "Last Name",
            placeholder: "Last Name",
            optional: false
          },  {
            id: "City",
            label: "City",
            placeholder: "City",
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