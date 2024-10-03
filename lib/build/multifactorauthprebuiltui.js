"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session.js");
var componentOverrideContext = require("./multifactorauth-shared3.js");
var React = require("react");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var types = require("./multifactorauth-shared.js");
var recipe = require("./multifactorauth-shared2.js");
var translationContext = require("./translationContext.js");
var sessionprebuiltui = require("./sessionprebuiltui.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
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
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");

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
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="mfa"][data-supertokens~="container"] {\n    padding-top: 34px;\n}\n[data-supertokens~="mfa"] [data-supertokens~="row"] {\n    padding-top: 6px;\n    padding-bottom: 6px;\n}\n[data-supertokens~="mfa"] [data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-3);\n    font-weight: 600;\n    line-height: 30px;\n}\n[data-supertokens~="mfa"] [data-supertokens~="factorChooserList"] {\n    margin-bottom: 12px;\n}\n[data-supertokens~="factorChooserOption"] {\n    display: flex;\n    flex-direction: row;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n    padding: 20px 16px;\n    cursor: pointer;\n    margin-top: 12px;\n}\n[data-supertokens~="factorChooserOption"]:hover {\n    border: 1px solid rgba(var(--palette-primary), 0.6);\n}\n[data-supertokens~="factorOptionText"] {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    text-align: left;\n}\n[data-supertokens~="factorLogo"] {\n    flex-grow: 0;\n    min-width: 30px;\n    text-align: left;\n    margin-top: 6px;\n}\n[data-supertokens~="totp"] [data-supertokens~="factorLogo"] {\n    margin-top: 3px;\n    margin-left: -1px;\n}\n[data-supertokens~="factorName"] {\n    color: rgb(var(--palette-primary));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 4px;\n}\n[data-supertokens~="factorDescription"] {\n    color: rgb(var(--palette-textPrimary));\n    font-size: var(--font-size-0);\n    margin: 4px;\n}\n[data-supertokens~="mfa"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-bottom: 26px;\n    text-align: right;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var FactorChooserFooter = uiEntry.withOverride("MFAFactorChooserFooter", function MFAChooserFooter(_a) {
    var logout = _a.logout;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "row factorChooserFooter" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: logout },
                        {
                            children: [
                                jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {
                                    color: "rgb(var(--palette-textPrimary))",
                                }),
                                t("MULTI_FACTOR_AUTH_LOGOUT"),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

var FactorChooserHeader = uiEntry.withOverride("MFAFactorChooserHeader", function MFAFactorChooserHeader(props) {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "row factorChooserHeader" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "headerTitle withBackButton" },
                        {
                            children: [
                                props.showBackButton
                                    ? jsxRuntime.jsx(uiEntry.BackButton, { onClick: props.onBackButtonClicked })
                                    : jsxRuntime.jsx("span", {
                                          "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                      }),
                                t("MULTI_FACTOR_CHOOSER_HEADER_TITLE"),
                                jsxRuntime.jsx("span", {
                                    "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

var FactorOption = uiEntry.withOverride("MFAFactorOption", function MFAFactorOption(_a) {
    var onClick = _a.onClick,
        id = _a.id,
        name = _a.name,
        description = _a.description,
        logo = _a.logo;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "factorChooserOption ".concat(id), onClick: onClick },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "factorLogo" },
                            { children: [" ", logo({})] }
                        )
                    ),
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "factorOptionText" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "h6",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "factorName" },
                                            { children: t(name) }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "p",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "factorDescription" },
                                            { children: t(description) }
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

var FactorList = uiEntry.withOverride("MFAFactorList", function MFAFactorList(_a) {
    var availableFactors = _a.availableFactors,
        navigateToFactor = _a.navigateToFactor;
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "row factorChooserList" },
            {
                children: availableFactors.map(function (factor) {
                    return jsxRuntime.jsx(
                        FactorOption,
                        {
                            id: factor.id,
                            name: factor.name,
                            description: factor.description,
                            logo: factor.logo,
                            onClick: function () {
                                return navigateToFactor(factor.id);
                            },
                        },
                        factor.id
                    );
                }),
            }
        )
    );
});

function FactorChooserTheme(props) {
    var t = translationContext.useTranslation();
    if (props.availableFactors.length === 0) {
        return jsxRuntime.jsx(sessionprebuiltui.AccessDeniedScreen, {
            useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */,
            error: props.showBackButton ? t("MFA_NO_AVAILABLE_OPTIONS") : t("MFA_NO_AVAILABLE_OPTIONS_LOGIN"),
        });
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container mfa" },
            {
                children: [
                    jsxRuntime.jsx(FactorChooserHeader, {
                        onBackButtonClicked: props.onBackButtonClicked,
                        showBackButton: props.showBackButton,
                    }),
                    jsxRuntime.jsx(FactorList, {
                        availableFactors: props.availableFactors,
                        navigateToFactor: props.navigateToFactor,
                    }),
                    jsxRuntime.jsx(FactorChooserFooter, { logout: props.onLogoutClicked }),
                    jsxRuntime.jsx(uiEntry.SuperTokensBranding, {}),
                ],
            }
        )
    );
}
function FactorChooserThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
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
                                props.config.factorChooserScreen.style,
                            ],
                        },
                        {
                            children: jsxRuntime.jsx(
                                FactorChooserTheme,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var defaultTranslationsMultiFactorAuth = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        {
            MULTI_FACTOR_CHOOSER_HEADER_TITLE: "Please select a factor",
            MULTI_FACTOR_AUTH_LOGOUT: "Log out",
            PWLESS_MFA_OTP_PHONE_NAME: "SMS based OTP",
            PWLESS_MFA_OTP_PHONE_DESCRIPTION: "Get an OTP code on your phone to complete the authentication request",
            PWLESS_MFA_OTP_EMAIL_NAME: "Email based OTP",
            PWLESS_MFA_OTP_EMAIL_DESCRIPTION:
                "Get an OTP code on your email address to complete the authentication request",
            TOTP_MFA_NAME: "TOTP",
            TOTP_MFA_DESCRIPTION: "Use an authenticator app to complete the authentication request",
            MFA_NO_AVAILABLE_OPTIONS: "You have no available secondary factors.",
            MFA_NO_AVAILABLE_OPTIONS_LOGIN:
                "You have no available secondary factors and cannot complete the sign-in process. Please contact support.",
        }
    ),
};

var FactorChooser$1 = function (props) {
    var _a;
    var sessionContext = React.useContext(uiEntry.SessionContext);
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var _b = React.useState(undefined),
        mfaInfo = _b[0],
        setMFAInfo = _b[1];
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var recipeComponentOverrides = props.useComponentOverrides();
    var nextQueryParam =
        (_a = genericComponentOverrideContext.getQueryParams("n")) !== null && _a !== void 0 ? _a : undefined;
    var stepUpQueryParam = genericComponentOverrideContext.getQueryParams("stepUp");
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                uiEntry.redirectToAuth({ redirectBack: false, navigate: props.navigate }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.navigate]
    );
    var fetchMFAInfo = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        props.recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext: userContext }),
                    ];
                });
            });
        },
        [props.recipe, userContext]
    );
    var checkMFAInfo = React.useCallback(
        function (mfaInfo) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (mfaInfo.factors.next.length === 0 && stepUpQueryParam !== "true") {
                        void types.Session.getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection(
                                undefined,
                                recipe.MultiFactorAuth.RECIPE_ID,
                                genericComponentOverrideContext.getRedirectToPathFromURL(),
                                userContext,
                                props.navigate
                            )
                            .catch(rethrowInRender);
                    } else {
                        setMFAInfo({
                            factors: mfaInfo.factors,
                            phoneNumbers: mfaInfo.phoneNumbers,
                            emails: mfaInfo.emails,
                        });
                    }
                    return [2 /*return*/];
                });
            });
        },
        [setMFAInfo, nextQueryParam, userContext]
    );
    var handleError = React.useCallback(
        function (err) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
                            ];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 2];
                            throw err;
                        case 2:
                            return [4 /*yield*/, redirectToAuthWithHistory()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [redirectToAuthWithHistory]
    );
    genericComponentOverrideContext.useOnMountAPICall(
        fetchMFAInfo,
        checkMFAInfo,
        handleError,
        sessionContext.loading === false
    );
    var navigateToFactor = React.useCallback(
        function (factorId) {
            props.recipe.config.onHandleEvent({
                action: "FACTOR_CHOOSEN",
                factorId: factorId,
            });
            return props.recipe.redirectToFactor({
                factorId: factorId,
                forceSetup: false,
                stepUp: stepUpQueryParam === "true",
                redirectBack: false,
                navigate: props.navigate,
                userContext: props.userContext,
            });
        },
        [props.recipe]
    );
    var signOut = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var session;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = types.Session.getInstanceOrThrow();
                            return [4 /*yield*/, session.signOut({ userContext: userContext })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, redirectToAuthWithHistory()];
                    }
                });
            });
        },
        [props.recipe, redirectToAuthWithHistory]
    );
    var onBackButtonClicked = React.useCallback(
        function () {
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
        },
        [props.navigate]
    );
    if (mfaInfo === undefined) {
        return null;
    }
    var availableFactors = recipe.getAvailableFactors(mfaInfo.factors, nextQueryParam, props.recipe, userContext);
    var childProps = {
        config: props.recipe.config,
        onBackButtonClicked: onBackButtonClicked,
        // if the next array is empty, it means the user has logged in fully and has come here (from a settings page for example).
        // So we show the back button. In case the next array is not empty, it means we are still signing in, and
        // there is no where to go back to, other than logout, which is a different button in the UI.
        showBackButton: mfaInfo.factors.next.length === 0,
        mfaInfo: mfaInfo,
        availableFactors: availableFactors,
        onLogoutClicked: signOut,
        navigateToFactor: navigateToFactor,
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
                            defaultStore: defaultTranslationsMultiFactorAuth,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            FactorChooserThemeWrapper,
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

var MultiFactorAuthPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(MultiFactorAuthPreBuiltUI, _super);
    function MultiFactorAuthPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsMultiFactorAuth;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe.DEFAULT_FACTOR_CHOOSER_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("factorchooser", props, useComponentOverrides);
                    },
                    recipeID: recipe.MultiFactorAuth.RECIPE_ID,
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
                useComponentOverrides = componentOverrideContext.useContext;
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
                                        FactorChooser$1,
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
    MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (MultiFactorAuthPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.MultiFactorAuth.getInstanceOrThrow();
            MultiFactorAuthPreBuiltUI.instance = new MultiFactorAuthPreBuiltUI(recipeInstance);
        }
        return MultiFactorAuthPreBuiltUI.instance;
    };
    MultiFactorAuthPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    MultiFactorAuthPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    MultiFactorAuthPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    MultiFactorAuthPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        MultiFactorAuthPreBuiltUI.instance = undefined;
        return;
    };
    MultiFactorAuthPreBuiltUI.FactorChooser = function (props) {
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("factorchooser", props);
    };
    MultiFactorAuthPreBuiltUI.FactorChooserTheme = FactorChooserThemeWrapper;
    return MultiFactorAuthPreBuiltUI;
})(uiEntry.RecipeRouter);
var FactorChooser = MultiFactorAuthPreBuiltUI.FactorChooser;

exports.FactorChooser = FactorChooser;
exports.FactorChooserTheme = FactorChooserThemeWrapper;
exports.MultiFactorAuthPreBuiltUI = MultiFactorAuthPreBuiltUI;
