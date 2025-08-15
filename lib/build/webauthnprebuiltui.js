"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/lib/build/normalisedURLPath");
var uiEntry = require("./index2.js");
require("./multifactorauth.js");
var componentOverrideContext = require("./webauthn-shared.js");
var React = require("react");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var translationContext = require("./translationContext.js");
var sessionprebuiltui = require("./sessionprebuiltui.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var button = require("./emailpassword-shared.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var formBase = require("./emailpassword-shared6.js");
var validators = require("./emailpassword-shared5.js");
var STGeneralError$1 = require("supertokens-web-js/lib/build/error");
var authCompWrapper = require("./authCompWrapper.js");
var session = require("./session.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react-dom");
require("./multitenancy-shared.js");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./recipeModule-shared.js");
require("./authRecipe-shared.js");
require("./multifactorauth-shared3.js");
require("supertokens-web-js/lib/build/recipe/webauthn");
require("./authRecipe-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("./emailpassword-shared4.js");

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
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);
var STGeneralError__default$1 = /*#__PURE__*/ _interopDefault(STGeneralError$1);

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n    --palette-buttonGreyedOut: 221, 221, 221;\n    --palette-caution: 124, 96, 62;\n    --palette-errorDark: 207, 54, 68;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="buttonGreyedOut"] {\n    background-color: rgb(var(--palette-buttonGreyedOut));\n    border-color: rgb(var(--palette-buttonGreyedOut));\n}\n[data-supertokens~="buttonWithIcon"] {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 700;\n    font-size: var(--font-size-0);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 20px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="formRow"]:last-child {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="primaryText"][data-supertokens~="sendVerifyEmailText"] {\n    text-align: center;\n    letter-spacing: 0.8px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n    font-weight: 700;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 400;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="resetPasswordEmailForm"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="resetPasswordPasswordForm"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="webauthn"] [data-supertokens~="container"] {\n    padding-top: 24px;\n}\n[data-supertokens~="continueWithPasskeyButtonWrapper"] {\n    margin: 9px 0;\n}\n[data-supertokens~="continueWithPasskeyButtonNotSupported"] {\n    margin-top: 10px;\n    padding: 10px;\n    border-radius: 6px;\n    background-color: rgba(0,122,255,0.10196);\n    color: rgb(var(--palette-textLink));\n    text-align: center;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    line-height: 16.1px;\n    letter-spacing: 0%;\n    text-align: center;\n}\n[data-supertokens~="continueWithoutPasskey"] {\n    margin-top: 15px;\n}\n[data-supertokens~="continueWithoutPasskey"] [data-supertokens~="continueWithoutPasskeyLabel"] {\n    font-size: var(--font-size-1);\n    font-weight: 700;\n    line-height: 21px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textLink));\n    cursor: pointer;\n}\n[data-supertokens~="signUpFormInnerContainer"] [data-supertokens~="cautionMessage"] {\n    padding: 14px;\n    background: rgba(255,149,0,0.10196);\n    color: rgb(var(--palette-caution));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    line-height: 20px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    border-radius: 6px;\n    margin-bottom: 14px;\n}\n[data-supertokens~="passkeyConfirmationContainer"] [data-supertokens~="passkeyConfirmationEmailContainer"] {\n    padding-bottom: 5px;\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyConfirmationEmailContainer"]\n    [data-supertokens~="continueWithLabel"] {\n    font-size: var(--font-size-0);\n    font-weight: 400;\n    line-height: 13.8px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textGray));\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyConfirmationEmailContainer"]\n    [data-supertokens~="enteredEmailId"] {\n    font-size: var(--font-size-1);\n    font-weight: 700;\n    line-height: 16.1px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyFeatureBlocksContainer"]\n    [data-supertokens~="passkeyFeatureBlock"] {\n    margin-top: 10px;\n    padding: 18px;\n    border-radius: 6px;\n    border: 1px solid #dddddd;\n    display: flex;\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyFeatureBlocksContainer"]\n    [data-supertokens~="passkeyFeatureBlock"]\n    [data-supertokens~="passkeyFeatureBlockDetails"] {\n    margin-left: 18px;\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyFeatureBlocksContainer"]\n    [data-supertokens~="passkeyFeatureBlock"]\n    [data-supertokens~="passkeyFeatureBlockDetails"]\n    [data-supertokens~="passkeyFeatureBlockTitle"] {\n    font-size: var(--font-size-1);\n    font-weight: 700;\n    line-height: 16.1px;\n    text-align: left;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="passkeyConfirmationContainer"]\n    [data-supertokens~="passkeyFeatureBlocksContainer"]\n    [data-supertokens~="passkeyFeatureBlock"]\n    [data-supertokens~="passkeyFeatureBlockDetails"]\n    [data-supertokens~="passkeyFeatureBlockSubText"] {\n    font-size: var(--font-size-0);\n    font-weight: 400;\n    line-height: 13.8px;\n    text-align: left;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textGray));\n    margin-top: 9px;\n}\n[data-supertokens~="passkeyConfirmationContainer"] [data-supertokens~="passkeyConfirmationFooter"] {\n    margin-top: 25px;\n}\n[data-supertokens~="somethingWentWrongContainer"]\n    [data-supertokens~="somethingWentWrongErrorDetailsContainer"]\n    [data-supertokens~="label"] {\n    margin-top: 4px;\n    font-size: var(--font-size-4);\n    font-weight: 500;\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: #222222;\n}\n[data-supertokens~="somethingWentWrongContainer"]\n    [data-supertokens~="somethingWentWrongErrorDetailsContainer"]\n    [data-supertokens~="errorDetails"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    line-height: 21px;\n    letter-spacing: 0.4px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: #656565;\n}\n[data-supertokens~="somethingWentWrongContainer"] [data-supertokens~="goBackButtonContainer"] {\n    margin-top: 22px;\n}\n[data-supertokens~="somethingWentWrongContainer"]\n    [data-supertokens~="goBackButtonContainer"]\n    [data-supertokens~="errorGoBackLabel"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    line-height: 21px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: #0076ff;\n}\n[data-supertokens~="passkeySignInContainer"] {\n    margin-bottom: 6px;\n}\n[data-supertokens~="passkeyRecoverAccountFormContainer"]\n    [data-supertokens~="passkeyRecoverAccountFormHeaderWrapper"]\n    [data-supertokens~="passkeyRecoverAccountFormHeader"] {\n    padding-top: 10px;\n}\n[data-supertokens~="passkeyRecoverAccountFormContainer"]\n    [data-supertokens~="passkeyRecoverAccountFormHeaderWrapper"]\n    [data-supertokens~="passkeyRecoverAccountFormSubHeader"] {\n    width: 75%;\n    margin: 0 auto;\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    line-height: 16.1px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 20px;\n}\n[data-supertokens~="passkeyRecoverAccountFormContainer"] [data-supertokens~="errorContainer"] {\n    margin-bottom: 15px;\n}\n[data-supertokens~="passkeyEmailSentContainer"] [data-supertokens~="emailSentDescription"] {\n    margin: 0 auto;\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    line-height: 16.1px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textGray));\n}\n[data-supertokens~="passkeyEmailSentContainer"]\n    [data-supertokens~="emailSentDescription"]\n    [data-supertokens~="changeEmailBtn"] {\n    line-height: 16.1px;\n}\n[data-supertokens~="passkeyRecoverAccountSuccessContainer"]\n    [data-supertokens~="header"]\n    [data-supertokens~="headerText"] {\n    margin-top: 20px;\n    font-size: 20px;\n    font-weight: 700;\n    line-height: 30px;\n    text-align: center;\n    text-underline-position: from-font;\n    -webkit-text-decoration-skip-ink: none;\n            text-decoration-skip-ink: none;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="passkeyMfaSignInDivider"] {\n    color: rgb(var(--palette-textPrimary));\n    font-size: var(--font-size-2);\n    display: flex;\n    align-items: center;\n    gap: 15px;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var WebauthnMFAFooter = uiEntry.withOverride("WebauthnMFAFooter", function PasswordlessMFAFooter(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "footerLinkGroupVert webauthn-mfa footer" },
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
                                t("WEBAUTHN_MFA_FOOTER_LOGOUT"),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

var WebauthnMFALoadingScreen = uiEntry.withOverride("WebauthnMFALoadingScreen", function WebauthnMFALoadingScreen() {
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
});

var PasskeyNotSupportedError = uiEntry.withOverride("WebauthnPasskeyNotSupportedError", function () {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "continueWithPasskeyButtonNotSupported" },
            { children: t("WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER") }
        )
    );
});

var WebauthnMFASignIn = uiEntry.withOverride("WebauthnMFASignIn", function WebauthnMFASignIn(props) {
    var _this = this;
    var t = translationContext.useTranslation();
    var _a = React__namespace.useState(false),
        isLoading = _a[0],
        setIsLoading = _a[1];
    var onClick = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setIsLoading(true);
                            return [4 /*yield*/, props.onSignIn()];
                        case 1:
                            _a.sent();
                            setIsLoading(false);
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props]
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.onBackButtonClicked
                ? jsxRuntime.jsxs(
                      "div",
                      genericComponentOverrideContext.__assign(
                          { "data-supertokens": "headerTitle withBackButton webauthn-mfa" },
                          {
                              children: [
                                  jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked }),
                                  t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE"),
                                  jsxRuntime.jsx("span", {
                                      "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                  }),
                              ],
                          }
                      )
                  )
                : jsxRuntime.jsx(
                      "div",
                      genericComponentOverrideContext.__assign(
                          { "data-supertokens": "headerTitle webauthn-mfa" },
                          { children: t("WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE") }
                      )
                  ),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle secondaryText" },
                    { children: t("WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE") }
                )
            ),
            jsxRuntime.jsx(button.Button, {
                disabled: !props.deviceSupported || isLoading,
                isLoading: isLoading,
                type: "button",
                onClick: onClick,
                label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                isGreyedOut: !props.deviceSupported,
                icon: componentOverrideContext.PasskeyIcon,
            }),
            props.error !== undefined && jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
            props.canRegisterPasskey &&
                jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                        jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "passkeyMfaSignInDivider" },
                                {
                                    children: [
                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                        jsxRuntime.jsx("span", { children: t("WEBAUTHN_MFA_DIVIDER") }),
                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
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
                                        jsxRuntime.jsx(
                                            "span",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "link", onClick: props.onRegisterPasskeyClick },
                                                { children: t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE") }
                                            )
                                        ),
                                        t("WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE"),
                                    ],
                                }
                            )
                        ),
                    ],
                }),
            !props.deviceSupported && jsxRuntime.jsx(PasskeyNotSupportedError, {}),
            jsxRuntime.jsx(WebauthnMFAFooter, genericComponentOverrideContext.__assign({}, props)),
        ],
    });
});

var WebauthnMFASignUp = uiEntry.withOverride("WebauthnMFASignUp", function WebauthnMFASignUp(props) {
    var _this = this;
    var t = translationContext.useTranslation();
    var onSuccess = React__namespace.useCallback(
        function (_a) {
            var email = _a.email;
            props.onContinueClick(email);
        },
        [props.onContinueClick]
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.onBackButtonClicked
                ? jsxRuntime.jsxs(
                      "div",
                      genericComponentOverrideContext.__assign(
                          { "data-supertokens": "headerTitle withBackButton webauthn-mfa" },
                          {
                              children: [
                                  jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked }),
                                  t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE"),
                                  jsxRuntime.jsx("span", {
                                      "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                  }),
                              ],
                          }
                      )
                  )
                : jsxRuntime.jsx(
                      "div",
                      genericComponentOverrideContext.__assign(
                          { "data-supertokens": "headerTitle webauthn-mfa" },
                          { children: t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE") }
                      )
                  ),
            props.error !== undefined && jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "signUpFormInnerContainer" },
                    {
                        children: [
                            jsxRuntime.jsx(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "cautionMessage" },
                                    { children: t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL") }
                                )
                            ),
                            jsxRuntime.jsx(formBase.FormBase, {
                                clearError: props.clearError,
                                onFetchError: props.onFetchError,
                                onError: props.onError,
                                formFields: [
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
                                                            value: "WEBAUTHN_SIGN_UP_LABEL",
                                                            "data-supertokens": "emailInputLabel",
                                                        }),
                                                        jsxRuntime.jsx(
                                                            "a",
                                                            genericComponentOverrideContext.__assign(
                                                                {
                                                                    onClick: props.onRecoverAccountClick,
                                                                    "data-supertokens":
                                                                        "link linkButton formLabelLinkBtn recoverAccountTrigger",
                                                                },
                                                                { children: t("WEBAUTHN_RECOVER_ACCOUNT_LABEL") }
                                                            )
                                                        ),
                                                    ],
                                                }
                                            )
                                        ),
                                        optional: false,
                                        autofocus: true,
                                        placeholder: "",
                                        getDefaultValue: function () {
                                            return props.email;
                                        },
                                        autoComplete: "email",
                                        // We are using the default validator that allows any string
                                        validate: validators.defaultEmailValidator,
                                    },
                                ],
                                buttonLabel: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                                onSuccess: onSuccess,
                                callAPI: function (formFields) {
                                    return genericComponentOverrideContext.__awaiter(
                                        _this,
                                        void 0,
                                        void 0,
                                        function () {
                                            var email;
                                            var _a;
                                            return genericComponentOverrideContext.__generator(this, function (_b) {
                                                email =
                                                    (_a = formFields.find(function (field) {
                                                        return field.id === "email";
                                                    })) === null || _a === void 0
                                                        ? void 0
                                                        : _a.value;
                                                if (email === undefined) {
                                                    throw new STGeneralError__default.default(
                                                        "GENERAL_ERROR_EMAIL_UNDEFINED"
                                                    );
                                                }
                                                if (email === "") {
                                                    throw new STGeneralError__default.default(
                                                        "EMAIL_INPUT_NOT_POPULATED_ERROR"
                                                    );
                                                }
                                                // We do not want the form to make the API call since we have
                                                // an intermediary step here so we will just mock an OK status
                                                // to render the next step.
                                                return [
                                                    2 /*return*/,
                                                    {
                                                        status: "OK",
                                                        email: email,
                                                    },
                                                ];
                                            });
                                        }
                                    );
                                },
                                validateOnBlur: false,
                                showLabels: true,
                                footer: jsxRuntime.jsx(
                                    WebauthnMFAFooter,
                                    genericComponentOverrideContext.__assign({}, props)
                                ),
                            }),
                        ],
                    }
                )
            ),
        ],
    });
});

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function FingerPrintIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "22", height: "22", viewBox: "0 0 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M0.364853 0.0364227C0.244304 0.0845041 0.138369 0.193473 0.0615589 0.348417C-0.00354731 0.479822 -0.00518591 0.539239 0.00411019 2.42023C0.0116006 3.93286 0.0228697 4.35981 0.0555064 4.37068C0.0785125 4.37833 0.0973054 4.40311 0.0973054 4.42571C0.0973054 4.54943 0.445408 4.74684 0.663565 4.74684C0.815145 4.74684 1.04812 4.6382 1.15322 4.51847C1.32697 4.32059 1.33456 4.24526 1.33456 2.71799V1.30289H2.79384C4.22377 1.30289 4.25607 1.30142 4.39826 1.23044C4.47855 1.19034 4.58478 1.09823 4.63601 1.0243C4.71774 0.90637 4.72864 0.860194 4.72864 0.631757C4.72864 0.392955 4.72068 0.362895 4.62595 0.244397C4.42043 -0.0127287 4.52666 -0.00126008 2.37117 0.00104703C1.17689 0.00231761 0.41675 0.0157255 0.364853 0.0364227ZM17.6195 0.0364227C17.1685 0.216243 17.1268 0.918675 17.55 1.20519L17.6696 1.28617L19.1827 1.2955L20.6959 1.30486V2.77289C20.6959 3.72883 20.7083 4.27378 20.7314 4.33507C20.8144 4.55461 21.1022 4.74684 21.3479 4.74684C21.5937 4.74684 21.8815 4.55461 21.9644 4.33507C21.988 4.27261 22 3.60559 22 2.35289C22 0.824083 21.9912 0.44438 21.9539 0.357245C21.8983 0.22711 21.7497 0.0828324 21.6216 0.03445C21.4968 -0.0127287 17.7381 -0.0108564 17.6195 0.0364227ZM10.2127 2.19293C9.93596 2.23323 9.20123 2.37988 9.14262 2.40653C9.10583 2.42324 9.00802 2.45367 8.92526 2.4741C8.41785 2.59945 7.37308 3.10718 6.91891 3.44914C6.20143 3.9893 5.75459 4.4316 5.21922 5.13135C5.00227 5.41496 4.58729 6.17002 4.42909 6.56912C4.37803 6.69785 4.32279 6.83327 4.3063 6.87005C4.25551 6.98346 4.14021 7.39306 4.08981 7.63908C4.06346 7.76781 4.02762 7.91828 4.01016 7.97345C3.99274 8.02862 3.96305 8.20917 3.94419 8.37468C3.90052 8.7583 3.89727 13.2703 3.94058 13.3843C4.05093 13.6744 4.40026 13.8494 4.71737 13.7734C4.91162 13.7267 5.10159 13.5766 5.16833 13.4168C5.20458 13.33 5.21357 12.9045 5.21381 11.2596C5.21401 9.67225 5.22514 9.11643 5.26316 8.79264C5.33255 8.20165 5.38321 7.87852 5.4126 7.8397C5.42655 7.82131 5.45597 7.73103 5.47804 7.63908C5.52951 7.42462 5.64989 7.11557 5.82972 6.73623C6.41846 5.49434 7.57077 4.42103 8.84166 3.93082C8.9704 3.88117 9.10583 3.82677 9.14262 3.80992C9.37639 3.70292 9.94348 3.59027 10.5506 3.53019C11.1559 3.47034 11.8709 3.53393 12.52 3.70543C12.7764 3.77314 13.233 3.93293 13.2879 3.97409C13.3069 3.98833 13.3752 4.02077 13.4396 4.04608C13.5756 4.09958 13.9651 4.31317 14.1585 4.44029C14.5925 4.72554 15.264 5.34224 15.53 5.69977C15.5847 5.77333 15.6378 5.84104 15.648 5.85024C15.751 5.94306 16.3488 7.00566 16.3488 7.09591C16.3488 7.11323 16.3702 7.17485 16.3965 7.2328C16.4697 7.39466 16.6076 7.8817 16.6487 8.12391C16.669 8.24344 16.7008 8.41648 16.7192 8.50843C16.7377 8.60038 16.7639 8.96433 16.7774 9.31719L16.8019 9.95876L16.9045 10.0862C17.1294 10.3654 17.4433 10.4388 17.746 10.2829C17.8347 10.2372 17.9403 10.1469 17.9873 10.0765C18.0678 9.95599 18.0713 9.9283 18.0816 9.33019C18.0993 8.3055 17.9766 7.58943 17.6285 6.68615C17.5432 6.4647 17.2533 5.85375 17.1768 5.73405C16.5906 4.81705 16.2187 4.37325 15.5796 3.82787C14.959 3.29831 14.1667 2.8429 13.4061 2.57849C12.9518 2.42057 12.7982 2.3775 12.3623 2.28605C11.9982 2.20965 11.8585 2.19862 11.1322 2.18909C10.6817 2.18317 10.2678 2.18488 10.2127 2.19293ZM10.3631 4.7681C9.30132 4.96611 8.50038 5.37333 7.80565 6.06838C7.22685 6.64746 6.79909 7.3864 6.61578 8.12391C6.49068 8.62726 6.48691 8.70781 6.48309 10.966C6.48102 12.1889 6.46677 13.2647 6.45146 13.3567C6.40063 13.6617 6.31339 13.9172 6.19913 14.0959C5.8421 14.6539 5.32008 14.9738 4.67848 15.0277C4.31744 15.058 4.14208 15.1405 4.00592 15.3443C3.91229 15.4844 3.90506 15.5157 3.9155 15.7338C3.92499 15.932 3.94228 15.9911 4.02066 16.0939C4.22678 16.3641 4.42882 16.4168 4.97181 16.3417C5.39311 16.2835 5.67657 16.2001 5.99933 16.0394C6.79518 15.6431 7.36171 14.9813 7.66621 14.0923L7.76927 13.7914L7.78876 11.4007C7.80538 9.36584 7.81662 8.96487 7.8643 8.70701C7.94653 8.26224 8.08968 7.9052 8.35278 7.48862C8.46788 7.30636 8.93155 6.81825 9.09246 6.70995C9.34997 6.53665 9.42986 6.48964 9.62748 6.39515C10.1741 6.13381 10.7703 6.03457 11.358 6.1071C12.4125 6.23723 13.2488 6.79933 13.8115 7.75611C13.9013 7.90881 14.0394 8.2716 14.0873 8.48078C14.1134 8.59429 14.1445 8.70313 14.1566 8.72265C14.1686 8.74218 14.1908 9.10821 14.2057 9.53606C14.2305 10.2421 14.2413 10.341 14.3232 10.6068C14.4025 10.8641 14.6483 11.3941 14.7421 11.51C14.7604 11.5326 14.8486 11.6416 14.9381 11.7522C15.2381 12.1229 15.6327 12.4339 16.0451 12.6243C16.1478 12.6717 16.2576 12.7241 16.2893 12.7408C16.4343 12.8169 17.0726 12.9387 17.3262 12.9387C17.6665 12.9387 17.845 12.8589 17.9885 12.6423C18.0701 12.5191 18.0876 12.4579 18.0876 12.2966C18.0876 11.8324 17.8614 11.6408 17.233 11.573C16.6964 11.515 16.3008 11.3018 15.9674 10.8909C15.644 10.4923 15.5133 10.0149 15.5121 9.22738C15.5117 8.97908 15.4969 8.67521 15.4791 8.55213C15.4471 8.33138 15.3148 7.83442 15.2359 7.63908C15.1616 7.45498 14.8555 6.8663 14.774 6.75061C14.077 5.76173 13.2112 5.16235 12.0351 4.8545C11.7601 4.78251 11.6321 4.77007 11.0821 4.76195C10.7326 4.75677 10.4091 4.75954 10.3631 4.7681ZM10.3686 7.42031C9.80608 7.6222 9.40454 8.00979 9.17197 8.5753L9.07574 8.80935L9.07758 9.74557C9.07871 10.3231 9.09456 10.7587 9.11894 10.8824C9.14071 10.9927 9.18171 11.2094 9.21003 11.3639C9.23838 11.5184 9.28242 11.714 9.30787 11.7986C9.46196 12.3108 9.57435 12.6588 9.59501 12.688C9.60809 12.7064 9.63792 12.7816 9.66136 12.8552C9.71991 13.0391 10.114 13.8155 10.2693 14.0529C10.3393 14.1599 10.3966 14.2557 10.3966 14.2657C10.3966 14.2758 10.4528 14.3612 10.5215 14.4556C11.2929 15.5159 12.0453 16.2268 13.0881 16.8808C13.3505 17.0454 14.1869 17.4549 14.3926 17.5196C14.4661 17.5428 14.5446 17.5761 14.5669 17.5938C14.5892 17.6115 14.6965 17.634 14.8054 17.6439C15.2043 17.6801 15.5128 17.4042 15.5128 17.0112C15.5128 16.6587 15.3635 16.4545 15.0064 16.3183C14.8895 16.2737 14.7004 16.1947 14.5863 16.1427C14.4721 16.0908 14.3717 16.0483 14.3633 16.0483C14.3223 16.0483 13.6696 15.66 13.4286 15.4921C11.9045 14.4309 10.8596 12.8262 10.5139 11.0162C10.4523 10.6935 10.3963 10.1577 10.3734 9.67175C10.3561 9.30237 10.3612 9.24637 10.4278 9.08243C10.5206 8.85369 10.6379 8.74114 10.8397 8.68738C11.1251 8.61128 11.4157 8.74145 11.5599 9.00997C11.6022 9.08875 11.619 9.26824 11.6382 9.84588C11.6536 10.313 11.6805 10.6486 11.7117 10.7654C11.7387 10.8665 11.7791 11.0396 11.8013 11.1499C11.8235 11.2602 11.8525 11.3656 11.8657 11.384C11.8788 11.4023 11.9087 11.4851 11.9321 11.5679C11.9555 11.6506 11.9942 11.7635 12.0183 11.8186C12.1918 12.2165 12.2568 12.3491 12.4051 12.6082C12.6036 12.9551 12.9701 13.4464 13.2339 13.7194C13.4376 13.9301 14.008 14.4074 14.2254 14.549C14.5346 14.7505 15.1592 15.0783 15.2348 15.0789C15.2498 15.079 15.3068 15.1025 15.3617 15.1311C15.4774 15.1914 15.8364 15.2992 16.1481 15.3672C16.2677 15.3933 16.4407 15.431 16.5327 15.451C16.6246 15.471 16.8976 15.4952 17.1392 15.5046C17.5504 15.5207 17.5884 15.5169 17.7339 15.4442C17.9601 15.3313 18.0876 15.1259 18.0876 14.8745C18.0876 14.6448 18.0476 14.5265 17.9266 14.3984C17.7722 14.2348 17.6106 14.1864 17.0844 14.146C15.9636 14.0599 15.078 13.6458 14.2567 12.824C13.8821 12.4492 13.6092 12.0609 13.3909 11.592C13.0921 10.9504 12.9863 10.4332 12.9415 9.39449C12.917 8.82751 12.9071 8.7578 12.8228 8.55858C12.5959 8.022 12.2183 7.64727 11.684 7.4284C11.517 7.36002 11.4132 7.34404 11.0654 7.33324C10.6687 7.3209 10.6331 7.32535 10.3686 7.42031ZM8.74141 15.0645C8.60548 15.1353 8.52673 15.2104 8.46684 15.3262C8.43919 15.3797 8.40281 15.4399 8.38599 15.46C8.36917 15.4802 8.29252 15.5922 8.21565 15.7089C8.065 15.9377 7.59776 16.4338 7.35362 16.6241C6.58321 17.2246 5.73442 17.5451 4.76208 17.6028C4.31275 17.6294 4.15542 17.6952 4.00592 17.9189C3.91205 18.0594 3.90503 18.0899 3.91563 18.3112C3.92563 18.5192 3.94074 18.5682 4.02909 18.679C4.15897 18.8419 4.34499 18.9339 4.57816 18.9506C4.76522 18.964 5.56214 18.8793 5.79033 18.8217C5.85932 18.8044 5.9797 18.7748 6.05785 18.7561C6.50115 18.6501 7.39983 18.2458 7.75489 17.9925C7.83765 17.9334 7.94298 17.8601 7.98896 17.8296C8.30493 17.6196 8.73034 17.2086 9.14506 16.7127C9.26958 16.5638 9.51265 16.2026 9.6129 16.0175C9.75148 15.7616 9.74987 15.5074 9.60836 15.3061C9.44969 15.0803 9.32238 15.0118 9.06243 15.012C8.92767 15.0121 8.80261 15.0326 8.74141 15.0645ZM10.5699 17.0019C10.4488 17.0545 10.3809 17.1247 10.0345 17.5556C9.78639 17.8642 9.39625 18.264 9.06423 18.5499C8.80588 18.7724 8.74649 18.883 8.74649 19.1412C8.74649 19.3854 8.80789 19.5135 8.99659 19.663C9.11339 19.7555 9.17094 19.7762 9.34155 19.787C9.475 19.7955 9.58813 19.7826 9.66641 19.7499C9.84002 19.6773 10.3048 19.262 10.793 18.743C10.9641 18.5611 10.9753 18.5549 11.0438 18.6045C11.2845 18.7788 11.7021 19.0424 12.0351 19.2303C12.3836 19.4269 12.51 19.4909 13.0071 19.7222C13.5778 19.9877 14.1387 19.5332 13.9778 18.9356C13.9429 18.8063 13.7083 18.5226 13.6363 18.5226C13.5892 18.5226 12.8065 18.1355 12.5912 18.0057C12.4832 17.9406 12.3894 17.8873 12.3826 17.8873C12.3615 17.8873 11.5557 17.3153 11.4332 17.2134C11.3688 17.1598 11.297 17.1005 11.2736 17.0817C11.1135 16.9526 10.7723 16.914 10.5699 17.0019ZM0.416449 17.2717C0.250658 17.3325 0.147397 17.4284 0.0615589 17.6016C-0.00354731 17.733 -0.00518591 17.7924 0.00411019 19.6734C0.0116006 21.186 0.0228697 21.613 0.0555064 21.6238C0.0785125 21.6315 0.0973054 21.6563 0.0973054 21.6789C0.0973054 21.7425 0.267143 21.8877 0.410698 21.9467C0.523756 21.9932 0.772711 22 2.37248 22C4.08864 22 4.21404 21.996 4.35081 21.9374C4.53265 21.8595 4.70152 21.6714 4.73108 21.514C4.79475 21.1745 4.67594 20.8937 4.40645 20.7469L4.25143 20.6625H2.79301H1.33456V19.2474C1.33456 17.68 1.32804 17.6235 1.12409 17.4259C1.00846 17.3138 0.778395 17.2172 0.636479 17.2209C0.588227 17.2222 0.489213 17.2451 0.416449 17.2717ZM21.1149 17.2719C21.0418 17.2986 20.9384 17.3615 20.885 17.4117C20.6959 17.5892 20.6959 17.5897 20.6959 19.1903V20.6625L19.2162 20.6631C17.7467 20.6636 17.7356 20.6642 17.6059 20.7383C17.5341 20.7794 17.4288 20.8708 17.3718 20.9415C17.2753 21.0614 17.2683 21.0881 17.2683 21.3399C17.2683 21.5262 17.2813 21.6142 17.3101 21.6238C17.3332 21.6315 17.3519 21.6563 17.3519 21.6789C17.3519 21.7425 17.5218 21.8877 17.6653 21.9467C17.7784 21.9932 18.0273 22 19.6271 22C21.3487 22 21.4682 21.9962 21.6043 21.937C21.7688 21.8654 21.9121 21.7266 21.9644 21.5882C21.988 21.5258 22 20.8587 22 19.6061C22 17.554 22.0033 17.5924 21.8114 17.4122C21.704 17.3114 21.47 17.2173 21.3354 17.2209C21.2871 17.2222 21.1879 17.2452 21.1149 17.2719Z",
                    fill: "#1C222A",
                }),
            }
        )
    );
}

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function MultipleDevicesIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M1.2938 0.0325123C1.23453 0.0485249 1.07251 0.118743 0.933735 0.188526C0.674106 0.319087 0.377281 0.583606 0.27407 0.776348C0.246666 0.827532 0.21024 0.887065 0.193151 0.908685C0.176032 0.930274 0.125596 1.05585 0.0810416 1.18769L0 1.42744L0.00800547 7.82324L0.0159804 14.2191L0.0976995 14.4118C0.335221 14.9719 0.697261 15.3069 1.26301 15.49C1.45915 15.5535 1.52421 15.555 4.51915 15.5656L7.57515 15.5765V16.6939V17.8113L7.01322 17.8256C6.30374 17.8436 6.15606 17.8926 5.87383 18.2038C5.40855 18.7168 5.57805 19.5804 6.20761 19.9045L6.35891 19.9823L8.00093 19.9912L9.64295 20L9.6229 19.9361C9.61188 19.9009 9.55055 19.7848 9.48659 19.678C9.42267 19.5712 9.3529 19.43 9.33153 19.364C9.31019 19.2982 9.27352 19.207 9.25009 19.1616C9.22663 19.1161 9.20677 19.0509 9.2059 19.0166C9.20507 18.9823 9.18152 18.8982 9.15359 18.8297C9.10854 18.7192 9.10088 18.4448 9.08566 16.3998L9.06851 14.0945L5.33758 14.0789L1.60667 14.0633L1.5272 13.9878L1.44776 13.9122V7.77084V1.62941L1.53413 1.5457L1.62046 1.46199H10.5039H19.3874L19.4698 1.54903L19.5522 1.63604L19.5602 3.021L19.5682 4.40593L19.7749 4.44023C19.9902 4.47596 20.272 4.55581 20.4304 4.62593C20.6754 4.73444 20.7479 4.76976 20.8691 4.83948L21 4.91478V3.18661C21 1.53243 20.9871 1.24629 20.9072 1.13489C20.8949 1.11775 20.8681 1.05118 20.8477 0.98691C20.8272 0.922673 20.8011 0.870087 20.7896 0.870087C20.7781 0.870087 20.7511 0.829962 20.7297 0.780896C20.6792 0.665506 20.3401 0.322389 20.226 0.271299C20.1775 0.249585 20.1379 0.222326 20.1379 0.210675C20.1379 0.199055 20.0859 0.172638 20.0224 0.151921C19.9589 0.131236 19.8931 0.104133 19.8761 0.0917027C19.7522 0.000767675 19.4517 -0.00216069 10.479 0.000611915C4.96153 0.00232532 1.3593 0.0148487 1.2938 0.0325123ZM11.6697 5.8341C11.3794 5.93781 11.1893 6.06014 10.9608 6.29024C10.7355 6.51722 10.6079 6.73298 10.4978 7.07314L10.4233 7.30314V12.8483V18.3935L10.4985 18.6272C10.7302 19.3466 11.2859 19.8282 12.009 19.9362C12.1022 19.9501 12.8747 19.9627 13.7256 19.9641C15.2196 19.9667 15.2729 19.9647 15.2729 19.9083C15.2729 19.8761 15.2521 19.8323 15.2267 19.811C15.2013 19.7897 15.1805 19.7597 15.1805 19.7445C15.1805 19.7293 15.1543 19.6574 15.1223 19.5848C15.0902 19.5122 15.0526 19.4247 15.0386 19.3904C15.0246 19.3562 15.0058 18.8865 14.9968 18.3468L14.9804 17.3655L13.4331 17.3574L11.8859 17.3494V12.4662C11.8859 9.38365 11.897 7.54402 11.9159 7.47707C11.9325 7.41875 11.9764 7.33825 12.0137 7.29816L12.0814 7.22526H15.7187H19.356L19.4541 7.32769L19.5522 7.43012L19.5602 9.01773L19.5682 10.6053L19.9685 10.6234C20.3844 10.6422 20.651 10.697 20.8614 10.807L20.9846 10.8714L20.9927 9.08726C20.998 7.92797 20.9895 7.24757 20.9684 7.14445C20.9296 6.95414 20.7479 6.58794 20.6017 6.40513C20.3936 6.1451 20.1008 5.94715 19.7441 5.8256C19.5566 5.7617 19.5181 5.76108 15.7126 5.76173L11.8705 5.76239L11.6697 5.8341ZM16.4737 11.4912C16.4483 11.5053 16.3772 11.5385 16.3157 11.5651C16.1442 11.639 16.0026 11.7819 15.9026 11.9816L15.8117 12.163L15.8029 15.4963C15.7969 17.7743 15.8046 18.8986 15.8274 19.0472C15.8771 19.3719 16.0835 19.6592 16.3198 19.7325C16.3621 19.7456 16.4162 19.7721 16.44 19.7914C16.471 19.8167 17.0223 19.8266 18.3952 19.8266H20.3072L20.4766 19.7448C20.6623 19.6551 20.781 19.5487 20.9041 19.3616L20.9846 19.2392V15.6544V12.0695L20.9106 11.9449C20.8135 11.7815 20.6257 11.604 20.5 11.5568C20.4448 11.5361 20.3755 11.5063 20.3461 11.4906C20.2795 11.455 16.5381 11.4556 16.4737 11.4912ZM19.9223 15.3873V18.191H18.4136H16.9048V15.3873V12.5835H18.4136H19.9223V15.3873ZM18.5403 18.6913C18.7034 18.7755 18.7679 18.9199 18.7211 19.0957C18.6819 19.2432 18.5807 19.3194 18.4182 19.3237C18.1782 19.3301 18.0307 19.1173 18.1038 18.8703C18.1333 18.7706 18.1643 18.7368 18.2692 18.6896C18.3401 18.6577 18.4022 18.6306 18.4071 18.6294C18.412 18.6282 18.4719 18.6561 18.5403 18.6913Z",
                    fill: "#1C222A",
                }),
            }
        )
    );
}

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function SecurityIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "16", height: "20", viewBox: "0 0 16 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M7.74971 0.0115695C7.7268 0.0212227 7.6556 0.0538204 7.59151 0.0839829C7.52743 0.114175 7.46681 0.13888 7.45681 0.13888C7.44681 0.13888 7.39926 0.157687 7.35112 0.180661C7.30298 0.203635 7.16983 0.263813 7.05525 0.314426C6.94066 0.36501 6.8219 0.418234 6.79135 0.432699C6.76079 0.447164 6.68579 0.480759 6.62467 0.507342C6.37589 0.615551 5.77415 0.875893 5.51353 0.988063C5.36074 1.05385 5.19824 1.12541 5.1524 1.14715C4.95626 1.24013 4.84114 1.29074 4.60127 1.3895C4.46132 1.44713 4.33432 1.50388 4.31904 1.51555C4.30376 1.52726 4.18501 1.58004 4.05514 1.63283C3.92528 1.68558 3.80713 1.74074 3.79263 1.75539C3.7781 1.77 3.75035 1.78197 3.73096 1.78197C3.71155 1.78197 3.62965 1.8133 3.54901 1.85156C3.46834 1.88985 3.31484 1.95737 3.20789 2.00158C3.10094 2.0458 3.00094 2.0921 2.98566 2.10442C2.97038 2.11678 2.92663 2.13667 2.88843 2.14864C2.85024 2.16061 2.76899 2.1935 2.70787 2.22179C2.64676 2.25004 2.51528 2.30708 2.41569 2.34851C2.31611 2.38997 2.19735 2.44443 2.1518 2.46951C2.10624 2.4946 2.05891 2.5152 2.0466 2.51531C2.01979 2.51552 1.79481 2.61622 1.68475 2.67725C1.6415 2.70125 1.595 2.72088 1.58142 2.72088C1.5678 2.72088 1.48839 2.75388 1.40488 2.79423C1.32138 2.83457 1.24477 2.86758 1.23463 2.86758C1.21565 2.86758 1.15515 2.89487 0.883142 3.02608C0.796222 3.06801 0.716997 3.10231 0.70708 3.10231C0.697135 3.10231 0.610744 3.14057 0.515101 3.18734C0.287482 3.2986 0.144588 3.43447 0.0647523 3.61557L0 3.76248L0.000472403 6.16843C0.000722412 7.4917 0.0127228 8.69321 0.0271122 8.83845C0.0954757 9.52819 0.136449 9.87641 0.163506 9.99741C0.179729 10.07 0.210841 10.2351 0.232619 10.3642C0.282788 10.6612 0.357707 11.0257 0.380402 11.083C0.390014 11.1072 0.419598 11.2129 0.44621 11.3177C0.547602 11.7175 0.588604 11.8615 0.609132 11.8899C0.620799 11.906 0.645578 11.9851 0.66419 12.0656C0.682802 12.146 0.707886 12.2252 0.719914 12.2416C0.73197 12.2579 0.750693 12.3105 0.761554 12.3583C0.782722 12.4515 0.86303 12.6589 0.930394 12.7945C0.953117 12.8402 0.9717 12.8917 0.9717 12.9091C0.9717 12.9899 1.65945 14.4387 1.72056 14.4866C1.73087 14.4946 1.78167 14.5805 1.83348 14.6773C1.88529 14.7741 1.93793 14.8665 1.95043 14.8827C1.96296 14.8988 2.01304 14.978 2.06171 15.0587C2.11041 15.1394 2.15699 15.212 2.16524 15.2201C2.17349 15.2282 2.21769 15.294 2.2635 15.3664C2.35014 15.5034 2.68262 15.9729 2.73396 16.0309C2.75018 16.0491 2.80718 16.1216 2.86066 16.1918C3.36731 16.8573 4.44152 17.931 4.99998 18.3302C5.03384 18.3544 5.11323 18.4147 5.17643 18.4643C5.34457 18.5961 5.63792 18.8076 5.74964 18.8775C5.80312 18.911 5.9301 18.9924 6.03185 19.0585C6.23508 19.1903 6.59345 19.3957 6.91635 19.5653C7.09641 19.6599 7.19069 19.706 7.51359 19.8574C7.97342 20.073 8.08467 20.06 8.79142 19.7087C9.03984 19.5852 9.3118 19.4446 9.40788 19.3899C9.72578 19.2089 9.98768 19.0479 9.99515 19.0287C10.0003 19.0157 10.0167 19.0051 10.0316 19.0051C10.0698 19.0051 10.6872 18.5723 11.0249 18.3089C12.0679 17.4951 13.1408 16.3045 13.8714 15.1499C14.1104 14.7723 14.3209 14.4174 14.3702 14.3091C14.3808 14.2857 14.4219 14.2071 14.4615 14.1345C14.5716 13.9323 14.8431 13.3536 14.9432 13.1075C14.9925 12.9865 15.0499 12.8479 15.0709 12.7995C15.1328 12.6565 15.3046 12.1685 15.3628 11.9706C15.3924 11.8697 15.4429 11.6981 15.4749 11.5892C15.6687 10.9305 15.8341 10.0872 15.9023 9.41059C15.9243 9.19274 15.9553 8.90077 15.9711 8.76178C15.9889 8.60642 16 7.599 16 6.14675V3.78445L15.9332 3.62493C15.8529 3.4331 15.7179 3.30153 15.4843 3.18734C15.3887 3.14057 15.3023 3.10231 15.2924 3.10231C15.2824 3.10231 15.2032 3.06801 15.1163 3.02608C14.8443 2.89487 14.7838 2.86758 14.7648 2.86758C14.7547 2.86758 14.6781 2.83457 14.5946 2.79423C14.5111 2.75388 14.4316 2.72088 14.418 2.72088C14.4044 2.72088 14.3579 2.70125 14.3147 2.67725C14.2046 2.61622 13.9797 2.51552 13.9528 2.51531C13.9405 2.5152 13.8932 2.4946 13.8476 2.46951C13.8021 2.44443 13.6833 2.38997 13.5837 2.34851C13.4842 2.30708 13.3527 2.25004 13.2916 2.22179C13.2305 2.1935 13.1492 2.16061 13.111 2.14864C13.0728 2.13667 13.0291 2.11678 13.0138 2.10442C12.9985 2.0921 12.8985 2.04577 12.7916 2.00153C12.6846 1.95728 12.5471 1.89754 12.486 1.86882C12.4249 1.84006 12.2311 1.75533 12.0554 1.68048C11.8797 1.60563 11.6985 1.52623 11.6526 1.50402C11.5737 1.46573 11.1657 1.28666 10.9859 1.21141C10.9401 1.19219 10.8714 1.16126 10.8332 1.14263C10.795 1.12403 10.6387 1.05473 10.4859 0.98865C10.1118 0.826835 9.51158 0.566845 9.37477 0.507342C9.31366 0.480759 9.23865 0.447164 9.2081 0.432699C9.17754 0.418234 9.05879 0.36501 8.9442 0.314426C8.82961 0.263813 8.69647 0.203635 8.64833 0.180661C8.60019 0.157687 8.55263 0.13888 8.54263 0.13888C8.53263 0.13888 8.46577 0.109685 8.39404 0.0739775C8.29754 0.0259465 8.20223 0.00710975 8.0275 0.00153498C7.89764 -0.00260208 7.77263 0.00191639 7.74971 0.0115695ZM8.04872 1.66343C8.07525 1.67895 8.1907 1.73276 8.30529 1.78305C8.41988 1.83331 8.55302 1.89326 8.60116 1.91623C8.6493 1.93921 8.69741 1.95801 8.70808 1.95801C8.71875 1.95801 8.76686 1.97682 8.815 1.99979C8.86314 2.02277 8.99629 2.08295 9.11087 2.13356C9.22546 2.18414 9.34421 2.23737 9.37477 2.25183C9.44263 2.28396 9.57897 2.34338 9.88868 2.47573C10.0185 2.53125 10.1642 2.59591 10.2123 2.61942C10.2605 2.64295 10.3081 2.66219 10.3182 2.66219C10.3283 2.66219 10.4077 2.69649 10.4946 2.73842C10.7666 2.86963 10.8271 2.89692 10.8461 2.89692C10.8562 2.89692 10.9328 2.92993 11.0163 2.97027C11.0998 3.01062 11.1792 3.04363 11.1929 3.04363C11.2064 3.04363 11.2529 3.06325 11.2962 3.08726C11.4063 3.14828 11.6312 3.24898 11.658 3.24919C11.6704 3.2493 11.7177 3.2699 11.7632 3.29499C11.8088 3.32008 11.9276 3.37453 12.0271 3.41599C12.1267 3.45742 12.2582 3.51446 12.3193 3.54271C12.3804 3.571 12.4617 3.60389 12.4999 3.61586C12.5381 3.62783 12.5818 3.64772 12.5971 3.66008C12.6124 3.6724 12.7124 3.7187 12.8193 3.76292C12.9263 3.80713 13.0798 3.87465 13.1605 3.91294C13.2411 3.9512 13.323 3.98253 13.3424 3.98253C13.3618 3.98253 13.3896 3.9945 13.4041 4.00912C13.4186 4.02376 13.5367 4.07892 13.6666 4.13167C13.7965 4.18446 13.9152 4.23712 13.9305 4.24871C13.9458 4.2603 14.0645 4.31312 14.1944 4.36608C14.3242 4.41904 14.4461 4.47487 14.4652 4.49013C14.5184 4.53262 14.5127 7.38484 14.4575 8.33965C14.4131 9.10897 14.3956 9.27967 14.3074 9.80669C14.2208 10.3237 14.167 10.5956 14.1417 10.6439C14.1287 10.6686 14.1095 10.7346 14.0989 10.7906C14.0777 10.9029 13.9523 11.3573 13.917 11.4498C13.9046 11.4821 13.8603 11.6141 13.8185 11.7432C13.7767 11.8723 13.7263 12.0175 13.7066 12.0659C13.6869 12.1144 13.6313 12.253 13.5829 12.374C13.3094 13.0591 12.8567 13.8902 12.3467 14.6433C11.9461 15.235 11.19 16.0899 10.6375 16.576C10.4436 16.7465 9.96746 17.1328 9.8314 17.2299C9.76359 17.2783 9.69348 17.3312 9.67556 17.3473C9.65767 17.3634 9.5595 17.4295 9.45741 17.494C9.35533 17.5586 9.23002 17.6402 9.1789 17.6755C9.12779 17.7107 8.96345 17.8086 8.8137 17.8929C8.66394 17.9772 8.52266 18.0569 8.49974 18.07C8.47682 18.0831 8.35365 18.147 8.22604 18.2119C8.00886 18.3224 7.98933 18.3273 7.92047 18.2874C7.88002 18.264 7.72071 18.1795 7.56643 18.0997C7.25634 17.9394 6.95352 17.7669 6.81679 17.6728C6.76774 17.639 6.64412 17.5586 6.54203 17.494C6.43995 17.4295 6.34178 17.3634 6.32389 17.3473C6.30597 17.3312 6.23561 17.2783 6.16752 17.2299C6.03107 17.1329 5.55622 16.7476 5.36196 16.5763C4.89767 16.1667 4.34221 15.5639 3.94203 15.0353C3.80519 14.8545 3.68132 14.6911 3.66674 14.6722C3.42681 14.3603 2.83727 13.3248 2.60053 12.7995C2.52781 12.6381 2.45817 12.4858 2.44575 12.461C2.34239 12.2547 2.01299 11.2798 1.91079 10.8776C1.57408 9.55287 1.4995 8.69893 1.4995 6.16946V4.49227L1.70089 4.40944C1.81167 4.36388 1.96479 4.2971 2.04118 4.26101C2.11757 4.22492 2.26758 4.15937 2.37453 4.11533C2.48148 4.07129 2.58084 4.02338 2.59537 4.00888C2.60987 3.99439 2.63765 3.98253 2.65704 3.98253C2.67645 3.98253 2.75835 3.9512 2.83899 3.91294C2.91966 3.87465 3.07316 3.80713 3.18011 3.76292C3.28706 3.7187 3.38706 3.6724 3.40234 3.66008C3.41762 3.64772 3.46137 3.62795 3.49957 3.6161C3.53776 3.60427 3.60651 3.57707 3.65235 3.55565C3.69818 3.53426 3.81694 3.48154 3.91625 3.43852C4.01556 3.39551 4.14926 3.33524 4.21334 3.30464C4.27743 3.27404 4.33751 3.24901 4.34682 3.24901C4.36904 3.24901 4.60313 3.14277 4.70325 3.08726C4.7465 3.06325 4.793 3.04363 4.80658 3.04363C4.8202 3.04363 4.89962 3.01062 4.98312 2.97027C5.06662 2.92993 5.14323 2.89692 5.15337 2.89692C5.17235 2.89692 5.23285 2.86963 5.50486 2.73842C5.59178 2.69649 5.67303 2.66175 5.68542 2.6612C5.69784 2.66064 5.75798 2.6347 5.81909 2.60351C5.8802 2.57232 5.94082 2.54639 5.95379 2.54583C5.96676 2.54527 6.01676 2.52602 6.06491 2.50305C6.11305 2.48008 6.24619 2.4199 6.36078 2.36928C6.47536 2.3187 6.59412 2.26565 6.62467 2.25142C6.65523 2.23719 6.77399 2.18414 6.88857 2.13356C7.00316 2.08295 7.1363 2.02277 7.18444 1.99979C7.23258 1.97682 7.2807 1.95801 7.29136 1.95801C7.30203 1.95801 7.35014 1.93921 7.39828 1.91623C7.44643 1.89326 7.57957 1.83334 7.69416 1.78308C7.80874 1.73282 7.92125 1.67977 7.94417 1.66519C7.99828 1.6308 7.993 1.63089 8.04872 1.66343ZM10.5415 6.91627C10.4706 6.95341 9.84179 7.59639 8.80606 8.69069L7.18172 10.4068L6.34764 9.53438C5.60475 8.75738 5.49791 8.65636 5.37091 8.61082C5.17354 8.54008 5.00245 8.54615 4.82236 8.63027C4.63708 8.71683 4.52999 8.82272 4.43407 9.01426C4.33568 9.21069 4.3311 9.50152 4.42321 9.70066C4.51132 9.89117 6.68334 12.1849 6.86441 12.2787C7.04097 12.3701 7.31914 12.3701 7.49665 12.2788C7.59138 12.23 8.12856 11.6818 9.55947 10.1736C11.6846 7.93357 11.6387 7.98938 11.6387 7.64548C11.6387 7.33672 11.44 7.01465 11.1782 6.8991C11.0344 6.83564 10.6768 6.84526 10.5415 6.91627Z",
                    fill: "#1C222A",
                }),
            }
        )
    );
}

var blockDetails = [
    {
        title: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD",
        subText: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL",
        icon: jsxRuntime.jsx(FingerPrintIcon, {}),
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES",
        subText: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL",
        icon: jsxRuntime.jsx(MultipleDevicesIcon, {}),
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER",
        subText: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL",
        icon: jsxRuntime.jsx(SecurityIcon, {}),
    },
];
var PasskeyFeatureBlock = uiEntry.withOverride("WebauthnPasskeyFeatureBlock", function FeatureBlock(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyFeatureBlock" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "passkeyFeatureBlockIcon" },
                            { children: props.icon }
                        )
                    ),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "passkeyFeatureBlockDetails" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "passkeyFeatureBlockTitle" },
                                            { children: t(props.title) }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "passkeyFeatureBlockSubText" },
                                            { children: t(props.subText) }
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
});
var PasskeyFeatureBlockList = function () {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyFeatureBlocksContainer" },
            {
                children: blockDetails.map(function (blockDetail, index) {
                    return jsxRuntime.jsx(
                        PasskeyFeatureBlock,
                        genericComponentOverrideContext.__assign({}, blockDetail),
                        "".concat(blockDetail.title, "-").concat(index)
                    );
                }),
            }
        )
    );
};

var WebauthnMFASignUpConfirmation = uiEntry.withOverride(
    "WebauthnMFASignUpConfirmation",
    function WebauthnMFASignUpConfirmation(props) {
        var _this = this;
        var t = translationContext.useTranslation();
        var _a = React__namespace.useState(false),
            isLoading = _a[0],
            setIsLoading = _a[1];
        var onClick = React__namespace.useCallback(
            function () {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                setIsLoading(true);
                                return [4 /*yield*/, props.onSignUp()];
                            case 1:
                                _a.sent();
                                setIsLoading(false);
                                return [2 /*return*/];
                        }
                    });
                });
            },
            [props.onSignUp]
        );
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                props.onBackButtonClicked
                    ? jsxRuntime.jsxs(
                          "div",
                          genericComponentOverrideContext.__assign(
                              { "data-supertokens": "headerTitle withBackButton webauthn-mfa" },
                              {
                                  children: [
                                      jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked }),
                                      t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE"),
                                      jsxRuntime.jsx("span", {
                                          "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                      }),
                                  ],
                              }
                          )
                      )
                    : jsxRuntime.jsx(
                          "div",
                          genericComponentOverrideContext.__assign(
                              { "data-supertokens": "headerTitle webauthn-mfa" },
                              { children: t("WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE") }
                          )
                      ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "passkeyConfirmationContainer" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "passkeyConfirmationEmailContainer" },
                                        {
                                            children: [
                                                jsxRuntime.jsx(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        { "data-supertokens": "continueWithLabel" },
                                                        { children: t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT") }
                                                    )
                                                ),
                                                jsxRuntime.jsx(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        { "data-supertokens": "enteredEmailId" },
                                                        { children: props.email }
                                                    )
                                                ),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(PasskeyFeatureBlockList, {}),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "passkeyConfirmationFooter" },
                                        {
                                            children: jsxRuntime.jsx(button.Button, {
                                                disabled: isLoading,
                                                isLoading: isLoading,
                                                type: "button",
                                                onClick: onClick,
                                                label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                                                isGreyedOut: false,
                                            }),
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx(WebauthnMFAFooter, genericComponentOverrideContext.__assign({}, props)),
            ],
        });
    }
);

var MFAScreens;
(function (MFAScreens) {
    MFAScreens[(MFAScreens["SignIn"] = 0)] = "SignIn";
    MFAScreens[(MFAScreens["SignUp"] = 1)] = "SignUp";
    MFAScreens[(MFAScreens["SignUpConfirmation"] = 2)] = "SignUpConfirmation";
})(MFAScreens || (MFAScreens = {}));
function MFAThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle] },
                        { children: jsxRuntime.jsx(MFATheme, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}
function MFATheme(props) {
    var t = translationContext.useTranslation();
    if (!props.featureState.loaded) {
        return jsxRuntime.jsx(WebauthnMFALoadingScreen, {});
    }
    if (props.featureState.accessDenied) {
        return jsxRuntime.jsx(sessionprebuiltui.AccessDeniedScreen, {
            useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */,
            error: t(props.featureState.error),
        });
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container webauthn-mfa" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    MFAThemeRouter,
                                    genericComponentOverrideContext.__assign({}, props)
                                ),
                            }
                        )
                    ),
                    jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                ],
            }
        )
    );
}
function MFAThemeRouter(props) {
    var _this = this;
    var onBackButtonClicked = props.onBackButtonClicked,
        onSignIn = props.onSignIn;
    var _a = React__namespace.useState(function () {
            if (!props.featureState.hasRegisteredPassKey) {
                return props.featureState.email ? MFAScreens.SignUpConfirmation : MFAScreens.SignUp;
            }
            return MFAScreens.SignIn;
        }),
        activeScreen = _a[0],
        setActiveScreen = _a[1];
    var _b = React__namespace.useState(""),
        email = _b[0],
        setEmail = _b[1];
    var signUpEmail = props.featureState.email || email;
    var onSignUpContinue = React__namespace.useCallback(
        function (email) {
            if (!props.featureState.canRegisterPasskey) {
                return;
            }
            setActiveScreen(MFAScreens.SignUpConfirmation);
            setEmail(email);
        },
        [props.featureState.canRegisterPasskey]
    );
    var onRegisterPasskeyClick = React__namespace.useCallback(
        function () {
            if (!props.featureState.canRegisterPasskey) {
                return;
            }
            if (props.featureState.email) {
                setActiveScreen(MFAScreens.SignUpConfirmation);
            } else {
                setActiveScreen(MFAScreens.SignUp);
            }
        },
        [props.featureState.email, props.featureState.canRegisterPasskey]
    );
    var clearError = React__namespace.useCallback(
        function () {
            props.dispatch({ type: "setError", error: undefined });
        },
        [props]
    );
    var onError = React__namespace.useCallback(
        function (error) {
            props.dispatch({ type: "setError", error: error });
        },
        [props]
    );
    var onClickSignUpConfirmationBackButton = React__namespace.useCallback(
        function () {
            if (!props.featureState.email) {
                setActiveScreen(MFAScreens.SignUp);
                return;
            }
            if (!props.featureState.hasRegisteredPassKey && !props.featureState.showBackButton) {
                return;
            }
            if (!props.featureState.hasRegisteredPassKey) {
                onBackButtonClicked();
                return;
            }
            setActiveScreen(MFAScreens.SignIn);
        },
        [
            props.featureState.email,
            props.featureState.hasRegisteredPassKey,
            props.featureState.showBackButton,
            onBackButtonClicked,
        ]
    );
    var showBackButtonOnSignUpConfirmation = React__namespace.useMemo(
        function () {
            return email !== "" || props.featureState.hasRegisteredPassKey || props.featureState.showBackButton;
        },
        [email, props.featureState.hasRegisteredPassKey, props.featureState.showBackButton]
    );
    var onSignUp = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, props.onSignUp(signUpEmail)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.onSignUp, signUpEmail]
    );
    var onFetchError = React__namespace.useCallback(
        function () {
            onError("SOMETHING_WENT_WRONG_ERROR");
        },
        [onError]
    );
    var onClickSignUpBackButton = React__namespace.useCallback(
        function () {
            if (!props.featureState.hasRegisteredPassKey && !props.featureState.showBackButton) {
                return;
            }
            if (!props.featureState.hasRegisteredPassKey) {
                onBackButtonClicked();
                return;
            }
            setActiveScreen(MFAScreens.SignIn);
        },
        [props.featureState.hasRegisteredPassKey, props.featureState.showBackButton, onBackButtonClicked]
    );
    var showBackButtonOnSignUp = React__namespace.useMemo(
        function () {
            return props.featureState.hasRegisteredPassKey || props.featureState.showBackButton;
        },
        [props.featureState.email, props.featureState.showBackButton]
    );
    if (activeScreen === MFAScreens.SignUp) {
        return jsxRuntime.jsx(WebauthnMFASignUp, {
            clearError: clearError,
            onError: onError,
            onFetchError: onFetchError,
            error: props.featureState.error,
            onContinueClick: onSignUpContinue,
            email: email,
            onRecoverAccountClick: props.onRecoverAccountClick,
            onBackButtonClicked: showBackButtonOnSignUp ? onClickSignUpBackButton : undefined,
            onSignOutClicked: props.onSignOutClicked,
        });
    }
    if (activeScreen === MFAScreens.SignUpConfirmation) {
        return jsxRuntime.jsx(WebauthnMFASignUpConfirmation, {
            onSignUp: onSignUp,
            onBackButtonClicked: showBackButtonOnSignUpConfirmation ? onClickSignUpConfirmationBackButton : undefined,
            email: signUpEmail,
            error: props.featureState.error,
            onSignOutClicked: props.onSignOutClicked,
        });
    }
    return jsxRuntime.jsx(WebauthnMFASignIn, {
        onBackButtonClicked: props.featureState.showBackButton ? onBackButtonClicked : undefined,
        canRegisterPasskey: props.featureState.canRegisterPasskey,
        onSignIn: onSignIn,
        error: props.featureState.error,
        deviceSupported: props.featureState.deviceSupported,
        onRegisterPasskeyClick: onRegisterPasskeyClick,
        onSignOutClicked: props.onSignOutClicked,
    });
}

var defaultTranslationsWebauthn = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, genericComponentOverrideContext.defaultTranslationsCommon.en),
        {
            WEBAUTHN_EMAIL_CONTINUE_BUTTON: "CONTINUE",
            WEBAUTHN_SIGN_UP_LABEL: "Email",
            WEBAUTHN_RECOVER_ACCOUNT_LABEL: "Recover Account",
            WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL: "We will send you an email to recover your account.",
            WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON: "Continue without passkey",
            WEBAUTHN_CREATE_A_PASSKEY_HEADER: "Create a passkey",
            WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT: "Continue with",
            WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON: "CONTINUE WITH PASSKEY",
            WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD: "No need to remember password",
            WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL:
                "With passkey, you can use things like your face or fingerprint to login.",
            WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES: "Works on all devices",
            WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL:
                "Passkey will automatically be available across all your synced devices.",
            WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER: "Keep your account safer",
            WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL: "Passkey offer state of the art phishing resistance.",
            WEBAUTHN_PASSKEY_RECOVERABLE_ERROR:
                "The request either timed out, was canceled or the device is already registered. Please try again or try using another device.",
            WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR:
                "The passkey is invalid, please try again, possibly with a different device.",
            WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL: "Go back",
            WEBAUTHN_UNRECOVERABLE_ERROR: "Something went wrong",
            WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS: "Something went wrong with your current session. please try again.",
            WEBAUTHN_EMAIL_SENT_LABEL: "Email sent",
            WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL: "Account recovery email has been sent to ",
            WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL: ", if it exists in our system.",
            WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL: "Resend or change email",
            WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL: "Account Recovery is not allowed, please contact support.",
            WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR:
                "Something went wrong while trying to send recover account token, please try again.",
            WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL: "Account recovered successfully!",
            WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR:
                "The token used for recovering the account is invalid. Please try with a different token or request a new one.",
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR:
                "The email used is invalid. Please try with a different email ID or reach out to support.",
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR: "Failed to recover account, please try again.",
            WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR:
                "Something went wrong, please refresh the page or reach out to support.",
            WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL:
                "Make sure your email is correct—we’ll use it to help you recover your account.",
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR:
                "The passkey is invalid, please try again, possibly with a different device.",
            WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR: "Failed to recover account, please try again.",
            WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR: "Invalid authenticator, please try again.",
            WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR: "Email already exists, please sign in instead.",
            WEBAUTHN_NOT_SUPPORTED_ERROR:
                "Passkey is not supported on your browser, please try with a different browser.",
            WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER:
                "Your browser does not support passkey flow, please try in a different browser.",
            WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR: "Please enter your email to continue.",
            // WebAuthn MFA translations
            WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE: "Use a Passkey",
            WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE:
                "To finish signing in, click the button and follow the browser instructions.",
            WEBAUTHN_MFA_DIVIDER: "or",
            WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE: "Set up a new authentication method to use for future logins.",
            WEBAUTHN_MFA_REGISTER_PASSKEY_TITLE: "Register a passkey",
            WEBAUTHN_MFA_FOOTER_LOGOUT: "Logout",
        }
    ),
};

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setError":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { loaded: true, error: action.error, accessDenied: action.accessDenied || false }
                    );
                case "load":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        {
                            loaded: true,
                            deviceSupported: action.deviceSupported,
                            email: action.email,
                            showBackButton: action.showBackButton,
                            canRegisterPasskey: action.canRegisterPasskey,
                            hasRegisteredPassKey: action.hasRegisteredPassKey,
                        }
                    );
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            deviceSupported: false,
            canRegisterPasskey: false,
            hasRegisteredPassKey: false,
            loaded: false,
            showBackButton: true,
            email: undefined,
            accessDenied: false,
        }
    );
};
function useChildProps$2(recipe, recipeImplementation, state, dispatch, userContext, navigate) {
    var _this = this;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var callSignInAPI = React__namespace.useCallback(
        function (_, __) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipeImplementation.authenticateCredentialWithSignIn({
                                    shouldTryLinkingWithSessionUser: true,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            switch (response.status) {
                                case "INVALID_CREDENTIALS_ERROR":
                                    dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR" });
                                    break;
                                case "FAILED_TO_AUTHENTICATE_USER":
                                case "INVALID_OPTIONS_ERROR":
                                    dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
                                    break;
                                case "WEBAUTHN_NOT_SUPPORTED":
                                    dispatch({ type: "setError", error: "WEBAUTHN_NOT_SUPPORTED_ERROR" });
                                    break;
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        [recipeImplementation, userContext]
    );
    var callSignUpAPI = React__namespace.useCallback(
        function (email, _, __) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipeImplementation.registerCredentialWithSignUp({
                                    email: email,
                                    shouldTryLinkingWithSessionUser: true,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status !== "OK") {
                                dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
                            }
                            if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                                dispatch({ type: "setError", error: "WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR" });
                            }
                            if (response.status === "WEBAUTHN_NOT_SUPPORTED") {
                                dispatch({ type: "setError", error: "WEBAUTHN_NOT_SUPPORTED_ERROR" });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        [state]
    );
    var onSuccess = React__namespace.useCallback(
        function () {
            var redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
            return types.Session.getInstanceOrThrow()
                .validateGlobalClaimsAndHandleSuccessRedirection(
                    undefined,
                    recipe.recipeID,
                    redirectToPath,
                    userContext,
                    navigate
                )
                .catch(rethrowInRender);
        },
        [recipe, userContext, navigate]
    );
    return React__namespace.useMemo(
        function () {
            return {
                onSignIn: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var fieldUpdates, _a, result, generalError, fetchError;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    fieldUpdates = [];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [
                                        4 /*yield*/,
                                        genericComponentOverrideContext.handleCallAPI({
                                            apiFields: [],
                                            fieldUpdates: fieldUpdates,
                                            callAPI: callSignInAPI,
                                        }),
                                    ];
                                case 2:
                                    (_a = _b.sent()),
                                        (result = _a.result),
                                        (generalError = _a.generalError),
                                        (fetchError = _a.fetchError);
                                    if (generalError !== undefined) {
                                        dispatch({ type: "setError", error: generalError.message });
                                    } else if (fetchError !== undefined) {
                                        dispatch({ type: "setError", error: "Failed to fetch from upstream" });
                                    } else if (result.status === "OK") {
                                        dispatch({ type: "setError", error: undefined });
                                        void onSuccess();
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    _b.sent();
                                    dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                                    return [3 /*break*/, 4];
                                case 4:
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSignUp: function (email) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var fieldUpdates, _a, result, generalError, fetchError, e_2;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    fieldUpdates = [];
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [
                                        4 /*yield*/,
                                        genericComponentOverrideContext.handleCallAPI({
                                            apiFields: [],
                                            fieldUpdates: fieldUpdates,
                                            callAPI: function () {
                                                var params = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    params[_i] = arguments[_i];
                                                }
                                                return callSignUpAPI.apply(
                                                    void 0,
                                                    genericComponentOverrideContext.__spreadArray(
                                                        [email],
                                                        params,
                                                        false
                                                    )
                                                );
                                            },
                                        }),
                                    ];
                                case 2:
                                    (_a = _b.sent()),
                                        (result = _a.result),
                                        (generalError = _a.generalError),
                                        (fetchError = _a.fetchError);
                                    if (generalError !== undefined) {
                                        dispatch({ type: "setError", error: generalError.message });
                                    } else if (fetchError !== undefined) {
                                        dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
                                    } else if (
                                        (result === null || result === void 0 ? void 0 : result.status) === "OK"
                                    ) {
                                        dispatch({ type: "setError", error: undefined });
                                        void onSuccess();
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _b.sent();
                                    dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                                    console.error("error", e_2);
                                    return [3 /*break*/, 4];
                                case 4:
                                    return [2 /*return*/];
                            }
                        });
                    });
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
                                        uiEntry.redirectToAuth({ redirectBack: false, navigate: navigate }),
                                    ];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onBackButtonClicked: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            // If we don't have navigate available this would mean we are using react-router-dom, so we use window's history
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
                        });
                    });
                },
                onRecoverAccountClick: function () {
                    void recipe.redirect(
                        { action: "SEND_RECOVERY_EMAIL", tenantIdFromQueryParams: "" },
                        navigate,
                        {},
                        userContext
                    );
                },
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [recipeImplementation, state, recipe, userContext, navigate]
    );
}
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
                            defaultStore: defaultTranslationsWebauthn,
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
var MFAFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps$2(
        props.recipe,
        props.recipe.webJSRecipe,
        state,
        dispatch,
        userContext,
        props.navigate
    );
    useOnLoad(props, props.recipe.webJSRecipe, dispatch, userContext);
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
function useOnLoad(props, recipeImplementation, dispatch, userContext) {
    var _this = this;
    var fetchMFAInfo = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
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
            dispatch({ type: "setError", accessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" });
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
                    redirectToPath,
                    showBackButton,
                    mfaInfoEmails,
                    email,
                    canRegisterPasskey,
                    hasRegisteredPassKey,
                    browserSupportsWebauthnResponse,
                    deviceSupported;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            error = undefined;
                            errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
                            doSetup = genericComponentOverrideContext.getQueryParams("setup");
                            stepUp = genericComponentOverrideContext.getQueryParams("stepUp");
                            if (errorQueryParam !== null) {
                                error = "SOMETHING_WENT_WRONG_ERROR";
                            }
                            if (!(mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true"))
                                return [3 /*break*/, 4];
                            redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
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
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _b.sent();
                            // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                            // we fall back to showing the something went wrong error
                            dispatch({
                                type: "setError",
                                accessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [2 /*return*/];
                        case 4:
                            showBackButton =
                                mfaInfo.factors.next.length === 0 ||
                                recipe.getAvailableFactors(
                                    mfaInfo.factors,
                                    undefined,
                                    recipe.MultiFactorAuth.getInstanceOrThrow(),
                                    userContext
                                ).length !== 1;
                            mfaInfoEmails = mfaInfo.emails[types.FactorIds.WEBAUTHN];
                            email = mfaInfoEmails ? mfaInfoEmails[0] : undefined;
                            canRegisterPasskey = mfaInfo.factors.allowedToSetup.includes(types.FactorIds.WEBAUTHN);
                            hasRegisteredPassKey = mfaInfo.factors.alreadySetup.includes(types.FactorIds.WEBAUTHN);
                            if (!hasRegisteredPassKey && !canRegisterPasskey) {
                                dispatch({
                                    type: "setError",
                                    accessDenied: true,
                                    error: "SOMETHING_WENT_WRONG_ERROR",
                                });
                            }
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            browserSupportsWebauthnResponse = _b.sent();
                            deviceSupported =
                                browserSupportsWebauthnResponse.status === "OK" &&
                                (browserSupportsWebauthnResponse === null || browserSupportsWebauthnResponse === void 0
                                    ? void 0
                                    : browserSupportsWebauthnResponse.browserSupportsWebauthn);
                            dispatch({
                                type: "load",
                                canRegisterPasskey: canRegisterPasskey,
                                hasRegisteredPassKey: hasRegisteredPassKey,
                                error: error,
                                showBackButton: showBackButton,
                                email: email,
                                deviceSupported: deviceSupported,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        [dispatch, recipeImplementation, props.recipe, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
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
var RecoverAccountScreen;
(function (RecoverAccountScreen) {
    RecoverAccountScreen[(RecoverAccountScreen["ContinueWithPasskey"] = 0)] = "ContinueWithPasskey";
    RecoverAccountScreen[(RecoverAccountScreen["Success"] = 1)] = "Success";
})(RecoverAccountScreen || (RecoverAccountScreen = {}));
var SendRecoveryEmailScreen;
(function (SendRecoveryEmailScreen) {
    SendRecoveryEmailScreen[(SendRecoveryEmailScreen["RecoverAccount"] = 0)] = "RecoverAccount";
    SendRecoveryEmailScreen[(SendRecoveryEmailScreen["RecoverEmailSent"] = 1)] = "RecoverEmailSent";
})(SendRecoveryEmailScreen || (SendRecoveryEmailScreen = {}));

var ContinueWithoutPasskey = uiEntry.withOverride(
    "WebauthnContinueWithoutPasskey",
    function ContinueWithoutPasskeyButton(props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsx(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "continueWithoutPasskey" },
                {
                    children: jsxRuntime.jsx(
                        "a",
                        genericComponentOverrideContext.__assign(
                            {
                                onClick: props.onClick,
                                "data-supertokens": "formLabelLinkBtn continueWithoutPasskeyLabel",
                            },
                            { children: t("WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON") }
                        )
                    ),
                }
            )
        );
    }
);

var PasskeyConfirmation = uiEntry.withOverride("WebauthnPasskeyConfirmation", function PasskeyConfirmation(props) {
    var t = translationContext.useTranslation();
    var showContinueWithoutPasskey = React.useMemo(
        function () {
            return props.hideContinueWithoutPasskey !== true && props.showBackButton === true;
        },
        [props]
    );
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyConfirmationContainer" },
            {
                children: [
                    props.email !== undefined &&
                        jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "passkeyConfirmationEmailContainer" },
                                {
                                    children: [
                                        jsxRuntime.jsx(
                                            "div",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "continueWithLabel" },
                                                { children: t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT") }
                                            )
                                        ),
                                        jsxRuntime.jsx(
                                            "div",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "enteredEmailId" },
                                                { children: props.email }
                                            )
                                        ),
                                    ],
                                }
                            )
                        ),
                    jsxRuntime.jsx(PasskeyFeatureBlockList, {}),
                    props.errorMessageLabel !== undefined &&
                        props.errorMessageLabel !== "" &&
                        jsxRuntime.jsx(uiEntry.GeneralError, { error: props.errorMessageLabel }),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "passkeyConfirmationFooter" },
                            {
                                children: [
                                    jsxRuntime.jsx(button.Button, {
                                        disabled: props.isContinueDisabled || !props.isPasskeySupported,
                                        isLoading: props.isLoading,
                                        type: "button",
                                        onClick: props.onContinueClick,
                                        label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                                        isGreyedOut: !props.isPasskeySupported,
                                    }),
                                    !props.isPasskeySupported && jsxRuntime.jsx(PasskeyNotSupportedError, {}),
                                    showContinueWithoutPasskey &&
                                        props.resetFactorList !== undefined &&
                                        jsxRuntime.jsx(ContinueWithoutPasskey, { onClick: props.resetFactorList }),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
});

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function RecoverySuccessIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M7.08 9.72L5.4 11.4L10.8 16.8L22.8 4.8L21.12 3.12L10.8 13.44L7.08 9.72ZM21.6 12C21.6 17.28 17.28 21.6 12 21.6C6.72 21.6 2.4 17.28 2.4 12C2.4 6.72 6.72 2.4 12 2.4C12.96 2.4 13.8 2.52 14.64 2.76L16.56 0.84C15.12 0.36 13.56 0 12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12H21.6Z",
                    fill: "#40A700",
                }),
            }
        )
    );
}

var PasskeyRecoverAccountSuccess = function () {
    var t = translationContext.useTranslation();
    var onContinueClick = function () {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, uiEntry.redirectToAuth({ show: "signin" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyRecoverAccountSuccessContainer" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "header" },
                            {
                                children: [
                                    jsxRuntime.jsx(RecoverySuccessIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "headerText" },
                                            { children: t("WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL") }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                    jsxRuntime.jsx(button.Button, {
                        disabled: false,
                        isLoading: false,
                        type: "button",
                        onClick: onContinueClick,
                        label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                    }),
                ],
            }
        )
    );
};

function PasskeyRecoverAccountWithTokenTheme(props) {
    var _this = this;
    var stInstance = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var userContext = uiEntry.useUserContext();
    var activeStyle = props.config.signInAndUpFeature.style;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    var onResetFactorList = function () {
        throw new Error("Should never come here as we don't have back functionality");
    };
    var _a = React.useState(false),
        isPasskeySupported = _a[0],
        setIsPasskeySupported = _a[1];
    React.useEffect(
        function () {
            void (function () {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipeImplementation]
    );
    // Render the inner content based on the active screen
    var renderInnerContent = function () {
        var _a;
        if (props.activeScreen === RecoverAccountScreen.ContinueWithPasskey) {
            return jsxRuntime.jsx(
                PasskeyConfirmation,
                genericComponentOverrideContext.__assign({}, props, {
                    email:
                        ((_a = props.registerOptions) === null || _a === void 0 ? void 0 : _a.user.name) || undefined,
                    onContinueClick: props.onContinueClick,
                    errorMessageLabel: props.errorMessageLabel || undefined,
                    isLoading: props.isLoading,
                    hideContinueWithoutPasskey: true,
                    isContinueDisabled: props.registerOptions === null,
                    isPasskeySupported: isPasskeySupported,
                    showBackButton: false,
                })
            );
        } else if (props.activeScreen === RecoverAccountScreen.Success) {
            return jsxRuntime.jsx(PasskeyRecoverAccountSuccess, {});
        }
        return null;
    };
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
                            children: jsxRuntime.jsxs(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "container authPage singleFactor" },
                                    {
                                        children: [
                                            jsxRuntime.jsxs(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "row" },
                                                    {
                                                        children: [
                                                            props.activeScreen !== RecoverAccountScreen.Success &&
                                                                jsxRuntime.jsx(uiEntry.AuthPageHeader, {
                                                                    factorIds: ["webauthn"],
                                                                    isSignUp: true,
                                                                    onSignInUpSwitcherClick: undefined,
                                                                    hasSeparateSignUpView: true,
                                                                    resetFactorList: onResetFactorList,
                                                                    showBackButton: false,
                                                                    oauth2ClientInfo: undefined,
                                                                    headerLabel:
                                                                        props.activeScreen ===
                                                                        RecoverAccountScreen.ContinueWithPasskey
                                                                            ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                                                            : undefined,
                                                                    hideSignInSwitcher: true,
                                                                }),
                                                            renderInnerContent(),
                                                            props.activeScreen !== RecoverAccountScreen.Success &&
                                                                jsxRuntime.jsx(uiEntry.AuthPageFooter, {
                                                                    factorIds: [],
                                                                    isSignUp: true,
                                                                    hasSeparateSignUpView: true,
                                                                    privacyPolicyLink: privacyPolicyLink,
                                                                    termsOfServiceLink: termsOfServiceLink,
                                                                }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var RecoverAccountUsingToken = function (props) {
    var token = genericComponentOverrideContext.getQueryParams("token");
    var userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React__namespace.useState(),
        error = _a[0],
        setError = _a[1];
    var _b = React.useState(null),
        errorMessageLabel = _b[0],
        setErrorMessageLabel = _b[1];
    var _c = React.useState(null),
        preloadedRegisterOptions = _c[0],
        setPreloadedRegisterOptions = _c[1];
    var _d = React.useState(RecoverAccountScreen.ContinueWithPasskey),
        activeScreen = _d[0],
        setActiveScreen = _d[1];
    var _e = React.useState(false),
        isLoading = _e[0],
        setLoading = _e[1];
    // Get the reset options as soon as the page loads and afterwards use the token
    // with the options.
    var fetchAndStoreRegisterOptions = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(token === null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, uiEntry.redirectToAuth()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "MISSING_TOKEN" }];
                        case 2:
                            return [
                                2 /*return*/,
                                props.recipe.webJSRecipe.getRegisterOptions({
                                    userContext: props.userContext,
                                    recoverAccountToken: token,
                                }),
                            ];
                    }
                });
            });
        },
        [props.recipe.webJSRecipe, props.userContext, token]
    );
    genericComponentOverrideContext.useOnMountAPICall(
        fetchAndStoreRegisterOptions,
        function (registerOptions) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (registerOptions.status === "MISSING_TOKEN") {
                        return [2 /*return*/];
                    }
                    if (registerOptions.status !== "OK") {
                        switch (registerOptions.status) {
                            case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                break;
                            case "INVALID_EMAIL_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                                break;
                            case "INVALID_OPTIONS_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                                break;
                            default:
                                throw new Error("Should never come here");
                        }
                        return [2 /*return*/];
                    }
                    setPreloadedRegisterOptions(registerOptions);
                    return [2 /*return*/];
                });
            });
        },
        function (err) {
            // This will likely be a fetch error.
            console.error("error", err);
            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR");
        }
    );
    var callAPI = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var registerOptions, _a, registerCredentialResponse, recoverAccountResponse;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // We will do the following things in the order when the user clicks on the continue
                            // button.
                            // 1. Check if the fetched register options have expired
                            // 2. If not expired, we can continue and use the values to register the user.
                            // 3. If expired, we will get new registerOptions and register the user.
                            // 4. If registration fails with a token expiry error, we should following 3rd step.
                            if (token === null) {
                                // The token should not be null because while fetching the register options
                                // we already checked for null and redirected to the sign in page if it is null.
                                throw new Error("Should never come here");
                            }
                            if (
                                !(
                                    preloadedRegisterOptions !== null &&
                                    new Date(preloadedRegisterOptions.expiresAt) > new Date()
                                )
                            )
                                return [3 /*break*/, 1];
                            _a = preloadedRegisterOptions;
                            return [3 /*break*/, 3];
                        case 1:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.getRegisterOptions({
                                    userContext: props.userContext,
                                    recoverAccountToken: token,
                                }),
                            ];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            registerOptions = _a;
                            if (registerOptions.status !== "OK") {
                                switch (registerOptions.status) {
                                    case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                        break;
                                    case "INVALID_EMAIL_ERROR":
                                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                                        break;
                                    case "INVALID_OPTIONS_ERROR":
                                        setErrorMessageLabel(
                                            "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR"
                                        );
                                        break;
                                    default:
                                        throw new Error("Should never come here");
                                }
                                return [2 /*return*/];
                            }
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.createCredential({
                                    registrationOptions: registerOptions,
                                    userContext: props.userContext,
                                }),
                            ];
                        case 4:
                            registerCredentialResponse = _b.sent();
                            if (registerCredentialResponse.status !== "OK") {
                                return [2 /*return*/, registerCredentialResponse];
                            }
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.recoverAccount({
                                    token: token,
                                    webauthnGeneratedOptionsId: registerOptions.webauthnGeneratedOptionsId,
                                    credential: registerCredentialResponse.registrationResponse,
                                    userContext: props.userContext,
                                }),
                            ];
                        case 5:
                            recoverAccountResponse = _b.sent();
                            return [2 /*return*/, recoverAccountResponse];
                    }
                });
            });
        },
        [props, preloadedRegisterOptions, token, fetchAndStoreRegisterOptions]
    );
    var onContinueClick = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var fieldUpdates, _a, result, generalError, fetchError, e_1;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fieldUpdates = [];
                            setLoading(true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.handleCallAPI({
                                    apiFields: [],
                                    fieldUpdates: fieldUpdates,
                                    callAPI: callAPI,
                                }),
                            ];
                        case 2:
                            (_a = _b.sent()),
                                (result = _a.result),
                                (generalError = _a.generalError),
                                (fetchError = _a.fetchError);
                            if (generalError !== undefined || fetchError !== undefined) {
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                            } else {
                                // If successful
                                if (result.status === "OK") {
                                    setLoading(false);
                                    setActiveScreen(RecoverAccountScreen.Success);
                                } else {
                                    switch (result.status) {
                                        case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                            break;
                                        case "GENERAL_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                                            break;
                                        case "INVALID_OPTIONS_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR"
                                            );
                                            break;
                                        case "INVALID_CREDENTIALS_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR");
                                            break;
                                        case "OPTIONS_NOT_FOUND_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR"
                                            );
                                            break;
                                        case "INVALID_AUTHENTICATOR_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR"
                                            );
                                            break;
                                        case "WEBAUTHN_NOT_SUPPORTED":
                                            setErrorMessageLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
                                            break;
                                        default:
                                            throw new Error("Should never come here");
                                    }
                                    return [2 /*return*/];
                                }
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            console.error("error", e_1);
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [callAPI]
    );
    var childProps = {
        config: props.recipe.config,
        error: error,
        onError: function (error) {
            return setError(error);
        },
        clearError: function () {
            return setError(undefined);
        },
        recipeImplementation: props.recipe.webJSRecipe,
        token: token,
        useComponentOverride: props.useComponentOverrides,
        userContext: userContext,
        registerOptions: preloadedRegisterOptions,
        errorMessageLabel: errorMessageLabel,
        isLoading: isLoading,
        activeScreen: activeScreen,
        onContinueClick: onContinueClick,
    };
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
                            defaultStore: defaultTranslationsWebauthn,
                        },
                        {
                            children: jsxRuntime.jsxs(React__namespace.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            PasskeyRecoverAccountWithTokenTheme,
                                            genericComponentOverrideContext.__assign({}, childProps)
                                        ),
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

var PasskeyRecoveryEmailSent = uiEntry.withOverride("WebauthnPasskeyRecoveryEmailSent", function (props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyEmailSentContainer" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "headerTitle" },
                            { children: t("WEBAUTHN_EMAIL_SENT_LABEL") }
                        )
                    ),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "emailSentDescription" },
                            {
                                children: [
                                    t("WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL"),
                                    props.email,
                                    t("WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL"),
                                    jsxRuntime.jsx(
                                        "a",
                                        genericComponentOverrideContext.__assign(
                                            {
                                                onClick: props.onEmailChangeClick,
                                                "data-supertokens": "link linkButton formLabelLinkBtn changeEmailBtn",
                                            },
                                            { children: t("WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL") }
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
});

var WebauthnRecoverAccountForm = uiEntry.withOverride("WebauthnRecoverAccountForm", function (props) {
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        clearError: function () {
            return props.setError(undefined);
        },
        onFetchError: function () {
            return props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
        },
        onError: function () {
            return props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
        },
        formFields: [
            {
                id: "email",
                label: "",
                labelComponent: jsxRuntime.jsx(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "formLabelWithLinkWrapper" },
                        {
                            children: jsxRuntime.jsx(formBase.Label, {
                                value: "WEBAUTHN_SIGN_UP_LABEL",
                                "data-supertokens": "emailInputLabel",
                            }),
                        }
                    )
                ),
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "email",
                // We are using the default validator that allows any string
                validate: validators.defaultEmailValidator,
            },
        ],
        buttonLabel: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var email, res;
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
                                throw new STGeneralError__default$1.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.generateRecoverAccountToken({
                                    email: email,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            res = _b.sent();
                            if (res.status === "RECOVER_ACCOUNT_NOT_ALLOWED") {
                                props.setError("WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL");
                            }
                            return [
                                2 /*return*/,
                                genericComponentOverrideContext.__assign(
                                    genericComponentOverrideContext.__assign({}, res),
                                    { email: email }
                                ),
                            ];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
    });
});
var WebauthnRecoverAccount = uiEntry.withOverride("WebauthnRecoverAccount", function (props) {
    var t = translationContext.useTranslation();
    var _a = React.useState(undefined),
        errorLabel = _a[0],
        setErrorLabel = _a[1];
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "passkeyRecoverAccountFormContainer" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "passkeyRecoverAccountFormHeaderWrapper" },
                            {
                                children: [
                                    jsxRuntime.jsxs(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            {
                                                "data-supertokens":
                                                    "passkeyRecoverAccountFormHeader headerTitle withBackButton",
                                            },
                                            {
                                                children: [
                                                    jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackClick }),
                                                    t("WEBAUTHN_RECOVER_ACCOUNT_LABEL"),
                                                    jsxRuntime.jsx("span", {
                                                        "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                                    }),
                                                ],
                                            }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "passkeyRecoverAccountFormSubHeader" },
                                            { children: t("WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL") }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                    errorLabel !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "errorContainer" },
                                { children: jsxRuntime.jsx(uiEntry.GeneralError, { error: errorLabel }) }
                            )
                        ),
                    jsxRuntime.jsx(
                        WebauthnRecoverAccountForm,
                        genericComponentOverrideContext.__assign({}, props, { setError: setErrorLabel })
                    ),
                ],
            }
        )
    );
});

var SendRecoveryEmailFormThemeInner = function (props) {
    return props.activeScreen === SendRecoveryEmailScreen.RecoverAccount
        ? jsxRuntime.jsx(WebauthnRecoverAccount, {
              onSuccess: props.onRecoverAccountFormSuccess,
              onBackClick: props.onRecoverAccountBackClick,
              recipeImplementation: props.recipeImplementation,
          })
        : props.activeScreen === SendRecoveryEmailScreen.RecoverEmailSent
        ? jsxRuntime.jsx(PasskeyRecoveryEmailSent, {
              email: props.recoverAccountEmail,
              onEmailChangeClick: props.onEmailChangeClick,
          })
        : null;
};
var SendRecoveryEmailFormTheme = function (props) {
    var stInstance = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle] },
                        {
                            children: jsxRuntime.jsxs(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "container authPage recoverAccountWithEmail" },
                                    {
                                        children: [
                                            jsxRuntime.jsxs(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "row" },
                                                    {
                                                        children: [
                                                            props.error !== undefined &&
                                                                jsxRuntime.jsx(uiEntry.GeneralError, {
                                                                    error: props.error,
                                                                }),
                                                            jsxRuntime.jsx(
                                                                SendRecoveryEmailFormThemeInner,
                                                                genericComponentOverrideContext.__assign({}, props, {
                                                                    activeScreen: props.activeScreen,
                                                                    setActiveScreen: props.setActiveScreen,
                                                                })
                                                            ),
                                                            props.activeScreen !==
                                                                SendRecoveryEmailScreen.RecoverEmailSent &&
                                                                jsxRuntime.jsx(uiEntry.AuthPageFooter, {
                                                                    factorIds: [],
                                                                    isSignUp: true,
                                                                    hasSeparateSignUpView: true,
                                                                    privacyPolicyLink: privacyPolicyLink,
                                                                    termsOfServiceLink: termsOfServiceLink,
                                                                }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};

var SendRecoveryEmailForm = function (props) {
    var userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React__namespace.useState(),
        error = _a[0],
        setError = _a[1];
    var _b = React__namespace.useState(""),
        recoverAccountEmail = _b[0],
        setRecoverAccountEmail = _b[1];
    var _c = React__namespace.useState(SendRecoveryEmailScreen.RecoverAccount),
        activeScreen = _c[0],
        setActiveScreen = _c[1];
    var onRecoverAccountFormSuccess = function (result) {
        setRecoverAccountEmail(result.email);
        setActiveScreen(SendRecoveryEmailScreen.RecoverEmailSent);
    };
    var onRecoverAccountBackClick = function () {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, uiEntry.redirectToAuth({ show: "signup" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var onEmailChangeClick = function () {
        setActiveScreen(SendRecoveryEmailScreen.RecoverAccount);
    };
    var childProps = {
        config: props.recipe.config,
        error: error,
        onError: function (error) {
            return setError(error);
        },
        clearError: function () {
            return setError(undefined);
        },
        recipeImplementation: props.recipe.webJSRecipe,
        useComponentOverride: props.useComponentOverrides,
        userContext: userContext,
        recoverAccountEmail: recoverAccountEmail,
        activeScreen: activeScreen,
        onRecoverAccountFormSuccess: onRecoverAccountFormSuccess,
        onRecoverAccountBackClick: onRecoverAccountBackClick,
        onEmailChangeClick: onEmailChangeClick,
        setActiveScreen: setActiveScreen,
    };
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
                            defaultStore: defaultTranslationsWebauthn,
                        },
                        {
                            children: jsxRuntime.jsxs(React__namespace.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SendRecoveryEmailFormTheme,
                                            genericComponentOverrideContext.__assign({}, childProps)
                                        ),
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

var ContinueWithPasskey = function (_a) {
    var continueWithPasskeyClicked = _a.continueWithPasskeyClicked,
        isLoading = _a.isLoading,
        isPasskeySupported = _a.isPasskeySupported;
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "continueWithPasskeyButtonWrapper" },
            {
                children: [
                    jsxRuntime.jsx(button.Button, {
                        isLoading: isLoading,
                        onClick: function () {
                            continueWithPasskeyClicked();
                        },
                        type: "button",
                        label: "WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON",
                        disabled: !isPasskeySupported,
                        isGreyedOut: !isPasskeySupported,
                        icon: componentOverrideContext.PasskeyIcon,
                    }),
                    !isPasskeySupported && jsxRuntime.jsx(PasskeyNotSupportedError, {}),
                ],
            }
        )
    );
};
var ContinueWithPasskeyWithOverride = uiEntry.withOverride("WebauthnContinueWithPasskey", ContinueWithPasskey);
var ContinueWithPasskeyTheme = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle] },
            {
                children: jsxRuntime.jsx(
                    ContinueWithPasskeyWithOverride,
                    genericComponentOverrideContext.__assign({}, props)
                ),
            }
        )
    );
};

function PasskeySignInTheme(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    var _a = React__namespace.useState(null),
        error = _a[0],
        setError = _a[1];
    var _b = React__namespace.useState(false),
        isLoading = _b[0],
        setIsLoading = _b[1];
    var callAPI = React__namespace.useCallback(
        function (_, __) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.authenticateCredentialWithSignIn({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            switch (response.status) {
                                case "INVALID_CREDENTIALS_ERROR":
                                    setError("WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR");
                                    break;
                                case "FAILED_TO_AUTHENTICATE_USER":
                                case "INVALID_OPTIONS_ERROR":
                                    setError("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                                    break;
                                case "WEBAUTHN_NOT_SUPPORTED":
                                    setError("WEBAUTHN_NOT_SUPPORTED_ERROR");
                                    break;
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        [props, userContext]
    );
    // Define the code to handle sign in properly through this component.
    var handleWebauthnSignInClick = function () {
        return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
            var fieldUpdates, _a, result, generalError, fetchError;
            return genericComponentOverrideContext.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fieldUpdates = [];
                        setIsLoading(true);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [
                            4 /*yield*/,
                            genericComponentOverrideContext.handleCallAPI({
                                apiFields: [],
                                fieldUpdates: fieldUpdates,
                                callAPI: callAPI,
                            }),
                        ];
                    case 2:
                        (_a = _b.sent()),
                            (result = _a.result),
                            (generalError = _a.generalError),
                            (fetchError = _a.fetchError);
                        if (generalError !== undefined) {
                            setError(generalError.message);
                        } else if (fetchError !== undefined) {
                            setError("Failed to fetch from upstream");
                        } else {
                            // If successful
                            if (result.status === "OK") {
                                if (setIsLoading) {
                                    setIsLoading(false);
                                }
                                setError(null);
                                if (props.onSuccess !== undefined) {
                                    props.onSuccess(result);
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        _b.sent();
                        setError("SOMETHING_WENT_WRONG_ERROR");
                        return [3 /*break*/, 5];
                    case 4:
                        if (setIsLoading) {
                            setIsLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 5:
                        return [2 /*return*/];
                }
            });
        });
    };
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInAndUpFeature.style;
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
                            children: jsxRuntime.jsxs(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "passkeySignInContainer" },
                                    {
                                        children: [
                                            error !== "" &&
                                                error !== null &&
                                                jsxRuntime.jsx(uiEntry.GeneralError, { error: error }),
                                            jsxRuntime.jsx(
                                                ContinueWithPasskeyTheme,
                                                genericComponentOverrideContext.__assign({}, props, {
                                                    continueWithPasskeyClicked: handleWebauthnSignInClick,
                                                    config: props.config,
                                                    continueTo: "SIGN_IN",
                                                    isLoading: isLoading,
                                                    isPasskeySupported: props.isPasskeySupported,
                                                })
                                            ),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

function useChildProps$1(
    recipe,
    factorIds,
    onAuthSuccess,
    error,
    onError,
    userContext,
    clearError,
    resetFactorList,
    onSignInUpSwitcherClick,
    showBackButton,
    isPasskeySupported
) {
    var _this = this;
    var session$1 = session.useSessionContext();
    var recipeImplementation = recipe.webJSRecipe;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React__namespace.useMemo(
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
                                            recipeId: "webauthn",
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                error: error,
                onError: onError,
                clearError: clearError,
                onFetchError: function (/* err: Response*/) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            onError("SOMETHING_WENT_WRONG_ERROR");
                            return [2 /*return*/];
                        });
                    });
                },
                factorIds: factorIds,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                resetFactorList: resetFactorList,
                onSignInUpSwitcherClick: onSignInUpSwitcherClick,
                isPasskeySupported: isPasskeySupported,
                showBackButton: showBackButton,
            };
        },
        [error, factorIds, userContext, isPasskeySupported, showBackButton, recipeImplementation]
    );
}
var SignInFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(true),
        isPasskeySupported = _a[0],
        setIsPasskeySupported = _a[1];
    React.useEffect(
        function () {
            void (function () {
                return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipe.webJSRecipe]
    );
    var childProps = useChildProps$1(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        userContext,
        props.clearError,
        props.resetFactorList,
        props.onSignInUpSwitcherClick,
        props.showBackButton,
        isPasskeySupported
    );
    return jsxRuntime.jsxs(React__namespace.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(PasskeySignInTheme, genericComponentOverrideContext.__assign({}, childProps)),
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
var SignInWithPasskeyFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(SignInFeatureInner, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function SomethingWentWrongIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "35", height: "32", viewBox: "0 0 35 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M16.95 0.04C16.43 0.16 15.98 0.41 15.61 0.79C15.36 1.05 15.21 1.28 14.88 1.89C14.84 1.97 14.79 2.05 14.78 2.06C14.76 2.1 14.72 2.16 14.53 2.5C14.49 2.59 14.4 2.74 14.33 2.86C14.26 2.97 14.21 3.07 14.21 3.08C14.21 3.08 14.12 3.25 14 3.46C13.88 3.66 13.75 3.89 13.71 3.97C13.67 4.05 13.59 4.19 13.54 4.28C13.43 4.46 13.35 4.6 13.24 4.82C13.19 4.9 13.1 5.06 13.04 5.17C12.97 5.29 12.91 5.38 12.91 5.39C12.91 5.39 12.82 5.56 12.7 5.77C12.59 5.97 12.46 6.2 12.41 6.28C12.37 6.36 12.29 6.5 12.24 6.59C12.19 6.68 12.12 6.8 12.09 6.86C11.85 7.29 10.93 8.93 10.37 9.93C9.99 10.61 9.64 11.22 9.6 11.3C9.56 11.38 9.45 11.57 9.36 11.73C9.28 11.88 9.18 12.06 9.14 12.12C9.11 12.18 7.12 15.73 4.72 20C2.33 24.28 0.32 27.86 0.27 27.97C0.16 28.2 0.08 28.43 0.03 28.64C-0.01 28.83 -0.01 29.62 0.03 29.81C0.27 30.91 1.13 31.75 2.21 31.96C2.48 32.01 32.51 32.01 32.79 31.96C33.76 31.77 34.56 31.07 34.88 30.12C34.98 29.83 35 29.67 35 29.23C35 28.67 34.95 28.42 34.73 27.97C34.68 27.86 31.93 22.96 28.63 17.07C25.33 11.18 22.6 6.31 22.57 6.25C22.53 6.19 22.41 5.97 22.3 5.77C22.18 5.57 22.09 5.4 22.09 5.39C22.09 5.38 22.03 5.29 21.96 5.17C21.9 5.06 21.81 4.9 21.76 4.82C21.72 4.74 21.59 4.51 21.47 4.3C21.36 4.1 21.26 3.93 21.26 3.92C21.26 3.92 21.19 3.78 21.1 3.62C21 3.47 20.88 3.25 20.83 3.16C20.49 2.52 19.72 1.19 19.61 1.05C19.23 0.54 18.67 0.18 18.03 0.04C17.77 -0.01 17.21 -0.01 16.95 0.04ZM19.32 6C20.29 7.73 21.12 9.21 21.15 9.28C21.19 9.34 21.3 9.54 21.39 9.71C21.49 9.88 21.61 10.08 21.65 10.16C21.69 10.24 22.15 11.05 22.65 11.96C23.16 12.86 23.61 13.66 23.65 13.73C23.74 13.89 24.07 14.48 24.14 14.61C24.17 14.66 24.24 14.78 24.29 14.87C24.34 14.96 24.42 15.1 24.46 15.18C24.6 15.44 24.67 15.55 24.82 15.81C24.9 15.95 24.96 16.07 24.96 16.08C24.96 16.08 25.02 16.18 25.09 16.29C25.15 16.41 25.24 16.57 25.29 16.65C25.4 16.86 25.48 17 25.59 17.19C25.64 17.28 25.72 17.42 25.76 17.5C25.8 17.58 25.87 17.7 25.91 17.77C25.95 17.84 25.99 17.92 26.01 17.94C26.02 17.95 26.07 18.03 26.11 18.11C26.15 18.2 26.22 18.31 26.25 18.38C26.29 18.44 26.37 18.58 26.43 18.7C26.5 18.82 26.58 18.96 26.61 19.02C26.64 19.08 26.7 19.17 26.73 19.23C26.76 19.29 26.84 19.43 26.91 19.55C26.97 19.66 27.05 19.8 27.08 19.86C27.11 19.91 27.19 20.05 27.26 20.17C27.32 20.28 27.4 20.43 27.43 20.49C27.47 20.54 27.52 20.64 27.55 20.7C27.59 20.76 27.67 20.9 27.73 21.01C27.8 21.13 27.87 21.27 27.91 21.32C27.94 21.38 28.01 21.52 28.08 21.63C28.14 21.75 28.22 21.89 28.26 21.95C28.29 22.01 28.34 22.11 28.38 22.16C28.41 22.22 28.49 22.36 28.55 22.48C28.62 22.6 28.7 22.74 28.73 22.79C28.76 22.84 28.86 23.04 28.96 23.21C29.06 23.39 29.17 23.58 29.2 23.64C29.23 23.69 29.31 23.83 29.38 23.95C29.44 24.06 29.52 24.21 29.56 24.27C29.59 24.34 29.66 24.45 29.7 24.53C29.74 24.62 29.79 24.7 29.8 24.71C29.82 24.73 29.86 24.8 29.9 24.88C29.94 24.95 30.01 25.07 30.05 25.15C30.09 25.23 30.17 25.37 30.22 25.46C30.33 25.65 30.41 25.79 30.52 26C30.57 26.08 30.66 26.24 30.73 26.35C30.79 26.47 30.85 26.57 30.85 26.57C30.85 26.58 30.91 26.7 30.99 26.84C31.14 27.1 31.21 27.21 31.35 27.47C31.39 27.55 31.47 27.68 31.52 27.78C31.57 27.87 31.64 27.98 31.67 28.04C31.82 28.31 32.1 28.8 32.17 28.93C32.21 29.01 32.26 29.1 32.28 29.12C32.29 29.14 32.3 29.17 32.29 29.19C32.26 29.24 2.74 29.24 2.71 29.19C2.7 29.17 2.71 29.14 2.72 29.12C2.74 29.1 2.79 29.01 2.83 28.93C2.87 28.85 2.94 28.74 2.97 28.67C3.01 28.61 3.09 28.46 3.16 28.35C3.34 28.02 3.38 27.95 3.48 27.78C3.53 27.68 3.61 27.55 3.65 27.47C3.78 27.24 3.85 27.11 3.95 26.93C4 26.84 4.08 26.7 4.13 26.62C4.17 26.54 4.24 26.41 4.28 26.34C4.32 26.27 4.36 26.2 4.37 26.18C4.39 26.16 4.43 26.08 4.48 26C4.52 25.92 4.58 25.8 4.62 25.74C4.65 25.68 4.74 25.53 4.8 25.41C4.87 25.3 4.95 25.15 4.98 25.09C5.02 25.03 5.08 24.91 5.13 24.83C5.17 24.75 5.25 24.61 5.3 24.52C5.4 24.34 5.44 24.27 5.62 23.95C5.69 23.83 5.77 23.68 5.81 23.62C5.84 23.56 5.9 23.44 5.95 23.36C5.99 23.28 6.07 23.14 6.12 23.05C6.23 22.86 6.26 22.81 6.51 22.37C6.61 22.19 6.72 21.99 6.75 21.94C6.78 21.89 6.85 21.75 6.92 21.63C6.99 21.52 7.06 21.38 7.09 21.32C7.12 21.27 7.23 21.08 7.33 20.9C7.43 20.72 7.54 20.53 7.57 20.48C7.6 20.42 7.68 20.28 7.74 20.17C7.81 20.05 7.89 19.9 7.92 19.84C7.96 19.78 8.02 19.66 8.07 19.58C8.11 19.5 8.16 19.42 8.17 19.4C8.18 19.38 8.23 19.31 8.27 19.24C8.3 19.17 8.37 19.04 8.42 18.96C8.46 18.88 8.54 18.74 8.59 18.65C8.7 18.47 8.77 18.33 8.89 18.11C8.93 18.03 9.02 17.87 9.09 17.76C9.16 17.65 9.21 17.55 9.21 17.54C9.21 17.54 9.28 17.42 9.36 17.28C9.51 17.01 9.58 16.89 9.71 16.65C9.76 16.57 9.85 16.41 9.91 16.29C9.98 16.18 10.04 16.08 10.04 16.08C10.04 16.07 10.13 15.9 10.25 15.7C10.36 15.49 10.49 15.26 10.53 15.18C10.58 15.1 10.66 14.96 10.71 14.87C10.81 14.7 10.88 14.58 10.99 14.37C11.02 14.31 11.11 14.15 11.18 14.02C11.26 13.9 11.34 13.74 11.38 13.68C11.41 13.61 12.79 11.14 14.45 8.2C16.34 4.82 17.47 2.83 17.5 2.83C17.53 2.83 18.21 4.02 19.32 6ZM17.12 10.24C16.4 10.41 15.86 10.95 15.68 11.7C15.61 12.01 15.61 12.06 15.76 13.73C15.78 13.93 15.8 14.28 15.82 14.51C15.84 14.75 15.87 15.08 15.89 15.26C15.9 15.44 15.93 15.78 15.95 16.01C15.97 16.25 16 16.58 16.01 16.76C16.03 16.94 16.07 17.35 16.09 17.67C16.12 18 16.15 18.42 16.17 18.6C16.19 18.79 16.22 19.14 16.23 19.37C16.25 19.6 16.28 19.93 16.3 20.1C16.31 20.27 16.34 20.62 16.36 20.88C16.38 21.14 16.42 21.44 16.44 21.55C16.53 21.92 16.83 22.24 17.2 22.37C17.55 22.49 18.01 22.36 18.3 22.06C18.55 21.78 18.57 21.68 18.67 20.46C18.69 20.25 18.72 19.92 18.73 19.72C18.75 19.52 18.78 19.19 18.8 18.99C18.81 18.78 18.84 18.45 18.86 18.24C18.87 18.04 18.91 17.61 18.94 17.3C18.99 16.75 19.02 16.41 19.08 15.61C19.1 15.41 19.13 15.08 19.14 14.87C19.16 14.67 19.19 14.32 19.21 14.11C19.38 12.07 19.38 12.04 19.33 11.76C19.23 11.28 18.98 10.86 18.63 10.6C18.18 10.26 17.63 10.13 17.12 10.24ZM17.18 23.02C16.65 23.14 16.22 23.53 16.04 24.06C15.95 24.33 15.95 24.8 16.04 25.07C16.21 25.56 16.58 25.93 17.06 26.09C17.3 26.16 17.75 26.16 17.97 26.07C18.64 25.83 19.03 25.27 19.03 24.57C19.03 23.8 18.54 23.18 17.81 23.02C17.57 22.96 17.42 22.96 17.18 23.02Z",
                    fill: "#ED344E",
                }),
            }
        )
    );
}

var SignUpSomethingWentWrong = uiEntry.withOverride(
    "WebauthnPasskeySignUpSomethingWentWrong",
    function SomethingWentWrong(props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "somethingWentWrongContainer" },
                {
                    children: [
                        jsxRuntime.jsx(SomethingWentWrongIcon, {}),
                        jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "somethingWentWrongErrorDetailsContainer" },
                                {
                                    children: [
                                        jsxRuntime.jsx(
                                            "div",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "label" },
                                                { children: t("WEBAUTHN_UNRECOVERABLE_ERROR") }
                                            )
                                        ),
                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                        jsxRuntime.jsx(
                                            "div",
                                            genericComponentOverrideContext.__assign(
                                                { "data-supertokens": "errorDetails" },
                                                { children: t("WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS") }
                                            )
                                        ),
                                    ],
                                }
                            )
                        ),
                        jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "goBackButtonContainer" },
                                {
                                    children: jsxRuntime.jsx(
                                        "a",
                                        genericComponentOverrideContext.__assign(
                                            {
                                                onClick: props.onClick,
                                                "data-supertokens": "formLabelLinkBtn errorGoBackLabel",
                                            },
                                            { children: t("WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL") }
                                        )
                                    ),
                                }
                            )
                        ),
                    ],
                }
            )
        );
    }
);

var SignUpScreen;
(function (SignUpScreen) {
    SignUpScreen[(SignUpScreen["SignUpForm"] = 0)] = "SignUpForm";
    SignUpScreen[(SignUpScreen["PasskeyConfirmation"] = 1)] = "PasskeyConfirmation";
    SignUpScreen[(SignUpScreen["Error"] = 2)] = "Error";
})(SignUpScreen || (SignUpScreen = {}));
var SignUpFormInner = uiEntry.withOverride("WebauthnPasskeySignUpForm", function PasskeyEmailForm(props) {
    var _this = this;
    var t = translationContext.useTranslation();
    var defaultFooter =
        props.resetFactorList !== undefined && props.showBackButton
            ? jsxRuntime.jsx(ContinueWithoutPasskey, { onClick: props.resetFactorList })
            : undefined;
    var onEmailContinueSuccess = React.useCallback(
        function (params) {
            props.onContinueClick(params);
        },
        [props]
    );
    var onError = React.useCallback(
        function (error) {
            if (error === "EMAIL_INPUT_NOT_POPULATED_ERROR") {
                props.onError("WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR");
            } else {
                props.onError(t("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR"));
            }
        },
        [props, t]
    );
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "signUpFormInnerContainer" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "cautionMessage" },
                            { children: t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL") }
                        )
                    ),
                    jsxRuntime.jsx(formBase.FormBase, {
                        clearError: props.clearError,
                        onFetchError: props.onFetchError,
                        onError: onError,
                        formFields: [
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
                                                    value: "WEBAUTHN_SIGN_UP_LABEL",
                                                    "data-supertokens": "emailInputLabel",
                                                }),
                                                jsxRuntime.jsx(
                                                    "a",
                                                    genericComponentOverrideContext.__assign(
                                                        {
                                                            onClick: props.onRecoverAccountClick,
                                                            "data-supertokens":
                                                                "link linkButton formLabelLinkBtn recoverAccountTrigger",
                                                        },
                                                        { children: t("WEBAUTHN_RECOVER_ACCOUNT_LABEL") }
                                                    )
                                                ),
                                            ],
                                        }
                                    )
                                ),
                                optional: false,
                                autofocus: true,
                                placeholder: "",
                                autoComplete: "email",
                                // We are using the default validator that allows any string
                                validate: validators.defaultEmailValidator,
                            },
                        ],
                        buttonLabel: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                        onSuccess: onEmailContinueSuccess,
                        callAPI: function (formFields) {
                            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                                var email;
                                var _a;
                                return genericComponentOverrideContext.__generator(this, function (_b) {
                                    email =
                                        (_a = formFields.find(function (field) {
                                            return field.id === "email";
                                        })) === null || _a === void 0
                                            ? void 0
                                            : _a.value;
                                    if (email === undefined) {
                                        throw new STGeneralError__default.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                                    }
                                    if (email === "") {
                                        throw new STGeneralError__default.default("EMAIL_INPUT_NOT_POPULATED_ERROR");
                                    }
                                    // We do not want the form to make the API call since we have
                                    // an intermediary step here so we will just mock an OK status
                                    // to render the next step.
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "OK",
                                            email: email,
                                        },
                                    ];
                                });
                            });
                        },
                        validateOnBlur: false,
                        showLabels: true,
                        footer: props.footer || defaultFooter,
                    }),
                ],
            }
        )
    );
});
var SignUpForm = function (props) {
    var _a = React.useState(null),
        continueClickResponse = _a[0],
        setContinueClickResponse = _a[1];
    var userContext = uiEntry.useUserContext();
    var _b = React.useState(undefined),
        errorLabel = _b[0],
        setErrorLabel = _b[1];
    var _c = React.useState(false),
        isLoading = _c[0],
        setIsLoading = _c[1];
    var _d = React.useState(false),
        isPasskeySupported = _d[0],
        setIsPasskeySupported = _d[1];
    React.useEffect(
        function () {
            void (function () {
                return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipeImplementation]
    );
    var onContinueClickCallback = React.useCallback(
        function (params) {
            setContinueClickResponse(params);
            props.onContinueClick(params);
        },
        [setContinueClickResponse, props]
    );
    var callAPI = React.useCallback(
        function (_, __) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (continueClickResponse === null) {
                                throw props.onError("EMAIL_INPUT_NOT_POPULATED_ERROR");
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.registerCredentialWithSignUp({
                                    email: continueClickResponse.email,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            // If it is an error related to passkey, we need to handle it.
                            if (response.status !== "OK") {
                                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                            }
                            if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                                setErrorLabel("WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR");
                            }
                            if (response.status === "WEBAUTHN_NOT_SUPPORTED") {
                                setErrorLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        [continueClickResponse, props, userContext]
    );
    var onConfirmationClick = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var fieldUpdates, _a, result, generalError, fetchError, e_1;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fieldUpdates = [];
                            setIsLoading(true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.handleCallAPI({
                                    apiFields: [],
                                    fieldUpdates: fieldUpdates,
                                    callAPI: callAPI,
                                }),
                            ];
                        case 2:
                            (_a = _b.sent()),
                                (result = _a.result),
                                (generalError = _a.generalError),
                                (fetchError = _a.fetchError);
                            if (generalError !== undefined) {
                                props.setActiveScreen(SignUpScreen.Error);
                            } else if (fetchError !== undefined) {
                                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                            } else {
                                // If successful
                                if (result.status === "OK") {
                                    if (setIsLoading) {
                                        setIsLoading(false);
                                    }
                                    setErrorLabel(undefined);
                                    if (props.onSuccess !== undefined) {
                                        props.onSuccess(result);
                                    }
                                }
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            console.error("error", e_1);
                            props.setActiveScreen(SignUpScreen.Error);
                            return [3 /*break*/, 5];
                        case 4:
                            if (setIsLoading) {
                                setIsLoading(false);
                            }
                            return [7 /*endfinally*/];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [callAPI, props]
    );
    return props.activeScreen === SignUpScreen.SignUpForm
        ? jsxRuntime.jsx(
              SignUpFormInner,
              genericComponentOverrideContext.__assign({}, props, { onContinueClick: onContinueClickCallback })
          )
        : props.activeScreen === SignUpScreen.PasskeyConfirmation
        ? jsxRuntime.jsx(
              PasskeyConfirmation,
              genericComponentOverrideContext.__assign({}, props, {
                  email:
                      (continueClickResponse === null || continueClickResponse === void 0
                          ? void 0
                          : continueClickResponse.email) || "",
                  onContinueClick: onConfirmationClick,
                  errorMessageLabel: errorLabel,
                  isLoading: isLoading,
                  isPasskeySupported: isPasskeySupported,
              })
          )
        : props.activeScreen === SignUpScreen.Error
        ? jsxRuntime.jsx(SignUpSomethingWentWrong, {
              onClick: function () {
                  return props.setActiveScreen(SignUpScreen.SignUpForm);
              },
          })
        : null;
};

function PasskeySignUpTheme(props) {
    var stInstance = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var activeStyle = props.config.signInAndUpFeature.style;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    var _a = React.useState(SignUpScreen.SignUpForm),
        activeScreen = _a[0],
        setActiveScreen = _a[1];
    var onContinueClick = React.useCallback(
        function () {
            setActiveScreen(SignUpScreen.PasskeyConfirmation);
        },
        [setActiveScreen]
    );
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
                            children: jsxRuntime.jsxs(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    {
                                        "data-supertokens": "container authPage ".concat(
                                            props.factorIds.length > 1 ? "multiFactor" : "singleFactor"
                                        ),
                                    },
                                    {
                                        children: [
                                            jsxRuntime.jsxs(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "row" },
                                                    {
                                                        children: [
                                                            ![SignUpScreen.Error].includes(activeScreen) &&
                                                                jsxRuntime.jsx(uiEntry.AuthPageHeader, {
                                                                    factorIds: props.factorIds,
                                                                    isSignUp: true,
                                                                    onSignInUpSwitcherClick:
                                                                        props.onSignInUpSwitcherClick,
                                                                    hasSeparateSignUpView: true,
                                                                    resetFactorList: props.resetFactorList,
                                                                    showBackButton: props.showBackButton,
                                                                    oauth2ClientInfo: undefined,
                                                                    headerLabel:
                                                                        activeScreen ===
                                                                        SignUpScreen.PasskeyConfirmation
                                                                            ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                                                            : undefined,
                                                                    hideSignInSwitcher:
                                                                        activeScreen ===
                                                                        SignUpScreen.PasskeyConfirmation,
                                                                }),
                                                            props.error !== undefined &&
                                                                jsxRuntime.jsx(uiEntry.GeneralError, {
                                                                    error: props.error,
                                                                }),
                                                            jsxRuntime.jsx(
                                                                SignUpForm,
                                                                genericComponentOverrideContext.__assign({}, props, {
                                                                    onContinueClick: onContinueClick,
                                                                    activeScreen: activeScreen,
                                                                    setActiveScreen: setActiveScreen,
                                                                })
                                                            ),
                                                            jsxRuntime.jsx(uiEntry.AuthPageFooter, {
                                                                factorIds: props.factorIds,
                                                                isSignUp: true,
                                                                hasSeparateSignUpView: true,
                                                                privacyPolicyLink: privacyPolicyLink,
                                                                termsOfServiceLink: termsOfServiceLink,
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

function useChildProps(
    recipe,
    factorIds,
    onAuthSuccess,
    error,
    onError,
    userContext,
    clearError,
    resetFactorList,
    onSignInUpSwitcherClick,
    showBackButton,
    navigate
) {
    var _this = this;
    var session = uiEntry.useSessionContext();
    var recipeImplementation = recipe.webJSRecipe;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var onRecoverAccountClick = function () {
        return recipe.redirect(
            { action: "SEND_RECOVERY_EMAIL", tenantIdFromQueryParams: "" },
            navigate,
            {},
            userContext
        );
    };
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
                                                session.loading ||
                                                !session.doesSessionExist ||
                                                (payloadAfterCall !== undefined &&
                                                    session.accessTokenPayload.sessionHandle !==
                                                        payloadAfterCall.sessionHandle),
                                            recipeId: "webauthn",
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                error: error,
                onError: onError,
                clearError: clearError,
                onFetchError: function (/* err: Response*/) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            // TODO: Do we need to do something else?
                            onError("SOMETHING_WENT_WRONG_ERROR");
                            return [2 /*return*/];
                        });
                    });
                },
                factorIds: factorIds,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                resetFactorList: resetFactorList,
                onSignInUpSwitcherClick: onSignInUpSwitcherClick,
                onRecoverAccountClick: onRecoverAccountClick,
                showBackButton: showBackButton,
            };
        },
        [error, factorIds, userContext, showBackButton, recipeImplementation]
    );
}
var SignUpFeatureInner = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        userContext,
        props.clearError,
        props.resetFactorList,
        props.onSignInUpSwitcherClick,
        props.showBackButton,
        props.navigate
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(PasskeySignUpTheme, genericComponentOverrideContext.__assign({}, childProps)),
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
var SignInUpFeatureFullPage = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(SignUpFeatureInner, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};
var SignUpWithPasskeyFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(true),
        isPasskeySupported = _a[0],
        setIsPasskeySupported = _a[1];
    React.useEffect(
        function () {
            void (function () {
                return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipe.webJSRecipe]
    );
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                            defaultStore: defaultTranslationsWebauthn,
                        },
                        {
                            children: jsxRuntime.jsx(
                                ContinueWithPasskeyTheme,
                                genericComponentOverrideContext.__assign({}, props, {
                                    continueWithPasskeyClicked: function () {
                                        return props.setFactorList(props.factorIds);
                                    },
                                    config: props.recipe.config,
                                    continueTo: "SIGN_UP",
                                    recipeImplementation: props.recipe.webJSRecipe,
                                    isPasskeySupported: isPasskeySupported,
                                    isLoading: false,
                                })
                            ),
                        }
                    )
                ),
            }
        )
    );
};

var WebauthnPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(WebauthnPreBuiltUI, _super);
    function WebauthnPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsWebauthn;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            var features = {};
            if (
                _this.recipeInstance.config.disableDefaultUI !== true &&
                _this.recipeInstance.config.recoveryFeature.disableDefaultUI !== true
            ) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(componentOverrideContext.DEFAULT_WEBAUTHN_RECOVERY_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("webauthn-recover-account", props, useComponentOverrides);
                    },
                    recipeID: componentOverrideContext.Webauthn.RECIPE_ID,
                };
                var normalisedFullPathForRecoveryThroughEmail =
                    _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                        new NormalisedURLPath__default.default(
                            componentOverrideContext.DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH
                        )
                    );
                features[normalisedFullPathForRecoveryThroughEmail.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("webauthn-send-recovery-email", props, useComponentOverrides);
                    },
                    recipeID: componentOverrideContext.Webauthn.RECIPE_ID,
                };
                var normalisedFullPathForMFA = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(componentOverrideContext.DEFAULT_WEBAUTHN_MFA_PATH)
                );
                features[normalisedFullPathForMFA.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("webauthn-mfa", props, useComponentOverrides);
                    },
                    recipeID: componentOverrideContext.Webauthn.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (componentName === "webauthn-recover-account") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                RecoverAccountUsingToken,
                                genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            } else if (componentName === "webauthn-send-recovery-email") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                SendRecoveryEmailForm,
                                genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            } else if (componentName === "webauthn-mfa") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                MFAFeature,
                                genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            }
            throw new Error("Should never come here.");
        };
        _this.requiresSignUpPage = true;
        return _this;
    }
    // Static methods
    WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (WebauthnPreBuiltUI.instance === undefined) {
            var recipeInstance = componentOverrideContext.Webauthn.getInstanceOrThrow();
            WebauthnPreBuiltUI.instance = new WebauthnPreBuiltUI(recipeInstance);
        }
        return WebauthnPreBuiltUI.instance;
    };
    WebauthnPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    WebauthnPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    WebauthnPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                type: "FULL_PAGE",
                preloadInfoAndRunChecks: function (firstFactors, _, isSignUp) {
                    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            return [
                                2 /*return*/,
                                {
                                    shouldDisplay:
                                        isSignUp &&
                                        firstFactors.length === 1 &&
                                        firstFactors.includes(types.FactorIds.WEBAUTHN),
                                    preloadInfo: {},
                                },
                            ];
                        });
                    });
                },
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignInUpFeatureFullPage,
                        genericComponentOverrideContext.__assign({}, props, {
                            recipe: _this.recipeInstance,
                            useComponentOverrides: componentOverrideContext.useContext,
                            factorIds: [types.FactorIds.WEBAUTHN],
                        }),
                        "webauthnSignUpFullPage"
                    );
                },
            },
            {
                type: "SIGN_UP",
                factorIds: [types.FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignUpWithPasskeyFeature,
                        genericComponentOverrideContext.__assign({}, props, {
                            recipe: _this.recipeInstance,
                            factorIds: [types.FactorIds.WEBAUTHN],
                            useComponentOverrides: componentOverrideContext.useContext,
                        }),
                        "webauthn-sign-up"
                    );
                },
            },
            {
                type: "SIGN_IN",
                factorIds: [types.FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignInWithPasskeyFeature,
                        genericComponentOverrideContext.__assign({}, props, {
                            recipe: _this.recipeInstance,
                            factorIds: [types.FactorIds.WEBAUTHN],
                            useComponentOverrides: componentOverrideContext.useContext,
                        }),
                        "webauthn-sign-in"
                    );
                },
            },
        ];
    };
    // For tests
    WebauthnPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        WebauthnPreBuiltUI.instance = undefined;
        return;
    };
    return WebauthnPreBuiltUI;
})(uiEntry.RecipeRouter);

exports.WebauthnPreBuiltUI = WebauthnPreBuiltUI;
