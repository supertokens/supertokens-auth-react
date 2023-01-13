"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var React = require("react");
var index = require("./index3.js");
var recipe = require("./emailpassword-shared2.js");
var thirdparty = require("./thirdparty-shared.js");
var translationContext = require("./translationContext.js");
require("./recipe.js");
require("./session-shared2.js");
require("./index2.js");
require("react-dom");
require("./arrowLeftIcon.js");
require("./emailpassword-shared.js");
require("./index.js");
require("./emailverification-shared.js");
require("./spinnerIcon.js");

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
function normaliseThirdPartyEmailPasswordConfig(config) {
    const disableEmailPassword = config.disableEmailPassword === true;
    if (
        disableEmailPassword &&
        (config.signInAndUpFeature === undefined ||
            config.signInAndUpFeature.providers === undefined ||
            config.signInAndUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
    const override = Object.assign(
        { functions: (originalImplementation) => originalImplementation, components: {} },
        config.override
    );
    const signInAndUpFeature = normaliseSignInUpFeatureConfig(config.signInAndUpFeature);
    return Object.assign(Object.assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
        signInAndUpFeature,
        oAuthCallbackScreen: config.oAuthCallbackScreen,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        disableEmailPassword,
        override,
    });
}
function normaliseSignInUpFeatureConfig(config) {
    const disableDefaultUI =
        config === undefined || config.disableDefaultUI === undefined ? false : config.disableDefaultUI;
    const defaultToSignUp =
        config === undefined || config.defaultToSignUp === undefined ? false : config.defaultToSignUp;
    return Object.assign(Object.assign({}, config), {
        disableDefaultUI,
        defaultToSignUp,
        style: config === undefined || config.style === undefined ? "" : config.style,
    });
}

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 250, 250, 250;\n    --palette-selectedBackground: 238, 238, 238;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-success-bg: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-error-bg: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 33, 33, 33;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-error-bg));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-success-bg));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(1.1);\n            filter: brightness(1.1);\n}\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n[data-supertokens~="thirdPartyEmailPasswordDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="thirdPartyEmailPasswordDividerOr"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n[data-supertokens~="providerButton"] {\n    margin: auto !important;\n    max-width: 240px !important;\n}\n[data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px !important;\n}\n';

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

/*
 * Component.
 */
const Header = index.withOverride(
    "ThirdPartyEmailPasswordHeader",
    function ThirdPartyEmailPasswordHeader({ isSignUp, setIsSignUp }) {
        /*
         * Render.
         */
        if (isSignUp === true) {
            return jsxRuntime.jsx(recipe.SignUpHeader, { onClick: () => setIsSignUp(false) });
        } else {
            return jsxRuntime.jsx(recipe.SignInHeader, { onClick: () => setIsSignUp(true) });
        }
    }
);

const SignInAndUpTheme = (props) => {
    const t = translationContext.useTranslation();
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
                                    jsxRuntime.jsx(Header, {
                                        isSignUp: props.epState.isSignUp,
                                        setIsSignUp: (isSignUp) =>
                                            props.epDispatch({ type: isSignUp ? "setSignUp" : "setSignIn" }),
                                    }),
                                    props.commonState.error &&
                                        jsxRuntime.jsx(index.GeneralError, { error: props.commonState.error }),
                                    props.tpChildProps !== undefined &&
                                        jsxRuntime.jsx(
                                            thirdparty.ProvidersForm,
                                            Object.assign({}, props.tpChildProps, {
                                                featureState: props.tpState,
                                                dispatch: props.tpDispatch,
                                            })
                                        ),
                                    props.config.disableEmailPassword !== true &&
                                        props.thirdPartyRecipe !== undefined &&
                                        jsxRuntime.jsxs(
                                            "div",
                                            Object.assign(
                                                { "data-supertokens": "thirdPartyEmailPasswordDivider" },
                                                {
                                                    children: [
                                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                                        jsxRuntime.jsx(
                                                            "div",
                                                            Object.assign(
                                                                {
                                                                    "data-supertokens":
                                                                        "thirdPartyEmailPasswordDividerOr",
                                                                },
                                                                {
                                                                    children: t(
                                                                        "THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR"
                                                                    ),
                                                                }
                                                            )
                                                        ),
                                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                                    ],
                                                }
                                            )
                                        ),
                                    props.epChildProps !== undefined &&
                                        (props.epState.isSignUp
                                            ? jsxRuntime.jsx(
                                                  recipe.SignUpForm,
                                                  Object.assign({}, props.epChildProps.signUpForm, {
                                                      footer: jsxRuntime.jsx(recipe.SignUpFooter, {
                                                          privacyPolicyLink:
                                                              props.epChildProps.config.signInAndUpFeature.signUpForm
                                                                  .privacyPolicyLink,
                                                          termsOfServiceLink:
                                                              props.epChildProps.config.signInAndUpFeature.signUpForm
                                                                  .termsOfServiceLink,
                                                      }),
                                                  })
                                              )
                                            : jsxRuntime.jsx(
                                                  recipe.SignInForm,
                                                  Object.assign({}, props.epChildProps.signInForm, {
                                                      footer: jsxRuntime.jsx(recipe.SignInFooter, {
                                                          onClick: props.epChildProps.signInForm.forgotPasswordClick,
                                                      }),
                                                  })
                                              )),
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
function SignInAndUpThemeWrapper(props) {
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
}

const defaultTranslationsThirdPartyEmailPassword = {
    en: Object.assign(
        Object.assign(
            Object.assign({}, thirdparty.defaultTranslationsThirdParty.en),
            recipe.defaultTranslationsEmailPassword.en
        ),
        { THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or" }
    ),
};

const SignInAndUp$1 = (props) => {
    const [tpState, tpDispatch] = thirdparty.useFeatureReducer();
    const [epState, epDispatch] = recipe.useFeatureReducer(props.recipe.emailPasswordRecipe);
    const [combinedState, dispatch] = React__namespace.useReducer(
        (state, action) => {
            switch (action.type) {
                case "setSignIn":
                    return Object.assign(Object.assign({}, state), { error: undefined });
                case "setSignUp":
                    return Object.assign(Object.assign({}, state), { error: undefined });
                case "setError":
                    return Object.assign(Object.assign({}, state), { error: action.error });
                default:
                    return state;
            }
        },
        { error: tpState.error || epState.error }
    );
    const combinedTPDispatch = React__namespace.useCallback(
        (action) => {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    const tpChildProps = thirdparty.useChildProps(props.recipe.thirdPartyRecipe);
    const combinedEPDispatch = React__namespace.useCallback(
        (action) => {
            dispatch(action);
            epDispatch(action);
        },
        [epDispatch, dispatch]
    );
    const epChildProps = recipe.useChildProps(
        props.recipe.emailPasswordRecipe,
        epState,
        combinedEPDispatch,
        props.history
    );
    const componentOverrides = props.recipe.config.override.components;
    const childProps = {
        emailPasswordRecipe: props.recipe.emailPasswordRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps,
        epState,
        epDispatch: combinedEPDispatch,
        epChildProps,
    };
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        Object.assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    Object.assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsThirdPartyEmailPassword,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInAndUpThemeWrapper, Object.assign({}, childProps)),
                                    props.children &&
                                        React__namespace.Children.map(props.children, (child) => {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(child, childProps);
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
function getRecipeImplementation$2(originalImplementation) {
    return {
        doesEmailExist: originalImplementation.doesEmailExist.bind(originalImplementation),
        sendPasswordResetEmail: originalImplementation.sendPasswordResetEmail.bind(originalImplementation),
        getResetPasswordTokenFromURL: originalImplementation.getResetPasswordTokenFromURL.bind(originalImplementation),
        submitNewPassword: originalImplementation.submitNewPassword.bind(originalImplementation),
        signIn: originalImplementation.emailPasswordSignIn.bind(originalImplementation),
        signUp: originalImplementation.emailPasswordSignUp.bind(originalImplementation),
    };
}

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
function getRecipeImplementation$1(originalImplementation) {
    return {
        generateStateToSendToOAuthProvider:
            originalImplementation.generateStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getAuthStateFromURL.bind(originalImplementation),
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getStateAndOtherInfoFromStorage.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setStateAndOtherInfoToStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetStateOrThrowError.bind(originalImplementation),
    };
}

function getRecipeImplementation(recipeInput) {
    const emailpasswordImpl = recipe.getRecipeImplementation(Object.assign({}, recipeInput));
    const thirdPartyImpl = thirdparty.getRecipeImplementation(Object.assign({}, recipeInput));
    return {
        submitNewPassword: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return emailpasswordImpl.submitNewPassword.bind(getRecipeImplementation$2(this))(input);
            });
        },
        sendPasswordResetEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return emailpasswordImpl.sendPasswordResetEmail.bind(getRecipeImplementation$2(this))(input);
            });
        },
        doesEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return emailpasswordImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input);
            });
        },
        getResetPasswordTokenFromURL: function (input) {
            return emailpasswordImpl.getResetPasswordTokenFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        emailPasswordSignIn: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return yield emailpasswordImpl.signIn.bind(getRecipeImplementation$2(this))(input);
            });
        },
        emailPasswordSignUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return emailpasswordImpl.signUp.bind(getRecipeImplementation$2(this))(input);
            });
        },
        getAuthorisationURLFromBackend: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return thirdPartyImpl.getAuthorisationURLFromBackend.bind(getRecipeImplementation$1(this))(input);
            });
        },
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                    getRecipeImplementation$1(this)
                )(input);
            });
        },
        thirdPartySignInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return yield thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input);
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(getRecipeImplementation$1(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(getRecipeImplementation$1(this))(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(getRecipeImplementation$1(this))(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(getRecipeImplementation$1(this))(input);
        },
    };
}

class ThirdPartyEmailPassword extends authWidgetWrapper.AuthRecipe {
    constructor(config, recipes) {
        super(normaliseThirdPartyEmailPasswordConfig(config));
        this.getFeatures = () => {
            let features = {};
            if (this.emailPasswordRecipe !== undefined) {
                features = Object.assign(Object.assign({}, features), this.emailPasswordRecipe.getFeatures());
            }
            if (this.thirdPartyRecipe !== undefined) {
                features = Object.assign(Object.assign({}, features), this.thirdPartyRecipe.getFeatures());
            }
            if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (prop) => this.getFeatureComponent("signinup", prop),
                };
            }
            return features;
        };
        this.getDefaultRedirectionURL = (context) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                if (context.action === "RESET_PASSWORD") {
                    if (this.emailPasswordRecipe === undefined) {
                        throw new Error("Should not come here...");
                    }
                    return this.emailPasswordRecipe.getDefaultRedirectionURL(context);
                } else {
                    return this.getAuthRecipeDefaultRedirectionURL(context);
                }
            });
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
                                                SignInAndUp$1,
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
                            { children: jsxRuntime.jsx(SignInAndUp$1, Object.assign({ recipe: this }, props)) }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                if (this.emailPasswordRecipe === undefined) {
                    throw new Error("Should not come here...");
                }
                return this.emailPasswordRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                    );
                }
                return this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                throw new Error("Should not come here...");
            }
        };
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
        this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : this.config.disableEmailPassword
                ? undefined
                : new recipe.EmailPassword({
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      getRedirectionURL: this.config.getRedirectionURL,
                      onHandleEvent: this.config.onHandleEvent,
                      style: this.config.rootStyle,
                      preAPIHook: this.config.preAPIHook,
                      resetPasswordUsingTokenFeature: this.config.resetPasswordUsingTokenFeature,
                      signInAndUpFeature: this.config.signInAndUpFeature,
                      useShadowDom: this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: (_) => {
                              return getRecipeImplementation$2(this.recipeImpl);
                          },
                          components: this.config.override.components,
                      },
                  });
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.signInAndUpFeature.providers === undefined ||
                  this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new thirdparty.ThirdParty({
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      getRedirectionURL: this.config.getRedirectionURL,
                      style: this.config.rootStyle,
                      onHandleEvent: this.config.onHandleEvent,
                      preAPIHook: this.config.preAPIHook,
                      signInAndUpFeature: this.config.signInAndUpFeature,
                      oAuthCallbackScreen: this.config.oAuthCallbackScreen,
                      useShadowDom: this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: (_) => {
                              return getRecipeImplementation$1(this.recipeImpl);
                          },
                          components: this.config.override.components,
                      },
                  });
    }
    /*
     * Static methods.
     */
    static init(config) {
        return (appInfo) => {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: ThirdPartyEmailPassword.RECIPE_ID }),
                {
                    emailPasswordInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyEmailPassword.instance;
        };
    }
    static getInstanceOrThrow() {
        if (ThirdPartyEmailPassword.instance === undefined) {
            let error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method." +
                "See https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyEmailPassword.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    }
}
ThirdPartyEmailPassword.RECIPE_ID = "thirdpartyemailpassword";

class Wrapper {
    static init(config) {
        return ThirdPartyEmailPassword.init(config);
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static submitNewPassword(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static sendPasswordResetEmail(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static emailPasswordSignUp(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignUp(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static emailPasswordSignIn(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignIn(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static doesEmailExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getResetPasswordTokenFromURL(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static redirectToThirdPartyLogin(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipeInstance = ThirdPartyEmailPassword.getInstanceOrThrow();
            if (recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
                );
            }
            return thirdparty.redirectToThirdPartyLogin({
                thirdPartyId: input.thirdPartyId,
                config: recipeInstance.thirdPartyRecipe.config,
                userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
            });
        });
    }
    static getAuthorisationURLFromBackend(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static thirdPartySignInAndUp(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static getStateAndOtherInfoFromStorage(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static setStateAndOtherInfoToStorage(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getAuthorisationURLWithQueryParamsAndSetState(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static generateStateToSendToOAuthProvider(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static verifyAndGetStateOrThrowError(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getAuthCodeFromURL(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getAuthErrorFromURL(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getAuthStateFromURL(input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
}
Wrapper.Google = thirdparty.Google;
Wrapper.Apple = thirdparty.Apple;
Wrapper.Facebook = thirdparty.Facebook;
Wrapper.Github = thirdparty.Github;
Wrapper.SignInAndUp = (prop = {}) => ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
Wrapper.SignInAndUpTheme = SignInAndUpThemeWrapper;
Wrapper.ThirdPartySignInAndUpCallback = (prop) =>
    ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
Wrapper.ResetPasswordUsingToken = (prop) =>
    ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
Wrapper.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
Wrapper.ThirdPartySignInAndUpCallbackTheme = thirdparty.SignInAndUpCallbackTheme;
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const SignInAndUp = Wrapper.SignInAndUp;
const ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const emailPasswordSignIn = Wrapper.emailPasswordSignIn;
const emailPasswordSignUp = Wrapper.emailPasswordSignUp;
const doesEmailExist = Wrapper.doesEmailExist;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
const verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
const getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
const getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
const getAuthStateFromURL = Wrapper.getAuthStateFromURL;

exports.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
exports.Apple = thirdparty.Apple;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Google = thirdparty.Google;
exports.ThirdPartySignInAndUpCallbackTheme = thirdparty.SignInAndUpCallbackTheme;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpTheme = SignInAndUpThemeWrapper;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.emailPasswordSignIn = emailPasswordSignIn;
exports.emailPasswordSignUp = emailPasswordSignUp;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
exports.signOut = signOut;
exports.submitNewPassword = submitNewPassword;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
//# sourceMappingURL=thirdpartyemailpassword.js.map
