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

// We need to add interceptors to axios if the app uses it to make requests
// Whatever library you use to make requests needs to do something similar:
// add the extra header to the and process the extra header on the response
axios.interceptors.request.use(
    function (config) {
        // Check if the we need to add the cookies
        if (isApiDomain(config.url)) {
            const stCookies = localStorage.getItem("st-cookie");
            if (stCookies) {
                // Simply add the stored string into a header, it's already in the correct format.
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
        // Check if the we need to process the cookies in the response
        if (isApiDomain(res.config.url)) {
            const respCookies = res.headers["st-cookie"];

            setCookiesInLocalstorage(respCookies);
        }
        return res;
    },
    // We need to process error responses as well
    function (error) {
        // Check if the we need to process the cookies in the response
        if (isApiDomain(error.config.url)) {
            const res = error.response;
            const respCookies = res.headers["st-cookie"];

            setCookiesInLocalstorage(respCookies);
        }
        return Promise.reject(error);
    }
);

// We need to override the global fetch, because this is used internally by the SuperTokens SDK and we have no other way of getting access to response headers.
const origFetch = window.fetch;
window.fetch = async (input, init) => {
    // Check if the we need to add the cookies
    if (isApiDomain(input.url || input)) {
        if (init === undefined) {
            init = {};
        }
        if (init.headers === undefined) {
            init.headers = {};
        }

        // Simply add the stored string into a header, it's already in the correct format.
        const stCookies = localStorage.getItem("st-cookie");
        if (stCookies) {
            init.headers["st-cookie"] = stCookies;
        }
    }

    const res = await origFetch(input, init);

    // Check if the we need to process the cookies in the response
    if (isApiDomain(input.url || input)) {
        const respCookies = res.headers.get("st-cookie");

        setCookiesInLocalstorage(respCookies);
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
                // Clear all cookies if the session expired and on signout
                if (["SIGN_OUT", "UNAUTHORISED"].includes(recipeEvent.action)) {
                    localStorage.removeItem("st-cookie");
                }
            },
        }),
    ],
});

function setCookiesInLocalstorage(respCookies) {
    if (respCookies) {
        // Split and parse cookies received
        const respCookieMap = parseSetCookieString(splitCookiesString(respCookies), { decodeValues: false, map: true });

        // Check if we have anything stored already
        const localstorageCookies = localStorage.getItem("st-cookie");
        if (localstorageCookies !== null) {
            // Split and parse cookies we have in stored previously
            const splitStoredCookies = localstorageCookies.split("; ").map((cookie) => cookie.split("="));

            for (const [name, value] of splitStoredCookies) {
                // Keep old cookies if they weren't overwritten
                if (respCookieMap[name] === undefined) {
                    respCookieMap[name] = { name, value };
                }
            }
        }

        // Save the combined cookies in a the format of a Cookie header
        // Please keep in mind that these have no expiration and lack many of the things done automatically for cookies
        // Many of these features can be implemented, but they are out of scope for this example
        localStorage.setItem(
            "st-cookie",
            Object.values(respCookieMap)
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; ")
        );
    }
}

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
