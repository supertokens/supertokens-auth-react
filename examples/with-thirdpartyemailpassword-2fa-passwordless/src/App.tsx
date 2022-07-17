import { useState, useEffect } from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdPartyEmailPassword, {
    ThirdPartyEmailPasswordAuth,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import SecondFactor from "./SecondFactor";

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
        ThirdPartyEmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            signInAndUpFeature: {
                providers: [
                    ThirdPartyEmailPassword.Github.init(),
                    ThirdPartyEmailPassword.Google.init(),
                    ThirdPartyEmailPassword.Apple.init(),
                ],
            },
            getRedirectionURL: async function (context) {
                if (context.action === "SUCCESS") {
                    let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
                    if (accessTokenPayload.phoneNumberVerified === true) {
                        // we have completed both the factors and the user is going back to /auth manually for some reason.
                        return "/";
                    }
                    // we successfully logged in via google workspaces,
                    // we must now show the user sign in with passwordless
                    return "/second-factor";
                }
            },
        }),
        Passwordless.init({
            signInUpFeature: {
                disableDefaultUI: true,
            },
            getRedirectionURL: async function (context) {
                if (context.action === "SIGN_IN_AND_UP") {
                    return "/second-factor";
                }
            },
            contactMethod: "PHONE",
            override: {
                components: {
                    PasswordlessUserInputCodeFormFooter_Override: ({ DefaultComponent, ...props }) => {
                        return null;
                    },
                    PasswordlessPhoneForm_Override: ({ DefaultComponent, ...props }) => {
                        let [showDefaultUI, setShowDefaultUI] = useState(false);
                        useEffect(() => {
                            Session.getAccessTokenPayloadSecurely()
                                .then(async (accessTokenPayload) => {
                                    let phoneNumber = accessTokenPayload.phoneNumber;
                                    if (phoneNumber !== undefined) {
                                        // This will send the user an OTP and also display the enter OTP screen.
                                        await props.recipeImplementation.createCode({
                                            phoneNumber: phoneNumber,
                                            userContext: {},
                                        });
                                    } else {
                                        setShowDefaultUI(true);
                                    }
                                })
                                .catch((err) => {
                                    // it can come here if a session doesn't exist.
                                    // in this case, the screen we will should redirect to the
                                    // first login challenge
                                    ThirdPartyEmailPassword.redirectToAuth({
                                        redirectBack: false,
                                    });
                                });
                        }, []);
                        if (showDefaultUI) {
                            return <DefaultComponent {...props} />;
                        }
                        return null;
                    },
                    PasswordlessSignInUpHeader_Override: ({ DefaultComponent, ...props }) => {
                        let [showHeader, setShowHeader] = useState(false);
                        useEffect(() => {
                            Session.getAccessTokenPayloadSecurely()
                                .then(async (accessTokenPayload) => {
                                    let phoneNumber = accessTokenPayload.phoneNumber;
                                    if (phoneNumber === undefined) {
                                        setShowHeader(true);
                                    }
                                })
                                .catch((err) => {
                                    // it can come here if a session doesn't exist.
                                    // in this case, the screen we will should redirect to the
                                    // first login challenge
                                    ThirdPartyEmailPassword.redirectToAuth({
                                        redirectBack: false,
                                    });
                                });
                        }, []);
                        if (!showHeader) {
                            return null;
                        }
                        return (
                            <>
                                <div
                                    style={{
                                        fontSize: "30px",
                                        marginBottom: "10px",
                                    }}>
                                    Second factor auth
                                </div>
                            </>
                        );
                    },
                },
            },
        }),
        Session.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        doesSessionExist: async function (input) {
                            if (!(await oI.doesSessionExist(input))) {
                                return false;
                            }
                            if (
                                window.location.pathname.startsWith("/auth") ||
                                input.userContext.forceOriginalCheck === true
                            ) {
                                return true;
                            }
                            let accessTokenPayload = await this.getAccessTokenPayloadSecurely(input);
                            if (accessTokenPayload.phoneNumberVerified !== true) {
                                // if both the factors have not been completed, we return false.
                                return false;
                            }
                            return true;
                        },
                    };
                },
            },
        }),
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
                                    <ThirdPartyEmailPasswordAuth
                                        onSessionExpired={() => {
                                            updateShowSessionExpiredPopup(true);
                                        }}>
                                        <Home />
                                        {showSessionExpiredPopup && <SessionExpiredPopup />}
                                    </ThirdPartyEmailPasswordAuth>
                                }
                            />
                            <Route
                                path="/auth"
                                element={
                                    <ThirdPartyEmailPassword.SignInAndUp
                                        userContext={{
                                            forceOriginalCheck: true,
                                        }}
                                    />
                                }
                            />
                            <Route path="/second-factor" element={<SecondFactor />} />
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </div>
        </SuperTokensWrapper>
    );
}

export default App;
