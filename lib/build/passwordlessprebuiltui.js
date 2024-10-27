"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var React = require("react");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var recipe$1 = require("./emailpassword-shared3.js");
require("./multifactorauth.js");
var session = require("./session.js");
var recipe$2 = require("./passwordless-shared.js");
var authCompWrapper = require("./authCompWrapper.js");
var button = require("./emailpassword-shared.js");
var translationContext = require("./translationContext.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var types = require("./multifactorauth-shared.js");
var emailverification = require("./emailverification.js");
var recipe = require("./emailverification-shared.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var emailLargeIcon = require("./emailLargeIcon.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var recipe$3 = require("./multifactorauth-shared2.js");
var sessionprebuiltui = require("./sessionprebuiltui.js");
var formBase = require("./emailpassword-shared5.js");
var STGeneralError$1 = require("supertokens-web-js/lib/build/error");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./recipeModule-shared.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/emailpassword");
require("./authRecipe-shared2.js");
require("./emailpassword-shared4.js");
require("./multifactorauth-shared3.js");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/passwordless");
require("supertokens-web-js/recipe/emailverification");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("supertokens-web-js/recipe/multifactorauth");

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
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);
var STGeneralError__default$1 = /*#__PURE__*/ _interopDefault(STGeneralError$1);

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n\n/*\n * Default styles.\n */\n\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n\n/* TODO: split the link style into separate things*/\n\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 700;\n    font-size: var(--font-size-0);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n\n[data-supertokens~="formRow"]:last-child {\n    padding-bottom: 0;\n}\n\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n\n[data-supertokens~="primaryText"][data-supertokens~="sendVerifyEmailText"] {\n    text-align: center;\n    letter-spacing: 0.8px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n    font-weight: 700;\n}\n\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 400;\n}\n\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n\n[data-supertokens~="resetPasswordEmailForm"] {\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="resetPasswordPasswordForm"] {\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n[data-supertokens~="primaryText"][data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n\n[data-supertokens~="phoneInputWrapper"] {\n    display: flex;\n    align-items: center;\n}\n\ninput[type="tel"][data-supertokens~="input-phoneNumber"] {\n    padding-left: 15px;\n}\n\n[data-supertokens~="phoneInputWrapper"] .iti {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n\n.iti__country-list {\n    border: 0;\n    top: 40px;\n    width: min(72.2vw, 320px);\n    border-radius: 6;\n    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.16);\n}\n\n.iti__country {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    cursor: pointer;\n\n    padding: 0 8px;\n}\n\n.iti__country-name {\n    color: var(--palette-textLabel);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    margin: "0 16px";\n}\n\n[data-supertokens~="continueWithPasswordlessButtonWrapper"] {\n    margin: 9px 0;\n}\n\n[data-supertokens~="continueWithPasswordlessLink"] {\n    margin-top: 9px;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var ContinueWithPasswordless = function (props) {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "continueWithPasswordlessButtonWrapper" },
            {
                children: jsxRuntime.jsx(button.Button, {
                    isLoading: false,
                    onClick: function () {
                        props.continueWithPasswordlessClicked();
                    },
                    type: "button",
                    label: "PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_BUTTON",
                }),
            }
        )
    );
};
var ContinueWithPasswordlessWithOverride = uiEntry.withOverride(
    "PasswordlessContinueWithPasswordless",
    ContinueWithPasswordless
);
var ContinueWithPasswordlessTheme = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle] },
            {
                children: jsxRuntime.jsx(
                    ContinueWithPasswordlessWithOverride,
                    genericComponentOverrideContext.__assign({}, props)
                ),
            }
        )
    );
};

var ContinueWithPasswordlessFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    ContinueWithPasswordlessTheme,
                    genericComponentOverrideContext.__assign({}, props, {
                        continueWithPasswordlessClicked: function () {
                            return props.setFactorList(props.factorIds);
                        },
                        config: props.recipe.config,
                    })
                ),
            }
        )
    );
};

var PasswordlessLinkClickedScreen = function (props) {
    var t = translationContext.useTranslation();
    var _a = React.useState(false),
        loading = _a[0],
        setLoading = _a[1];
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children:
                                props.requireUserInteraction === true
                                    ? jsxRuntime.jsxs(React__namespace.default.Fragment, {
                                          children: [
                                              jsxRuntime.jsx(
                                                  "div",
                                                  genericComponentOverrideContext.__assign(
                                                      { "data-supertokens": "headerTitle" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_HEADER") }
                                                  )
                                              ),
                                              jsxRuntime.jsx(
                                                  "div",
                                                  genericComponentOverrideContext.__assign(
                                                      { "data-supertokens": "headerSubtitle secondaryText" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_DESC") }
                                                  )
                                              ),
                                              jsxRuntime.jsx(
                                                  "div",
                                                  genericComponentOverrideContext.__assign(
                                                      { "data-supertokens": "continueButtonWrapper" },
                                                      {
                                                          children: jsxRuntime.jsx(button.Button, {
                                                              isLoading: loading,
                                                              onClick: function () {
                                                                  setLoading(true);
                                                                  props.consumeCode();
                                                              },
                                                              type: "button",
                                                              label: "PWLESS_LINK_CLICKED_CONTINUE_BUTTON",
                                                          }),
                                                      }
                                                  )
                                              ),
                                          ],
                                      })
                                    : jsxRuntime.jsx(
                                          "div",
                                          genericComponentOverrideContext.__assign(
                                              { "data-supertokens": "spinner" },
                                              { children: jsxRuntime.jsx(uiEntry.SpinnerIcon, {}) }
                                          )
                                      ),
                        }
                    )
                ),
            }
        )
    );
};
var LinkClickedScreenWithOverride = uiEntry.withOverride(
    "PasswordlessLinkClickedScreen",
    PasswordlessLinkClickedScreen
);
var LinkClickedScreen$1 = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.linkClickedScreenFeature.style] },
            {
                children: jsxRuntime.jsx(
                    LinkClickedScreenWithOverride,
                    genericComponentOverrideContext.__assign({}, props)
                ),
            }
        )
    );
};

var defaultTranslationsPasswordless = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        {
            GENERAL_ERROR_EMAIL_UNDEFINED: "Please set your email",
            GENERAL_ERROR_EMAIL_NON_STRING: "Email must be of type string",
            GENERAL_ERROR_EMAIL_INVALID: "Email is invalid",
            GENERAL_ERROR_PHONE_UNDEFINED: "Please set your phone number",
            GENERAL_ERROR_PHONE_NON_STRING: "Phone number must be of type string",
            GENERAL_ERROR_PHONE_INVALID: "Phone number is invalid",
            GENERAL_ERROR_OTP_UNDEFINED: "Please fill your OTP",
            GENERAL_ERROR_OTP_INVALID: "Invalid OTP",
            GENERAL_ERROR_OTP_EXPIRED: "Expired OTP.",
            GENERAL_ERROR_OTP_NON_STRING: "OTP must be of type string",
            GENERAL_ERROR_OTP_EMPTY: "OTP cannot be empty",
            ERROR_SIGN_IN_UP_LINK: "Invalid magic link. Please try again.",
            ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW: "Login timed out. Please try again.",
            ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW: "Login unsuccessful. Please try again.",
            PWLESS_SIGN_IN_UP_EMAIL_LABEL: "Email",
            PWLESS_SIGN_IN_UP_PHONE_LABEL: "Phone Number",
            PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE: "Use a Phone number",
            PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL: "Use an Email",
            PWLESS_SIGN_IN_UP_CONTINUE_BUTTON: "CONTINUE",
            PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_LINK: "Continue with passwordless",
            PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_BUTTON: "CONTINUE WITH PASSWORDLESS",
            PWLESS_COMBO_PASSWORD_LABEL: "Password",
            PWLESS_COMBO_FORGOT_PW_LINK: "Forgot password?",
            PWLESS_LINK_SENT_RESEND_SUCCESS: "Link resent",
            PWLESS_LINK_SENT_RESEND_TITLE: "Link sent!",
            PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL: "We sent a link to ",
            PWLESS_LINK_SENT_RESEND_DESC_START_PHONE: "We sent a link to your phone number ",
            PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL: ". Click the link to login or sign up",
            PWLESS_LINK_SENT_RESEND_DESC_END_PHONE: "",
            PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL: "Change email",
            PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE: "Change phone number",
            PWLESS_LINK_CLICKED_CONTINUE_HEADER: "Sign Up or Log In",
            PWLESS_LINK_CLICKED_CONTINUE_DESC: "Click the button below to log in on this device",
            PWLESS_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
            PWLESS_RESEND_SUCCESS_EMAIL: "Email resent",
            PWLESS_RESEND_SUCCESS_PHONE: "SMS resent",
            PWLESS_RESEND_BTN_DISABLED_START: "Resend in ",
            PWLESS_RESEND_BTN_DISABLED_END: "",
            PWLESS_RESEND_BTN_EMAIL: "Resend Email",
            PWLESS_RESEND_BTN_PHONE: "Resend SMS",
            PWLESS_USER_INPUT_CODE_HEADER_TITLE: "Enter OTP",
            PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE: "An OTP was sent to you at",
            PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK: "An OTP and a magic link was sent to you at",
            PWLESS_USER_INPUT_CODE_INPUT_LABEL: "OTP",
            PWLESS_MFA_HEADER_TITLE_PHONE: "SMS based OTP",
            PWLESS_MFA_HEADER_TITLE_EMAIL: "Email based OTP",
            PWLESS_MFA_FOOTER_LOGOUT: "Logout",
            /*
             * The following are error messages from our backend SDK.
             * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
             * They are shown as is by default (setting the value to undefined will display the raw translation key)
             */
            "Failed to generate a one time code. Please try again": undefined,
            "Phone number is invalid": undefined,
            "Email is invalid": undefined,
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_002)":
                undefined,
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_003)":
                undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_017)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_018)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_019)": undefined,
        }
    ),
};

var LinkClickedScreen = function (props) {
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(false),
        requireUserInteraction = _a[0],
        setRequireUserInteraction = _a[1];
    var consumeCodeAtMount = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, loginAttemptInfo, payloadBeforeCall;
                var _b;
                return genericComponentOverrideContext.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            preAuthSessionId = genericComponentOverrideContext.getQueryParams("preAuthSessionId");
                            linkCode = genericComponentOverrideContext.getURLHash();
                            if (!(preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0))
                                return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    navigate: props.navigate,
                                    queryParams: {
                                        error: "signin",
                                    },
                                    redirectBack: false,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, "REDIRECTING"];
                        case 2:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.getLoginAttemptInfo({ userContext: userContext }),
                            ];
                        case 3:
                            loginAttemptInfo = _c.sent();
                            if (
                                (loginAttemptInfo === null || loginAttemptInfo === void 0
                                    ? void 0
                                    : loginAttemptInfo.preAuthSessionId) !== preAuthSessionId
                            ) {
                                return [2 /*return*/, "REQUIRES_INTERACTION"];
                            }
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            payloadBeforeCall = _c.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            _c.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadBeforeCall = undefined;
                            return [3 /*break*/, 7];
                        case 7:
                            _b = {
                                payloadBeforeCall: payloadBeforeCall,
                            };
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.consumeCode({
                                    userContext: userContext,
                                }),
                            ];
                        case 8:
                            return [2 /*return*/, ((_b.response = _c.sent()), _b)];
                    }
                });
            });
        },
        [props.recipe, props.navigate, userContext]
    );
    var handleConsumeResp = React.useCallback(
        function (consumeRes) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var response, payloadBeforeCall, payloadAfterCall, loginAttemptInfo;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (consumeRes === "REQUIRES_INTERACTION") {
                                // We set this here, to make sure it's set after a possible remount
                                setRequireUserInteraction(true);
                            }
                            if (typeof consumeRes === "string") {
                                // In this case we are already redirecting or showing the continue button
                                return [2 /*return*/];
                            }
                            (response = consumeRes.response), (payloadBeforeCall = consumeRes.payloadBeforeCall);
                            if (response.status === "RESTART_FLOW_ERROR") {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: "restart_link",
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: response.reason,
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 7];
                            payloadAfterCall = void 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            payloadAfterCall = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _b.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 4];
                        case 4:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.getLoginAttemptInfo({
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            loginAttemptInfo = _b.sent();
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.clearLoginAttemptInfo({
                                    userContext: userContext,
                                }),
                            ];
                        case 6:
                            _b.sent();
                            return [
                                2 /*return*/,
                                types.Session.getInstanceOrThrow()
                                    .validateGlobalClaimsAndHandleSuccessRedirection(
                                        {
                                            action: "SUCCESS",
                                            createdNewUser:
                                                response.createdNewRecipeUser &&
                                                response.user.loginMethods.length === 1,
                                            isNewRecipeUser: response.createdNewRecipeUser,
                                            newSessionCreated:
                                                payloadAfterCall !== undefined &&
                                                (payloadBeforeCall === undefined ||
                                                    payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                            recipeId: props.recipe.recipeID,
                                            tenantIdFromQueryParams:
                                                genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                        },
                                        props.recipe.recipeID,
                                        loginAttemptInfo === null || loginAttemptInfo === void 0
                                            ? void 0
                                            : loginAttemptInfo.redirectToPath,
                                        userContext,
                                        props.navigate
                                    )
                                    .catch(rethrowInRender),
                            ];
                        case 7:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.navigate, props.recipe, userContext]
    );
    var handleConsumeError = React.useCallback(
        function (err) {
            if (STGeneralError__default.default.isThisError(err)) {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                    userContext: userContext,
                });
            } else {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "signin",
                    },
                    redirectBack: false,
                    userContext: userContext,
                });
            }
        },
        [props.navigate, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);
    var recipeComponentOverrides = props.useComponentOverrides();
    var childProps = {
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
        requireUserInteraction: requireUserInteraction,
        consumeCode: function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var payloadBeforeCall, consumeResp, err_1;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, , 8]);
                            payloadBeforeCall = void 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            payloadBeforeCall = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _b.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadBeforeCall = undefined;
                            return [3 /*break*/, 4];
                        case 4:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.consumeCode({
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            consumeResp = _b.sent();
                            return [
                                4 /*yield*/,
                                handleConsumeResp({ response: consumeResp, payloadBeforeCall: payloadBeforeCall }),
                            ];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            err_1 = _b.sent();
                            void handleConsumeError(err_1);
                            return [3 /*break*/, 8];
                        case 8:
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                            defaultStore: defaultTranslationsPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            LinkClickedScreen$1,
                                            genericComponentOverrideContext.__assign({}, childProps)
                                        ),
                                    props.children &&
                                        React__namespace.default.Children.map(props.children, function (child) {
                                            if (React__namespace.default.isValidElement(child)) {
                                                return React__namespace.default.cloneElement(child, childProps);
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

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http="//www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
/*
 * Component.
 */
function SMSLargeIcon() {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "81", height: "74", viewBox: "0 0 81 74", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: [
                    jsxRuntime.jsx("rect", {
                        width: "81",
                        height: "74",
                        rx: "12",
                        fill: "#2D3644",
                        "fill-opacity": "0.1",
                    }),
                    jsxRuntime.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M24.2791 18.0721C23.4556 18.2346 22.8383 18.5501 22.2521 19.1081C21.8207 19.5187 21.386 20.2086 21.202 20.7749C20.9933 21.4174 21 21.014 21 32.9399C21 44.8055 20.9953 44.5105 21.1962 45.0802C21.6287 46.3063 22.5027 47.2275 23.6138 47.6284C24.2239 47.8485 24.5957 47.8781 26.7622 47.879L28.7938 47.8799L28.7945 51.3361C28.7953 54.928 28.797 54.9609 28.9957 55.3449C29.2026 55.7447 29.7368 56.0357 30.1914 55.9964C30.557 55.9648 30.7792 55.8285 31.6485 55.1029C32.0817 54.7413 32.5179 54.3786 32.6179 54.2969C32.718 54.2151 32.8782 54.0813 32.9739 53.9995C33.0696 53.9178 33.2293 53.784 33.3288 53.7022C33.6246 53.4593 35.3203 52.0426 35.4235 51.9522C35.476 51.9063 35.6683 51.7462 35.851 51.5963C36.0337 51.4464 36.2261 51.2867 36.2785 51.2414C36.3609 51.1702 37.0269 50.6141 38.5123 49.3762C38.7214 49.2019 38.9673 48.9969 39.0588 48.9205C39.1503 48.8442 39.4689 48.5788 39.7668 48.3308L40.3085 47.8799H48.2834C53.8058 47.8799 56.3722 47.8632 56.6286 47.8256C58.2358 47.59 59.5022 46.4036 59.9294 44.7333C60.0239 44.364 60.0233 21.5127 59.9288 21.1466C59.5021 19.493 58.3008 18.3427 56.7137 18.0678C56.1756 17.9746 24.7519 17.9788 24.2791 18.0721ZM51.4173 28.981C52.2557 29.3855 52.4751 30.4017 51.8772 31.1101C51.7556 31.254 51.5818 31.3895 51.4269 31.4609L51.1745 31.5773H40.5392C28.8194 31.5773 29.681 31.6007 29.2987 31.2721C28.9166 30.9437 28.7361 30.438 28.8355 29.9747C28.9464 29.458 29.3009 29.0629 29.7764 28.9262C29.9644 28.8722 31.912 28.8618 40.6033 28.8685L51.201 28.8767L51.4173 28.981ZM41.0193 34.419C41.3249 34.5599 41.6353 34.9094 41.7403 35.2309C41.9512 35.8762 41.6712 36.5538 41.0654 36.8639L40.7934 37.0032L35.4708 37.0186C31.645 37.0297 30.0783 37.0183 29.8996 36.9781C29.5714 36.9043 29.4061 36.814 29.1927 36.5921C28.6448 36.0224 28.6929 35.1284 29.2996 34.607C29.6628 34.2948 29.3424 34.3108 35.315 34.3065L40.767 34.3026L41.0193 34.419Z",
                        fill: "#2D3644",
                    }),
                ],
            }
        )
    );
}

var ResendButton = uiEntry.withOverride("PasswordlessResendButton", function PasswordlessResendButton(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo,
        resendEmailOrSMSGapInSeconds = _a.resendEmailOrSMSGapInSeconds,
        onClick = _a.onClick;
    var t = translationContext.useTranslation();
    var getTimeLeft = React.useCallback(
        function () {
            var timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        },
        [loginAttemptInfo, resendEmailOrSMSGapInSeconds]
    );
    var _b = React.useState(getTimeLeft()),
        secsUntilResend = _b[0],
        setSecsUntilResend = _b[1];
    React.useEffect(
        function () {
            // This runs every time the loginAttemptInfo updates, so after every resend
            var interval = setInterval(function () {
                var timeLeft = getTimeLeft();
                if (timeLeft === undefined) {
                    clearInterval(interval);
                }
                setSecsUntilResend(timeLeft);
            }, 500);
            return function () {
                // This can safely run twice
                clearInterval(interval);
            };
        },
        [getTimeLeft, setSecsUntilResend]
    );
    return jsxRuntime.jsx(
        "button",
        genericComponentOverrideContext.__assign(
            {
                type: "button",
                disabled: secsUntilResend !== undefined,
                onClick: onClick,
                "data-supertokens": "link linkButton formLabelLinkBtn resendCodeBtn",
            },
            {
                children:
                    secsUntilResend !== undefined
                        ? jsxRuntime.jsxs(React__namespace.default.Fragment, {
                              children: [
                                  t("PWLESS_RESEND_BTN_DISABLED_START"),
                                  jsxRuntime.jsxs("strong", {
                                      children: [
                                          Math.floor(secsUntilResend / 60)
                                              .toString()
                                              .padStart(2, "0"),
                                          ":",
                                          (secsUntilResend % 60).toString().padStart(2, "0"),
                                      ],
                                  }),
                                  t("PWLESS_RESEND_BTN_DISABLED_END"),
                              ],
                          })
                        : loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_RESEND_BTN_EMAIL")
                        : t("PWLESS_RESEND_BTN_PHONE"),
            }
        )
    );
});

var PasswordlessLinkSent = function (props) {
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
    var _a = React.useState(props.error !== undefined ? "ERROR" : "READY"),
        status = _a[0],
        setStatus = _a[1];
    // Any because node types are included here, messing with return type of setTimeout
    var resendNotifTimeout = React.useRef();
    React.useEffect(function () {
        return function () {
            // This can safely run even if it was cleared before
            if (resendNotifTimeout.current) {
                clearTimeout(resendNotifTimeout.current);
            }
        };
    }, []);
    var resendEmail = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var response, generalError, e_1;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            props.clearError();
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (STGeneralError__default.default.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (response !== undefined && response.status === "OK") {
                                setStatus("LINK_RESENT");
                                resendNotifTimeout.current = setTimeout(function () {
                                    setStatus(function (status) {
                                        return status === "LINK_RESENT" ? "READY" : status;
                                    });
                                    resendNotifTimeout.current = undefined;
                                }, 2000);
                            } else {
                                setStatus("ERROR");
                                if (generalError !== undefined) {
                                    props.onError(generalError.message);
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            _a.sent();
                            setStatus("ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipeImplementation, props.loginAttemptInfo, props.config, setStatus]
    );
    var resendActive = status === "LINK_RESENT";
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                status === "ERROR" &&
                                    jsxRuntime.jsx(uiEntry.GeneralError, {
                                        error: props.error === undefined ? "SOMETHING_WENT_WRONG_ERROR" : props.error,
                                    }),
                                resendActive &&
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("PWLESS_LINK_SENT_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "sendCodeIcon" },
                                        {
                                            children:
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? jsxRuntime.jsx(emailLargeIcon.EmailLargeIcon, {})
                                                    : jsxRuntime.jsx(SMSLargeIcon, {}),
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("PWLESS_LINK_SENT_RESEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "primaryText sendCodeText" },
                                        {
                                            children: [
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_START_PHONE"),
                                                jsxRuntime.jsx("strong", {
                                                    children: props.loginAttemptInfo.contactInfo,
                                                }),
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_END_PHONE"),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        {
                                            "data-supertokens": "buttonWithArrow",
                                            onClick: function () {
                                                return props.recipeImplementation.clearLoginAttemptInfo({
                                                    userContext: userContext,
                                                });
                                            },
                                        },
                                        {
                                            children: jsxRuntime.jsxs(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {
                                                                color: "rgb(var(--palette-textGray))",
                                                            }),
                                                            jsxRuntime.jsx("span", {
                                                                children:
                                                                    props.loginAttemptInfo.contactMethod === "EMAIL"
                                                                        ? t(
                                                                              "PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL"
                                                                          )
                                                                        : t(
                                                                              "PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"
                                                                          ),
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(ResendButton, {
                                    loginAttemptInfo: props.loginAttemptInfo,
                                    resendEmailOrSMSGapInSeconds:
                                        props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                    onClick: resendEmail,
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var LinkSent = uiEntry.withOverride("PasswordlessLinkSent", PasswordlessLinkSent);
function LinkSentWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(LinkSent, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

function useChildProps$4(
    recipe$1,
    loginAttemptInfo,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    userContext,
    navigate
) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return getModifiedRecipeImplementation$4(recipe$1.webJSRecipe, onError, rebuildAuthPage);
        },
        [recipe$1, onError, rebuildAuthPage]
    );
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            return {
                userContext: userContext,
                onSuccess: function (result) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 3];
                                case 3:
                                    return [
                                        2 /*return*/,
                                        types.Session.getInstanceOrThrow()
                                            .validateGlobalClaimsAndHandleSuccessRedirection(
                                                {
                                                    action: "SUCCESS",
                                                    createdNewUser:
                                                        result.createdNewRecipeUser &&
                                                        result.user.loginMethods.length === 1,
                                                    isNewRecipeUser: result.createdNewRecipeUser,
                                                    newSessionCreated:
                                                        session$1.loading ||
                                                        !session$1.doesSessionExist ||
                                                        (payloadAfterCall !== undefined &&
                                                            session$1.accessTokenPayload.sessionHandle !==
                                                                payloadAfterCall.sessionHandle),
                                                    recipeId: recipe$1.recipeID,
                                                    tenantIdFromQueryParams:
                                                        genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                                },
                                                recipe$1.recipeID,
                                                genericComponentOverrideContext.getRedirectToPathFromURL(),
                                                userContext,
                                                navigate
                                            )
                                            .catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                                action: "VERIFY_EMAIL",
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                loginAttemptInfo: loginAttemptInfo,
                error: error,
                onError: onError,
                clearError: clearError,
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
            };
        },
        [error, recipeImplementation]
    );
}
var LinkSentFeatureInner = function (props) {
    var childProps = useChildProps$4(
        props.recipe,
        props.loginAttemptInfo,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.userContext,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(
                    LinkSentWrapper,
                    genericComponentOverrideContext.__assign({}, childProps, { userContext: props.userContext })
                ),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(
                            child,
                            genericComponentOverrideContext.__assign({}, childProps)
                        );
                    }
                    return child;
                }),
        ],
    });
};
var LinkSentFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(LinkSentFeatureInner, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};
function getModifiedRecipeImplementation$4(originalImpl, setError, rebuildAuthPage) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        resendCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _b.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.getLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _b.sent();
                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                originalImpl.setLoginAttemptInfo({
                                    userContext: input.userContext,
                                    attemptInfo: genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, loginAttemptInfo),
                                        {
                                            shouldTryLinkingWithSessionUser:
                                                (_a = loginAttemptInfo.shouldTryLinkingWithSessionUser) !== null &&
                                                _a !== void 0
                                                    ? _a
                                                    : false,
                                            lastResend: timestamp,
                                        }
                                    ),
                                }),
                            ];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _b.sent();
                            setError("ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW");
                            rebuildAuthPage();
                            _b.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.consumeCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            setError("ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW");
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(res.status === "SIGN_IN_UP_NOT_ALLOWED")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            _a.sent();
                            setError(res.reason);
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "OK")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            genericComponentOverrideContext.clearErrorQueryParam();
                            rebuildAuthPage();
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}

var phoneNumberUtilsImport;
function getPhoneNumberUtils() {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var global;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, preloadPhoneNumberUtils()];
                case 1:
                    _a.sent();
                    global = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe();
                    return [2 /*return*/, global.intlTelInputUtils];
            }
        });
    });
}
function preloadPhoneNumberUtils() {
    if (phoneNumberUtilsImport === undefined) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore: We need to disable no implicit any here, otherwise we'd need to add types for this module
        phoneNumberUtilsImport = Promise.resolve().then(function () {
            return require("./utils.js");
        });
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    }
    return phoneNumberUtilsImport;
}

// This was moved to a separate file to make tree-shaking more effective, since we do not want to include the phoneNumberUtils
// in the base pwless recipe because it increases the bundle size by a lot
function defaultPhoneNumberValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, getPhoneNumberUtils()];
                case 1:
                    intlTelInputUtils = _a.sent();
                    if (!intlTelInputUtils.isValidNumber(value, undefined)) {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_INVALID"];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}

var EmailForm = uiEntry.withOverride("PasswordlessEmailForm", function PasswordlessEmailForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        clearError: props.clearError,
        onFetchError: props.onFetchError,
        onError: props.onError,
        formFields: [
            {
                id: "email",
                label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "email",
                // We are using the default validator that allows any string
                validate: recipe$1.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var email, validationRes, response;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email =
                                (_a = formFields.find(function (field) {
                                    return field.id === "email";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (email === undefined) {
                                throw new STGeneralError__default.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validateEmailAddress(email)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new STGeneralError__default.default(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    email: email,
                                    // shouldTryLinkingWithSessionUser is set by the fn override
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                throw new STGeneralError__default.default(response.reason);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});

function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

var intlTelInputExports$1 = {};
var intlTelInput$2 = {
    get exports() {
        return intlTelInputExports$1;
    },
    set exports(v) {
        intlTelInputExports$1 = v;
    },
};

var intlTelInputExports = {};
var intlTelInput$1 = {
    get exports() {
        return intlTelInputExports;
    },
    set exports(v) {
        intlTelInputExports = v;
    },
};

/*
 * International Telephone Input v17.0.21
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

(function (module) {
    // wrap in UMD
    (function (factory) {
        if (module.exports) module.exports = factory();
        else window.intlTelInput = factory();
    })(function (undefined$1) {
        return (function () {
            // Array of country objects for the flag dropdown.
            // Here is the criteria for the plugin to support a given country/territory
            // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
            // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
            // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
            // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
            // Each country array has the following information:
            // [
            //    Country name,
            //    iso2 code,
            //    International dial code,
            //    Order (if >1 country with same dial code),
            //    Area codes
            // ]
            var allCountries = [
                ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
                ["Albania (Shqipëri)", "al", "355"],
                ["Algeria (‫الجزائر‬‎)", "dz", "213"],
                ["American Samoa", "as", "1", 5, ["684"]],
                ["Andorra", "ad", "376"],
                ["Angola", "ao", "244"],
                ["Anguilla", "ai", "1", 6, ["264"]],
                ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
                ["Argentina", "ar", "54"],
                ["Armenia (Հայաստան)", "am", "374"],
                ["Aruba", "aw", "297"],
                ["Ascension Island", "ac", "247"],
                ["Australia", "au", "61", 0],
                ["Austria (Österreich)", "at", "43"],
                ["Azerbaijan (Azərbaycan)", "az", "994"],
                ["Bahamas", "bs", "1", 8, ["242"]],
                ["Bahrain (‫البحرين‬‎)", "bh", "973"],
                ["Bangladesh (বাংলাদেশ)", "bd", "880"],
                ["Barbados", "bb", "1", 9, ["246"]],
                ["Belarus (Беларусь)", "by", "375"],
                ["Belgium (België)", "be", "32"],
                ["Belize", "bz", "501"],
                ["Benin (Bénin)", "bj", "229"],
                ["Bermuda", "bm", "1", 10, ["441"]],
                ["Bhutan (འབྲུག)", "bt", "975"],
                ["Bolivia", "bo", "591"],
                ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
                ["Botswana", "bw", "267"],
                ["Brazil (Brasil)", "br", "55"],
                ["British Indian Ocean Territory", "io", "246"],
                ["British Virgin Islands", "vg", "1", 11, ["284"]],
                ["Brunei", "bn", "673"],
                ["Bulgaria (България)", "bg", "359"],
                ["Burkina Faso", "bf", "226"],
                ["Burundi (Uburundi)", "bi", "257"],
                ["Cambodia (កម្ពុជា)", "kh", "855"],
                ["Cameroon (Cameroun)", "cm", "237"],
                [
                    "Canada",
                    "ca",
                    "1",
                    1,
                    [
                        "204",
                        "226",
                        "236",
                        "249",
                        "250",
                        "289",
                        "306",
                        "343",
                        "365",
                        "387",
                        "403",
                        "416",
                        "418",
                        "431",
                        "437",
                        "438",
                        "450",
                        "506",
                        "514",
                        "519",
                        "548",
                        "579",
                        "581",
                        "587",
                        "604",
                        "613",
                        "639",
                        "647",
                        "672",
                        "705",
                        "709",
                        "742",
                        "778",
                        "780",
                        "782",
                        "807",
                        "819",
                        "825",
                        "867",
                        "873",
                        "902",
                        "905",
                    ],
                ],
                ["Cape Verde (Kabu Verdi)", "cv", "238"],
                ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
                ["Cayman Islands", "ky", "1", 12, ["345"]],
                ["Central African Republic (République centrafricaine)", "cf", "236"],
                ["Chad (Tchad)", "td", "235"],
                ["Chile", "cl", "56"],
                ["China (中国)", "cn", "86"],
                ["Christmas Island", "cx", "61", 2, ["89164"]],
                ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
                ["Colombia", "co", "57"],
                ["Comoros (‫جزر القمر‬‎)", "km", "269"],
                ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
                ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
                ["Cook Islands", "ck", "682"],
                ["Costa Rica", "cr", "506"],
                ["Côte d’Ivoire", "ci", "225"],
                ["Croatia (Hrvatska)", "hr", "385"],
                ["Cuba", "cu", "53"],
                ["Curaçao", "cw", "599", 0],
                ["Cyprus (Κύπρος)", "cy", "357"],
                ["Czech Republic (Česká republika)", "cz", "420"],
                ["Denmark (Danmark)", "dk", "45"],
                ["Djibouti", "dj", "253"],
                ["Dominica", "dm", "1", 13, ["767"]],
                ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
                ["Ecuador", "ec", "593"],
                ["Egypt (‫مصر‬‎)", "eg", "20"],
                ["El Salvador", "sv", "503"],
                ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
                ["Eritrea", "er", "291"],
                ["Estonia (Eesti)", "ee", "372"],
                ["Eswatini", "sz", "268"],
                ["Ethiopia", "et", "251"],
                ["Falkland Islands (Islas Malvinas)", "fk", "500"],
                ["Faroe Islands (Føroyar)", "fo", "298"],
                ["Fiji", "fj", "679"],
                ["Finland (Suomi)", "fi", "358", 0],
                ["France", "fr", "33"],
                ["French Guiana (Guyane française)", "gf", "594"],
                ["French Polynesia (Polynésie française)", "pf", "689"],
                ["Gabon", "ga", "241"],
                ["Gambia", "gm", "220"],
                ["Georgia (საქართველო)", "ge", "995"],
                ["Germany (Deutschland)", "de", "49"],
                ["Ghana (Gaana)", "gh", "233"],
                ["Gibraltar", "gi", "350"],
                ["Greece (Ελλάδα)", "gr", "30"],
                ["Greenland (Kalaallit Nunaat)", "gl", "299"],
                ["Grenada", "gd", "1", 14, ["473"]],
                ["Guadeloupe", "gp", "590", 0],
                ["Guam", "gu", "1", 15, ["671"]],
                ["Guatemala", "gt", "502"],
                ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
                ["Guinea (Guinée)", "gn", "224"],
                ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
                ["Guyana", "gy", "592"],
                ["Haiti", "ht", "509"],
                ["Honduras", "hn", "504"],
                ["Hong Kong (香港)", "hk", "852"],
                ["Hungary (Magyarország)", "hu", "36"],
                ["Iceland (Ísland)", "is", "354"],
                ["India (भारत)", "in", "91"],
                ["Indonesia", "id", "62"],
                ["Iran (‫ایران‬‎)", "ir", "98"],
                ["Iraq (‫العراق‬‎)", "iq", "964"],
                ["Ireland", "ie", "353"],
                ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
                ["Israel (‫ישראל‬‎)", "il", "972"],
                ["Italy (Italia)", "it", "39", 0],
                ["Jamaica", "jm", "1", 4, ["876", "658"]],
                ["Japan (日本)", "jp", "81"],
                ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
                ["Jordan (‫الأردن‬‎)", "jo", "962"],
                ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
                ["Kenya", "ke", "254"],
                ["Kiribati", "ki", "686"],
                ["Kosovo", "xk", "383"],
                ["Kuwait (‫الكويت‬‎)", "kw", "965"],
                ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
                ["Laos (ລາວ)", "la", "856"],
                ["Latvia (Latvija)", "lv", "371"],
                ["Lebanon (‫لبنان‬‎)", "lb", "961"],
                ["Lesotho", "ls", "266"],
                ["Liberia", "lr", "231"],
                ["Libya (‫ليبيا‬‎)", "ly", "218"],
                ["Liechtenstein", "li", "423"],
                ["Lithuania (Lietuva)", "lt", "370"],
                ["Luxembourg", "lu", "352"],
                ["Macau (澳門)", "mo", "853"],
                ["Madagascar (Madagasikara)", "mg", "261"],
                ["Malawi", "mw", "265"],
                ["Malaysia", "my", "60"],
                ["Maldives", "mv", "960"],
                ["Mali", "ml", "223"],
                ["Malta", "mt", "356"],
                ["Marshall Islands", "mh", "692"],
                ["Martinique", "mq", "596"],
                ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
                ["Mauritius (Moris)", "mu", "230"],
                ["Mayotte", "yt", "262", 1, ["269", "639"]],
                ["Mexico (México)", "mx", "52"],
                ["Micronesia", "fm", "691"],
                ["Moldova (Republica Moldova)", "md", "373"],
                ["Monaco", "mc", "377"],
                ["Mongolia (Монгол)", "mn", "976"],
                ["Montenegro (Crna Gora)", "me", "382"],
                ["Montserrat", "ms", "1", 16, ["664"]],
                ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
                ["Mozambique (Moçambique)", "mz", "258"],
                ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
                ["Namibia (Namibië)", "na", "264"],
                ["Nauru", "nr", "674"],
                ["Nepal (नेपाल)", "np", "977"],
                ["Netherlands (Nederland)", "nl", "31"],
                ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
                ["New Zealand", "nz", "64"],
                ["Nicaragua", "ni", "505"],
                ["Niger (Nijar)", "ne", "227"],
                ["Nigeria", "ng", "234"],
                ["Niue", "nu", "683"],
                ["Norfolk Island", "nf", "672"],
                ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
                ["North Macedonia (Северна Македонија)", "mk", "389"],
                ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
                ["Norway (Norge)", "no", "47", 0],
                ["Oman (‫عُمان‬‎)", "om", "968"],
                ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
                ["Palau", "pw", "680"],
                ["Palestine (‫فلسطين‬‎)", "ps", "970"],
                ["Panama (Panamá)", "pa", "507"],
                ["Papua New Guinea", "pg", "675"],
                ["Paraguay", "py", "595"],
                ["Peru (Perú)", "pe", "51"],
                ["Philippines", "ph", "63"],
                ["Poland (Polska)", "pl", "48"],
                ["Portugal", "pt", "351"],
                ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
                ["Qatar (‫قطر‬‎)", "qa", "974"],
                ["Réunion (La Réunion)", "re", "262", 0],
                ["Romania (România)", "ro", "40"],
                ["Russia (Россия)", "ru", "7", 0],
                ["Rwanda", "rw", "250"],
                ["Saint Barthélemy", "bl", "590", 1],
                ["Saint Helena", "sh", "290"],
                ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
                ["Saint Lucia", "lc", "1", 19, ["758"]],
                ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
                ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
                ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
                ["Samoa", "ws", "685"],
                ["San Marino", "sm", "378"],
                ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
                ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
                ["Senegal (Sénégal)", "sn", "221"],
                ["Serbia (Србија)", "rs", "381"],
                ["Seychelles", "sc", "248"],
                ["Sierra Leone", "sl", "232"],
                ["Singapore", "sg", "65"],
                ["Sint Maarten", "sx", "1", 21, ["721"]],
                ["Slovakia (Slovensko)", "sk", "421"],
                ["Slovenia (Slovenija)", "si", "386"],
                ["Solomon Islands", "sb", "677"],
                ["Somalia (Soomaaliya)", "so", "252"],
                ["South Africa", "za", "27"],
                ["South Korea (대한민국)", "kr", "82"],
                ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
                ["Spain (España)", "es", "34"],
                ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
                ["Sudan (‫السودان‬‎)", "sd", "249"],
                ["Suriname", "sr", "597"],
                ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
                ["Sweden (Sverige)", "se", "46"],
                ["Switzerland (Schweiz)", "ch", "41"],
                ["Syria (‫سوريا‬‎)", "sy", "963"],
                ["Taiwan (台灣)", "tw", "886"],
                ["Tajikistan", "tj", "992"],
                ["Tanzania", "tz", "255"],
                ["Thailand (ไทย)", "th", "66"],
                ["Timor-Leste", "tl", "670"],
                ["Togo", "tg", "228"],
                ["Tokelau", "tk", "690"],
                ["Tonga", "to", "676"],
                ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
                ["Tunisia (‫تونس‬‎)", "tn", "216"],
                ["Turkey (Türkiye)", "tr", "90"],
                ["Turkmenistan", "tm", "993"],
                ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
                ["Tuvalu", "tv", "688"],
                ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
                ["Uganda", "ug", "256"],
                ["Ukraine (Україна)", "ua", "380"],
                ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
                ["United Kingdom", "gb", "44", 0],
                ["United States", "us", "1", 0],
                ["Uruguay", "uy", "598"],
                ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
                ["Vanuatu", "vu", "678"],
                ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
                ["Venezuela", "ve", "58"],
                ["Vietnam (Việt Nam)", "vn", "84"],
                ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
                ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
                ["Yemen (‫اليمن‬‎)", "ye", "967"],
                ["Zambia", "zm", "260"],
                ["Zimbabwe", "zw", "263"],
                ["Åland Islands", "ax", "358", 1, ["18"]],
            ];
            // loop over all of the countries above, restructuring the data to be objects with named keys
            for (var i = 0; i < allCountries.length; i++) {
                var c = allCountries[i];
                allCountries[i] = {
                    name: c[0],
                    iso2: c[1],
                    dialCode: c[2],
                    priority: c[3] || 0,
                    areaCodes: c[4] || null,
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }
            var intlTelInputGlobals = {
                getInstance: function getInstance(input) {
                    var id = input.getAttribute("data-intl-tel-input-id");
                    return window.intlTelInputGlobals.instances[id];
                },
                instances: {},
                // using a global like this allows us to mock it in the tests
                documentReady: function documentReady() {
                    return document.readyState === "complete";
                },
            };
            if (typeof window === "object") window.intlTelInputGlobals = intlTelInputGlobals;
            // these vars persist through all instances of the plugin
            var id = 0;
            var defaults = {
                // whether or not to allow the dropdown
                allowDropdown: true,
                // if there is just a dial code in the input: remove it on blur
                autoHideDialCode: true,
                // add a placeholder in the input with an example number for the selected country
                autoPlaceholder: "polite",
                // modify the parentClass
                customContainer: "",
                // modify the auto placeholder
                customPlaceholder: null,
                // append menu to specified element
                dropdownContainer: null,
                // don't display these countries
                excludeCountries: [],
                // format the input value during initialisation and on setNumber
                formatOnDisplay: true,
                // geoIp lookup function
                geoIpLookup: null,
                // inject a hidden input with this name, and on submit, populate it with the result of getNumber
                hiddenInput: "",
                // initial country
                initialCountry: "",
                // localized country names e.g. { 'de': 'Deutschland' }
                localizedCountries: null,
                // don't insert international dial codes
                nationalMode: true,
                // display only these countries
                onlyCountries: [],
                // number type to use for placeholders
                placeholderNumberType: "MOBILE",
                // the countries at the top of the list. defaults to united states and united kingdom
                preferredCountries: ["us", "gb"],
                // display the country dial code next to the selected flag so it's not part of the typed number
                separateDialCode: false,
                // specify the path to the libphonenumber script to enable validation/formatting
                utilsScript: "",
            };
            // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
            var regionlessNanpNumbers = [
                "800",
                "822",
                "833",
                "844",
                "855",
                "866",
                "877",
                "880",
                "881",
                "882",
                "883",
                "884",
                "885",
                "886",
                "887",
                "888",
                "889",
            ];
            // utility function to iterate over an object. can't use Object.entries or native forEach because
            // of IE11
            var forEachProp = function forEachProp(obj, callback) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    callback(keys[i], obj[keys[i]]);
                }
            };
            // run a method on each instance of the plugin
            var forEachInstance = function forEachInstance(method) {
                forEachProp(window.intlTelInputGlobals.instances, function (key) {
                    window.intlTelInputGlobals.instances[key][method]();
                });
            };
            // this is our plugin class that we will create an instance of
            // eslint-disable-next-line no-unused-vars
            var Iti =
                /*#__PURE__*/
                (function () {
                    function Iti(input, options) {
                        var _this = this;
                        _classCallCheck(this, Iti);
                        this.id = id++;
                        this.telInput = input;
                        this.activeItem = null;
                        this.highlightedItem = null;
                        // process specified options / defaults
                        // alternative to Object.assign, which isn't supported by IE11
                        var customOptions = options || {};
                        this.options = {};
                        forEachProp(defaults, function (key, value) {
                            _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
                        });
                        this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
                    }
                    _createClass(Iti, [
                        {
                            key: "_init",
                            value: function _init() {
                                var _this2 = this;
                                // if in nationalMode, disable options relating to dial codes
                                if (this.options.nationalMode) this.options.autoHideDialCode = false;
                                // if separateDialCode then doesn't make sense to A) insert dial code into input
                                // (autoHideDialCode), and B) display national numbers (because we're displaying the country
                                // dial code next to them)
                                if (this.options.separateDialCode) {
                                    this.options.autoHideDialCode = this.options.nationalMode = false;
                                }
                                // we cannot just test screen size as some smartphones/website meta tags will report desktop
                                // resolutions
                                // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
                                // rest of these declarations
                                // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
                                this.isMobile =
                                    /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                        navigator.userAgent
                                    );
                                if (this.isMobile) {
                                    // trigger the mobile dropdown css
                                    document.body.classList.add("iti-mobile");
                                    // on mobile, we want a full screen dropdown, so we must append it to the body
                                    if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                                }
                                // these promises get resolved when their individual requests complete
                                // this way the dev can do something like iti.promise.then(...) to know when all requests are
                                // complete
                                if (typeof Promise !== "undefined") {
                                    var autoCountryPromise = new Promise(function (resolve, reject) {
                                        _this2.resolveAutoCountryPromise = resolve;
                                        _this2.rejectAutoCountryPromise = reject;
                                    });
                                    var utilsScriptPromise = new Promise(function (resolve, reject) {
                                        _this2.resolveUtilsScriptPromise = resolve;
                                        _this2.rejectUtilsScriptPromise = reject;
                                    });
                                    this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
                                } else {
                                    // prevent errors when Promise doesn't exist
                                    this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function () {};
                                    this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function () {};
                                }
                                // in various situations there could be no country selected initially, but we need to be able
                                // to assume this variable exists
                                this.selectedCountryData = {};
                                // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                                this._processCountryData();
                                // generate the markup
                                this._generateMarkup();
                                // set the initial state of the input value and the selected flag
                                this._setInitialState();
                                // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
                                this._initListeners();
                                // utils script, and auto country
                                this._initRequests();
                            },
                        },
                        {
                            key: "_processCountryData",
                            value: function _processCountryData() {
                                // process onlyCountries or excludeCountries array if present
                                this._processAllCountries();
                                // process the countryCodes map
                                this._processCountryCodes();
                                // process the preferredCountries
                                this._processPreferredCountries();
                                // translate countries according to localizedCountries option
                                if (this.options.localizedCountries) this._translateCountriesByLocale();
                                // sort countries by name
                                if (this.options.onlyCountries.length || this.options.localizedCountries) {
                                    this.countries.sort(this._countryNameSort);
                                }
                            },
                        },
                        {
                            key: "_addCountryCode",
                            value: function _addCountryCode(iso2, countryCode, priority) {
                                if (countryCode.length > this.countryCodeMaxLen) {
                                    this.countryCodeMaxLen = countryCode.length;
                                }
                                if (!this.countryCodes.hasOwnProperty(countryCode)) {
                                    this.countryCodes[countryCode] = [];
                                }
                                // bail if we already have this country for this countryCode
                                for (var i = 0; i < this.countryCodes[countryCode].length; i++) {
                                    if (this.countryCodes[countryCode][i] === iso2) return;
                                }
                                // check for undefined as 0 is falsy
                                var index = priority !== undefined$1 ? priority : this.countryCodes[countryCode].length;
                                this.countryCodes[countryCode][index] = iso2;
                            },
                        },
                        {
                            key: "_processAllCountries",
                            value: function _processAllCountries() {
                                if (this.options.onlyCountries.length) {
                                    var lowerCaseOnlyCountries = this.options.onlyCountries.map(function (country) {
                                        return country.toLowerCase();
                                    });
                                    this.countries = allCountries.filter(function (country) {
                                        return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                                    });
                                } else if (this.options.excludeCountries.length) {
                                    var lowerCaseExcludeCountries = this.options.excludeCountries.map(function (
                                        country
                                    ) {
                                        return country.toLowerCase();
                                    });
                                    this.countries = allCountries.filter(function (country) {
                                        return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                                    });
                                } else {
                                    this.countries = allCountries;
                                }
                            },
                        },
                        {
                            key: "_translateCountriesByLocale",
                            value: function _translateCountriesByLocale() {
                                for (var i = 0; i < this.countries.length; i++) {
                                    var iso = this.countries[i].iso2.toLowerCase();
                                    if (this.options.localizedCountries.hasOwnProperty(iso)) {
                                        this.countries[i].name = this.options.localizedCountries[iso];
                                    }
                                }
                            },
                        },
                        {
                            key: "_countryNameSort",
                            value: function _countryNameSort(a, b) {
                                return a.name.localeCompare(b.name);
                            },
                        },
                        {
                            key: "_processCountryCodes",
                            value: function _processCountryCodes() {
                                this.countryCodeMaxLen = 0;
                                // here we store just dial codes
                                this.dialCodes = {};
                                // here we store "country codes" (both dial codes and their area codes)
                                this.countryCodes = {};
                                // first: add dial codes
                                for (var i = 0; i < this.countries.length; i++) {
                                    var c = this.countries[i];
                                    if (!this.dialCodes[c.dialCode]) this.dialCodes[c.dialCode] = true;
                                    this._addCountryCode(c.iso2, c.dialCode, c.priority);
                                }
                                // next: add area codes
                                // this is a second loop over countries, to make sure we have all of the "root" countries
                                // already in the map, so that we can access them, as each time we add an area code substring
                                // to the map, we also need to include the "root" country's code, as that also matches
                                for (var _i = 0; _i < this.countries.length; _i++) {
                                    var _c = this.countries[_i];
                                    // area codes
                                    if (_c.areaCodes) {
                                        var rootCountryCode = this.countryCodes[_c.dialCode][0];
                                        // for each area code
                                        for (var j = 0; j < _c.areaCodes.length; j++) {
                                            var areaCode = _c.areaCodes[j];
                                            // for each digit in the area code to add all partial matches as well
                                            for (var k = 1; k < areaCode.length; k++) {
                                                var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                                // start with the root country, as that also matches this dial code
                                                this._addCountryCode(rootCountryCode, partialDialCode);
                                                this._addCountryCode(_c.iso2, partialDialCode);
                                            }
                                            // add the full area code
                                            this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                                        }
                                    }
                                }
                            },
                        },
                        {
                            key: "_processPreferredCountries",
                            value: function _processPreferredCountries() {
                                this.preferredCountries = [];
                                for (var i = 0; i < this.options.preferredCountries.length; i++) {
                                    var countryCode = this.options.preferredCountries[i].toLowerCase();
                                    var countryData = this._getCountryData(countryCode, false, true);
                                    if (countryData) this.preferredCountries.push(countryData);
                                }
                            },
                        },
                        {
                            key: "_createEl",
                            value: function _createEl(name, attrs, container) {
                                var el = document.createElement(name);
                                if (attrs)
                                    forEachProp(attrs, function (key, value) {
                                        return el.setAttribute(key, value);
                                    });
                                if (container) container.appendChild(el);
                                return el;
                            },
                        },
                        {
                            key: "_generateMarkup",
                            value: function _generateMarkup() {
                                // if autocomplete does not exist on the element and its form, then
                                // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                                // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                                // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
                                if (
                                    !this.telInput.hasAttribute("autocomplete") &&
                                    !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))
                                ) {
                                    this.telInput.setAttribute("autocomplete", "off");
                                }
                                // containers (mostly for positioning)
                                var parentClass = "iti";
                                if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
                                if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
                                if (this.options.customContainer) {
                                    parentClass += " ";
                                    parentClass += this.options.customContainer;
                                }
                                var wrapper = this._createEl("div", {
                                    class: parentClass,
                                });
                                this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                                this.flagsContainer = this._createEl(
                                    "div",
                                    {
                                        class: "iti__flag-container",
                                    },
                                    wrapper
                                );
                                wrapper.appendChild(this.telInput);
                                // selected flag (displayed to left of input)
                                this.selectedFlag = this._createEl(
                                    "div",
                                    {
                                        class: "iti__selected-flag",
                                        role: "combobox",
                                        "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                                        "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                                        "aria-expanded": "false",
                                    },
                                    this.flagsContainer
                                );
                                this.selectedFlagInner = this._createEl(
                                    "div",
                                    {
                                        class: "iti__flag",
                                    },
                                    this.selectedFlag
                                );
                                if (this.options.separateDialCode) {
                                    this.selectedDialCode = this._createEl(
                                        "div",
                                        {
                                            class: "iti__selected-dial-code",
                                        },
                                        this.selectedFlag
                                    );
                                }
                                if (this.options.allowDropdown) {
                                    // make element focusable and tab navigable
                                    this.selectedFlag.setAttribute("tabindex", "0");
                                    this.dropdownArrow = this._createEl(
                                        "div",
                                        {
                                            class: "iti__arrow",
                                        },
                                        this.selectedFlag
                                    );
                                    // country dropdown: preferred countries, then divider, then all countries
                                    this.countryList = this._createEl("ul", {
                                        class: "iti__country-list iti__hide",
                                        id: "iti-".concat(this.id, "__country-listbox"),
                                        role: "listbox",
                                        "aria-label": "List of countries",
                                    });
                                    if (this.preferredCountries.length) {
                                        this._appendListItems(this.preferredCountries, "iti__preferred", true);
                                        this._createEl(
                                            "li",
                                            {
                                                class: "iti__divider",
                                                role: "separator",
                                                "aria-disabled": "true",
                                            },
                                            this.countryList
                                        );
                                    }
                                    this._appendListItems(this.countries, "iti__standard");
                                    // create dropdownContainer markup
                                    if (this.options.dropdownContainer) {
                                        this.dropdown = this._createEl("div", {
                                            class: "iti iti--container",
                                        });
                                        this.dropdown.appendChild(this.countryList);
                                    } else {
                                        this.flagsContainer.appendChild(this.countryList);
                                    }
                                }
                                if (this.options.hiddenInput) {
                                    var hiddenInputName = this.options.hiddenInput;
                                    var name = this.telInput.getAttribute("name");
                                    if (name) {
                                        var i = name.lastIndexOf("[");
                                        // if input name contains square brackets, then give the hidden input the same name,
                                        // replacing the contents of the last set of brackets with the given hiddenInput name
                                        if (i !== -1)
                                            hiddenInputName = ""
                                                .concat(name.substr(0, i), "[")
                                                .concat(hiddenInputName, "]");
                                    }
                                    this.hiddenInput = this._createEl("input", {
                                        type: "hidden",
                                        name: hiddenInputName,
                                    });
                                    wrapper.appendChild(this.hiddenInput);
                                }
                            },
                        },
                        {
                            key: "_appendListItems",
                            value: function _appendListItems(countries, className, preferred) {
                                // we create so many DOM elements, it is faster to build a temp string
                                // and then add everything to the DOM in one go at the end
                                var tmp = "";
                                // for each country
                                for (var i = 0; i < countries.length; i++) {
                                    var c = countries[i];
                                    var idSuffix = preferred ? "-preferred" : "";
                                    // open the list item
                                    tmp += "<li class='iti__country "
                                        .concat(className, "' tabIndex='-1' id='iti-")
                                        .concat(this.id, "__item-")
                                        .concat(c.iso2)
                                        .concat(idSuffix, "' role='option' data-dial-code='")
                                        .concat(c.dialCode, "' data-country-code='")
                                        .concat(c.iso2, "' aria-selected='false'>");
                                    // add the flag
                                    tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(
                                        c.iso2,
                                        "'></div></div>"
                                    );
                                    // and the country name and dial code
                                    tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
                                    tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                                    // close the list item
                                    tmp += "</li>";
                                }
                                this.countryList.insertAdjacentHTML("beforeend", tmp);
                            },
                        },
                        {
                            key: "_setInitialState",
                            value: function _setInitialState() {
                                // fix firefox bug: when first load page (with input with value set to number with intl dial
                                // code) and initialising plugin removes the dial code from the input, then refresh page,
                                // and we try to init plugin again but this time on number without dial code so get grey flag
                                var attributeValue = this.telInput.getAttribute("value");
                                var inputValue = this.telInput.value;
                                var useAttribute =
                                    attributeValue &&
                                    attributeValue.charAt(0) === "+" &&
                                    (!inputValue || inputValue.charAt(0) !== "+");
                                var val = useAttribute ? attributeValue : inputValue;
                                var dialCode = this._getDialCode(val);
                                var isRegionlessNanp = this._isRegionlessNanp(val);
                                var _this$options = this.options,
                                    initialCountry = _this$options.initialCountry,
                                    nationalMode = _this$options.nationalMode,
                                    autoHideDialCode = _this$options.autoHideDialCode,
                                    separateDialCode = _this$options.separateDialCode;
                                // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                                // flag, else fall back to the default country
                                if (dialCode && !isRegionlessNanp) {
                                    this._updateFlagFromNumber(val);
                                } else if (initialCountry !== "auto") {
                                    // see if we should select a flag
                                    if (initialCountry) {
                                        this._setFlag(initialCountry.toLowerCase());
                                    } else {
                                        if (dialCode && isRegionlessNanp) {
                                            // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                                            this._setFlag("us");
                                        } else {
                                            // no dial code and no initialCountry, so default to first in list
                                            this.defaultCountry = this.preferredCountries.length
                                                ? this.preferredCountries[0].iso2
                                                : this.countries[0].iso2;
                                            if (!val) {
                                                this._setFlag(this.defaultCountry);
                                            }
                                        }
                                    }
                                    // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                                    if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                                        this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                                    }
                                }
                                // NOTE: if initialCountry is set to auto, that will be handled separately
                                // format - note this wont be run after _updateDialCode as that's only called if no val
                                if (val) this._updateValFromNumber(val);
                            },
                        },
                        {
                            key: "_initListeners",
                            value: function _initListeners() {
                                this._initKeyListeners();
                                if (this.options.autoHideDialCode) this._initBlurListeners();
                                if (this.options.allowDropdown) this._initDropdownListeners();
                                if (this.hiddenInput) this._initHiddenInputListener();
                            },
                        },
                        {
                            key: "_initHiddenInputListener",
                            value: function _initHiddenInputListener() {
                                var _this3 = this;
                                this._handleHiddenInputSubmit = function () {
                                    _this3.hiddenInput.value = _this3.getNumber();
                                };
                                if (this.telInput.form)
                                    this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                            },
                        },
                        {
                            key: "_getClosestLabel",
                            value: function _getClosestLabel() {
                                var el = this.telInput;
                                while (el && el.tagName !== "LABEL") {
                                    el = el.parentNode;
                                }
                                return el;
                            },
                        },
                        {
                            key: "_initDropdownListeners",
                            value: function _initDropdownListeners() {
                                var _this4 = this;
                                // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                                // open the dropdown would then automatically trigger a 2nd click on the input which would
                                // close it again
                                this._handleLabelClick = function (e) {
                                    // if the dropdown is closed, then focus the input, else ignore the click
                                    if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus();
                                    else e.preventDefault();
                                };
                                var label = this._getClosestLabel();
                                if (label) label.addEventListener("click", this._handleLabelClick);
                                // toggle country dropdown on click
                                this._handleClickSelectedFlag = function () {
                                    // only intercept this event if we're opening the dropdown
                                    // else let it bubble up to the top ("click-off-to-close" listener)
                                    // we cannot just stopPropagation as it may be needed to close another instance
                                    if (
                                        _this4.countryList.classList.contains("iti__hide") &&
                                        !_this4.telInput.disabled &&
                                        !_this4.telInput.readOnly
                                    ) {
                                        _this4._showDropdown();
                                    }
                                };
                                this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                                // open dropdown list if currently focused
                                this._handleFlagsContainerKeydown = function (e) {
                                    var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
                                    if (
                                        isDropdownHidden &&
                                        ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(e.key) !== -1
                                    ) {
                                        // prevent form from being submitted if "ENTER" was pressed
                                        e.preventDefault();
                                        // prevent event from being handled again by document
                                        e.stopPropagation();
                                        _this4._showDropdown();
                                    }
                                    // allow navigation from dropdown to input on TAB
                                    if (e.key === "Tab") _this4._closeDropdown();
                                };
                                this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
                            },
                        },
                        {
                            key: "_initRequests",
                            value: function _initRequests() {
                                var _this5 = this;
                                // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                                if (this.options.utilsScript && !window.intlTelInputUtils) {
                                    // if the plugin is being initialised after the window.load event has already been fired
                                    if (window.intlTelInputGlobals.documentReady()) {
                                        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                                    } else {
                                        // wait until the load event so we don't block any other requests e.g. the flags image
                                        window.addEventListener("load", function () {
                                            window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                                        });
                                    }
                                } else this.resolveUtilsScriptPromise();
                                if (this.options.initialCountry === "auto") this._loadAutoCountry();
                                else this.resolveAutoCountryPromise();
                            },
                        },
                        {
                            key: "_loadAutoCountry",
                            value: function _loadAutoCountry() {
                                // 3 options:
                                // 1) already loaded (we're done)
                                // 2) not already started loading (start)
                                // 3) already started loading (do nothing - just wait for loading callback to fire)
                                if (window.intlTelInputGlobals.autoCountry) {
                                    this.handleAutoCountry();
                                } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                                    // don't do this twice!
                                    window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                                    if (typeof this.options.geoIpLookup === "function") {
                                        this.options.geoIpLookup(
                                            function (countryCode) {
                                                window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                                                // tell all instances the auto country is ready
                                                // TODO: this should just be the current instances
                                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                                                // setTimeout means that the current thread of execution will finish before executing
                                                // this, which allows the plugin to finish initialising.
                                                setTimeout(function () {
                                                    return forEachInstance("handleAutoCountry");
                                                });
                                            },
                                            function () {
                                                return forEachInstance("rejectAutoCountryPromise");
                                            }
                                        );
                                    }
                                }
                            },
                        },
                        {
                            key: "_initKeyListeners",
                            value: function _initKeyListeners() {
                                var _this6 = this;
                                // update flag on keyup
                                this._handleKeyupEvent = function () {
                                    if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                                        _this6._triggerCountryChange();
                                    }
                                };
                                this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                                // update flag on cut/paste events (now supported in all major browsers)
                                this._handleClipboardEvent = function () {
                                    // hack because "paste" event is fired before input is updated
                                    setTimeout(_this6._handleKeyupEvent);
                                };
                                this.telInput.addEventListener("cut", this._handleClipboardEvent);
                                this.telInput.addEventListener("paste", this._handleClipboardEvent);
                            },
                        },
                        {
                            key: "_cap",
                            value: function _cap(number) {
                                var max = this.telInput.getAttribute("maxlength");
                                return max && number.length > max ? number.substr(0, max) : number;
                            },
                        },
                        {
                            key: "_initBlurListeners",
                            value: function _initBlurListeners() {
                                var _this7 = this;
                                // on blur or form submit: if just a dial code then remove it
                                this._handleSubmitOrBlurEvent = function () {
                                    _this7._removeEmptyDialCode();
                                };
                                if (this.telInput.form)
                                    this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                                this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
                            },
                        },
                        {
                            key: "_removeEmptyDialCode",
                            value: function _removeEmptyDialCode() {
                                if (this.telInput.value.charAt(0) === "+") {
                                    var numeric = this._getNumeric(this.telInput.value);
                                    // if just a plus, or if just a dial code
                                    if (!numeric || this.selectedCountryData.dialCode === numeric) {
                                        this.telInput.value = "";
                                    }
                                }
                            },
                        },
                        {
                            key: "_getNumeric",
                            value: function _getNumeric(s) {
                                return s.replace(/\D/g, "");
                            },
                        },
                        {
                            key: "_trigger",
                            value: function _trigger(name) {
                                // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
                                var e = document.createEvent("Event");
                                e.initEvent(name, true, true);
                                // can bubble, and is cancellable
                                this.telInput.dispatchEvent(e);
                            },
                        },
                        {
                            key: "_showDropdown",
                            value: function _showDropdown() {
                                this.countryList.classList.remove("iti__hide");
                                this.selectedFlag.setAttribute("aria-expanded", "true");
                                this._setDropdownPosition();
                                // update highlighting and scroll to active list item
                                if (this.activeItem) {
                                    this._highlightListItem(this.activeItem, false);
                                    this._scrollTo(this.activeItem, true);
                                }
                                // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                                this._bindDropdownListeners();
                                // update the arrow
                                this.dropdownArrow.classList.add("iti__arrow--up");
                                this._trigger("open:countrydropdown");
                            },
                        },
                        {
                            key: "_toggleClass",
                            value: function _toggleClass(el, className, shouldHaveClass) {
                                if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className);
                                else if (!shouldHaveClass && el.classList.contains(className))
                                    el.classList.remove(className);
                            },
                        },
                        {
                            key: "_setDropdownPosition",
                            value: function _setDropdownPosition() {
                                var _this8 = this;
                                if (this.options.dropdownContainer) {
                                    this.options.dropdownContainer.appendChild(this.dropdown);
                                }
                                if (!this.isMobile) {
                                    var pos = this.telInput.getBoundingClientRect();
                                    // windowTop from https://stackoverflow.com/a/14384091/217866
                                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                                    var inputTop = pos.top + windowTop;
                                    var dropdownHeight = this.countryList.offsetHeight;
                                    // dropdownFitsBelow = (dropdownBottom < windowBottom)
                                    var dropdownFitsBelow =
                                        inputTop + this.telInput.offsetHeight + dropdownHeight <
                                        windowTop + window.innerHeight;
                                    var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                                    // by default, the dropdown will be below the input. If we want to position it above the
                                    // input, we add the dropup class.
                                    this._toggleClass(
                                        this.countryList,
                                        "iti__country-list--dropup",
                                        !dropdownFitsBelow && dropdownFitsAbove
                                    );
                                    // if dropdownContainer is enabled, calculate postion
                                    if (this.options.dropdownContainer) {
                                        // by default the dropdown will be directly over the input because it's not in the flow.
                                        // If we want to position it below, we need to add some extra top value.
                                        var extraTop =
                                            !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                                        // calculate placement
                                        this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                                        this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                                        // close menu on window scroll
                                        this._handleWindowScroll = function () {
                                            return _this8._closeDropdown();
                                        };
                                        window.addEventListener("scroll", this._handleWindowScroll);
                                    }
                                }
                            },
                        },
                        {
                            key: "_getClosestListItem",
                            value: function _getClosestListItem(target) {
                                var el = target;
                                while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
                                    el = el.parentNode;
                                }
                                // if we reached the countryList element, then return null
                                return el === this.countryList ? null : el;
                            },
                        },
                        {
                            key: "_bindDropdownListeners",
                            value: function _bindDropdownListeners() {
                                var _this9 = this;
                                // when mouse over a list item, just highlight that one
                                // we add the class "highlight", so if they hit "enter" we know which one to select
                                this._handleMouseoverCountryList = function (e) {
                                    // handle event delegation, as we're listening for this event on the countryList
                                    var listItem = _this9._getClosestListItem(e.target);
                                    if (listItem) _this9._highlightListItem(listItem, false);
                                };
                                this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                                // listen for country selection
                                this._handleClickCountryList = function (e) {
                                    var listItem = _this9._getClosestListItem(e.target);
                                    if (listItem) _this9._selectListItem(listItem);
                                };
                                this.countryList.addEventListener("click", this._handleClickCountryList);
                                // click off to close
                                // (except when this initial opening click is bubbling up)
                                // we cannot just stopPropagation as it may be needed to close another instance
                                var isOpening = true;
                                this._handleClickOffToClose = function () {
                                    if (!isOpening) _this9._closeDropdown();
                                    isOpening = false;
                                };
                                document.documentElement.addEventListener("click", this._handleClickOffToClose);
                                // listen for up/down scrolling, enter to select, or letters to jump to country name.
                                // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                                // just hit down and hold it to scroll down (no keyup event).
                                // listen on the document because that's where key events are triggered if no input has focus
                                var query = "";
                                var queryTimer = null;
                                this._handleKeydownOnDropdown = function (e) {
                                    // prevent down key from scrolling the whole page,
                                    // and enter key from submitting a form etc
                                    e.preventDefault();
                                    // up and down to navigate
                                    if (
                                        e.key === "ArrowUp" ||
                                        e.key === "Up" ||
                                        e.key === "ArrowDown" ||
                                        e.key === "Down"
                                    )
                                        _this9._handleUpDownKey(e.key);
                                    else if (e.key === "Enter") _this9._handleEnterKey();
                                    else if (e.key === "Escape") _this9._closeDropdown();
                                    else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                                        // jump to countries that start with the query string
                                        if (queryTimer) clearTimeout(queryTimer);
                                        query += e.key.toLowerCase();
                                        _this9._searchForCountry(query);
                                        // if the timer hits 1 second, reset the query
                                        queryTimer = setTimeout(function () {
                                            query = "";
                                        }, 1e3);
                                    }
                                };
                                document.addEventListener("keydown", this._handleKeydownOnDropdown);
                            },
                        },
                        {
                            key: "_handleUpDownKey",
                            value: function _handleUpDownKey(key) {
                                var next =
                                    key === "ArrowUp" || key === "Up"
                                        ? this.highlightedItem.previousElementSibling
                                        : this.highlightedItem.nextElementSibling;
                                if (next) {
                                    // skip the divider
                                    if (next.classList.contains("iti__divider")) {
                                        next =
                                            key === "ArrowUp" || key === "Up"
                                                ? next.previousElementSibling
                                                : next.nextElementSibling;
                                    }
                                    this._highlightListItem(next, true);
                                }
                            },
                        },
                        {
                            key: "_handleEnterKey",
                            value: function _handleEnterKey() {
                                if (this.highlightedItem) this._selectListItem(this.highlightedItem);
                            },
                        },
                        {
                            key: "_searchForCountry",
                            value: function _searchForCountry(query) {
                                for (var i = 0; i < this.countries.length; i++) {
                                    if (this._startsWith(this.countries[i].name, query)) {
                                        var listItem = this.countryList.querySelector(
                                            "#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2)
                                        );
                                        // update highlighting and scroll
                                        this._highlightListItem(listItem, false);
                                        this._scrollTo(listItem, true);
                                        break;
                                    }
                                }
                            },
                        },
                        {
                            key: "_startsWith",
                            value: function _startsWith(a, b) {
                                return a.substr(0, b.length).toLowerCase() === b;
                            },
                        },
                        {
                            key: "_updateValFromNumber",
                            value: function _updateValFromNumber(originalNumber) {
                                var number = originalNumber;
                                if (
                                    this.options.formatOnDisplay &&
                                    window.intlTelInputUtils &&
                                    this.selectedCountryData
                                ) {
                                    var useNational =
                                        !this.options.separateDialCode &&
                                        (this.options.nationalMode || number.charAt(0) !== "+");
                                    var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat,
                                        NATIONAL = _intlTelInputUtils$nu.NATIONAL,
                                        INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                                    var format = useNational ? NATIONAL : INTERNATIONAL;
                                    number = intlTelInputUtils.formatNumber(
                                        number,
                                        this.selectedCountryData.iso2,
                                        format
                                    );
                                }
                                number = this._beforeSetNumber(number);
                                this.telInput.value = number;
                            },
                        },
                        {
                            key: "_updateFlagFromNumber",
                            value: function _updateFlagFromNumber(originalNumber) {
                                // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
                                // with a +1 so _getDialCode will be able to extract the area code
                                // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                                // from the number), that means we're initialising the plugin with a number that already has a
                                // dial code, so fine to ignore this bit
                                var number = originalNumber;
                                var selectedDialCode = this.selectedCountryData.dialCode;
                                var isNanp = selectedDialCode === "1";
                                if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
                                    if (number.charAt(0) !== "1") number = "1".concat(number);
                                    number = "+".concat(number);
                                }
                                // update flag if user types area code for another country
                                if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                                    number = "+".concat(selectedDialCode).concat(number);
                                }
                                // try and extract valid dial code from input
                                var dialCode = this._getDialCode(number, true);
                                var numeric = this._getNumeric(number);
                                var countryCode = null;
                                if (dialCode) {
                                    var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                                    // check if the right country is already selected. this should be false if the number is
                                    // longer than the matched dial code because in this case we need to make sure that if
                                    // there are multiple country matches, that the first one is selected (note: we could
                                    // just check that here, but it requires the same loop that we already have later)
                                    var alreadySelected =
                                        countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 &&
                                        numeric.length <= dialCode.length - 1;
                                    var isRegionlessNanpNumber =
                                        selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                                    // only update the flag if:
                                    // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                                    // AND
                                    // B) the right country is not already selected
                                    if (!isRegionlessNanpNumber && !alreadySelected) {
                                        // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                                        // non-empty index
                                        for (var j = 0; j < countryCodes.length; j++) {
                                            if (countryCodes[j]) {
                                                countryCode = countryCodes[j];
                                                break;
                                            }
                                        }
                                    }
                                } else if (number.charAt(0) === "+" && numeric.length) {
                                    // invalid dial code, so empty
                                    // Note: use getNumeric here because the number has not been formatted yet, so could contain
                                    // bad chars
                                    countryCode = "";
                                } else if (!number || number === "+") {
                                    // empty, or just a plus, so default
                                    countryCode = this.defaultCountry;
                                }
                                if (countryCode !== null) {
                                    return this._setFlag(countryCode);
                                }
                                return false;
                            },
                        },
                        {
                            key: "_isRegionlessNanp",
                            value: function _isRegionlessNanp(number) {
                                var numeric = this._getNumeric(number);
                                if (numeric.charAt(0) === "1") {
                                    var areaCode = numeric.substr(1, 3);
                                    return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                                }
                                return false;
                            },
                        },
                        {
                            key: "_highlightListItem",
                            value: function _highlightListItem(listItem, shouldFocus) {
                                var prevItem = this.highlightedItem;
                                if (prevItem) prevItem.classList.remove("iti__highlight");
                                this.highlightedItem = listItem;
                                this.highlightedItem.classList.add("iti__highlight");
                                if (shouldFocus) this.highlightedItem.focus();
                            },
                        },
                        {
                            key: "_getCountryData",
                            value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                                var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                                for (var i = 0; i < countryList.length; i++) {
                                    if (countryList[i].iso2 === countryCode) {
                                        return countryList[i];
                                    }
                                }
                                if (allowFail) {
                                    return null;
                                }
                                throw new Error("No country data for '".concat(countryCode, "'"));
                            },
                        },
                        {
                            key: "_setFlag",
                            value: function _setFlag(countryCode) {
                                var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                                // do this first as it will throw an error and stop if countryCode is invalid
                                this.selectedCountryData = countryCode
                                    ? this._getCountryData(countryCode, false, false)
                                    : {};
                                // update the defaultCountry - we only need the iso2 from now on, so just store that
                                if (this.selectedCountryData.iso2) {
                                    this.defaultCountry = this.selectedCountryData.iso2;
                                }
                                this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                                // update the selected country's title attribute
                                var title = countryCode
                                    ? ""
                                          .concat(this.selectedCountryData.name, ": +")
                                          .concat(this.selectedCountryData.dialCode)
                                    : "Unknown";
                                this.selectedFlag.setAttribute("title", title);
                                if (this.options.separateDialCode) {
                                    var dialCode = this.selectedCountryData.dialCode
                                        ? "+".concat(this.selectedCountryData.dialCode)
                                        : "";
                                    this.selectedDialCode.innerHTML = dialCode;
                                    // offsetWidth is zero if input is in a hidden container during initialisation
                                    var selectedFlagWidth =
                                        this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                                    // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                                    this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                                }
                                // and the input's placeholder
                                this._updatePlaceholder();
                                // update the active list item
                                if (this.options.allowDropdown) {
                                    var prevItem = this.activeItem;
                                    if (prevItem) {
                                        prevItem.classList.remove("iti__active");
                                        prevItem.setAttribute("aria-selected", "false");
                                    }
                                    if (countryCode) {
                                        // check if there is a preferred item first, else fall back to standard
                                        var nextItem =
                                            this.countryList.querySelector(
                                                "#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")
                                            ) ||
                                            this.countryList.querySelector(
                                                "#iti-".concat(this.id, "__item-").concat(countryCode)
                                            );
                                        nextItem.setAttribute("aria-selected", "true");
                                        nextItem.classList.add("iti__active");
                                        this.activeItem = nextItem;
                                        this.selectedFlag.setAttribute(
                                            "aria-activedescendant",
                                            nextItem.getAttribute("id")
                                        );
                                    }
                                }
                                // return if the flag has changed or not
                                return prevCountry.iso2 !== countryCode;
                            },
                        },
                        {
                            key: "_getHiddenSelectedFlagWidth",
                            value: function _getHiddenSelectedFlagWidth() {
                                // to get the right styling to apply, all we need is a shallow clone of the container,
                                // and then to inject a deep clone of the selectedFlag element
                                var containerClone = this.telInput.parentNode.cloneNode();
                                containerClone.style.visibility = "hidden";
                                document.body.appendChild(containerClone);
                                var flagsContainerClone = this.flagsContainer.cloneNode();
                                containerClone.appendChild(flagsContainerClone);
                                var selectedFlagClone = this.selectedFlag.cloneNode(true);
                                flagsContainerClone.appendChild(selectedFlagClone);
                                var width = selectedFlagClone.offsetWidth;
                                containerClone.parentNode.removeChild(containerClone);
                                return width;
                            },
                        },
                        {
                            key: "_updatePlaceholder",
                            value: function _updatePlaceholder() {
                                var shouldSetPlaceholder =
                                    this.options.autoPlaceholder === "aggressive" ||
                                    (!this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite");
                                if (window.intlTelInputUtils && shouldSetPlaceholder) {
                                    var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                                    var placeholder = this.selectedCountryData.iso2
                                        ? intlTelInputUtils.getExampleNumber(
                                              this.selectedCountryData.iso2,
                                              this.options.nationalMode,
                                              numberType
                                          )
                                        : "";
                                    placeholder = this._beforeSetNumber(placeholder);
                                    if (typeof this.options.customPlaceholder === "function") {
                                        placeholder = this.options.customPlaceholder(
                                            placeholder,
                                            this.selectedCountryData
                                        );
                                    }
                                    this.telInput.setAttribute("placeholder", placeholder);
                                }
                            },
                        },
                        {
                            key: "_selectListItem",
                            value: function _selectListItem(listItem) {
                                // update selected flag and active list item
                                var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                                this._closeDropdown();
                                this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
                                // focus the input
                                this.telInput.focus();
                                // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
                                // inserting dial code), who try to put the cursor at the beginning the first time
                                var len = this.telInput.value.length;
                                this.telInput.setSelectionRange(len, len);
                                if (flagChanged) {
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "_closeDropdown",
                            value: function _closeDropdown() {
                                this.countryList.classList.add("iti__hide");
                                this.selectedFlag.setAttribute("aria-expanded", "false");
                                // update the arrow
                                this.dropdownArrow.classList.remove("iti__arrow--up");
                                // unbind key events
                                document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                                document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                                this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                                this.countryList.removeEventListener("click", this._handleClickCountryList);
                                // remove menu from container
                                if (this.options.dropdownContainer) {
                                    if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                                    if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                                }
                                this._trigger("close:countrydropdown");
                            },
                        },
                        {
                            key: "_scrollTo",
                            value: function _scrollTo(element, middle) {
                                var container = this.countryList;
                                // windowTop from https://stackoverflow.com/a/14384091/217866
                                var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                                var containerHeight = container.offsetHeight;
                                var containerTop = container.getBoundingClientRect().top + windowTop;
                                var containerBottom = containerTop + containerHeight;
                                var elementHeight = element.offsetHeight;
                                var elementTop = element.getBoundingClientRect().top + windowTop;
                                var elementBottom = elementTop + elementHeight;
                                var newScrollTop = elementTop - containerTop + container.scrollTop;
                                var middleOffset = containerHeight / 2 - elementHeight / 2;
                                if (elementTop < containerTop) {
                                    // scroll up
                                    if (middle) newScrollTop -= middleOffset;
                                    container.scrollTop = newScrollTop;
                                } else if (elementBottom > containerBottom) {
                                    // scroll down
                                    if (middle) newScrollTop += middleOffset;
                                    var heightDifference = containerHeight - elementHeight;
                                    container.scrollTop = newScrollTop - heightDifference;
                                }
                            },
                        },
                        {
                            key: "_updateDialCode",
                            value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
                                var inputVal = this.telInput.value;
                                // save having to pass this every time
                                var newDialCode = "+".concat(newDialCodeBare);
                                var newNumber;
                                if (inputVal.charAt(0) === "+") {
                                    // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                                    var prevDialCode = this._getDialCode(inputVal);
                                    if (prevDialCode) {
                                        // current number contains a valid dial code, so replace it
                                        newNumber = inputVal.replace(prevDialCode, newDialCode);
                                    } else {
                                        // current number contains an invalid dial code, so ditch it
                                        // (no way to determine where the invalid dial code ends and the rest of the number begins)
                                        newNumber = newDialCode;
                                    }
                                } else if (this.options.nationalMode || this.options.separateDialCode) {
                                    // don't do anything
                                    return;
                                } else {
                                    // nationalMode is disabled
                                    if (inputVal) {
                                        // there is an existing value with no dial code: prefix the new dial code
                                        newNumber = newDialCode + inputVal;
                                    } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                                        // no existing value and either they've just selected a list item, or autoHideDialCode is
                                        // disabled: insert new dial code
                                        newNumber = newDialCode;
                                    } else {
                                        return;
                                    }
                                }
                                this.telInput.value = newNumber;
                            },
                        },
                        {
                            key: "_getDialCode",
                            value: function _getDialCode(number, includeAreaCode) {
                                var dialCode = "";
                                // only interested in international numbers (starting with a plus)
                                if (number.charAt(0) === "+") {
                                    var numericChars = "";
                                    // iterate over chars
                                    for (var i = 0; i < number.length; i++) {
                                        var c = number.charAt(i);
                                        // if char is number (https://stackoverflow.com/a/8935649/217866)
                                        if (!isNaN(parseInt(c, 10))) {
                                            numericChars += c;
                                            // if current numericChars make a valid dial code
                                            if (includeAreaCode) {
                                                if (this.countryCodes[numericChars]) {
                                                    // store the actual raw string (useful for matching later)
                                                    dialCode = number.substr(0, i + 1);
                                                }
                                            } else {
                                                if (this.dialCodes[numericChars]) {
                                                    dialCode = number.substr(0, i + 1);
                                                    // if we're just looking for a dial code, we can break as soon as we find one
                                                    break;
                                                }
                                            }
                                            // stop searching as soon as we can - in this case when we hit max len
                                            if (numericChars.length === this.countryCodeMaxLen) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                return dialCode;
                            },
                        },
                        {
                            key: "_getFullNumber",
                            value: function _getFullNumber() {
                                var val = this.telInput.value.trim();
                                var dialCode = this.selectedCountryData.dialCode;
                                var prefix;
                                var numericVal = this._getNumeric(val);
                                if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                                    // when using separateDialCode, it is visible so is effectively part of the typed number
                                    prefix = "+".concat(dialCode);
                                } else {
                                    prefix = "";
                                }
                                return prefix + val;
                            },
                        },
                        {
                            key: "_beforeSetNumber",
                            value: function _beforeSetNumber(originalNumber) {
                                var number = originalNumber;
                                if (this.options.separateDialCode) {
                                    var dialCode = this._getDialCode(number);
                                    // if there is a valid dial code
                                    if (dialCode) {
                                        // in case _getDialCode returned an area code as well
                                        dialCode = "+".concat(this.selectedCountryData.dialCode);
                                        // a lot of numbers will have a space separating the dial code and the main number, and
                                        // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                                        // rid of it
                                        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                                        var start =
                                            number[dialCode.length] === " " || number[dialCode.length] === "-"
                                                ? dialCode.length + 1
                                                : dialCode.length;
                                        number = number.substr(start);
                                    }
                                }
                                return this._cap(number);
                            },
                        },
                        {
                            key: "_triggerCountryChange",
                            value: function _triggerCountryChange() {
                                this._trigger("countrychange");
                            },
                        },
                        {
                            key: "handleAutoCountry",
                            value: function handleAutoCountry() {
                                if (this.options.initialCountry === "auto") {
                                    // we must set this even if there is an initial val in the input: in case the initial val is
                                    // invalid and they delete it - they should see their auto country
                                    this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                                    // if there's no initial value in the input, then update the flag
                                    if (!this.telInput.value) {
                                        this.setCountry(this.defaultCountry);
                                    }
                                    this.resolveAutoCountryPromise();
                                }
                            },
                        },
                        {
                            key: "handleUtils",
                            value: function handleUtils() {
                                // if the request was successful
                                if (window.intlTelInputUtils) {
                                    // if there's an initial value in the input, then format it
                                    if (this.telInput.value) {
                                        this._updateValFromNumber(this.telInput.value);
                                    }
                                    this._updatePlaceholder();
                                }
                                this.resolveUtilsScriptPromise();
                            },
                        },
                        {
                            key: "destroy",
                            value: function destroy() {
                                var form = this.telInput.form;
                                if (this.options.allowDropdown) {
                                    // make sure the dropdown is closed (and unbind listeners)
                                    this._closeDropdown();
                                    this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                                    this.flagsContainer.removeEventListener(
                                        "keydown",
                                        this._handleFlagsContainerKeydown
                                    );
                                    // label click hack
                                    var label = this._getClosestLabel();
                                    if (label) label.removeEventListener("click", this._handleLabelClick);
                                }
                                // unbind hiddenInput listeners
                                if (this.hiddenInput && form)
                                    form.removeEventListener("submit", this._handleHiddenInputSubmit);
                                // unbind autoHideDialCode listeners
                                if (this.options.autoHideDialCode) {
                                    if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                                    this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                                }
                                // unbind key events, and cut/paste events
                                this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                                this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                                this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                                // remove attribute of id instance: data-intl-tel-input-id
                                this.telInput.removeAttribute("data-intl-tel-input-id");
                                // remove markup (but leave the original input)
                                var wrapper = this.telInput.parentNode;
                                wrapper.parentNode.insertBefore(this.telInput, wrapper);
                                wrapper.parentNode.removeChild(wrapper);
                                delete window.intlTelInputGlobals.instances[this.id];
                            },
                        },
                        {
                            key: "getExtension",
                            value: function getExtension() {
                                if (window.intlTelInputUtils) {
                                    return intlTelInputUtils.getExtension(
                                        this._getFullNumber(),
                                        this.selectedCountryData.iso2
                                    );
                                }
                                return "";
                            },
                        },
                        {
                            key: "getNumber",
                            value: function getNumber(format) {
                                if (window.intlTelInputUtils) {
                                    var iso2 = this.selectedCountryData.iso2;
                                    return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                                }
                                return "";
                            },
                        },
                        {
                            key: "getNumberType",
                            value: function getNumberType() {
                                if (window.intlTelInputUtils) {
                                    return intlTelInputUtils.getNumberType(
                                        this._getFullNumber(),
                                        this.selectedCountryData.iso2
                                    );
                                }
                                return -99;
                            },
                        },
                        {
                            key: "getSelectedCountryData",
                            value: function getSelectedCountryData() {
                                return this.selectedCountryData;
                            },
                        },
                        {
                            key: "getValidationError",
                            value: function getValidationError() {
                                if (window.intlTelInputUtils) {
                                    var iso2 = this.selectedCountryData.iso2;
                                    return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                                }
                                return -99;
                            },
                        },
                        {
                            key: "isValidNumber",
                            value: function isValidNumber() {
                                var val = this._getFullNumber().trim();
                                var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
                                return window.intlTelInputUtils
                                    ? intlTelInputUtils.isValidNumber(val, countryCode)
                                    : null;
                            },
                        },
                        {
                            key: "setCountry",
                            value: function setCountry(originalCountryCode) {
                                var countryCode = originalCountryCode.toLowerCase();
                                // check if already selected
                                if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
                                    this._setFlag(countryCode);
                                    this._updateDialCode(this.selectedCountryData.dialCode, false);
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "setNumber",
                            value: function setNumber(number) {
                                // we must update the flag first, which updates this.selectedCountryData, which is used for
                                // formatting the number before displaying it
                                var flagChanged = this._updateFlagFromNumber(number);
                                this._updateValFromNumber(number);
                                if (flagChanged) {
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "setPlaceholderNumberType",
                            value: function setPlaceholderNumberType(type) {
                                this.options.placeholderNumberType = type;
                                this._updatePlaceholder();
                            },
                        },
                    ]);
                    return Iti;
                })();
            /********************
             *  STATIC METHODS
             ********************/
            // get the country data object
            intlTelInputGlobals.getCountryData = function () {
                return allCountries;
            };
            // inject a <script> element to load utils.js
            var injectScript = function injectScript(path, handleSuccess, handleFailure) {
                // inject a new script element into the page
                var script = document.createElement("script");
                script.onload = function () {
                    forEachInstance("handleUtils");
                    if (handleSuccess) handleSuccess();
                };
                script.onerror = function () {
                    forEachInstance("rejectUtilsScriptPromise");
                    if (handleFailure) handleFailure();
                };
                script.className = "iti-load-utils";
                script.async = true;
                script.src = path;
                document.body.appendChild(script);
            };
            // load the utils script
            intlTelInputGlobals.loadUtils = function (path) {
                // 2 options:
                // 1) not already started loading (start)
                // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
                // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
                if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                    // only do this once
                    window.intlTelInputGlobals.startedLoadingUtilsScript = true;
                    // if we have promises, then return a promise
                    if (typeof Promise !== "undefined") {
                        return new Promise(function (resolve, reject) {
                            return injectScript(path, resolve, reject);
                        });
                    }
                    injectScript(path);
                }
                return null;
            };
            // default options
            intlTelInputGlobals.defaults = defaults;
            // version
            intlTelInputGlobals.version = "17.0.21";
            // convenience wrapper
            return function (input, options) {
                var iti = new Iti(input, options);
                iti._init();
                input.setAttribute("data-intl-tel-input-id", iti.id);
                window.intlTelInputGlobals.instances[iti.id] = iti;
                return iti;
            };
        })();
    });
})(intlTelInput$1);

/**
 * Exposing intl-tel-input as a component
 */

(function (module) {
    module.exports = intlTelInputExports;
})(intlTelInput$2);

var intlTelInput = /*@__PURE__*/ getDefaultExportFromCjs(intlTelInputExports$1);

var phoneNumberInputLibStyles =
    '.iti {\n  position: relative;\n  display: inline-block; }\n  .iti * {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .iti__hide {\n    display: none; }\n  .iti__v-hide {\n    visibility: hidden; }\n  .iti input, .iti input[type=text], .iti input[type=tel] {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .iti input, .iti input[type=text], .iti input[type=tel] {\n    position: relative;\n    z-index: 0;\n    padding-right: 36px;\n    margin-right: 0; }\n  .iti__flag-container {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    padding: 1px; }\n  .iti__selected-flag {\n    z-index: 1;\n    position: relative;\n    display: flex;\n    align-items: center;\n    height: 100%;\n    padding: 0 6px 0 8px; }\n  .iti__arrow {\n    margin-left: 6px;\n    width: 0;\n    height: 0;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n    border-top: 4px solid #555; }\n  .iti__arrow--up {\n      border-top: none;\n      border-bottom: 4px solid #555; }\n  .iti__country-list {\n    position: absolute;\n    z-index: 2;\n    list-style: none;\n    text-align: left;\n    padding: 0;\n    margin: 0 0 0 -1px;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);\n    background-color: white;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    max-height: 200px;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch; }\n  .iti__country-list--dropup {\n      bottom: 100%;\n      margin-bottom: -1px; }\n  @media (max-width: 500px) {\n      .iti__country-list {\n        white-space: normal; } }\n  .iti__flag-box {\n    display: inline-block;\n    width: 20px; }\n  .iti__divider {\n    padding-bottom: 5px;\n    margin-bottom: 5px;\n    border-bottom: 1px solid #CCC; }\n  .iti__country {\n    padding: 5px 10px;\n    outline: none; }\n  .iti__dial-code {\n    color: #999; }\n  .iti__country.iti__highlight {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .iti__flag-box, .iti__country-name, .iti__dial-code {\n    vertical-align: middle; }\n  .iti__flag-box, .iti__country-name {\n    margin-right: 6px; }\n  .iti--allow-dropdown input, .iti--allow-dropdown input[type=text], .iti--allow-dropdown input[type=tel], .iti--separate-dial-code input, .iti--separate-dial-code input[type=text], .iti--separate-dial-code input[type=tel] {\n    padding-right: 6px;\n    padding-left: 52px;\n    margin-left: 0; }\n  .iti--allow-dropdown .iti__flag-container, .iti--separate-dial-code .iti__flag-container {\n    right: auto;\n    left: 0; }\n  .iti--allow-dropdown .iti__flag-container:hover {\n    cursor: pointer; }\n  .iti--allow-dropdown .iti__flag-container:hover .iti__selected-flag {\n      background-color: rgba(0, 0, 0, 0.05); }\n  .iti--allow-dropdown input[disabled] + .iti__flag-container:hover,\n  .iti--allow-dropdown input[readonly] + .iti__flag-container:hover {\n    cursor: default; }\n  .iti--allow-dropdown input[disabled] + .iti__flag-container:hover .iti__selected-flag,\n    .iti--allow-dropdown input[readonly] + .iti__flag-container:hover .iti__selected-flag {\n      background-color: transparent; }\n  .iti--separate-dial-code .iti__selected-flag {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .iti--separate-dial-code .iti__selected-dial-code {\n    margin-left: 6px; }\n  .iti--container {\n    position: absolute;\n    top: -1000px;\n    left: -1000px;\n    z-index: 1060;\n    padding: 1px; }\n  .iti--container:hover {\n      cursor: pointer; }\n  .iti-mobile .iti--container {\n  top: 30px;\n  bottom: 30px;\n  left: 30px;\n  right: 30px;\n  position: fixed; }\n  .iti-mobile .iti__country-list {\n  max-height: 100%;\n  width: 100%; }\n  .iti-mobile .iti__country {\n  padding: 10px 10px;\n  line-height: 1.5em; }\n  .iti__flag {\n  width: 20px; }\n  .iti__flag.iti__be {\n    width: 18px; }\n  .iti__flag.iti__ch {\n    width: 15px; }\n  .iti__flag.iti__mc {\n    width: 19px; }\n  .iti__flag.iti__ne {\n    width: 18px; }\n  .iti__flag.iti__np {\n    width: 13px; }\n  .iti__flag.iti__va {\n    width: 15px; }\n  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n    .iti__flag {\n      background-size: 5652px 15px; } }\n  .iti__flag.iti__ac {\n    height: 10px;\n    background-position: 0px 0px; }\n  .iti__flag.iti__ad {\n    height: 14px;\n    background-position: -22px 0px; }\n  .iti__flag.iti__ae {\n    height: 10px;\n    background-position: -44px 0px; }\n  .iti__flag.iti__af {\n    height: 14px;\n    background-position: -66px 0px; }\n  .iti__flag.iti__ag {\n    height: 14px;\n    background-position: -88px 0px; }\n  .iti__flag.iti__ai {\n    height: 10px;\n    background-position: -110px 0px; }\n  .iti__flag.iti__al {\n    height: 15px;\n    background-position: -132px 0px; }\n  .iti__flag.iti__am {\n    height: 10px;\n    background-position: -154px 0px; }\n  .iti__flag.iti__ao {\n    height: 14px;\n    background-position: -176px 0px; }\n  .iti__flag.iti__aq {\n    height: 14px;\n    background-position: -198px 0px; }\n  .iti__flag.iti__ar {\n    height: 13px;\n    background-position: -220px 0px; }\n  .iti__flag.iti__as {\n    height: 10px;\n    background-position: -242px 0px; }\n  .iti__flag.iti__at {\n    height: 14px;\n    background-position: -264px 0px; }\n  .iti__flag.iti__au {\n    height: 10px;\n    background-position: -286px 0px; }\n  .iti__flag.iti__aw {\n    height: 14px;\n    background-position: -308px 0px; }\n  .iti__flag.iti__ax {\n    height: 13px;\n    background-position: -330px 0px; }\n  .iti__flag.iti__az {\n    height: 10px;\n    background-position: -352px 0px; }\n  .iti__flag.iti__ba {\n    height: 10px;\n    background-position: -374px 0px; }\n  .iti__flag.iti__bb {\n    height: 14px;\n    background-position: -396px 0px; }\n  .iti__flag.iti__bd {\n    height: 12px;\n    background-position: -418px 0px; }\n  .iti__flag.iti__be {\n    height: 15px;\n    background-position: -440px 0px; }\n  .iti__flag.iti__bf {\n    height: 14px;\n    background-position: -460px 0px; }\n  .iti__flag.iti__bg {\n    height: 12px;\n    background-position: -482px 0px; }\n  .iti__flag.iti__bh {\n    height: 12px;\n    background-position: -504px 0px; }\n  .iti__flag.iti__bi {\n    height: 12px;\n    background-position: -526px 0px; }\n  .iti__flag.iti__bj {\n    height: 14px;\n    background-position: -548px 0px; }\n  .iti__flag.iti__bl {\n    height: 14px;\n    background-position: -570px 0px; }\n  .iti__flag.iti__bm {\n    height: 10px;\n    background-position: -592px 0px; }\n  .iti__flag.iti__bn {\n    height: 10px;\n    background-position: -614px 0px; }\n  .iti__flag.iti__bo {\n    height: 14px;\n    background-position: -636px 0px; }\n  .iti__flag.iti__bq {\n    height: 14px;\n    background-position: -658px 0px; }\n  .iti__flag.iti__br {\n    height: 14px;\n    background-position: -680px 0px; }\n  .iti__flag.iti__bs {\n    height: 10px;\n    background-position: -702px 0px; }\n  .iti__flag.iti__bt {\n    height: 14px;\n    background-position: -724px 0px; }\n  .iti__flag.iti__bv {\n    height: 15px;\n    background-position: -746px 0px; }\n  .iti__flag.iti__bw {\n    height: 14px;\n    background-position: -768px 0px; }\n  .iti__flag.iti__by {\n    height: 10px;\n    background-position: -790px 0px; }\n  .iti__flag.iti__bz {\n    height: 14px;\n    background-position: -812px 0px; }\n  .iti__flag.iti__ca {\n    height: 10px;\n    background-position: -834px 0px; }\n  .iti__flag.iti__cc {\n    height: 10px;\n    background-position: -856px 0px; }\n  .iti__flag.iti__cd {\n    height: 15px;\n    background-position: -878px 0px; }\n  .iti__flag.iti__cf {\n    height: 14px;\n    background-position: -900px 0px; }\n  .iti__flag.iti__cg {\n    height: 14px;\n    background-position: -922px 0px; }\n  .iti__flag.iti__ch {\n    height: 15px;\n    background-position: -944px 0px; }\n  .iti__flag.iti__ci {\n    height: 14px;\n    background-position: -961px 0px; }\n  .iti__flag.iti__ck {\n    height: 10px;\n    background-position: -983px 0px; }\n  .iti__flag.iti__cl {\n    height: 14px;\n    background-position: -1005px 0px; }\n  .iti__flag.iti__cm {\n    height: 14px;\n    background-position: -1027px 0px; }\n  .iti__flag.iti__cn {\n    height: 14px;\n    background-position: -1049px 0px; }\n  .iti__flag.iti__co {\n    height: 14px;\n    background-position: -1071px 0px; }\n  .iti__flag.iti__cp {\n    height: 14px;\n    background-position: -1093px 0px; }\n  .iti__flag.iti__cr {\n    height: 12px;\n    background-position: -1115px 0px; }\n  .iti__flag.iti__cu {\n    height: 10px;\n    background-position: -1137px 0px; }\n  .iti__flag.iti__cv {\n    height: 12px;\n    background-position: -1159px 0px; }\n  .iti__flag.iti__cw {\n    height: 14px;\n    background-position: -1181px 0px; }\n  .iti__flag.iti__cx {\n    height: 10px;\n    background-position: -1203px 0px; }\n  .iti__flag.iti__cy {\n    height: 14px;\n    background-position: -1225px 0px; }\n  .iti__flag.iti__cz {\n    height: 14px;\n    background-position: -1247px 0px; }\n  .iti__flag.iti__de {\n    height: 12px;\n    background-position: -1269px 0px; }\n  .iti__flag.iti__dg {\n    height: 10px;\n    background-position: -1291px 0px; }\n  .iti__flag.iti__dj {\n    height: 14px;\n    background-position: -1313px 0px; }\n  .iti__flag.iti__dk {\n    height: 15px;\n    background-position: -1335px 0px; }\n  .iti__flag.iti__dm {\n    height: 10px;\n    background-position: -1357px 0px; }\n  .iti__flag.iti__do {\n    height: 14px;\n    background-position: -1379px 0px; }\n  .iti__flag.iti__dz {\n    height: 14px;\n    background-position: -1401px 0px; }\n  .iti__flag.iti__ea {\n    height: 14px;\n    background-position: -1423px 0px; }\n  .iti__flag.iti__ec {\n    height: 14px;\n    background-position: -1445px 0px; }\n  .iti__flag.iti__ee {\n    height: 13px;\n    background-position: -1467px 0px; }\n  .iti__flag.iti__eg {\n    height: 14px;\n    background-position: -1489px 0px; }\n  .iti__flag.iti__eh {\n    height: 10px;\n    background-position: -1511px 0px; }\n  .iti__flag.iti__er {\n    height: 10px;\n    background-position: -1533px 0px; }\n  .iti__flag.iti__es {\n    height: 14px;\n    background-position: -1555px 0px; }\n  .iti__flag.iti__et {\n    height: 10px;\n    background-position: -1577px 0px; }\n  .iti__flag.iti__eu {\n    height: 14px;\n    background-position: -1599px 0px; }\n  .iti__flag.iti__fi {\n    height: 12px;\n    background-position: -1621px 0px; }\n  .iti__flag.iti__fj {\n    height: 10px;\n    background-position: -1643px 0px; }\n  .iti__flag.iti__fk {\n    height: 10px;\n    background-position: -1665px 0px; }\n  .iti__flag.iti__fm {\n    height: 11px;\n    background-position: -1687px 0px; }\n  .iti__flag.iti__fo {\n    height: 15px;\n    background-position: -1709px 0px; }\n  .iti__flag.iti__fr {\n    height: 14px;\n    background-position: -1731px 0px; }\n  .iti__flag.iti__ga {\n    height: 15px;\n    background-position: -1753px 0px; }\n  .iti__flag.iti__gb {\n    height: 10px;\n    background-position: -1775px 0px; }\n  .iti__flag.iti__gd {\n    height: 12px;\n    background-position: -1797px 0px; }\n  .iti__flag.iti__ge {\n    height: 14px;\n    background-position: -1819px 0px; }\n  .iti__flag.iti__gf {\n    height: 14px;\n    background-position: -1841px 0px; }\n  .iti__flag.iti__gg {\n    height: 14px;\n    background-position: -1863px 0px; }\n  .iti__flag.iti__gh {\n    height: 14px;\n    background-position: -1885px 0px; }\n  .iti__flag.iti__gi {\n    height: 10px;\n    background-position: -1907px 0px; }\n  .iti__flag.iti__gl {\n    height: 14px;\n    background-position: -1929px 0px; }\n  .iti__flag.iti__gm {\n    height: 14px;\n    background-position: -1951px 0px; }\n  .iti__flag.iti__gn {\n    height: 14px;\n    background-position: -1973px 0px; }\n  .iti__flag.iti__gp {\n    height: 14px;\n    background-position: -1995px 0px; }\n  .iti__flag.iti__gq {\n    height: 14px;\n    background-position: -2017px 0px; }\n  .iti__flag.iti__gr {\n    height: 14px;\n    background-position: -2039px 0px; }\n  .iti__flag.iti__gs {\n    height: 10px;\n    background-position: -2061px 0px; }\n  .iti__flag.iti__gt {\n    height: 13px;\n    background-position: -2083px 0px; }\n  .iti__flag.iti__gu {\n    height: 11px;\n    background-position: -2105px 0px; }\n  .iti__flag.iti__gw {\n    height: 10px;\n    background-position: -2127px 0px; }\n  .iti__flag.iti__gy {\n    height: 12px;\n    background-position: -2149px 0px; }\n  .iti__flag.iti__hk {\n    height: 14px;\n    background-position: -2171px 0px; }\n  .iti__flag.iti__hm {\n    height: 10px;\n    background-position: -2193px 0px; }\n  .iti__flag.iti__hn {\n    height: 10px;\n    background-position: -2215px 0px; }\n  .iti__flag.iti__hr {\n    height: 10px;\n    background-position: -2237px 0px; }\n  .iti__flag.iti__ht {\n    height: 12px;\n    background-position: -2259px 0px; }\n  .iti__flag.iti__hu {\n    height: 10px;\n    background-position: -2281px 0px; }\n  .iti__flag.iti__ic {\n    height: 14px;\n    background-position: -2303px 0px; }\n  .iti__flag.iti__id {\n    height: 14px;\n    background-position: -2325px 0px; }\n  .iti__flag.iti__ie {\n    height: 10px;\n    background-position: -2347px 0px; }\n  .iti__flag.iti__il {\n    height: 15px;\n    background-position: -2369px 0px; }\n  .iti__flag.iti__im {\n    height: 10px;\n    background-position: -2391px 0px; }\n  .iti__flag.iti__in {\n    height: 14px;\n    background-position: -2413px 0px; }\n  .iti__flag.iti__io {\n    height: 10px;\n    background-position: -2435px 0px; }\n  .iti__flag.iti__iq {\n    height: 14px;\n    background-position: -2457px 0px; }\n  .iti__flag.iti__ir {\n    height: 12px;\n    background-position: -2479px 0px; }\n  .iti__flag.iti__is {\n    height: 15px;\n    background-position: -2501px 0px; }\n  .iti__flag.iti__it {\n    height: 14px;\n    background-position: -2523px 0px; }\n  .iti__flag.iti__je {\n    height: 12px;\n    background-position: -2545px 0px; }\n  .iti__flag.iti__jm {\n    height: 10px;\n    background-position: -2567px 0px; }\n  .iti__flag.iti__jo {\n    height: 10px;\n    background-position: -2589px 0px; }\n  .iti__flag.iti__jp {\n    height: 14px;\n    background-position: -2611px 0px; }\n  .iti__flag.iti__ke {\n    height: 14px;\n    background-position: -2633px 0px; }\n  .iti__flag.iti__kg {\n    height: 12px;\n    background-position: -2655px 0px; }\n  .iti__flag.iti__kh {\n    height: 13px;\n    background-position: -2677px 0px; }\n  .iti__flag.iti__ki {\n    height: 10px;\n    background-position: -2699px 0px; }\n  .iti__flag.iti__km {\n    height: 12px;\n    background-position: -2721px 0px; }\n  .iti__flag.iti__kn {\n    height: 14px;\n    background-position: -2743px 0px; }\n  .iti__flag.iti__kp {\n    height: 10px;\n    background-position: -2765px 0px; }\n  .iti__flag.iti__kr {\n    height: 14px;\n    background-position: -2787px 0px; }\n  .iti__flag.iti__kw {\n    height: 10px;\n    background-position: -2809px 0px; }\n  .iti__flag.iti__ky {\n    height: 10px;\n    background-position: -2831px 0px; }\n  .iti__flag.iti__kz {\n    height: 10px;\n    background-position: -2853px 0px; }\n  .iti__flag.iti__la {\n    height: 14px;\n    background-position: -2875px 0px; }\n  .iti__flag.iti__lb {\n    height: 14px;\n    background-position: -2897px 0px; }\n  .iti__flag.iti__lc {\n    height: 10px;\n    background-position: -2919px 0px; }\n  .iti__flag.iti__li {\n    height: 12px;\n    background-position: -2941px 0px; }\n  .iti__flag.iti__lk {\n    height: 10px;\n    background-position: -2963px 0px; }\n  .iti__flag.iti__lr {\n    height: 11px;\n    background-position: -2985px 0px; }\n  .iti__flag.iti__ls {\n    height: 14px;\n    background-position: -3007px 0px; }\n  .iti__flag.iti__lt {\n    height: 12px;\n    background-position: -3029px 0px; }\n  .iti__flag.iti__lu {\n    height: 12px;\n    background-position: -3051px 0px; }\n  .iti__flag.iti__lv {\n    height: 10px;\n    background-position: -3073px 0px; }\n  .iti__flag.iti__ly {\n    height: 10px;\n    background-position: -3095px 0px; }\n  .iti__flag.iti__ma {\n    height: 14px;\n    background-position: -3117px 0px; }\n  .iti__flag.iti__mc {\n    height: 15px;\n    background-position: -3139px 0px; }\n  .iti__flag.iti__md {\n    height: 10px;\n    background-position: -3160px 0px; }\n  .iti__flag.iti__me {\n    height: 10px;\n    background-position: -3182px 0px; }\n  .iti__flag.iti__mf {\n    height: 14px;\n    background-position: -3204px 0px; }\n  .iti__flag.iti__mg {\n    height: 14px;\n    background-position: -3226px 0px; }\n  .iti__flag.iti__mh {\n    height: 11px;\n    background-position: -3248px 0px; }\n  .iti__flag.iti__mk {\n    height: 10px;\n    background-position: -3270px 0px; }\n  .iti__flag.iti__ml {\n    height: 14px;\n    background-position: -3292px 0px; }\n  .iti__flag.iti__mm {\n    height: 14px;\n    background-position: -3314px 0px; }\n  .iti__flag.iti__mn {\n    height: 10px;\n    background-position: -3336px 0px; }\n  .iti__flag.iti__mo {\n    height: 14px;\n    background-position: -3358px 0px; }\n  .iti__flag.iti__mp {\n    height: 10px;\n    background-position: -3380px 0px; }\n  .iti__flag.iti__mq {\n    height: 14px;\n    background-position: -3402px 0px; }\n  .iti__flag.iti__mr {\n    height: 14px;\n    background-position: -3424px 0px; }\n  .iti__flag.iti__ms {\n    height: 10px;\n    background-position: -3446px 0px; }\n  .iti__flag.iti__mt {\n    height: 14px;\n    background-position: -3468px 0px; }\n  .iti__flag.iti__mu {\n    height: 14px;\n    background-position: -3490px 0px; }\n  .iti__flag.iti__mv {\n    height: 14px;\n    background-position: -3512px 0px; }\n  .iti__flag.iti__mw {\n    height: 14px;\n    background-position: -3534px 0px; }\n  .iti__flag.iti__mx {\n    height: 12px;\n    background-position: -3556px 0px; }\n  .iti__flag.iti__my {\n    height: 10px;\n    background-position: -3578px 0px; }\n  .iti__flag.iti__mz {\n    height: 14px;\n    background-position: -3600px 0px; }\n  .iti__flag.iti__na {\n    height: 14px;\n    background-position: -3622px 0px; }\n  .iti__flag.iti__nc {\n    height: 10px;\n    background-position: -3644px 0px; }\n  .iti__flag.iti__ne {\n    height: 15px;\n    background-position: -3666px 0px; }\n  .iti__flag.iti__nf {\n    height: 10px;\n    background-position: -3686px 0px; }\n  .iti__flag.iti__ng {\n    height: 10px;\n    background-position: -3708px 0px; }\n  .iti__flag.iti__ni {\n    height: 12px;\n    background-position: -3730px 0px; }\n  .iti__flag.iti__nl {\n    height: 14px;\n    background-position: -3752px 0px; }\n  .iti__flag.iti__no {\n    height: 15px;\n    background-position: -3774px 0px; }\n  .iti__flag.iti__np {\n    height: 15px;\n    background-position: -3796px 0px; }\n  .iti__flag.iti__nr {\n    height: 10px;\n    background-position: -3811px 0px; }\n  .iti__flag.iti__nu {\n    height: 10px;\n    background-position: -3833px 0px; }\n  .iti__flag.iti__nz {\n    height: 10px;\n    background-position: -3855px 0px; }\n  .iti__flag.iti__om {\n    height: 10px;\n    background-position: -3877px 0px; }\n  .iti__flag.iti__pa {\n    height: 14px;\n    background-position: -3899px 0px; }\n  .iti__flag.iti__pe {\n    height: 14px;\n    background-position: -3921px 0px; }\n  .iti__flag.iti__pf {\n    height: 14px;\n    background-position: -3943px 0px; }\n  .iti__flag.iti__pg {\n    height: 15px;\n    background-position: -3965px 0px; }\n  .iti__flag.iti__ph {\n    height: 10px;\n    background-position: -3987px 0px; }\n  .iti__flag.iti__pk {\n    height: 14px;\n    background-position: -4009px 0px; }\n  .iti__flag.iti__pl {\n    height: 13px;\n    background-position: -4031px 0px; }\n  .iti__flag.iti__pm {\n    height: 14px;\n    background-position: -4053px 0px; }\n  .iti__flag.iti__pn {\n    height: 10px;\n    background-position: -4075px 0px; }\n  .iti__flag.iti__pr {\n    height: 14px;\n    background-position: -4097px 0px; }\n  .iti__flag.iti__ps {\n    height: 10px;\n    background-position: -4119px 0px; }\n  .iti__flag.iti__pt {\n    height: 14px;\n    background-position: -4141px 0px; }\n  .iti__flag.iti__pw {\n    height: 13px;\n    background-position: -4163px 0px; }\n  .iti__flag.iti__py {\n    height: 11px;\n    background-position: -4185px 0px; }\n  .iti__flag.iti__qa {\n    height: 8px;\n    background-position: -4207px 0px; }\n  .iti__flag.iti__re {\n    height: 14px;\n    background-position: -4229px 0px; }\n  .iti__flag.iti__ro {\n    height: 14px;\n    background-position: -4251px 0px; }\n  .iti__flag.iti__rs {\n    height: 14px;\n    background-position: -4273px 0px; }\n  .iti__flag.iti__ru {\n    height: 14px;\n    background-position: -4295px 0px; }\n  .iti__flag.iti__rw {\n    height: 14px;\n    background-position: -4317px 0px; }\n  .iti__flag.iti__sa {\n    height: 14px;\n    background-position: -4339px 0px; }\n  .iti__flag.iti__sb {\n    height: 10px;\n    background-position: -4361px 0px; }\n  .iti__flag.iti__sc {\n    height: 10px;\n    background-position: -4383px 0px; }\n  .iti__flag.iti__sd {\n    height: 10px;\n    background-position: -4405px 0px; }\n  .iti__flag.iti__se {\n    height: 13px;\n    background-position: -4427px 0px; }\n  .iti__flag.iti__sg {\n    height: 14px;\n    background-position: -4449px 0px; }\n  .iti__flag.iti__sh {\n    height: 10px;\n    background-position: -4471px 0px; }\n  .iti__flag.iti__si {\n    height: 10px;\n    background-position: -4493px 0px; }\n  .iti__flag.iti__sj {\n    height: 15px;\n    background-position: -4515px 0px; }\n  .iti__flag.iti__sk {\n    height: 14px;\n    background-position: -4537px 0px; }\n  .iti__flag.iti__sl {\n    height: 14px;\n    background-position: -4559px 0px; }\n  .iti__flag.iti__sm {\n    height: 15px;\n    background-position: -4581px 0px; }\n  .iti__flag.iti__sn {\n    height: 14px;\n    background-position: -4603px 0px; }\n  .iti__flag.iti__so {\n    height: 14px;\n    background-position: -4625px 0px; }\n  .iti__flag.iti__sr {\n    height: 14px;\n    background-position: -4647px 0px; }\n  .iti__flag.iti__ss {\n    height: 10px;\n    background-position: -4669px 0px; }\n  .iti__flag.iti__st {\n    height: 10px;\n    background-position: -4691px 0px; }\n  .iti__flag.iti__sv {\n    height: 12px;\n    background-position: -4713px 0px; }\n  .iti__flag.iti__sx {\n    height: 14px;\n    background-position: -4735px 0px; }\n  .iti__flag.iti__sy {\n    height: 14px;\n    background-position: -4757px 0px; }\n  .iti__flag.iti__sz {\n    height: 14px;\n    background-position: -4779px 0px; }\n  .iti__flag.iti__ta {\n    height: 10px;\n    background-position: -4801px 0px; }\n  .iti__flag.iti__tc {\n    height: 10px;\n    background-position: -4823px 0px; }\n  .iti__flag.iti__td {\n    height: 14px;\n    background-position: -4845px 0px; }\n  .iti__flag.iti__tf {\n    height: 14px;\n    background-position: -4867px 0px; }\n  .iti__flag.iti__tg {\n    height: 13px;\n    background-position: -4889px 0px; }\n  .iti__flag.iti__th {\n    height: 14px;\n    background-position: -4911px 0px; }\n  .iti__flag.iti__tj {\n    height: 10px;\n    background-position: -4933px 0px; }\n  .iti__flag.iti__tk {\n    height: 10px;\n    background-position: -4955px 0px; }\n  .iti__flag.iti__tl {\n    height: 10px;\n    background-position: -4977px 0px; }\n  .iti__flag.iti__tm {\n    height: 14px;\n    background-position: -4999px 0px; }\n  .iti__flag.iti__tn {\n    height: 14px;\n    background-position: -5021px 0px; }\n  .iti__flag.iti__to {\n    height: 10px;\n    background-position: -5043px 0px; }\n  .iti__flag.iti__tr {\n    height: 14px;\n    background-position: -5065px 0px; }\n  .iti__flag.iti__tt {\n    height: 12px;\n    background-position: -5087px 0px; }\n  .iti__flag.iti__tv {\n    height: 10px;\n    background-position: -5109px 0px; }\n  .iti__flag.iti__tw {\n    height: 14px;\n    background-position: -5131px 0px; }\n  .iti__flag.iti__tz {\n    height: 14px;\n    background-position: -5153px 0px; }\n  .iti__flag.iti__ua {\n    height: 14px;\n    background-position: -5175px 0px; }\n  .iti__flag.iti__ug {\n    height: 14px;\n    background-position: -5197px 0px; }\n  .iti__flag.iti__um {\n    height: 11px;\n    background-position: -5219px 0px; }\n  .iti__flag.iti__un {\n    height: 14px;\n    background-position: -5241px 0px; }\n  .iti__flag.iti__us {\n    height: 11px;\n    background-position: -5263px 0px; }\n  .iti__flag.iti__uy {\n    height: 14px;\n    background-position: -5285px 0px; }\n  .iti__flag.iti__uz {\n    height: 10px;\n    background-position: -5307px 0px; }\n  .iti__flag.iti__va {\n    height: 15px;\n    background-position: -5329px 0px; }\n  .iti__flag.iti__vc {\n    height: 14px;\n    background-position: -5346px 0px; }\n  .iti__flag.iti__ve {\n    height: 14px;\n    background-position: -5368px 0px; }\n  .iti__flag.iti__vg {\n    height: 10px;\n    background-position: -5390px 0px; }\n  .iti__flag.iti__vi {\n    height: 14px;\n    background-position: -5412px 0px; }\n  .iti__flag.iti__vn {\n    height: 14px;\n    background-position: -5434px 0px; }\n  .iti__flag.iti__vu {\n    height: 12px;\n    background-position: -5456px 0px; }\n  .iti__flag.iti__wf {\n    height: 14px;\n    background-position: -5478px 0px; }\n  .iti__flag.iti__ws {\n    height: 10px;\n    background-position: -5500px 0px; }\n  .iti__flag.iti__xk {\n    height: 15px;\n    background-position: -5522px 0px; }\n  .iti__flag.iti__ye {\n    height: 14px;\n    background-position: -5544px 0px; }\n  .iti__flag.iti__yt {\n    height: 14px;\n    background-position: -5566px 0px; }\n  .iti__flag.iti__za {\n    height: 14px;\n    background-position: -5588px 0px; }\n  .iti__flag.iti__zm {\n    height: 14px;\n    background-position: -5610px 0px; }\n  .iti__flag.iti__zw {\n    height: 10px;\n    background-position: -5632px 0px; }\n  .iti__flag {\n  height: 15px;\n  box-shadow: 0px 0px 1px 0px #888;\n  background-image: url("../img/flags.png");\n  background-repeat: no-repeat;\n  background-color: #DBDBDB;\n  background-position: 20px 0; }\n  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n    .iti__flag {\n      background-image: url("../img/flags@2x.png"); } }\n  .iti__flag.iti__np {\n  background-color: transparent; }\n';

/*
 * Component.
 */
function PhoneNumberInput(_a) {
    var defaultCountry = _a.defaultCountry,
        autoComplete = _a.autoComplete,
        autofocus = _a.autofocus,
        name = _a.name,
        onInputBlur = _a.onInputBlur,
        onInputFocus = _a.onInputFocus,
        onChange = _a.onChange,
        hasError = _a.hasError,
        value = _a.value;
    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus(value);
        }
    }
    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur(value);
        }
    }
    var handleChange = React.useCallback(
        function (newValue) {
            onChange(newValue);
        },
        [onChange]
    );
    var handleCountryChange = React.useCallback(
        function (ev) {
            onChange(ev.target.value);
        },
        [onChange]
    );
    var inputRef = React.useRef(null);
    var itiRef = React.useRef(null);
    React.useEffect(
        function () {
            if (inputRef.current !== null && inputRef.current.value !== value && itiRef.current) {
                itiRef.current.setNumber(value);
            }
        },
        [itiRef, value]
    );
    React.useEffect(function () {
        if (inputRef.current !== null && itiRef.current === null) {
            itiRef.current = intlTelInput(inputRef.current, {
                initialCountry: defaultCountry,
                nationalMode: false,
                preferredCountries: defaultCountry ? [defaultCountry] : [],
            });
            if (value.length > 0) {
                itiRef.current.setNumber(value);
            } else if (defaultCountry === undefined) {
                // We set the country to an empty string, because this will display the Unknown flag
                // instead of the first one in the list
                itiRef.current.setCountry("");
            } else {
                // if we get here that means that value is empty and defaultCountry is not undefined
                var data = itiRef.current.getSelectedCountryData();
                // In this case we want to also signal to the embedding form that we are prefilling this.
                handleChange("+" + data.dialCode);
            }
            // This is a workaround, since the lib adds the dropdown to the body directly,
            // if it detects a mobile environment, but this doesn't work with our styling if we use shadow dom
            var anyIti = itiRef;
            if (anyIti.isMobile) {
                var root = document.getElementById(genericComponentOverrideContext.ST_ROOT_ID);
                // We only have to do this if we are using shadowDom and we need access to the dom element anyway
                // so passing the shadowroot element here would be both impractical and not too useful
                if (root === null || root === void 0 ? void 0 : root.shadowRoot) {
                    // We can't set the shadowRoot directly as the dropdownContainer, because we need to add a style to it
                    var container = root.shadowRoot.querySelector("[data-supertokens~=container]");
                    if (!container) {
                        throw new Error("Should never happen: container element not found");
                    }
                    container.classList.add("iti-mobile");
                    anyIti.options.dropdownContainer = container;
                }
            }
            inputRef.current.addEventListener("countrychange", handleCountryChange);
        }
    }, []);
    /* eslint-disable react/jsx-no-literals */
    /*
     * Render.
     */
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "inputContainer" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "style",
                        genericComponentOverrideContext.__assign(
                            { type: "text/css" },
                            {
                                children: [
                                    phoneNumberInputLibStyles,
                                    '\n                    .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags.png");}\n\n                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n                        .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags@2x.png");}\n                    }\n                ',
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            {
                                "data-supertokens": "phoneInputWrapper inputWrapper ".concat(
                                    hasError ? "inputError" : ""
                                ),
                            },
                            {
                                children: [
                                    jsxRuntime.jsx("input", {
                                        type: "tel",
                                        "data-supertokens": "input input-".concat(name),
                                        name: name + "_text",
                                        autoFocus: autofocus,
                                        autoComplete: autoComplete,
                                        onChange: function (ev) {
                                            // We do this to ensure that country detection starts working as soon as the user starts typing.
                                            // This also replicates how the old lib worked (automatically formatting to an international number)
                                            if (
                                                ev.target.value.trim().length > 0 &&
                                                !ev.target.value.trim().startsWith("+")
                                            ) {
                                                ev.target.value = "+" + ev.target.value.trim();
                                            }
                                            handleChange(ev.target.value);
                                        },
                                        onFocus: handleFocus,
                                        onBlur: handleBlur,
                                        ref: inputRef,
                                    }),
                                    hasError === true &&
                                        jsxRuntime.jsx(
                                            "div",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "inputAdornment inputAdornmentError" },
                                                { children: jsxRuntime.jsx(formBase.ErrorIcon, {}) }
                                            )
                                        ),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}
// TODO: type props
var phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) {
        return jsxRuntime.jsx(PhoneNumberInput, genericComponentOverrideContext.__assign({}, injectedProps, props));
    };
};

var PhoneForm = uiEntry.withOverride("PasswordlessPhoneForm", function PasswordlessPhoneForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    React.useEffect(function () {
        // We preload this here, since it will be used almost for sure, but loading it
        void preloadPhoneNumberUtils();
    }, []);
    var phoneInput = React.useMemo(
        function () {
            return phoneNumberInputWithInjectedProps({
                defaultCountry: props.config.signInUpFeature.defaultCountry,
            });
        },
        [props.config.signInUpFeature.defaultCountry]
    );
    return jsxRuntime.jsx(formBase.FormBase, {
        clearError: props.clearError,
        onFetchError: props.onFetchError,
        onError: props.onError,
        formFields: [
            {
                id: "phoneNumber",
                label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                inputComponent: phoneInput,
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "tel",
                validate: recipe$1.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var phoneNumber, validationRes, response;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            phoneNumber =
                                (_a = formFields.find(function (field) {
                                    return field.id === "phoneNumber";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (phoneNumber === undefined) {
                                throw new STGeneralError__default.default("GENERAL_ERROR_PHONE_UNDEFINED");
                            }
                            return [4 /*yield*/, props.validatePhoneNumber(phoneNumber)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new STGeneralError__default.default(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: phoneNumber,
                                    // shouldTryLinkingWithSessionUser is set by the fn override
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                throw new STGeneralError__default.default(response.reason);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});

var UserInputCodeFormFooter = uiEntry.withOverride(
    "PasswordlessUserInputCodeFormFooter",
    function PasswordlessUserInputCodeFormFooter(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo,
            recipeImplementation = _a.recipeImplementation;
        var t = translationContext.useTranslation();
        var userContext = uiEntry.useUserContext();
        return jsxRuntime.jsx(React.Fragment, {
            children: jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                        onClick: function () {
                            return recipeImplementation.clearLoginAttemptInfo({
                                userContext: userContext,
                            });
                        },
                    },
                    {
                        children: [
                            jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }),
                            loginAttemptInfo.contactMethod === "EMAIL"
                                ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                        ],
                    }
                )
            ),
        });
    }
);

var UserInputCodeFormHeader = uiEntry.withOverride(
    "PasswordlessUserInputCodeFormHeader",
    function PasswordlessUserInputCodeFormHeader(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo;
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerTitle" },
                        { children: t("PWLESS_USER_INPUT_CODE_HEADER_TITLE") }
                    )
                ),
                jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerSubtitle secondaryText" },
                        {
                            children: [
                                loginAttemptInfo.flowType === "USER_INPUT_CODE"
                                    ? t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE")
                                    : t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK"),
                                jsxRuntime.jsx("br", {}),
                                jsxRuntime.jsx("strong", { children: loginAttemptInfo.contactInfo }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

var UserInputCodeFormScreen = function (props) {
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        UserInputCodeFormHeader,
                                        genericComponentOverrideContext.__assign({}, props)
                                    ),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        UserInputCodeForm,
                                        genericComponentOverrideContext.__assign({}, props)
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var UserInputCodeForm = uiEntry.withOverride("PasswordlessUserInputCodeForm", function (props) {
    var _a;
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
    // We need this any because the node types are also loaded
    var _b = React.useState(),
        clearResendNotifTimeout = _b[0],
        setClearResendNotifTimeout = _b[1];
    React.useEffect(
        function () {
            // This is just to clean up on unmount and if the clear timeout changes
            return function () {
                clearTimeout(clearResendNotifTimeout);
            };
        },
        [clearResendNotifTimeout]
    );
    var resend = React.useCallback(
        function resend() {
            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                var response, generalError, e_1;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (STGeneralError__default.default.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (generalError !== undefined) {
                                props.onError(generalError.message);
                            } else {
                                if (response === undefined) {
                                    throw new Error("Should not come here");
                                }
                                if (response.status === "OK") {
                                    setClearResendNotifTimeout(
                                        setTimeout(function () {
                                            setClearResendNotifTimeout(undefined);
                                        }, 2000)
                                    );
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [setClearResendNotifTimeout, props.onError, props.recipeImplementation]
    );
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            clearResendNotifTimeout !== undefined &&
                jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "generalSuccess" },
                        {
                            children:
                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                    ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                                    : t("PWLESS_RESEND_SUCCESS_PHONE"),
                        }
                    )
                ),
            jsxRuntime.jsx(formBase.FormBase, {
                clearError: props.clearError,
                onFetchError: props.onFetchError,
                onError: props.onError,
                formFields: [
                    {
                        id: "userInputCode",
                        label: "",
                        labelComponent: jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "formLabelWithLinkWrapper" },
                                {
                                    children: [
                                        jsxRuntime.jsx(formBase.Label, {
                                            value: "PWLESS_USER_INPUT_CODE_INPUT_LABEL",
                                            "data-supertokens": "codeInputLabel",
                                        }),
                                        jsxRuntime.jsx(ResendButton, {
                                            loginAttemptInfo: props.loginAttemptInfo,
                                            resendEmailOrSMSGapInSeconds:
                                                props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                            onClick: resend,
                                        }),
                                    ],
                                }
                            )
                        ),
                        autofocus: true,
                        optional: false,
                        clearOnSubmit: true,
                        autoComplete: "one-time-code",
                        placeholder: "",
                        validate: recipe$2.userInputCodeValidate,
                    },
                ],
                onSuccess: props.onSuccess,
                buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
                callAPI: function (formFields) {
                    return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                        var userInputCode, response;
                        var _a;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    userInputCode =
                                        (_a = formFields.find(function (field) {
                                            return field.id === "userInputCode";
                                        })) === null || _a === void 0
                                            ? void 0
                                            : _a.value;
                                    if (userInputCode === undefined || userInputCode.length === 0) {
                                        throw new STGeneralError__default.default("GENERAL_ERROR_OTP_UNDEFINED");
                                    }
                                    return [
                                        4 /*yield*/,
                                        props.recipeImplementation.consumeCode({
                                            userInputCode: userInputCode,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    response = _b.sent();
                                    // We can redirect these statuses, since they all cause a redirection
                                    // and we don't really want to show anything
                                    if (
                                        response.status === "OK" ||
                                        response.status === "RESTART_FLOW_ERROR" ||
                                        response.status === "SIGN_IN_UP_NOT_ALLOWED"
                                    ) {
                                        return [2 /*return*/, response];
                                    }
                                    if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                                        throw new STGeneralError__default.default("GENERAL_ERROR_OTP_INVALID");
                                    }
                                    if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                                        throw new STGeneralError__default.default("GENERAL_ERROR_OTP_EXPIRED");
                                    }
                                    throw new STGeneralError__default.default("SOMETHING_WENT_WRONG_ERROR");
                            }
                        });
                    });
                },
                validateOnBlur: false,
                showLabels: true,
                footer:
                    (_a = props.footer) !== null && _a !== void 0
                        ? _a
                        : jsxRuntime.jsx(
                              UserInputCodeFormFooter,
                              genericComponentOverrideContext.__assign({}, props, {
                                  loginAttemptInfo: props.loginAttemptInfo,
                              })
                          ),
            }),
        ],
    });
});
function UserInputCodeFormScreenWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                UserInputCodeFormScreen,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var OTPLoadingScreen = function () {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container delayedRender pwless-mfa loadingScreen" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: jsxRuntime.jsx(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "spinner delayedRender" },
                                    { children: jsxRuntime.jsx(uiEntry.SpinnerIcon, {}) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var LoadingScreen = uiEntry.withOverride("PasswordlessMFAOTPLoadingScreen", OTPLoadingScreen);

var MFAFooter = uiEntry.withOverride("PasswordlessMFAFooter", function PasswordlessMFAFooter(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "footerLinkGroupVert pwless-mfa footer" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        {
                            "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                            onClick: props.onSignOutClicked,
                        },
                        {
                            children: [
                                jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {
                                    color: "rgb(var(--palette-textPrimary))",
                                }),
                                t("PWLESS_MFA_FOOTER_LOGOUT"),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

var MFAHeader = uiEntry.withOverride("PasswordlessMFAHeader", function PasswordlessMFAHeader(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle withBackButton pwless-mfa header" },
                    {
                        children: [
                            props.showBackButton
                                ? jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked })
                                : jsxRuntime.jsx("span", {
                                      "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                  }),
                            props.contactMethod === "EMAIL"
                                ? t("PWLESS_MFA_HEADER_TITLE_EMAIL")
                                : t("PWLESS_MFA_HEADER_TITLE_PHONE"),
                            jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var MFAOTPFooter = uiEntry.withOverride("PasswordlessMFAOTPFooter", function PasswordlessMFAOTPFooter(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo,
        recipeImplementation = _a.recipeImplementation,
        onSignOutClicked = _a.onSignOutClicked,
        canChangeEmail = _a.canChangeEmail;
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "footerLinkGroupVert pwless-mfa otpFooter" },
            {
                children: [
                    canChangeEmail &&
                        jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                {
                                    "data-supertokens": "secondaryText",
                                    onClick: function () {
                                        return recipeImplementation.clearLoginAttemptInfo({
                                            userContext: userContext,
                                        });
                                    },
                                },
                                {
                                    children:
                                        loginAttemptInfo.contactMethod === "EMAIL"
                                            ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                            : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                                }
                            )
                        ),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            {
                                "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                                onClick: onSignOutClicked,
                            },
                            {
                                children: [
                                    jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {
                                        color: "rgb(var(--palette-textPrimary))",
                                    }),
                                    t("PWLESS_MFA_FOOTER_LOGOUT"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
});

var MFAOTPHeader = uiEntry.withOverride("PasswordlessMFAOTPHeader", function PasswordlessMFAOTPHeader(_a) {
    var showBackButton = _a.showBackButton,
        loginAttemptInfo = _a.loginAttemptInfo,
        onBackButtonClicked = _a.onBackButtonClicked,
        canChangeEmail = _a.canChangeEmail;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle withBackButton pwless-mfa otpHeader" },
                    {
                        children: [
                            showBackButton && canChangeEmail === false
                                ? jsxRuntime.jsx(uiEntry.BackButton, { onClick: onBackButtonClicked })
                                : jsxRuntime.jsx("span", {
                                      "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                  }),
                            t("PWLESS_USER_INPUT_CODE_HEADER_TITLE"),
                            jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle secondaryText" },
                    {
                        children: [
                            loginAttemptInfo.flowType === "USER_INPUT_CODE"
                                ? t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE")
                                : t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK"),
                            jsxRuntime.jsx("br", {}),
                            jsxRuntime.jsx("strong", { children: loginAttemptInfo.contactInfo }),
                        ],
                    }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var MFAScreens;
(function (MFAScreens) {
    MFAScreens[(MFAScreens["CloseTab"] = 0)] = "CloseTab";
    MFAScreens[(MFAScreens["EmailForm"] = 1)] = "EmailForm";
    MFAScreens[(MFAScreens["PhoneForm"] = 2)] = "PhoneForm";
    MFAScreens[(MFAScreens["UserInputCodeForm"] = 3)] = "UserInputCodeForm";
    MFAScreens[(MFAScreens["AccessDenied"] = 4)] = "AccessDenied";
})(MFAScreens || (MFAScreens = {}));
var MFATheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        onBackButtonClicked = _a.onBackButtonClicked,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen", "featureState", "onBackButtonClicked"]);
    var t = translationContext.useTranslation();
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: error });
        },
        onFetchError: props.onFetchError,
        error: featureState.error,
        validatePhoneNumber: props.validatePhoneNumber,
    };
    if (!featureState.loaded) {
        return jsxRuntime.jsx(LoadingScreen, {});
    }
    return activeScreen === MFAScreens.AccessDenied
        ? jsxRuntime.jsx(sessionprebuiltui.AccessDeniedScreen, {
              useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */,
              error: t(featureState.error),
          })
        : jsxRuntime.jsxs(
              "div",
              genericComponentOverrideContext.__assign(
                  { "data-supertokens": "container pwless-mfa" },
                  {
                      children: [
                          jsxRuntime.jsx(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "row" },
                                  {
                                      children: jsxRuntime.jsxs(React__namespace.default.Fragment, {
                                          children: [
                                              activeScreen === MFAScreens.UserInputCodeForm
                                                  ? jsxRuntime.jsx(
                                                        MFAOTPHeader,
                                                        genericComponentOverrideContext.__assign({}, commonProps, {
                                                            showBackButton: featureState.showBackButton,
                                                            loginAttemptInfo: featureState.loginAttemptInfo,
                                                            canChangeEmail: featureState.canChangeEmail,
                                                            onBackButtonClicked: onBackButtonClicked,
                                                        })
                                                    )
                                                  : jsxRuntime.jsx(
                                                        MFAHeader,
                                                        genericComponentOverrideContext.__assign({}, commonProps, {
                                                            showBackButton: featureState.showBackButton,
                                                            onBackButtonClicked: onBackButtonClicked,
                                                            contactMethod:
                                                                activeScreen === MFAScreens.EmailForm
                                                                    ? "EMAIL"
                                                                    : "PHONE",
                                                        })
                                                    ),
                                              featureState.error !== undefined &&
                                                  jsxRuntime.jsx(uiEntry.GeneralError, { error: featureState.error }),
                                              activeScreen === MFAScreens.EmailForm
                                                  ? jsxRuntime.jsx(
                                                        EmailForm,
                                                        genericComponentOverrideContext.__assign({}, commonProps, {
                                                            footer: jsxRuntime.jsx(
                                                                MFAFooter,
                                                                genericComponentOverrideContext.__assign(
                                                                    {},
                                                                    commonProps,
                                                                    {
                                                                        onSignOutClicked: props.onSignOutClicked,
                                                                        canChangeEmail: featureState.canChangeEmail,
                                                                    }
                                                                )
                                                            ),
                                                        })
                                                    )
                                                  : activeScreen === MFAScreens.PhoneForm
                                                  ? jsxRuntime.jsx(
                                                        PhoneForm,
                                                        genericComponentOverrideContext.__assign({}, commonProps, {
                                                            footer: jsxRuntime.jsx(
                                                                MFAFooter,
                                                                genericComponentOverrideContext.__assign(
                                                                    {},
                                                                    commonProps,
                                                                    {
                                                                        onSignOutClicked: props.onSignOutClicked,
                                                                        canChangeEmail: featureState.canChangeEmail,
                                                                    }
                                                                )
                                                            ),
                                                        })
                                                    )
                                                  : activeScreen === MFAScreens.UserInputCodeForm
                                                  ? jsxRuntime.jsx(
                                                        UserInputCodeForm,
                                                        genericComponentOverrideContext.__assign({}, commonProps, {
                                                            loginAttemptInfo: featureState.loginAttemptInfo,
                                                            onSuccess: props.onSuccess,
                                                            footer: jsxRuntime.jsx(
                                                                MFAOTPFooter,
                                                                genericComponentOverrideContext.__assign(
                                                                    {},
                                                                    commonProps,
                                                                    {
                                                                        onSignOutClicked: props.onSignOutClicked,
                                                                        canChangeEmail: featureState.canChangeEmail,
                                                                        loginAttemptInfo: featureState.loginAttemptInfo,
                                                                    }
                                                                )
                                                            ),
                                                        })
                                                    )
                                                  : null,
                                          ],
                                      }),
                                  }
                              )
                          ),
                          jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                      ],
                  }
              )
          );
};
function MFAThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen$2(props);
    var activeStyle;
    if (activeScreen === MFAScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === MFAScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === MFAScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else {
        activeStyle = ""; // styling the access denied screen is handled through the session recipe
    }
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        {
                            userStyles: [
                                rootStyle,
                                props.config.recipeRootStyle,
                                activeStyle,
                                props.config.mfaFeature.style,
                            ],
                        },
                        {
                            children: jsxRuntime.jsx(
                                MFATheme,
                                genericComponentOverrideContext.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen$2(props) {
    if (props.featureState.showAccessDenied) {
        return MFAScreens.AccessDenied;
    } else if (props.featureState.loginAttemptInfo) {
        return MFAScreens.UserInputCodeForm;
    } else if (props.contactMethod === "EMAIL") {
        return MFAScreens.EmailForm;
    } else if (props.contactMethod === "PHONE") {
        return MFAScreens.PhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "load":
                    return {
                        // We want to wait for createCode to finish before marking the page fully loaded
                        loaded: !action.callingCreateCode,
                        error: action.error,
                        loginAttemptInfo: action.loginAttemptInfo,
                        canChangeEmail: action.canChangeEmail,
                        showAccessDenied: action.showAccessDenied,
                        showBackButton: action.showBackButton,
                    };
                case "resendCode":
                    if (!oldState.loginAttemptInfo) {
                        return oldState;
                    }
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        {
                            error: undefined,
                            loginAttemptInfo: genericComponentOverrideContext.__assign(
                                genericComponentOverrideContext.__assign({}, oldState.loginAttemptInfo),
                                { lastResend: action.timestamp }
                            ),
                        }
                    );
                case "restartFlow":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { error: action.error, loginAttemptInfo: undefined, showAccessDenied: !oldState.canChangeEmail }
                    );
                case "setError":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { loaded: true, error: action.error, showAccessDenied: action.showAccessDenied }
                    );
                case "startVerify":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { loaded: true, loginAttemptInfo: action.loginAttemptInfo, error: undefined }
                    );
                default:
                    return oldState;
            }
        },
        {
            showAccessDenied: false,
            error: undefined,
            loaded: false,
            loginAttemptInfo: undefined,
            canChangeEmail: false,
            showBackButton: false,
        },
        function (initArg) {
            var error = undefined;
            var errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
            if (errorQueryParam !== null) {
                error = "SOMETHING_WENT_WRONG_ERROR";
            }
            return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, initArg), {
                error: error,
            });
        }
    );
};
function useChildProps$3(recipe$1, recipeImplementation, state, contactMethod, dispatch, userContext, navigate) {
    var _this = this;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            var _a;
            return {
                onSuccess: function () {
                    var redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
                    return types.Session.getInstanceOrThrow()
                        .validateGlobalClaimsAndHandleSuccessRedirection(
                            undefined,
                            recipe$1.recipeID,
                            redirectToPath,
                            userContext,
                            navigate
                        )
                        .catch(rethrowInRender);
                },
                onSignOutClicked: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().signOut({ userContext: userContext }),
                                    ];
                                case 1:
                                    _a.sent();
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.clearLoginAttemptInfo({ userContext: userContext }),
                                    ];
                                case 2:
                                    _a.sent();
                                    return [
                                        4 /*yield*/,
                                        uiEntry.redirectToAuth({ redirectBack: false, navigate: navigate }),
                                    ];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onBackButtonClicked: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!state.loginAttemptInfo) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.clearLoginAttemptInfo({ userContext: userContext }),
                                    ];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
                                    if (navigate === undefined) {
                                        return [
                                            2 /*return*/,
                                            windowHandler.WindowHandlerReference.getReferenceOrThrow()
                                                .windowHandler.getWindowUnsafe()
                                                .history.back(),
                                        ];
                                    }
                                    // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
                                    if ("goBack" in navigate) {
                                        return [2 /*return*/, navigate.goBack()];
                                    }
                                    // If we reach this code this means we are using react-router-dom v6
                                    return [2 /*return*/, navigate(-1)];
                            }
                        });
                    });
                },
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    dispatch({
                                        type: "setError",
                                        showAccessDenied: false,
                                        error: "SOMETHING_WENT_WRONG_ERROR",
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
                contactMethod: contactMethod,
                validatePhoneNumber:
                    (_a = recipe$1.config.validatePhoneNumber) !== null && _a !== void 0
                        ? _a
                        : defaultPhoneNumberValidator,
            };
        },
        [contactMethod, state, recipeImplementation]
    );
}
var MFAFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return (
                props.recipe &&
                getModifiedRecipeImplementation$3(props.recipe.webJSRecipe, props.recipe.config, dispatch)
            );
        },
        [props.recipe]
    );
    useOnLoad(props, recipeImplementation, dispatch, userContext);
    var childProps = useChildProps$3(
        props.recipe,
        recipeImplementation,
        state,
        props.contactMethod,
        dispatch,
        userContext,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(
                    MFAThemeWrapper,
                    genericComponentOverrideContext.__assign({}, childProps, {
                        featureState: state,
                        dispatch: dispatch,
                    })
                ),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(
                            child,
                            genericComponentOverrideContext.__assign(
                                genericComponentOverrideContext.__assign({}, childProps),
                                { featureState: state, dispatch: dispatch }
                            )
                        );
                    }
                    return child;
                }),
        ],
    });
};
var MFAFeature = function (props) {
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
                            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                            defaultStore: defaultTranslationsPasswordless,
                        },
                        {
                            children: jsxRuntime.jsx(
                                MFAFeatureInner,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
};
function useOnLoad(props, recipeImplementation, dispatch, userContext) {
    var _this = this;
    var fetchMFAInfo = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe$3.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [userContext]
    );
    var handleLoadError = React__namespace.useCallback(
        function () {
            return dispatch({ type: "setError", showAccessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" });
        },
        [dispatch]
    );
    var onLoad = React__namespace.useCallback(
        function (mfaInfo) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var error,
                    errorQueryParam,
                    doSetup,
                    stepUp,
                    loginAttemptInfo,
                    factorId,
                    redirectToPath,
                    showBackButton,
                    contactInfoList,
                    createCodeInfo,
                    createResp,
                    err_1,
                    invalidClaims,
                    evInstance;
                return genericComponentOverrideContext.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            error = undefined;
                            errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
                            doSetup = genericComponentOverrideContext.getQueryParams("setup");
                            stepUp = genericComponentOverrideContext.getQueryParams("stepUp");
                            if (errorQueryParam !== null) {
                                error = "SOMETHING_WENT_WRONG_ERROR";
                            }
                            return [
                                4 /*yield*/,
                                recipeImplementation.getLoginAttemptInfo({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            loginAttemptInfo = _c.sent();
                            factorId =
                                props.contactMethod === "EMAIL" ? types.FactorIds.OTP_EMAIL : types.FactorIds.OTP_PHONE;
                            if (
                                !(
                                    loginAttemptInfo &&
                                    (props.contactMethod !== loginAttemptInfo.contactMethod ||
                                        !recipe$2.checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo))
                                )
                            )
                                return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                recipeImplementation === null || recipeImplementation === void 0
                                    ? void 0
                                    : recipeImplementation.clearLoginAttemptInfo({ userContext: userContext }),
                            ];
                        case 2:
                            _c.sent();
                            loginAttemptInfo = undefined;
                            _c.label = 3;
                        case 3:
                            if (!(mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true"))
                                return [3 /*break*/, 7];
                            redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    undefined,
                                    props.recipe.recipeID,
                                    redirectToPath,
                                    userContext,
                                    props.navigate
                                ),
                            ];
                        case 5:
                            _c.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            _c.sent();
                            // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                            // we fall back to showing the something went wrong error
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [3 /*break*/, 7];
                        case 7:
                            showBackButton =
                                mfaInfo.factors.next.length === 0 ||
                                recipe$3.getAvailableFactors(
                                    mfaInfo.factors,
                                    undefined,
                                    recipe$3.MultiFactorAuth.getInstanceOrThrow(),
                                    userContext
                                ).length !== 1;
                            contactInfoList =
                                (props.contactMethod === "EMAIL"
                                    ? mfaInfo.emails[factorId]
                                    : mfaInfo.phoneNumbers[factorId]) || [];
                            if (!!loginAttemptInfo) return [3 /*break*/, 19];
                            if (!(contactInfoList.length > 0 && doSetup !== "true")) return [3 /*break*/, 17];
                            createCodeInfo =
                                props.contactMethod === "EMAIL"
                                    ? { email: contactInfoList[0] }
                                    : { phoneNumber: contactInfoList[0] };
                            createResp = void 0;
                            _c.label = 8;
                        case 8:
                            _c.trys.push([8, 10, , 16]);
                            dispatch({
                                type: "load",
                                showAccessDenied: false,
                                loginAttemptInfo: undefined,
                                error: error,
                                canChangeEmail: contactInfoList.length === 0,
                                showBackButton: showBackButton,
                                callingCreateCode: true,
                            });
                            return [
                                4 /*yield*/,
                                recipeImplementation.createCode(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, createCodeInfo),
                                        { shouldTryLinkingWithSessionUser: true, userContext: userContext }
                                    )
                                ),
                            ];
                        case 9:
                            // createCode also dispatches the event that marks this page fully loaded
                            createResp = _c.sent();
                            return [3 /*break*/, 16];
                        case 10:
                            err_1 = _c.sent();
                            if (
                                !(
                                    "status" in err_1 &&
                                    err_1.status === types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                )
                            )
                                return [3 /*break*/, 15];
                            return [
                                4 /*yield*/,
                                session.getInvalidClaimsFromResponse({ response: err_1, userContext: userContext }),
                            ];
                        case 11:
                            invalidClaims = _c.sent();
                            if (
                                !invalidClaims.some(function (i) {
                                    return i.id === emailverification.EmailVerificationClaim.id;
                                })
                            )
                                return [3 /*break*/, 15];
                            _c.label = 12;
                        case 12:
                            _c.trys.push([12, 14, , 15]);
                            evInstance = recipe.EmailVerification.getInstanceOrThrow();
                            return [
                                4 /*yield*/,
                                evInstance.redirect(
                                    {
                                        tenantIdFromQueryParams:
                                            genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                        action: "VERIFY_EMAIL",
                                    },
                                    props.navigate,
                                    undefined,
                                    userContext
                                ),
                            ];
                        case 13:
                            _c.sent();
                            return [2 /*return*/];
                        case 14:
                            _c.sent();
                            return [3 /*break*/, 15];
                        case 15:
                            // If it isn't a 403 or if it is not an EV claim error, we show the error
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [2 /*return*/];
                        case 16:
                            if ((createResp === null || createResp === void 0 ? void 0 : createResp.status) !== "OK") {
                                dispatch({
                                    type: "setError",
                                    showAccessDenied: true,
                                    error:
                                        createResp.status === "SIGN_IN_UP_NOT_ALLOWED"
                                            ? createResp.reason
                                            : "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                                });
                            }
                            return [3 /*break*/, 18];
                        case 17:
                            // this will ask the user for the email/phone
                            dispatch({
                                type: "load",
                                showAccessDenied: false,
                                loginAttemptInfo: loginAttemptInfo,
                                error: error,
                                canChangeEmail: true,
                                showBackButton: showBackButton,
                                callingCreateCode: false,
                            });
                            _c.label = 18;
                        case 18:
                            return [3 /*break*/, 20];
                        case 19:
                            // In this branch we already have a valid login attempt so we show the OTP screen
                            dispatch({
                                type: "load",
                                showAccessDenied: false,
                                loginAttemptInfo: loginAttemptInfo,
                                error: error,
                                canChangeEmail: contactInfoList.length === 0,
                                showBackButton: showBackButton,
                                callingCreateCode: false,
                            });
                            _c.label = 20;
                        case 20:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [dispatch, recipeImplementation, props.contactMethod, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}
function getModifiedRecipeImplementation$3(originalImpl, config, dispatch) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        createCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res, loginAttemptInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, getPhoneNumberUtils()];
                        case 1:
                            phoneNumberUtils = _a.sent();
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = phoneNumberUtils.formatNumber(
                                    input.phoneNumber,
                                    config.signInUpFeature.defaultCountry || "",
                                    phoneNumberUtils.numberFormat.E164
                                );
                            }
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            additionalAttemptInfo = {
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createCode(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        {
                                            shouldTryLinkingWithSessionUser: true,
                                            userContext: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, input.userContext),
                                                { additionalAttemptInfo: additionalAttemptInfo }
                                            ),
                                        }
                                    )
                                ),
                            ];
                        case 2:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 4];
                            return [
                                4 /*yield*/,
                                originalImpl.getLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 3:
                            loginAttemptInfo = _a.sent();
                            dispatch({ type: "startVerify", loginAttemptInfo: loginAttemptInfo });
                            _a.label = 4;
                        case 4:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        resendCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _b.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.getLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _b.sent();
                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                originalImpl.setLoginAttemptInfo({
                                    userContext: input.userContext,
                                    attemptInfo: genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, loginAttemptInfo),
                                        {
                                            shouldTryLinkingWithSessionUser:
                                                (_a = loginAttemptInfo.shouldTryLinkingWithSessionUser) !== null &&
                                                _a !== void 0
                                                    ? _a
                                                    : true,
                                            lastResend: timestamp,
                                        }
                                    ),
                                }),
                            ];
                        case 3:
                            _b.sent();
                            dispatch({ type: "resendCode", timestamp: timestamp });
                            _b.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _b.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                            _b.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.consumeCode(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        { shouldTryLinkingWithSessionUser: true }
                                    )
                                ),
                            ];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(res.status === "SIGN_IN_UP_NOT_ALLOWED")) return [3 /*break*/, 5];
                            // This should never happen, but technically possible based on the API specs
                            // so we keep this here to cover all cases
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            // This should never happen, but technically possible based on the API specs
                            // so we keep this here to cover all cases
                            _a.sent();
                            dispatch({ type: "restartFlow", error: res.reason });
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "OK")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            genericComponentOverrideContext.clearErrorQueryParam();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}

var EmailOrPhoneForm = uiEntry.withOverride(
    "PasswordlessEmailOrPhoneForm",
    function PasswordlessEmailOrPhoneForm(props) {
        var _this = this;
        var t = translationContext.useTranslation();
        var _a = React.useState(!props.config.signInUpFeature.defaultToEmail),
            isPhoneNumber = _a[0],
            setIsPhoneNumber = _a[1];
        var userContext = uiEntry.useUserContext();
        React.useEffect(function () {
            // We preload this here, since it will be used almost for sure, but loading it
            void preloadPhoneNumberUtils();
        }, []);
        var phoneInput = React.useMemo(
            function () {
                return phoneNumberInputWithInjectedProps({
                    defaultCountry: props.config.signInUpFeature.defaultCountry,
                });
            },
            [props.config.signInUpFeature.defaultCountry]
        );
        return jsxRuntime.jsx(formBase.FormBase, {
            clearError: props.clearError,
            onFetchError: props.onFetchError,
            onError: props.onError,
            formFields: isPhoneNumber
                ? [
                      {
                          id: "phoneNumber",
                          label: "",
                          labelComponent: jsxRuntime.jsxs(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "formLabelWithLinkWrapper" },
                                  {
                                      children: [
                                          jsxRuntime.jsx(formBase.Label, { value: "PWLESS_SIGN_IN_UP_PHONE_LABEL" }),
                                          jsxRuntime.jsx(
                                              "a",
                                              genericComponentOverrideContext.__assign(
                                                  {
                                                      onClick: function () {
                                                          return setIsPhoneNumber(false);
                                                      },
                                                      "data-supertokens":
                                                          "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                                  },
                                                  { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL") }
                                              )
                                          ),
                                      ],
                                  }
                              )
                          ),
                          inputComponent: phoneInput,
                          optional: false,
                          autofocus: true,
                          placeholder: "",
                          autoComplete: "tel",
                          validate: recipe$2.defaultValidate,
                      },
                  ]
                : [
                      {
                          id: "email",
                          label: "",
                          labelComponent: jsxRuntime.jsxs(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "formLabelWithLinkWrapper" },
                                  {
                                      children: [
                                          jsxRuntime.jsx(formBase.Label, {
                                              value: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                                              "data-supertokens": "passwordInputLabel",
                                          }),
                                          jsxRuntime.jsx(
                                              "a",
                                              genericComponentOverrideContext.__assign(
                                                  {
                                                      onClick: function () {
                                                          return setIsPhoneNumber(function (v) {
                                                              return !v;
                                                          });
                                                      },
                                                      "data-supertokens":
                                                          "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                                  },
                                                  { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE") }
                                              )
                                          ),
                                      ],
                                  }
                              )
                          ),
                          inputComponent: undefined,
                          optional: false,
                          autofocus: true,
                          placeholder: "",
                          autoComplete: "email",
                          validate: recipe$2.defaultValidate,
                      },
                  ],
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            onSuccess: props.onSuccess,
            callAPI: function (formFields) {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var contactInfo, phoneNumber, validationRes, email, validationRes, response;
                    var _a, _b;
                    return genericComponentOverrideContext.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!isPhoneNumber) return [3 /*break*/, 2];
                                phoneNumber =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "phoneNumber";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (phoneNumber === undefined) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_PHONE_UNDEFINED");
                                }
                                return [4 /*yield*/, props.validatePhoneNumber(phoneNumber)];
                            case 1:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError__default.default(validationRes);
                                }
                                contactInfo = { phoneNumber: phoneNumber };
                                return [3 /*break*/, 4];
                            case 2:
                                email =
                                    (_b = formFields.find(function (field) {
                                        return field.id === "email";
                                    })) === null || _b === void 0
                                        ? void 0
                                        : _b.value;
                                if (email === undefined) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                                }
                                return [4 /*yield*/, props.config.validateEmailAddress(email)];
                            case 3:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError__default.default(validationRes);
                                }
                                contactInfo = { email: email };
                                _c.label = 4;
                            case 4:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.createCode(
                                        genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, contactInfo),
                                            {
                                                // shouldTryLinkingWithSessionUser is set by the fn override
                                                userContext: userContext,
                                            }
                                        )
                                    ),
                                ];
                            case 5:
                                response = _c.sent();
                                if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                    throw new STGeneralError__default.default(response.reason);
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.footer,
        });
    }
);

var SignInUpScreens;
(function (SignInUpScreens) {
    SignInUpScreens[(SignInUpScreens["EmailForm"] = 0)] = "EmailForm";
    SignInUpScreens[(SignInUpScreens["PhoneForm"] = 1)] = "PhoneForm";
    SignInUpScreens[(SignInUpScreens["EmailOrPhoneForm"] = 2)] = "EmailOrPhoneForm";
})(SignInUpScreens || (SignInUpScreens = {}));
/*
 * Component.
 */
var SignInUpTheme$1 = function (_a) {
    var activeScreen = _a.activeScreen,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen"]);
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
        error: props.error,
        validatePhoneNumber: props.validatePhoneNumber,
    };
    return activeScreen === SignInUpScreens.EmailForm
        ? jsxRuntime.jsx(EmailForm, genericComponentOverrideContext.__assign({}, commonProps))
        : activeScreen === SignInUpScreens.PhoneForm
        ? jsxRuntime.jsx(PhoneForm, genericComponentOverrideContext.__assign({}, commonProps))
        : activeScreen === SignInUpScreens.EmailOrPhoneForm
        ? jsxRuntime.jsx(EmailOrPhoneForm, genericComponentOverrideContext.__assign({}, commonProps))
        : null;
};
function SignInUpThemeWrapper$1(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen$1(props.factorIds);
    var activeStyle;
    if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                SignInUpTheme$1,
                                genericComponentOverrideContext.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen$1(factorIds) {
    if (factorIds.includes(types.FactorIds.LINK_EMAIL) || factorIds.includes(types.FactorIds.OTP_EMAIL)) {
        if (factorIds.includes(types.FactorIds.OTP_PHONE) || factorIds.includes(types.FactorIds.LINK_PHONE)) {
            return SignInUpScreens.EmailOrPhoneForm;
        } else {
            return SignInUpScreens.EmailForm;
        }
    } else {
        return SignInUpScreens.PhoneForm;
    }
}

function useChildProps$2(
    recipe$1,
    factorIds,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    userContext,
    navigate
) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return (
                recipe$1 && getModifiedRecipeImplementation$2(recipe$1.webJSRecipe, recipe$1.config, rebuildAuthPage)
            );
        },
        [recipe$1]
    );
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            var _a;
            return {
                userContext: userContext,
                onSuccess: function (result) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 3];
                                case 3:
                                    return [
                                        2 /*return*/,
                                        onAuthSuccess({
                                            createdNewUser:
                                                result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                                            isNewRecipeUser: result.createdNewRecipeUser,
                                            newSessionCreated:
                                                session$1.loading ||
                                                !session$1.doesSessionExist ||
                                                (payloadAfterCall !== undefined &&
                                                    session$1.accessTokenPayload.sessionHandle !==
                                                        payloadAfterCall.sessionHandle),
                                            recipeId: "passwordless",
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                error: error,
                onError: onError,
                clearError: clearError,
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                factorIds: factorIds,
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
                validatePhoneNumber:
                    (_a = recipe$1.config.validatePhoneNumber) !== null && _a !== void 0
                        ? _a
                        : defaultPhoneNumberValidator,
            };
        },
        [error, factorIds, userContext, recipeImplementation]
    );
}
var SignInUpFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps$2(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        userContext,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(SignInUpThemeWrapper$1, genericComponentOverrideContext.__assign({}, childProps)),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(
                            child,
                            genericComponentOverrideContext.__assign({}, childProps)
                        );
                    }
                    return child;
                }),
        ],
    });
};
var SignInUpFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(SignInUpFeatureInner, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};
function getModifiedRecipeImplementation$2(originalImpl, config, rebuildAuthPage) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        createCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, getPhoneNumberUtils()];
                        case 1:
                            phoneNumberUtils = _a.sent();
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = phoneNumberUtils.formatNumber(
                                    input.phoneNumber,
                                    config.signInUpFeature.defaultCountry || "",
                                    phoneNumberUtils.numberFormat.E164
                                );
                            }
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            additionalAttemptInfo = {
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createCode(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        {
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, input.userContext),
                                                { additionalAttemptInfo: additionalAttemptInfo }
                                            ),
                                        }
                                    )
                                ),
                            ];
                        case 2:
                            res = _a.sent();
                            if (res.status === "OK") {
                                rebuildAuthPage();
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

var ContinueWithPasswordlessFooter = function (_a) {
    var onError = _a.onError,
        onContinueWithPasswordlessClick = _a.onContinueWithPasswordlessClick,
        validatePhoneNumber = _a.validatePhoneNumber,
        isPhoneNumber = _a.isPhoneNumber,
        config = _a.config;
    var state = formBase.useFormFields();
    var t = translationContext.useTranslation();
    if (isPhoneNumber && validatePhoneNumber === undefined) {
        throw new Error(
            "This should never happen: ContinueWithPasswordlessFooter rendered without validatePhoneNumber but isPhoneNumber=true"
        );
    }
    return jsxRuntime.jsx(
        "a",
        genericComponentOverrideContext.__assign(
            {
                "data-supertokens": "link linkButton continueWithPasswordlessLink",
                onClick: function () {
                    return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                        var phoneNumber, validationRes, email, validationRes;
                        var _a, _b;
                        return genericComponentOverrideContext.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!isPhoneNumber) return [3 /*break*/, 2];
                                    phoneNumber =
                                        (_a = state.find(function (field) {
                                            return field.id === "phoneNumber";
                                        })) === null || _a === void 0
                                            ? void 0
                                            : _a.value;
                                    if (phoneNumber === undefined) {
                                        onError("GENERAL_ERROR_PHONE_UNDEFINED");
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, validatePhoneNumber(phoneNumber)];
                                case 1:
                                    validationRes = _c.sent();
                                    if (validationRes !== undefined) {
                                        onError(validationRes);
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/, onContinueWithPasswordlessClick(phoneNumber)];
                                case 2:
                                    email =
                                        (_b = state.find(function (field) {
                                            return field.id === "email";
                                        })) === null || _b === void 0
                                            ? void 0
                                            : _b.value;
                                    if (email === undefined) {
                                        onError("GENERAL_ERROR_EMAIL_UNDEFINED");
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, config.validateEmailAddress(email)];
                                case 3:
                                    validationRes = _c.sent();
                                    if (validationRes !== undefined) {
                                        onError(validationRes);
                                        return [2 /*return*/];
                                    }
                                    return [2 /*return*/, onContinueWithPasswordlessClick(email)];
                            }
                        });
                    });
                },
            },
            { children: t("PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_LINK") }
        )
    );
};

var EPComboEmailForm = uiEntry.withOverride(
    "PasswordlessEPComboEmailForm",
    function PasswordlessEPComboEmailForm(props) {
        var _this = this;
        var t = translationContext.useTranslation();
        var formFields = [
            {
                id: "email",
                label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                inputComponent: undefined,
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "email",
                validate: recipe$2.defaultValidate,
            },
        ];
        if (props.showPasswordField) {
            formFields.push({
                id: "password",
                autofocus: false,
                optional: false,
                placeholder: "",
                label: "",
                validate: recipe$2.defaultValidate,
                labelComponent: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "formLabelWithLinkWrapper" },
                        {
                            children: [
                                jsxRuntime.jsx(formBase.Label, {
                                    value: "PWLESS_COMBO_PASSWORD_LABEL",
                                    "data-supertokens": "passwordInputLabel",
                                }),
                                jsxRuntime.jsx(
                                    "a",
                                    genericComponentOverrideContext.__assign(
                                        {
                                            onClick: function () {
                                                return recipe$1.EmailPassword.getInstanceOrThrow().redirect(
                                                    {
                                                        action: "RESET_PASSWORD",
                                                        tenantIdFromQueryParams:
                                                            genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                                    },
                                                    props.navigate
                                                );
                                            },
                                            "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink",
                                        },
                                        { children: t("PWLESS_COMBO_FORGOT_PW_LINK") }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            });
        }
        return jsxRuntime.jsx(formBase.FormBase, {
            clearError: props.clearError,
            onFetchError: props.onFetchError,
            onError: props.onError,
            formFields: formFields,
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            onSuccess: props.onSuccess,
            callAPI: function (formFields) {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var email, validationRes;
                    var _a;
                    return genericComponentOverrideContext.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                email =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "email";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (email === undefined) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                                }
                                return [4 /*yield*/, props.config.validateEmailAddress(email)];
                            case 1:
                                validationRes = _b.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError__default.default(validationRes);
                                }
                                if (props.showPasswordField) {
                                    return [2 /*return*/, props.onPasswordSubmit(formFields)];
                                } else {
                                    return [2 /*return*/, props.onContactInfoSubmit(email)];
                                }
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.showContinueWithPasswordlessLink
                ? jsxRuntime.jsx(ContinueWithPasswordlessFooter, {
                      isPhoneNumber: false,
                      onContinueWithPasswordlessClick: props.onContinueWithPasswordlessClick,
                      onError: props.onError,
                      config: props.config,
                      validatePhoneNumber: props.validatePhoneNumber,
                  })
                : undefined,
        });
    }
);

var EPComboEmailOrPhoneForm = uiEntry.withOverride(
    "PasswordlessEPComboEmailOrPhoneForm",
    function PasswordlessEPComboEmailOrPhoneForm(props) {
        var _this = this;
        var t = translationContext.useTranslation();
        React.useEffect(function () {
            // We preload this here, since it will be used almost for sure, but loading it
            void preloadPhoneNumberUtils();
        }, []);
        var phoneInput = React.useMemo(
            function () {
                return phoneNumberInputWithInjectedProps({
                    defaultCountry: props.config.signInUpFeature.defaultCountry,
                });
            },
            [props.config.signInUpFeature.defaultCountry]
        );
        var formFields = props.isPhoneNumber
            ? [
                  {
                      id: "phoneNumber",
                      label: "",
                      labelComponent: jsxRuntime.jsxs(
                          "div",
                          genericComponentOverrideContext.__assign(
                              { "data-supertokens": "formLabelWithLinkWrapper" },
                              {
                                  children: [
                                      jsxRuntime.jsx(formBase.Label, { value: "PWLESS_SIGN_IN_UP_PHONE_LABEL" }),
                                      jsxRuntime.jsx(
                                          "a",
                                          genericComponentOverrideContext.__assign(
                                              {
                                                  onClick: function () {
                                                      return props.setIsPhoneNumber(false);
                                                  },
                                                  "data-supertokens":
                                                      "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                              },
                                              { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL") }
                                          )
                                      ),
                                  ],
                              }
                          )
                      ),
                      inputComponent: phoneInput,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "tel",
                      validate: recipe$2.defaultValidate,
                  },
              ]
            : [
                  {
                      id: "email",
                      label: "",
                      labelComponent: jsxRuntime.jsxs(
                          "div",
                          genericComponentOverrideContext.__assign(
                              { "data-supertokens": "formLabelWithLinkWrapper" },
                              {
                                  children: [
                                      jsxRuntime.jsx(formBase.Label, { value: "PWLESS_SIGN_IN_UP_EMAIL_LABEL" }),
                                      jsxRuntime.jsx(
                                          "a",
                                          genericComponentOverrideContext.__assign(
                                              {
                                                  onClick: function () {
                                                      return props.setIsPhoneNumber(true);
                                                  },
                                                  "data-supertokens":
                                                      "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                              },
                                              { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE") }
                                          )
                                      ),
                                  ],
                              }
                          )
                      ),
                      inputComponent: undefined,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "email",
                      validate: recipe$2.defaultValidate,
                  },
              ];
        if (props.showPasswordField) {
            formFields.push({
                id: "password",
                autofocus: false,
                optional: false,
                placeholder: "",
                label: "",
                validate: recipe$2.defaultValidate,
                labelComponent: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "formLabelWithLinkWrapper" },
                        {
                            children: [
                                jsxRuntime.jsx(formBase.Label, {
                                    value: "PWLESS_COMBO_PASSWORD_LABEL",
                                    "data-supertokens": "passwordInputLabel",
                                }),
                                jsxRuntime.jsx(
                                    "a",
                                    genericComponentOverrideContext.__assign(
                                        {
                                            onClick: function () {
                                                return recipe$1.EmailPassword.getInstanceOrThrow().redirect(
                                                    {
                                                        action: "RESET_PASSWORD",
                                                        tenantIdFromQueryParams:
                                                            genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                                    },
                                                    props.navigate
                                                );
                                            },
                                            "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink",
                                        },
                                        { children: t("PWLESS_COMBO_FORGOT_PW_LINK") }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            });
        }
        return jsxRuntime.jsx(formBase.FormBase, {
            clearError: props.clearError,
            onFetchError: props.onFetchError,
            onError: props.onError,
            formFields: formFields,
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            callAPI: function (formFields) {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var phoneNumber, validationRes, email, validationRes;
                    var _a, _b;
                    return genericComponentOverrideContext.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!props.isPhoneNumber) return [3 /*break*/, 2];
                                phoneNumber =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "phoneNumber";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (phoneNumber === undefined) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_PHONE_UNDEFINED");
                                }
                                return [4 /*yield*/, props.validatePhoneNumber(phoneNumber)];
                            case 1:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError__default.default(validationRes);
                                }
                                return [2 /*return*/, props.onContactInfoSubmit(phoneNumber)];
                            case 2:
                                email =
                                    (_b = formFields.find(function (field) {
                                        return field.id === "email";
                                    })) === null || _b === void 0
                                        ? void 0
                                        : _b.value;
                                if (email === undefined) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                                }
                                return [4 /*yield*/, props.config.validateEmailAddress(email)];
                            case 3:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError__default.default(validationRes);
                                }
                                if (props.showPasswordField) {
                                    return [2 /*return*/, props.onPasswordSubmit(formFields)];
                                } else {
                                    return [2 /*return*/, props.onContactInfoSubmit(email)];
                                }
                            case 4:
                                return [2 /*return*/];
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            onSuccess: props.onSuccess,
            footer: props.showContinueWithPasswordlessLink
                ? jsxRuntime.jsx(ContinueWithPasswordlessFooter, {
                      isPhoneNumber: props.isPhoneNumber,
                      onContinueWithPasswordlessClick: props.onContinueWithPasswordlessClick,
                      validatePhoneNumber: props.validatePhoneNumber,
                      onError: props.onError,
                      config: props.config,
                  })
                : undefined,
        });
    }
);

var SignInUpEPComboScreens;
(function (SignInUpEPComboScreens) {
    SignInUpEPComboScreens[(SignInUpEPComboScreens["EmailForm"] = 0)] = "EmailForm";
    SignInUpEPComboScreens[(SignInUpEPComboScreens["EmailOrPhoneForm"] = 1)] = "EmailOrPhoneForm";
})(SignInUpEPComboScreens || (SignInUpEPComboScreens = {}));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen"]);
    var commonProps = genericComponentOverrideContext.__assign({}, props);
    return activeScreen === SignInUpEPComboScreens.EmailForm
        ? jsxRuntime.jsx(EPComboEmailForm, genericComponentOverrideContext.__assign({}, commonProps))
        : activeScreen === SignInUpEPComboScreens.EmailOrPhoneForm
        ? jsxRuntime.jsx(EPComboEmailOrPhoneForm, genericComponentOverrideContext.__assign({}, commonProps))
        : null;
};
function SignInUpThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props.factorIds);
    var activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                SignInUpTheme,
                                genericComponentOverrideContext.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen(factorIds) {
    if (factorIds.includes(types.FactorIds.OTP_PHONE) || factorIds.includes(types.FactorIds.LINK_PHONE)) {
        return SignInUpEPComboScreens.EmailOrPhoneForm;
    } else {
        return SignInUpEPComboScreens.EmailForm;
    }
}

function useChildProps$1(
    recipe$2,
    factorIds,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    userContext,
    navigate
) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return (
                recipe$2 && getModifiedRecipeImplementation$1(recipe$2.webJSRecipe, recipe$2.config, rebuildAuthPage)
            );
        },
        [recipe$2]
    );
    var _a = React__namespace.useState(!recipe$2.config.signInUpFeature.defaultToEmail),
        isPhoneNumber = _a[0],
        setIsPhoneNumber = _a[1];
    var _b = React__namespace.useState(false),
        showPasswordField = _b[0],
        setShowPasswordField = _b[1];
    var _c = React__namespace.useState(false),
        showContinueWithPasswordlessLink = _c[0],
        setShowContinueWithPasswordlessLink = _c[1];
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            var _a;
            var isPasswordlessEmailEnabled = [types.FactorIds.LINK_EMAIL, types.FactorIds.OTP_EMAIL].some(function (
                id
            ) {
                return factorIds.includes(id);
            });
            return {
                isPhoneNumber: isPhoneNumber,
                setIsPhoneNumber: function (isPhone) {
                    if (isPhone && showPasswordField) {
                        setShowPasswordField(false);
                        setShowContinueWithPasswordlessLink(false);
                    }
                    setIsPhoneNumber(isPhone);
                },
                userContext: userContext,
                showPasswordField: showPasswordField,
                showContinueWithPasswordlessLink: showContinueWithPasswordlessLink,
                onContactInfoSubmit: function (contactInfo) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var createRes, email, _a, epExists, pwlessExists, createRes;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!isPhoneNumber) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode({
                                            phoneNumber: contactInfo,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    createRes = _b.sent();
                                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                        throw new STGeneralError__default$1.default(createRes.reason);
                                    } else {
                                        clearError();
                                        return [2 /*return*/, createRes];
                                    }
                                case 2:
                                    email = contactInfo;
                                    if (recipe$2.config.contactMethod === "PHONE" || !isPasswordlessEmailEnabled) {
                                        setShowPasswordField(true);
                                        return [2 /*return*/, { status: "OK" }];
                                    }
                                    return [
                                        4 /*yield*/,
                                        Promise.all([
                                            recipe$1.EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({
                                                email: email,
                                                userContext: userContext,
                                            }),
                                            recipeImplementation.doesEmailExist({
                                                email: email,
                                                userContext: userContext,
                                            }),
                                        ]),
                                    ];
                                case 3:
                                    (_a = _b.sent()), (epExists = _a[0]), (pwlessExists = _a[1]);
                                    if (!epExists.doesExist) return [3 /*break*/, 4];
                                    // EP exists
                                    setShowPasswordField(true);
                                    if (pwlessExists.doesExist) {
                                        // Both exist
                                        setShowContinueWithPasswordlessLink(true);
                                    }
                                    return [2 /*return*/, { status: "OK" }];
                                case 4:
                                    if (!pwlessExists.doesExist) return [3 /*break*/, 6];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode({
                                            email: email,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 5:
                                    createRes = _b.sent();
                                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                        throw new STGeneralError__default$1.default(createRes.reason);
                                    } else {
                                        clearError();
                                        return [2 /*return*/, createRes];
                                    }
                                case 6:
                                    setShowPasswordField(true);
                                    if (isPasswordlessEmailEnabled) {
                                        setShowContinueWithPasswordlessLink(true);
                                    }
                                    return [2 /*return*/, { status: "OK" }];
                                case 7:
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onPasswordSubmit: function (formFields) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var validationErrors, response;
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        genericComponentOverrideContext.validateForm(
                                            formFields,
                                            recipe$1.EmailPassword.getInstanceOrThrow().config.signInAndUpFeature
                                                .signInForm.formFields
                                        ),
                                    ];
                                case 1:
                                    validationErrors = _a.sent();
                                    if (validationErrors.length > 0) {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: validationErrors,
                                            },
                                        ];
                                    }
                                    return [
                                        4 /*yield*/,
                                        recipe$1.EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
                                            formFields: formFields,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    response = _a.sent();
                                    if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                        throw new STGeneralError__default$1.default(
                                            "EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR"
                                        );
                                    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                                        throw new STGeneralError__default$1.default(response.reason);
                                    } else {
                                        return [
                                            2 /*return*/,
                                            genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, response),
                                                { isEmailPassword: true }
                                            ),
                                        ];
                                    }
                            }
                        });
                    });
                },
                onContinueWithPasswordlessClick: function (contactInfo) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var createInfo, createRes;
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    createInfo = isPhoneNumber ? { phoneNumber: contactInfo } : { email: contactInfo };
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode(
                                            genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, createInfo),
                                                { shouldTryLinkingWithSessionUser: false, userContext: userContext }
                                            )
                                        ),
                                    ];
                                case 1:
                                    createRes = _a.sent();
                                    if (createRes.status !== "OK") {
                                        onError(createRes.reason);
                                    } else {
                                        clearError();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: function (result) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!result.isEmailPassword) {
                                        return [2 /*return*/];
                                    }
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 4];
                                case 4:
                                    return [
                                        2 /*return*/,
                                        onAuthSuccess({
                                            createdNewUser:
                                                result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                                            isNewRecipeUser: result.createdNewRecipeUser,
                                            newSessionCreated:
                                                session$1.loading ||
                                                !session$1.doesSessionExist ||
                                                (payloadAfterCall !== undefined &&
                                                    session$1.accessTokenPayload.sessionHandle !==
                                                        payloadAfterCall.sessionHandle),
                                            recipeId: result.isEmailPassword
                                                ? recipe$1.EmailPassword.RECIPE_ID
                                                : recipe$2.recipeID,
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                error: error,
                onError: onError,
                clearError: clearError,
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                factorIds: factorIds,
                recipeImplementation: recipeImplementation,
                config: recipe$2.config,
                validatePhoneNumber:
                    (_a = recipe$2.config.validatePhoneNumber) !== null && _a !== void 0
                        ? _a
                        : defaultPhoneNumberValidator,
                navigate: navigate,
            };
        },
        [
            error,
            factorIds,
            userContext,
            recipeImplementation,
            isPhoneNumber,
            showPasswordField,
            showContinueWithPasswordlessLink,
            navigate,
        ]
    );
}
var SignInUpEPComboFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps$1(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        userContext,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(SignInUpThemeWrapper, genericComponentOverrideContext.__assign({}, childProps)),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(
                            child,
                            genericComponentOverrideContext.__assign({}, childProps)
                        );
                    }
                    return child;
                }),
        ],
    });
};
var SignInUpEPComboFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    SignInUpEPComboFeatureInner,
                    genericComponentOverrideContext.__assign({}, props)
                ),
            }
        )
    );
};
function getModifiedRecipeImplementation$1(originalImpl, config, rebuildAuthPage) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        createCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, getPhoneNumberUtils()];
                        case 1:
                            phoneNumberUtils = _a.sent();
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = phoneNumberUtils.formatNumber(
                                    input.phoneNumber,
                                    config.signInUpFeature.defaultCountry || "",
                                    phoneNumberUtils.numberFormat.E164
                                );
                            }
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            additionalAttemptInfo = {
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createCode(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        {
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, input.userContext),
                                                { additionalAttemptInfo: additionalAttemptInfo }
                                            ),
                                        }
                                    )
                                ),
                            ];
                        case 2:
                            res = _a.sent();
                            if (res.status === "OK") {
                                rebuildAuthPage();
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

function useChildProps(
    recipe$1,
    loginAttemptInfo,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    userContext,
    navigate
) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return getModifiedRecipeImplementation(recipe$1.webJSRecipe, onError, rebuildAuthPage);
        },
        [recipe$1, onError, rebuildAuthPage]
    );
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            return {
                userContext: userContext,
                onSuccess: function (result) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 3];
                                case 3:
                                    return [
                                        2 /*return*/,
                                        onAuthSuccess({
                                            createdNewUser:
                                                result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                                            isNewRecipeUser: result.createdNewRecipeUser,
                                            newSessionCreated:
                                                session$1.loading ||
                                                !session$1.doesSessionExist ||
                                                (payloadAfterCall !== undefined &&
                                                    session$1.accessTokenPayload.sessionHandle !==
                                                        payloadAfterCall.sessionHandle),
                                            recipeId: "passwordless",
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                loginAttemptInfo: loginAttemptInfo,
                error: error,
                onError: onError,
                clearError: clearError,
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
            };
        },
        [error, recipeImplementation]
    );
}
var UserInputCodeFeatureInner = function (props) {
    var childProps = useChildProps(
        props.recipe,
        props.loginAttemptInfo,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.userContext,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(
                    UserInputCodeFormScreenWrapper,
                    genericComponentOverrideContext.__assign({}, childProps, { userContext: props.userContext })
                ),
            props.children &&
                React__namespace.Children.map(props.children, function (child) {
                    if (React__namespace.isValidElement(child)) {
                        return React__namespace.cloneElement(
                            child,
                            genericComponentOverrideContext.__assign({}, childProps)
                        );
                    }
                    return child;
                }),
        ],
    });
};
var UserInputCodeFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(UserInputCodeFeatureInner, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};
function getModifiedRecipeImplementation(originalImpl, setError, rebuildAuthPage) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        resendCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _b.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.getLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _b.sent();
                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                originalImpl.setLoginAttemptInfo({
                                    userContext: input.userContext,
                                    attemptInfo: genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, loginAttemptInfo),
                                        {
                                            shouldTryLinkingWithSessionUser:
                                                (_a = loginAttemptInfo.shouldTryLinkingWithSessionUser) !== null &&
                                                _a !== void 0
                                                    ? _a
                                                    : false,
                                            lastResend: timestamp,
                                        }
                                    ),
                                }),
                            ];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _b.sent();
                            setError("ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW");
                            rebuildAuthPage();
                            _b.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.consumeCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            setError("ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW");
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(res.status === "SIGN_IN_UP_NOT_ALLOWED")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            _a.sent();
                            setError(res.reason);
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "OK")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            genericComponentOverrideContext.clearErrorQueryParam();
                            rebuildAuthPage();
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}

var PasswordlessPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(PasswordlessPreBuiltUI, _super);
    function PasswordlessPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsPasswordless;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$2.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.linkClickedScreenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/verify")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("linkClickedScreen", props, useComponentOverrides);
                    },
                    recipeID: recipe$2.Passwordless.RECIPE_ID,
                };
            }
            if (_this.recipeInstance.config.mfaFeature.disableDefaultUI !== true) {
                var normalisedFullPathPhone = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/mfa/otp-phone")
                );
                features[normalisedFullPathPhone.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("otp-phone", props, useComponentOverrides);
                    },
                    recipeID: recipe$2.Passwordless.RECIPE_ID,
                };
                var normalisedFullPathEmail = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/mfa/otp-email")
                );
                features[normalisedFullPathEmail.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("otp-email", props, useComponentOverrides);
                    },
                    recipeID: recipe$2.Passwordless.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$2.useContext;
            }
            if (componentName === "linkClickedScreen") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    { requireAuth: false, doRedirection: false },
                                    {
                                        children: jsxRuntime.jsx(
                                            LinkClickedScreen,
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
            }
            if (componentName === "otp-email") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    {
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsxRuntime.jsx(
                                            MFAFeature,
                                            genericComponentOverrideContext.__assign(
                                                {
                                                    recipe: _this.recipeInstance,
                                                    useComponentOverrides: useComponentOverrides,
                                                    contactMethod: "EMAIL",
                                                    flowType: "USER_INPUT_CODE",
                                                },
                                                props
                                            )
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            if (componentName === "otp-phone") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    {
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsxRuntime.jsx(
                                            MFAFeature,
                                            genericComponentOverrideContext.__assign(
                                                {
                                                    recipe: _this.recipeInstance,
                                                    useComponentOverrides: useComponentOverrides,
                                                    contactMethod: "PHONE",
                                                    flowType: "USER_INPUT_CODE",
                                                },
                                                props
                                            )
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (PasswordlessPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe$2.Passwordless.getInstanceOrThrow();
            PasswordlessPreBuiltUI.instance = new PasswordlessPreBuiltUI(recipeInstance);
        }
        return PasswordlessPreBuiltUI.instance;
    };
    PasswordlessPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$2.useContext;
        }
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    PasswordlessPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$2.useContext;
        }
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    PasswordlessPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        var factorCombos = getAllFactorChoices([
            types.FactorIds.LINK_EMAIL,
            types.FactorIds.LINK_PHONE,
            types.FactorIds.OTP_EMAIL,
            types.FactorIds.OTP_PHONE,
        ]);
        var res = genericComponentOverrideContext.__spreadArray(
            genericComponentOverrideContext.__spreadArray(
                [
                    {
                        type: "FULL_PAGE",
                        preloadInfoAndRunChecks: function (firstFactors, userContext) {
                            var _b, _c, _d;
                            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                                var loginAttemptInfo;
                                return genericComponentOverrideContext.__generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            return [
                                                4 /*yield*/,
                                                recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(
                                                    {
                                                        userContext: userContext,
                                                    }
                                                ),
                                            ];
                                        case 1:
                                            loginAttemptInfo = _e.sent();
                                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 7];
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "PHONE" &&
                                                    !firstFactors.includes(types.FactorIds.OTP_PHONE) &&
                                                    !firstFactors.includes(types.FactorIds.LINK_PHONE)
                                                )
                                            )
                                                return [3 /*break*/, 3];
                                            return [
                                                4 /*yield*/,
                                                (_b = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _b === void 0
                                                    ? void 0
                                                    : _b.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 2:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 3:
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "EMAIL" &&
                                                    !firstFactors.includes(types.FactorIds.OTP_EMAIL) &&
                                                    !firstFactors.includes(types.FactorIds.LINK_EMAIL)
                                                )
                                            )
                                                return [3 /*break*/, 5];
                                            return [
                                                4 /*yield*/,
                                                (_c = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _c === void 0
                                                    ? void 0
                                                    : _c.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 4:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 5:
                                            if (!!recipe$2.checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo))
                                                return [3 /*break*/, 7];
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            return [
                                                4 /*yield*/,
                                                (_d = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _d === void 0
                                                    ? void 0
                                                    : _d.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 6:
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            _e.label = 7;
                                        case 7:
                                            if (
                                                loginAttemptInfo === undefined ||
                                                loginAttemptInfo.flowType !== "MAGIC_LINK"
                                            ) {
                                                return [
                                                    2 /*return*/,
                                                    {
                                                        shouldDisplay: false,
                                                    },
                                                ];
                                            }
                                            return [
                                                2 /*return*/,
                                                {
                                                    shouldDisplay: true,
                                                    preloadInfo: loginAttemptInfo,
                                                },
                                            ];
                                    }
                                });
                            });
                        },
                        component: function (_b) {
                            var preloadInfo = _b.preloadInfo,
                                props = genericComponentOverrideContext.__rest(_b, ["preloadInfo"]);
                            return jsxRuntime.jsx(
                                LinkSentFeature,
                                genericComponentOverrideContext.__assign({}, props, {
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: recipe$2.useContext,
                                    loginAttemptInfo: preloadInfo,
                                }),
                                "linkSentFullPage"
                            );
                        },
                    },
                    {
                        type: "FULL_PAGE",
                        preloadInfoAndRunChecks: function (firstFactors, userContext) {
                            var _b, _c, _d;
                            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                                var loginAttemptInfo;
                                return genericComponentOverrideContext.__generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            return [
                                                4 /*yield*/,
                                                recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(
                                                    {
                                                        userContext: userContext,
                                                    }
                                                ),
                                            ];
                                        case 1:
                                            loginAttemptInfo = _e.sent();
                                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 7];
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "PHONE" &&
                                                    !firstFactors.includes(types.FactorIds.OTP_PHONE) &&
                                                    !firstFactors.includes(types.FactorIds.LINK_PHONE)
                                                )
                                            )
                                                return [3 /*break*/, 3];
                                            return [
                                                4 /*yield*/,
                                                (_b = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _b === void 0
                                                    ? void 0
                                                    : _b.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 2:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 3:
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "EMAIL" &&
                                                    !firstFactors.includes(types.FactorIds.OTP_EMAIL) &&
                                                    !firstFactors.includes(types.FactorIds.LINK_EMAIL)
                                                )
                                            )
                                                return [3 /*break*/, 5];
                                            return [
                                                4 /*yield*/,
                                                (_c = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _c === void 0
                                                    ? void 0
                                                    : _c.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 4:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 5:
                                            if (!!recipe$2.checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo))
                                                return [3 /*break*/, 7];
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            return [
                                                4 /*yield*/,
                                                (_d = recipe$2.Passwordless.getInstanceOrThrow().webJSRecipe) ===
                                                    null || _d === void 0
                                                    ? void 0
                                                    : _d.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 6:
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            _e.label = 7;
                                        case 7:
                                            if (
                                                loginAttemptInfo === undefined ||
                                                loginAttemptInfo.flowType === "MAGIC_LINK"
                                            ) {
                                                return [
                                                    2 /*return*/,
                                                    {
                                                        shouldDisplay: false,
                                                    },
                                                ];
                                            }
                                            return [
                                                2 /*return*/,
                                                {
                                                    shouldDisplay: true,
                                                    preloadInfo: loginAttemptInfo,
                                                },
                                            ];
                                    }
                                });
                            });
                        },
                        component: function (_b) {
                            var preloadInfo = _b.preloadInfo,
                                props = genericComponentOverrideContext.__rest(_b, ["preloadInfo"]);
                            return jsxRuntime.jsx(
                                UserInputCodeFeature,
                                genericComponentOverrideContext.__assign({}, props, {
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: recipe$2.useContext,
                                    loginAttemptInfo: preloadInfo,
                                }),
                                "userInputCodeFullPage"
                            );
                        },
                    },
                ],
                factorCombos.map(function (factors) {
                    return {
                        type: "SIGN_IN",
                        factorIds: factors,
                        displayOrder: 3,
                        component: function (props) {
                            return React.createElement(
                                SignInUpFeature,
                                genericComponentOverrideContext.__assign({}, props, {
                                    key: factors.join("|"),
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: recipe$2.useContext,
                                    factorIds: factors,
                                })
                            );
                        },
                    };
                }),
                true
            ),
            factorCombos.map(function (factors) {
                return {
                    type: "SIGN_UP",
                    factorIds: factors,
                    displayOrder: 3,
                    component: function (props) {
                        return jsxRuntime.jsx(
                            ContinueWithPasswordlessFeature,
                            genericComponentOverrideContext.__assign({}, props, {
                                recipe: _this.recipeInstance,
                                factorIds: factors,
                                useComponentOverrides: recipe$2.useContext,
                            }),
                            factors.join("|")
                        );
                    },
                };
            }),
            true
        );
        // We only do this and check if we should add this component
        // because it provides a better error message if EP is not initialized, but requested
        try {
            recipe$1.EmailPassword.getInstanceOrThrow();
            res.push.apply(
                res,
                factorCombos
                    .map(function (combo) {
                        return genericComponentOverrideContext.__spreadArray(
                            [types.FactorIds.EMAILPASSWORD],
                            combo,
                            true
                        );
                    })
                    .map(function (factors) {
                        return {
                            type: "SIGN_IN",
                            factorIds: factors,
                            displayOrder: 3,
                            component: function (props) {
                                return React.createElement(
                                    SignInUpEPComboFeature,
                                    genericComponentOverrideContext.__assign({}, props, {
                                        key: factors.join("|"),
                                        recipe: _this.recipeInstance,
                                        useComponentOverrides: recipe$2.useContext,
                                        factorIds: factors,
                                    })
                                );
                            },
                        };
                    })
            );
        } catch (_b) {
            // EP was not initialized, so not adding the combo component is OK
        }
        return res;
    };
    // For tests
    PasswordlessPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        PasswordlessPreBuiltUI.instance = undefined;
        return;
    };
    var _a;
    _a = PasswordlessPreBuiltUI;
    PasswordlessPreBuiltUI.LinkClicked = function (props) {
        return _a.getFeatureComponent("linkClickedScreen", props);
    };
    PasswordlessPreBuiltUI.MfaOtpPhone = function (props) {
        return _a.getFeatureComponent("otp-phone", props);
    };
    PasswordlessPreBuiltUI.MfaOtpEmail = function (props) {
        return _a.getFeatureComponent("otp-email", props);
    };
    PasswordlessPreBuiltUI.MFAOTPTheme = MFAThemeWrapper;
    return PasswordlessPreBuiltUI;
})(uiEntry.RecipeRouter);
var LinkClicked = PasswordlessPreBuiltUI.LinkClicked;
var MfaOtpPhone = PasswordlessPreBuiltUI.MfaOtpPhone;
var MfaOtpEmail = PasswordlessPreBuiltUI.MfaOtpEmail;
function getAllChoices(choices) {
    if (choices.length === 0) {
        return [[]];
    }
    var subChoices = getAllChoices(choices.slice(1));
    return genericComponentOverrideContext.__spreadArray(
        genericComponentOverrideContext.__spreadArray([], subChoices, true),
        subChoices.map(function (a) {
            return genericComponentOverrideContext.__spreadArray([choices[0]], a, true);
        }),
        true
    );
}
function getAllFactorChoices(factorIds) {
    return getAllChoices(factorIds)
        .sort(function (a, b) {
            return a.length - b.length;
        })
        .slice(1);
}

exports.LinkClicked = LinkClicked;
exports.MFAOTPTheme = MFAThemeWrapper;
exports.MfaOtpEmail = MfaOtpEmail;
exports.MfaOtpPhone = MfaOtpPhone;
exports.PasswordlessPreBuiltUI = PasswordlessPreBuiltUI;
