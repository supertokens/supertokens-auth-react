"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session-shared3.js");
var componentOverrideContext = require("./multifactorauth-shared2.js");
var React = require("react");
var recipe$1 = require("./session-shared2.js");
var recipe = require("./multifactorauth-shared.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var translations = require("./translations.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var translationContext = require("./translationContext.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("./recipeModule-shared.js");
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
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    -webkit-animation-duration: 0.1s;\n            animation-duration: 0.1s;\n    -webkit-animation-name: animate-fade;\n            animation-name: animate-fade;\n    -webkit-animation-delay: 0.2s;\n            animation-delay: 0.2s;\n    -webkit-animation-fill-mode: backwards;\n            animation-fill-mode: backwards;\n}\n@-webkit-keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    padding-top: 24px;\n}\n[data-supertokens~="row"] {\n    padding-top: 16px;\n    padding-bottom: 8px;\n}\n[data-supertokens~="factorChooserList"] {\n    padding-top: 4px;\n}\n[data-supertokens~="factorChooserOption"] {\n    display: flex;\n    flex-direction: row;\n    border-radius: 6px;\n    border: 1px solid rgb(var(--palette-inputBorder));\n    padding: 16px;\n    cursor: pointer;\n    margin-top: 12px;\n}\n[data-supertokens~="factorChooserOption"]:hover {\n    border: 1px solid rgb(var(--palette-textLink));\n}\n[data-supertokens~="factorOptionText"] {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: start;\n    text-align: left;\n}\n[data-supertokens~="factorLogo"] {\n    flex-grow: 0;\n    min-width: 30px;\n    text-align: left;\n    margin-top: 6px;\n}\n[data-supertokens~="factorName"] {\n    color: rgb(var(--palette-textPrimary));\n    font-size: var(--font-size-1);\n    margin: 4px;\n}\n[data-supertokens~="factorChooserOption"]:hover [data-supertokens~="factorName"] {\n    color: rgb(var(--palette-textLink));\n}\n[data-supertokens~="factorDescription"] {\n    color: rgb(var(--palette-textSecondary));\n    font-size: var(--font-size-0);\n    margin: 4px;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-bottom: 32px;\n    text-align: right;\n}\n';

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

var FactorChooserFooter = uiEntry.withOverride(
    "MultiFactorAuthFactorChooserFooter",
    function MultiFactorAuthFactorChooserFooter(_a) {
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
    }
);

var FactorChooserHeader = uiEntry.withOverride(
    "MultiFactorAuthFactorChooserHeader",
    function MultiFactorAuthFactorChooserHeader() {
        var t = translationContext.useTranslation();
        return jsxRuntime.jsx(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "row factorChooserHeader" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "headerTitle" },
                            { children: t("MULTI_FACTOR_CHOOSER_HEADER_TITLE") }
                        )
                    ),
                }
            )
        );
    }
);

var FactorOption = uiEntry.withOverride("MultiFactorAuthFactorOption", function MultiFactorAuthFactorOption(_a) {
    var onClick = _a.onClick,
        name = _a.name,
        description = _a.description,
        logo = _a.logo;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "a",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "factorChooserOption", onClick: onClick },
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

var FactorList = uiEntry.withOverride("MultiFactorAuthFactorList", function MultiFactorAuthFactorList(_a) {
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
    var sessionContext = session.useSessionContext$1();
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return jsxRuntime.jsxs(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: [
                        jsxRuntime.jsx(FactorChooserHeader, {}),
                        jsxRuntime.jsx(FactorList, {
                            availableFactors: props.availableFactors,
                            mfaInfo: props.mfaInfo,
                            navigateToFactor: props.navigateToFactor,
                        }),
                        jsxRuntime.jsx(FactorChooserFooter, { logout: props.logout }),
                        jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
                    ],
                }
            )
        );
    }
    // Otherwise, return an empty screen, waiting for the feature component redirection to complete.
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
}
function FactorChooserThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    genericComponentOverrideContext.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [props.config.rootStyle, props.config.factorChooserScreen.style],
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
        genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
        { MULTI_FACTOR_CHOOSER_HEADER_TITLE: "Please select a second factor", MULTI_FACTOR_AUTH_LOGOUT: "Logout" }
    ),
};

var FactorChooser$1 = function (props) {
    var sessionContext = React.useContext(uiEntry.SessionContext);
    var _a = React.useState(undefined),
        mfaInfo = _a[0],
        setMFAInfo = _a[1];
    var userContext = uiEntry.useUserContext();
    var recipeComponentOverrides = props.useComponentOverrides();
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                uiEntry.redirectToAuth({ redirectBack: false, history: props.history }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.history]
    );
    var fetchMFAInfo = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [2 /*return*/, props.recipe.webJSRecipe.getMFAInfo({ userContext: userContext })];
                });
            });
        },
        [props.recipe, userContext]
    );
    var checkMFAInfo = React.useCallback(
        function (mfaInfo) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var availableFactors;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    availableFactors = props.recipe.getSecondaryFactors().filter(function (_a) {
                        var id = _a.id;
                        return (
                            mfaInfo.factors.isAllowedToSetup.includes(id) || mfaInfo.factors.isAlreadySetup.includes(id)
                        );
                    });
                    if (availableFactors.length === 1) {
                        return [
                            2 /*return*/,
                            recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactor(
                                availableFactors[0].id,
                                false,
                                props.history
                            ),
                        ];
                    } else {
                        setMFAInfo(mfaInfo.factors);
                    }
                    return [2 /*return*/];
                });
            });
        },
        [setMFAInfo]
    );
    var handleError = React.useCallback(
        function (err) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe$1.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
            return props.recipe.redirectToFactor(factorId, false, props.history);
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
                            session = recipe$1.Session.getInstanceOrThrow();
                            return [4 /*yield*/, session.signOut(props.userContext)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, redirectToAuthWithHistory()];
                    }
                });
            });
        },
        [props.recipe, redirectToAuthWithHistory]
    );
    if (mfaInfo === undefined) {
        return jsxRuntime.jsx(React.Fragment, {});
    }
    var childProps = {
        config: props.recipe.config,
    };
    var availableFactors = props.recipe.getSecondaryFactors().filter(function (_a) {
        var id = _a.id;
        return mfaInfo.isAllowedToSetup.includes(id) || mfaInfo.isAlreadySetup.includes(id);
    });
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsMultiFactorAuth,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            FactorChooserThemeWrapper,
                                            genericComponentOverrideContext.__assign({}, childProps, {
                                                mfaInfo: mfaInfo,
                                                availableFactors: availableFactors,
                                                logout: signOut,
                                                navigateToFactor: navigateToFactor,
                                            })
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
