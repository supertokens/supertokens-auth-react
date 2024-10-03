"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
require("./multifactorauth.js");
var session = require("./session.js");
var recipe = require("./thirdparty-shared.js");
var React = require("react");
var authCompWrapper = require("./authCompWrapper.js");
var types = require("./multifactorauth-shared.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var emailverification = require("./emailverification.js");
var recipe$2 = require("./emailverification-shared.js");
var recipe$1 = require("./oauth2provider-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("./translationContext.js");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("./multifactorauth-shared3.js");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared2.js");
require("supertokens-web-js/recipe/emailverification");
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
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);

var styles =
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 28, 34, 42;\n    --palette-primaryBorder: 45, 54, 68;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 0, 0, 0;\n    --palette-textLabel: 0, 0, 0;\n    --palette-textInput: 0, 0, 0;\n    --palette-textPrimary: 128, 128, 128;\n    --palette-textLink: 0, 122, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 54, 54, 54;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n    --font-size-5: 28px;\n}\n/*\n * Default styles.\n */\n@keyframes slideTop {\n    0% {\n        transform: translateY(-5px);\n    }\n    100% {\n        transform: translateY(0px);\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        transform: rotateX(-100deg);\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        transform: rotateX(0deg);\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Arial", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 10px auto 0;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 400;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    margin-top: 24px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 27.6px;\n    letter-spacing: 0.58px;\n    font-weight: 700;\n    margin-bottom: 20px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    font-weight: 400;\n    color: rgb(var(--palette-textGray));\n    margin-bottom: 21px;\n}\n[data-supertokens~="headerSubtitle"][data-supertokens~="secondaryText"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-2);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="secondaryText"] strong {\n    font-weight: 600;\n}\n[data-supertokens~="divider"] {\n    margin-top: 1.5em;\n    margin-bottom: 1.5em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n    flex: 3 3;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 24px;\n    font-size: var(--font-size-5);\n    letter-spacing: 1.1px;\n    font-weight: 700;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    font-family: "Arial", sans-serif;\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    color: rgb(var(--palette-textGray));\n    font-weight: 400;\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    font-family: "Arial", sans-serif;\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 600;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n[data-supertokens~="delayedRender"] {\n    animation-duration: 0.1s;\n    animation-name: animate-fade;\n    animation-delay: 0.2s;\n    animation-fill-mode: backwards;\n}\n@keyframes animate-fade {\n    0% {\n        opacity: 0;\n    }\n    100% {\n        opacity: 1;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] {\n    display: flex;\n    flex-direction: column;\n    margin-top: 10px;\n    gap: 24px;\n}\n[data-supertokens~="footerLinkGroupVert"] > div {\n    cursor: pointer;\n    margin: 0;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryText"] {\n    font-weight: 400;\n}\n[data-supertokens~="footerLinkGroupVert"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    font-weight: 400;\n    position: relative;\n    left: -6px; /* half the width of the left arrow */\n}\n@media (max-width: 360px) {\n    [data-supertokens~="footerLinkGroupVert"] {\n        flex-direction: column;\n    }\n    [data-supertokens~="footerLinkGroupVert"] > div {\n        margin: 0 auto;\n    }\n}\n[data-supertokens~="footerLinkGroupVert"] div:only-child {\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: 14px;\n}\n[data-supertokens~="withBackButton"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="dividerWithOr"] {\n    padding-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="dividerText"] {\n    flex: 1 1;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n}\n[data-supertokens~="formLabelWithLinkWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n[data-supertokens~="formLabelLinkBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n    font-size: var(--font-size-0);\n}\n[data-supertokens~="formLabelLinkBtn"]:hover {\n    text-decoration: underline;\n}\n[data-supertokens~="formLabelLinkBtn"]:disabled {\n    color: rgb(var(--palette-textPrimary));\n    cursor: default;\n    text-decoration: none;\n}\n[data-supertokens~="authComponentList"] {\n    padding-bottom: 20px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] {\n    color: rgb(var(--palette-textGray));\n    font-size: var(--font-size-1);\n    font-weight: 400;\n    margin: 10px 0 25px;\n}\n[data-supertokens~="authPageTitleOAuthClientUrl"] {\n    text-decoration: none;\n}\n[data-supertokens~="authPageTitleOAuthClientLogo"] {\n    width: 44px;\n    height: 44px;\n    margin-bottom: 10px;\n}\n[data-supertokens~="authPageTitleOAuthClient"] [data-supertokens~="authPageTitleOAuthClientName"] {\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="buttonWithArrow"] {\n    border-radius: 6px;\n    border: 1px solid #d0d5dd;\n    width: 100%;\n    color: rgb(var(--palette-textGray));\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    margin: 24px 0;\n    min-height: 48px;\n    cursor: pointer;\n}\n[data-supertokens~="buttonWithArrow"]:hover {\n    background-color: rgb(var(--palette-inputBackground));\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryText"] {\n    font-weight: 700;\n    font-size: var(--font-size-2);\n    color: rgb(var(--palette-textGray));\n    margin: 0;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithRightArrow"] ~ svg {\n    position: relative;\n    left: 2px;\n}\n[data-supertokens~="buttonWithArrow"]:hover [data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    position: relative;\n    left: -2px;\n}\n[data-supertokens~="buttonWithArrow"] [data-supertokens~="secondaryLinkWithLeftArrow"] {\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n\n    --logo-size: 34px;\n    --logo-horizontal-spacing: 8px;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n    padding: 2px calc(var(--logo-size) + 2 * var(--logo-horizontal-spacing));\n    background-color: white;\n    border-color: rgb(221, 221, 221);\n    color: black;\n    position: relative;\n}\n[data-supertokens~="button"][data-supertokens~="providerButton"]:hover {\n    filter: none;\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    width: calc(var(--logo-size));\n    position: absolute;\n    left: calc(var(--logo-horizontal-spacing));\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n    align-items: center;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    display: inline-block;\n    flex-grow: 1;\n    max-width: 100%;\n    font-size: var(--font-size-1);\n    text-overflow: ellipsis;\n}\n.scroll-text-animation:hover span,\n.scroll-text-animation:focus span {\n    display: inline-block;\n    animation: scroll-left 2s linear forwards;\n    position: relative;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    text-overflow: clip;\n}\n@keyframes scroll-left {\n    0% {\n        transform: translateX(0);\n        left: 0%;\n    }\n    50% {\n        transform: translateX(calc(-100% - 10px));\n        left: 100%;\n    }\n    100% {\n        transform: translateX(calc(-100% - 10px));\n        left: 100%;\n    }\n}\n@media (max-width: 640px) {\n    [data-supertokens~="providerButtonText"] {\n        font-size: var(--font-size-0);\n    }\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [children, jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] })],
    });
};

var ThirdPartySignInAndUpProvidersForm = function (props) {
    var userContext = uiEntry.useUserContext();
    var signInClick = function (providerId) {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            var response, generalError, e_1;
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        response = void 0;
                        generalError = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [
                            4 /*yield*/,
                            recipe.redirectToThirdPartyLogin({
                                recipeImplementation: props.recipeImplementation,
                                thirdPartyId: providerId,
                                config: props.config,
                                shouldTryLinkingWithSessionUser: false,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (STGeneralError__default.default.isThisError(e_1)) {
                            generalError = e_1;
                        } else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (generalError !== undefined) {
                            props.onError(generalError.message);
                        } else {
                            if (response === undefined) {
                                throw new Error("Should not come here");
                            }
                            if (response.status === "ERROR") {
                                props.onError("SOMETHING_WENT_WRONG_ERROR");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _a.sent();
                        props.onError("SOMETHING_WENT_WRONG_ERROR");
                        return [3 /*break*/, 6];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    return jsxRuntime.jsx(React.Fragment, {
        children: props.providers.map(function (provider) {
            return jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "providerContainer" },
                    {
                        children: jsxRuntime.jsx(
                            "span",
                            genericComponentOverrideContext.__assign(
                                {
                                    onClick: function () {
                                        return signInClick(provider.id);
                                    },
                                },
                                { children: provider.getButton() }
                            )
                        ),
                    }
                ),
                "provider-".concat(provider.id)
            );
        }),
    });
};
var ProvidersForm = uiEntry.withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

var SignInAndUpThemeWrapper = function (props) {
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
                                props.config.signInAndUpFeature.style,
                            ],
                        },
                        { children: jsxRuntime.jsx(ProvidersForm, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
};

function useChildProps(
    recipe$1,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    setFactorList,
    navigate,
    userContext
) {
    var recipeImplementation = React.useMemo(
        function () {
            return recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe);
        },
        [recipe$1]
    );
    var dynamicLoginMethods = uiEntry.useDynamicLoginMethods();
    return React.useMemo(
        function () {
            var tenantProviders;
            if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods) {
                if (dynamicLoginMethods.loaded === false) {
                    throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
                } else {
                    tenantProviders = dynamicLoginMethods.loginMethods.firstFactors.includes(types.FactorIds.THIRDPARTY)
                        ? dynamicLoginMethods.loginMethods.thirdparty.providers
                        : [];
                }
            }
            return {
                onAuthSuccess: onAuthSuccess,
                error: error,
                onError: onError,
                clearError: clearError,
                rebuildAuthPage: rebuildAuthPage,
                setFactorList: setFactorList,
                providers: recipe.mergeProviders({
                    tenantProviders: tenantProviders,
                    clientProviders: recipe$1.config.signInAndUpFeature.providers,
                }),
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
                recipe: recipe$1,
                navigate: navigate,
                userContext: userContext,
            };
        },
        [recipe$1, recipeImplementation, error, userContext]
    );
}
var SignInAndUpFeature = function (props) {
    var childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.setFactorList,
        props.navigate,
        props.userContext
    );
    var themeProps = genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, childProps),
        { providers: childProps.providers }
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(SignInAndUpThemeWrapper, genericComponentOverrideContext.__assign({}, themeProps)),
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
var SignInAndUpFeatureWrapper = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsxRuntime.jsx(SignInAndUpFeature, genericComponentOverrideContext.__assign({}, props)) }
        )
    );
};
var getModifiedRecipeImplementation = function (origImpl) {
    return genericComponentOverrideContext.__assign({}, origImpl);
};

/*
 * Component.
 */
var ThirdPartySignInAndUpCallbackTheme = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ThirdPartySignInAndUpCallbackTheme, _super);
    function ThirdPartySignInAndUpCallbackTheme() {
        /*
         * Methods.
         */
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.render = function () {
            return jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "container" },
                    {
                        children: jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "row" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "spinner" },
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
        return _this;
    }
    return ThirdPartySignInAndUpCallbackTheme;
})(React.PureComponent);
var SignInAndUpCallbackThemeWithOverride = uiEntry.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
var SignInAndUpCallbackTheme = function (props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.signInAndUpFeature.style] },
            { children: jsxRuntime.jsx(SignInAndUpCallbackThemeWithOverride, {}) }
        )
    );
};

var defaultTranslationsThirdParty = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
        {
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
            THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
            /*
             * The following are error messages from our backend SDK.
             * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
             * They are shown as is by default (setting the value to undefined will display the raw translation key)
             */
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)":
                undefined,
            "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ERR_CODE_005)":
                undefined,
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_006)":
                undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_020)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_021)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_022)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_023)": undefined,
        }
    ),
};

var SignInAndUpCallback$1 = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var verifyCode = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var payloadBeforeCall;
                var _b;
                return genericComponentOverrideContext.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            payloadBeforeCall = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _c.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadBeforeCall = undefined;
                            return [3 /*break*/, 3];
                        case 3:
                            _b = {
                                payloadBeforeCall: payloadBeforeCall,
                            };
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.signInAndUp({
                                    userContext: userContext,
                                }),
                            ];
                        case 4:
                            return [2 /*return*/, ((_b.response = _c.sent()), _b)];
                    }
                });
            });
        },
        [props.recipe, userContext]
    );
    var handleVerifyResponse = React.useCallback(
        function (_a) {
            var response = _a.response,
                payloadBeforeCall = _a.payloadBeforeCall;
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var payloadAfterCall,
                    stateResponse,
                    redirectToPath,
                    loginChallenge,
                    ctx,
                    oauth2Recipe,
                    frontendRedirectTo,
                    e_1;
                return genericComponentOverrideContext.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: "no_email_present",
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: response.status,
                                            message: response.reason,
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 10];
                            payloadAfterCall = void 0;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            payloadAfterCall = _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _c.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 4];
                        case 4:
                            stateResponse = props.recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
                                userContext: userContext,
                            });
                            redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                            loginChallenge =
                                stateResponse === null || stateResponse === void 0
                                    ? void 0
                                    : stateResponse.oauth2LoginChallenge;
                            ctx = {
                                createdNewUser:
                                    response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                                isNewRecipeUser: response.createdNewRecipeUser,
                                newSessionCreated:
                                    payloadAfterCall !== undefined &&
                                    (payloadBeforeCall === undefined ||
                                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                recipeId: props.recipe.recipeID,
                                tenantIdFromQueryParams: genericComponentOverrideContext.getTenantIdFromQueryParams(),
                            };
                            oauth2Recipe = recipe$1.OAuth2Provider.getInstance();
                            if (!(loginChallenge !== undefined && oauth2Recipe !== undefined)) return [3 /*break*/, 9];
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            return [
                                4 /*yield*/,
                                oauth2Recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                    loginChallenge: loginChallenge,
                                    userContext: userContext,
                                }),
                            ];
                        case 6:
                            frontendRedirectTo = _c.sent().frontendRedirectTo;
                            return [
                                2 /*return*/,
                                types.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, ctx),
                                        { action: "SUCCESS_OAUTH2", frontendRedirectTo: frontendRedirectTo }
                                    ),
                                    props.recipe.recipeID,
                                    redirectToPath,
                                    userContext,
                                    props.navigate
                                ),
                            ];
                        case 7:
                            e_1 = _c.sent();
                            rethrowInRender(e_1);
                            return [3 /*break*/, 8];
                        case 8:
                            return [3 /*break*/, 10];
                        case 9:
                            return [
                                2 /*return*/,
                                types.Session.getInstanceOrThrow()
                                    .validateGlobalClaimsAndHandleSuccessRedirection(
                                        genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, ctx),
                                            { action: "SUCCESS" }
                                        ),
                                        props.recipe.recipeID,
                                        redirectToPath,
                                        userContext,
                                        props.navigate
                                    )
                                    .catch(rethrowInRender),
                            ];
                        case 10:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipe, props.navigate, userContext]
    );
    var handleError = React.useCallback(
        function (err) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var invalidClaims, evInstance;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (
                                !(
                                    "status" in err &&
                                    err.status === types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                )
                            )
                                return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                session.getInvalidClaimsFromResponse({ response: err, userContext: userContext }),
                            ];
                        case 1:
                            invalidClaims = _b.sent();
                            if (
                                !invalidClaims.some(function (i) {
                                    return i.id === emailverification.EmailVerificationClaim.id;
                                })
                            )
                                return [3 /*break*/, 5];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            evInstance = recipe$2.EmailVerification.getInstanceOrThrow();
                            return [
                                4 /*yield*/,
                                evInstance.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                        tenantIdFromQueryParams:
                                            genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                    },
                                    props.navigate,
                                    undefined,
                                    userContext
                                ),
                            ];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            if (STGeneralError__default.default.isThisError(err)) {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: "custom",
                                            message: err.message,
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            return [
                                2 /*return*/,
                                genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    navigate: props.navigate,
                                    queryParams: {
                                        error: "signin",
                                    },
                                    redirectBack: false,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        },
        [props.navigate, userContext]
    );
    genericComponentOverrideContext.useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);
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
                            defaultStore: defaultTranslationsThirdParty,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(SignInAndUpCallbackTheme, { config: props.recipe.config }),
                                    props.children,
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

var ThirdPartyPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ThirdPartyPreBuiltUI, _super);
    function ThirdPartyPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsThirdParty;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            var features = {};
            // Add callback route for all provider
            var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath__default.default("/callback/:id")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: function () {
                    return recipe.matchRecipeIdUsingState(_this.recipeInstance, {});
                },
                component: function (prop) {
                    return _this.getFeatureComponent("signinupcallback", prop, useComponentOverrides);
                },
                recipeID: recipe.ThirdParty.RECIPE_ID,
            };
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            if (componentName === "signinupcallback") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                session.SessionAuth,
                                genericComponentOverrideContext.__assign(
                                    { requireAuth: false, doRedirection: false },
                                    {
                                        children: jsxRuntime.jsx(
                                            SignInAndUpCallback$1,
                                            genericComponentOverrideContext.__assign(
                                                { recipe: _this.recipeInstance },
                                                props,
                                                { useComponentOverrides: useComponentOverrides }
                                            )
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here");
            }
        };
        return _this;
    }
    // Static methods
    ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            var recipeInstace = recipe.ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(recipeInstace);
        }
        return ThirdPartyPreBuiltUI.instance;
    };
    ThirdPartyPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    ThirdPartyPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    ThirdPartyPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignInAndUpFeatureWrapper,
                        genericComponentOverrideContext.__assign({}, props, {
                            recipe: _this.recipeInstance,
                            useComponentOverrides: recipe.useContext,
                        }),
                        "thirdparty-signinup"
                    );
                },
                displayOrder: 1,
                factorIds: [types.FactorIds.THIRDPARTY],
                type: "SIGN_IN_UP",
            },
        ];
    };
    // For tests
    ThirdPartyPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    };
    ThirdPartyPreBuiltUI.SignInAndUpCallback = function (prop) {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    };
    ThirdPartyPreBuiltUI.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    return ThirdPartyPreBuiltUI;
})(uiEntry.RecipeRouter);
var SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.ThirdPartyPreBuiltUI = ThirdPartyPreBuiltUI;
