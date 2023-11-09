"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session-shared.js");
var recipe$2 = require("./totp-shared.js");
var React = require("react");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var multifactorauth = require("./multifactorauth-shared2.js");
var recipe = require("./multifactorauth-shared.js");
var recipe$1 = require("./session-shared2.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var translations = require("./translations.js");
var translationContext = require("./translationContext.js");
var generalError = require("./emailpassword-shared.js");
var sessionprebuiltui = require("./sessionprebuiltui.js");
var formBase = require("./emailpassword-shared9.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var validators = require("./passwordless-shared3.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var backButton = require("./emailpassword-shared8.js");
var QRCode = require("react-qr-code");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("supertokens-web-js/recipe/session");
require("./session-shared3.js");
require("supertokens-web-js/recipe/totp");
require("./otpIcon.js");
require("./recipeModule-shared.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./emailpassword-shared5.js");
require("./emailpassword-shared2.js");

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
var QRCode__default = /*#__PURE__*/ _interopDefault(QRCode);

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    -webkit-animation-duration: 0.1s;\n            animation-duration: 0.1s;\n    -webkit-animation-name: animate-fade;\n            animation-name: animate-fade;\n    -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n    -webkit-animation-fill-mode: backwards;\n            animation-fill-mode: backwards;\n}\n@-webkit-keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroup"] {\n    display: flex;\n    justify-content: space-between;\n    margin-top: 20px;\n    gap: 8px;\n}\n[data-supertokens~="footerLinkGroup"] > div {\n    margin: 0;\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroup"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroup"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroup"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="container"] {\n    padding-top: 24px;\n}\n[data-supertokens~="divider"] {\n    margin-top: 32px;\n    margin-bottom: 32px;\n}\n[data-supertokens~="row"] {\n    padding-top: 16px;\n    padding-bottom: 8px;\n    width: auto;\n    margin: 0 50px;\n}\n[data-supertokens~="totpDeviceQR"] {\n    border-radius: 12px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n    padding: 16px;\n    max-width: 100px;\n    max-height: 100px;\n}\n[data-supertokens~="showTOTPSecret"] {\n    display: block;\n    color: rgb(var(--palette-textSecondary));\n    font-size: var(--font-size-0);\n    margin: 4px;\n}\n[data-supertokens~="totpSecret"] {\n    display: block;\n    border-radius: 6px;\n    padding: 12px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    font-weight: 600;\n    letter-spacing: 3.36px;\n    background: rgba(var(--palette-textLink), 0.08);\n}\n[data-supertokens~="showTOTPSecretBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="retryCodeBtn"]:disabled {\n    border: 0;\n    border-radius: 6px;\n    color: rgb(var(--palette-error));\n    background: rgb(var(--palette-errorBackground));\n}\n';

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

var RetryButton = uiEntry.withOverride("TOTPRetryButton", function TOTPRetryButton(_a) {
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
            // This runs every time the loginAttemptInfo updates, so after every resend
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
});

var TOTPBlockedScreen = function (props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
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
            { "data-supertokens": "container delayedRender" },
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
                    validate: validators.userInputCodeValidate,
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
                                    throw new STGeneralError__default.default("GENERAL_ERROR_OTP_UNDEFINED");
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
                                // We can return these statuses, since they all cause a redirection
                                // and we don't really want to show anything
                                if (
                                    response.status === "OK" ||
                                    response.status === "UNKNOWN_DEVICE_ERROR" ||
                                    response.status === "LIMIT_REACHED_ERROR"
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
        var _b, _c;
        var onSignOutClicked = _a.onSignOutClicked,
            onFactorChooserButtonClicked = _a.onFactorChooserButtonClicked;
        var claim = session.useClaimValue(multifactorauth.MultiFactorAuthClaim);
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "footerLinkGroup totpMFAVerificationFooter" },
                {
                    children: [
                        claim.loading === false &&
                            ((_c = (_b = claim.value) === null || _b === void 0 ? void 0 : _b.n.length) !== null &&
                            _c !== void 0
                                ? _c
                                : 0) > 1 &&
                            jsxRuntime.jsx(
                                "div",
                                genericComponentOverrideContext.__assign(
                                    {
                                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                                        onClick: onFactorChooserButtonClicked,
                                    },
                                    { children: t("TOTP_MFA_FOOTER_CHOOSER_ANOTHER") }
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
                                        t("TOTP_MFA_LOGOUT"),
                                    ],
                                }
                            )
                        ),
                    ],
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
                        { "data-supertokens": "headerTitle withBackButton" },
                        {
                            children: [
                                props.showBackButton
                                    ? jsxRuntime.jsx(backButton.BackButton, { onClick: props.onBackButtonClicked })
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

var DeviceInfoSection = uiEntry.withOverride("TOTPDeviceInfoSection", function TOTPDeviceInfoSection(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            jsxRuntime.jsxs(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "totpDeviceInfoWithQR" },
                    {
                        children: [
                            jsxRuntime.jsx(QRCode__default.default, {
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
                                                        onClick: props.onShowSecretClick,
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
    var _b, _c;
    var onSignOutClicked = _a.onSignOutClicked,
        onFactorChooserButtonClicked = _a.onFactorChooserButtonClicked;
    var claim = session.useClaimValue(multifactorauth.MultiFactorAuthClaim);
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "footerLinkGroup totpMFASetupFooter" },
            {
                children: [
                    claim.loading === false &&
                        ((_c = (_b = claim.value) === null || _b === void 0 ? void 0 : _b.n.length) !== null &&
                        _c !== void 0
                            ? _c
                            : 0) > 1 &&
                        jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                {
                                    "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                                    onClick: onFactorChooserButtonClicked,
                                },
                                { children: t("TOTP_MFA_FOOTER_CHOOSER_ANOTHER") }
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
                                    t("TOTP_MFA_LOGOUT"),
                                ],
                            }
                        )
                    ),
                ],
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
                    { "data-supertokens": "headerTitle withBackButton" },
                    {
                        children: [
                            props.showBackButton
                                ? jsxRuntime.jsx(backButton.BackButton, { onClick: props.onBackButtonClicked })
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
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = genericComponentOverrideContext.__rest(_a, ["activeScreen", "featureState"]);
    var t = translationContext.useTranslation();
    var commonProps = {
        featureState: featureState,
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", error: error });
        },
    };
    return activeScreen === TOTPMFAScreens.Blocked
        ? jsxRuntime.jsx(BlockedScreen, { nextRetryAt: featureState.nextRetryAt, onRetry: props.onRetryClicked })
        : activeScreen === TOTPMFAScreens.AccessDenied
        ? jsxRuntime.jsx(sessionprebuiltui.AccessDeniedScreen, { error: t(featureState.error), useShadowDom: false })
        : activeScreen === TOTPMFAScreens.Loading
        ? jsxRuntime.jsx(LoadingScreen, {})
        : jsxRuntime.jsxs(
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
                                                              onShowSecretClick: props.onShowSecretClick,
                                                          })
                                                      ),
                                                  featureState.error !== undefined &&
                                                      jsxRuntime.jsx(generalError.GeneralError, {
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
                                                                            {
                                                                                onFactorChooserButtonClicked:
                                                                                    props.onFactorChooserButtonClicked,
                                                                                onSignOutClicked:
                                                                                    props.onSignOutClicked,
                                                                            }
                                                                        )
                                                                    )
                                                                  : jsxRuntime.jsx(
                                                                        CodeVerificationFooter,
                                                                        genericComponentOverrideContext.__assign(
                                                                            {},
                                                                            commonProps,
                                                                            {
                                                                                onFactorChooserButtonClicked:
                                                                                    props.onFactorChooserButtonClicked,
                                                                                onSignOutClicked:
                                                                                    props.onSignOutClicked,
                                                                            }
                                                                        )
                                                                    ),
                                                      })
                                                  ),
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
function TOTPMFAThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
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
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
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
function getActiveScreen(props) {
    if (props.featureState.isBlocked) {
        return TOTPMFAScreens.Blocked;
    } else if (props.featureState.loaded === false) {
        return TOTPMFAScreens.Loading;
    } else if (props.featureState.error === "TOTP_MFA_NOT_ALLOWED_TO_SETUP") {
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
        (state.maxAttemptCount - state.currAttemptCount) +
        t("ERROR_TOTP_INVALID_CODE_RETRY_END")
    );
}

var defaultTranslationsTOTP = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
        {
            TOTP_SHOW_SECRET_START: "Unable to scan? Use a secret key",
            TOTP_SHOW_SECRET_LINK: "secret key",
            TOTP_SHOW_SECRET_END: "",
            TOTP_CODE_VERIFICATION_HEADER_TITLE: "Enter TOTP",
            TOTP_CODE_VERIFICATION_HEADER_SUBTITLE:
                "Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code",
            TOTP_DEVICE_SETUP_HEADER_TITLE: "Enable TOTP",
            TOTP_DEVICE_SETUP_HEADER_SUBTITLE:
                "Please scan the given QR code from a phone app like Google Authenticator or Authy.",
            TOTP_CODE_INPUT_LABEL: "Please enter TOTP",
            TOTP_CODE_CONTINUE_BUTTON: "Continue",
            TOTP_BLOCKED_TITLE: "Account locked",
            TOTP_BLOCKED_SUBTITLE: "Account locked due to multiple failed login attempts.",
            TOTP_MFA_BLOCKED_TIMER_START: "",
            TOTP_MFA_BLOCKED_TIMER_END: "",
            TOTP_MFA_BLOCKED_RETRY: "Try again",
            TOTP_MFA_LOGOUT: "Logout",
            TOTP_MFA_FOOTER_CHOOSER_ANOTHER: "Choose another factor",
            ERROR_TOTP_INVALID_CODE: "Invalid TOTP. Please try again.",
            ERROR_TOTP_INVALID_CODE_RETRY_START: "",
            // \xA0 is non breaking space.
            // We add it to make sure there is no line break between the number and the rest of the sentence
            ERROR_TOTP_INVALID_CODE_RETRY_END: "\xA0attempt(s) remaining before account is temporarily locked.",
            ERROR_TOTP_UNKNOWN_DEVICE: "The device was deleted before verification",
            GENERAL_ERROR_OTP_UNDEFINED: "Please fill your TOTP",
            TOTP_MFA_NOT_ALLOWED_TO_SETUP: "You are not allowed to set up TOTP.",
        }
    ),
};

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        showBackButton: action.showBackButton,
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
                        { error: action.error }
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
        },
        function (initArg) {
            var error = undefined;
            var errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
            var messageQueryParam = genericComponentOverrideContext.getQueryParams("message");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "restart_link") {
                    error = "ERROR_SIGN_IN_UP_LINK";
                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                    error = messageQueryParam;
                }
            }
            return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, initArg), {
                error: error,
            });
        }
    );
};
function useOnLoad(recipeImpl, dispatch, userContext) {
    var _this = this;
    var fetchMFAInfo = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.getMFAInfo({
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [userContext]
    );
    var handleLoadError = React__namespace.useCallback(
        // TODO: Test this, it may show an empty screen in many cases
        function () {
            return dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
        },
        [dispatch]
    );
    var onLoad = React__namespace.useCallback(
        function (mfaInfo) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var error,
                    errorQueryParam,
                    messageQueryParam,
                    doSetup,
                    isAllowedToSetup,
                    isAlreadySetup,
                    deviceInfo,
                    createResp,
                    mfaClaim,
                    nextLength,
                    showBackButton;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            error = undefined;
                            errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
                            messageQueryParam = genericComponentOverrideContext.getQueryParams("message");
                            doSetup = genericComponentOverrideContext.getQueryParams("setup");
                            if (errorQueryParam !== null) {
                                if (errorQueryParam === "signin") {
                                    error = "SOMETHING_WENT_WRONG_ERROR";
                                } else if (errorQueryParam === "restart_link") {
                                    error = "ERROR_SIGN_IN_UP_LINK";
                                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                                    error = messageQueryParam;
                                }
                            }
                            isAllowedToSetup = mfaInfo.factors.isAllowedToSetup.includes("totp");
                            isAlreadySetup = mfaInfo.factors.isAlreadySetup.includes("totp");
                            if (!isAllowedToSetup && !isAlreadySetup) {
                                dispatch({
                                    type: "load",
                                    deviceInfo: undefined,
                                    showBackButton: true,
                                    error: "TOTP_MFA_NOT_ALLOWED_TO_SETUP",
                                });
                                return [2 /*return*/];
                            }
                            if (doSetup && !isAllowedToSetup) {
                                dispatch({
                                    type: "load",
                                    deviceInfo: undefined,
                                    showBackButton: true,
                                    error: "TOTP_MFA_NOT_ALLOWED_TO_SETUP",
                                });
                                return [2 /*return*/];
                            }
                            if (!(isAllowedToSetup && (doSetup || !isAlreadySetup))) return [3 /*break*/, 2];
                            return [4 /*yield*/, recipeImpl.createDevice({ userContext: userContext })];
                        case 1:
                            createResp = _b.sent();
                            if ((createResp === null || createResp === void 0 ? void 0 : createResp.status) !== "OK") {
                                throw new Error("TOTP device creation failed with duplicate name; should never happen");
                            }
                            deviceInfo = genericComponentOverrideContext.__assign({}, createResp);
                            delete deviceInfo.status;
                            _b.label = 2;
                        case 2:
                            return [
                                4 /*yield*/,
                                recipe$1.Session.getInstanceOrThrow().getClaimValue({
                                    claim: multifactorauth.MultiFactorAuthClaim,
                                    userContext: userContext,
                                }),
                            ];
                        case 3:
                            mfaClaim = _b.sent();
                            nextLength =
                                (_a = mfaClaim === null || mfaClaim === void 0 ? void 0 : mfaClaim.n.length) !== null &&
                                _a !== void 0
                                    ? _a
                                    : 0;
                            showBackButton = nextLength !== 1;
                            // No need to check if the component is unmounting, since this has no effect then.
                            dispatch({
                                type: "load",
                                deviceInfo: deviceInfo,
                                error: error,
                                showBackButton: showBackButton,
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
function useChildProps(recipe$2, recipeImplementation, state, dispatch, userContext, history) {
    var _this = this;
    return React.useMemo(
        function () {
            return {
                onShowSecretClick: function () {
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
                                    // If we don't have history available this would mean we are not using react-router-dom, so we use window's history
                                    if (history === undefined) {
                                        return [
                                            2 /*return*/,
                                            windowHandler.WindowHandlerReference.getReferenceOrThrow()
                                                .windowHandler.getWindowUnsafe()
                                                .history.back(),
                                        ];
                                    }
                                    // If we do have history and goBack function on it this means we are using react-router-dom v5 or lower
                                    if (history.goBack !== undefined) {
                                        return [2 /*return*/, history.goBack()];
                                    }
                                    // If we reach this code this means we are using react-router-dom v6
                                    return [2 /*return*/, history(-1)];
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
                                    return [
                                        4 /*yield*/,
                                        recipe$1.Session.getInstanceOrThrow().signOut({ userContext: userContext }),
                                    ];
                                case 1:
                                    _a.sent();
                                    if (!state.deviceInfo) return [3 /*break*/, 3];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.removeDevice({
                                            deviceName: state.deviceInfo.deviceName,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    return [
                                        4 /*yield*/,
                                        uiEntry.redirectToAuth({ redirectBack: false, history: history }),
                                    ];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onFactorChooserButtonClicked: function () {
                    return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(false, history);
                },
                onSuccess: function () {
                    var redirectToPath = genericComponentOverrideContext.getRedirectToPathFromURL();
                    var redirectInfo =
                        redirectToPath === undefined
                            ? undefined
                            : {
                                  rid: "totp",
                                  successRedirectContext: {
                                      action: "SUCCESS",
                                      redirectToPath: redirectToPath,
                                      userContext: userContext,
                                  },
                              };
                    return recipe$1.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        redirectInfo,
                        userContext,
                        history
                    );
                },
                recipeImplementation: recipeImplementation,
                config: recipe$2.config,
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
    var childProps = useChildProps(props.recipe, recipeImplementation, state, dispatch, userContext, props.history);
    useOnLoad(recipeImplementation, dispatch, userContext);
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsTOTP },
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
                var additionalDeviceInfo, res, deviceInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            additionalDeviceInfo = {
                                redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createDevice(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        {
                                            userContext: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, input.userContext),
                                                { additionalDeviceInfo: additionalDeviceInfo }
                                            ),
                                        }
                                    )
                                ),
                            ];
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
                                    maxAttemptCount: res.maximumTOTPAttemptCount,
                                    currAttemptCount: res.failedTOTPAttemptCount,
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
                                dispatch({ type: "restartFlow", error: "ERROR_TOTP_UNKNOWN_DEVICE" });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_INVALID_CODE",
                                    maxAttemptCount: res.maximumTOTPAttemptCount,
                                    currAttemptCount: res.failedTOTPAttemptCount,
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

var TOTPPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(TOTPPreBuiltUI, _super);
    function TOTPPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$2.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe$2.DEFAULT_TOTP_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("mfaTOTP", props, useComponentOverrides);
                    },
                    recipeID: recipe$2.TOTP.RECIPE_ID,
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
                useComponentOverrides = recipe$2.useContext;
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
            var recipeInstance = recipe$2.TOTP.getInstanceOrThrow();
            TOTPPreBuiltUI.instance = new TOTPPreBuiltUI(recipeInstance);
        }
        return TOTPPreBuiltUI.instance;
    };
    TOTPPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$2.useContext;
        }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    TOTPPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe$2.useContext;
        }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
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
