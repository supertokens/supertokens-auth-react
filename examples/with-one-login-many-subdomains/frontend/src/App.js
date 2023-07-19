import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/emailpassword";
import MultiTenancy, { AllowedDomainsClaim } from "supertokens-auth-react/recipe/multitenancy";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import { getApiDomain, getAuthDomain, getRedirectionUrlForUser } from "./utils";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
        websiteBasePath: "/",
    },
    recipeList: [
        MultiTenancy.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getTenantId: () => localStorage.getItem("tenantId") ?? undefined,
                }),
            },
        }),
        ThirdPartyEmailPassword.init({
            getRedirectionURL: async (context) => {
                if (context.action === "SUCCESS") {
                    // redirect users to their associated subdomain e.g abc.example.com for user abc
                    const claimValue = await Session.getClaimValue(AllowedDomainsClaim);
                    return "http://" + claimValue[0];
                }
            },
        }),
        Session.init({
            sessionTokenFrontendDomain: ".example.com",
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
                                return "http://" + claimValue[0];
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
                            {/* Present users with login/signup when they are on auth.example.com. 
                                If not try rendering our protected route. In case the user is unauthenticated 
                                the auth wrapper will simply redirect them to the login page */}
                            {window.location.origin === getAuthDomain() ? (
                                getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                    EmailPasswordPreBuiltUI,
                                ])
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
