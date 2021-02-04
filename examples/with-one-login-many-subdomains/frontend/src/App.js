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

async function getSubdomainForUser() {
  try {
    const subdomainRes = await axios.get(`${getApiDomain()}/user-subdomain`);
    const subdomain = subdomainRes.data.subdomain;
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
        console.log(context, " ", window.location.origin);
        if (context.action === "SUCCESS") {
          return getSubdomainForUser(Session.getUserId());
        }
        if (context.action === "VERIFY_EMAIL") {
          return `${getWebsiteDomain()}/verify-email`;
        }
        if (context.action === "RESET_PASSWORD") {
          return `${getWebsiteDomain()}/reset-password`;
        }
        return getWebsiteDomain();
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
