"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var uiEntry = require("./index2.js");
var componentOverrideContext = require("./session-shared.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var translationContext = require("./translationContext.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var React = require("react");
var types = require("./multifactorauth-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/session");

function ErrorRoundIcon() {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        d: "M16.0012 1.91396e-06C12.3031 0.00305404 8.72039 1.28809 5.8634 3.63622C3.00641 5.98436 1.05183 9.25034 0.33262 12.8779C-0.386594 16.5054 0.174037 20.27 1.91901 23.5306C3.66399 26.7911 6.48538 29.3459 9.90259 30.7597C13.3198 32.1734 17.1215 32.3588 20.66 31.2842C24.1986 30.2096 27.2551 27.9414 29.309 24.8661C31.3629 21.7908 32.2872 18.0985 31.9243 14.4182C31.5614 10.738 29.9338 7.29732 27.3188 4.68238C25.8323 3.19688 24.0677 2.01879 22.1258 1.21537C20.1839 0.411961 18.1027 -0.00102596 16.0012 1.91396e-06ZM16.0012 28.2352C13.1772 28.2295 10.4424 27.2451 8.26261 25.4497C6.0828 23.6542 4.59268 21.1588 4.04598 18.3881C3.49929 15.6175 3.9298 12.7431 5.26424 10.2542C6.59867 7.76533 8.75452 5.81593 11.3647 4.73791C13.9749 3.65989 16.878 3.51991 19.5798 4.3418C22.2816 5.16369 24.615 6.89663 26.1827 9.24557C27.7504 11.5945 28.4555 14.4142 28.1779 17.2246C27.9003 20.0349 26.6572 22.6622 24.6602 24.659C23.5226 25.7947 22.1723 26.6951 20.6866 27.3087C19.2008 27.9224 17.6087 28.2372 16.0012 28.2352Z",
                        fill: "#ED344E",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M21.3645 11.1053C21.1948 10.9264 20.9904 10.784 20.7639 10.6866C20.5374 10.5893 20.2934 10.5391 20.0468 10.5391C19.8003 10.5391 19.5563 10.5893 19.3298 10.6866C19.1032 10.784 18.8989 10.9264 18.7292 11.1053L15.9997 13.8348L13.3645 11.1995C13.1927 11.0207 12.9871 10.8779 12.7595 10.7795C12.5319 10.6812 12.2869 10.6292 12.039 10.6267C11.791 10.6242 11.5451 10.6711 11.3156 10.7648C11.086 10.8586 10.8775 10.9971 10.7021 11.1725C10.5268 11.3478 10.3882 11.5563 10.2945 11.7859C10.2008 12.0154 10.1538 12.2614 10.1563 12.5093C10.1589 12.7572 10.2108 13.0022 10.3092 13.2298C10.4076 13.4574 10.5504 13.6631 10.7292 13.8348L13.3645 16.47L10.7292 19.1018C10.5504 19.2735 10.4076 19.4792 10.3092 19.7068C10.2108 19.9344 10.1589 20.1793 10.1563 20.4273C10.1538 20.6752 10.2008 20.9212 10.2945 21.1507C10.3882 21.3803 10.5268 21.5888 10.7021 21.7641C10.8775 21.9395 11.086 22.078 11.3156 22.1718C11.5451 22.2655 11.791 22.3124 12.039 22.3099C12.2869 22.3074 12.5319 22.2554 12.7595 22.1571C12.9871 22.0587 13.1927 21.9159 13.3645 21.7371L15.9997 19.1018L18.6349 21.7371C18.8074 21.9128 19.0129 22.0526 19.2397 22.1484C19.4665 22.2443 19.7101 22.2942 19.9563 22.2954C20.2025 22.2966 20.4465 22.2489 20.6741 22.1553C20.9018 22.0616 21.1087 21.9238 21.2829 21.7497C21.457 21.5757 21.5949 21.3688 21.6886 21.1412C21.7823 20.9135 21.83 20.6695 21.8289 20.4233C21.8278 20.1771 21.778 19.9336 21.6822 19.7067C21.5865 19.4799 21.4467 19.2743 21.271 19.1018L18.6358 16.4666L21.271 13.8313C21.6229 13.47 21.8275 12.9904 21.8448 12.4864C21.8621 11.9823 21.6908 11.4898 21.3645 11.1053Z",
                        fill: "#ED344E",
                    }),
                ],
            }
        )
    );
}

/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "button",
        genericComponentOverrideContext.__assign(
            { onClick: onClick, "data-supertokens": "buttonBase backButton" },
            { children: t("GO_BACK") }
        )
    );
}

/*
 * Component.
 */
function LogoutButton(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "button",
        genericComponentOverrideContext.__assign(
            { onClick: onClick, "data-supertokens": "buttonBase logoutButton" },
            {
                children: [
                    jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, { color: "rgb(var(--palette-textGray))" }),
                    jsxRuntime.jsx("span", { children: t("LOGOUT") }),
                ],
            }
        )
    );
}

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n\n/*\n * Default styles.\n */\n\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n\n/* TODO: split the link style into separate things*/\n\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n\n/* Override */\n\n[data-supertokens~="accessDenied"] [data-supertokens~="row"] {\n    padding-bottom: 24px;\n}\n\n[data-supertokens~="accessDenied"] [data-supertokens~="divider"] {\n    padding: 0;\n    margin: 34px 0 18px 0;\n}\n\n[data-supertokens~="accessDenied"] [data-supertokens~="headerTitle"] {\n    margin: 10px 0 0 0;\n    font-style: normal;\n    font-weight: 600;\n    font-size: 20px;\n    line-height: 30px;\n}\n\n/* Override end */\n\n[data-supertokens~="center"] {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    flex: 1 1 auto;\n}\n\n[data-supertokens~="buttonsGroup"] {\n    margin-top: 34px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n[data-supertokens~="buttonBase"] {\n    font-family: "Arial", sans-serif;\n    font-size: var(--font-size-1);\n    line-height: 21px;\n    font-weight: 400;\n    background: transparent;\n    outline: none;\n    border: none;\n    cursor: pointer;\n}\n\n[data-supertokens~="backButton"] {\n    color: rgb(var(--palette-textLink));\n}\n\n[data-supertokens~="logoutButton"] {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: rgb(var(--palette-textGray));\n}\n\n[data-supertokens~="primaryText"][data-supertokens~="accessDeniedError"] {\n    font-weight: 400;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var AccessDeniedScreen$2 = function (props) {
    var userContext = uiEntry.useUserContext();
    var t = translationContext.useTranslation();
    var onLogout = function () {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, props.recipe.signOut({ userContext: userContext })];
                    case 1:
                        _a.sent();
                        return [
                            4 /*yield*/,
                            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                show: "signin",
                                redirectBack: false,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var onBackButtonClicked = function () {
        // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
        if (props.navigate === undefined) {
            return windowHandler.WindowHandlerReference.getReferenceOrThrow()
                .windowHandler.getWindowUnsafe()
                .history.back();
        }
        // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.navigate) {
            return props.navigate.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.navigate(-1);
    };
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "center accessDenied" },
            {
                children: jsxRuntime.jsx(
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
                                            jsxRuntime.jsx(ErrorRoundIcon, {}),
                                            jsxRuntime.jsx(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "headerTitle" },
                                                    { children: t("ACCESS_DENIED") }
                                                )
                                            ),
                                            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                            props.error &&
                                                jsxRuntime.jsxs(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        { "data-supertokens": "primaryText accessDeniedError" },
                                                        { children: [" ", props.error] }
                                                    )
                                                ),
                                            jsxRuntime.jsxs(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "buttonsGroup" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx(BackButton, {
                                                                onClick: onBackButtonClicked,
                                                            }),
                                                            jsxRuntime.jsx(LogoutButton, { onClick: onLogout }),
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
                ),
            }
        )
    );
};
var AccessDeniedThemeWithOverride = uiEntry.withOverride("SessionAccessDenied", AccessDeniedScreen$2);
var AccessDeniedScreenTheme = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.accessDeniedScreen.style] },
            {
                children: jsxRuntime.jsx(
                    AccessDeniedThemeWithOverride,
                    genericComponentOverrideContext.__assign({}, props)
                ),
            }
        )
    );
};

var defaultTranslationsSession = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        { ACCESS_DENIED: "Access denied", GO_BACK: "Go back", LOGOUT: "Log out" }
    ),
};

var AccessDeniedScreen$1 = function (props) {
    var _a, _b, _c;
    var recipeComponentOverrides = props.useComponentOverrides();
    var navigate =
        (_a = props.navigate) !== null && _a !== void 0
            ? _a
            : (_b = uiEntry.UI.getReactRouterDomWithCustomHistory()) === null || _b === void 0
            ? void 0
            : _b.useHistoryCustom();
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            defaultStore: defaultTranslationsSession,
                            useShadowDom:
                                (_c = props.useShadowDom) !== null && _c !== void 0
                                    ? _c
                                    : genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                        },
                        {
                            children: jsxRuntime.jsx(AccessDeniedScreenTheme, {
                                config: props.recipe.config,
                                navigate: navigate,
                                recipe: props.recipe,
                                error: props.error,
                            }),
                        }
                    )
                ),
            }
        )
    );
};

var SessionPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(SessionPreBuiltUI, _super);
    function SessionPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsSession;
        // Instance methods
        _this.getFeatures = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _useComponentOverrides
        ) {
            return {};
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (componentName === "accessDenied") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(AccessDeniedScreen$1, {
                                recipe: _this.recipeInstance,
                                useComponentOverrides: useComponentOverrides,
                                error: props.error,
                                useShadowDom: props.useShadowDom,
                            }),
                        }
                    )
                );
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    SessionPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (SessionPreBuiltUI.instance === undefined) {
            var recipeInstance = types.Session.getInstanceOrThrow();
            SessionPreBuiltUI.instance = new SessionPreBuiltUI(recipeInstance);
        }
        return SessionPreBuiltUI.instance;
    };
    SessionPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    SessionPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    SessionPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    SessionPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        SessionPreBuiltUI.instance = undefined;
        return;
    };
    var _a;
    _a = SessionPreBuiltUI;
    SessionPreBuiltUI.AccessDeniedScreen = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return _a.getFeatureComponent("accessDenied", prop);
    };
    SessionPreBuiltUI.AccessDeniedScreenTheme = AccessDeniedScreenTheme;
    return SessionPreBuiltUI;
})(uiEntry.RecipeRouter);
var AccessDeniedScreen = SessionPreBuiltUI.AccessDeniedScreen;

exports.AccessDeniedScreen = AccessDeniedScreen;
exports.AccessDeniedScreenTheme = AccessDeniedScreenTheme;
exports.SessionPreBuiltUI = SessionPreBuiltUI;
