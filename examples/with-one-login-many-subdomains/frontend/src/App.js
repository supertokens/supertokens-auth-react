import "./App.css";
import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import {
  getApiDomain,
  getAuthDomain,
  getRedirectionUrlForUser,
  getSubdomainForCurrentUser,
  websitePort,
} from "./utils";

Session.addAxiosInterceptors(axios);

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getAuthDomain(),
    websiteBasePath: "/",
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: "REQUIRED",
      },
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          const redirectionUrl = await getRedirectionUrlForUser();
          return redirectionUrl
        }
      },
    }),
    Session.init({
      sessionScope: ".example.com",
    }),
  ],
});

function App() {
  useEffect(() => {
    async function redirectIfOnWrongSubdomain() {
      try {
        if (Session.doesSessionExist()) {
          const currentSubdomain = window.location.hostname.split(".")[0];
          const currentUserSubdomain = await getSubdomainForCurrentUser();
          // location.origin check ensures that user gets the option to click 
          // the continue button on verify-email page
          if (
            window.location.origin !== getAuthDomain() &&
            currentSubdomain !== currentUserSubdomain
          ) {
            window.location.href = `http://${currentUserSubdomain}.example.com:${websitePort}`;
          }
        }
      } catch (error) {}
    }
    redirectIfOnWrongSubdomain();
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {window.location.hostname === "auth.example.com" ? (
              getSuperTokensRoutesForReactRouterDom()
            ) : (
              <Route path="/">
                <EmailPassword.EmailPasswordAuth>
                  <Home />
                </EmailPassword.EmailPasswordAuth>
              </Route>
            )}
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
