/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.css";
import React, { useState } from "react";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SessionExpiredPopup from "./SessionExpiredPopup";
import Footer from "./Footer";
import ReactDOM from "react-dom";
import Home from "./Home";

export function getApiDomain() {
    const apiPort = 3001;
    const apiUrl = `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = 3000;
    const websiteUrl = `http://localhost:${websitePort}`;
    return websiteUrl;
}

const frontendCookiesKey = "frontendCookies";

function getCookiesFromStorage(): string {
    const cookiesFromStorage = window.localStorage.getItem(frontendCookiesKey);

    if (cookiesFromStorage === null) {
        window.localStorage.setItem(frontendCookiesKey, "[]");
        return "";
    }

    // Check for expiry

    const cookieArray: string[] = JSON.parse(cookiesFromStorage);

    return cookieArray.join("; ");
}

function setCookieToStorage(cookieString: string) {
    const cookieName = cookieString.split(";")[0].split("=")[0];
    const cookiesFromStorage = window.localStorage.getItem(frontendCookiesKey);
    let cookiesArray: string[] = [];

    if (cookiesFromStorage !== null) {
        const cookiesArrayFromStorage: string[] = JSON.parse(cookiesFromStorage);
        cookiesArray = cookiesArrayFromStorage;
    }

    let cookieIndex = -1;

    for (let i = 0; i < cookiesArray.length; i++) {
        const currentCookie = cookiesArray[i];

        if (currentCookie.indexOf(`${cookieName}=`) !== -1) {
            cookieIndex = i;
            break;
        }
    }

    if (cookieIndex !== -1) {
        cookiesArray[cookieIndex] = cookieString;
    } else {
        cookiesArray.push(cookieString);
    }

    // Check for expiry

    window.localStorage.setItem(frontendCookiesKey, JSON.stringify(cookiesArray));
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    cookieHandler: () => {
        return {
            getCookie: async function () {
                const cookies = getCookiesFromStorage();
                return cookies;
            },
            getCookieSync: function () {
                const cookies = getCookiesFromStorage();
                return cookies;
            },
            setCookie: async function (cookieString: string) {
                setCookieToStorage(cookieString);
            },
            setCookieSync: function (cookieString: string) {
                setCookieToStorage(cookieString);
            },
        };
    },
    recipeList: [
        ThirdPartyPasswordless.init({
            signInUpFeature: {
                providers: [
                    ThirdPartyPasswordless.Github.init(),
                    ThirdPartyPasswordless.Google.init(),
                    ThirdPartyPasswordless.Apple.init(),
                ],
            },
            contactMethod: "EMAIL_OR_PHONE",
        }),
        Session.init(),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        {/* This shows the login UI on "/auth" route */}
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                        <Route
                            path="/"
                            element={
                                /* This protects the "/" route so that it shows 
                                <Home /> only if the user is logged in.
                                Else it redirects the user to "/auth" */
                                <ThirdPartyPasswordless.ThirdPartyPasswordlessAuth
                                    onSessionExpired={() => {
                                        updateShowSessionExpiredPopup(true);
                                    }}>
                                    <Home />
                                    {showSessionExpiredPopup && <SessionExpiredPopup />}
                                </ThirdPartyPasswordless.ThirdPartyPasswordlessAuth>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));
