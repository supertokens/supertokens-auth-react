"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var React = require("react");
var index = require("./index3.js");
require("./index.js");
var translationContext = require("./translationContext.js");
var recipe = require("./passwordless-shared.js");
var thirdparty = require("./thirdparty-shared.js");
require("./recipe.js");
require("./session-shared2.js");
require("./index2.js");
require("react-dom");
require("./utils.js");
require("./arrowLeftIcon.js");
require("./emailpassword-shared.js");
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
function normaliseThirdPartyPasswordlessConfig(config) {
    var _a;
    const disablePasswordless = config.disablePasswordless === true;
    const disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }
    const override = Object.assign(
        { functions: (originalImplementation) => originalImplementation, components: {} },
        config.override
    );
    const thirdPartyProviderAndEmailOrPhoneFormStyle =
        ((_a = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _a === void 0
            ? void 0
            : _a.thirdPartyProviderAndEmailOrPhoneFormStyle) === undefined
            ? ""
            : config === null || config === void 0
            ? void 0
            : config.signInUpFeature.thirdPartyProviderAndEmailOrPhoneFormStyle;
    return Object.assign(Object.assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
        thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyUserInput: disableThirdParty
            ? undefined
            : {
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: Object.assign(Object.assign({}, config.signInUpFeature), {
                      style: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  oAuthCallbackScreen: config.oAuthCallbackScreen,
                  useShadowDom: config.useShadowDom,
                  override: {
                      components: override.components,
                  },
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
                  signInUpFeature: Object.assign(Object.assign({}, config.signInUpFeature), {
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {
                      components: override.components,
                  },
              },
        override,
    });
}

/*
 * Component.
 */
const Header = index.withOverride("ThirdPartyPasswordlessHeader", function ThirdPartyPasswordlessHeader() {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 250, 250, 250;\n    --palette-selectedBackground: 238, 238, 238;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-success-bg: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-error-bg: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 33, 33, 33;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-error-bg));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-success-bg));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(1.1);\n            filter: brightness(1.1);\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    -webkit-animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n            animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n[data-supertokens~="codeInputLabelWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="resendCodeBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="resendCodeBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="resendCodeBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputWrapper"] .iti {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n[data-supertokens~="thirdPartyPasswordlessDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="thirdPartyPasswordlessDividerText"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n[data-supertokens~="providerButton"] {\n    margin: auto !important;\n    max-width: 240px !important;\n}\n[data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px !important;\n}\n';

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

const SignInUpTheme = (props) => {
    const t = translationContext.useTranslation();
    if (props.activeScreen === recipe.SignInUpScreens.CloseTab) {
        return jsxRuntime.jsx(recipe.CloseTabScreen, Object.assign({}, props.pwlessChildProps));
    } else if (props.activeScreen === recipe.SignInUpScreens.LinkSent) {
        return jsxRuntime.jsx(
            recipe.LinkSent,
            Object.assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return jsxRuntime.jsxs(
        "div",
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children:
                                    (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                                    jsxRuntime.jsxs(React__namespace.Fragment, {
                                        children: [
                                            props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeFormHeader,
                                                      Object.assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          { loginAttemptInfo: props.pwlessState.loginAttemptInfo }
                                                      )
                                                  )
                                                : jsxRuntime.jsx(Header, {}),
                                            props.commonState.error &&
                                                jsxRuntime.jsx(index.GeneralError, { error: props.commonState.error }),
                                            props.tpChildProps !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsx(
                                                    thirdparty.ProvidersForm,
                                                    Object.assign({}, props.tpChildProps, {
                                                        featureState: props.tpState,
                                                        dispatch: props.tpDispatch,
                                                    })
                                                ),
                                            props.thirdPartyRecipe !== undefined &&
                                                props.passwordlessRecipe !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsxs(
                                                    "div",
                                                    Object.assign(
                                                        { "data-supertokens": "thirdPartyPasswordlessDivider" },
                                                        {
                                                            children: [
                                                                jsxRuntime.jsx("div", {
                                                                    "data-supertokens": "divider",
                                                                }),
                                                                jsxRuntime.jsx(
                                                                    "div",
                                                                    Object.assign(
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
                                                      Object.assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.PhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.PhoneForm,
                                                      Object.assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.EmailOrPhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.EmailOrPhoneForm,
                                                      Object.assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeForm,
                                                      Object.assign(
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
                    jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
function SignInUpThemeWrapper(props) {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    // By defining it in a single object here TSC can deduce the connection between props
    const childProps =
        props.passwordlessRecipe !== undefined && props.pwlessChildProps !== undefined
            ? Object.assign(Object.assign({}, props), {
                  activeScreen: recipe.getActiveScreen({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              })
            : Object.assign(Object.assign({}, props), {
                  activeScreen: undefined,
                  passwordlessRecipe: undefined,
                  pwlessChildProps: undefined,
              });
    let activeStyle;
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
        Object.assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
            { children: jsxRuntime.jsx(SignInUpTheme, Object.assign({}, childProps)) }
        )
    );
}
// Simple convenience function
function getCommonPwlessProps(childProps, props) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: () => props.pwlessDispatch({ type: "setError", error: undefined }),
        onError: (error) => props.pwlessDispatch({ type: "setError", error }),
        error: props.pwlessState.error,
    };
}

const defaultTranslationsThirdPartyPasswordless = {
    en: Object.assign(
        Object.assign(
            Object.assign({}, thirdparty.defaultTranslationsThirdParty.en),
            recipe.defaultTranslationsPasswordless.en
        ),
        {
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR: "or",
        }
    ),
};

const SignInAndUp$1 = (props) => {
    var _a;
    const [tpState, tpDispatch] = thirdparty.useFeatureReducer();
    const userContext = sessionAuth.useUserContext();
    const [pwlessState, pwlessDispatch] = recipe.useFeatureReducer(
        (_a = props.recipe.passwordlessRecipe) === null || _a === void 0 ? void 0 : _a.recipeImpl,
        userContext
    );
    const [combinedState, dispatch] = React__namespace.useReducer(
        (state, action) => {
            switch (action.type) {
                // Intentionally fall through, both of these should clear the error
                case "startLogin":
                case "resendCode":
                    return Object.assign(Object.assign({}, state), { error: undefined });
                case "load":
                    if (action.loginAttemptInfo !== undefined) {
                        return Object.assign(Object.assign({}, state), { error: action.error });
                    }
                    return Object.assign(Object.assign({}, state), {
                        error: state.error !== undefined ? state.error : action.error,
                    });
                // Intentionally fall through, both of these should set the error
                case "restartFlow":
                case "setError":
                    return Object.assign(Object.assign({}, state), { error: action.error });
                default:
                    return state;
            }
        },
        { error: undefined },
        () => {
            // Here we want to select the more specific error message
            let error = tpState.error;
            if (
                // If we have an error in pwless and
                pwlessState.error !== undefined &&
                // either we didn't have one in thirdparty or it was the default one
                (error === undefined || error === "SOMETHING_WENT_WRONG_ERROR")
            ) {
                error = pwlessState.error;
            }
            return {
                error,
            };
        }
    );
    const combinedTPDispatch = React__namespace.useCallback(
        (action) => {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    const tpChildProps = thirdparty.useChildProps(props.recipe.thirdPartyRecipe);
    const combinedPwlessDispatch = React__namespace.useCallback(
        (action) => {
            dispatch(action);
            pwlessDispatch(action);
        },
        [pwlessDispatch, dispatch]
    );
    const callingConsumeCodeRef = recipe.useSuccessInAnotherTabChecker(
        pwlessState,
        combinedPwlessDispatch,
        userContext
    );
    const pwlessChildProps = recipe.useChildProps(
        props.recipe.passwordlessRecipe,
        combinedPwlessDispatch,
        pwlessState,
        callingConsumeCodeRef,
        userContext,
        props.history
    );
    const componentOverrides = props.recipe.config.override.components;
    const childProps = {
        passwordlessRecipe: props.recipe.passwordlessRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps,
        pwlessState,
        pwlessDispatch: combinedPwlessDispatch,
        pwlessChildProps,
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
                            defaultStore: defaultTranslationsThirdPartyPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInUpThemeWrapper, Object.assign({}, childProps)),
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
    const passwordlessImpl = recipe.getRecipeImplementation(Object.assign({}, recipeInput));
    const thirdPartyImpl = thirdparty.getRecipeImplementation(Object.assign({}, recipeInput));
    return {
        consumePasswordlessCode(input) {
            return passwordlessImpl.consumeCode.bind(getRecipeImplementation$2(this))(input);
        },
        createPasswordlessCode(input) {
            return passwordlessImpl.createCode.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist(input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return passwordlessImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input);
            });
        },
        resendPasswordlessCode(input) {
            return passwordlessImpl.resendCode.bind(getRecipeImplementation$2(this))(input);
        },
        clearPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.getLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        setPasswordlessLoginAttemptInfo(input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLinkCodeFromURL(input) {
            return passwordlessImpl.getLinkCodeFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL(input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getAuthorisationURLFromBackend: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return thirdPartyImpl.getAuthorisationURLFromBackend.bind(getRecipeImplementation$1(this))(input);
            });
        },
        thirdPartySignInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input);
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

class ThirdPartyPasswordless extends authWidgetWrapper.AuthRecipe {
    constructor(config, recipes) {
        super(normaliseThirdPartyPasswordlessConfig(config));
        this.getFeatures = () => {
            var _a, _b;
            let features = {};
            if (this.passwordlessRecipe !== undefined) {
                features = Object.assign(Object.assign({}, features), this.passwordlessRecipe.getFeatures());
            }
            if (this.thirdPartyRecipe !== undefined) {
                features = Object.assign(Object.assign({}, features), this.thirdPartyRecipe.getFeatures());
            }
            if (
                (this.config.passwordlessUserInput !== undefined &&
                    ((_a = this.config.passwordlessUserInput.signInUpFeature) === null || _a === void 0
                        ? void 0
                        : _a.disableDefaultUI) !== true) ||
                (this.config.thirdpartyUserInput !== undefined &&
                    ((_b = this.config.thirdpartyUserInput.signInAndUpFeature) === null || _b === void 0
                        ? void 0
                        : _b.disableDefaultUI) !== true)
            ) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (prop) => this.getFeatureComponent("signInUp", prop),
                };
            }
            return Object.assign({}, features);
        };
        this.getDefaultRedirectionURL = (context) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        this.getFeatureComponent = (componentName, props) => {
            if (componentName === "signInUp") {
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
            } else if (componentName === "linkClickedScreen") {
                if (this.passwordlessRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return this.passwordlessRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                throw new Error("Should never come here.");
            }
        };
        {
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
        this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : this.config.passwordlessUserInput === undefined
                ? undefined
                : new recipe.Passwordless(
                      Object.assign(Object.assign({}, this.config.passwordlessUserInput), {
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                          override: Object.assign(Object.assign({}, this.config.passwordlessUserInput.override), {
                              functions: () => getRecipeImplementation$2(this.recipeImpl),
                          }),
                      })
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.thirdpartyUserInput === undefined
                ? undefined
                : new thirdparty.ThirdParty(
                      Object.assign(Object.assign({}, this.config.thirdpartyUserInput), {
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                          override: Object.assign(Object.assign({}, this.config.thirdpartyUserInput.override), {
                              functions: () => getRecipeImplementation$1(this.recipeImpl),
                          }),
                      })
                  );
    }
    /*
     * Static methods.
     */
    static init(config) {
        return (appInfo) => {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: ThirdPartyPasswordless.RECIPE_ID }),
                {
                    passwordlessInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyPasswordless.instance;
        };
    }
    static getInstanceOrThrow() {
        if (ThirdPartyPasswordless.instance === undefined) {
            let error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    }
}
ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";

class Wrapper {
    static init(config) {
        return ThirdPartyPasswordless.init(config);
    }
    static signOut(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().signOut({
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            });
        });
    }
    static redirectToThirdPartyLogin(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipeInstance = ThirdPartyPasswordless.getInstanceOrThrow();
            if (recipeInstance.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
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
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static thirdPartySignInAndUp(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static getThirdPartyStateAndOtherInfoFromStorage(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyStateAndOtherInfoFromStorage(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static setThirdPartyStateAndOtherInfoToStorage(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setThirdPartyStateAndOtherInfoToStorage(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static generateThirdPartyStateToSendToOAuthProvider(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.generateThirdPartyStateToSendToOAuthProvider(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static verifyAndGetThirdPartyStateOrThrowError(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.verifyAndGetThirdPartyStateOrThrowError(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getThirdPartyAuthCodeFromURL(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthCodeFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getThirdPartyAuthErrorFromURL(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthErrorFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getThirdPartyAuthStateFromURL(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthStateFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static createPasswordlessCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
            if (recipe$1.passwordlessRecipe === undefined) {
                throw new Error(
                    "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return recipe.createCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                })
            );
        });
    }
    static resendPasswordlessCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
            if (recipe$1.passwordlessRecipe === undefined) {
                throw new Error(
                    "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return recipe.resendCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                })
            );
        });
    }
    static consumePasswordlessCode(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            const recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
            if (recipe$1.passwordlessRecipe === undefined) {
                throw new Error(
                    "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return recipe.consumeCode(
                Object.assign(Object.assign({}, input), {
                    recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                })
            );
        });
    }
    static getPasswordlessLinkCodeFromURL(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLinkCodeFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static getPasswordlessPreAuthSessionIdFromURL(input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessPreAuthSessionIdFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
    static doesPasswordlessUserEmailExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserEmailExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static doesPasswordlessUserPhoneNumberExist(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserPhoneNumberExist(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                })
            );
        });
    }
    static getPasswordlessLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static setPasswordlessLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setPasswordlessLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static clearPasswordlessLoginAttemptInfo(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.clearPasswordlessLoginAttemptInfo(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
}
Wrapper.Google = thirdparty.Google;
Wrapper.Apple = thirdparty.Apple;
Wrapper.Facebook = thirdparty.Facebook;
Wrapper.Github = thirdparty.Github;
Wrapper.SignInAndUp = (prop = {}) => ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
Wrapper.SignInAndUpTheme = SignInUpThemeWrapper;
Wrapper.ThirdPartySignInAndUpCallback = (prop) =>
    ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
Wrapper.PasswordlessLinkClickedTheme = recipe.LinkClickedScreen;
Wrapper.PasswordlessLinkClicked = (prop) =>
    ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
const init = Wrapper.init;
const signOut = Wrapper.signOut;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const getThirdPartyStateAndOtherInfoFromStorage = Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
const setThirdPartyStateAndOtherInfoToStorage = Wrapper.setThirdPartyStateAndOtherInfoToStorage;
const getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
const generateThirdPartyStateToSendToOAuthProvider = Wrapper.generateThirdPartyStateToSendToOAuthProvider;
const verifyAndGetThirdPartyStateOrThrowError = Wrapper.verifyAndGetThirdPartyStateOrThrowError;
const getThirdPartyAuthCodeFromURL = Wrapper.getThirdPartyAuthCodeFromURL;
const getThirdPartyAuthErrorFromURL = Wrapper.getThirdPartyAuthErrorFromURL;
const getThirdPartyAuthStateFromURL = Wrapper.getThirdPartyAuthStateFromURL;
const createPasswordlessCode = Wrapper.createPasswordlessCode;
const resendPasswordlessCode = Wrapper.resendPasswordlessCode;
const consumePasswordlessCode = Wrapper.consumePasswordlessCode;
const getPasswordlessLinkCodeFromURL = Wrapper.getPasswordlessLinkCodeFromURL;
const getPasswordlessPreAuthSessionIdFromURL = Wrapper.getPasswordlessPreAuthSessionIdFromURL;
const doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
const doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
const getPasswordlessLoginAttemptInfo = Wrapper.getPasswordlessLoginAttemptInfo;
const setPasswordlessLoginAttemptInfo = Wrapper.setPasswordlessLoginAttemptInfo;
const clearPasswordlessLoginAttemptInfo = Wrapper.clearPasswordlessLoginAttemptInfo;
const SignInAndUp = Wrapper.SignInAndUp;
const ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
const PasswordlessLinkClicked = Wrapper.PasswordlessLinkClicked;

exports.Apple = thirdparty.Apple;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Google = thirdparty.Google;
exports.PasswordlessLinkClicked = PasswordlessLinkClicked;
exports.SignInAndUp = SignInAndUp;
exports.SignInUpTheme = SignInUpThemeWrapper;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
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
