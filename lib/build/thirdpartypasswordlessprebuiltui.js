"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var passwordlessprebuiltui = require("./passwordless-shared3.js");
var thirdpartyprebuiltui = require("./thirdparty-shared2.js");
var recipe = require("./thirdpartypasswordless-shared.js");
var React = require("react");
var translations = require("./translations.js");
var generalError = require("./emailpassword-shared.js");
var translationContext = require("./translationContext.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("./recipeModule-shared.js");
require("./session-shared3.js");
require("./session-shared.js");
require("./passwordless-shared.js");
require("supertokens-web-js/utils/error");
require("./emailpassword-shared2.js");
require("./passwordless-shared2.js");
require("supertokens-web-js/recipe/passwordless");
require("./authRecipe-shared.js");
require("./checkedRoundIcon.js");
require("./emailpassword-shared7.js");
require("./emailpassword-shared5.js");
require("./arrowLeftIcon.js");
require("./thirdparty-shared.js");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdpartypasswordless");

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

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    -webkit-animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n            animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n[data-supertokens~="codeInputLabelWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="resendCodeBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="resendCodeBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="resendCodeBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] .iti [data-supertokens~="input"] {\n    padding-left: 15px;\n}\n[data-supertokens~="phoneInputWrapper"] .iti {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n.iti__country-list {\n    border: 0;\n    top: 40px;\n    width: min(72.2vw, 320px);\n    border-radius: 6;\n    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.16);\n}\n.iti__country {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    cursor: pointer;\n\n    padding: 0 8px;\n}\n.iti__country-name {\n    color: var(--palette-textLabel);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    margin: "0 16px";\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    min-width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n[data-supertokens~="thirdPartyPasswordlessDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="thirdPartyPasswordlessDividerText"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n[data-supertokens~="providerButton"] {\n    margin: auto !important;\n    max-width: 240px !important;\n}\n[data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px !important;\n}\n';

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
var Header = uiEntry.withOverride("ThirdPartyPasswordlessHeader", function ThirdPartyPasswordlessHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var SignInUpTheme = function (props) {
    var _a;
    var t = translationContext.useTranslation();
    var usesDynamicLoginMethods = genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods;
    var dynamicLoginMethods = uiEntry.useDynamicLoginMethods();
    var loginMethods;
    if (usesDynamicLoginMethods) {
        if (dynamicLoginMethods.loaded === false) {
            throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
        } else {
            loginMethods = dynamicLoginMethods.loginMethods;
        }
    }
    var hasProviders =
        ((_a = props.tpChildProps) === null || _a === void 0 ? void 0 : _a.providers) !== undefined &&
        props.tpChildProps.providers.length > 0;
    var thirdPartyEnabled =
        (usesDynamicLoginMethods === false && hasProviders) ||
        ((loginMethods === null || loginMethods === void 0 ? void 0 : loginMethods.thirdparty.enabled) && hasProviders);
    var passwordlessEnabled =
        (props.passwordlessRecipe !== undefined && usesDynamicLoginMethods === false) ||
        (loginMethods === null || loginMethods === void 0 ? void 0 : loginMethods.passwordless.enabled);
    if (thirdPartyEnabled === false && passwordlessEnabled === false) {
        return null;
    }
    if (props.activeScreen === passwordlessprebuiltui.SignInUpScreens.CloseTab) {
        return jsxRuntime.jsx(
            passwordlessprebuiltui.CloseTabScreen,
            genericComponentOverrideContext.__assign({}, props.pwlessChildProps)
        );
    } else if (props.activeScreen === passwordlessprebuiltui.SignInUpScreens.LinkSent) {
        return jsxRuntime.jsx(
            passwordlessprebuiltui.LinkSent,
            genericComponentOverrideContext.__assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children:
                                    (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                                    jsxRuntime.jsxs(React__namespace.Fragment, {
                                        children: [
                                            props.activeScreen ===
                                            passwordlessprebuiltui.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      passwordlessprebuiltui.UserInputCodeFormHeader,
                                                      genericComponentOverrideContext.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          { loginAttemptInfo: props.pwlessState.loginAttemptInfo }
                                                      )
                                                  )
                                                : jsxRuntime.jsx(Header, {}),
                                            props.commonState.error &&
                                                jsxRuntime.jsx(generalError.GeneralError, {
                                                    error: props.commonState.error,
                                                }),
                                            props.tpChildProps !== undefined &&
                                                thirdPartyEnabled &&
                                                props.activeScreen !==
                                                    passwordlessprebuiltui.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsx(
                                                    thirdpartyprebuiltui.ProvidersForm,
                                                    genericComponentOverrideContext.__assign({}, props.tpChildProps, {
                                                        featureState: props.tpState,
                                                        dispatch: props.tpDispatch,
                                                    })
                                                ),
                                            thirdPartyEnabled &&
                                                passwordlessEnabled &&
                                                props.activeScreen !==
                                                    passwordlessprebuiltui.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsxs(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        { "data-supertokens": "thirdPartyPasswordlessDivider" },
                                                        {
                                                            children: [
                                                                jsxRuntime.jsx("div", {
                                                                    "data-supertokens": "divider",
                                                                }),
                                                                jsxRuntime.jsx(
                                                                    "div",
                                                                    genericComponentOverrideContext.__assign(
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
                                            !passwordlessEnabled
                                                ? null
                                                : props.activeScreen ===
                                                  passwordlessprebuiltui.SignInUpScreens.EmailForm
                                                ? jsxRuntime.jsx(
                                                      passwordlessprebuiltui.EmailForm,
                                                      genericComponentOverrideContext.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen ===
                                                  passwordlessprebuiltui.SignInUpScreens.PhoneForm
                                                ? jsxRuntime.jsx(
                                                      passwordlessprebuiltui.PhoneForm,
                                                      genericComponentOverrideContext.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen ===
                                                  passwordlessprebuiltui.SignInUpScreens.EmailOrPhoneForm
                                                ? jsxRuntime.jsx(
                                                      passwordlessprebuiltui.EmailOrPhoneForm,
                                                      genericComponentOverrideContext.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen ===
                                                  passwordlessprebuiltui.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      passwordlessprebuiltui.UserInputCodeForm,
                                                      genericComponentOverrideContext.__assign(
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
                    jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
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
            ? genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, props), {
                  activeScreen: passwordlessprebuiltui.getActiveScreen({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              })
            : genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, props), {
                  activeScreen: undefined,
                  passwordlessRecipe: undefined,
                  pwlessChildProps: undefined,
              });
    var activeStyle;
    if (childProps.activeScreen === passwordlessprebuiltui.SignInUpScreens.CloseTab) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.closeTabScreenStyle;
    } else if (childProps.activeScreen === passwordlessprebuiltui.SignInUpScreens.LinkSent) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.linkSentScreenStyle;
    } else if (childProps.activeScreen === passwordlessprebuiltui.SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.passwordlessRecipe.config.signInUpFeature.userInputCodeFormStyle;
    } else {
        // This case also includes undefined which means that passwordless is disabled
        activeStyle = props.config.thirdPartyProviderAndEmailOrPhoneFormStyle;
    }
    // This style provider will override the parent with the screen specific user config
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
            { children: jsxRuntime.jsx(SignInUpTheme, genericComponentOverrideContext.__assign({}, childProps)) }
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
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign(
            genericComponentOverrideContext.__assign({}, thirdpartyprebuiltui.defaultTranslationsThirdParty.en),
            passwordlessprebuiltui.defaultTranslationsPasswordless.en
        ),
        {
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR: "or",
        }
    ),
};

var SignInAndUp$1 = function (props) {
    var _a;
    var _b = thirdpartyprebuiltui.useFeatureReducer(),
        tpState = _b[0],
        tpDispatch = _b[1];
    var userContext = uiEntry.useUserContext();
    var _c = passwordlessprebuiltui.useFeatureReducer(
            (_a = props.recipe.passwordlessRecipe) === null || _a === void 0 ? void 0 : _a.webJSRecipe,
            userContext
        ),
        pwlessState = _c[0],
        pwlessDispatch = _c[1];
    var _d = React__namespace.useReducer(
            function (state, action) {
                switch (action.type) {
                    // Intentionally fall through, both of these should clear the error
                    case "startLogin":
                    case "resendCode":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, state),
                            { error: undefined }
                        );
                    case "load":
                        if (action.loginAttemptInfo !== undefined) {
                            return genericComponentOverrideContext.__assign(
                                genericComponentOverrideContext.__assign({}, state),
                                { error: action.error }
                            );
                        }
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, state),
                            { error: state.error !== undefined ? state.error : action.error }
                        );
                    // Intentionally fall through, both of these should set the error
                    case "restartFlow":
                    case "setError":
                        return genericComponentOverrideContext.__assign(
                            genericComponentOverrideContext.__assign({}, state),
                            { error: action.error }
                        );
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
    var tpChildProps = thirdpartyprebuiltui.useChildProps(props.recipe.thirdPartyRecipe);
    var combinedPwlessDispatch = React__namespace.useCallback(
        function (action) {
            dispatch(action);
            pwlessDispatch(action);
        },
        [pwlessDispatch, dispatch]
    );
    var callingConsumeCodeRef = passwordlessprebuiltui.useSuccessInAnotherTabChecker(
        pwlessState,
        combinedPwlessDispatch,
        userContext
    );
    var pwlessChildProps = passwordlessprebuiltui.useChildProps(
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
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(SignInUpThemeWrapper, genericComponentOverrideContext.__assign({}, childProps)),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(child, childProps);
                    }
                    return child;
                }),
        ],
    });
};
var SignInAndUpFeatureWrapper = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsThirdPartyPasswordless,
                        },
                        { children: jsxRuntime.jsx(SignInAndUp$1, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
};

var ThirdPartyPasswordlessPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ThirdPartyPasswordlessPreBuiltUI, _super);
    function ThirdPartyPasswordlessPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        // Instance methods
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            if (componentName === "signInUp") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SuperTokensBranding.AuthWidgetWrapper,
                                    genericComponentOverrideContext.__assign(
                                        { authRecipe: _this.recipeInstance, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeatureWrapper,
                                                genericComponentOverrideContext.__assign(
                                                    { recipe: _this.recipeInstance },
                                                    props,
                                                    { useComponentOverrides: useComponentOverrides }
                                                )
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInAndUpFeatureWrapper,
                                    genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "linkClickedScreen") {
                if (_this.passwordlessPreBuiltUI === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return _this.passwordlessPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyPreBuiltUI === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyPreBuiltUI.getFeatureComponent(componentName, props, useComponentOverrides);
            } else {
                throw new Error("Should never come here.");
            }
        };
        _this.getFeatures = function (useComponentOverrides) {
            var _b, _c;
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            var features = {};
            if (_this.passwordlessPreBuiltUI !== undefined) {
                features = genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, features),
                    _this.passwordlessPreBuiltUI.getFeatures(useComponentOverrides)
                );
            }
            if (_this.thirdPartyPreBuiltUI !== undefined) {
                features = genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, features),
                    _this.thirdPartyPreBuiltUI.getFeatures(useComponentOverrides)
                );
            }
            if (
                (_this.recipeInstance.config.passwordlessConfig !== undefined &&
                    ((_b = _this.recipeInstance.config.passwordlessConfig.signInUpFeature) === null || _b === void 0
                        ? void 0
                        : _b.disableDefaultUI) !== true) ||
                (_this.recipeInstance.config.thirdpartyConfig !== undefined &&
                    ((_c = _this.recipeInstance.config.thirdpartyConfig.signInAndUpFeature) === null || _c === void 0
                        ? void 0
                        : _c.disableDefaultUI) !== true)
            ) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (prop) {
                        return _this.getFeatureComponent("signInUp", prop, useComponentOverrides);
                    },
                    recipeID: recipe.ThirdPartyPasswordless.RECIPE_ID,
                };
            }
            return genericComponentOverrideContext.__assign({}, features);
        };
        var thirdPartyRecipe = recipeInstance.thirdPartyRecipe,
            passwordlessRecipe = recipeInstance.passwordlessRecipe;
        if (thirdPartyRecipe !== undefined) {
            _this.thirdPartyPreBuiltUI = new thirdpartyprebuiltui.ThirdPartyPreBuiltUI(thirdPartyRecipe);
        }
        if (passwordlessRecipe !== undefined) {
            _this.passwordlessPreBuiltUI = new passwordlessprebuiltui.PasswordlessPreBuiltUI(passwordlessRecipe);
        }
        return _this;
    }
    // Static methods
    ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (ThirdPartyPasswordlessPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
            ThirdPartyPasswordlessPreBuiltUI.instance = new ThirdPartyPasswordlessPreBuiltUI(recipeInstance);
        }
        return ThirdPartyPasswordlessPreBuiltUI.instance;
    };
    ThirdPartyPasswordlessPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    ThirdPartyPasswordlessPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return ThirdPartyPasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    // For tests
    ThirdPartyPasswordlessPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdPartyPasswordlessPreBuiltUI.instance = undefined;
        return;
    };
    var _a;
    _a = ThirdPartyPasswordlessPreBuiltUI;
    ThirdPartyPasswordlessPreBuiltUI.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return _a.getFeatureComponent("signInUp", prop);
    };
    ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback = function (prop) {
        return _a.getFeatureComponent("signinupcallback", prop);
    };
    ThirdPartyPasswordlessPreBuiltUI.SignInUpTheme = SignInUpThemeWrapper;
    ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked = function (prop) {
        return _a.getFeatureComponent("linkClickedScreen", prop);
    };
    return ThirdPartyPasswordlessPreBuiltUI;
})(uiEntry.RecipeRouter);
var SignInAndUp = ThirdPartyPasswordlessPreBuiltUI.SignInAndUp;
var ThirdPartySignInAndUpCallback = ThirdPartyPasswordlessPreBuiltUI.ThirdPartySignInAndUpCallback;
var PasswordlessLinkClicked = ThirdPartyPasswordlessPreBuiltUI.PasswordlessLinkClicked;

exports.PasswordlessLinkClicked = PasswordlessLinkClicked;
exports.SignInAndUp = SignInAndUp;
exports.SignInUpTheme = SignInUpThemeWrapper;
exports.ThirdPartyPasswordlessPreBuiltUI = ThirdPartyPasswordlessPreBuiltUI;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
