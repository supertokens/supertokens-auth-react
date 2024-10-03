"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session.js");
var recipe = require("./totp-shared.js");
var React = require("react");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var recipe$1 = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var translationContext = require("./translationContext.js");
var sessionprebuiltui = require("./sessionprebuiltui.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var formBase = require("./emailpassword-shared5.js");
var STGeneralError = require("supertokens-web-js/utils/error");
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
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/totp");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./emailpassword-shared4.js");
require("./emailpassword-shared.js");

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

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 700;\n    font-size: var(--font-size-0);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 20px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="formRow"]:last-child {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="primaryText"][data-supertokens~="sendVerifyEmailText"] {\n    text-align: center;\n    letter-spacing: 0.8px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n    font-weight: 700;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 400;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="resetPasswordEmailForm"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="resetPasswordPasswordForm"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="totp"] [data-supertokens~="container"] {\n    padding-top: 24px;\n}\n[data-supertokens~="totp"] [data-supertokens~="divider"] {\n    margin-top: 20px;\n    margin-bottom: 20px;\n}\n[data-supertokens~="totp"] [data-supertokens~="row"] {\n    padding-top: 16px;\n    padding-bottom: 8px;\n    width: auto;\n    margin: 0 50px;\n}\n[data-supertokens~="totpDeviceQR"] {\n    border-radius: 12px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n    padding: 16px;\n    max-width: 172px;\n    max-height: 172px;\n}\n[data-supertokens~="showTOTPSecret"] {\n    display: block;\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-0);\n    margin: 16px 0 12px;\n}\n[data-supertokens~="totpSecret"] {\n    display: block;\n    border-radius: 6px;\n    padding: 7px 15px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    font-weight: 600;\n    letter-spacing: 3.36px;\n    background: rgba(var(--palette-textLink), 0.08);\n    word-wrap: break-word;\n    overflow-y: hidden;\n}\nbutton[data-supertokens~="showTOTPSecretBtn"] {\n    font-size: 12px;\n}\n[data-supertokens~="showTOTPSecretBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="retryCodeBtn"]:disabled {\n    border: 0;\n    border-radius: 6px;\n    color: rgb(var(--palette-error));\n    background: rgb(var(--palette-errorBackground));\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var BlockedIcon = function () {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "65", height: "65", viewBox: "0 0 65 65", fill: "none" },
            {
                children: [
                    jsxRuntime.jsx("circle", { cx: "32.5", cy: "32.5", r: "32.5", fill: "#FCEAEB" }),
                    jsxRuntime.jsx("path", {
                        d: "M32.8804 36.5547C32.1233 36.5547 31.5039 37.1741 31.5039 37.9312C31.5039 38.6882 32.1233 39.3076 32.8804 39.3076C33.6374 39.3076 34.2568 38.6882 34.2568 37.9312C34.2568 37.1741 33.6374 36.5547 32.8804 36.5547Z",
                        fill: "#CF3644",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M41.829 29.6724V23.4783C41.829 18.5402 37.82 14.5312 32.8819 14.5312C27.9352 14.5312 23.9348 18.5402 23.9348 23.4783V29.6724H19.1172V50.3195H46.6466V29.6724H41.829ZM33.5701 40.5982V44.1254C33.5701 44.5039 33.2604 44.8136 32.8819 44.8136C32.5034 44.8136 32.1937 44.5039 32.1937 44.1254V40.5982C31.0065 40.2885 30.129 39.2131 30.129 37.9312C30.129 36.4085 31.3592 35.1783 32.8819 35.1783C34.4046 35.1783 35.6348 36.4085 35.6348 37.9312C35.6348 39.2131 34.7573 40.2885 33.5701 40.5982ZM40.4525 29.6724H25.3113V23.4783C25.3113 19.3059 28.7095 15.9077 32.8819 15.9077C37.0543 15.9077 40.4525 19.3059 40.4525 23.4783V29.6724Z",
                        fill: "#CF3644",
                    }),
                ],
            }
        )
    );
};

var RetryButton = function (_a) {
    var nextRetryAt = _a.nextRetryAt,
        onClick = _a.onClick;
    var t = translationContext.useTranslation();
    var getTimeLeft = React.useCallback(
        function () {
            var timeLeft = nextRetryAt - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        },
        [nextRetryAt]
    );
    var _b = React.useState(getTimeLeft()),
        secsUntilRetry = _b[0],
        setSecsUntilRetry = _b[1];
    React.useEffect(
        function () {
            // This runs every time nextRetryAt updates
            var interval = setInterval(function () {
                var timeLeft = getTimeLeft();
                if (timeLeft === undefined) {
                    clearInterval(interval);
                }
                setSecsUntilRetry(timeLeft);
            }, 500);
            return function () {
                // This can safely run twice
                clearInterval(interval);
            };
        },
        [getTimeLeft, setSecsUntilRetry]
    );
    return jsxRuntime.jsx(
        "button",
        genericComponentOverrideContext.__assign(
            {
                type: "button",
                disabled: secsUntilRetry !== undefined,
                onClick: onClick,
                "data-supertokens": "button retryCodeBtn",
            },
            {
                children:
                    secsUntilRetry !== undefined
                        ? jsxRuntime.jsxs(React__namespace.default.Fragment, {
                              children: [
                                  t("TOTP_MFA_BLOCKED_TIMER_START"),
                                  jsxRuntime.jsxs("strong", {
                                      children: [
                                          Math.floor(secsUntilRetry / 60)
                                              .toString()
                                              .padStart(2, "0"),
                                          ":",
                                          (secsUntilRetry % 60).toString().padStart(2, "0"),
                                      ],
                                  }),
                                  t("TOTP_MFA_BLOCKED_TIMER_END"),
                              ],
                          })
                        : t("TOTP_MFA_BLOCKED_RETRY"),
            }
        )
    );
};

var TOTPBlockedScreen = function (props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container totp-mfa blockedScreen" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsx(BlockedIcon, {}),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("TOTP_BLOCKED_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerSubtitle secondaryText" },
                                        { children: t("TOTP_BLOCKED_SUBTITLE") }
                                    )
                                ),
                                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                jsxRuntime.jsx(
                                    formBase.FormRow,
                                    {
                                        children: jsxRuntime.jsx(RetryButton, {
                                            nextRetryAt: props.nextRetryAt,
                                            onClick: props.onRetry,
                                        }),
                                    },
                                    "form-button"
                                ),
                                jsxRuntime.jsxs(
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
                                                t("TOTP_MFA_LOGOUT"),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var BlockedScreen = uiEntry.withOverride("TOTPBlockedScreen", TOTPBlockedScreen);

var TOTPLoadingScreen = function () {
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container delayedRender totp-mfa loadingScreen" },
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
var LoadingScreen = uiEntry.withOverride("TOTPLoadingScreen", TOTPLoadingScreen);

var CodeForm = uiEntry.withOverride("TOTPCodeForm", function TOTPCodeForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(React__namespace.default.Fragment, {
        children: jsxRuntime.jsx(formBase.FormBase, {
            formDataSupertokens: "totp-mfa codeForm",
            clearError: props.clearError,
            onError: props.onError,
            formFields: [
                {
                    id: "totp",
                    label: "TOTP_CODE_INPUT_LABEL",
                    autofocus: true,
                    optional: false,
                    clearOnSubmit: true,
                    autoComplete: "one-time-code",
                    placeholder: "",
                    validate: recipe.totpCodeValidate,
                },
            ],
            onSuccess: props.onSuccess,
            buttonLabel: "TOTP_CODE_CONTINUE_BUTTON",
            callAPI: function (formFields) {
                return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                    var totp, response;
                    var _a;
                    return genericComponentOverrideContext.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                totp =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "totp";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (totp === undefined || totp.length === 0) {
                                    throw new STGeneralError__default.default("GENERAL_ERROR_TOTP_UNDEFINED");
                                }
                                if (!props.featureState.deviceInfo) return [3 /*break*/, 2];
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyDevice({
                                        deviceName: props.featureState.deviceInfo.deviceName,
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                response = _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyCode({
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                response = _b.sent();
                                _b.label = 4;
                            case 4:
                                // We can return these statuses, since they all cause a redirection or are handled elsewhere
                                // so we don't really want to show anything
                                if (
                                    response.status === "OK" ||
                                    response.status === "UNKNOWN_DEVICE_ERROR" ||
                                    response.status === "LIMIT_REACHED_ERROR" ||
                                    response.status === "INVALID_TOTP_ERROR"
                                ) {
                                    return [2 /*return*/, response];
                                }
                                throw new STGeneralError__default.default("SOMETHING_WENT_WRONG_ERROR");
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.footer,
        }),
    });
});

var CodeVerificationFooter = uiEntry.withOverride(
    "TOTPCodeVerificationFooter",
    function TOTPCodeVerificationFooter(_a) {
        var onSignOutClicked = _a.onSignOutClicked;
        var t = translationContext.useTranslation();
        return jsxRuntime.jsx(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "footerLinkGroupVert totp-mfa codeVerificationFooter" },
                {
                    children: jsxRuntime.jsxs(
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
                                    t("TOTP_MFA_LOGOUT"),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
);

var CodeVerificationHeader = uiEntry.withOverride(
    "TOTPCodeVerificationHeader",
    function TOTPCodeVerificationHeader(props) {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerTitle withBackButton totp-mfa codeVerificationHeader" },
                        {
                            children: [
                                props.showBackButton
                                    ? jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked })
                                    : jsxRuntime.jsx("span", {
                                          "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                      }),
                                t("TOTP_CODE_VERIFICATION_HEADER_TITLE"),
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
                        { "data-supertokens": "headerSubtitle secondaryText" },
                        { children: t("TOTP_CODE_VERIFICATION_HEADER_SUBTITLE") }
                    )
                ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

var lib = {};

var mode$1 = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3,
};

var mode = mode$1;

function QR8bitByte(data) {
    this.mode = mode.MODE_8BIT_BYTE;
    this.data = data;
}

QR8bitByte.prototype = {
    getLength: function (buffer) {
        return this.data.length;
    },

    write: function (buffer) {
        for (var i = 0; i < this.data.length; i++) {
            // not JIS ...
            buffer.put(this.data.charCodeAt(i), 8);
        }
    },
};

var _8BitByte = QR8bitByte;

var ErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2,
};

// ErrorCorrectLevel
var ECL = ErrorCorrectLevel;

function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [
    // L
    // M
    // Q
    // H

    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],

    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],

    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],

    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],

    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],

    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],

    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],

    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],

    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],

    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],

    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],

    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],

    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],

    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],

    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12],

    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],

    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],

    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],

    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],

    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],

    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],

    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],

    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],

    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],

    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],

    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],

    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],

    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],

    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],

    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],

    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],

    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],

    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],

    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],

    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],

    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],

    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],

    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],

    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],

    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16],
];

QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j++) {
            list.push(new QRRSBlock(totalCount, dataCount));
        }
    }

    return list;
};

QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
    switch (errorCorrectLevel) {
        case ECL.L:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case ECL.M:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case ECL.Q:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case ECL.H:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
            return undefined;
    }
};

var RSBlock$1 = QRRSBlock;

function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
}

QRBitBuffer.prototype = {
    get: function (index) {
        var bufIndex = Math.floor(index / 8);
        return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) == 1;
    },

    put: function (num, length) {
        for (var i = 0; i < length; i++) {
            this.putBit(((num >>> (length - i - 1)) & 1) == 1);
        }
    },

    getLengthInBits: function () {
        return this.length;
    },

    putBit: function (bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }

        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }

        this.length++;
    },
};

var BitBuffer$1 = QRBitBuffer;

var QRMath = {
    glog: function (n) {
        if (n < 1) {
            throw new Error("glog(" + n + ")");
        }

        return QRMath.LOG_TABLE[n];
    },

    gexp: function (n) {
        while (n < 0) {
            n += 255;
        }

        while (n >= 256) {
            n -= 255;
        }

        return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256),
};

for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] =
        QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

var math$2 = QRMath;

var math$1 = math$2;

function QRPolynomial(num, shift) {
    if (num.length == undefined) {
        throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
        offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
        this.num[i] = num[i + offset];
    }
}

QRPolynomial.prototype = {
    get: function (index) {
        return this.num[index];
    },

    getLength: function () {
        return this.num.length;
    },

    multiply: function (e) {
        var num = new Array(this.getLength() + e.getLength() - 1);

        for (var i = 0; i < this.getLength(); i++) {
            for (var j = 0; j < e.getLength(); j++) {
                num[i + j] ^= math$1.gexp(math$1.glog(this.get(i)) + math$1.glog(e.get(j)));
            }
        }

        return new QRPolynomial(num, 0);
    },

    mod: function (e) {
        if (this.getLength() - e.getLength() < 0) {
            return this;
        }

        var ratio = math$1.glog(this.get(0)) - math$1.glog(e.get(0));

        var num = new Array(this.getLength());

        for (var i = 0; i < this.getLength(); i++) {
            num[i] = this.get(i);
        }

        for (var i = 0; i < e.getLength(); i++) {
            num[i] ^= math$1.gexp(math$1.glog(e.get(i)) + ratio);
        }

        // recursive call
        return new QRPolynomial(num, 0).mod(e);
    },
};

var Polynomial$2 = QRPolynomial;

var Mode = mode$1;
var Polynomial$1 = Polynomial$2;
var math = math$2;

var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
};

var QRUtil = {
    PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170],
    ],

    G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),

    getBCHTypeInfo: function (data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15));
        }
        return ((data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function (data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18));
        }
        return (data << 12) | d;
    },

    getBCHDigit: function (data) {
        var digit = 0;

        while (data != 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition: function (typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function (maskPattern, i, j) {
        switch (maskPattern) {
            case QRMaskPattern.PATTERN000:
                return (i + j) % 2 == 0;
            case QRMaskPattern.PATTERN001:
                return i % 2 == 0;
            case QRMaskPattern.PATTERN010:
                return j % 3 == 0;
            case QRMaskPattern.PATTERN011:
                return (i + j) % 3 == 0;
            case QRMaskPattern.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
            case QRMaskPattern.PATTERN101:
                return ((i * j) % 2) + ((i * j) % 3) == 0;
            case QRMaskPattern.PATTERN110:
                return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
            case QRMaskPattern.PATTERN111:
                return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;

            default:
                throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial: function (errorCorrectLength) {
        var a = new Polynomial$1([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new Polynomial$1([1, math.gexp(i)], 0));
        }

        return a;
    },

    getLengthInBits: function (mode, type) {
        if (1 <= type && type < 10) {
            // 1 - 9

            switch (mode) {
                case Mode.MODE_NUMBER:
                    return 10;
                case Mode.MODE_ALPHA_NUM:
                    return 9;
                case Mode.MODE_8BIT_BYTE:
                    return 8;
                case Mode.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + mode);
            }
        } else if (type < 27) {
            // 10 - 26

            switch (mode) {
                case Mode.MODE_NUMBER:
                    return 12;
                case Mode.MODE_ALPHA_NUM:
                    return 11;
                case Mode.MODE_8BIT_BYTE:
                    return 16;
                case Mode.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + mode);
            }
        } else if (type < 41) {
            // 27 - 40

            switch (mode) {
                case Mode.MODE_NUMBER:
                    return 14;
                case Mode.MODE_ALPHA_NUM:
                    return 13;
                case Mode.MODE_8BIT_BYTE:
                    return 16;
                case Mode.MODE_KANJI:
                    return 12;
                default:
                    throw new Error("mode:" + mode);
            }
        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint: function (qrCode) {
        var moduleCount = qrCode.getModuleCount();

        var lostPoint = 0;

        // LEVEL1

        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount; col++) {
                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {
                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {
                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r == 0 && c == 0) {
                            continue;
                        }

                        if (dark == qrCode.isDark(row + r, col + c)) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += 3 + sameCount - 5;
                }
            }
        }

        // LEVEL2

        for (var row = 0; row < moduleCount - 1; row++) {
            for (var col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row, col)) count++;
                if (qrCode.isDark(row + 1, col)) count++;
                if (qrCode.isDark(row, col + 1)) count++;
                if (qrCode.isDark(row + 1, col + 1)) count++;
                if (count == 0 || count == 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount - 6; col++) {
                if (
                    qrCode.isDark(row, col) &&
                    !qrCode.isDark(row, col + 1) &&
                    qrCode.isDark(row, col + 2) &&
                    qrCode.isDark(row, col + 3) &&
                    qrCode.isDark(row, col + 4) &&
                    !qrCode.isDark(row, col + 5) &&
                    qrCode.isDark(row, col + 6)
                ) {
                    lostPoint += 40;
                }
            }
        }

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount - 6; row++) {
                if (
                    qrCode.isDark(row, col) &&
                    !qrCode.isDark(row + 1, col) &&
                    qrCode.isDark(row + 2, col) &&
                    qrCode.isDark(row + 3, col) &&
                    qrCode.isDark(row + 4, col) &&
                    !qrCode.isDark(row + 5, col) &&
                    qrCode.isDark(row + 6, col)
                ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4

        var darkCount = 0;

        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col)) {
                    darkCount++;
                }
            }
        }

        var ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;
    },
};

var util$1 = QRUtil;

var BitByte = _8BitByte;
var RSBlock = RSBlock$1;
var BitBuffer = BitBuffer$1;
var util = util$1;
var Polynomial = Polynomial$2;

function QRCode$1(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
}

// for client side minification
var proto = QRCode$1.prototype;

proto.addData = function (data) {
    var newData = new BitByte(data);
    this.dataList.push(newData);
    this.dataCache = null;
};

proto.isDark = function (row, col) {
    if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
    }
    return this.modules[row][col];
};

proto.getModuleCount = function () {
    return this.moduleCount;
};

proto.make = function () {
    // Calculate automatically typeNumber if provided is < 1
    if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
            var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

            var buffer = new BitBuffer();
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
            }

            for (var i = 0; i < this.dataList.length; i++) {
                var data = this.dataList[i];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
                data.write(buffer);
            }
            if (buffer.getLengthInBits() <= totalDataCount * 8) break;
        }
        this.typeNumber = typeNumber;
    }
    this.makeImpl(false, this.getBestMaskPattern());
};

proto.makeImpl = function (test, maskPattern) {
    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
            this.modules[row][col] = null; //(col + row) % 3;
        }
    }

    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(test, maskPattern);

    if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
    }

    if (this.dataCache == null) {
        this.dataCache = QRCode$1.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
    }

    this.mapData(this.dataCache, maskPattern);
};

proto.setupPositionProbePattern = function (row, col) {
    for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c) continue;

            if (
                (0 <= r && r <= 6 && (c == 0 || c == 6)) ||
                (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
                (2 <= r && r <= 4 && 2 <= c && c <= 4)
            ) {
                this.modules[row + r][col + c] = true;
            } else {
                this.modules[row + r][col + c] = false;
            }
        }
    }
};

proto.getBestMaskPattern = function () {
    var minLostPoint = 0;
    var pattern = 0;

    for (var i = 0; i < 8; i++) {
        this.makeImpl(true, i);

        var lostPoint = util.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern = i;
        }
    }

    return pattern;
};

proto.createMovieClip = function (target_mc, instance_name, depth) {
    var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
    var cs = 1;

    this.make();

    for (var row = 0; row < this.modules.length; row++) {
        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs;
            var dark = this.modules[row][col];

            if (dark) {
                qr_mc.beginFill(0, 100);
                qr_mc.moveTo(x, y);
                qr_mc.lineTo(x + cs, y);
                qr_mc.lineTo(x + cs, y + cs);
                qr_mc.lineTo(x, y + cs);
                qr_mc.endFill();
            }
        }
    }

    return qr_mc;
};

proto.setupTimingPattern = function () {
    for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
            continue;
        }
        this.modules[r][6] = r % 2 == 0;
    }

    for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
            continue;
        }
        this.modules[6][c] = c % 2 == 0;
    }
};

proto.setupPositionAdjustPattern = function () {
    var pos = util.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
            var row = pos[i];
            var col = pos[j];

            if (this.modules[row][col] != null) {
                continue;
            }

            for (var r = -2; r <= 2; r++) {
                for (var c = -2; c <= 2; c++) {
                    if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                        this.modules[row + r][col + c] = true;
                    } else {
                        this.modules[row + r][col + c] = false;
                    }
                }
            }
        }
    }
};

proto.setupTypeNumber = function (test) {
    var bits = util.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
        var mod = !test && ((bits >> i) & 1) == 1;
        this.modules[Math.floor(i / 3)][(i % 3) + this.moduleCount - 8 - 3] = mod;
    }

    for (var i = 0; i < 18; i++) {
        var mod = !test && ((bits >> i) & 1) == 1;
        this.modules[(i % 3) + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
};

proto.setupTypeInfo = function (test, maskPattern) {
    var data = (this.errorCorrectLevel << 3) | maskPattern;
    var bits = util.getBCHTypeInfo(data);

    // vertical
    for (var i = 0; i < 15; i++) {
        var mod = !test && ((bits >> i) & 1) == 1;

        if (i < 6) {
            this.modules[i][8] = mod;
        } else if (i < 8) {
            this.modules[i + 1][8] = mod;
        } else {
            this.modules[this.moduleCount - 15 + i][8] = mod;
        }
    }

    // horizontal
    for (var i = 0; i < 15; i++) {
        var mod = !test && ((bits >> i) & 1) == 1;

        if (i < 8) {
            this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
            this.modules[8][15 - i - 1 + 1] = mod;
        } else {
            this.modules[8][15 - i - 1] = mod;
        }
    }

    // fixed module
    this.modules[this.moduleCount - 8][8] = !test;
};

proto.mapData = function (data, maskPattern) {
    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;

        while (true) {
            for (var c = 0; c < 2; c++) {
                if (this.modules[row][col - c] == null) {
                    var dark = false;

                    if (byteIndex < data.length) {
                        dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
                    }

                    var mask = util.getMask(maskPattern, row, col - c);

                    if (mask) {
                        dark = !dark;
                    }

                    this.modules[row][col - c] = dark;
                    bitIndex--;

                    if (bitIndex == -1) {
                        byteIndex++;
                        bitIndex = 7;
                    }
                }
            }

            row += inc;

            if (row < 0 || this.moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
};

QRCode$1.PAD0 = 0xec;
QRCode$1.PAD1 = 0x11;

QRCode$1.createData = function (typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new BitBuffer();

    for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
    }

    // padding
    while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode$1.PAD0, 8);

        if (buffer.getLengthInBits() >= totalDataCount * 8) {
            break;
        }
        buffer.put(QRCode$1.PAD1, 8);
    }

    return QRCode$1.createBytes(buffer, rsBlocks);
};

QRCode$1.createBytes = function (buffer, rsBlocks) {
    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;

        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);

        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i++) {
            dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;

        var rsPoly = util.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
        totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < dcdata[r].length) {
                data[index++] = dcdata[r][i];
            }
        }
    }

    for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
            if (i < ecdata[r].length) {
                data[index++] = ecdata[r][i];
            }
        }
    }

    return data;
};

var QRCode_1 = QRCode$1;

var propTypesExports = {};
var propTypes$2 = {
    get exports() {
        return propTypesExports;
    },
    set exports(v) {
        propTypesExports = v;
    },
};

var reactIsExports = {};
var reactIs = {
    get exports() {
        return reactIsExports;
    },
    set exports(v) {
        reactIsExports = v;
    },
};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min() {
    if (hasRequiredReactIs_production_min) return reactIs_production_min;
    hasRequiredReactIs_production_min = 1;
    var b = "function" === typeof Symbol && Symbol.for,
        c = b ? Symbol.for("react.element") : 60103,
        d = b ? Symbol.for("react.portal") : 60106,
        e = b ? Symbol.for("react.fragment") : 60107,
        f = b ? Symbol.for("react.strict_mode") : 60108,
        g = b ? Symbol.for("react.profiler") : 60114,
        h = b ? Symbol.for("react.provider") : 60109,
        k = b ? Symbol.for("react.context") : 60110,
        l = b ? Symbol.for("react.async_mode") : 60111,
        m = b ? Symbol.for("react.concurrent_mode") : 60111,
        n = b ? Symbol.for("react.forward_ref") : 60112,
        p = b ? Symbol.for("react.suspense") : 60113,
        q = b ? Symbol.for("react.suspense_list") : 60120,
        r = b ? Symbol.for("react.memo") : 60115,
        t = b ? Symbol.for("react.lazy") : 60116,
        v = b ? Symbol.for("react.block") : 60121,
        w = b ? Symbol.for("react.fundamental") : 60117,
        x = b ? Symbol.for("react.responder") : 60118,
        y = b ? Symbol.for("react.scope") : 60119;
    function z(a) {
        if ("object" === typeof a && null !== a) {
            var u = a.$$typeof;
            switch (u) {
                case c:
                    switch (((a = a.type), a)) {
                        case l:
                        case m:
                        case e:
                        case g:
                        case f:
                        case p:
                            return a;
                        default:
                            switch (((a = a && a.$$typeof), a)) {
                                case k:
                                case n:
                                case t:
                                case r:
                                case h:
                                    return a;
                                default:
                                    return u;
                            }
                    }
                case d:
                    return u;
            }
        }
    }
    function A(a) {
        return z(a) === m;
    }
    reactIs_production_min.AsyncMode = l;
    reactIs_production_min.ConcurrentMode = m;
    reactIs_production_min.ContextConsumer = k;
    reactIs_production_min.ContextProvider = h;
    reactIs_production_min.Element = c;
    reactIs_production_min.ForwardRef = n;
    reactIs_production_min.Fragment = e;
    reactIs_production_min.Lazy = t;
    reactIs_production_min.Memo = r;
    reactIs_production_min.Portal = d;
    reactIs_production_min.Profiler = g;
    reactIs_production_min.StrictMode = f;
    reactIs_production_min.Suspense = p;
    reactIs_production_min.isAsyncMode = function (a) {
        return A(a) || z(a) === l;
    };
    reactIs_production_min.isConcurrentMode = A;
    reactIs_production_min.isContextConsumer = function (a) {
        return z(a) === k;
    };
    reactIs_production_min.isContextProvider = function (a) {
        return z(a) === h;
    };
    reactIs_production_min.isElement = function (a) {
        return "object" === typeof a && null !== a && a.$$typeof === c;
    };
    reactIs_production_min.isForwardRef = function (a) {
        return z(a) === n;
    };
    reactIs_production_min.isFragment = function (a) {
        return z(a) === e;
    };
    reactIs_production_min.isLazy = function (a) {
        return z(a) === t;
    };
    reactIs_production_min.isMemo = function (a) {
        return z(a) === r;
    };
    reactIs_production_min.isPortal = function (a) {
        return z(a) === d;
    };
    reactIs_production_min.isProfiler = function (a) {
        return z(a) === g;
    };
    reactIs_production_min.isStrictMode = function (a) {
        return z(a) === f;
    };
    reactIs_production_min.isSuspense = function (a) {
        return z(a) === p;
    };
    reactIs_production_min.isValidElementType = function (a) {
        return (
            "string" === typeof a ||
            "function" === typeof a ||
            a === e ||
            a === m ||
            a === g ||
            a === f ||
            a === p ||
            a === q ||
            ("object" === typeof a &&
                null !== a &&
                (a.$$typeof === t ||
                    a.$$typeof === r ||
                    a.$$typeof === h ||
                    a.$$typeof === k ||
                    a.$$typeof === n ||
                    a.$$typeof === w ||
                    a.$$typeof === x ||
                    a.$$typeof === y ||
                    a.$$typeof === v))
        );
    };
    reactIs_production_min.typeOf = z;
    return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development() {
    if (hasRequiredReactIs_development) return reactIs_development;
    hasRequiredReactIs_development = 1;

    if (process.env.NODE_ENV !== "production") {
        (function () {
            // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
            // nor polyfill, then a plain number is used for performance.
            var hasSymbol = typeof Symbol === "function" && Symbol.for;
            var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
            var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
            var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
            var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 0xeacc;
            var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
            var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
            var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
            // (unstable) APIs that have been removed. Can we remove the symbols?

            var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 0xeacf;
            var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 0xeacf;
            var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 0xead0;
            var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
            var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 0xead8;
            var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
            var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
            var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 0xead9;
            var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 0xead5;
            var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 0xead6;
            var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 0xead7;

            function isValidElementType(type) {
                return (
                    typeof type === "string" ||
                    typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                    type === REACT_FRAGMENT_TYPE ||
                    type === REACT_CONCURRENT_MODE_TYPE ||
                    type === REACT_PROFILER_TYPE ||
                    type === REACT_STRICT_MODE_TYPE ||
                    type === REACT_SUSPENSE_TYPE ||
                    type === REACT_SUSPENSE_LIST_TYPE ||
                    (typeof type === "object" &&
                        type !== null &&
                        (type.$$typeof === REACT_LAZY_TYPE ||
                            type.$$typeof === REACT_MEMO_TYPE ||
                            type.$$typeof === REACT_PROVIDER_TYPE ||
                            type.$$typeof === REACT_CONTEXT_TYPE ||
                            type.$$typeof === REACT_FORWARD_REF_TYPE ||
                            type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
                            type.$$typeof === REACT_RESPONDER_TYPE ||
                            type.$$typeof === REACT_SCOPE_TYPE ||
                            type.$$typeof === REACT_BLOCK_TYPE))
                );
            }

            function typeOf(object) {
                if (typeof object === "object" && object !== null) {
                    var $$typeof = object.$$typeof;

                    switch ($$typeof) {
                        case REACT_ELEMENT_TYPE:
                            var type = object.type;

                            switch (type) {
                                case REACT_ASYNC_MODE_TYPE:
                                case REACT_CONCURRENT_MODE_TYPE:
                                case REACT_FRAGMENT_TYPE:
                                case REACT_PROFILER_TYPE:
                                case REACT_STRICT_MODE_TYPE:
                                case REACT_SUSPENSE_TYPE:
                                    return type;

                                default:
                                    var $$typeofType = type && type.$$typeof;

                                    switch ($$typeofType) {
                                        case REACT_CONTEXT_TYPE:
                                        case REACT_FORWARD_REF_TYPE:
                                        case REACT_LAZY_TYPE:
                                        case REACT_MEMO_TYPE:
                                        case REACT_PROVIDER_TYPE:
                                            return $$typeofType;

                                        default:
                                            return $$typeof;
                                    }
                            }

                        case REACT_PORTAL_TYPE:
                            return $$typeof;
                    }
                }

                return undefined;
            } // AsyncMode is deprecated along with isAsyncMode

            var AsyncMode = REACT_ASYNC_MODE_TYPE;
            var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
            var ContextConsumer = REACT_CONTEXT_TYPE;
            var ContextProvider = REACT_PROVIDER_TYPE;
            var Element = REACT_ELEMENT_TYPE;
            var ForwardRef = REACT_FORWARD_REF_TYPE;
            var Fragment = REACT_FRAGMENT_TYPE;
            var Lazy = REACT_LAZY_TYPE;
            var Memo = REACT_MEMO_TYPE;
            var Portal = REACT_PORTAL_TYPE;
            var Profiler = REACT_PROFILER_TYPE;
            var StrictMode = REACT_STRICT_MODE_TYPE;
            var Suspense = REACT_SUSPENSE_TYPE;
            var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

            function isAsyncMode(object) {
                {
                    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

                        console["warn"](
                            "The ReactIs.isAsyncMode() alias has been deprecated, " +
                                "and will be removed in React 17+. Update your code to use " +
                                "ReactIs.isConcurrentMode() instead. It has the exact same API."
                        );
                    }
                }

                return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
            }
            function isConcurrentMode(object) {
                return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
            }
            function isContextConsumer(object) {
                return typeOf(object) === REACT_CONTEXT_TYPE;
            }
            function isContextProvider(object) {
                return typeOf(object) === REACT_PROVIDER_TYPE;
            }
            function isElement(object) {
                return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function isForwardRef(object) {
                return typeOf(object) === REACT_FORWARD_REF_TYPE;
            }
            function isFragment(object) {
                return typeOf(object) === REACT_FRAGMENT_TYPE;
            }
            function isLazy(object) {
                return typeOf(object) === REACT_LAZY_TYPE;
            }
            function isMemo(object) {
                return typeOf(object) === REACT_MEMO_TYPE;
            }
            function isPortal(object) {
                return typeOf(object) === REACT_PORTAL_TYPE;
            }
            function isProfiler(object) {
                return typeOf(object) === REACT_PROFILER_TYPE;
            }
            function isStrictMode(object) {
                return typeOf(object) === REACT_STRICT_MODE_TYPE;
            }
            function isSuspense(object) {
                return typeOf(object) === REACT_SUSPENSE_TYPE;
            }

            reactIs_development.AsyncMode = AsyncMode;
            reactIs_development.ConcurrentMode = ConcurrentMode;
            reactIs_development.ContextConsumer = ContextConsumer;
            reactIs_development.ContextProvider = ContextProvider;
            reactIs_development.Element = Element;
            reactIs_development.ForwardRef = ForwardRef;
            reactIs_development.Fragment = Fragment;
            reactIs_development.Lazy = Lazy;
            reactIs_development.Memo = Memo;
            reactIs_development.Portal = Portal;
            reactIs_development.Profiler = Profiler;
            reactIs_development.StrictMode = StrictMode;
            reactIs_development.Suspense = Suspense;
            reactIs_development.isAsyncMode = isAsyncMode;
            reactIs_development.isConcurrentMode = isConcurrentMode;
            reactIs_development.isContextConsumer = isContextConsumer;
            reactIs_development.isContextProvider = isContextProvider;
            reactIs_development.isElement = isElement;
            reactIs_development.isForwardRef = isForwardRef;
            reactIs_development.isFragment = isFragment;
            reactIs_development.isLazy = isLazy;
            reactIs_development.isMemo = isMemo;
            reactIs_development.isPortal = isPortal;
            reactIs_development.isProfiler = isProfiler;
            reactIs_development.isStrictMode = isStrictMode;
            reactIs_development.isSuspense = isSuspense;
            reactIs_development.isValidElementType = isValidElementType;
            reactIs_development.typeOf = typeOf;
        })();
    }
    return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs() {
    if (hasRequiredReactIs) return reactIsExports;
    hasRequiredReactIs = 1;
    (function (module) {
        if (process.env.NODE_ENV === "production") {
            module.exports = requireReactIs_production_min();
        } else {
            module.exports = requireReactIs_development();
        }
    })(reactIs);
    return reactIsExports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign() {
    if (hasRequiredObjectAssign) return objectAssign;
    hasRequiredObjectAssign = 1;
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError("Object.assign cannot be called with null or undefined");
        }

        return Object(val);
    }

    function shouldUseNative() {
        try {
            if (!Object.assign) {
                return false;
            }

            // Detect buggy property enumeration order in older V8 versions.

            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {};
            for (var i = 0; i < 10; i++) {
                test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                return test2[n];
            });
            if (order2.join("") !== "0123456789") {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function (letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                return false;
            }

            return true;
        } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
        }
    }

    objectAssign = shouldUseNative()
        ? Object.assign
        : function (target, source) {
              var from;
              var to = toObject(target);
              var symbols;

              for (var s = 1; s < arguments.length; s++) {
                  from = Object(arguments[s]);

                  for (var key in from) {
                      if (hasOwnProperty.call(from, key)) {
                          to[key] = from[key];
                      }
                  }

                  if (getOwnPropertySymbols) {
                      symbols = getOwnPropertySymbols(from);
                      for (var i = 0; i < symbols.length; i++) {
                          if (propIsEnumerable.call(from, symbols[i])) {
                              to[symbols[i]] = from[symbols[i]];
                          }
                      }
                  }
              }

              return to;
          };
    return objectAssign;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret() {
    if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
    hasRequiredReactPropTypesSecret = 1;

    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

    ReactPropTypesSecret_1 = ReactPropTypesSecret;
    return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;

function requireHas() {
    if (hasRequiredHas) return has;
    hasRequiredHas = 1;
    has = Function.call.bind(Object.prototype.hasOwnProperty);
    return has;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var checkPropTypes_1;
var hasRequiredCheckPropTypes;

function requireCheckPropTypes() {
    if (hasRequiredCheckPropTypes) return checkPropTypes_1;
    hasRequiredCheckPropTypes = 1;

    var printWarning = function () {};

    if (process.env.NODE_ENV !== "production") {
        var ReactPropTypesSecret = requireReactPropTypesSecret();
        var loggedTypeFailures = {};
        var has = requireHas();

        printWarning = function (text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
                console.error(message);
            }
            try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
            } catch (x) {
                /**/
            }
        };
    }

    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param {object} typeSpecs Map of name to a ReactPropType
     * @param {object} values Runtime values that need to be type-checked
     * @param {string} location e.g. "prop", "context", "child context"
     * @param {string} componentName Name of the component for error messages.
     * @param {?Function} getStack Returns the component stack.
     * @private
     */
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        if (process.env.NODE_ENV !== "production") {
            for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                    var error;
                    // Prop type validation may throw. In case they do, we don't want to
                    // fail the render phase where it didn't fail before. So we log it.
                    // After these have been cleaned up, we'll let them throw.
                    try {
                        // This is intentionally an invariant that gets caught. It's the same
                        // behavior as without this statement except with a better message.
                        if (typeof typeSpecs[typeSpecName] !== "function") {
                            var err = Error(
                                (componentName || "React class") +
                                    ": " +
                                    location +
                                    " type `" +
                                    typeSpecName +
                                    "` is invalid; " +
                                    "it must be a function, usually from the `prop-types` package, but received `" +
                                    typeof typeSpecs[typeSpecName] +
                                    "`." +
                                    "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                            );
                            err.name = "Invariant Violation";
                            throw err;
                        }
                        error = typeSpecs[typeSpecName](
                            values,
                            typeSpecName,
                            componentName,
                            location,
                            null,
                            ReactPropTypesSecret
                        );
                    } catch (ex) {
                        error = ex;
                    }
                    if (error && !(error instanceof Error)) {
                        printWarning(
                            (componentName || "React class") +
                                ": type specification of " +
                                location +
                                " `" +
                                typeSpecName +
                                "` is invalid; the type checker " +
                                "function must return `null` or an `Error` but returned a " +
                                typeof error +
                                ". " +
                                "You may have forgotten to pass an argument to the type checker " +
                                "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                                "shape all require an argument)."
                        );
                    }
                    if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                        // Only monitor this failure once because there tends to be a lot of the
                        // same error.
                        loggedTypeFailures[error.message] = true;

                        var stack = getStack ? getStack() : "";

                        printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
                    }
                }
            }
        }
    }

    /**
     * Resets warning cache when testing.
     *
     * @private
     */
    checkPropTypes.resetWarningCache = function () {
        if (process.env.NODE_ENV !== "production") {
            loggedTypeFailures = {};
        }
    };

    checkPropTypes_1 = checkPropTypes;
    return checkPropTypes_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;

function requireFactoryWithTypeCheckers() {
    if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
    hasRequiredFactoryWithTypeCheckers = 1;

    var ReactIs = requireReactIs();
    var assign = requireObjectAssign();

    var ReactPropTypesSecret = requireReactPropTypesSecret();
    var has = requireHas();
    var checkPropTypes = requireCheckPropTypes();

    var printWarning = function () {};

    if (process.env.NODE_ENV !== "production") {
        printWarning = function (text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
                console.error(message);
            }
            try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
            } catch (x) {}
        };
    }

    function emptyFunctionThatReturnsNull() {
        return null;
    }

    factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
        /* global Symbol */
        var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

        /**
         * Returns the iterator method function contained on the iterable object.
         *
         * Be sure to invoke the function with the iterable as context:
         *
         *     var iteratorFn = getIteratorFn(myIterable);
         *     if (iteratorFn) {
         *       var iterator = iteratorFn.call(myIterable);
         *       ...
         *     }
         *
         * @param {?object} maybeIterable
         * @return {?function}
         */
        function getIteratorFn(maybeIterable) {
            var iteratorFn =
                maybeIterable &&
                ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
                return iteratorFn;
            }
        }

        /**
         * Collection of methods that allow declaration and validation of props that are
         * supplied to React components. Example usage:
         *
         *   var Props = require('ReactPropTypes');
         *   var MyArticle = React.createClass({
         *     propTypes: {
         *       // An optional string prop named "description".
         *       description: Props.string,
         *
         *       // A required enum prop named "category".
         *       category: Props.oneOf(['News','Photos']).isRequired,
         *
         *       // A prop named "dialog" that requires an instance of Dialog.
         *       dialog: Props.instanceOf(Dialog).isRequired
         *     },
         *     render: function() { ... }
         *   });
         *
         * A more formal specification of how these methods are used:
         *
         *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
         *   decl := ReactPropTypes.{type}(.isRequired)?
         *
         * Each and every declaration produces a function with the same signature. This
         * allows the creation of custom validation functions. For example:
         *
         *  var MyLink = React.createClass({
         *    propTypes: {
         *      // An optional string or URI prop named "href".
         *      href: function(props, propName, componentName) {
         *        var propValue = props[propName];
         *        if (propValue != null && typeof propValue !== 'string' &&
         *            !(propValue instanceof URI)) {
         *          return new Error(
         *            'Expected a string or an URI for ' + propName + ' in ' +
         *            componentName
         *          );
         *        }
         *      }
         *    },
         *    render: function() {...}
         *  });
         *
         * @internal
         */

        var ANONYMOUS = "<<anonymous>>";

        // Important!
        // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
        var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bigint: createPrimitiveTypeChecker("bigint"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),

            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            elementType: createElementTypeTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker,
        };

        /**
         * inlined Object.is polyfill to avoid requiring consumers ship their own
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
         */
        /*eslint-disable no-self-compare*/
        function is(x, y) {
            // SameValue algorithm
            if (x === y) {
                // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return x !== 0 || 1 / x === 1 / y;
            } else {
                // Step 6.a: NaN == NaN
                return x !== x && y !== y;
            }
        }
        /*eslint-enable no-self-compare*/

        /**
         * We use an Error-like object for backward compatibility as people may call
         * PropTypes directly and inspect their output. However, we don't use real
         * Errors anymore. We don't inspect their stack anyway, and creating them
         * is prohibitively expensive if they are created too often, such as what
         * happens in oneOfType() for any type before the one that matched.
         */
        function PropTypeError(message, data) {
            this.message = message;
            this.data = data && typeof data === "object" ? data : {};
            this.stack = "";
        }
        // Make `instanceof Error` still work for returned errors.
        PropTypeError.prototype = Error.prototype;

        function createChainableTypeChecker(validate) {
            if (process.env.NODE_ENV !== "production") {
                var manualPropTypeCallCache = {};
                var manualPropTypeWarningCount = 0;
            }
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                componentName = componentName || ANONYMOUS;
                propFullName = propFullName || propName;

                if (secret !== ReactPropTypesSecret) {
                    if (throwOnDirectAccess) {
                        // New behavior only for users of `prop-types` package
                        var err = new Error(
                            "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                                "Use `PropTypes.checkPropTypes()` to call them. " +
                                "Read more at http://fb.me/use-check-prop-types"
                        );
                        err.name = "Invariant Violation";
                        throw err;
                    } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
                        // Old behavior for people using React.PropTypes
                        var cacheKey = componentName + ":" + propName;
                        if (
                            !manualPropTypeCallCache[cacheKey] &&
                            // Avoid spamming the console because they are often not actionable except for lib authors
                            manualPropTypeWarningCount < 3
                        ) {
                            printWarning(
                                "You are manually calling a React.PropTypes validation " +
                                    "function for the `" +
                                    propFullName +
                                    "` prop on `" +
                                    componentName +
                                    "`. This is deprecated " +
                                    "and will throw in the standalone `prop-types` package. " +
                                    "You may be seeing this warning due to a third-party PropTypes " +
                                    "library. See https://fb.me/react-warning-dont-call-proptypes " +
                                    "for details."
                            );
                            manualPropTypeCallCache[cacheKey] = true;
                            manualPropTypeWarningCount++;
                        }
                    }
                }
                if (props[propName] == null) {
                    if (isRequired) {
                        if (props[propName] === null) {
                            return new PropTypeError(
                                "The " +
                                    location +
                                    " `" +
                                    propFullName +
                                    "` is marked as required " +
                                    ("in `" + componentName + "`, but its value is `null`.")
                            );
                        }
                        return new PropTypeError(
                            "The " +
                                location +
                                " `" +
                                propFullName +
                                "` is marked as required in " +
                                ("`" + componentName + "`, but its value is `undefined`.")
                        );
                    }
                    return null;
                } else {
                    return validate(props, propName, componentName, location, propFullName);
                }
            }

            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);

            return chainedCheckType;
        }

        function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName, secret) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== expectedType) {
                    // `propValue` being instance of, say, date/regexp, pass the 'object'
                    // check, but we can offer a more precise error message here rather than
                    // 'of type `object`'.
                    var preciseType = getPreciseType(propValue);

                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") +
                            ("`" + expectedType + "`."),
                        { expectedType: expectedType }
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunctionThatReturnsNull);
        }

        function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
                if (typeof typeChecker !== "function") {
                    return new PropTypeError(
                        "Property `" +
                            propFullName +
                            "` of component `" +
                            componentName +
                            "` has invalid PropType notation inside arrayOf."
                    );
                }
                var propValue = props[propName];
                if (!Array.isArray(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
                    );
                }
                for (var i = 0; i < propValue.length; i++) {
                    var error = typeChecker(
                        propValue,
                        i,
                        componentName,
                        location,
                        propFullName + "[" + i + "]",
                        ReactPropTypesSecret
                    );
                    if (error instanceof Error) {
                        return error;
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                if (!isValidElement(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createElementTypeTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                if (!ReactIs.isValidElementType(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" +
                                propType +
                                "` supplied to `" +
                                componentName +
                                "`, expected a single ReactElement type.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
                if (!(props[propName] instanceof expectedClass)) {
                    var expectedClassName = expectedClass.name || ANONYMOUS;
                    var actualClassName = getClassName(props[propName]);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") +
                            ("instance of `" + expectedClassName + "`.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
                if (process.env.NODE_ENV !== "production") {
                    if (arguments.length > 1) {
                        printWarning(
                            "Invalid arguments supplied to oneOf, expected an array, got " +
                                arguments.length +
                                " arguments. " +
                                "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                        );
                    } else {
                        printWarning("Invalid argument supplied to oneOf, expected an array.");
                    }
                }
                return emptyFunctionThatReturnsNull;
            }

            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                for (var i = 0; i < expectedValues.length; i++) {
                    if (is(propValue, expectedValues[i])) {
                        return null;
                    }
                }

                var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                    var type = getPreciseType(value);
                    if (type === "symbol") {
                        return String(value);
                    }
                    return value;
                });
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of value `" +
                        String(propValue) +
                        "` " +
                        ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
                );
            }
            return createChainableTypeChecker(validate);
        }

        function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
                if (typeof typeChecker !== "function") {
                    return new PropTypeError(
                        "Property `" +
                            propFullName +
                            "` of component `" +
                            componentName +
                            "` has invalid PropType notation inside objectOf."
                    );
                }
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
                    );
                }
                for (var key in propValue) {
                    if (has(propValue, key)) {
                        var error = typeChecker(
                            propValue,
                            key,
                            componentName,
                            location,
                            propFullName + "." + key,
                            ReactPropTypesSecret
                        );
                        if (error instanceof Error) {
                            return error;
                        }
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
                process.env.NODE_ENV !== "production"
                    ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.")
                    : void 0;
                return emptyFunctionThatReturnsNull;
            }

            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                if (typeof checker !== "function") {
                    printWarning(
                        "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
                            "received " +
                            getPostfixForTypeWarning(checker) +
                            " at index " +
                            i +
                            "."
                    );
                    return emptyFunctionThatReturnsNull;
                }
            }

            function validate(props, propName, componentName, location, propFullName) {
                var expectedTypes = [];
                for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                    var checker = arrayOfTypeCheckers[i];
                    var checkerResult = checker(
                        props,
                        propName,
                        componentName,
                        location,
                        propFullName,
                        ReactPropTypesSecret
                    );
                    if (checkerResult == null) {
                        return null;
                    }
                    if (checkerResult.data && has(checkerResult.data, "expectedType")) {
                        expectedTypes.push(checkerResult.data.expectedType);
                    }
                }
                var expectedTypesMessage =
                    expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` supplied to " +
                        ("`" + componentName + "`" + expectedTypesMessage + ".")
                );
            }
            return createChainableTypeChecker(validate);
        }

        function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                if (!isNode(props[propName])) {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` supplied to " +
                            ("`" + componentName + "`, expected a ReactNode.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function invalidValidatorError(componentName, location, propFullName, key, type) {
            return new PropTypeError(
                (componentName || "React class") +
                    ": " +
                    location +
                    " type `" +
                    propFullName +
                    "." +
                    key +
                    "` is invalid; " +
                    "it must be a function, usually from the `prop-types` package, but received `" +
                    type +
                    "`."
            );
        }

        function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type `" +
                            propType +
                            "` " +
                            ("supplied to `" + componentName + "`, expected `object`.")
                    );
                }
                for (var key in shapeTypes) {
                    var checker = shapeTypes[key];
                    if (typeof checker !== "function") {
                        return invalidValidatorError(
                            componentName,
                            location,
                            propFullName,
                            key,
                            getPreciseType(checker)
                        );
                    }
                    var error = checker(
                        propValue,
                        key,
                        componentName,
                        location,
                        propFullName + "." + key,
                        ReactPropTypesSecret
                    );
                    if (error) {
                        return error;
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createStrictShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type `" +
                            propType +
                            "` " +
                            ("supplied to `" + componentName + "`, expected `object`.")
                    );
                }
                // We need to check all keys in case some are required but missing from props.
                var allKeys = assign({}, props[propName], shapeTypes);
                for (var key in allKeys) {
                    var checker = shapeTypes[key];
                    if (has(shapeTypes, key) && typeof checker !== "function") {
                        return invalidValidatorError(
                            componentName,
                            location,
                            propFullName,
                            key,
                            getPreciseType(checker)
                        );
                    }
                    if (!checker) {
                        return new PropTypeError(
                            "Invalid " +
                                location +
                                " `" +
                                propFullName +
                                "` key `" +
                                key +
                                "` supplied to `" +
                                componentName +
                                "`." +
                                "\nBad object: " +
                                JSON.stringify(props[propName], null, "  ") +
                                "\nValid keys: " +
                                JSON.stringify(Object.keys(shapeTypes), null, "  ")
                        );
                    }
                    var error = checker(
                        propValue,
                        key,
                        componentName,
                        location,
                        propFullName + "." + key,
                        ReactPropTypesSecret
                    );
                    if (error) {
                        return error;
                    }
                }
                return null;
            }

            return createChainableTypeChecker(validate);
        }

        function isNode(propValue) {
            switch (typeof propValue) {
                case "number":
                case "string":
                case "undefined":
                    return true;
                case "boolean":
                    return !propValue;
                case "object":
                    if (Array.isArray(propValue)) {
                        return propValue.every(isNode);
                    }
                    if (propValue === null || isValidElement(propValue)) {
                        return true;
                    }

                    var iteratorFn = getIteratorFn(propValue);
                    if (iteratorFn) {
                        var iterator = iteratorFn.call(propValue);
                        var step;
                        if (iteratorFn !== propValue.entries) {
                            while (!(step = iterator.next()).done) {
                                if (!isNode(step.value)) {
                                    return false;
                                }
                            }
                        } else {
                            // Iterator will provide entry [k,v] tuples rather than values.
                            while (!(step = iterator.next()).done) {
                                var entry = step.value;
                                if (entry) {
                                    if (!isNode(entry[1])) {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        return false;
                    }

                    return true;
                default:
                    return false;
            }
        }

        function isSymbol(propType, propValue) {
            // Native Symbol.
            if (propType === "symbol") {
                return true;
            }

            // falsy value can't be a Symbol
            if (!propValue) {
                return false;
            }

            // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
            if (propValue["@@toStringTag"] === "Symbol") {
                return true;
            }

            // Fallback for non-spec compliant Symbols which are polyfilled.
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
                return true;
            }

            return false;
        }

        // Equivalent of `typeof` but with special handling for array and regexp.
        function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
                return "array";
            }
            if (propValue instanceof RegExp) {
                // Old webkits (at least until Android 4.0) return 'function' rather than
                // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
                // passes PropTypes.object.
                return "object";
            }
            if (isSymbol(propType, propValue)) {
                return "symbol";
            }
            return propType;
        }

        // This handles more types than `getPropType`. Only used for error messages.
        // See `createPrimitiveTypeChecker`.
        function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
                return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
                if (propValue instanceof Date) {
                    return "date";
                } else if (propValue instanceof RegExp) {
                    return "regexp";
                }
            }
            return propType;
        }

        // Returns a string that is postfixed to a warning about an invalid type.
        // For example, "undefined" or "of type array"
        function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
                case "array":
                case "object":
                    return "an " + type;
                case "boolean":
                case "date":
                case "regexp":
                    return "a " + type;
                default:
                    return type;
            }
        }

        // Returns class name of the object, if any.
        function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
                return ANONYMOUS;
            }
            return propValue.constructor.name;
        }

        ReactPropTypes.checkPropTypes = checkPropTypes;
        ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
        ReactPropTypes.PropTypes = ReactPropTypes;

        return ReactPropTypes;
    };
    return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims() {
    if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
    hasRequiredFactoryWithThrowingShims = 1;

    var ReactPropTypesSecret = requireReactPropTypesSecret();

    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction;

    factoryWithThrowingShims = function () {
        function shim(props, propName, componentName, location, propFullName, secret) {
            if (secret === ReactPropTypesSecret) {
                // It is still safe when called from React.
                return;
            }
            var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                    "Use PropTypes.checkPropTypes() to call them. " +
                    "Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
        }
        shim.isRequired = shim;
        function getShim() {
            return shim;
        } // Important!
        // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
        var ReactPropTypes = {
            array: shim,
            bigint: shim,
            bool: shim,
            func: shim,
            number: shim,
            object: shim,
            string: shim,
            symbol: shim,

            any: shim,
            arrayOf: getShim,
            element: shim,
            elementType: shim,
            instanceOf: getShim,
            node: shim,
            objectOf: getShim,
            oneOf: getShim,
            oneOfType: getShim,
            shape: getShim,
            exact: getShim,

            checkPropTypes: emptyFunctionWithReset,
            resetWarningCache: emptyFunction,
        };

        ReactPropTypes.PropTypes = ReactPropTypes;

        return ReactPropTypes;
    };
    return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
    var ReactIs = requireReactIs();

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes$2.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    propTypes$2.exports = requireFactoryWithThrowingShims()();
}

var QRCodeSvg$1 = {};

Object.defineProperty(QRCodeSvg$1, "__esModule", {
    value: true,
});

var _extends$1 =
    Object.assign ||
    function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

var _propTypes$1 = propTypesExports;

var _propTypes2$1 = _interopRequireDefault$1(_propTypes$1);

var _react$1 = React__namespace.default;

var _react2$1 = _interopRequireDefault$1(_react$1);

function _interopRequireDefault$1(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties$1(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

var propTypes$1 = {
    bgColor: _propTypes2$1.default.oneOfType([_propTypes2$1.default.object, _propTypes2$1.default.string]).isRequired,
    bgD: _propTypes2$1.default.string.isRequired,
    fgColor: _propTypes2$1.default.oneOfType([_propTypes2$1.default.object, _propTypes2$1.default.string]).isRequired,
    fgD: _propTypes2$1.default.string.isRequired,
    size: _propTypes2$1.default.number.isRequired,
    title: _propTypes2$1.default.string,
    viewBoxSize: _propTypes2$1.default.number.isRequired,
    xmlns: _propTypes2$1.default.string,
};

var defaultProps$1 = {
    title: undefined,
    xmlns: "http://www.w3.org/2000/svg",
};

var QRCodeSvg = (0, _react$1.forwardRef)(function (_ref, ref) {
    var bgColor = _ref.bgColor,
        bgD = _ref.bgD,
        fgD = _ref.fgD,
        fgColor = _ref.fgColor,
        size = _ref.size,
        title = _ref.title,
        viewBoxSize = _ref.viewBoxSize,
        props = _objectWithoutProperties$1(_ref, ["bgColor", "bgD", "fgD", "fgColor", "size", "title", "viewBoxSize"]);

    return _react2$1.default.createElement(
        "svg",
        _extends$1({}, props, {
            height: size,
            ref: ref,
            viewBox: "0 0 " + viewBoxSize + " " + viewBoxSize,
            width: size,
        }),
        title ? _react2$1.default.createElement("title", null, title) : null,
        _react2$1.default.createElement("path", { d: bgD, fill: bgColor }),
        _react2$1.default.createElement("path", { d: fgD, fill: fgColor })
    );
});

QRCodeSvg.displayName = "QRCodeSvg";
QRCodeSvg.propTypes = propTypes$1;
QRCodeSvg.defaultProps = defaultProps$1;

QRCodeSvg$1.default = QRCodeSvg;

Object.defineProperty(lib, "__esModule", {
    value: true,
});
lib.QRCode = undefined;

var _extends =
    Object.assign ||
    function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

var _QRCode = QRCode_1;

var _QRCode2 = _interopRequireDefault(_QRCode);

var _ErrorCorrectLevel = ErrorCorrectLevel;

var _ErrorCorrectLevel2 = _interopRequireDefault(_ErrorCorrectLevel);

var _propTypes = propTypesExports;

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = React__namespace.default;

var _react2 = _interopRequireDefault(_react);

var _QRCodeSvg = QRCodeSvg$1;

var _QRCodeSvg2 = _interopRequireDefault(_QRCodeSvg);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
} // A `qr.js` doesn't handle error level of zero (M) so we need to do it right, thus the deep require.

var propTypes = {
    bgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    fgColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    level: _propTypes2.default.string,
    size: _propTypes2.default.number,
    value: _propTypes2.default.string.isRequired,
};

var defaultProps = {
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    level: "L",
    size: 256,
};

var QRCode = (0, _react.forwardRef)(function (_ref, ref) {
    var bgColor = _ref.bgColor,
        fgColor = _ref.fgColor,
        level = _ref.level,
        size = _ref.size,
        value = _ref.value,
        props = _objectWithoutProperties(_ref, ["bgColor", "fgColor", "level", "size", "value"]);

    // Use type === -1 to automatically pick the best type.
    var qrcode = new _QRCode2.default(-1, _ErrorCorrectLevel2.default[level]);
    qrcode.addData(value);
    qrcode.make();
    var cells = qrcode.modules;
    return _react2.default.createElement(
        _QRCodeSvg2.default,
        _extends({}, props, {
            bgColor: bgColor,
            bgD: cells
                .map(function (row, rowIndex) {
                    return row
                        .map(function (cell, cellIndex) {
                            return !cell ? "M " + cellIndex + " " + rowIndex + " l 1 0 0 1 -1 0 Z" : "";
                        })
                        .join(" ");
                })
                .join(" "),
            fgColor: fgColor,
            fgD: cells
                .map(function (row, rowIndex) {
                    return row
                        .map(function (cell, cellIndex) {
                            return cell ? "M " + cellIndex + " " + rowIndex + " l 1 0 0 1 -1 0 Z" : "";
                        })
                        .join(" ");
                })
                .join(" "),
            ref: ref,
            size: size,
            viewBoxSize: cells.length,
        })
    );
});

lib.QRCode = QRCode;
QRCode.displayName = "QRCode";
QRCode.propTypes = propTypes;
QRCode.defaultProps = defaultProps;

var _default = (lib.default = QRCode);

var DeviceInfoSection = uiEntry.withOverride("TOTPDeviceInfoSection", function TOTPDeviceInfoSection(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "totpDeviceInfoWithQR totp-mfa deviceInfoSection" },
                    {
                        children: [
                            jsxRuntime.jsx(_default, {
                                value: props.deviceInfo.qrCodeString,
                                "data-supertokens": "totpDeviceQR",
                                level: "L",
                            }),
                            jsxRuntime.jsxs(
                                "span",
                                genericComponentOverrideContext.__assign(
                                    { "data-supertokens": "showTOTPSecret" },
                                    {
                                        children: [
                                            t("TOTP_SHOW_SECRET_START"),
                                            jsxRuntime.jsx(
                                                "button",
                                                genericComponentOverrideContext.__assign(
                                                    {
                                                        type: "button",
                                                        onClick: props.onShowSecretClicked,
                                                        "data-supertokens": "link linkButton showTOTPSecretBtn",
                                                    },
                                                    { children: t("TOTP_SHOW_SECRET_LINK") }
                                                )
                                            ),
                                            t("TOTP_SHOW_SECRET_END"),
                                        ],
                                    }
                                )
                            ),
                            props.showSecret &&
                                jsxRuntime.jsx(
                                    "span",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "totpSecret" },
                                        { children: props.deviceInfo.secret }
                                    )
                                ),
                        ],
                    }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var DeviceSetupFooter = uiEntry.withOverride("TOTPDeviceSetupFooter", function TOTPDeviceSetupFooter(_a) {
    var onSignOutClicked = _a.onSignOutClicked;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "footerLinkGroupVert totp-mfa deviceSetupFooter" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onSignOutClicked },
                        {
                            children: [
                                jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {
                                    color: "rgb(var(--palette-textPrimary))",
                                }),
                                t("TOTP_MFA_LOGOUT"),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

var DeviceSetupHeader = uiEntry.withOverride("TOTPDeviceSetupHeader", function TOTPDeviceSetupHeader(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle withBackButton totp-mfa deviceSetupHeader" },
                    {
                        children: [
                            props.showBackButton
                                ? jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked })
                                : jsxRuntime.jsx("span", {
                                      "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                  }),
                            t("TOTP_DEVICE_SETUP_HEADER_TITLE"),
                            jsxRuntime.jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle secondaryText" },
                    { children: t("TOTP_DEVICE_SETUP_HEADER_SUBTITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var TOTPMFAScreens;
(function (TOTPMFAScreens) {
    TOTPMFAScreens[(TOTPMFAScreens["DeviceSetup"] = 0)] = "DeviceSetup";
    TOTPMFAScreens[(TOTPMFAScreens["CodeVerification"] = 1)] = "CodeVerification";
    TOTPMFAScreens[(TOTPMFAScreens["Loading"] = 2)] = "Loading";
    TOTPMFAScreens[(TOTPMFAScreens["Blocked"] = 3)] = "Blocked";
    TOTPMFAScreens[(TOTPMFAScreens["AccessDenied"] = 4)] = "AccessDenied";
})(TOTPMFAScreens || (TOTPMFAScreens = {}));
var TOTPMFATheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen", "featureState"]);
    var t = translationContext.useTranslation();
    var commonProps = {
        featureState: featureState,
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: error });
        },
    };
    return activeScreen === TOTPMFAScreens.Blocked
        ? jsxRuntime.jsx(BlockedScreen, {
              nextRetryAt: featureState.nextRetryAt,
              onRetry: props.onRetryClicked,
              onSignOutClicked: props.onSignOutClicked,
          })
        : activeScreen === TOTPMFAScreens.AccessDenied
        ? jsxRuntime.jsx(sessionprebuiltui.AccessDeniedScreen, {
              error: t(featureState.error),
              useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */,
          })
        : activeScreen === TOTPMFAScreens.Loading
        ? jsxRuntime.jsx(LoadingScreen, {})
        : jsxRuntime.jsxs(
              "div",
              genericComponentOverrideContext.__assign(
                  { "data-supertokens": "container totp-mfa" },
                  {
                      children: [
                          jsxRuntime.jsx(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "row" },
                                  {
                                      children:
                                          featureState.loaded &&
                                          jsxRuntime.jsxs(React__namespace.default.Fragment, {
                                              children: [
                                                  activeScreen === TOTPMFAScreens.DeviceSetup
                                                      ? jsxRuntime.jsx(
                                                            DeviceSetupHeader,
                                                            genericComponentOverrideContext.__assign({}, commonProps, {
                                                                showBackButton: featureState.showBackButton,
                                                                onBackButtonClicked: props.onBackButtonClicked,
                                                            })
                                                        )
                                                      : jsxRuntime.jsx(
                                                            CodeVerificationHeader,
                                                            genericComponentOverrideContext.__assign({}, commonProps, {
                                                                showBackButton: featureState.showBackButton,
                                                                onBackButtonClicked: props.onBackButtonClicked,
                                                            })
                                                        ),
                                                  activeScreen === TOTPMFAScreens.DeviceSetup &&
                                                      jsxRuntime.jsx(
                                                          DeviceInfoSection,
                                                          genericComponentOverrideContext.__assign({}, commonProps, {
                                                              deviceInfo: featureState.deviceInfo,
                                                              showSecret: featureState.showSecret,
                                                              onShowSecretClicked: props.onShowSecretClicked,
                                                          })
                                                      ),
                                                  featureState.error !== undefined &&
                                                      jsxRuntime.jsx(uiEntry.GeneralError, {
                                                          error: getErrorString(featureState.error, featureState, t),
                                                      }),
                                                  jsxRuntime.jsx(
                                                      CodeForm,
                                                      genericComponentOverrideContext.__assign({}, commonProps, {
                                                          onSuccess: props.onSuccess,
                                                          footer:
                                                              activeScreen === TOTPMFAScreens.DeviceSetup
                                                                  ? jsxRuntime.jsx(
                                                                        DeviceSetupFooter,
                                                                        genericComponentOverrideContext.__assign(
                                                                            {},
                                                                            commonProps,
                                                                            { onSignOutClicked: props.onSignOutClicked }
                                                                        )
                                                                    )
                                                                  : jsxRuntime.jsx(
                                                                        CodeVerificationFooter,
                                                                        genericComponentOverrideContext.__assign(
                                                                            {},
                                                                            commonProps,
                                                                            { onSignOutClicked: props.onSignOutClicked }
                                                                        )
                                                                    ),
                                                      })
                                                  ),
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
function TOTPMFAThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === TOTPMFAScreens.Blocked) {
        activeStyle = props.config.totpMFAScreen.blockedScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.Loading) {
        activeStyle = props.config.totpMFAScreen.loadingScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.DeviceSetup) {
        activeStyle = props.config.totpMFAScreen.setupScreenStyle;
    } else if (activeScreen === TOTPMFAScreens.CodeVerification) {
        activeStyle = props.config.totpMFAScreen.verificationScreenStyle;
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
                                TOTPMFATheme,
                                genericComponentOverrideContext.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen(props) {
    if (props.featureState.isBlocked) {
        return TOTPMFAScreens.Blocked;
    } else if (props.featureState.loaded === false) {
        return TOTPMFAScreens.Loading;
    } else if (props.featureState.showAccessDenied) {
        return TOTPMFAScreens.AccessDenied;
    } else if (props.featureState.deviceInfo) {
        return TOTPMFAScreens.DeviceSetup;
    } else {
        return TOTPMFAScreens.CodeVerification;
    }
}
function getErrorString(error, state, t) {
    if (error !== "ERROR_TOTP_INVALID_CODE") {
        return error;
    }
    return (
        t(error) +
        " " +
        t("ERROR_TOTP_INVALID_CODE_RETRY_START") +
        (state.maxAttemptCount - state.currAttemptCount + 1) +
        t("ERROR_TOTP_INVALID_CODE_RETRY_END")
    );
}

var defaultTranslationsTOTP = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        {
            TOTP_SHOW_SECRET_START: "Unable to scan? Use a",
            TOTP_SHOW_SECRET_LINK: "secret key",
            TOTP_SHOW_SECRET_END: "",
            TOTP_CODE_VERIFICATION_HEADER_TITLE: "Enter TOTP",
            TOTP_CODE_VERIFICATION_HEADER_SUBTITLE:
                "Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code",
            TOTP_DEVICE_SETUP_HEADER_TITLE: "Add a TOTP device",
            TOTP_DEVICE_SETUP_HEADER_SUBTITLE:
                "Please scan the given QR code from a phone app like Google Authenticator.",
            TOTP_CODE_INPUT_LABEL: "Please enter TOTP",
            TOTP_CODE_CONTINUE_BUTTON: "Continue",
            TOTP_BLOCKED_TITLE: "Account locked",
            TOTP_BLOCKED_SUBTITLE: "Account locked due to multiple failed login attempts.",
            TOTP_MFA_BLOCKED_TIMER_START: "",
            TOTP_MFA_BLOCKED_TIMER_END: "",
            TOTP_MFA_BLOCKED_RETRY: "Try again",
            TOTP_MFA_LOGOUT: "Logout",
            ERROR_TOTP_INVALID_CODE: "Invalid TOTP. Please try again.",
            ERROR_TOTP_INVALID_CODE_RETRY_START: "",
            // \xA0 is non breaking space.
            // We add it to make sure there is no line break between the number and the rest of the sentence
            ERROR_TOTP_INVALID_CODE_RETRY_END: "\xA0attempt(s) remaining before account is temporarily locked.",
            ERROR_TOTP_UNKNOWN_DEVICE:
                "The device was deleted before verification. Please refresh the page to try again.",
            GENERAL_ERROR_TOTP_NON_STRING: "TOTP code must be of type string",
            GENERAL_ERROR_TOTP_EMPTY: "TOTP code cannot be empty",
            GENERAL_ERROR_TOTP_UNDEFINED: "Please fill your TOTP code",
        }
    ),
};

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            var _a, _b;
            switch (action.type) {
                case "load":
                    return {
                        // We want to wait for createDevice to finish before marking the page fully loaded
                        loaded: !action.callingCreateDevice,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        showBackButton: action.showBackButton,
                        showAccessDenied: action.showAccessDenied,
                        isBlocked: false,
                        showSecret: false,
                    };
                case "setBlocked":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { isBlocked: true, nextRetryAt: action.nextRetryAt, error: action.error }
                    );
                case "setError":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        {
                            loaded: true,
                            maxAttemptCount:
                                (_a = action.maxAttemptCount) !== null && _a !== void 0 ? _a : oldState.maxAttemptCount,
                            currAttemptCount:
                                (_b = action.currAttemptCount) !== null && _b !== void 0
                                    ? _b
                                    : oldState.currAttemptCount,
                            showAccessDenied: action.showAccessDenied,
                            error: action.error,
                        }
                    );
                case "createDevice":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        {
                            deviceInfo: action.deviceInfo,
                            isBlocked: false,
                            showSecret: false,
                            nextRetryAt: undefined,
                            error: undefined,
                        }
                    );
                case "showSecret":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { showSecret: true }
                    );
                case "restartFlow":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { isBlocked: false, showSecret: false, nextRetryAt: undefined, error: action.error }
                    );
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            deviceInfo: undefined,
            showSecret: false,
            isBlocked: false,
            showBackButton: false,
            showAccessDenied: false,
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
function useOnLoad(recipeImpl, dispatch, navigate, userContext) {
    var _this = this;
    var fetchMFAInfo = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe$1.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
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
                    redirectToPath,
                    alreadySetup,
                    showBackButton,
                    deviceInfo,
                    createResp;
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
                            if (!(mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true"))
                                return [3 /*break*/, 4];
                            redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    undefined,
                                    recipe.TOTP.RECIPE_ID,
                                    redirectToPath,
                                    userContext,
                                    navigate
                                ),
                            ];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _c.sent();
                            // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                            // we fall back to showing the something went wrong error
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [3 /*break*/, 4];
                        case 4:
                            alreadySetup = mfaInfo.factors.alreadySetup.includes(types.FactorIds.TOTP);
                            showBackButton =
                                mfaInfo.factors.next.length === 0 ||
                                recipe$1.getAvailableFactors(
                                    mfaInfo.factors,
                                    undefined,
                                    recipe$1.MultiFactorAuth.getInstanceOrThrow(),
                                    userContext
                                ).length !== 1;
                            if (!(doSetup || !alreadySetup)) return [3 /*break*/, 9];
                            createResp = void 0;
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            dispatch({
                                type: "load",
                                deviceInfo: undefined,
                                error: error,
                                showBackButton: showBackButton,
                                showAccessDenied: false,
                                callingCreateDevice: true,
                            });
                            return [4 /*yield*/, recipeImpl.createDevice({ userContext: userContext })];
                        case 6:
                            createResp = _c.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            _c.sent();
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [2 /*return*/];
                        case 8:
                            if (createResp.status !== "OK") {
                                dispatch({
                                    type: "setError",
                                    showAccessDenied: true,
                                    error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                                });
                                return [2 /*return*/];
                            }
                            deviceInfo = genericComponentOverrideContext.__assign({}, createResp);
                            delete deviceInfo.status;
                            _c.label = 9;
                        case 9:
                            // No need to check if the component is unmounting, since this has no effect then.
                            dispatch({
                                type: "load",
                                deviceInfo: deviceInfo,
                                error: error,
                                showBackButton: showBackButton,
                                showAccessDenied: false,
                                callingCreateDevice: false,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        [dispatch, recipeImpl, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}
function useChildProps(recipe, recipeImplementation, state, dispatch, userContext, navigate) {
    var _this = this;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    return React.useMemo(
        function () {
            return {
                onShowSecretClicked: function () {
                    dispatch({ type: "showSecret" });
                },
                onBackButtonClicked: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!state.deviceInfo) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.removeDevice({
                                            deviceName: state.deviceInfo.deviceName,
                                            userContext: userContext,
                                        }),
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
                onRetryClicked: function () {
                    dispatch({ type: "restartFlow", error: undefined });
                },
                onSignOutClicked: function () {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        return genericComponentOverrideContext.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!state.deviceInfo) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.removeDevice({
                                            deviceName: state.deviceInfo.deviceName,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    return [
                                        4 /*yield*/,
                                        types.Session.getInstanceOrThrow().signOut({ userContext: userContext }),
                                    ];
                                case 3:
                                    _a.sent();
                                    return [
                                        4 /*yield*/,
                                        uiEntry.redirectToAuth({ redirectBack: false, navigate: navigate }),
                                    ];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: function () {
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
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [state, recipeImplementation]
    );
}
var SignInUpFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var userContext = uiEntry.useUserContext();
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return getModifiedRecipeImplementation(props.recipe.webJSRecipe, dispatch);
        },
        [props.recipe]
    );
    var childProps = useChildProps(props.recipe, recipeImplementation, state, dispatch, userContext, props.navigate);
    useOnLoad(recipeImplementation, dispatch, props.navigate, userContext);
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
                            defaultStore: defaultTranslationsTOTP,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            TOTPMFAThemeWrapper,
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
                            }),
                        }
                    )
                ),
            }
        )
    );
};
function getModifiedRecipeImplementation(originalImpl, dispatch) {
    var _this = this;
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImpl), {
        createDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res, deviceInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.createDevice(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "OK") {
                                deviceInfo = genericComponentOverrideContext.__assign({}, res);
                                delete deviceInfo.status;
                                dispatch({ type: "createDevice", deviceInfo: deviceInfo });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyCode: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyCode(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "LIMIT_REACHED_ERROR") {
                                dispatch({
                                    type: "setBlocked",
                                    error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED",
                                    nextRetryAt: Date.now() + res.retryAfterMs,
                                });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_INVALID_CODE",
                                    showAccessDenied: false,
                                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                                    currAttemptCount: res.currentNumberOfFailedAttempts,
                                });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyDevice(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "LIMIT_REACHED_ERROR") {
                                dispatch({
                                    type: "setBlocked",
                                    error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED",
                                    nextRetryAt: Date.now() + res.retryAfterMs,
                                });
                            } else if (res.status === "UNKNOWN_DEVICE_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_UNKNOWN_DEVICE",
                                    showAccessDenied: true,
                                });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_INVALID_CODE",
                                    showAccessDenied: false,
                                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                                    currAttemptCount: res.currentNumberOfFailedAttempts,
                                });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        removeDevice: function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.removeDevice(input)];
                        case 1:
                            res = _a.sent();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
var DEFAULT_TOTP_PATH = "/mfa/totp";

var TOTPPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(TOTPPreBuiltUI, _super);
    function TOTPPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsTOTP;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(DEFAULT_TOTP_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("mfaTOTP", props, useComponentOverrides);
                    },
                    recipeID: recipe.TOTP.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            props,
            useComponentOverrides
        ) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
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
                                        SignInUpFeature,
                                        genericComponentOverrideContext.__assign(
                                            {
                                                recipe: _this.recipeInstance,
                                                useComponentOverrides: useComponentOverrides,
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
        };
        return _this;
    }
    // Static methods
    TOTPPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (TOTPPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.TOTP.getInstanceOrThrow();
            TOTPPreBuiltUI.instance = new TOTPPreBuiltUI(recipeInstance);
        }
        return TOTPPreBuiltUI.instance;
    };
    TOTPPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    TOTPPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    TOTPPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    TOTPPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        TOTPPreBuiltUI.instance = undefined;
        return;
    };
    TOTPPreBuiltUI.MFATOTP = function (props) {
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("mfaTOTP", props);
    };
    TOTPPreBuiltUI.MFATOTPTheme = TOTPMFAThemeWrapper;
    return TOTPPreBuiltUI;
})(uiEntry.RecipeRouter);
var MFATOTP = TOTPPreBuiltUI.MFATOTP;

exports.MFATOTP = MFATOTP;
exports.MFATOTPTheme = TOTPMFAThemeWrapper;
exports.TOTPPreBuiltUI = TOTPPreBuiltUI;
