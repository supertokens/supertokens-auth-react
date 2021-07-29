import * as React from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "../../../";
import EmailPassword, {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../../../recipe/emailpassword";
import Session from "../../../recipe/session";
import ThirdParty, {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../../../recipe/thirdparty";
import ThirdPartyEmailPassword, {
    GetRedirectionURLContext as ThirdPartyEmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyEmailPasswordOnHandleEventContext,
    PreAPIHookContext as ThirdPartyEmailPasswordPreAPIHookContext,
} from "../../../recipe/thirdpartyemailpassword";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import DarkTheme from "./Themes/Dark";
import { CSSObject } from "@emotion/react";

/*
 * This application is used with the purpose of illustrating Supertokens with typescript.
 * It is also used internally for deploy previews, hence a lot of code you will see
 * in this file is not directly linked to initialising SuperTokens in a typescript environement.
 */

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 8082;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3002;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

const ridParams = getQueryParams("rid");
if (ridParams !== null) {
    window.localStorage.setItem("rid", ridParams);
}

const mode = getQueryParams("mode");

if (mode !== null) {
    window.localStorage.setItem("mode", mode);
}

const theme = getTheme();

const rid = window.localStorage.getItem("rid") || "emailpassword";

const recipeList = getRecipeList();

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: window.location.origin,
    },
    recipeList,
});

function App() {
    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                        <Route path="/">
                            <Auth>
                                <Home />
                            </Auth>
                        </Route>
                        <Route path="/redirect-to-this-custom-path">
                            <Auth>
                                <Home />
                            </Auth>
                        </Route>
                    </Switch>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </Router>
        </div>
    );
}

export default App;

function getQueryParams(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export type Theme = {
    colors: Record<string, string>;
    style: Record<string, CSSObject>;
};
function getTheme(): {
    colors: Record<string, string>;
    style?: Record<string, CSSObject>;
} {
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

function getRecipeList() {
    return [
        getEmailPasswordConfigs(),
        getThirdPartyConfigs(),
        getThirdPartyEmailPasswordConfigs(),
        Session.init(),
        Session.init({
            autoAddCredentials: true,
            isInIframe: true,
            sessionExpiredStatusCode: 401,
            sessionScope: "",
            apiBasePath: "",
            apiDomain: "",
            cookieDomain: "",
            onHandleEvent: (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                } else if (context.action === "UNAUTHORISED") {
                }
            },
            preAPIHook: async (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                }
                return context;
            },
            override: {
                functions: (oI) => {
                    return {
                        addAxiosInterceptors: (instance, config) => {
                            return oI.addAxiosInterceptors(instance, config);
                        },
                        addFetchInterceptorsAndReturnModifiedFetch: (f, c) => {
                            return oI.addFetchInterceptorsAndReturnModifiedFetch(f, c);
                        },
                        doesSessionExist: (input) => {
                            return oI.doesSessionExist(input);
                        },
                        getJWTPayloadSecurely: (input) => {
                            return oI.getJWTPayloadSecurely(input);
                        },
                        getUserId: (config) => {
                            return oI.getUserId(config);
                        },
                        signOut: (config) => {
                            return oI.signOut(config);
                        },
                    };
                },
            },
        }),
    ];
}

function getEmailPasswordConfigs() {
    return EmailPassword.init({
        palette: theme.colors,
        emailVerificationFeature: {
            sendVerifyEmailScreen: {
                style: theme.style,
            },
            verifyEmailLinkClickedScreen: {
                style: theme.style,
            },
            mode: "REQUIRED",
        },
        resetPasswordUsingTokenFeature: {
            enterEmailForm: {
                style: theme.style,
            },
            submitNewPasswordForm: {
                style: theme.style,
            },
        },
        signInAndUpFeature: {
            signInForm: {
                style: theme.style,
            },
            signUpForm: {
                style: theme.style,
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
                formFields: [
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
                ],
            },
        },

        onHandleEvent(context: EmailPasswordOnHandleEventContext) {},

        async preAPIHook(context: EmailPasswordPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: EmailPasswordGetRedirectionURLContext) {
            return undefined;
        },
        override: {
            functions: (oI) => {
                return {
                    ...oI,
                    doesEmailExist: (input) => {
                        return oI.doesEmailExist(input);
                    },
                    sendPasswordResetEmail: (input) => {
                        return oI.sendPasswordResetEmail(input);
                    },
                    signIn: (input) => {
                        return oI.signIn(input);
                    },
                    signUp: (input) => {
                        return oI.signUp(input);
                    },
                    submitNewPassword: (input) => {
                        return oI.submitNewPassword(input);
                    },
                };
            },
            components: {
                EmailPasswordSignIn: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordSignInHeader: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordSubmitNewPassword: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
            },
            emailVerification: {
                functions: (oI) => {
                    return {
                        isEmailVerified: (input) => {
                            return oI.isEmailVerified(input);
                        },
                        sendVerificationEmail: (input) => {
                            return oI.sendVerificationEmail(input);
                        },
                        verifyEmail: (input) => {
                            return oI.verifyEmail(input);
                        },
                    };
                },
                components: {
                    EmailVerificationSendVerifyEmail: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}
function getThirdPartyConfigs() {
    return ThirdParty.init({
        onHandleEvent(context: ThirdPartyOnHandleEventContext) {},

        async preAPIHook(context: ThirdPartyPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: ThirdPartyGetRedirectionURLContext) {
            return undefined;
        },
        palette: theme.colors,
        signInAndUpFeature: {
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
        override: {
            functions: (oI) => {
                return {
                    ...oI,
                };
            },
            components: {
                ThirdPartySignInAndUpCallbackTheme: ({ DefaultComponent }) => {
                    return (
                        <div>
                            <DefaultComponent />
                        </div>
                    );
                },
            },
            emailVerification: {
                functions: (oI) => {
                    return {
                        ...oI,
                    };
                },
                components: {
                    EmailVerificationVerifyEmailLinkClicked: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}

function getThirdPartyEmailPasswordConfigs() {
    return ThirdPartyEmailPassword.init({
        onHandleEvent(context: ThirdPartyEmailPasswordOnHandleEventContext) {},

        async preAPIHook(context: ThirdPartyEmailPasswordPreAPIHookContext) {
            return context;
        },

        async getRedirectionURL(context: ThirdPartyEmailPasswordGetRedirectionURLContext) {
            return undefined;
        },
        palette: theme.colors,
        signInAndUpFeature: {
            style: theme.style,
            signUpForm: {
                privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
                termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
            },
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
        override: {
            components: {
                ThirdPartySignInAndUpProvidersForm: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
                EmailPasswordResetPasswordEmail: ({ DefaultComponent, ...props }) => {
                    return (
                        <div>
                            <DefaultComponent {...props} />
                        </div>
                    );
                },
            },
            emailVerification: {
                components: {
                    EmailVerificationVerifyEmailLinkClicked: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                },
            },
        },
    });
}

function Auth(props: any) {
    if (rid === "thirdparty") {
        return <ThirdParty.ThirdPartyAuth>{props.children}</ThirdParty.ThirdPartyAuth>;
    } else if (rid === "thirdpartyemailpassword") {
        return (
            <ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
                {props.children}
            </ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth>
        );
    }

    return <EmailPassword.EmailPasswordAuth>{props.children}</EmailPassword.EmailPasswordAuth>;
}
