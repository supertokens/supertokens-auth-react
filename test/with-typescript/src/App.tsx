import * as React from "react";
import "./App.css";
import SuperTokens, { SuperTokensWrapper } from "../../../";
import { getSuperTokensRoutesForReactRouterDom, AuthPage } from "../../../ui";
import EmailPassword, {
    EmailPasswordComponentsOverrideProvider,
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../../../recipe/emailpassword";
import Session, { BooleanClaim, SessionAuth } from "../../../recipe/session";
import Multitenancy, { AllowedDomainsClaim } from "../../../recipe/multitenancy";
import ThirdParty, {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
    ThirdpartyComponentsOverrideProvider,
} from "../../../recipe/thirdparty";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import HeliumTheme from "./Themes/Helium";
import HydrogenTheme from "./Themes/Hydrogen";
import DarkTheme from "./Themes/Dark";
import Passwordless from "../../../recipe/passwordless";
import { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";
import { PermissionClaim, UserRoleClaim } from "../../../recipe/userroles";
import {
    ThirdPartyPreBuiltUI,
    SignInAndUpCallback as TPSignInAndUpCallback,
} from "../../../recipe/thirdparty/prebuiltui";
import {
    EmailPasswordPreBuiltUI,
    ResetPasswordUsingToken as EmailPasswordResetPasswordUsingToken,
} from "../../../recipe/emailpassword/prebuiltui";
import { SessionPreBuiltUI, AccessDeniedScreen } from "../../../recipe/session/prebuiltui";
import { LinkClicked as PasswordlessLinkClicked } from "../../../recipe/passwordless/prebuiltui";
import EmailVerification from "../../../recipe/emailverification";
import MultiFactorAuth from "../../../recipe/multifactorauth";
import OAuth2Provider from "../../../recipe/oauth2provider";
import { OAuth2ProviderPreBuiltUI } from "../../../recipe/oauth2provider/prebuiltui";

import { DateProviderReference } from "../../../utils/dateProvider";
import { DateProviderInput, DateProviderInterface } from "../../../utils/dateProvider/types";
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

const themeQueryParams = getQueryParams("theme");
if (themeQueryParams !== null) {
    window.localStorage.setItem("useTheme", themeQueryParams);
}

const theme = getTheme();

const rid = window.localStorage.getItem("rid") || "emailpassword";

const recipeList = getRecipeList();

const dateProviderImplementation: DateProviderInterface = {
    getThresholdInSeconds: () => 0,
    setThresholdInSeconds: () => {},
    getClientClockSkewInMillis: () => 0,
    setClientClockSkewInMillis: () => {},
    now: () => Date.now(),
};

const dateProviderInput: DateProviderInput = () => dateProviderImplementation;

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: window.location.origin,
    },
    privacyPolicyLink: "https://supertokens.io/legal/privacy-policy",
    termsOfServiceLink: "https://supertokens.io/legal/terms-and-conditions",
    async getRedirectionURL(context) {
        if (context.action === "TO_AUTH") {
            return "/auth";
        }
        return undefined;
    },
    recipeList,
    dateProvider: dateProviderInput,
});

function App() {
    return (
        <SuperTokensWrapper>
            <EmailPasswordComponentsOverrideProvider
                components={{
                    EmailPasswordSignInForm_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                    EmailPasswordSignUpForm_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                    EmailPasswordSubmitNewPassword_Override: ({ DefaultComponent, ...props }) => {
                        return (
                            <div>
                                <DefaultComponent {...props} />
                            </div>
                        );
                    },
                }}>
                <ThirdpartyComponentsOverrideProvider
                    components={{
                        ThirdPartySignInAndUpCallbackTheme_Override: ({ DefaultComponent }) => {
                            return (
                                <div>
                                    <DefaultComponent />
                                </div>
                            );
                        },
                    }}>
                    <div className="App">
                        <Router>
                            <div className="fill">
                                <Routes>
                                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [
                                        ThirdPartyPreBuiltUI,
                                        EmailPasswordPreBuiltUI,
                                    ])}
                                    <Route
                                        path="/"
                                        element={
                                            <SessionAuth
                                                doRedirection={true}
                                                requireAuth={true}
                                                overrideGlobalClaimValidators={(o) => [
                                                    ...o,
                                                    UserRoleClaim.validators.includes("admin"),
                                                    PermissionClaim.validators.excludesAll([
                                                        "delete_user",
                                                        "delete_post",
                                                    ]),
                                                    AllowedDomainsClaim.validators.hasAccessToCurrentDomain(),
                                                    Multitenancy.AllowedDomainsClaim.validators.includes("asdf.com"),
                                                ]}
                                                accessDeniedScreen={({ validationError }) => (
                                                    <div>{JSON.stringify(validationError)}</div>
                                                )}>
                                                <Home />
                                            </SessionAuth>
                                        }
                                    />
                                    <Route
                                        path="/redirect-to-this-custom-path"
                                        element={
                                            <SessionAuth requireAuth={true}>
                                                <Home />
                                            </SessionAuth>
                                        }
                                    />
                                    <Route
                                        path="/no-redirection-sign-in"
                                        element={
                                            <AuthPage
                                                redirectOnSessionExists={false}
                                                preBuiltUIList={[EmailPasswordPreBuiltUI]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/no-redirection-sign-in-with-children"
                                        element={
                                            <AuthPage
                                                redirectOnSessionExists={false}
                                                preBuiltUIList={[EmailPasswordPreBuiltUI]}>
                                                <Home />
                                            </AuthPage>
                                        }
                                    />
                                </Routes>
                            </div>
                            <div className="footer">
                                <Footer />
                            </div>
                        </Router>
                    </div>
                </ThirdpartyComponentsOverrideProvider>
            </EmailPasswordComponentsOverrideProvider>
        </SuperTokensWrapper>
    );
}

export default App;

function getQueryParams(param: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

export type Theme = {
    colors: Record<string, string>;
    style: Record<string, any>;
};
function getTheme(): {
    colors: Record<string, string>;
    style?: string;
} {
    let theme = {
        colors: {},
        style: "",
    };

    const themeParams = window.localStorage.getItem("useTheme");

    if (themeParams === "dark") {
        window.document.body.style.backgroundColor = "#1a1a1a";
        return DarkTheme;
    }

    if (themeParams === "helium") {
        // return HeliumTheme;
    }

    if (themeParams === "hydrogen") {
        // return HydrogenTheme;
    }

    return theme;
}

function getRecipeList() {
    return [
        getEmailPasswordConfigs(),
        getThirdPartyConfigs(),
        Session.init(),
        Session.init({
            autoAddCredentials: true,
            isInIframe: true,
            sessionExpiredStatusCode: 401,
            sessionTokenFrontendDomain: "",
            sessionTokenBackendDomain: "",
            onHandleEvent: (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                } else if (context.action === "API_INVALID_CLAIM") {
                } else if (context.action === "UNAUTHORISED") {
                    if (context.sessionExpiredOrRevoked) {
                    }
                } else if (context.action === "ACCESS_TOKEN_PAYLOAD_UPDATED") {
                }
            },
            preAPIHook: async (context) => {
                if (context.action === "REFRESH_SESSION") {
                } else if (context.action === "SIGN_OUT") {
                }
                return context;
            },
            postAPIHook: async (context) => {
                context.userContext;
            },
            override: {
                functions: (oI) => {
                    return {
                        addAxiosInterceptors: (instance) => {
                            return oI.addAxiosInterceptors(instance);
                        },
                        addXMLHttpRequestInterceptor: (input) => {
                            return oI.addXMLHttpRequestInterceptor(input);
                        },
                        addFetchInterceptorsAndReturnModifiedFetch: (f) => {
                            return oI.addFetchInterceptorsAndReturnModifiedFetch(f);
                        },
                        doesSessionExist: (input) => {
                            return oI.doesSessionExist(input);
                        },
                        getAccessTokenPayloadSecurely: (input) => {
                            return oI.getAccessTokenPayloadSecurely(input);
                        },
                        getUserId: (config) => {
                            return oI.getUserId(config);
                        },
                        signOut: (config) => {
                            return oI.signOut(config);
                        },
                        getGlobalClaimValidators: (input) => {
                            return oI.getGlobalClaimValidators(input);
                        },
                        getInvalidClaimsFromResponse: (input) => {
                            return oI.getInvalidClaimsFromResponse(input);
                        },
                        validateClaims: (input) => {
                            return oI.validateClaims(input);
                        },
                        shouldDoInterceptionBasedOnUrl: (...input) => {
                            return oI.shouldDoInterceptionBasedOnUrl(...input);
                        },
                        calculateClockSkewInMillis: (...input) => {
                            return oI.calculateClockSkewInMillis(...input);
                        },
                    };
                },
            },
        }),
    ];
}

function getEmailPasswordConfigs() {
    return EmailPassword.init({
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
                formFields: [
                    {
                        id: "email",
                        label: "Email",
                        nonOptionalErrorMsg: "Please add your email",
                        getDefaultValue: () => "abc@xyz.com",
                    },
                ],
            },
            signUpForm: {
                style: theme.style,
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
                    {
                        id: "terms",
                        label: "",
                        optional: false,
                        nonOptionalErrorMsg: "Please check Terms and conditions",
                        getDefaultValue: () => "true",
                        inputComponent: (inputProps) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "left",
                                }}>
                                <input
                                    name={inputProps.name}
                                    type="checkbox"
                                    value={inputProps.value}
                                    checked={inputProps.value === "true"}
                                    onChange={(e) => {
                                        inputProps.onChange(e.target.checked.toString());
                                    }}></input>
                                <span style={{ marginLeft: 5 }}>I agree to the terms and conditions</span>
                            </div>
                        ),
                        validate: async (value) => {
                            if (value === "true") {
                                return undefined;
                            }
                            return "Please check Terms and conditions";
                        },
                    },
                    {
                        id: "select",
                        label: "Select",
                        getDefaultValue: () => "option 2",
                        inputComponent: (inputProps) => (
                            <select
                                onBlur={(e) => {
                                    inputProps.onInputBlur(e.target.value);
                                }}
                                onFocus={(e) => {
                                    inputProps.onInputFocus(e.target.value);
                                }}
                                value={inputProps.value}
                                name={inputProps.name}
                                onChange={(e) => {
                                    inputProps.onChange(e.target.value);
                                }}>
                                <option value="" disabled hidden>
                                    Select an option
                                </option>
                                <option value="option 1">Option 1</option>
                                <option value="option 2">Option 2</option>
                                <option value="option 3">Option 3</option>
                            </select>
                        ),
                        optional: true,
                    },
                ],
            },
        },

        onHandleEvent(context: EmailPasswordOnHandleEventContext) {
            if (context.action === "SUCCESS") {
                if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
                    // new primary user
                } else {
                    // only a recipe user was created
                }
            }
        },

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
        signInAndUpFeature: {
            style: theme.style,
            providers: [
                ThirdParty.Github.init(),
                ThirdParty.Google.init({
                    id: "some client ID",
                    buttonComponent: ({ name }) => {
                        return <div>ASDF {name}</div>;
                    },
                }),
                ThirdParty.Facebook.init(),
                ThirdParty.Apple.init(),
                {
                    id: "custom",
                    name: "Custom",
                    buttonComponent: <span>ASDF Custom</span>,
                },
                {
                    id: "custom-2",
                    name: "Custom-2",
                    logo: <svg></svg>,
                    buttonComponent: <span>ASDF Custom</span>,
                },
                {
                    id: "with-dynamic-name",
                    logo: <svg></svg>,
                    buttonComponent: ({ name }) => <span> {name} </span>,
                },
            ],
        },
        oAuthCallbackScreen: {
            style: theme.style,
        },
        override: {
            functions: (oI) => {
                return {
                    ...oI,
                };
            },
        },
    });
}

Passwordless.init({
    contactMethod: "EMAIL",
    preAPIHook: async (context) => {
        let url = context.url;

        // is the fetch config object that contains the header, body etc..
        let requestInit = context.requestInit;

        let action = context.action;
        if (action === "EMAIL_EXISTS") {
        } else if (action === "PASSWORDLESS_CONSUME_CODE") {
        } else if (action === "PASSWORDLESS_CREATE_CODE") {
        } else if (action === "PASSWORDLESS_RESEND_CODE") {
        } else if (action === "PHONE_NUMBER_EXISTS") {
        }

        // events such as sign out are in the
        // session recipe pre API hook (See the info box below)
        return {
            requestInit,
            url,
        };
    },
    onHandleEvent: (context) => {
        if (context.action === "PASSWORDLESS_CODE_SENT") {
        } else if (context.action === "PASSWORDLESS_RESTART_FLOW") {
        } else if (context.action === "SUCCESS") {
            let user = context.user;
            if (context.isNewRecipeUser) {
                // sign up success
            } else {
                // sign in success
            }
        }
    },
    getRedirectionURL: async (context) => {
        // return undefined to let the default behaviour play out
        return undefined;
    },
});

function SomeComponent(props: any) {
    return (
        <SessionAuth>
            <div></div>
            <div></div>
        </SessionAuth>
    );
}

/**
 * Recipe Index Functions
 */

// Email password
EmailPassword.doesEmailExist({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
EmailPassword.doesEmailExist();
// @ts-expect-error
EmailPassword.doesEmailExist(undefined);

EmailPassword.getResetPasswordTokenFromURL({
    userContext: undefined,
});
EmailPassword.getResetPasswordTokenFromURL(undefined);
EmailPassword.getResetPasswordTokenFromURL();

EmailPassword.sendPasswordResetEmail({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
//@ts-expect-error
EmailPassword.sendPasswordResetEmail(undefined);
//@ts-expect-error
EmailPassword.sendPasswordResetEmail();

EmailPassword.signIn({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signIn(undefined);
// @ts-expect-error
EmailPassword.signIn();

EmailPassword.signOut({
    userContext: undefined,
});
EmailPassword.signOut(undefined);
EmailPassword.signOut();

EmailPassword.signUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.signUp(undefined);
// @ts-expect-error
EmailPassword.signUp();

EmailPassword.submitNewPassword({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
    formFields: [
        {
            id: "",
            value: "",
        },
    ],
});
// @ts-expect-error
EmailPassword.submitNewPassword(undefined);
// @ts-expect-error
EmailPassword.submitNewPassword();

// Passwordless
Passwordless.clearLoginAttemptInfo({
    userContext: undefined,
});
Passwordless.clearLoginAttemptInfo(undefined);
Passwordless.clearLoginAttemptInfo();

Passwordless.consumeCode({
    userInputCode: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.consumeCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
Passwordless.consumeCode(undefined);
Passwordless.consumeCode();

Passwordless.createCode({
    email: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
Passwordless.createCode({
    email: "",
    phoneNumber: "",
    options: {
        preAPIHook: undefined,
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.createCode(undefined);
// @ts-expect-error
Passwordless.createCode();

Passwordless.doesEmailExist({
    email: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesEmailExist(undefined);
// @ts-expect-error
Passwordless.doesEmailExist();

Passwordless.doesPhoneNumberExist({
    phoneNumber: "",
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
Passwordless.doesPhoneNumberExist(undefined);
// @ts-expect-error
Passwordless.doesPhoneNumberExist();

Passwordless.getLinkCodeFromURL({
    userContext: undefined,
});
Passwordless.getLinkCodeFromURL(undefined);
Passwordless.getLinkCodeFromURL();

async function getLoginAttemptInfo() {
    // @ts-expect-error
    const incorrectCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: number;
    }>({
        userContext: undefined,
    });

    const correctCustomType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              customData: string;
          }
        | undefined = await Passwordless.getLoginAttemptInfo<{
        customData: string;
    }>(undefined);

    const defaultType:
        | {
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          }
        | undefined = await Passwordless.getLoginAttemptInfo();
}

Passwordless.getPreAuthSessionIdFromURL({
    userContext: undefined,
});
Passwordless.getPreAuthSessionIdFromURL(undefined);
Passwordless.getPreAuthSessionIdFromURL();

Passwordless.resendCode({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
Passwordless.resendCode(undefined);
Passwordless.resendCode();

Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    // @ts-expect-error
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        // @ts-expect-error
        customData: 123,
    },
    userContext: undefined,
});
Passwordless.setLoginAttemptInfo<{
    customData: string;
}>({
    attemptInfo: {
        deviceId: "",
        preAuthSessionId: "",
        flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        customData: "",
    },
    userContext: undefined,
});
// @ts-expect-error
Passwordless.setLoginAttemptInfo(undefined);
// @ts-expect-error
Passwordless.setLoginAttemptInfo();

Passwordless.signOut({
    userContext: undefined,
});
Passwordless.signOut(undefined);
Passwordless.signOut();

// Third party
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLFromBackend();

ThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
    thirdPartyId: "",
    frontendRedirectURI: "",
    redirectURIOnProviderDashboard: undefined,
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState(undefined);
// @ts-expect-error
ThirdParty.getAuthorisationURLWithQueryParamsAndSetState();

ThirdParty.signInAndUp({
    userContext: undefined,
    options: {
        preAPIHook: undefined,
    },
});
ThirdParty.signInAndUp(undefined);
ThirdParty.signInAndUp();

ThirdParty.signOut({
    userContext: undefined,
});
ThirdParty.signOut(undefined);
ThirdParty.signOut();

Session.addAxiosInterceptors({});

Session.validateClaims({
    overrideGlobalClaimValidators: () => {
        return [];
    },
});

Session.getClaimValue({ claim: UserRoleClaim }).then((v) => {});

Session.init({
    override: {
        functions: (oI) => {
            return {
                ...oI,
                getGlobalClaimValidators: (input) => [
                    ...input.claimValidatorsAddedByOtherRecipes,
                    UserRoleClaim.validators.includes("admin"),
                ],
            };
        },
    },
});

Session.init({
    override: {
        functions: (oI) => {
            return {
                ...oI,
                getGlobalClaimValidators: (input) => {
                    return [
                        ...input.claimValidatorsAddedByOtherRecipes,
                        {
                            ...UserRoleClaim.validators.includes("admin"),
                            showAccessDeniedOnFailure: false, // if you want to handle the validation errors in you components
                            onFailureRedirection: () => "/not-an-admin", // if you want to redirect to a specific path
                        },
                    ];
                },
            };
        },
    },
});

const AdminRoute: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <SessionAuth
            accessDeniedScreen={AccessDeniedScreen}
            overrideGlobalClaimValidators={(globalValidators) => [
                ...globalValidators,
                {
                    ...UserRoleClaim.validators.includes("admin"),
                    showAccessDeniedOnFailure: false, // if you want to handle the validation errors in you components
                    onFailureRedirection: () => "/not-an-admin", // if you want to redirect to a specific path
                },
            ]}>
            {props.children}
        </SessionAuth>
    );
};
EmailVerification.init();
EmailVerification.init(undefined);
EmailVerification.init({});

Multitenancy.init();

Multitenancy.init({
    override: {
        functions: (oI) => ({
            ...oI,
            getTenantId: () => "...",
            getLoginMethods: async (input) => {
                try {
                    return oI.getLoginMethods(input);
                } catch (err) {
                    if (err.message === "AppId or tenantId not found") {
                        // redirect the user here.
                    }
                    throw err;
                }
            },
        }),
    },
});

MultiFactorAuth.init();
MultiFactorAuth.init({
    firstFactors: ["emailpassword", "unknown"],
    factorChooserScreen: {
        style: "[data-supertokens~=container] { background-color: red; }",
    },
    getSecondaryFactorInfo: (factors) => [
        ...factors,
        { id: "asfd", logo: () => <div>A</div>, description: "test", name: "asdf", path: "/mfa/asdf" },
    ],
});

Passwordless.init({
    contactMethod: "EMAIL",
    mfaFeature: {
        style: "",
    },
});

// Testing that 'null' is allowed to be returned from getRedirectionURL
SuperTokens.init({
    appInfo: {
        appName: "",
        apiDomain: "",
        websiteDomain: "",
    },

    async getRedirectionURL(context, userContext) {
        if (context.action === "SUCCESS") {
            if (context.createdNewUser) {
                const rid = context.recipeId;
                // New primary user
            } else if (context.isNewRecipeUser) {
                // New recipe user
            } else {
                // Existing user
            }
        }
        return null;
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            async getRedirectionURL(context, userContext) {
                return null;
            },
        }),
        EmailVerification.init({
            async getRedirectionURL(context, userContext) {
                return null;
            },
        }),
        Passwordless.init({
            contactMethod: "EMAIL",
            async getRedirectionURL(context, userContext) {
                return null;
            },
        }),
    ],
});

export const PhoneVerifiedClaim = new BooleanClaim({
    id: "phone-verified",
    refresh: async () => {
        // This is something we have no way of refreshing, so this is a no-op
    },
    // @ts-expect-error - Returning null from onFailureRedirection is not supported
    onFailureRedirection: () => null,
});

function TestIfUserContextCanBePassedToPreBuiltComponets() {
    const userContext = {};
    return [
        <AuthPage preBuiltUIList={[EmailPasswordPreBuiltUI]} userContext={userContext} />,
        <TPSignInAndUpCallback userContext={userContext} />,
        <EmailPasswordResetPasswordUsingToken userContext={userContext} />,
        <AccessDeniedScreen userContext={userContext} />,
        <PasswordlessLinkClicked userContext={userContext} />,
    ];
}

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: window.location.origin,
    },
    recipeList,
    style: `
        [data-supertokens~=authPage] [data-supertokens~=headerSubtitle] {
            display: none;
        }
    `,
});

function testAuthPagePropTypes() {
    return [
        // @ts-expect-error This has to be a valid factor
        <AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} factors={["asdf"]} />,
        // @ts-expect-error This has to be a valid first factor
        <AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} factors={["totp"]} />,
        <AuthPage
            preBuiltUIList={[ThirdPartyPreBuiltUI, OAuth2ProviderPreBuiltUI, SessionPreBuiltUI]}
            factors={["thirdparty", "emailpassword", "link-email", "link-phone", "otp-email", "otp-phone"]}
        />,
    ];
}

SuperTokens.init({
    appInfo: {} as any,
    recipeList: [
        OAuth2Provider.init({
            oauth2LogoutScreen: {
                style: "",
            },
            style: "",
            getRedirectionURL: async (context, userContext) => {
                if (context.action === "SUCCESS_OAUTH2") {
                    return undefined;
                }
                if (context.action === "CONTINUE_OAUTH2_AFTER_REFRESH") {
                    return undefined;
                }
                if (context.action === "POST_OAUTH2_LOGOUT_REDIRECT") {
                    return undefined;
                }
                return undefined;
            },
        }),
    ],
});

EmailPassword.init({
    async getRedirectionURL(context) {
        if (context.action === "RESET_PASSWORD") {
            return `/reset-password?tenantId=${context.tenantIdFromQueryParams}`;
        }
        return "";
    },
});
