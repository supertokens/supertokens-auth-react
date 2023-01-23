import React, { useEffect, useState } from "react";
import "./App.css";

import AppWithoutRouter from "./AppWithoutRouter";
import AppWithReactDomRouter from "./AppWithReactDomRouter";
import AppWithReactDomRouterV5 from "./AppWithReactDomRouterV5";
import Footer from "./Footer";
/* SuperTokens imports */
import SuperTokens from "supertokens-auth-react";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import UserRoles from "supertokens-auth-react/recipe/userroles";

import axios from "axios";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import Session from "supertokens-auth-react/recipe/session";
import Button from "./Button";
import DarkTheme from "./Themes/Dark";
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import { logWithPrefix } from "./logWithPrefix";
import { ErrorBoundary } from "./ErrorBoundary";
let { useNavigate } = require("react-router-dom");
let withRouter = undefined;
const loadv5RRD = window.localStorage.getItem("react-router-dom-is-v5") === "true";
if (loadv5RRD) {
    withRouter = require("react-router-domv5").withRouter;
}

if (withRouter === undefined) {
    withRouter = function (Child) {
        return (props) => {
            const navigate = useNavigate();
            // we make navigate to history because we use history in the code everywhere.
            return <Child {...props} history={navigate} />;
        };
    };
}

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

if (getQueryParams("passwordlessContactMethodType")) {
    window.localStorage.setItem("passwordlessContactMethodType", getQueryParams("passwordlessContactMethodType"));
}

const passwordlessContactMethodType = window.localStorage.getItem("passwordlessContactMethodType") || "EMAIL_OR_PHONE";

if (getQueryParams("passwordlessDefaultCountry")) {
    window.localStorage.setItem("passwordlessDefaultCountry", getQueryParams("passwordlessDefaultCountry"));
}

const passwordlessDefaultCountry = window.localStorage.getItem("passwordlessDefaultCountry") || undefined;

if (getQueryParams("passwordlessDisablePhoneGuess")) {
    window.localStorage.setItem("passwordlessDisablePhoneGuess", getQueryParams("passwordlessDisablePhoneGuess"));
}

const passwordlessDisablePhoneGuess = window.localStorage.getItem("passwordlessDisablePhoneGuess") || undefined;

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

const doNotUseReactRouterDom =
    localStorage.getItem("useReactRouterDom") === "false" || getQueryParams("router") === "no-router";

const themeQueryParams = getQueryParams("theme");
if (themeQueryParams !== null) {
    window.localStorage.setItem("useTheme", themeQueryParams);
}

const theme = getTheme();

function getTheme() {
    let theme = {
        colors: {},
    };

    const themeParams = window.localStorage.getItem("useTheme");

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
                    ...implementation,
                    addAxiosInterceptors(...args) {
                        log(`ADD_AXIOS_INTERCEPTORS`);
                        return implementation.addAxiosInterceptors(...args);
                    },
                    addFetchInterceptorsAndReturnModifiedFetch(...args) {
                        log(`ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH`);
                        return implementation.addFetchInterceptorsAndReturnModifiedFetch(...args);
                    },
                    doesSessionExist(...args) {
                        // we do not log here cause then supertokens-website repo
                        // will call that log unpredictably.
                        return implementation.doesSessionExist(...args);
                    },
                    getAccessTokenPayloadSecurely(...args) {
                        log(`GET_JWT_PAYLOAD_SECURELY`);
                        return implementation.getAccessTokenPayloadSecurely(...args);
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
    disableDefaultUI: getQueryParams("disableDefaultUI") === "true",
    thirdPartyRedirectURL: localStorage.getItem("thirdPartyRedirectURL"),
};

if (authRecipe === "thirdparty") {
    recipeList = [getThirdPartyConfigs(testContext), ...recipeList];
} else if (authRecipe === "emailpassword") {
    recipeList = [getEmailPasswordConfigs(testContext), ...recipeList];
} else if (authRecipe === "both") {
    recipeList = [getEmailPasswordConfigs(testContext), getThirdPartyConfigs(testContext), ...recipeList];
} else if (authRecipe === "thirdpartyemailpassword") {
    recipeList = [getThirdPartyEmailPasswordConfigs(testContext), ...recipeList];
} else if (authRecipe === "passwordless") {
    recipeList = [getPasswordlessConfigs(testContext), ...recipeList];
} else if (authRecipe === "thirdpartypasswordless") {
    recipeList = [getThirdPartyPasswordlessConfigs(testContext), ...recipeList];
}

if (emailVerificationMode !== "OFF") {
    recipeList.push(getEmailVerificationConfigs(testContext));
}
SuperTokens.init({
    appInfo: {
        appName: "SuperTokens",
        websiteDomain: getWebsiteDomain(),
        apiDomain: getApiDomain(),
        websiteBasePath,
    },
    languageTranslations: {
        translations: {
            en: {
                PWLESS_SIGN_IN_UP_FOOTER_TOS: "TOS",
            },
            hu: {
                PWLESS_SIGN_IN_UP_FOOTER_TOS: "ÁSZF",
            },
        },
    },
    getRedirectionURL: (context) => {
        console.log(`ST_LOGS SUPERTOKENS GET_REDIRECTION_URL ${context.action}`);
    },
    recipeList,
});

/* App */
function App() {
    useEffect(() => {
        window.addEventListener("TPEP.getAuthorisationURLWithQueryParamsAndSetState", async () => {
            ThirdPartyEmailPassword.getAuthorisationURLWithQueryParamsAndSetState({
                providerId: "google",
                authorisationURL: "",
                userContext: {
                    isPreAPITest: true,
                },
            });
        });
    }, []);

    if (doNotUseReactRouterDom) {
        return (
            <ErrorBoundary>
                <AppWithoutRouter />
            </ErrorBoundary>
        );
    }

    if (loadv5RRD) {
        return (
            <ErrorBoundary>
                <AppWithReactDomRouterV5 authRecipe={authRecipe} />
            </ErrorBoundary>
        );
    } else {
        return (
            <ErrorBoundary>
                <AppWithReactDomRouter authRecipe={authRecipe} />
            </ErrorBoundary>
        );
    }
}

function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export default App;

export function BaseComponent({ children }) {
    return (
        <>
            <div className="fill">{children}</div>
            <Footer />
        </>
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
    SuperTokens.redirectToAuth({ show, queryParams: { rid: recipe }, redirectBack: false });
}

export function About() {
    return <h2>/About</h2>;
}

export function Contact() {
    return <h2>/Contact</h2>;
}

export const DashboardNoAuthRequired = doNotUseReactRouterDom
    ? DashboardNoAuthRequiredHelper
    : withRouter(DashboardNoAuthRequiredHelper);

export function DashboardNoAuthRequiredHelper(props) {
    let sessionContext = useSessionContext();

    if (sessionContext.loading) {
        return null;
    }

    if (sessionContext.doesSessionExist) {
        return Dashboard({ redirectOnLogout: false, ...props });
    } else {
        return <div className="not-logged-in">Not logged in</div>;
    }
}

export const Dashboard = doNotUseReactRouterDom ? DashboardHelper : withRouter(DashboardHelper);

export function DashboardHelper({ redirectOnLogout, ...props } = {}) {
    if (redirectOnLogout === undefined) {
        redirectOnLogout = true;
    }
    const [sessionInfoUsingAxios, setSessionInfoUsingAxios] = useState(undefined);
    const [sessionInfoUsingFetch, setSessionInfoUsingFetch] = useState(undefined);

    async function logout() {
        const useRecipe = getQueryParams("rid") || authRecipe;
        if (useRecipe === "thirdparty") {
            await ThirdParty.signOut();
        } else if (useRecipe === "thirdpartyemailpassword") {
            await ThirdPartyEmailPassword.signOut();
        } else if (useRecipe === "passwordless") {
            await Passwordless.signOut();
        } else if (useRecipe === "thirdpartypasswordless") {
            await ThirdPartyPasswordless.signOut();
        } else {
            await EmailPassword.signOut();
        }
        if (redirectOnLogout) {
            if (props.history === undefined) {
                window.location.href = "/auth";
            } else {
                if (props.history.push !== undefined) {
                    props.history.push("/auth");
                } else {
                    props.history("/auth");
                }
            }
        }
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

    if (sessionContext.loading === true) {
        // You could display a loading screen here, but session context loading is very fast
        // so returning null is better in most cases to avoid content popping in and out
        return null;
    }

    return (
        <div className="dashboard">
            <div
                onClick={logout}
                className="logoutButton"
                style={{
                    height: "50px",
                    width: "200px",
                    background: "#000000",
                    color: "#ffffff",
                    cursor: "pointer",
                }}>
                logout
            </div>
            <div className="axios">
                <SessionInfoTable sessionInfo={sessionInfoUsingAxios} />
            </div>
            <div className="fetch">
                <SessionInfoTable sessionInfo={sessionInfoUsingFetch} />
            </div>
            <div className="session-context-userId">session context userID: {sessionContext.userId}</div>
            <pre className="invalidClaims">{JSON.stringify(sessionContext.invalidClaims, undefined, 2)}</pre>
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

function getEmailVerificationConfigs({ disableDefaultUI }) {
    return EmailVerification.init({
        disableDefaultUI,
        sendVerifyEmailScreen: {
            style: theme,
        },
        verifyEmailLinkClickedScreen: {
            style: theme,
        },
        mode: emailVerificationMode,
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS EMAIL_VERIFICATION GET_REDIRECTION_URL ${context.action}`);
        },
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS EMAIL_VERIFICATION OVERRIDE`);

                return {
                    ...implementation,
                    sendVerificationEmail(...args) {
                        log(`SEND_VERIFICATION_EMAIL`);
                        return implementation.sendVerificationEmail(...args);
                    },
                    isEmailVerified(...args) {
                        log(`IS_EMAIL_VERIFIED`);
                        return implementation.isEmailVerified(...args);
                    },
                    verifyEmail(...args) {
                        log(`VERIFY_EMAIL`);
                        return implementation.verifyEmail(...args);
                    },
                };
            },
        },
        preAPIHook: async (context) => {
            if (localStorage.getItem(`SHOW_GENERAL_ERROR`) === `EMAIL_VERIFICATION ${context.action}`) {
                let errorFromStorage = localStorage.getItem("TRANSLATED_GENERAL_ERROR");

                let jsonBody = JSON.parse(context.requestInit.body);
                jsonBody = {
                    ...jsonBody,
                    generalError: true,
                    generalErrorMessage: errorFromStorage === null ? undefined : errorFromStorage,
                };
                context.requestInit.body = JSON.stringify(jsonBody);
            }
            console.log(`ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS ${context.action}`);
            return context;
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT ${context.action}`);
        },
    });
}

function getEmailPasswordConfigs({ disableDefaultUI }) {
    return EmailPassword.init({
        style: `
            [data-supertokens~=container] {
                font-family: cursive;
            }
        `,
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS EMAIL_PASSWORD OVERRIDE`);

                return {
                    ...implementation,
                    doesEmailExist(...args) {
                        log(`DOES_EMAIL_EXIST`);
                        return implementation.doesEmailExist(...args);
                    },
                    sendPasswordResetEmail(...args) {
                        log(`SEND_PASSWORD_RESET_EMAIL`);
                        return implementation.sendPasswordResetEmail(...args);
                    },
                    signIn(...args) {
                        log(`SIGN_IN`);
                        return implementation.signIn(...args);
                    },
                    signUp(...args) {
                        log(`SIGN_UP`);
                        return implementation.signUp(...args);
                    },
                    submitNewPassword(...args) {
                        log(`SUBMIT_NEW_PASSWORD`);
                        return implementation.submitNewPassword(...args);
                    },
                };
            },
        },
        preAPIHook: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                setIsNewUserToStorage("emailpassword", context.isNewUser);
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT ${context.action}`);
        },
        useShadowDom,
        resetPasswordUsingTokenFeature: {
            disableDefaultUI,
            enterEmailForm: {
                style: theme.style,
            },
            submitNewPasswordForm: {
                style: theme.style,
            },
        },
        signInAndUpFeature: {
            disableDefaultUI,
            defaultToSignUp,
            signInForm: {
                style: theme.style,
            },
            signUpForm: {
                style: theme.style,
                privacyPolicyLink: "https://supertokens.com/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.com/legal/terms-and-conditions",
                formFields,
            },
        },
    });
}

function getThirdPartyPasswordlessConfigs({ disableDefaultUI, thirdPartyRedirectURL }) {
    return ThirdPartyPasswordless.init({
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE`);

                return {
                    ...implementation,
                    doesPasswordlessUserEmailExist(...args) {
                        log(`DOES_PASSWORDLESS_USER_EMAIL_EXIST`);
                        return implementation.doesPasswordlessUserEmailExist(...args);
                    },
                    doesPasswordlessUserPhoneNumberExist(...args) {
                        log(`DOES_PASSWORDLESS_USER_PHONE_NUMBER_EXIST`);
                        return implementation.doesPasswordlessUserPhoneNumberExist(...args);
                    },
                    createPasswordlessCode(...args) {
                        log(`CREATE_CODE`);
                        return implementation.createPasswordlessCode(...args);
                    },
                    resendPasswordlessCode(...args) {
                        log(`RESEND_CODE`);
                        return implementation.resendPasswordlessCode(...args);
                    },
                    consumePasswordlessCode(...args) {
                        log(`CONSUME_CODE`);
                        return implementation.consumePasswordlessCode(...args);
                    },
                    getPasswordlessLoginAttemptInfo(...args) {
                        log(`GET_LOGIN_ATTEMPT_INFO`);
                        return implementation.getPasswordlessLoginAttemptInfo(...args);
                    },
                    setPasswordlessLoginAttemptInfo(...args) {
                        log(`SET_LOGIN_ATTEMPT_INFO`);
                        return implementation.setPasswordlessLoginAttemptInfo(...args);
                    },
                    clearPasswordlessLoginAttemptInfo(...args) {
                        log(`CLEAR_LOGIN_ATTEMPT_INFO`);
                        return implementation.clearPasswordlessLoginAttemptInfo(...args);
                    },
                    getAuthorisationURLFromBackend(...args) {
                        log(`GET_OAUTH_AUTHORISATION_URL`);
                        return implementation.getAuthorisationURLFromBackend(...args);
                    },
                    getThirdPartyStateAndOtherInfoFromStorage(...args) {
                        log(`GET_OAUTH_STATE`);
                        return implementation.getThirdPartyStateAndOtherInfoFromStorage(...args);
                    },
                    getThirdPartyAuthorisationURLWithQueryParamsAndSetState(...args) {
                        log(`GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE`);
                        return implementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(...args);
                    },
                    setThirdPartyStateAndOtherInfoToStorage(...args) {
                        log(`SET_OAUTH_STATE`);
                        return implementation.setThirdPartyStateAndOtherInfoToStorage(...args);
                    },
                    thirdPartySignInAndUp(...args) {
                        log(`THIRD_PARTY_SIGN_IN_AND_UP`);
                        return implementation.thirdPartySignInAndUp(...args);
                    },
                };
            },
        },
        preAPIHook: async (context) => {
            console.log(`ST_LOGS THIRDPARTYPASSWORDLESS PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS THIRDPARTYPASSWORDLESS GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                setIsNewUserToStorage("thirdpartypasswordless", context.isNewUser);
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS THIRDPARTYPASSWORDLESS ON_HANDLE_EVENT ${context.action}`);
        },
        useShadowDom,
        contactMethod: passwordlessContactMethodType,
        disablePasswordless: false,
        signInUpFeature: {
            disableDefaultUI,
            style: theme.style,
            thirdPartyProviderAndEmailOrPhoneFormStyle: `
                [data-supertokens~=providerCustom] {
                    color: red;
                },
            `,
            privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
            termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            providers: [
                ThirdPartyEmailPassword.Github.init(),
                ThirdPartyEmailPassword.Google.init(),
                ThirdPartyEmailPassword.Facebook.init(),
                ThirdPartyEmailPassword.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
                {
                    id: "auth0",
                    name: "Auth0",
                    getRedirectURL: thirdPartyRedirectURL !== null ? () => thirdPartyRedirectURL : undefined,
                },
            ],
            defaultCountry: passwordlessDefaultCountry,
            resendEmailOrSMSGapInSeconds: 2,
            guessInternationPhoneNumberFromInputPhoneNumber: passwordlessDisablePhoneGuess
                ? () => undefined
                : undefined,
        },
        linkClickedScreenFeature: {
            disableDefaultUI,
            style: theme.style,
        },
    });
}

function getPasswordlessConfigs({ disableDefaultUI }) {
    return Passwordless.init({
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS PASSWORDLESS OVERRIDE`);

                return {
                    ...implementation,
                    doesEmailExist(...args) {
                        log(`DOES_EMAIL_EXIST`);
                        return implementation.doesEmailExist(...args);
                    },
                    doesPhoneNumberExist(...args) {
                        log(`DOES_PHONE_NUMBER_EXIST`);
                        return implementation.doesPhoneNumberExist(...args);
                    },
                    createCode(...args) {
                        log(`CREATE_CODE`);
                        return implementation.createCode(...args);
                    },
                    resendCode(...args) {
                        log(`RESEND_CODE`);
                        return implementation.resendCode(...args);
                    },
                    consumeCode(...args) {
                        log(`CONSUME_CODE`);
                        return implementation.consumeCode(...args);
                    },
                    getLoginAttemptInfo(...args) {
                        log(`GET_LOGIN_ATTEMPT_INFO`);
                        return implementation.getLoginAttemptInfo(...args);
                    },
                    setLoginAttemptInfo(...args) {
                        log(`SET_LOGIN_ATTEMPT_INFO`);
                        return implementation.setLoginAttemptInfo(...args);
                    },
                    clearLoginAttemptInfo(...args) {
                        log(`CLEAR_LOGIN_ATTEMPT_INFO`);
                        return implementation.clearLoginAttemptInfo(...args);
                    },
                };
            },
        },
        preAPIHook: async (context) => {
            console.log(`ST_LOGS PASSWORDLESS PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS PASSWORDLESS GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                setIsNewUserToStorage("passwordless", context.isNewUser);
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS PASSWORDLESS ON_HANDLE_EVENT ${context.action}`);
        },
        useShadowDom,
        contactMethod: passwordlessContactMethodType,
        signInUpFeature: {
            defaultCountry: passwordlessDefaultCountry,
            guessInternationPhoneNumberFromInputPhoneNumber: passwordlessDisablePhoneGuess
                ? () => undefined
                : undefined,
            resendEmailOrSMSGapInSeconds: 2,
            disableDefaultUI,
            style: theme.style,

            privacyPolicyLink: "https://supertokens.com/legal/privacy-policy",
            termsOfServiceLink: "https://supertokens.com/legal/terms-and-conditions",
        },
        linkClickedScreenFeature: {
            disableDefaultUI,
            style: theme.style,
        },
    });
}

function getThirdPartyConfigs({ disableDefaultUI, thirdPartyRedirectURL }) {
    return ThirdParty.init({
        style: `
            [data-supertokens~=container] {
                font-family: cursive;
            }
        `,

        preAPIHook: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                setIsNewUserToStorage("thirdparty", context.isNewUser);
                return context.redirectToPath || "/dashboard";
            }
        },
        onHandleEvent: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY ON_HANDLE_EVENT ${context.action}`);
        },
        override: {
            functions: (implementation) => {
                const log = logWithPrefix(`ST_LOGS THIRD_PARTY OVERRIDE`);

                return {
                    ...implementation,
                    getAuthorisationURLWithQueryParamsAndSetState(...args) {
                        log(`GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE`);
                        return implementation.getAuthorisationURLWithQueryParamsAndSetState(...args);
                    },
                    getAuthorisationURLFromBackend(...args) {
                        log(`GET_OAUTH_AUTHORISATION_URL`);
                        return implementation.getAuthorisationURLFromBackend(...args);
                    },
                    getStateAndOtherInfoFromStorage(...args) {
                        log(`GET_OAUTH_STATE`);
                        return implementation.getStateAndOtherInfoFromStorage(...args);
                    },
                    setStateAndOtherInfoToStorage(...args) {
                        log(`SET_OAUTH_STATE`);
                        return implementation.setStateAndOtherInfoToStorage(...args);
                    },
                    signInAndUp(...args) {
                        log(`SIGN_IN_AND_UP`);
                        return implementation.signInAndUp(...args);
                    },
                };
            },
        },
        useShadowDom,
        signInAndUpFeature: {
            disableDefaultUI,
            style: theme.style,
            privacyPolicyLink: "https://supertokens.com/legal/privacy-policy",
            termsOfServiceLink: "https://supertokens.com/legal/terms-and-conditions",
            providers: [
                ThirdParty.Github.init(),
                ThirdParty.Google.init(),
                ThirdParty.Facebook.init(),
                ThirdParty.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                },
                {
                    id: "auth0",
                    name: "Auth0",
                    getRedirectURL: thirdPartyRedirectURL !== null ? () => thirdPartyRedirectURL : undefined,
                },
            ],
        },

        oAuthCallbackScreen: {
            style: theme.style,
        },
    });
}

function getThirdPartyEmailPasswordConfigs({ disableDefaultUI, thirdPartyRedirectURL }) {
    return ThirdPartyEmailPassword.init({
        preAPIHook: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS ${context.action}`);
            return context;
        },
        getRedirectionURL: async (context) => {
            console.log(`ST_LOGS THIRD_PARTY_EMAIL_PASSWORD GET_REDIRECTION_URL ${context.action}`);
            if (context.action === "SUCCESS") {
                setIsNewUserToStorage("thirdpartyemailpassword", context.isNewUser);
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
                    ...implementation,
                    getAuthorisationURLWithQueryParamsAndSetState(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE RECEIVED_USER_CONTEXT`);
                        }

                        log(`GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE`);
                        return implementation.getAuthorisationURLWithQueryParamsAndSetState(input);
                    },
                    generateStateToSendToOAuthProvider(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GENERATE_STATE RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.generateStateToSendToOAuthProvider(input);
                    },
                    thirdPartySignInAndUp(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`SIGN_IN_AND_UP RECEIVED_USER_CONTEXT`);
                        }

                        log(`SIGN_IN_AND_UP`);
                        return implementation.thirdPartySignInAndUp(input);
                    },
                    emailPasswordSignIn(...args) {
                        log(`SIGN_IN_AND_UP`);
                        return implementation.emailPasswordSignIn(...args);
                    },
                    emailPasswordSignUp(...args) {
                        log(`SIGN_IN_AND_UP`);
                        return implementation.emailPasswordSignUp(...args);
                    },
                    setStateAndOtherInfoToStorage(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`SET_OAUTH_STATE RECEIVED_USER_CONTEXT`);
                        }

                        log(`SET_OAUTH_STATE`);
                        return implementation.setStateAndOtherInfoToStorage(input);
                    },
                    getStateAndOtherInfoFromStorage(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_OAUTH_STATE RECEIVED_USER_CONTEXT`);
                        }

                        log(`GET_OAUTH_STATE`);
                        return implementation.getStateAndOtherInfoFromStorage(input);
                    },
                    getAuthorisationURLFromBackend(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_OAUTH_AUTHORISATION_URL RECEIVED_USER_CONTEXT`);
                        }

                        log(`GET_OAUTH_AUTHORISATION_URL`);

                        if (input.userContext["isPreAPITest"] !== undefined) {
                            return implementation.getAuthorisationURLFromBackend({
                                ...input,
                                options: {
                                    preAPIHook: async (input) => {
                                        window.localStorage.setItem(
                                            "getAuthorisationURLFromBackend-pre-api-hook",
                                            "true"
                                        );
                                        return input;
                                    },
                                },
                            });
                        }

                        return implementation.getAuthorisationURLFromBackend(input);
                    },
                    submitNewPassword(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`SUBMIT_NEW_PASSWORD RECEIVED_USER_CONTEXT`);
                        }

                        log(`SUBMIT_NEW_PASSWORD`);
                        return implementation.submitNewPassword(input);
                    },
                    sendPasswordResetEmail(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`SEND_PASSWORD_RESET_EMAIL RECEIVED_USER_CONTEXT`);
                        }

                        log(`SEND_PASSWORD_RESET_EMAIL`);
                        return implementation.sendPasswordResetEmail(input);
                    },
                    getResetPasswordTokenFromURL(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_RESET_TOKEN_FROM_URL RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.getResetPasswordTokenFromURL(input);
                    },
                    doesEmailExist(...args) {
                        log(`DOES_EMAIL_EXIST`);
                        return implementation.doesEmailExist(...args);
                    },
                    getAuthStateFromURL(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_AUTH_STATE_FROM_URL RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.getAuthStateFromURL(input);
                    },
                    verifyAndGetStateOrThrowError(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`VERIFY_STATE RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.verifyAndGetStateOrThrowError(input);
                    },
                    getAuthCodeFromURL(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_AUTH_CODE_FROM_URL RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.getAuthCodeFromURL(input);
                    },
                    getAuthErrorFromURL(input) {
                        if (input.userContext["key"] !== undefined) {
                            log(`GET_AUTH_ERROR_FROM_URL RECEIVED_USER_CONTEXT`);
                        }

                        return implementation.getAuthErrorFromURL(input);
                    },
                };
            },
        },
        useShadowDom,
        resetPasswordUsingTokenFeature: {
            disableDefaultUI,
        },
        signInAndUpFeature: {
            disableDefaultUI,
            signInForm: {},
            signUpForm: {
                formFields,
                privacyPolicyLink: "https://supertokens.com/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.com/legal/terms-and-conditions",
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
                {
                    id: "auth0",
                    name: "Auth0",
                    getRedirectURL: thirdPartyRedirectURL !== null ? () => thirdPartyRedirectURL : undefined,
                },
            ],
        },
        disableEmailPassword: false,

        oAuthCallbackScreen: {
            style: theme.style,
        },
    });
}

function setIsNewUserToStorage(recipeName, isNewUser) {
    localStorage.setItem("isNewUserCheck", `${recipeName}-${isNewUser}`);
}

window.SuperTokens = SuperTokens;
window.Session = Session;
window.UserRoleClaim = UserRoles.UserRoleClaim;
window.PermissionClaim = UserRoles.PermissionClaim;
