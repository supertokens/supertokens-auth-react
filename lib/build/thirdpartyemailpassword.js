"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var recipe = require("./emailpassword-shared2.js");
var thirdparty = require("./thirdparty-shared.js");
var translations = require("./translations.js");
var jsxRuntime = require("react/jsx-runtime");
var utils = require("./authRecipe-shared.js");
var translationContext = require("./translationContext.js");
var React = require("react");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/session/recipe");
require("./emailverification-shared.js");
require("./index.js");
require("./emailpassword-shared3.js");
require("supertokens-web-js/utils/error");
require("./emailpassword-shared.js");
require("supertokens-web-js/recipe/emailpassword/recipeImplementation");
require("./spinnerIcon.js");
require("supertokens-web-js/recipe/thirdparty/recipeImplementation");
require("react-dom");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");

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
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: rgb(var(--palette-inputBackground));\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n}\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid rgb(var(--palette-primary));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid rgb(var(--palette-error));\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: rgb(var(--palette-textInput));\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: rgb(var(--palette-textInput));\n    box-shadow: 0 0 0 30px rgb(var(--palette-inputBackground)) inset;\n}\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: rgb(var(--palette-error));\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n[data-supertokens~="thirdPartyEmailPasswordDivider"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="thirdPartyEmailPasswordDividerOr"] {\n    flex: 1 1;\n    margin-top: 0.75em;\n}\n[data-supertokens~="divider"] {\n    flex: 3 3;\n}\n[data-supertokens~="providerButton"] {\n    margin: auto !important;\n    max-width: 240px !important;\n}\n[data-supertokens~="providerButtonLeft"] {\n    margin-left: 30px !important;\n}\n';

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
var Header = translations.withOverride("ThirdPartyEmailPasswordHeader", function ThirdPartyEmailPasswordHeader(_a) {
    var isSignUp = _a.isSignUp,
        setIsSignUp = _a.setIsSignUp;
    /*
     * Render.
     */
    if (isSignUp === true) {
        return jsxRuntime.jsx(recipe.SignUpHeader, {
            onClick: function () {
                return setIsSignUp(false);
            },
        });
    } else {
        return jsxRuntime.jsx(recipe.SignInHeader, {
            onClick: function () {
                return setIsSignUp(true);
            },
        });
    }
});

var SignInAndUpTheme = function (props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(Header, {
                                        isSignUp: props.epState.isSignUp,
                                        setIsSignUp: function (isSignUp) {
                                            return props.epDispatch({ type: isSignUp ? "setSignUp" : "setSignIn" });
                                        },
                                    }),
                                    props.commonState.error &&
                                        jsxRuntime.jsx(translations.GeneralError, { error: props.commonState.error }),
                                    props.tpChildProps !== undefined &&
                                        jsxRuntime.jsx(
                                            thirdparty.ProvidersForm,
                                            sessionAuth.__assign({}, props.tpChildProps, {
                                                featureState: props.tpState,
                                                dispatch: props.tpDispatch,
                                            })
                                        ),
                                    props.config.disableEmailPassword !== true &&
                                        props.thirdPartyRecipe !== undefined &&
                                        jsxRuntime.jsxs(
                                            "div",
                                            sessionAuth.__assign(
                                                { "data-supertokens": "thirdPartyEmailPasswordDivider" },
                                                {
                                                    children: [
                                                        jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                                        jsxRuntime.jsx(
                                                            "div",
                                                            sessionAuth.__assign(
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
                                                  sessionAuth.__assign({}, props.epChildProps.signUpForm, {
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
                                                  sessionAuth.__assign({}, props.epChildProps.signInForm, {
                                                      footer: jsxRuntime.jsx(recipe.SignInFooter, {
                                                          onClick: props.epChildProps.signInForm.forgotPasswordClick,
                                                      }),
                                                  })
                                              )),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(utils.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    sessionAuth.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style],
                        },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, sessionAuth.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var defaultTranslationsThirdPartyEmailPassword = {
    en: sessionAuth.__assign(
        sessionAuth.__assign(
            sessionAuth.__assign({}, thirdparty.defaultTranslationsThirdParty.en),
            recipe.defaultTranslationsEmailPassword.en
        ),
        { THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or" }
    ),
};

var SignInAndUp$1 = function (props) {
    var _a = thirdparty.useFeatureReducer(),
        tpState = _a[0],
        tpDispatch = _a[1];
    var _b = recipe.useFeatureReducer(props.recipe.emailPasswordRecipe),
        epState = _b[0],
        epDispatch = _b[1];
    var _c = React__namespace.useReducer(
            function (state, action) {
                switch (action.type) {
                    case "setSignIn":
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: undefined });
                    case "setSignUp":
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: undefined });
                    case "setError":
                        return sessionAuth.__assign(sessionAuth.__assign({}, state), { error: action.error });
                    default:
                        return state;
                }
            },
            { error: tpState.error || epState.error }
        ),
        combinedState = _c[0],
        dispatch = _c[1];
    var recipeComponentOverrides = props.useComponentOverrides();
    var combinedTPDispatch = React__namespace.useCallback(
        function (action) {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    var tpChildProps = thirdparty.useChildProps(props.recipe.thirdPartyRecipe);
    var combinedEPDispatch = React__namespace.useCallback(
        function (action) {
            dispatch(action);
            epDispatch(action);
        },
        [epDispatch, dispatch]
    );
    var epChildProps = recipe.useChildProps(
        props.recipe.emailPasswordRecipe,
        epState,
        combinedEPDispatch,
        props.history
    );
    var childProps = {
        emailPasswordRecipe: props.recipe.emailPasswordRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState: tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps: tpChildProps,
        epState: epState,
        epDispatch: combinedEPDispatch,
        epChildProps: epChildProps,
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
                            defaultStore: defaultTranslationsThirdPartyEmailPassword,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInAndUpThemeWrapper, sessionAuth.__assign({}, childProps)),
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
    var emailpasswordImpl = recipe.getRecipeImplementation(sessionAuth.__assign({}, recipeInput));
    var thirdPartyImpl = thirdparty.getRecipeImplementation(sessionAuth.__assign({}, recipeInput));
    return {
        submitNewPassword: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.submitNewPassword.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        sendPasswordResetEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.sendPasswordResetEmail.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        doesEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        getResetPasswordTokenFromURL: function (input) {
            return emailpasswordImpl.getResetPasswordTokenFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        emailPasswordSignIn: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, emailpasswordImpl.signIn.bind(getRecipeImplementation$2(this))(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        emailPasswordSignUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, emailpasswordImpl.signUp.bind(getRecipeImplementation$2(this))(input)];
                });
            });
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
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                            getRecipeImplementation$1(this)
                        )(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
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
    var disableEmailPassword = config.disableEmailPassword === true;
    if (
        disableEmailPassword &&
        (config.signInAndUpFeature === undefined ||
            config.signInAndUpFeature.providers === undefined ||
            config.signInAndUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var signInAndUpFeature = normaliseSignInUpFeatureConfig(config.signInAndUpFeature);
    return sessionAuth.__assign(sessionAuth.__assign({}, utils.normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: config.oAuthCallbackScreen,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        disableEmailPassword: disableEmailPassword,
        override: override,
    });
}
function normaliseSignInUpFeatureConfig(config) {
    var disableDefaultUI =
        config === undefined || config.disableDefaultUI === undefined ? false : config.disableDefaultUI;
    var defaultToSignUp = config === undefined || config.defaultToSignUp === undefined ? false : config.defaultToSignUp;
    return sessionAuth.__assign(sessionAuth.__assign({}, config), {
        disableDefaultUI: disableDefaultUI,
        defaultToSignUp: defaultToSignUp,
        style: config === undefined || config.style === undefined ? "" : config.style,
    });
}

var ThirdPartyEmailPassword = /** @class */ (function (_super) {
    sessionAuth.__extends(ThirdPartyEmailPassword, _super);
    function ThirdPartyEmailPassword(config, recipes) {
        var _this = _super.call(this, normaliseThirdPartyEmailPasswordConfig(config)) || this;
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.emailPasswordRecipe !== undefined) {
                features = sessionAuth.__assign(
                    sessionAuth.__assign({}, features),
                    _this.emailPasswordRecipe.getFeatures(useComponentOverrides)
                );
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = sessionAuth.__assign(
                    sessionAuth.__assign({}, features),
                    _this.thirdPartyRecipe.getFeatures(useComponentOverrides)
                );
            }
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop, useComponentOverrides);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        if (this.emailPasswordRecipe === undefined) {
                            throw new Error("Should not come here...");
                        }
                        return [2 /*return*/, this.emailPasswordRecipe.getDefaultRedirectionURL(context)];
                    } else {
                        return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                    }
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "signinup") {
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
            } else if (componentName === "resetpassword") {
                if (_this.emailPasswordRecipe === undefined) {
                    throw new Error("Should not come here...");
                }
                return _this.emailPasswordRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
            } else {
                throw new Error("Should not come here...");
            }
        };
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
        _this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : _this.config.disableEmailPassword
                ? undefined
                : new recipe.EmailPassword({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      onHandleEvent: _this.config.onHandleEvent,
                      style: _this.config.rootStyle,
                      preAPIHook: _this.config.preAPIHook,
                      resetPasswordUsingTokenFeature: _this.config.resetPasswordUsingTokenFeature,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return getRecipeImplementation$2(_this.recipeImpl);
                          },
                      },
                  });
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.signInAndUpFeature.providers === undefined ||
                  _this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new thirdparty.ThirdParty({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      style: _this.config.rootStyle,
                      onHandleEvent: _this.config.onHandleEvent,
                      preAPIHook: _this.config.preAPIHook,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      oAuthCallbackScreen: _this.config.oAuthCallbackScreen,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return getRecipeImplementation$1(_this.recipeImpl);
                          },
                      },
                  });
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyEmailPassword.init = function (config) {
        return function (appInfo) {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                }),
                {
                    emailPasswordInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyEmailPassword.instance;
        };
    };
    ThirdPartyEmailPassword.getInstanceOrThrow = function () {
        if (ThirdPartyEmailPassword.instance === undefined) {
            var error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method." +
                "See https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyEmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyEmailPassword.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    };
    ThirdPartyEmailPassword.RECIPE_ID = "thirdpartyemailpassword";
    return ThirdPartyEmailPassword;
})(utils.AuthRecipe);

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return ThirdPartyEmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
                        userContext: sessionAuth.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignUp(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignIn(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return sessionAuth.__generator(this, function (_a) {
                recipeInstance = ThirdPartyEmailPassword.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
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
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
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
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
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
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setStateAndOtherInfoToStorage = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateStateToSendToOAuthProvider = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetStateOrThrowError = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthCodeFromURL = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthErrorFromURL = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthStateFromURL = function (input) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.Google = thirdparty.Google;
    Wrapper.Apple = thirdparty.Apple;
    Wrapper.Facebook = thirdparty.Facebook;
    Wrapper.Github = thirdparty.Github;
    Wrapper.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = SignInAndUpThemeWrapper;
    Wrapper.ThirdPartySignInAndUpCallback = function (prop) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.ResetPasswordUsingToken = function (prop) {
        return ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    };
    Wrapper.ResetPasswordUsingTokenTheme = recipe.ResetPasswordUsingTokenThemeWrapper;
    Wrapper.ThirdPartySignInAndUpCallbackTheme = thirdparty.SignInAndUpCallbackTheme;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var SignInAndUp = Wrapper.SignInAndUp;
var ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
var ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
var ThirdpartyEmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var emailPasswordSignIn = Wrapper.emailPasswordSignIn;
var emailPasswordSignUp = Wrapper.emailPasswordSignUp;
var doesEmailExist = Wrapper.doesEmailExist;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
var getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
var getAuthStateFromURL = Wrapper.getAuthStateFromURL;

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
exports.ThirdpartyEmailPasswordComponentsOverrideProvider = ThirdpartyEmailPasswordComponentsOverrideProvider;
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
