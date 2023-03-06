"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var recipe = require("./passwordless-shared.js");
var thirdparty = require("./thirdparty-shared.js");
var translations = require("./translations.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
require("./index.js");
var utils = require("./authRecipe-shared.js");
var translationContext = require("./translationContext.js");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/session/recipe");
require("supertokens-web-js/utils/error");
require("supertokens-web-js/recipe/passwordless/utils");
require("./spinnerIcon.js");
require("./emailpassword-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("./checkedRoundIcon.js");
require("./emailpassword-shared3.js");
require("supertokens-web-js/recipe/passwordless/recipeImplementation");
require("supertokens-web-js/recipe/thirdparty/recipeImplementation");
require("react-dom");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
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

var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var _a = translations.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    -webkit-animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n            animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n[data-supertokens~="codeInputLabelWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="resendCodeBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="resendCodeBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="resendCodeBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] .iti [data-supertokens~="input"] {\n    padding-left: 15px;\n}\n[data-supertokens~="phoneInputWrapper"] .iti {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n.iti__country-list {\n    border: 0;\n    top: 40px;\n    width: min(72.2vw, 320px);\n    border-radius: 6;\n    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.16);\n}\n.iti__country {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    cursor: pointer;\n\n    padding: 0 8px;\n}\n.iti__country-name {\n    color: var(--palette-textLabel);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    margin: "0 16px";\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n[data-supertokens~="thirdPartyPasswordlessDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="thirdPartyPasswordlessDividerText"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n[data-supertokens~="providerButton"] {\n    margin: auto !important;\n    max-width: 240px !important;\n}\n[data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px !important;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles,
        loadDefaultFont = _a.loadDefaultFont;
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
var Header = translations.withOverride("ThirdPartyPasswordlessHeader", function ThirdPartyPasswordlessHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var SignInUpTheme = function (props) {
    var t = translationContext.useTranslation();
    if (props.activeScreen === recipe.SignInUpScreens.CloseTab) {
        return jsxRuntime.jsx(recipe.CloseTabScreen, sessionAuth.__assign({}, props.pwlessChildProps));
    } else if (props.activeScreen === recipe.SignInUpScreens.LinkSent) {
        return jsxRuntime.jsx(
            recipe.LinkSent,
            sessionAuth.__assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children:
                                    (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                                    jsxRuntime.jsxs(React__namespace.Fragment, {
                                        children: [
                                            props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeFormHeader,
                                                      sessionAuth.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          { loginAttemptInfo: props.pwlessState.loginAttemptInfo }
                                                      )
                                                  )
                                                : jsxRuntime.jsx(Header, {}),
                                            props.commonState.error &&
                                                jsxRuntime.jsx(translations.GeneralError, {
                                                    error: props.commonState.error,
                                                }),
                                            props.tpChildProps !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsx(
                                                    thirdparty.ProvidersForm,
                                                    sessionAuth.__assign({}, props.tpChildProps, {
                                                        featureState: props.tpState,
                                                        dispatch: props.tpDispatch,
                                                    })
                                                ),
                                            props.thirdPartyRecipe !== undefined &&
                                                props.passwordlessRecipe !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsxs(
                                                    "div",
                                                    sessionAuth.__assign(
                                                        { "data-supertokens": "thirdPartyPasswordlessDivider" },
                                                        {
                                                            children: [
                                                                jsxRuntime.jsx("div", {
                                                                    "data-supertokens": "divider",
                                                                }),
                                                                jsxRuntime.jsx(
                                                                    "div",
                                                                    sessionAuth.__assign(
                                                                        {
                                                                            "data-supertokens":
                                                                                "thirdPartyPasswordlessDividerText",
                                                                        },
                                                                        {
                                                                            children: t(
                                                                                "THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR"
                                                                            ),
                                                                        }
                                                                    )
                                                                ),
                                                                jsxRuntime.jsx("div", {
                                                                    "data-supertokens": "divider",
                                                                }),
                                                            ],
                                                        }
                                                    )
                                                ),
                                            props.activeScreen === recipe.SignInUpScreens.EmailForm
                                                ? jsxRuntime.jsx(
                                                      recipe.EmailForm,
                                                      sessionAuth.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.PhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.PhoneForm,
                                                      sessionAuth.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.EmailOrPhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.EmailOrPhoneForm,
                                                      sessionAuth.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeForm,
                                                      sessionAuth.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          {
                                                              loginAttemptInfo: props.pwlessState.loginAttemptInfo,
                                                              onSuccess: props.pwlessChildProps.onSuccess,
                                                          }
                                                      )
                                                  )
                                                : null,
                                        ],
                                    }),
                            }
                        )
                    ),
                    jsxRuntime.jsx(utils.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
function SignInUpThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    // By defining it in a single object here TSC can deduce the connection between props
    var childProps =
        props.passwordlessRecipe !== undefined && props.pwlessChildProps !== undefined
            ? sessionAuth.__assign(sessionAuth.__assign({}, props), {
                  activeScreen: recipe.getActiveScreen({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              })
            : sessionAuth.__assign(sessionAuth.__assign({}, props), {
                  activeScreen: undefined,
                  passwordlessRecipe: undefined,
                  pwlessChildProps: undefined,
              });
    var activeStyle;
    if (childProps.activeScreen === recipe.SignInUpScreens.CloseTab) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.closeTabScreenStyle;
    } else if (childProps.activeScreen === recipe.SignInUpScreens.LinkSent) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.linkSentScreenStyle;
    } else if (childProps.activeScreen === recipe.SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.userInputCodeFormStyle;
    } else {
        // This case also includes undefined which means that passwordless is disabled
        activeStyle = props.config.thirdPartyProviderAndEmailOrPhoneFormStyle;
    }
    // This style provider will override the parent with the screen specific user config
    return jsxRuntime.jsx(
        ThemeBase,
        sessionAuth.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
            { children: jsxRuntime.jsx(SignInUpTheme, sessionAuth.__assign({}, childProps)) }
        )
    );
}
// Simple convenience function
function getCommonPwlessProps(childProps, props) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: function () {
            return props.pwlessDispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.pwlessDispatch({ type: "setError", error: error });
        },
        error: props.pwlessState.error,
    };
}

var defaultTranslationsThirdPartyPasswordless = {
    en: sessionAuth.__assign(
        sessionAuth.__assign(
            sessionAuth.__assign({}, thirdparty.defaultTranslationsThirdParty.en),
            recipe.defaultTranslationsPasswordless.en
        ),
        {
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR: "or",
        }
    ),
};

var SignInAndUp$1 = function (props) {
    var _a;
    var _b = thirdparty.useFeatureReducer(),
        tpState = _b[0],
        tpDispatch = _b[1];
    var userContext = sessionAuth.useUserContext();
    var _c = recipe.useFeatureReducer(
            (_a = props.recipe.passwordlessRecipe) === null || _a === void 0 ? void 0 : _a.recipeImpl,
            userContext
        ),
        pwlessState = _c[0],
        pwlessDispatch = _c[1];
    var recipeComponentOverrides = props.useComponentOverrides();
    var _d = React__namespace.useReducer(
            function (state, action) {
                switch (action.type) {
                    // Intentionally fall through, both of these should clear the error
                    case "startLogin":
                    case "resendCode":
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: undefined });
                    case "load":
                        if (action.loginAttemptInfo !== undefined) {
                            return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: action.error });
                        }
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), {
                            error: state.error !== undefined ? state.error : action.error,
                        });
                    // Intentionally fall through, both of these should set the error
                    case "restartFlow":
                    case "setError":
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: action.error });
                    default:
                        return state;
                }
            },
            { error: undefined },
            function () {
                // Here we want to select the more specific error message
                var error = tpState.error;
                if (
                    // If we have an error in pwless and
                    pwlessState.error !== undefined &&
                    // either we didn't have one in thirdparty or it was the default one
                    (error === undefined || error === "SOMETHING_WENT_WRONG_ERROR")
                ) {
                    error = pwlessState.error;
                }
                return {
                    error: error,
                };
            }
        ),
        combinedState = _d[0],
        dispatch = _d[1];
    var combinedTPDispatch = React__namespace.useCallback(
        function (action) {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    var tpChildProps = thirdparty.useChildProps(props.recipe.thirdPartyRecipe);
    var combinedPwlessDispatch = React__namespace.useCallback(
        function (action) {
            dispatch(action);
            pwlessDispatch(action);
        },
        [pwlessDispatch, dispatch]
    );
    var callingConsumeCodeRef = recipe.useSuccessInAnotherTabChecker(pwlessState, combinedPwlessDispatch, userContext);
    var pwlessChildProps = recipe.useChildProps(
        props.recipe.passwordlessRecipe,
        combinedPwlessDispatch,
        pwlessState,
        callingConsumeCodeRef,
        userContext,
        props.history
    );
    var childProps = {
        passwordlessRecipe: props.recipe.passwordlessRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState: tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps: tpChildProps,
        pwlessState: pwlessState,
        pwlessDispatch: combinedPwlessDispatch,
        pwlessChildProps: pwlessChildProps,
    };
    return jsxRuntime.jsx(
        translations.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
                    sessionAuth.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsThirdPartyPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInUpThemeWrapper, sessionAuth.__assign({}, childProps)),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
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

function getRecipeImplementation$2(originalImplementation) {
    return {
        clearLoginAttemptInfo: originalImplementation.clearPasswordlessLoginAttemptInfo.bind(originalImplementation),
        consumeCode: originalImplementation.consumePasswordlessCode.bind(originalImplementation),
        createCode: originalImplementation.createPasswordlessCode.bind(originalImplementation),
        doesEmailExist: originalImplementation.doesPasswordlessUserEmailExist.bind(originalImplementation),
        doesPhoneNumberExist: originalImplementation.doesPasswordlessUserPhoneNumberExist.bind(originalImplementation),
        getLoginAttemptInfo: originalImplementation.getPasswordlessLoginAttemptInfo.bind(originalImplementation),
        resendCode: originalImplementation.resendPasswordlessCode.bind(originalImplementation),
        setLoginAttemptInfo: originalImplementation.setPasswordlessLoginAttemptInfo.bind(originalImplementation),
        getLinkCodeFromURL: originalImplementation.getPasswordlessLinkCodeFromURL.bind(originalImplementation),
        getPreAuthSessionIdFromURL:
            originalImplementation.getPasswordlessPreAuthSessionIdFromURL.bind(originalImplementation),
    };
}

function getRecipeImplementation$1(originalImplementation) {
    return {
        generateStateToSendToOAuthProvider:
            originalImplementation.generateThirdPartyStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getThirdPartyAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getThirdPartyAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getThirdPartyAuthStateFromURL.bind(originalImplementation),
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getThirdPartyStateAndOtherInfoFromStorage.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setThirdPartyStateAndOtherInfoToStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetThirdPartyStateOrThrowError.bind(originalImplementation),
    };
}

function getRecipeImplementation(recipeInput) {
    var passwordlessImpl = recipe.getRecipeImplementation(sessionAuth.__assign({}, recipeInput));
    var thirdPartyImpl = thirdparty.getRecipeImplementation(sessionAuth.__assign({}, recipeInput));
    return {
        consumePasswordlessCode: function (input) {
            return passwordlessImpl.consumeCode.bind(getRecipeImplementation$2(this))(input);
        },
        createPasswordlessCode: function (input) {
            return passwordlessImpl.createCode.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, passwordlessImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input)];
                });
            });
        },
        resendPasswordlessCode: function (input) {
            return passwordlessImpl.resendCode.bind(getRecipeImplementation$2(this))(input);
        },
        clearPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.getLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        setPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return passwordlessImpl.getLinkCodeFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getAuthorisationURLFromBackend: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind(getRecipeImplementation$1(this))(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input)];
                });
            });
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(getRecipeImplementation$1(this))(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(getRecipeImplementation$1(this))(
                input
            );
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(getRecipeImplementation$1(this))(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(getRecipeImplementation$1(this))(input);
        },
    };
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
function normaliseThirdPartyPasswordlessConfig(config) {
    var _a;
    var disablePasswordless = config.disablePasswordless === true;
    var disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var thirdPartyProviderAndEmailOrPhoneFormStyle =
        ((_a = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _a === void 0
            ? void 0
            : _a.thirdPartyProviderAndEmailOrPhoneFormStyle) === undefined
            ? ""
            : config === null || config === void 0
            ? void 0
            : config.signInUpFeature.thirdPartyProviderAndEmailOrPhoneFormStyle;
    return sessionAuth.__assign(sessionAuth.__assign({}, utils.normaliseAuthRecipe(config)), {
        thirdPartyProviderAndEmailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyUserInput: disableThirdParty
            ? undefined
            : {
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: sessionAuth.__assign(sessionAuth.__assign({}, config.signInUpFeature), {
                      style: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  oAuthCallbackScreen: config.oAuthCallbackScreen,
                  useShadowDom: config.useShadowDom,
                  override: {},
              },
        passwordlessUserInput: disablePasswordless
            ? undefined
            : {
                  contactMethod: config.contactMethod,
                  style: config.style,
                  validateEmailAddress: "validateEmailAddress" in config ? config.validateEmailAddress : undefined,
                  validatePhoneNumber: "validatePhoneNumber" in config ? config.validatePhoneNumber : undefined,
                  getRedirectionURL: config.getRedirectionURL,
                  onHandleEvent: config.onHandleEvent,
                  preAPIHook: config.preAPIHook,
                  useShadowDom: config.useShadowDom,
                  signInUpFeature: sessionAuth.__assign(sessionAuth.__assign({}, config.signInUpFeature), {
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {},
              },
        override: override,
    });
}

var ThirdPartyPasswordless = /** @class */ (function (_super) {
    sessionAuth.__extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes) {
        var _this = _super.call(this, normaliseThirdPartyPasswordlessConfig(config)) || this;
        _this.getFeatures = function (useComponentOverrides) {
            var _a, _b;
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.passwordlessRecipe !== undefined) {
                features = sessionAuth.__assign(
                    sessionAuth.__assign({}, features),
                    _this.passwordlessRecipe.getFeatures(useComponentOverrides)
                );
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = sessionAuth.__assign(
                    sessionAuth.__assign({}, features),
                    _this.thirdPartyRecipe.getFeatures(useComponentOverrides)
                );
            }
            if (
                (_this.config.passwordlessUserInput !== undefined &&
                    ((_a = _this.config.passwordlessUserInput.signInUpFeature) === null || _a === void 0
                        ? void 0
                        : _a.disableDefaultUI) !== true) ||
                (_this.config.thirdpartyUserInput !== undefined &&
                    ((_b = _this.config.thirdpartyUserInput.signInAndUpFeature) === null || _b === void 0
                        ? void 0
                        : _b.disableDefaultUI) !== true)
            ) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signInUp", prop, useComponentOverrides);
                    },
                };
            }
            return sessionAuth.__assign({}, features);
        };
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "signInUp") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    utils.AuthWidgetWrapper,
                                    sessionAuth.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUp$1,
                                                sessionAuth.__assign({ recipe: _this }, props, {
                                                    useComponentOverrides: useComponentOverrides,
                                                })
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
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInAndUp$1,
                                    sessionAuth.__assign({ recipe: _this }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "linkClickedScreen") {
                if (_this.passwordlessRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return _this.passwordlessRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
            } else {
                throw new Error("Should never come here.");
            }
        };
        {
            var builder = new translations.OverrideableBuilder_1(
                getRecipeImplementation({
                    appInfo: _this.config.appInfo,
                    recipeId: _this.config.recipeId,
                    onHandleEvent: _this.config.onHandleEvent,
                    preAPIHook: _this.config.preAPIHook,
                    postAPIHook: _this.config.postAPIHook,
                })
            );
            _this.recipeImpl = builder.override(_this.config.override.functions).build();
        }
        _this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : _this.config.passwordlessUserInput === undefined
                ? undefined
                : new recipe.Passwordless(
                      sessionAuth.__assign(sessionAuth.__assign({}, _this.config.passwordlessUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: sessionAuth.__assign(
                              sessionAuth.__assign({}, _this.config.passwordlessUserInput.override),
                              {
                                  functions: function () {
                                      return getRecipeImplementation$2(_this.recipeImpl);
                                  },
                              }
                          ),
                      })
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.thirdpartyUserInput === undefined
                ? undefined
                : new thirdparty.ThirdParty(
                      sessionAuth.__assign(sessionAuth.__assign({}, _this.config.thirdpartyUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: sessionAuth.__assign(
                              sessionAuth.__assign({}, _this.config.thirdpartyUserInput.override),
                              {
                                  functions: function () {
                                      return getRecipeImplementation$1(_this.recipeImpl);
                                  },
                              }
                          ),
                      })
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyPasswordless.init = function (config) {
        return function (appInfo) {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyPasswordless.RECIPE_ID,
                }),
                {
                    passwordlessInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyPasswordless.instance;
        };
    };
    ThirdPartyPasswordless.getInstanceOrThrow = function () {
        if (ThirdPartyPasswordless.instance === undefined) {
            var error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(utils.AuthRecipe);

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return ThirdPartyPasswordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().signOut({
                        userContext: sessionAuth.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return sessionAuth.__generator(this, function (_a) {
                recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    thirdparty.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyStateAndOtherInfoFromStorage = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyStateAndOtherInfoFromStorage(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setThirdPartyStateAndOtherInfoToStorage = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setThirdPartyStateAndOtherInfoToStorage(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateThirdPartyStateToSendToOAuthProvider = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.generateThirdPartyStateToSendToOAuthProvider(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetThirdPartyStateOrThrowError = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.verifyAndGetThirdPartyStateOrThrowError(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthCodeFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthCodeFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthErrorFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthErrorFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthStateFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthStateFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.createPasswordlessCode = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return sessionAuth.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.createCode(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return sessionAuth.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.resendCode(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumePasswordlessCode = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return sessionAuth.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.consumeCode(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLinkCodeFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessPreAuthSessionIdFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesPasswordlessUserEmailExist = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserEmailExist(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserPhoneNumberExist(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLoginAttemptInfo(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setPasswordlessLoginAttemptInfo(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.clearPasswordlessLoginAttemptInfo(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.Google = thirdparty.Google;
    Wrapper.Apple = thirdparty.Apple;
    Wrapper.Facebook = thirdparty.Facebook;
    Wrapper.Github = thirdparty.Github;
    Wrapper.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    };
    Wrapper.SignInAndUpTheme = SignInUpThemeWrapper;
    Wrapper.ThirdPartySignInAndUpCallback = function (prop) {
        return ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.PasswordlessLinkClickedTheme = recipe.LinkClickedScreen;
    Wrapper.PasswordlessLinkClicked = function (prop) {
        return ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    };
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getThirdPartyStateAndOtherInfoFromStorage = Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
var setThirdPartyStateAndOtherInfoToStorage = Wrapper.setThirdPartyStateAndOtherInfoToStorage;
var getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
var generateThirdPartyStateToSendToOAuthProvider = Wrapper.generateThirdPartyStateToSendToOAuthProvider;
var verifyAndGetThirdPartyStateOrThrowError = Wrapper.verifyAndGetThirdPartyStateOrThrowError;
var getThirdPartyAuthCodeFromURL = Wrapper.getThirdPartyAuthCodeFromURL;
var getThirdPartyAuthErrorFromURL = Wrapper.getThirdPartyAuthErrorFromURL;
var getThirdPartyAuthStateFromURL = Wrapper.getThirdPartyAuthStateFromURL;
var createPasswordlessCode = Wrapper.createPasswordlessCode;
var resendPasswordlessCode = Wrapper.resendPasswordlessCode;
var consumePasswordlessCode = Wrapper.consumePasswordlessCode;
var getPasswordlessLinkCodeFromURL = Wrapper.getPasswordlessLinkCodeFromURL;
var getPasswordlessPreAuthSessionIdFromURL = Wrapper.getPasswordlessPreAuthSessionIdFromURL;
var doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
var doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
var getPasswordlessLoginAttemptInfo = Wrapper.getPasswordlessLoginAttemptInfo;
var setPasswordlessLoginAttemptInfo = Wrapper.setPasswordlessLoginAttemptInfo;
var clearPasswordlessLoginAttemptInfo = Wrapper.clearPasswordlessLoginAttemptInfo;
var SignInAndUp = Wrapper.SignInAndUp;
var ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
var PasswordlessLinkClicked = Wrapper.PasswordlessLinkClicked;
var ThirdpartyPasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.Apple = thirdparty.Apple;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Google = thirdparty.Google;
exports.PasswordlessLinkClicked = PasswordlessLinkClicked;
exports.SignInAndUp = SignInAndUp;
exports.SignInUpTheme = SignInUpThemeWrapper;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
exports.ThirdpartyPasswordlessComponentsOverrideProvider = ThirdpartyPasswordlessComponentsOverrideProvider;
exports.clearPasswordlessLoginAttemptInfo = clearPasswordlessLoginAttemptInfo;
exports.consumePasswordlessCode = consumePasswordlessCode;
exports.createPasswordlessCode = createPasswordlessCode;
exports.default = Wrapper;
exports.doesPasswordlessUserEmailExist = doesPasswordlessUserEmailExist;
exports.doesPasswordlessUserPhoneNumberExist = doesPasswordlessUserPhoneNumberExist;
exports.generateThirdPartyStateToSendToOAuthProvider = generateThirdPartyStateToSendToOAuthProvider;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
exports.getPasswordlessLinkCodeFromURL = getPasswordlessLinkCodeFromURL;
exports.getPasswordlessLoginAttemptInfo = getPasswordlessLoginAttemptInfo;
exports.getPasswordlessPreAuthSessionIdFromURL = getPasswordlessPreAuthSessionIdFromURL;
exports.getThirdPartyAuthCodeFromURL = getThirdPartyAuthCodeFromURL;
exports.getThirdPartyAuthErrorFromURL = getThirdPartyAuthErrorFromURL;
exports.getThirdPartyAuthStateFromURL = getThirdPartyAuthStateFromURL;
exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
exports.getThirdPartyStateAndOtherInfoFromStorage = getThirdPartyStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.resendPasswordlessCode = resendPasswordlessCode;
exports.setPasswordlessLoginAttemptInfo = setPasswordlessLoginAttemptInfo;
exports.setThirdPartyStateAndOtherInfoToStorage = setThirdPartyStateAndOtherInfoToStorage;
exports.signOut = signOut;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
exports.verifyAndGetThirdPartyStateOrThrowError = verifyAndGetThirdPartyStateOrThrowError;
//# sourceMappingURL=thirdpartypasswordless.js.map
