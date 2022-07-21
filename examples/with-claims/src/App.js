import { useCallback, useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import { RolesClaim } from "./claims/rolesClaim";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { api, TestContextProvider, useTestLogger } from "./test.context";
import { TestScreen } from "./routes/testScreen.component";
import { MFAClaim } from "./claims/mfaClaim";

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

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        EmailVerification.init({ mode: "REQUIRED" }),
        EmailPassword.init({
            onHandleEvent: (ev) => {
                api.addLogItem("EP Event: " + JSON.stringify(ev));
            },
        }),
        Session.init({
            onHandleEvent: (ev) => {
                api.addLogItem("Session Event: " + JSON.stringify(ev));
            },
        }),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <ThemeProvider theme={{}}>
                <CssBaseline />
                <TestContextProvider>
                    <Router>
                        <AppRoutes
                            updateShowSessionExpiredPopup={updateShowSessionExpiredPopup}
                            showSessionExpiredPopup={showSessionExpiredPopup}
                        />
                        <Footer />
                    </Router>
                </TestContextProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
function AppRoutes({ updateShowSessionExpiredPopup, showSessionExpiredPopup }) {
    // These have to be memoized in this test, because:
    // 1. the refresh of a claim calls an api
    // 2. the api call adds a log
    // 3. adding the log rerenders this component
    // 4. the rerender changes the references of the claims which causes the checking to restart
    // 5. since the check (and the refresh) didn't complete the first time, it calls refresh again...
    // This is not normally the case, the claim refreshing shouldn't rerender the auth component,
    // it's just a weird test setup because of logging.
    const route1ClaimOverride = useCallback(
        (globalClaims) => [...globalClaims, RolesClaim.hasRole.includes("admin"), MFAClaim.completed2FA()],
        []
    );

    return (
        <div className="fill">
            <Routes>
                {/* This shows the login UI on "/auth" route */}
                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                <Route
                    path="/route1"
                    element={
                        <SessionAuth
                            key="/route1"
                            requireAuth={true}
                            onSessionExpired={() => {
                                updateShowSessionExpiredPopup(true);
                            }}
                            overrideGlobalClaimValidators={route1ClaimOverride}>
                            <TestScreen title="Route1" subTitle={"Required: Role(admin), Email.isVerified"} />
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </SessionAuth>
                    }
                />
                <Route
                    path="/route2"
                    element={
                        <SessionAuth
                            key="/route2"
                            requireAuth={true}
                            onSessionExpired={() => {
                                updateShowSessionExpiredPopup(true);
                            }}>
                            <TestScreen title="Route2" subTitle={"Required: Email.isVerified"} />
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </SessionAuth>
                    }
                />
                <Route
                    path="/"
                    element={
                        /* This protects the "/" route so that it shows
            <Home /> only if the user is logged in.
            Else it redirects the user to "/auth" */
                        <SessionAuth key="/" requireAuth={true} overrideGlobalClaimValidators={() => []}>
                            <TestScreen title="Home" subTitle={"No claims required"} />
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </SessionAuth>
                    }
                />
            </Routes>
        </div>
    );
}
