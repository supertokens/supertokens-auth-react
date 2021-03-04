import './App.css';
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react"
import EmailPassword, { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";

export function getApiDomain() {
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:8082`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:3002`;
  return websiteUrl;
}


SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: window.location.hostname,
    websiteDomain: window.location.hostname,
    apiBasePath: "/.netlify/functions/api"
  },
  recipeList: [EmailPassword.init(), Session.init()]
});


function App() {
  return (
    <Router>
      <div className="App">
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route path="/">
              <EmailPasswordAuth>
                <Home />
              </EmailPasswordAuth>
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router >
  );
}

export default App;