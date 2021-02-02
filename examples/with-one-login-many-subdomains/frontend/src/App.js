import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import axios from 'axios';

Session.addAxiosInterceptors(axios)

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://auth.example.com:${websitePort}`;
  return websiteUrl;
}

async function getSubdomainForUser(userId) {
  const subdomainRes = await axios.get(`${getApiDomain()}/user-subdomain/${userId}`)
  const subdomain = subdomainRes.data.subdomain
  return `http://${subdomain}.example.com:3000/home`
}

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
    websiteBasePath: "/",
  },
  recipeList: [
    EmailPassword.init({
      // emailVerificationFeature: {
      //   mode: "REQUIRED"
      // },
      getRedirectionURL: async (context) => {
        console.log(context);
        if (context.action === "SUCCESS") { 
          if (window.location.hostname === "auth.example.com") {
            return getSubdomainForUser(Session.getUserId())
          } else {
            return "home"
          }
        }

        if (context.action === "SIGN_IN_AND_UP") { 
          if (!Session.doesSessionExist()) {
            return getWebsiteDomain()
          }
        }
      },
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: "username",
              label: "Username",
              placeholder: "A unique username",
              validate: async (value) => {
                const validUsernameRegex = /^[A-Za-z0-9_]{3,20}$/;
                if (!validUsernameRegex.test(value)) {
                  return 'Invalid username: only alphabets, numbers and "_" allowed. Min 3 and Max 20 characters.';
                }

                // check with the backend that username is unique
                // and if it is, allow signup otherwise request for a different
                // username
                const isValidRes = await axios.get(
                  `${getApiDomain()}/validate-username/${value}`
                );
                if (isValidRes.data.valid) {
                  return undefined;
                }
                return "This username is not available, please try something else";
              },
            },
          ],
        },
      },
    }),
    Session.init({
      sessionScope: ".example.com",
    }),
  ],
});


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            <Route path="/home">
              <EmailPassword.EmailPasswordAuth>
                <Home/>
              </EmailPassword.EmailPasswordAuth>
            </Route>
            {getSuperTokensRoutesForReactRouterDom()}
          </Switch>
        </div>
        <Footer />
      </Router >
    </div>
  );
}

export default App;