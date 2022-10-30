"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var authRecipe = require("./authRecipe-shared.js");
var React = require("react");
var querier = require("./querier.js");
require("./index.js");
var translationContext = require("./translationContext.js");
var recipe = require("./passwordless-shared.js");
var thirdparty = require("./thirdparty-shared.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
require("react-dom");
require("./utils.js");
require("./emailpassword-shared3.js");
require("./emailpassword-shared.js");

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
    var disablePasswordless = config.disablePasswordless === true;
    var disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }
    var override = assets.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
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
    return assets.__assign(assets.__assign({}, authRecipe.normaliseAuthRecipe(config)), {
        thirdPartyProviderAndEmailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyUserInput: disableThirdParty
            ? undefined
            : {
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: assets.__assign(assets.__assign({}, config.signInUpFeature), {
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
                  palette: config.palette,
                  preAPIHook: config.preAPIHook,
                  useShadowDom: config.useShadowDom,
                  signInUpFeature: assets.__assign(assets.__assign({}, config.signInUpFeature), {
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {
                      components: override.components,
                  },
              },
        override: override,
    });
}

/*
 * Component.
 */
var Header = querier.withOverride("ThirdPartyPasswordlessHeader", function ThirdPartyPasswordlessHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                assets.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: white;\n    --palette-inputBackground: #fafafa;\n    --palette-inputBorder: #fafafa;\n    --palette-selectedBackground: #eeeeee;\n    --palette-primary: #ff9b33;\n    --palette-primaryBorder: #ee8d23;\n    --palette-success: #41a700;\n    --palette-error: #ff1717;\n    --palette-textTitle: #222222;\n    --palette-textLabel: #222222;\n    --palette-textInput: #222222;\n    --palette-textPrimary: #656565;\n    --palette-textLink: #0076ff;\n    --palette-buttonText: white;\n    --palette-superTokensBrandingBackground: #f2f5f6;\n    --palette-superTokensBrandingText: #adbdc4;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: Rubik, sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: var(--palette-background);\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: var(--palette-superTokensBrandingBackground);\n    color: var(--palette-superTokensBrandingText);\n    text-decoration: none;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: var(--palette-error-bg);\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: var(--palette-error);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    overflow-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: var(--palette-textTitle);\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: var(--palette-textLink);\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: var(--palette-textLabel);\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: var(--palette-textPrimary);\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: var(--palette-success);\n    font-size: var(--font-size-1);\n    background: var(--palette-success-bg);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: var(--palette-error);\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: var(--palette-primary);\n    color: var(--palette-buttonText);\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: var(--palette-primaryBorder);\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(1.1);\n}\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: white;\n    --palette-inputBackground: #fafafa;\n    --palette-inputBorder: #fafafa;\n    --palette-selectedBackground: #eeeeee;\n    --palette-primary: #ff9b33;\n    --palette-primaryBorder: #ee8d23;\n    --palette-success: #41a700;\n    --palette-error: #ff1717;\n    --palette-textTitle: #222222;\n    --palette-textLabel: #222222;\n    --palette-textInput: #222222;\n    --palette-textPrimary: #656565;\n    --palette-textLink: #0076ff;\n    --palette-buttonText: white;\n    --palette-superTokensBrandingBackground: #f2f5f6;\n    --palette-superTokensBrandingText: #adbdc4;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: Rubik, sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: var(--palette-background);\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: var(--palette-superTokensBrandingBackground);\n    color: var(--palette-superTokensBrandingText);\n    text-decoration: none;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: var(--palette-error-bg);\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: var(--palette-error);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    overflow-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: var(--palette-textTitle);\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: var(--palette-textLink);\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: var(--palette-textLabel);\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: var(--palette-textPrimary);\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: var(--palette-success);\n    font-size: var(--font-size-1);\n    background: var(--palette-success-bg);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: var(--palette-error);\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: var(--palette-primary);\n    color: var(--palette-buttonText);\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: var(--palette-primaryBorder);\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(1.1);\n}\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: var(--palette-inputBackground);\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid var(--palette-inputBorder);\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid var(--palette-primary);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid var(--palette-error);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid var(--palette-error);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    filter: none;\n    color: var(--palette-textInput);\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: var(--palette-textInput);\n    -webkit-box-shadow: 0 0 0 30px var(--palette-inputBackground) inset;\n    box-shadow: 0 0 0 30px var(--palette-inputBackground) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: var(--palette-error);\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: var(--palette-textLabel);\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n[data-supertokens~="codeInputLabelWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n[data-supertokens~="resendCodeBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n[data-supertokens~="resendCodeBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="resendCodeBtn"]:disabled {\n    color: var(--palette-textPrimary);\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInput {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInputInput {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInputCountryIcon {\n    color: var(--palette-textInput);\n    width: calc(1em * 1.5);\n    height: 1em;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInputCountryIconImg {\n    display: block;\n    width: 100%;\n    height: 100%;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInputInternationalIconPhone {\n    opacity: 0.8;\n}\n[data-supertokens~="phoneInputLibRoot"] .PhoneInputInternationalIconGlobe {\n    opacity: 0.65;\n}\n[data-supertokens~="phoneInputCountryControl"] {\n    background-color: inherit;\n    border: none;\n    box-shadow: none;\n}\n[data-supertokens~="phoneInputCountryControl"]:hover {\n    border: none;\n    box-shadow: none;\n}\n[data-supertokens~="phoneInputCountryDropdown"] {\n    width: min(72.2vw, 320px);\n    border-radius: 6;\n    margin-left: "-15px"; /* This is to counteract the padding of the inputWrapper class */\n    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.16);\n}\n[data-supertokens~="phoneInputCountryDropdown"] > div {\n    padding-top: 0;\n}\n[data-supertokens~="phoneInputCountryOption"] {\n    display: flex;\n    align-items: center;\n    height: 34px;\n    cursor: pointer;\n\n    padding: 0 8px;\n}\n[data-supertokens~="phoneInputCountryOption"][aria-selected="true"] {\n    background: var(--palette-selectedBackground);\n}\n[data-supertokens~="phoneInputCountryOptionLabel"] {\n    color: var(--palette-textLabel);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    margin: 0 16px;\n}\n[aria-selected="true"] [data-supertokens~="phoneInputCountryOptionLabel"] {\n    color: var(--palette-textLink);\n}\n[data-supertokens~="phoneInputCountryOptionCallingCode"] {\n    color: var(--palette-textLabel);\n    opacity: 0.5;\n}\n[aria-selected="true"] [data-supertokens~="phoneInputCountryOptionCallingCode"] {\n    opacity: 1;\n}\n[data-supertokens~="phoneInputCountrySelect"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="phoneInputCountryValueContainer"] {\n    padding: 0;\n}\n[data-supertokens~="phoneInputCountryDropdownIndicator"] {\n    padding: 0 12px 0 6px;\n}\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n[data-supertokens~="container"] {\n    --palette-background: white;\n    --palette-inputBackground: #fafafa;\n    --palette-inputBorder: #fafafa;\n    --palette-selectedBackground: #eeeeee;\n    --palette-primary: #ff9b33;\n    --palette-primaryBorder: #ee8d23;\n    --palette-success: #41a700;\n    --palette-error: #ff1717;\n    --palette-textTitle: #222222;\n    --palette-textLabel: #222222;\n    --palette-textInput: #222222;\n    --palette-textPrimary: #656565;\n    --palette-textLink: #0076ff;\n    --palette-buttonText: white;\n    --palette-superTokensBrandingBackground: #f2f5f6;\n    --palette-superTokensBrandingText: #adbdc4;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: Rubik, sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: var(--palette-background);\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: var(--palette-superTokensBrandingBackground);\n    color: var(--palette-superTokensBrandingText);\n    text-decoration: none;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: var(--palette-error-bg);\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: var(--palette-error);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    overflow-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: var(--palette-textTitle);\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: var(--palette-textLink);\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: var(--palette-textLabel);\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: var(--palette-textPrimary);\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: var(--palette-success);\n    font-size: var(--font-size-1);\n    background: var(--palette-success-bg);\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: var(--palette-error);\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: var(--palette-primary);\n    color: var(--palette-buttonText);\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: var(--palette-primaryBorder);\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    filter: brightness(1.1);\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 34px;\n    height: auto !important;\n    display: flex;\n    flex-direction: row;\n    padding: 2px 0;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 40px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n    border-right: 1px solid rgba(255, 255, 255, 0.6);\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    margin: auto;\n    text-align: center;\n    justify-content: center;\n}\n[data-supertokens~="providerGoogle"] {\n    background-color: #ea3721;\n    border-color: #d82313;\n    color: white;\n}\n[data-supertokens~="providerGitHub"] {\n    background-color: #000;\n    border-color: #000;\n    color: white;\n}\n[data-supertokens~="providerTwitter"] {\n    background-color: #274483;\n    border-color: #143875;\n    color: white;\n}\n[data-supertokens~="providerFacebook"] {\n    background-color: #008dd1;\n    border-color: #007fc2;\n    color: white;\n}\n[data-supertokens~="providerApple"] {\n    background-color: #07093c;\n    border-color: #010030;\n    color: white;\n}\n[data-supertokens~="providerCustom"] {\n    background-color: #000;\n    border-color: #000;\n    color: white;\n}\n[data-supertokens~="providerCustom"]:active {\n    outline: none;\n    background-color: #fafafa;\n    border-color: #eaeaea;\n    transition: background 0s;\n    background-size: 100%;\n}\n[data-supertokens~="providerCustom"]:focus {\n    border-color: #000;\n    outline: none;\n}\n\n[data-supertokens~="thirdPartyPasswordlessDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: var(--palette-textPrimary);\n}\n[data-supertokens~="thirdPartyPasswordlessDividerText"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n';

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

var SignInUpTheme = function (props) {
    var t = translationContext.useTranslation();
    if (props.activeScreen === recipe.SignInUpScreens.CloseTab) {
        return jsxRuntime.jsx(recipe.CloseTabScreen, assets.__assign({}, props.pwlessChildProps));
    } else if (props.activeScreen === recipe.SignInUpScreens.LinkSent) {
        return jsxRuntime.jsx(
            recipe.LinkSent,
            assets.__assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return jsxRuntime.jsxs(
        "div",
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children:
                                    (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                                    jsxRuntime.jsxs(React__namespace.Fragment, {
                                        children: [
                                            props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeFormHeader,
                                                      assets.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props),
                                                          { loginAttemptInfo: props.pwlessState.loginAttemptInfo }
                                                      )
                                                  )
                                                : jsxRuntime.jsx(Header, {}),
                                            props.commonState.error &&
                                                jsxRuntime.jsx(querier.GeneralError, {
                                                    error: props.commonState.error,
                                                }),
                                            props.tpChildProps !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsx(
                                                    thirdparty.ProvidersForm,
                                                    assets.__assign({}, props.tpChildProps, {
                                                        featureState: props.tpState,
                                                        dispatch: props.tpDispatch,
                                                    })
                                                ),
                                            props.thirdPartyRecipe !== undefined &&
                                                props.passwordlessRecipe !== undefined &&
                                                props.activeScreen !== recipe.SignInUpScreens.UserInputCodeForm &&
                                                jsxRuntime.jsxs(
                                                    "div",
                                                    assets.__assign(
                                                        { "data-supertokens": "thirdPartyPasswordlessDivider" },
                                                        {
                                                            children: [
                                                                jsxRuntime.jsx("div", {
                                                                    "data-supertokens": "divider",
                                                                }),
                                                                jsxRuntime.jsx(
                                                                    "div",
                                                                    assets.__assign(
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
                                                      assets.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.PhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.PhoneForm,
                                                      assets.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.EmailOrPhoneForm
                                                ? jsxRuntime.jsx(
                                                      recipe.EmailOrPhoneForm,
                                                      assets.__assign(
                                                          {},
                                                          getCommonPwlessProps(props.pwlessChildProps, props)
                                                      )
                                                  )
                                                : props.activeScreen === recipe.SignInUpScreens.UserInputCodeForm
                                                ? jsxRuntime.jsx(
                                                      recipe.UserInputCodeForm,
                                                      assets.__assign(
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
    var hasFont = querier.hasFontDefined(props.config.rootStyle);
    // By defining it in a single object here TSC can deduce the connection between props
    var childProps =
        props.passwordlessRecipe !== undefined && props.pwlessChildProps !== undefined
            ? assets.__assign(assets.__assign({}, props), {
                  activeScreen: recipe.getActiveScreen({
                      config: props.pwlessChildProps.config,
                      featureState: props.pwlessState,
                  }),
                  pwlessChildProps: props.pwlessChildProps,
                  passwordlessRecipe: props.passwordlessRecipe,
              })
            : assets.__assign(assets.__assign({}, props), {
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
        assets.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
            { children: jsxRuntime.jsx(SignInUpTheme, assets.__assign({}, childProps)) }
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
    en: assets.__assign(
        assets.__assign(
            assets.__assign({}, thirdparty.defaultTranslationsThirdParty.en),
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
    var userContext = authRecipe.useUserContext();
    var _c = recipe.useFeatureReducer(
            (_a = props.recipe.passwordlessRecipe) === null || _a === void 0 ? void 0 : _a.recipeImpl,
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
                        return assets.__assign(assets.__assign({}, state), { error: undefined });
                    case "load":
                        if (action.loginAttemptInfo !== undefined) {
                            return assets.__assign(assets.__assign({}, state), { error: action.error });
                        }
                        return assets.__assign(assets.__assign({}, state), {
                            error: state.error !== undefined ? state.error : action.error,
                        });
                    // Intentionally fall through, both of these should set the error
                    case "restartFlow":
                    case "setError":
                        return assets.__assign(assets.__assign({}, state), { error: action.error });
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
    var componentOverrides = props.recipe.config.override.components;
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
        querier.ComponentOverrideContext.Provider,
        assets.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    querier.FeatureWrapper,
                    assets.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsThirdPartyPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInUpThemeWrapper, assets.__assign({}, childProps)),
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
    var passwordlessImpl = recipe.getRecipeImplementation(assets.__assign({}, recipeInput));
    var thirdPartyImpl = thirdparty.getRecipeImplementation(assets.__assign({}, recipeInput));
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
            return assets.__awaiter(this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
            return assets.__awaiter(this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind(getRecipeImplementation$1(this))(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return assets.__awaiter(this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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

var ThirdPartyPasswordless = /** @class */ (function (_super) {
    assets.__extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes) {
        var _this = _super.call(this, normaliseThirdPartyPasswordlessConfig(config)) || this;
        _this.getFeatures = function () {
            var _a, _b;
            var features = {};
            if (_this.passwordlessRecipe !== undefined) {
                features = assets.__assign(assets.__assign({}, features), _this.passwordlessRecipe.getFeatures());
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = assets.__assign(assets.__assign({}, features), _this.thirdPartyRecipe.getFeatures());
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
                    new authRecipe.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: authRecipe.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signInUp", prop);
                    },
                };
            }
            return assets.__assign({}, features);
        };
        _this.getDefaultRedirectionURL = function (context) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signInUp") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        authRecipe.UserContextWrapper,
                        assets.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authRecipe.AuthWidgetWrapper,
                                    assets.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUp$1,
                                                assets.__assign({ recipe: _this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        authRecipe.UserContextWrapper,
                        assets.__assign(
                            { userContext: props.userContext },
                            { children: jsxRuntime.jsx(SignInAndUp$1, assets.__assign({ recipe: _this }, props)) }
                        )
                    );
                }
            } else if (componentName === "linkClickedScreen") {
                if (_this.passwordlessRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return _this.passwordlessRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                throw new Error("Should never come here.");
            }
        };
        {
            var builder = new authRecipe.OverrideableBuilder(
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
                      assets.__assign(assets.__assign({}, _this.config.passwordlessUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: assets.__assign(assets.__assign({}, _this.config.passwordlessUserInput.override), {
                              functions: function () {
                                  return getRecipeImplementation$2(_this.recipeImpl);
                              },
                          }),
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
                      assets.__assign(assets.__assign({}, _this.config.thirdpartyUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: assets.__assign(assets.__assign({}, _this.config.thirdpartyUserInput.override), {
                              functions: function () {
                                  return getRecipeImplementation$1(_this.recipeImpl);
                              },
                          }),
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
                assets.__assign(assets.__assign({}, config), {
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
                error = error + authRecipe.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!authRecipe.isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(authRecipe.AuthRecipe);

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return ThirdPartyPasswordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().signOut({
                        userContext: authRecipe.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return assets.__generator(this, function (_a) {
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
                        userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
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
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setThirdPartyStateAndOtherInfoToStorage = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setThirdPartyStateAndOtherInfoToStorage(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateThirdPartyStateToSendToOAuthProvider = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.generateThirdPartyStateToSendToOAuthProvider(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetThirdPartyStateOrThrowError = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.verifyAndGetThirdPartyStateOrThrowError(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthCodeFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthCodeFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthErrorFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthErrorFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthStateFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getThirdPartyAuthStateFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.createPasswordlessCode = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return assets.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.createCode(
                        assets.__assign(assets.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return assets.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.resendCode(
                        assets.__assign(assets.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumePasswordlessCode = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            var recipe$1;
            return assets.__generator(this, function (_a) {
                recipe$1 = ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$1.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe.consumeCode(
                        assets.__assign(assets.__assign({}, input), {
                            recipeImplementation: recipe$1.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLinkCodeFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessPreAuthSessionIdFromURL(
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesPasswordlessUserEmailExist = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserEmailExist(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserPhoneNumberExist(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.getPasswordlessLoginAttemptInfo(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.setPasswordlessLoginAttemptInfo(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.clearPasswordlessLoginAttemptInfo(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
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
