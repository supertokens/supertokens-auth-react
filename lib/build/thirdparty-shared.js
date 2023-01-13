"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var translationContext = require("./translationContext.js");
var React = require("react");
var index = require("./index3.js");
var spinnerIcon = require("./spinnerIcon.js");
var recipe = require("./recipe.js");

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);

function ProviderButton({ logo, providerName, displayName }) {
    const t = translationContext.useTranslation();
    const providerStyleName = `provider${providerName}`;
    return jsxRuntime.jsxs(
        "button",
        Object.assign(
            { "data-supertokens": `button providerButton ${providerStyleName}` },
            {
                children: [
                    logo !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            Object.assign(
                                { "data-supertokens": "providerButtonLeft" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "providerButtonLogo" },
                                            {
                                                children: jsxRuntime.jsx(
                                                    "div",
                                                    Object.assign(
                                                        { "data-supertokens": "providerButtonLogoCenter" },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}

/*
 * Imports.
 */
/*
 * Class.
 */
class Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        /*
         * State management.
         */
        this.generateState = () => {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return `${1e20}`.replace(/[018]/g, (c) =>
                (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
            );
        };
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
        this.getRedirectURL =
            config.getRedirectURL !== undefined ? config.getRedirectURL : () => this.defaultGetRedirectURL();
    }
    /*
     * Components.
     */
    getDefaultButton(name) {
        const providerName = name !== undefined ? name : this.name;
        return jsxRuntime.jsx(ProviderButton, {
            logo: this.getLogo(),
            providerName: providerName,
            displayName: this.name,
        });
    }
    defaultGetRedirectURL() {
        const domain = sessionAuth.SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        const callbackPath = new sessionAuth.NormalisedURLPath(`/callback/${this.id}`);
        const path = sessionAuth.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return `${domain}${path}`;
    }
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Class.
 */
class Custom extends Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        super(config);
        this.getButton = () => {
            if (this.buttonComponent !== undefined) {
                if (typeof this.buttonComponent === "function") {
                    return this.buttonComponent();
                }
                return this.buttonComponent;
            }
            return this.getDefaultButton("Custom");
        };
        this.getLogo = () => {
            return undefined;
        };
        this.buttonComponent = config.buttonComponent;
    }
    /*
     * Static Methods
     */
    static init(config) {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    }
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    const signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    const oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    const override = Object.assign(
        { functions: (originalImplementation) => originalImplementation, components: {} },
        config.override
    );
    return Object.assign(Object.assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
        signInAndUpFeature,
        oAuthCallbackScreen,
        override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const style = config.style !== undefined ? config.style : "";
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    const providersWithCustom = config.providers.map((provider) => {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    const providers = Array.from(new Set(providersWithCustom.map((provider) => provider.id))).map((id) =>
        providersWithCustom.find((provider) => provider.id === id)
    );
    return {
        disableDefaultUI,
        privacyPolicyLink,
        termsOfServiceLink,
        style,
        providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    const stateResponse = recipe.recipeImpl.getStateAndOtherInfoFromStorage({
        userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin$1(input) {
    return sessionAuth.__awaiter(this, void 0, void 0, function* () {
        const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
        if (provider === undefined) {
            return { status: "ERROR" };
        }
        const response = yield input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
            providerId: input.thirdPartyId,
            authorisationURL: provider.getRedirectURL(),
            providerClientId: provider.clientId,
            userContext: input.userContext,
        });
        sessionAuth.redirectWithFullPageReload(response);
        return { status: "OK" };
    });
}

const SignUpFooter = index.withOverride(
    "ThirdPartySignUpFooter",
    function ThirdPartySignUpFooter({ termsOfServiceLink, privacyPolicyLink }) {
        const t = translationContext.useTranslation();
        if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
            return null;
        }
        return jsxRuntime.jsxs(
            "div",
            Object.assign(
                { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
                {
                    children: [
                        t("THIRD_PARTY_SIGN_IN_UP_FOOTER_START"),
                        termsOfServiceLink !== undefined &&
                            jsxRuntime.jsx(
                                "a",
                                Object.assign(
                                    {
                                        "data-supertokens": "link",
                                        href: termsOfServiceLink,
                                        target: "_blank",
                                        rel: "noopener noreferer",
                                    },
                                    { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS") }
                                )
                            ),
                        termsOfServiceLink !== undefined &&
                            privacyPolicyLink !== undefined &&
                            t("THIRD_PARTY_SIGN_IN_UP_FOOTER_AND"),
                        privacyPolicyLink !== undefined &&
                            jsxRuntime.jsx(
                                "a",
                                Object.assign(
                                    {
                                        "data-supertokens": "link",
                                        href: privacyPolicyLink,
                                        target: "_blank",
                                        rel: "noopener noreferer",
                                    },
                                    { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_PP") }
                                )
                            ),
                        t("THIRD_PARTY_SIGN_IN_UP_FOOTER_END"),
                    ],
                }
            )
        );
    }
);

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 250, 250, 250;\n    --palette-selectedBackground: 238, 238, 238;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-success-bg: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-error-bg: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 33, 33, 33;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-error-bg));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-success-bg));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(1.1);\n            filter: brightness(1.1);\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n';

const ThemeBase = ({ children, userStyles, loadDefaultFont }) => {
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] }),
        ],
    });
};

const ThirdPartySignInAndUpProvidersForm = (props) => {
    const userContext = sessionAuth.useUserContext();
    const signInClick = (providerId) =>
        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
            try {
                let response;
                let generalError;
                try {
                    response = yield redirectToThirdPartyLogin$1({
                        recipeImplementation: props.recipeImplementation,
                        thirdPartyId: providerId,
                        config: props.config,
                        userContext,
                    });
                } catch (e) {
                    if (index.STGeneralError.isThisError(e)) {
                        generalError = e;
                    } else {
                        throw e;
                    }
                }
                if (generalError !== undefined) {
                    props.dispatch({
                        type: "setError",
                        error: generalError.message,
                    });
                } else {
                    if (response === undefined) {
                        throw new Error("Should not come here");
                    }
                    if (response.status === "ERROR") {
                        props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                    }
                }
            } catch (err) {
                props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
            }
        });
    return jsxRuntime.jsx(React.Fragment, {
        children: props.providers.map((provider) => {
            return jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "providerContainer" },
                    {
                        children: jsxRuntime.jsx(
                            "span",
                            Object.assign(
                                { onClick: () => signInClick(provider.id) },
                                { children: provider.buttonComponent }
                            )
                        ),
                    }
                ),
                `provider-${provider.id}`
            );
        }),
    });
};
const ProvidersForm = index.withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

const SignInAndUpHeader = index.withOverride("ThirdPartySignInAndUpHeader", function ThirdPartySignInAndUpHeader() {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        Object.assign({ "data-supertokens": "headerTitle" }, { children: t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE") })
    );
});

const SignInAndUpTheme = (props) => {
    return jsxRuntime.jsxs(
        "div",
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInAndUpHeader, {}),
                                    jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                    props.featureState.error &&
                                        jsxRuntime.jsx(index.GeneralError, { error: props.featureState.error }),
                                    jsxRuntime.jsx(ProvidersForm, Object.assign({}, props)),
                                    jsxRuntime.jsx(SignUpFooter, {
                                        privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                                        termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
                                    }),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
const SignInAndUpThemeWrapper = (props) => {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        Object.assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    Object.assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style],
                        },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, Object.assign({}, props)) }
                    )
                ),
            }
        )
    );
};

const defaultTranslationsThirdParty = {
    en: Object.assign(Object.assign({}, index.defaultTranslationsCommon.en), {
        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
        THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
    }),
};

const useFeatureReducer = () => {
    return React__namespace.useReducer(
        (oldState, action) => {
            switch (action.type) {
                case "setError":
                    return Object.assign(Object.assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {},
        () => {
            let error = undefined;
            const errorQueryParam = sessionAuth.getQueryParams("error");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "no_email_present") {
                    error = "THIRD_PARTY_ERROR_NO_EMAIL";
                } else {
                    const customError = sessionAuth.getQueryParams("message");
                    if (customError === null) {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else {
                        error = customError;
                    }
                }
            }
            return {
                error,
            };
        }
    );
};
function useChildProps(recipe) {
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe.recipeImpl),
        [recipe]
    );
    return React.useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        const providers = recipe.config.signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
        }));
        return {
            providers: providers,
            recipeImplementation,
            config: recipe.config,
            recipe,
        };
    }, [recipe]);
}
const SignInAndUpFeature = (props) => {
    const [state, dispatch] = useFeatureReducer();
    const childProps = useChildProps(props.recipe);
    const componentOverrides = props.recipe.config.override.components;
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        Object.assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    Object.assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SignInAndUpThemeWrapper,
                                            Object.assign({}, childProps, { featureState: state, dispatch: dispatch })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, (child) => {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    Object.assign(Object.assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch,
                                                    })
                                                );
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};
const getModifiedRecipeImplementation = (origImpl) => {
    return Object.assign({}, origImpl);
};

/*
 * Component.
 */
class ThirdPartySignInAndUpCallbackTheme extends React.PureComponent {
    constructor() {
        /*
         * Methods.
         */
        super(...arguments);
        this.render = () => {
            return jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "container" },
                    {
                        children: jsxRuntime.jsx(
                            "div",
                            Object.assign(
                                { "data-supertokens": "row" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "spinner" },
                                            { children: jsxRuntime.jsx(spinnerIcon.SpinnerIcon, {}) }
                                        )
                                    ),
                                }
                            )
                        ),
                    }
                )
            );
        };
    }
}
const SignInAndUpCallbackThemeWithOverride = index.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
const SignInAndUpCallbackTheme = (props) => {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        ThemeBase,
        Object.assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style] },
            { children: jsxRuntime.jsx(SignInAndUpCallbackThemeWithOverride, {}) }
        )
    );
};

const SignInAndUpCallback$1 = (props) => {
    const userContext = sessionAuth.useUserContext();
    const verifyCode = React.useCallback(() => {
        return props.recipe.recipeImpl.signInAndUp({
            userContext,
        });
    }, [props.recipe, props.history, userContext]);
    const handleVerifyResponse = React.useCallback(
        (response) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                    return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                        history: props.history,
                        queryParams: {
                            error: "no_email_present",
                        },
                        redirectBack: false,
                    });
                }
                if (response.status === "OK") {
                    const stateResponse = props.recipe.recipeImpl.getStateAndOtherInfoFromStorage({
                        userContext,
                    });
                    const redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                    return sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            rid: props.recipe.config.recipeId,
                            successRedirectContext: {
                                action: "SUCCESS",
                                isNewUser: response.createdNewUser,
                                redirectToPath,
                            },
                        },
                        userContext,
                        props.history
                    );
                }
            }),
        [props.recipe, props.history, userContext]
    );
    const handleError = React.useCallback(
        (err) => {
            if (index.STGeneralError.isThisError(err)) {
                return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            }
            return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
            });
        },
        [props.recipe, props.history]
    );
    sessionAuth.useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);
    const componentOverrides = props.recipe.config.override.components;
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        Object.assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    Object.assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInAndUpCallbackTheme, { config: props.recipe.config }),
                                    props.children,
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

var recipeImplementation$1 = {};

var recipeImplementation = {};

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var __assign =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(recipeImplementation, "__esModule", { value: true });
recipeImplementation.getRecipeImplementation = void 0;
var querier_1 = index.querier;
var utils_1 = recipe.utils;
var error_1 = index.error;
var windowHandler_1 = recipe.windowHandler;
function getRecipeImplementation$1(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        getStateAndOtherInfoFromStorage: function () {
            /**
             * This function can also be used to decide which flow to use in the UI
             * (For example routing in supertokens-auth-react), which means we can
             * not make this an async function.
             *
             * To allow for this and allow for storage functions to be async where
             * possible we call the sync version of getItem here
             */
            var stateFromStorage =
                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.getItemSync(
                    "supertokens-oauth-state-2"
                );
            if (stateFromStorage === null) {
                return undefined;
            }
            try {
                return JSON.parse(stateFromStorage);
            } catch (_a) {
                return undefined;
            }
        },
        setStateAndOtherInfoToStorage: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = JSON.stringify(__assign({}, input.state));
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.sessionStorage.setItem(
                                    "supertokens-oauth-state-2",
                                    value
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateToSendToAuthProvider,
                    stateExpiry,
                    urlResponse,
                    urlObj,
                    alreadyContainsRedirectURI,
                    urlWithState;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stateToSendToAuthProvider = this.generateStateToSendToOAuthProvider({
                                userContext: input.userContext,
                            });
                            stateExpiry = Date.now() + 1000 * 60 * 10;
                            // 2. Store state in Session Storage.
                            return [
                                4 /*yield*/,
                                this.setStateAndOtherInfoToStorage({
                                    state: {
                                        stateForAuthProvider: stateToSendToAuthProvider,
                                        providerId: input.providerId,
                                        expiresAt: stateExpiry,
                                        authorisationURL: input.authorisationURL,
                                        providerClientId: input.providerClientId,
                                    },
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            // 2. Store state in Session Storage.
                            _a.sent();
                            return [
                                4 /*yield*/,
                                this.getAuthorisationURLFromBackend({
                                    providerId: input.providerId,
                                    userContext: input.userContext,
                                    options: input.options,
                                }),
                            ];
                        case 2:
                            urlResponse = _a.sent();
                            urlObj = new URL(urlResponse.url);
                            alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;
                            urlWithState = alreadyContainsRedirectURI
                                ? (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      state: stateToSendToAuthProvider,
                                  })
                                : (0, utils_1.appendQueryParamsToURL)(urlResponse.url, {
                                      state: stateToSendToAuthProvider,
                                      redirect_uri: input.authorisationURL,
                                  });
                            return [2 /*return*/, urlWithState];
                    }
                });
            });
        },
        getAuthorisationURLFromBackend: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/authorisationurl",
                                    {},
                                    { thirdPartyId: input.providerId },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "GET_AUTHORISATION_URL",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    url: jsonBody.url,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        signInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stateFromStorage,
                    stateFromQueryParams,
                    verifiedState,
                    code,
                    errorInQuery,
                    _a,
                    jsonBody,
                    fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            stateFromStorage = this.getStateAndOtherInfoFromStorage({
                                userContext: input.userContext,
                            });
                            stateFromQueryParams = this.getAuthStateFromURL({
                                userContext: input.userContext,
                            });
                            return [
                                4 /*yield*/,
                                this.verifyAndGetStateOrThrowError({
                                    stateFromAuthProvider: stateFromQueryParams,
                                    stateObjectFromStorage: stateFromStorage,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            verifiedState = _b.sent();
                            code = this.getAuthCodeFromURL({
                                userContext: input.userContext,
                            });
                            errorInQuery = this.getAuthErrorFromURL({
                                userContext: input.userContext,
                            });
                            if (errorInQuery !== undefined) {
                                /**
                                 * If an error occurs the auth provider will send an additional query param
                                 * 'error' which will be a code that represents what error occured. Since the
                                 * error is not end-user friendly we throw a normal Javascript Error instead
                                 * of STGeneralError
                                 *
                                 * Explained in detail in the RFC:
                                 * https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
                                 */
                                throw new Error("Auth provider responded with error: ".concat(errorInQuery));
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            code: code,
                                            thirdPartyId: verifiedState.providerId,
                                            redirectURI: verifiedState.authorisationURL,
                                            clientId: verifiedState.providerClientId,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        options: input.options,
                                        userContext: input.userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "THIRD_PARTY_SIGN_IN_UP",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 2:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            if (jsonBody.status === "FIELD_ERROR") {
                                throw new error_1.default(jsonBody.error);
                            }
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        generateStateToSendToOAuthProvider: function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (
                        input.stateObjectFromStorage === undefined ||
                        input.stateObjectFromStorage.stateForAuthProvider === undefined
                    ) {
                        throw new Error("No valid auth state present in session storage");
                    }
                    if (input.stateFromAuthProvider === undefined) {
                        throw new Error("No state recieved from auth provider");
                    }
                    if (input.stateObjectFromStorage.expiresAt < Date.now()) {
                        throw new Error("Auth state verification failed. The auth provider took too long to respond");
                    }
                    if (input.stateFromAuthProvider !== input.stateObjectFromStorage.stateForAuthProvider) {
                        throw new Error(
                            "Auth state verification failed. The auth provider responded with an invalid state"
                        );
                    }
                    return [2 /*return*/, input.stateObjectFromStorage];
                });
            });
        },
        getAuthCodeFromURL: function () {
            var authCodeFromURL = (0, utils_1.getQueryParams)("code");
            if (authCodeFromURL === undefined) {
                return "";
            }
            return authCodeFromURL;
        },
        getAuthErrorFromURL: function () {
            return (0, utils_1.getQueryParams)("error");
        },
        getAuthStateFromURL: function () {
            var stateFromURL = (0, utils_1.getQueryParams)("state");
            if (stateFromURL === undefined) {
                return "";
            }
            return stateFromURL;
        },
    };
}
recipeImplementation.default = getRecipeImplementation$1;
recipeImplementation.getRecipeImplementation = getRecipeImplementation$1;

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    let d = recipeImplementation;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(recipeImplementation$1);

function getRecipeImplementation(recipeInput) {
    const webJsImplementation = recipeImplementation$1.getRecipeImplementation({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        getAuthorisationURLFromBackend: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.getAuthorisationURLFromBackend.bind(this)(
                    Object.assign({}, input)
                );
                return response;
            });
        },
        signInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.signInAndUp.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "SUCCESS",
                        isNewUser: response.createdNewUser,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return webJsImplementation.getStateAndOtherInfoFromStorage.bind(this)({
                userContext: input.userContext,
            });
        },
        setStateAndOtherInfoToStorage: function (input) {
            return webJsImplementation.setStateAndOtherInfoToStorage.bind(this)({
                state: Object.assign(Object.assign({}, input.state), {
                    rid: recipeInput.recipeId,
                    redirectToPath: sessionAuth.getRedirectToPathFromURL(),
                }),
                userContext: input.userContext,
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return webJsImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(this)(
                    Object.assign({}, input)
                );
            });
        },
        getAuthStateFromURL: function (input) {
            return webJsImplementation.getAuthStateFromURL.bind(this)(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJsImplementation.generateStateToSendToOAuthProvider.bind(this)(Object.assign({}, input));
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsImplementation.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },
        getAuthCodeFromURL: function (input) {
            return webJsImplementation.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
        getAuthErrorFromURL: function (input) {
            return webJsImplementation.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}

/*
 * Class.
 */
class ThirdParty extends authWidgetWrapper.AuthRecipe {
    constructor(config) {
        super(normaliseThirdPartyConfig(config));
        /*
         * Instance methods.
         */
        this.getFeatures = () => {
            const features = {};
            if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (prop) => this.getFeatureComponent("signinup", prop),
                };
            }
            // Add callback route for each provider.
            this.config.signInAndUpFeature.providers.forEach((provider) => {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath(`/callback/${provider.id}`)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: () => matchRecipeIdUsingState(this, {}),
                    component: (prop) => this.getFeatureComponent("signinupcallback", prop),
                };
            });
            return features;
        };
        this.getFeatureComponent = (componentName, props) => {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        Object.assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authWidgetWrapper.AuthWidgetWrapper,
                                    Object.assign(
                                        { authRecipe: this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                Object.assign({ recipe: this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        Object.assign(
                            { userContext: props.userContext },
                            { children: jsxRuntime.jsx(SignInAndUpFeature, Object.assign({ recipe: this }, props)) }
                        )
                    );
                }
            } else if (componentName === "signinupcallback") {
                return jsxRuntime.jsx(
                    sessionAuth.UserContextWrapper,
                    Object.assign(
                        { userContext: props.userContext },
                        { children: jsxRuntime.jsx(SignInAndUpCallback$1, Object.assign({ recipe: this }, props)) }
                    )
                );
            } else {
                throw new Error("Should never come here");
            }
        };
        this.getDefaultRedirectionURL = (context) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        const builder = new index.OverrideableBuilder_1(
            getRecipeImplementation({
                appInfo: this.config.appInfo,
                recipeId: this.config.recipeId,
                onHandleEvent: this.config.onHandleEvent,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }
    static init(config) {
        return (appInfo) => {
            ThirdParty.instance = new ThirdParty(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: ThirdParty.RECIPE_ID })
            );
            return ThirdParty.instance;
        };
    }
    static getInstanceOrThrow() {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            let error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    }
}
ThirdParty.RECIPE_ID = "thirdparty";

/*
 * Class.
 */
class Apple extends Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        super({
            id: "apple",
            name: "Apple",
            clientId: config === null || config === void 0 ? void 0 : config.clientId,
            getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
        });
        this.getButton = () => {
            if (this.buttonComponent !== undefined) {
                return this.buttonComponent;
            }
            return this.getDefaultButton();
        };
        this.getLogo = () => {
            return jsxRuntime.jsx(
                "svg",
                Object.assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15.614",
                        height: "18",
                        viewBox: "0 0 15.614 18.737",
                    },
                    {
                        children: jsxRuntime.jsxs(
                            "g",
                            Object.assign(
                                {
                                    id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701",
                                    transform: "translate(-2)",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91415",
                                            d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z",
                                            style: { fill: "#000" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#000" },
                                            transform: "translate(-2.193)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#000" },
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        if (config === undefined) {
            return;
        }
        this.buttonComponent = config.buttonComponent;
    }
    /*
     * Static Methods
     */
    static init(config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    }
}

/*
 * Class.
 */
class Google extends Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        super({
            id: "google",
            name: "Google",
            clientId: config === null || config === void 0 ? void 0 : config.clientId,
            getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
        });
        this.getButton = () => {
            if (this.buttonComponent !== undefined) {
                return this.buttonComponent;
            }
            return this.getDefaultButton();
        };
        this.getLogo = () => {
            return jsxRuntime.jsxs(
                "svg",
                Object.assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "18px", height: "18px" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#FFC107",
                                d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FF3D00",
                                d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#4CAF50",
                                d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#1976D2",
                                d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                        ],
                    }
                )
            );
        };
        if (config === undefined) {
            return;
        }
        this.buttonComponent = config.buttonComponent;
    }
    /*
     * Static Methods
     */
    static init(config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        Google.instance = undefined;
        return;
    }
}

/*
 * Class.
 */
class Facebook extends Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        super({
            id: "facebook",
            name: "Facebook",
            clientId: config === null || config === void 0 ? void 0 : config.clientId,
            getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
        });
        this.getButton = () => {
            if (this.buttonComponent !== undefined) {
                return this.buttonComponent;
            }
            return this.getDefaultButton();
        };
        this.getLogo = () => {
            return jsxRuntime.jsx(
                "svg",
                Object.assign(
                    {
                        fill: "#1777F2",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 30 30",
                        width: "24px",
                        height: "24px",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            d: "M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z",
                        }),
                    }
                )
            );
        };
        if (config === undefined) {
            return;
        }
        this.buttonComponent = config.buttonComponent;
    }
    /*
     * Static Methods
     */
    static init(config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    }
}

/*
 * Class.
 */
class Github extends Provider {
    /*
     * Constructor.
     */
    constructor(config) {
        super({
            id: "github",
            name: "GitHub",
            clientId: config === null || config === void 0 ? void 0 : config.clientId,
            getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
        });
        this.getButton = () => {
            if (this.buttonComponent !== undefined) {
                return this.buttonComponent;
            }
            return this.getDefaultButton();
        };
        this.getLogo = () => {
            return jsxRuntime.jsx(
                "svg",
                Object.assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "17.556", viewBox: "0 0 18 17.556" },
                    {
                        children: jsxRuntime.jsx("path", {
                            fill: "#000",
                            fillRule: "evenodd",
                            d: "M145.319 107.44a9 9 0 0 0-2.844 17.54c.45.082.614-.2.614-.434 0-.214-.008-.78-.012-1.531-2.5.544-3.032-1.206-3.032-1.206a2.384 2.384 0 0 0-1-1.317c-.817-.559.062-.547.062-.547a1.89 1.89 0 0 1 1.378.927 1.916 1.916 0 0 0 2.619.748 1.924 1.924 0 0 1 .571-1.2c-2-.227-4.1-1-4.1-4.448a3.479 3.479 0 0 1 .927-2.415 3.233 3.233 0 0 1 .088-2.382s.755-.242 2.475.923a8.535 8.535 0 0 1 4.506 0c1.718-1.165 2.472-.923 2.472-.923a3.234 3.234 0 0 1 .09 2.382 3.473 3.473 0 0 1 .925 2.415c0 3.458-2.1 4.218-4.11 4.441a2.149 2.149 0 0 1 .611 1.667c0 1.2-.011 2.174-.011 2.469 0 .24.162.52.619.433a9 9 0 0 0-2.851-17.539z",
                            transform: "translate(-136.32 -107.44)",
                        }),
                    }
                )
            );
        };
        if (config === undefined) {
            return;
        }
        this.buttonComponent = config.buttonComponent;
    }
    /*
     * Static Methods
     */
    static init(config) {
        if (Github.instance !== undefined) {
            console.warn("Github Provider was already initialized");
            return Github.instance;
        }
        Github.instance = new Github(config);
        return Github.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        Github.instance = undefined;
        return;
    }
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
class Wrapper {
    /*
     * Static attributes.
     */
    static init(config) {
        return ThirdParty.init(config);
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static redirectToThirdPartyLogin(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipeInstance = ThirdParty.getInstanceOrThrow();
            return redirectToThirdPartyLogin$1({
                thirdPartyId: input.thirdPartyId,
                config: recipeInstance.config,
                userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                recipeImplementation: recipeInstance.recipeImpl,
            });
        });
    }
    static getStateAndOtherInfoFromStorage(input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static setStateAndOtherInfoToStorage(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getAuthorisationURLWithQueryParamsAndSetState(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getAuthorisationURLFromBackend(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static signInAndUp(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().recipeImpl.signInAndUp(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static generateStateToSendToOAuthProvider(input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static verifyAndGetStateOrThrowError(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdParty.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getAuthCodeFromURL(input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getAuthErrorFromURL(input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getAuthStateFromURL(input) {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
}
/*
 * Providers
 */
Wrapper.Google = Google;
Wrapper.Apple = Apple;
Wrapper.Facebook = Facebook;
Wrapper.Github = Github;
Wrapper.SignInAndUp = (prop = {}) => ThirdParty.getInstanceOrThrow().getFeatureComponent("signinup", prop);
Wrapper.SignInAndUpTheme = SignInAndUpThemeWrapper;
Wrapper.SignInAndUpCallback = (prop) => ThirdParty.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
Wrapper.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
const verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
const getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
const getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
const getAuthStateFromURL = Wrapper.getAuthStateFromURL;
const signInAndUp = Wrapper.signInAndUp;
const SignInAndUp = Wrapper.SignInAndUp;
const SignInAndUpCallback = Wrapper.SignInAndUpCallback;

exports.Apple = Apple;
exports.Facebook = Facebook;
exports.Github = Github;
exports.Google = Google;
exports.ProvidersForm = ProvidersForm;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.ThirdParty = ThirdParty;
exports.Wrapper = Wrapper;
exports.defaultTranslationsThirdParty = defaultTranslationsThirdParty;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getRecipeImplementation = getRecipeImplementation;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin$1;
exports.redirectToThirdPartyLogin$1 = redirectToThirdPartyLogin;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
//# sourceMappingURL=thirdparty-shared.js.map
