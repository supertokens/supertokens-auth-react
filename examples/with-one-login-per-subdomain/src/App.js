import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Multitenancy, { AllowedDomainsClaim } from "supertokens-auth-react/recipe/multitenancy";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import Session, { SessionAuth, getClaimValue } from "supertokens-auth-react/recipe/session";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import { getApiDomain, getAuthDomain } from "./utils";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getAuthDomain(),
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
                    getTenantId: () => window.location.hostname.split(".")[0],
                }),
            },
        }),
        ThirdPartyEmailPassword.init(),
        ThirdPartyPasswordless.init({
            contactMethod: "EMAIL",
        }),
        Session.init({
            sessionTokenFrontendDomain: ".example.com:3000",
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => [
                        ...claimValidatorsAddedByOtherRecipes,
                        {
                            ...AllowedDomainsClaim.validators.hasAccessToCurrentDomain(),
                            onFailureRedirection: async () => {
                                let claimValue = await getClaimValue({
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
        <Router>
            <div className="App">
                <SuperTokensWrapper>
                    <div className="fill">
                        <Routes>
                            {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                ThirdPartyEmailPasswordPreBuiltUI,
                                ThirdPartyPasswordlessPreBuiltUI,
                                EmailVerificationPreBuiltUI,
                            ])}
                            <Route
                                path="/"
                                element={
                                    <SessionAuth>
                                        <Home />
                                    </SessionAuth>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </SuperTokensWrapper>
            </div>
        </Router>
    );
}

export default App;
