import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import axios from 'axios';

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
  },
  recipeList: [
    EmailPassword.init({
      // emailVerificationFeature: {
      //   mode: "REQUIRED"
      // },
      signInAndUpFeature: {
        signUpForm: {
          formFields: [
            {
              id: "username",
              label: "Username",
              placeholder: "A unique username",
              validate: async (value) => {
                const validUsernameRegex =  /^[A-Za-z0-9_]{3,20}$/;
                if (!validUsernameRegex.test(value)) {
                  return 'Invalid username: only alphabets, numbers and "_" allowed. Min 3 and Max 20 characters.'
                }

                // check with the backend that username is unique 
                // and if it is, allow signup otherwise request for a different
                // username
                const isValidRes = await axios.get(`${getApiDomain()}/validate-username/${value}`)
                if (isValidRes.data.valid) {
                  return undefined
                }
                return 'This username is not available, please try something else'
              },
            },
          ],
        },
      },
    }),
    Session.init(),
  ],
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
        <Footer />
      </Router >
    </div>
  );
}

export default App;