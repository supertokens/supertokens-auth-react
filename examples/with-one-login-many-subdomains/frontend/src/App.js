import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Multitenancy, { AllowedDomainsClaim } from "supertokens-auth-react/recipe/multitenancy";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import { clearTenantId, getApiDomain, getAuthDomain, getWebsiteBasePath } from "./utils";
import { AuthPage } from "./AuthPage";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
        websiteBasePath: getWebsiteBasePath(),
    },
    getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
            // redirect users to their associated subdomain e.g abc.example.com for user abc
            const claimValue = await Session.getClaimValue({ claim: AllowedDomainsClaim });
            return "http://" + claimValue[0] + ":3000";
        }
    },
    usesDynamicLoginMethods: true,
    recipeList: [
        EmailVerification.init({
            mode: "REQUIRED",
        }),
        Multitenancy.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getTenantId: () => localStorage.getItem("tenantId") ?? undefined,
                }),
            },
        }),
        ThirdParty.init(),
        EmailPassword.init(),
        Passwordless.init({
            contactMethod: "EMAIL",
        }),
        Session.init({
            sessionTokenFrontendDomain: ".example.com",
            onHandleEvent: (event) => {
                if (["SIGN_OUT", "UNAUTHORISED", "SESSION_CREATED"].includes(event.action)) {
                    clearTenantId();
                }
            },
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => [
                        ...claimValidatorsAddedByOtherRecipes,
                        {
                            ...AllowedDomainsClaim.validators.hasAccessToCurrentDomain(),
                            onFailureRedirection: async () => {
                                let claimValue = await Session.getClaimValue({
                                    claim: AllowedDomainsClaim,
                                });
                                return "http://" + claimValue[0] + ":3000";
                            },
                        },
                    ],
                }),
            },
        }),
    ],
});

function App() {
    return (
        <SuperTokensWrapper>
            <div className="App">
                <Router>
                    <div className="fill">
                        <Routes>
                            {window.location.origin === getAuthDomain() ? (
                                <Route path={`${getWebsiteBasePath()}/*`} element={<AuthPage />} />
                            ) : (
                                <Route
                                    path="/"
                                    element={
                                        <SessionAuth>
                                            <Home />
                                        </SessionAuth>
                                    }
                                />
                            )}
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
