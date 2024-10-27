"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session.js");
var componentOverrideContext = require("./oauth2provider-shared2.js");
var React = require("react");
var recipe = require("./oauth2provider-shared.js");
var translationContext = require("./translationContext.js");
var button = require("./emailpassword-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("./session-shared.js");
require("supertokens-web-js/recipe/oauth2provider");

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
    '/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n\n/*\n * Default styles.\n */\n\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n\n/* TODO: split the link style into separate things*/\n\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n\n[data-supertokens~="logoutIcon"] {\n    padding: 18px 20px 18px 24px;\n    background-color: rgba(var(--palette-textGray), 0.1);\n    border-radius: 12px;\n}\n\n[data-supertokens~="oauth2Logout"] [data-supertokens~="headerTitle"] {\n    margin-top: 24px;\n    margin-bottom: 24px;\n}\n\n[data-supertokens~="oauth2Logout"] [data-supertokens~="button"] {\n    margin-bottom: 24px;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

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
function LogoutIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            {
                "data-supertokens": "logoutIcon",
                xmlns: "http://www.w3.org/2000/svg",
                width: "40",
                height: "38",
                fill: "none",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: "rgb(var(--palette-textGray))",
                    fillRule: "evenodd",
                    d: "M2.972.022a.874.874 0 0 1-.23.062c-.234.042-.926.362-1.148.53a4.638 4.638 0 0 0-.656.63c-.178.228-.415.681-.495.948l-.116.378C.272 2.742.27 32.075.326 32.251l.111.37c.165.559.636 1.207 1.133 1.558a3.9 3.9 0 0 1 .195.145c.048.046.368.206.588.292l.196.08c.036.016.183.063.326.105.144.042.295.093.337.113.041.02.11.037.154.037s.098.015.12.034c.023.019.218.087.434.15.215.065.43.133.478.153.048.019.254.085.457.146.204.06.404.128.446.148.041.021.11.038.154.038s.098.015.12.034c.023.02.16.069.303.11.144.041.295.092.337.112.041.02.11.037.154.037s.098.015.12.034c.023.018.218.086.434.15.215.065.43.133.478.152.048.02.254.086.457.148.204.062.404.129.446.148a.45.45 0 0 0 .163.037c.048 0 .088.018.088.041 0 .023.034.043.076.043.042 0 .213.048.38.104.168.057.34.104.381.104.042 0 .076.02.076.042 0 .023.04.042.088.042.048 0 .122.017.163.038.042.02.193.07.337.11.274.076.366.106.544.176.06.024.285.096.5.16.216.064.41.132.433.15a.224.224 0 0 0 .12.035.4.4 0 0 1 .155.04c.042.02.193.07.337.108.144.038.3.084.348.103.178.07.613.125.954.122.365-.004.908-.078.965-.133a.16.16 0 0 1 .096-.031c.08 0 .707-.291.784-.364.032-.03.073-.054.09-.054.053 0 .632-.55.748-.71.195-.27.432-.71.432-.803 0-.04.02-.083.044-.097.024-.014.043-.077.043-.14 0-.063.023-.137.05-.163.034-.033.059-.404.077-1.148l.026-1.1 2.894-.023c2.31-.02 2.939-.037 3.119-.084.123-.033.24-.074.257-.091.018-.017.077-.031.132-.031.054 0 .11-.02.125-.042.015-.023.055-.042.089-.042.19 0 1.14-.54 1.493-.849.456-.398.898-.926 1.095-1.304a.916.916 0 0 1 .088-.147c.02-.018.06-.104.219-.48.02-.047.059-.16.088-.252.029-.091.069-.214.09-.271.125-.356.146-.97.146-4.265 0-3.563-.003-3.626-.205-3.987-.204-.364-.756-.78-1.036-.78-.045 0-.093-.019-.108-.042-.035-.054-.661-.054-.696 0-.015.023-.066.042-.113.042-.256 0-.85.449-1.002.757-.253.514-.256.568-.256 4.24v3.287l-.11.222c-.06.123-.186.306-.28.408-.171.188-.551.41-.7.41-.044 0-.092.02-.107.042-.018.027-.943.042-2.635.042h-2.608l-.011-12.165c-.01-9.665-.023-12.176-.066-12.218a.236.236 0 0 1-.055-.149.426.426 0 0 0-.039-.169 4.357 4.357 0 0 1-.118-.26c-.201-.477-.692-1.057-1.127-1.332a2.216 2.216 0 0 1-.196-.134c-.054-.058-.664-.307-.848-.346-.048-.01 1.66-.021 3.795-.024 2.546-.003 3.89.01 3.908.037.015.023.064.042.11.042.19 0 .646.313.82.561.274.39.267.31.267 3.032 0 2.402.02 2.851.14 3.139.245.59.71.966 1.318 1.068.33.055.642.012.979-.134.242-.105.696-.489.696-.588 0-.03.015-.054.033-.054.042 0 .166-.305.213-.522.058-.272.046-5.251-.015-5.666a4.778 4.778 0 0 0-.27-1.066 9.014 9.014 0 0 0-.397-.773 2.902 2.902 0 0 1-.161-.23 3.223 3.223 0 0 0-.298-.377 7.831 7.831 0 0 1-.23-.25c-.149-.175-.564-.502-.91-.717a5.197 5.197 0 0 0-.38-.224c-.011 0-.133-.05-.271-.11a4.346 4.346 0 0 0-.98-.319C22.442.018 3.025-.029 2.973.022Zm28.17 7.903c-.364.092-.514.172-.764.407-.225.21-.38.445-.487.737-.04.11-.054.77-.055 2.645v2.498h-3.457c-2.258 0-3.467.015-3.485.042-.014.023-.063.042-.107.042-.138 0-.449.18-.655.379-.194.187-.38.497-.474.794-.06.187-.062.653-.004.687.024.015.044.06.044.102 0 .17.198.495.443.724.141.132.285.24.32.24.035 0 .063.02.063.042 0 .023.036.042.08.042.044 0 .094.014.111.03.125.12.504.134 3.78.136l3.34.001.014 2.52c.015 2.39.032 2.79.122 2.79.021 0 .039.038.039.084 0 .046.02.084.043.084.024 0 .044.026.044.058 0 .073.476.527.552.527.032 0 .057.016.057.036 0 .02.108.069.24.109.35.106 1.009.076 1.305-.059.175-.08.895-.75 3.656-3.406 1.89-1.82 3.487-3.373 3.548-3.454.278-.37.388-.944.256-1.342-.15-.456-.165-.47-3.737-3.915-1.915-1.846-3.511-3.356-3.547-3.356-.037 0-.067-.014-.067-.031 0-.074-.636-.261-.87-.256-.06.001-.217.03-.349.063Z",
                    clipRule: "evenodd",
                }),
            }
        )
    );
}

var OAuth2LogoutScreenInner = uiEntry.withOverride("OAuth2LogoutScreenInner", function OAuth2LogoutScreenInner(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            jsxRuntime.jsx(LogoutIcon, {}),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("LOGGING_OUT") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    { children: t("LOGOUT_CONFIRMATION") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            jsxRuntime.jsx(button.Button, {
                disabled: props.isLoggingOut,
                isLoading: props.isLoggingOut,
                type: "button",
                label: t("LOGOUT"),
                onClick: props.onLogoutClicked,
            }),
        ],
    });
});

var OAuth2LogoutScreen$1 = function (props) {
    if (props.showSpinner) {
        return jsxRuntime.jsx(uiEntry.DynamicLoginMethodsSpinner, {});
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "oauth2Logout container" },
            {
                children: [
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(OAuth2LogoutScreenInner, {
                                    isLoggingOut: props.isLoggingOut,
                                    onLogoutClicked: props.onLogoutClicked,
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
var OAuth2LogoutScreenTheme = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.oauth2LogoutScreen.style] },
            { children: jsxRuntime.jsx(OAuth2LogoutScreen$1, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};

var defaultTranslationsOAuth2Provider = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        { LOGGING_OUT: "Logging Out", LOGOUT_CONFIRMATION: "Are you sure you want to log out?", LOGOUT: "LOG OUT" }
    ),
};

var OAuth2LogoutScreen = function (props) {
    var _a, _b, _c;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var sessionContext = React__namespace.useContext(uiEntry.SessionContext);
    var _d = React__namespace.useState(false),
        isLoggingOut = _d[0],
        setIsLoggingOut = _d[1];
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var logoutChallenge =
        (_a = genericComponentOverrideContext.getQueryParams("logoutChallenge")) !== null && _a !== void 0
            ? _a
            : undefined;
    var navigate =
        (_b = props.navigate) !== null && _b !== void 0
            ? _b
            : (_c = uiEntry.UI.getReactRouterDomWithCustomHistory()) === null || _c === void 0
            ? void 0
            : _c.useHistoryCustom();
    var onLogout = React__namespace.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var frontendRedirectTo, err_1;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (logoutChallenge === undefined) {
                                return [2 /*return*/];
                            }
                            setIsLoggingOut(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 6]);
                            return [
                                4 /*yield*/,
                                recipe.OAuth2Provider.getInstanceOrThrow().webJSRecipe.logOut({
                                    logoutChallenge: logoutChallenge,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            frontendRedirectTo = _a.sent().frontendRedirectTo;
                            return [
                                4 /*yield*/,
                                props.recipe.redirect(
                                    {
                                        recipeId: "oauth2provider",
                                        action: "POST_OAUTH2_LOGOUT_REDIRECT",
                                        tenantIdFromQueryParams:
                                            genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                        frontendRedirectTo: frontendRedirectTo,
                                    },
                                    navigate,
                                    {},
                                    userContext
                                ),
                            ];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            err_1 = _a.sent();
                            return [4 /*yield*/, session.doesSessionExist(userContext)];
                        case 5:
                            if (!_a.sent()) {
                                void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
                                    .redirectToAuth({
                                        userContext: userContext,
                                        redirectBack: false,
                                    })
                                    .catch(rethrowInRender);
                            } else {
                                rethrowInRender(err_1);
                            }
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [logoutChallenge, navigate, props.recipe, userContext, rethrowInRender]
    );
    React__namespace.useEffect(
        function () {
            // We wait for session loading to finish
            if (sessionContext.loading === false) {
                // Redirect to the auth page if there is no logoutChallenge
                if (logoutChallenge === undefined) {
                    void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
                        .redirectToAuth({
                            userContext: userContext,
                            redirectBack: false,
                        })
                        .catch(rethrowInRender);
                } else {
                    // Call logOut directly if there is no session
                    if (sessionContext.doesSessionExist === false) {
                        void onLogout();
                    }
                }
            }
        },
        [userContext, logoutChallenge, sessionContext, onLogout]
    );
    var childProps = {
        config: props.recipe.config,
        showSpinner: sessionContext.loading || sessionContext.doesSessionExist === false,
        onLogoutClicked: onLogout,
        isLoggingOut: isLoggingOut,
    };
    if (logoutChallenge === undefined) {
        return null;
    }
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
                            defaultStore: defaultTranslationsOAuth2Provider,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            OAuth2LogoutScreenTheme,
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

var TryRefreshPage$1 = function (props) {
    var _a;
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var sessionContext = React.useContext(uiEntry.SessionContext);
    var loginChallenge =
        (_a = genericComponentOverrideContext.getQueryParams("loginChallenge")) !== null && _a !== void 0
            ? _a
            : undefined;
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    React__namespace.useEffect(
        function () {
            if (sessionContext.loading === false) {
                if (loginChallenge) {
                    (function () {
                        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                            var frontendRedirectTo;
                            return genericComponentOverrideContext.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [
                                            4 /*yield*/,
                                            props.recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                                loginChallenge: loginChallenge,
                                                userContext: userContext,
                                            }),
                                        ];
                                    case 1:
                                        frontendRedirectTo = _a.sent().frontendRedirectTo;
                                        return [
                                            2 /*return*/,
                                            props.recipe.redirect(
                                                {
                                                    action: "CONTINUE_OAUTH2_AFTER_REFRESH",
                                                    frontendRedirectTo: frontendRedirectTo,
                                                    tenantIdFromQueryParams:
                                                        genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                                    recipeId: "oauth2provider",
                                                },
                                                props.navigate,
                                                {},
                                                userContext
                                            ),
                                        ];
                                }
                            });
                        });
                    })().catch(rethrowInRender);
                } else {
                    void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
                        .redirectToAuth({
                            userContext: userContext,
                            redirectBack: false,
                        })
                        .catch(rethrowInRender);
                }
            }
        },
        [loginChallenge, props.recipe, props.navigate, userContext, sessionContext]
    );
    var childProps = {
        config: props.recipe.config,
    };
    return jsxRuntime.jsx(
        uiEntry.FeatureWrapper,
        genericComponentOverrideContext.__assign(
            {
                useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                defaultStore: defaultTranslationsOAuth2Provider,
            },
            {
                children: jsxRuntime.jsxs(React.Fragment, {
                    children: [
                        props.children === undefined && jsxRuntime.jsx(uiEntry.DynamicLoginMethodsSpinner, {}),
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
    );
};

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
var DEFAULT_TRY_REFRESH_PATH = "/try-refresh";
var DEFAULT_OAUTH2_LOGOUT_PATH = "/oauth/logout";

var OAuth2ProviderPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(OAuth2ProviderPreBuiltUI, _super);
    function OAuth2ProviderPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsOAuth2Provider;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (_this.recipeInstance.config.disableDefaultUI) {
                return {};
            }
            var features = {};
            if (_this.recipeInstance.config.tryRefreshPage.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(DEFAULT_TRY_REFRESH_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("try-refresh-page", props, useComponentOverrides);
                    },
                    recipeID: recipe.OAuth2Provider.RECIPE_ID,
                };
            }
            if (_this.recipeInstance.config.oauth2LogoutScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(DEFAULT_OAUTH2_LOGOUT_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("oauth2-logout-screen", props, useComponentOverrides);
                    },
                    recipeID: recipe.OAuth2Provider.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            componentName,
            props,
            useComponentOverrides
        ) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (componentName === "try-refresh-page") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    {
                                        requireAuth: false,
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsxRuntime.jsx(
                                            TryRefreshPage$1,
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
            } else if (componentName === "oauth2-logout-screen") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    {
                                        requireAuth: false,
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsxRuntime.jsx(
                                            OAuth2LogoutScreen,
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
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (OAuth2ProviderPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.OAuth2Provider.getInstanceOrThrow();
            OAuth2ProviderPreBuiltUI.instance = new OAuth2ProviderPreBuiltUI(recipeInstance);
        }
        return OAuth2ProviderPreBuiltUI.instance;
    };
    OAuth2ProviderPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    OAuth2ProviderPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    OAuth2ProviderPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    OAuth2ProviderPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        OAuth2ProviderPreBuiltUI.instance = undefined;
        return;
    };
    OAuth2ProviderPreBuiltUI.TryRefreshPage = function (props) {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            "try-refresh-page",
            props
        );
    };
    OAuth2ProviderPreBuiltUI.OAuth2LogoutScreen = function (props) {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            "oauth2-logout-screen",
            props
        );
    };
    return OAuth2ProviderPreBuiltUI;
})(uiEntry.RecipeRouter);
var TryRefreshPage = OAuth2ProviderPreBuiltUI.TryRefreshPage;

exports.OAuth2ProviderPreBuiltUI = OAuth2ProviderPreBuiltUI;
exports.TryRefreshPage = TryRefreshPage;
