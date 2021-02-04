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
import { useEffect, useState } from "react";

Session.addAxiosInterceptors(axios);

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl =
    process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl =
    process.env.REACT_APP_WEBSITE_URL ||
    `http://auth.example.com:${websitePort}`;
  return websiteUrl;
}

async function getRedirectionUrlForUser() {
  try {
    const subdomainRes = await axios.get(`${getApiDomain()}/user-subdomain`);
    const { subdomain } = subdomainRes.data;

    return `http://${subdomain}.example.com:3000`;
  } catch (error) {
    return getWebsiteDomain();
  }
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
      emailVerificationFeature: {
        mode: "REQUIRED",
      },
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          return getRedirectionUrlForUser(Session.getUserId());
        }
      },
    }),
    Session.init({
      sessionScope: ".example.com",
    }),
  ],
});

function App() {
  const [isUserOnValidSubdomain, setIsUserOnValidSubdomain] = useState(false);

  useEffect(() => {
    async function redirectIfOnWrongSubdomain() {
      try {
        if (Session.doesSessionExist()) {
          const currentSubdomain = window.location.hostname.split(".")[0];

          const currentUserSubdomainRes = await axios.get(
            `${getApiDomain()}/user-subdomain`
          );
          const {
            subdomain: currentUserSubdomain,
            isUserEmailVerified,
          } = currentUserSubdomainRes.data;

          if (isUserEmailVerified && window.location.origin !== getWebsiteDomain()) {
            if (currentSubdomain !== currentUserSubdomain) {
              window.location.href = `http://${currentUserSubdomain}.example.com:3000`;
            }
            setIsUserOnValidSubdomain(true);
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
                  {isUserOnValidSubdomain ? <Home /> : <Spinner />}
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

export function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

export default App;
