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
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SessionExpiredPopup from "./SessionExpiredPopup";
import Footer from "./Footer";
import ReactDOM from "react-dom";
import Home from "./Home";
import getCookieHandler from "./cookieHandler";
import getWindowHandler from "./windowHandler";

export function getApiDomain() {
    const apiPort = 3001;
    const apiUrl = `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    /**
     * In production mode, Electron uses file protocol. Supertokens
     * does not currently support file protocol URLs for websiteDomain
     * but using localhost does not cause any problems
     */
    const websitePort = 3000;
    const websiteUrl = `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    /**
     * Electron handles cookies and Window API calls differently. We use custom handlers
     * here to make sure SuperTokens can access the information correctly
     */
    cookieHandler: getCookieHandler, // Refer to src/cookieHandler.ts
    windowHandler: getWindowHandler, // Refer to src/windowHandler.ts
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
        <SuperTokensWrapper>
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
        </SuperTokensWrapper>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));
