import './App.css';
import { useEffect } from "react"
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import { getApiDomain, getAuthDomain, getRedirectionUrlForUser, redirectIfOnWrongSubdomain } from "./utils"


SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getAuthDomain()
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: "REQUIRED"
      },
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          // redirect users to their associated subdomain e.g abc.example.com for user abc
          const redirectionUrl = await getRedirectionUrlForUser();
          return redirectionUrl;
        }
      },
    }),
    Session.init({
      sessionScope: ".example.com"
    })
  ]
});


function App() {
  useEffect(() => {
    // If the user `abc` navigates to `xyz.example.com`, redirect them back to
    // their correct subdomain i.e `abc.example.com`
    redirectIfOnWrongSubdomain();
  }, []);

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
