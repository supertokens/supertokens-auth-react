import React, {Fragment, useEffect, useState} from 'react';
import './App.css';

import AppWithoutRouter from './AppWithoutRouter';
import AppWithReactDomRouter from './AppWithReactDomRouter';
import Footer from "./Footer";
/* SuperTokens imports */
import SuperTokens from 'supertokens-auth-react';
import EmailPassword, {signOut} from 'supertokens-auth-react/recipe/emailpassword';
import axios from "axios";

import Session from 'supertokens-auth-react/recipe/session';
Session.addAxiosInterceptors(axios);

/*
 * Use localStorage for tests configurations.
 */
if (getQueryParams('websiteBasePath')) {
  window.localStorage.setItem('websiteBasePath', getQueryParams('websiteBasePath'));
}
const websiteBasePath = window.localStorage.getItem('websiteBasePath') || undefined;


if (getQueryParams('useShadowDom')) {
  window.localStorage.setItem('useShadowDom', getQueryParams('useShadowDom') === "true");
}
const useShadowDom = window.localStorage.getItem('useShadowDom') !== "false";


if (getQueryParams('mode')) {
  window.localStorage.setItem('mode', getQueryParams('mode'));
}
const emailVerificationMode = window.localStorage.getItem('mode') || "OFF";

if (getQueryParams('defaultToSignUp')) {
  window.localStorage.setItem('defaultToSignUp', getQueryParams('defaultToSignUp') === "true");
}

if (getQueryParams('useReactRouterDom')) {
  window.localStorage.setItem('useReactRouterDom', getQueryParams('useReactRouterDom') === "true");
}
const useReactRouterDom = window.localStorage.getItem('useReactRouterDom') !== "false";


const defaultToSignUp = window.localStorage.getItem('defaultToSignUp') !== "false";

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens",
    websiteDomain: "localhost:3031",
    apiDomain: "localhost:8082",
    websiteBasePath
  },
  useReactRouterDom,
  recipeList: [
    EmailPassword.init({
      preAPIHook: async (context) => {
        console.log(`ST_LOGS PRE_API_HOOKS ${context.action}`);
        return context.requestInit;
      },
      getRedirectionURL: async (context) => {
        console.log(`ST_LOGS GET_REDIRECTION_URL ${context.action}`);
        if (context.action === "SUCCESS") {
          return context.redirectToPath || "/dashboard";
        }
      },
      onHandleEvent: async (context) => {
        console.log(`ST_LOGS ON_HANDLE_EVENT ${context.action}`);
      },
      useShadowDom,
      emailVerificationFeature: {
        mode: emailVerificationMode
      },
      signInAndUpFeature: {
        defaultToSignUp,
        signUpForm: {
          privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
          termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
          formFields: [{
                id: "email",
                label: "Your Email",
                placeholder: "Your work email"
            },{
                id: "name",
                label: "Full name",
                placeholder: "First name and last name",
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

  const [sessionInfoUsingAxios, setSessionInfoUsingAxios] = useState(undefined);
  const [sessionInfoUsingFetch, setSessionInfoUsingFetch] = useState(undefined);

  async function logout() {
    await signOut();
    window.location.href = "/auth";
  }

  async function fetchSessionInfoUsingAxios() {
    return (await axios.get('http://localhost:8082/sessionInfo')).data;
  }

  async function fetchSessionInfoUsingFetch() {
    const res = await fetch('http://localhost:8082/sessionInfo');
    return await res.json();
  }

  useEffect(() => {
    async function fetchData() {
      const sessionInfoUsingAxios = await fetchSessionInfoUsingAxios();
      setSessionInfoUsingAxios(sessionInfoUsingAxios);
      const sessionInfoUsingFetch = await fetchSessionInfoUsingFetch();
      setSessionInfoUsingFetch(sessionInfoUsingFetch);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>/Dashboard</h2>
      <button className="logout" onClick={logout} >Logout</button>
      <div className="axios">
          <SessionInfoTable sessionInfo={sessionInfoUsingAxios} />
      </div>
      <div className="fetch">
        <SessionInfoTable sessionInfo={sessionInfoUsingFetch} />
      </div>
    </div>
    )
}

function SessionInfoTable({sessionInfo}) {

  if (sessionInfo === undefined) {
    return <div className="sessionInfo" />
  }
  return (
    <ul>
        <li className={`sessionInfo-user-id`} >{sessionInfo['userId']}</li>
        <li className={`sessionInfo-session-handle`} >{sessionInfo['sessionHandle']}</li>
    </ul>
  )
}
