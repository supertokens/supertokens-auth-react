/* eslint-disable @typescript-eslint/no-var-requires */
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
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
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
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        ThirdParty.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getAuthorisationURLWithQueryParamsAndSetState: async (input) => {
                            /**
                             *
                             * We override the frontendRedirectURI here because
                             * we have a custom API on the backend which will handle the callback
                             * from the provider and redirect to the electronapp via a deep link.
                             * So from the point of view of the provider, the frontend that it
                             * needs to redirect to is that custom API, which is in the API layer.
                             *
                             */
                            input = {
                                ...input,
                                frontendRedirectURI: getApiDomain() + "/auth/callback/" + input.thirdPartyId,
                            };
                            return oI.getAuthorisationURLWithQueryParamsAndSetState(input);
                        },
                    };
                },
            },
            signInAndUpFeature: {
                providers: [ThirdParty.Github.init(), ThirdParty.Google.init(), ThirdParty.Apple.init()],
            },
        }),
        Session.init(),
    ],
});

function App() {
    const [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {/* This shows the login UI on "/auth" route */}
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                ThirdPartyPreBuiltUI,
                                PasswordlessPreBuiltUI,
                            ])}

                            <Route
                                path="/"
                                element={
                                    /* This protects the "/" route so that it shows 
                                        <Home /> only if the user is logged in.
                                        Else it redirects the user to "/auth" */
                                    <SessionAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </SessionAuth>
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
