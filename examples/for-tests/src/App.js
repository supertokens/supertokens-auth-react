import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

import AppWithoutRouter from "./AppWithoutRouter";
import AppWithReactDomRouter from "./AppWithReactDomRouter";
import Footer from "./Footer";
/* SuperTokens imports */
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import axios from "axios";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import Session from "supertokens-auth-react/recipe/session";
import Button from "./Button";
import DarkTheme from "./Themes/Dark";
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import { logWithPrefix } from "./logWithPrefix";

Session.addAxiosInterceptors(axios);

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 8082;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3031;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

/*
 * Use localStorage for tests configurations.
 */
if (getQueryParams("websiteBasePath")) {
    window.localStorage.setItem("websiteBasePath", getQueryParams("websiteBasePath"));
}
const websiteBasePath = window.localStorage.getItem("websiteBasePath") || undefined;

if (getQueryParams("useShadowDom")) {
    window.localStorage.setItem("useShadowDom", getQueryParams("useShadowDom") === "true");
}
const useShadowDom = window.localStorage.getItem("useShadowDom") !== "false";

if (getQueryParams("mode")) {
    window.localStorage.setItem("mode", getQueryParams("mode"));
}

const emailVerificationMode = window.localStorage.getItem("mode") || "OFF";

if (getQueryParams("authRecipe")) {
    window.localStorage.setItem("authRecipe", getQueryParams("authRecipe"));
}

const authRecipe = window.localStorage.getItem("authRecipe") || "emailpassword";

if (getQueryParams("defaultToSignUp")) {
    window.localStorage.setItem("defaultToSignUp", getQueryParams("defaultToSignUp") === "true");
}

if (getQueryParams("useReactRouterDom")) {
    window.localStorage.setItem("useReactRouterDom", getQueryParams("useReactRouterDom") === "true");
}

const defaultToSignUp = window.localStorage.getItem("defaultToSignUp") === "true";

const theme = getTheme();

function getTheme() {
    let theme = {
        colors: {},
        style: {},
    };

    const themeParams = getQueryParams("theme");

    if (themeParams === "dark") {
        window.document.body.style.backgroundColor = "#1a1a1a";
        return DarkTheme;
    }

    if (themeParams === "helium") {
        return HeliumTheme;
    }

    if (themeParams === "hydrogen") {
        return HydrogenTheme;
    }

    return theme;
}

const formFields = [
    {
        id: "email",
        label: "Your Email",
        placeholder: "Your work email",
    },
    {
        id: "name",
        label: "Full name",
        placeholder: "First name and last name",
    },
    {
        id: "age",
        label: "Your age",
        placeholder: "How old are you?",
        validate: async (value) => {
            if (parseInt(value) > 18) {
                return undefined;
            }

            return "You must be over 18 to register";
        },
    },
    {
        id: "country",
        label: "Your Country",
        placeholder: "Where do you live?",
        optional: true,
    },
];

let recipeList = [
    Session.init({
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS SESSION OVERRIDE`);

                return {
                    addAxiosInterceptors(...args) {
                        log(`ADD_AXIOS_INTERCEPTORS`);
                        return implementation.addAxiosInterceptors(...args);
                    },
                    addFetchInterceptorsAndReturnModifiedFetch(...args) {
                        log(`ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH`);
                        return implementation.addFetchInterceptorsAndReturnModifiedFetch(...args);
                    },
                    doesSessionExist(...args) {
                        log(`DOES_SESSION_EXIST`);
                        return implementation.doesSessionExist(...args);
                    },
                    getJWTPayloadSecurely(...args) {
                        log(`GET_JWT_PAYLOAD_SECURELY`);
                        return implementation.getJWTPayloadSecurely(...args);
                    },
                    getUserId(...args) {
                        log(`GET_USER_ID`);
                        return implementation.getUserId(...args);
                    },
                    signOut(...args) {
                        log(`SIGN_OUT`);
                        return implementation.signOut(...args);
                    },
                };
            },
        },
        preAPIHook: (ctx) => {
            // See https://github.com/supertokens/supertokens-auth-react/issues/267
            if (ctx.action !== "REFRESH_SESSION") {
                console.log(`ST_LOGS SESSION PRE_API_HOOKS ${ctx.action}`);
            }

            return ctx;
        },
        onHandleEvent: (ctx) => {
            console.log(`ST_LOGS SESSION ON_HANDLE_EVENT ${ctx.action}`);
        },
    }),
];

const testContext = {
    disableDefaultImplementation: getQueryParams("disableDefaultImplementation") === "true",
};

if (authRecipe === "thirdparty") {
    recipeList = [getThirdPartyConfigs(testContext), ...recipeList];
} else if (authRecipe === "emailpassword") {
    recipeList = [getEmailPasswordConfigs(testContext), ...recipeList];
} else if (authRecipe === "both") {
    recipeList = [getEmailPasswordConfigs(testContext), getThirdPartyConfigs(testContext), ...recipeList];
} else if (authRecipe === "thirdpartyemailpassword") {
    recipeList = [getThirdPartyEmailPasswordConfigs(testContext), ...recipeList];
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens",
        websiteDomain: getWebsiteDomain(),
        apiDomain: getApiDomain(),
        websiteBasePath,
    },
    recipeList,
});

let doNotUseReactRouterDom = localStorage.getItem("useReactRouterDom") === "false";

/* App */
function App() {
    const router = getQueryParams("router");
    if (router === "no-router" || doNotUseReactRouterDom) {
        return <AppWithoutRouter />;
    }

    return <AppWithReactDomRouter authRecipe={authRecipe} />;
}

function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export default App;

export function BaseComponent({ children }) {
    return (
        <Fragment>
            <div className="fill">{children}</div>
            <Footer />
        </Fragment>
    );
}

export function Home() {
    return (
        <>
            <h2>/Home</h2>
            <Button
                id="login"
                onClick={() => {
                    goToAuth();
                }}
                label="LOGIN to default"
            />
            <Button
                id="login-signin"
                onClick={() => {
                    goToAuth("signin");
                }}
                label="LOGIN with redirect to sign in"
            />
            <Button
                id="login-signup"
                onClick={() => {
                    goToAuth("signup");
                }}
                label="LOGIN with redirect to sign up"
            />
        </>
    );
}

function goToAuth(show) {
    let recipe = "emailpassword";
    let fromLocalstorage = localStorage.getItem("authRecipe");
    if (fromLocalstorage !== undefined && fromLocalstorage !== null) {
        recipe = fromLocalstorage;
    }
    if (recipe === "emailpassword") {
        EmailPassword.redirectToAuth(show);
    } else if (recipe === "thirdparty") {
        ThirdParty.redirectToAuth(show);
    } else if (recipe === "thirdpartyemailpassword") {
        ThirdPartyEmailPassword.redirectToAuth(show);
    } else {
        window.location.href = websiteBasePath || "/auth";
    }
}

export function About() {
    return <h2>/About</h2>;
}

export function Contact() {
    return <h2>/Contact</h2>;
}

export function DashboardNoAuthRequired() {
    let sessionContext = useSessionContext();

    if (sessionContext.doesSessionExist) {
        return Dashboard();
    } else {
        return <div class="not-logged-in">Not logged in</div>;
    }
}

export function Dashboard() {
    const [sessionInfoUsingAxios, setSessionInfoUsingAxios] = useState(undefined);
    const [sessionInfoUsingFetch, setSessionInfoUsingFetch] = useState(undefined);

    async function logout() {
        const useRecipe = getQueryParams("rid") || authRecipe;
        if (useRecipe === "thirdparty") {
            await ThirdParty.signOut();
        } else if (useRecipe === "thirdpartyemailpassword") {
            await ThirdPartyEmailPassword.signOut();
        } else {
            await EmailPassword.signOut();
        }
        window.location.href = "/auth";
    }

    async function fetchSessionInfoUsingAxios() {
        return (await axios.get(`${getApiDomain()}/sessionInfo`)).data;
    }

    async function fetchSessionInfoUsingFetch() {
        const res = await fetch(`${getApiDomain()}/sessionInfo`);
        return await res.json();
    }

    useEffect(() => {
        async function fetchData() {
            const sessionInfoUsingAxios = await fetchSessionInfoUsingAxios();
            setSessionInfoUsingAxios(sessionInfoUsingAxios);
            const sessionInfoUsingFetch = await fetchSessionInfoUsingFetch();
            setSessionInfoUsingFetch(sessionInfoUsingFetch);
        }
        fetchData();
    }, []);

    let sessionContext = useSessionContext();
    return (
        <div className="dashboard">
            <Button onClick={logout} label="LOGOUT" className="logoutButton" />
            <div className="axios">
                <SessionInfoTable sessionInfo={sessionInfoUsingAxios} />
            </div>
            <div className="fetch">
                <SessionInfoTable sessionInfo={sessionInfoUsingFetch} />
            </div>
            <div className="session-context-userId">session context userID: {sessionContext.userId}</div>
        </div>
    );
}

function SessionInfoTable({ sessionInfo }) {
    if (sessionInfo === undefined) {
        return <div className="sessionInfo" />;
    }
    return (
        <ul>
            <li className="sessionInfo-user-id">{sessionInfo["userId"]}</li>
            <li className="sessionInfo-session-handle">{sessionInfo["sessionHandle"]}</li>
        </ul>
    );
}

function getEmailPasswordConfigs({ disableDefaultImplementation }) {
    return EmailPassword.init({
        override: {
            functions: (implementation) => {
                return {
                    doesEmailExist(...args) {
                        console.log(`ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST`);
                        return implementation.doesEmailExist(...args);
                    },
                    sendPasswordResetEmail(...args) {
                        console.log(`ST_LOGS EMAIL_PASSWORD OVERRIDE SEND_PASSWORD_RESET_EMAIL`);
                        return implementation.sendPasswordResetEmail(...args);
                    },
                    signIn(...args) {
                        console.log(`ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_IN`);
                        return implementation.signIn(...args);
                    },
                    signUp(...args) {
                        console.log(`ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP`);
                        return implementation.signUp(...args);
                    },
                    submitNewPassword(...args) {
                        console.log(`ST_LOGS EMAIL_PASSWORD OVERRIDE SUBMIT_NEW_PASSWORD`);
                        return implementation.submitNewPassword(...args);
                    },
                };
            },
        },
        palette: theme.colors,
        preAPIHook: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT ${context.action}`);
        },
        useShadowDom,
        emailVerificationFeature: {
            disableDefaultImplementation,
            sendVerifyEmailScreen: {
                style: theme.style,
            },
            verifyEmailLinkClickedScreen: {
                style: theme.style,
            },
            mode: emailVerificationMode,
        },
        resetPasswordUsingTokenFeature: {
            disableDefaultImplementation,
            enterEmailForm: {
                style: theme.style,
            },
            submitNewPasswordForm: {
                style: theme.style,
            },
        },
        signInAndUpFeature: {
            disableDefaultImplementation,
            defaultToSignUp,
            signInForm: {
                style: theme.style,
            },
            signUpForm: {
                style: theme.style,
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
                formFields,
            },
        },
    });
}

function getThirdPartyConfigs({ disableDefaultImplementation }) {
    return ThirdParty.init({
        preAPIHook: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY ON_HANDLE_EVENT ${context.action}`);
        },
        override: {
            functions: (implementation) => ({
                getOAuthAuthorisationURL(...args) {
                    console.log(`ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_AUTHORISATION_URL`);
                    return implementation.getOAuthAuthorisationURL(...args);
                },
                getOAuthState(...args) {
                    console.log(`ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE`);
                    return implementation.getOAuthState(...args);
                },
                redirectToThirdPartyLogin(...args) {
                    console.log(`ST_LOGS THIRD_PARTY OVERRIDE REDIRECT_TO_THIRD_PARTY_LOGIN`);
                    return implementation.redirectToThirdPartyLogin(...args);
                },
                setOAuthState(...args) {
                    console.log(`ST_LOGS THIRD_PARTY OVERRIDE SET_OAUTH_STATE`);
                    return implementation.setOAuthState(...args);
                },
                signInAndUp(...args) {
                    console.log(`ST_LOGS THIRD_PARTY OVERRIDE SIGN_IN_AND_UP`);
                    return implementation.signInAndUp(...args);
                },
            }),
        },
        useShadowDom,
        palette: theme.colors,
        emailVerificationFeature: {
            disableDefaultImplementation,
            mode: emailVerificationMode,
        },
        signInAndUpFeature: {
            disableDefaultImplementation,
            style: theme.style,
            privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
            termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            providers: [
                ThirdParty.Github.init(),
                ThirdParty.Google.init(),
                ThirdParty.Facebook.init(),
                ThirdParty.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
            ],
        },
    });
}

function getThirdPartyEmailPasswordConfigs({ disableDefaultImplementation }) {
    return ThirdPartyEmailPassword.init({
        preAPIHook: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD ON_HANDLE_EVENT ${context.action}`);
        },
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE`);

                return {
                    signInAndUp(...args) {
                        log(`SIGN_IN_AND_UP`);
                        return implementation.signInAndUp(...args);
                    },
                    setOAuthState(...args) {
                        log(`SET_OAUTH_STATE`);
                        return implementation.setOAuthState(...args);
                    },
                    redirectToThirdPartyLogin(...args) {
                        log(`REDIRECT_TO_THIRD_PARTY_LOGIN`);
                        return implementation.redirectToThirdPartyLogin(...args);
                    },
                    getOAuthState(...args) {
                        log(`GET_OAUTH_STATE`);
                        return implementation.getOAuthState(...args);
                    },
                    getOAuthAuthorisationURL(...args) {
                        log(`GET_OAUTH_AUTHORISATION_URL`);
                        return implementation.getOAuthAuthorisationURL(...args);
                    },
                    submitNewPassword(...args) {
                        log(`SUBMIT_NEW_PASSWORD`);
                        return implementation.submitNewPassword(...args);
                    },
                    sendPasswordResetEmail(...args) {
                        log(`SEND_PASSWORD_RESET_EMAIL`);
                        return implementation.sendPasswordResetEmail(...args);
                    },
                    doesEmailExist(...args) {
                        log(`DOES_EMAIL_EXIST`);
                        return implementation.doesEmailExist(...args);
                    },
                };
            },
        },
        useShadowDom,
        palette: theme.colors,
        emailVerificationFeature: {
            disableDefaultImplementation,
            mode: emailVerificationMode,
        },
        resetPasswordUsingTokenFeature: {
            disableDefaultImplementation,
        },
        signInAndUpFeature: {
            disableDefaultImplementation,
            signInForm: {},
            signUpForm: {
                formFields,
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            },
            style: theme.style,
            providers: [
                ThirdPartyEmailPassword.Github.init(),
                ThirdPartyEmailPassword.Google.init(),
                ThirdPartyEmailPassword.Facebook.init(),
                ThirdPartyEmailPassword.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
            ],
        },
        disableEmailPassword: false,
    });
}
