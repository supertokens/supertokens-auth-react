import { useEffect, useState } from "react";
import { EmailVerificationClaim } from "supertokens-auth-react/recipe/emailverification";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import Session, { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import SecondFactor from "./SecondFactor";
import { SecondFactorClaim } from "./secondFactorClaim";
import { useNavigate } from "react-router-dom";

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
    getRedirectionURL: async (ctx) => {
        if (ctx.action === "TO_AUTH") {
            return "/auth?rid=thirdpartyemailpassword";
        }
    },
    recipeList: [
        EmailVerification.init({
            mode: "OPTIONAL",
        }),
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    ThirdPartyEmailPassword.Github.init(),
                    ThirdPartyEmailPassword.Google.init(),
                    ThirdPartyEmailPassword.Apple.init(),
                ],
            },
        }),
        Passwordless.init({
            signInUpFeature: {
                disableDefaultUI: true,
            },
            contactMethod: "PHONE",
            override: {
                components: {
                    PasswordlessSignInUpHeader_Override: () => {
                        return (
                            <div
                                style={{
                                    fontSize: "30px",
                                    marginBottom: "10px",
                                }}>
                                Second factor auth
                            </div>
                        );
                    },
                    // we override the component which shows the change phone number button
                    PasswordlessUserInputCodeFormFooter_Override: ({ DefaultComponent, ...props }) => {
                        const session = useSessionContext();

                        if (session.loading !== true && session.accessTokenPayload.phoneNumber === undefined) {
                            // this will show the change phone number button
                            return <DefaultComponent {...props} />;
                        }

                        // this will hide the change phone number button
                        return null;
                    },
                },
            },
        }),
        Session.init({
            override: {
                functions: (oI) => ({
                    ...oI,
                    getGlobalClaimValidators: ({ claimValidatorsAddedByOtherRecipes }) => {
                        return [SecondFactorClaim.validators.isTrue(), ...claimValidatorsAddedByOtherRecipes];
                    },
                }),
            },
        }),
    ],
});

function App() {
    let location = useLocation();

    /**
     * We give a key to SuperTokensWrapper such that it causes a recalculation of
     * the session context whenever the pathname changes in the way described below.
     *
     * This is needed because we have provided an override for doesSessionExist in which
     * the logic depends on if location.pathname.startsWith("/auth") is true or not.
     */
    let key = location.pathname.startsWith("/auth") + "";
    return (
        <SuperTokensWrapper key={key}>
            <div className="App">
                <div className="fill">
                    <Routes>
                        {/* This shows the login UI on "/auth" route */}
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/second-factor"
                            element={
                                <SessionAuth>
                                    <SecondFactor />
                                </SessionAuth>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </SuperTokensWrapper>
    );
}

function ProtectedRoute(props: any) {
    return (
        <SessionAuth>
            <ProtectedRouteHelper>{props.children}</ProtectedRouteHelper>
        </SessionAuth>
    );
}

function ProtectedRouteHelper(props: any) {
    const session = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.loading) {
            if (session.invalidClaims.find((a) => a.validatorId === SecondFactorClaim.id)) {
                navigate("/second-factor");
            } else if (session.invalidClaims.find((a) => a.validatorId === EmailVerificationClaim.id)) {
                navigate("/auth/verify-email");
            }
        }
    }, [session, navigate]);

    return props.children;
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}
