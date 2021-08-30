import { useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";

import axios from "axios";
import { splitCookiesString, parse as parseSetCookieString } from "set-cookie-parser";

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

function isApiDomain(str) {
    return str.startsWith(getApiDomain());
}

axios.interceptors.request.use(
    function (config) {
        if (isApiDomain(config.url)) {
            const stCookies = localStorage.getItem("st-cookie");
            if (stCookies) {
                config.headers["st-cookie"] = stCookies;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (res) {
        if (isApiDomain(res.config.url)) {
            const respCookies = res.headers["st-cookie"];

            if (respCookies) {
                localStorage.setItem("st-cookie", respCookies);
            }
        }
        return res;
    },
    function (error) {
        if (isApiDomain(error.config.url)) {
            const res = error.response;
            const respCookies = res.headers["st-cookie"];

            if (respCookies) {
                localStorage.setItem("st-cookie", respCookies);
            }
        }
        return Promise.reject(error);
    }
);

const origFetch = window.fetch;
window.fetch = async (input, init) => {
    if (isApiDomain(input.url || input)) {
        if (init === undefined) {
            init = {};
        }
        if (init.headers === undefined) {
            init.headers = {};
        }

        const stCookies = localStorage.getItem("st-cookie");
        if (stCookies) {
            init.headers["st-cookie"] = stCookies;
        }
    }

    const res = await origFetch(input, init);

    if (isApiDomain(input.url || input)) {
        const respCookies = res.headers.get("st-cookie");

        if (respCookies) {
            const splitCookies = parseSetCookieString(splitCookiesString(respCookies), { decodeValues: false });
            localStorage.setItem("st-cookie", splitCookies.map((c) => `${c.name}=${c.value}`).join("; "));
        }
    }
    return res;
};

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init({
            onHandleEvent: (recipeEvent) => {
                if (["SIGN_OUT", "UNAUTHORISED"].includes(recipeEvent.action)) {
                    localStorage.removeItem("st-cookie");
                }
            },
        }),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route path="/">
                            <EmailPassword.EmailPasswordAuth
                                onSessionExpired={() => {
                                    updateShowSessionExpiredPopup(true);
                                }}>
                                <Home />
                                {showSessionExpiredPopup && <SessionExpiredPopup />}
                            </EmailPassword.EmailPasswordAuth>
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
