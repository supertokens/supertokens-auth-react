import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordOnHandleEventContext, EmailPasswordPreAPIHookContext } from '../../../lib/ts/recipe/emailpassword/types';
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import DarkTheme from "./Themes/Dark";
import { CSSObject } from '@emotion/react';
export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 8082;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3002;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

const mode = getQueryParams('mode');

if (mode !== null) {
  window.localStorage.setItem('mode', mode);
}

const theme = getTheme();


SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: window.location.origin
  },
  recipeList: [
    EmailPassword.init({
      palette: theme.colors,
      emailVerificationFeature: {
        sendVerifyEmailScreen: {
          style: theme.style
        },
        verifyEmailLinkClickedScreen: {
          style: theme.style
        },
        mode: "REQUIRED"
      },
      resetPasswordUsingTokenFeature: {
        enterEmailForm: {
          style: theme.style
        },
        submitNewPasswordForm: {
          style: theme.style
        }
      }, 
      signInAndUpFeature: {
        signInForm: {
          style: theme.style
        },
        signUpForm: {
          style: theme.style,
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
      },

      async preAPIHook(context: EmailPasswordPreAPIHookContext) {
        return context.requestInit;
      },

      async getRedirectionURL(context: EmailPasswordGetRedirectionURLContext) {
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
            <Route path="/redirect-to-this-custom-path">
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

export type Theme = {
  colors: Record<string, string>,
  style: Record<string, CSSObject>,
}
function getTheme(): {
  colors: Record<string, string>,
  style?: Record<string, CSSObject>,
} {

  let theme = {
    colors: {},
    style: {}
  };

  const themeParams = getQueryParams('theme');

  if (themeParams === "dark") {
    window.document.body.style.backgroundColor = "#1a1a1a"
    return DarkTheme;
  }

  if (themeParams === "helium") {
    return HeliumTheme;
  }

  if (themeParams === "hydrogen") {
    return HydrogenTheme;
  }

  return theme;

}