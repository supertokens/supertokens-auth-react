import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordOnHandleEventContext, EmailPasswordPreAPIHookContext } from '../../../lib/ts/recipe/emailpassword/types';

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 8082;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

let colors = {};

const mode = getQueryParams('mode');

if (mode !== null) {
  window.localStorage.setItem('mode', mode);
}

const theme = getQueryParams('theme');
if (theme !== null) {
  colors = theme === 'dark' ? {
    background: '#333',
    inputBackground: "#292929", 
    textTitle: "white",
    textLabel: "white",
    textPrimary: "white",
    error: '#ad2e2e',
    textInput: '#a9a9a9',
    textLink: '#a9a9a9'
  } : {};
}


SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain()
  },
  recipeList: [
    EmailPassword.init({
      palette: {
        ...colors
      },
      emailVerificationFeature: {
        mode: "REQUIRED"
      }, 
      signInAndUpFeature: {
        signUpForm: {
          privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
          termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
          // formFields: [{
          //   id: "email",
          //   label: "Your Email",
          //   placeholder: "Your work email"
          // },{
          //     id: "name",
          //     label: "Full name",
          //     placeholder: "First name and last name",
          // },{
          //     id: "age",
          //     label: "Your age",
          //     placeholder: "How old are you?",
          //     validate: async (value) => {
          //       if (parseInt(value) > 18) {
          //           return undefined;
          //       }

          //       return "You must be over 18 to register";;
          //     }
          //   }, {
          //     id: "country",
          //     label: "Your Country",
          //     placeholder: "Where do you live?",
          //     optional: true
          // }]
        }
      },

      onHandleEvent(context: EmailPasswordOnHandleEventContext) {
        if (context.action === "SIGN_IN_AND_UP") {
          return "/auth#"
        }
        return undefined;
      },

      async preAPIHook(context: EmailPasswordPreAPIHookContext) {
        return context.requestInit;
      },

      async getRedirectionURL(context: EmailPasswordGetRedirectionURLContext) {
        if (context.action === "SIGN_IN_AND_UP") {
          return "/auth#"
        }
        return undefined;
      }
      
    }),
    Session.init()
  ]
});


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route path="/">
              <EmailPassword.EmailPasswordAuth>
                <Home />
              </EmailPassword.EmailPasswordAuth>
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router >
    </div>
  );
}

export default App;

function getQueryParams(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}