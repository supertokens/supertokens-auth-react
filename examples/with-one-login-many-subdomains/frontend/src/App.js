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

Session.addAxiosInterceptors(axios);

const apiPort = process.env.REACT_APP_API_PORT || 3001;
const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;

export function getApiDomain() {
  const apiUrl =
    process.env.REACT_APP_API_URL || `http://example.com:${apiPort}`;
  return apiUrl;
}

export function getAuthDomain() {
  const websiteUrl =
    process.env.REACT_APP_WEBSITE_URL ||
    `http://auth.example.com:${websitePort}`;
  return websiteUrl;
}

async function getRedirectionUrlForUser() {
  try {
    const subdomainRes = await axios.get(`${getApiDomain()}/user-subdomain`);
    const { subdomain } = subdomainRes.data;

    return `http://${subdomain}.example.com:${websitePort}`;
  } catch (error) {
    return getAuthDomain();
  }
}

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
          } = currentUserSubdomainRes.data;

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

export function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

export default App;
