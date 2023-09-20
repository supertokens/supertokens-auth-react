"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var recipe = require("./thirdparty-shared.js");
var React = require("react");
var translations = require("./translations.js");
var generalError = require("./emailpassword-shared.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var translationContext = require("./translationContext.js");
var recipe$1 = require("./session-shared2.js");

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
    '[data-supertokens~="container"] {\n    --palette-background: 255, 255, 255;\n    --palette-inputBackground: 250, 250, 250;\n    --palette-inputBorder: 224, 224, 224;\n    --palette-primary: 255, 155, 51;\n    --palette-primaryBorder: 238, 141, 35;\n    --palette-success: 65, 167, 0;\n    --palette-successBackground: 217, 255, 191;\n    --palette-error: 255, 23, 23;\n    --palette-errorBackground: 255, 241, 235;\n    --palette-textTitle: 34, 34, 34;\n    --palette-textLabel: 34, 34, 34;\n    --palette-textInput: 34, 34, 34;\n    --palette-textPrimary: 101, 101, 101;\n    --palette-textLink: 0, 118, 255;\n    --palette-buttonText: 255, 255, 255;\n    --palette-textGray: 128, 128, 128;\n    --palette-superTokensBrandingBackground: 242, 245, 246;\n    --palette-superTokensBrandingText: 173, 189, 196;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n/*\n * Default styles.\n */\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n[data-supertokens~="container"] {\n    font-family: "Rubik", sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: rgb(var(--palette-background));\n}\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: rgb(var(--palette-superTokensBrandingBackground));\n    color: rgb(var(--palette-superTokensBrandingText));\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n[data-supertokens~="generalError"] {\n    background: rgb(var(--palette-errorBackground));\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: rgb(var(--palette-error));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: rgb(var(--palette-textTitle));\n}\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n/* TODO: split the link style into separate things*/\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: rgb(var(--palette-textLink));\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: rgb(var(--palette-textLabel));\n}\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: rgb(var(--palette-textPrimary));\n}\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n[data-supertokens~="generalSuccess"] {\n    color: rgb(var(--palette-success));\n    font-size: var(--font-size-1);\n    background: rgb(var(--palette-successBackground));\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n[data-supertokens~="error"] {\n    color: rgb(var(--palette-error));\n}\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n[data-supertokens~="button"] {\n    background-color: rgb(var(--palette-primary));\n    color: rgb(var(--palette-buttonText));\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: rgb(var(--palette-primaryBorder));\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n    cursor: pointer;\n}\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n[data-supertokens~="row"] {\n    padding-bottom: 30px;\n}\n[data-supertokens~="providerContainer"] {\n    padding-top: 9px;\n    padding-bottom: 9px;\n}\n[data-supertokens~="providerButton"] {\n    border-color: rgb(221, 221, 221) !important;\n}\n[data-supertokens~="providerButton"] {\n    min-height: 32px;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    padding: 2px 8px;\n\n    background-color: white;\n    color: black;\n}\n[data-supertokens~="providerButton"]:hover {\n    -webkit-filter: none !important;\n            filter: none !important;\n}\n[data-supertokens~="providerButton"]:hover {\n    background-color: #fafafa;\n}\n[data-supertokens~="providerButtonLeft"] {\n    min-width: 34px;\n    margin-left: 66px;\n}\n[data-supertokens~="providerButtonLogo"] {\n    height: 30px;\n    display: flex;\n}\n[data-supertokens~="providerButtonLogoCenter"] {\n    display: flex;\n    margin: auto;\n}\n[data-supertokens~="providerButtonText"] {\n    font-weight: 400;\n    text-align: center;\n    justify-content: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    display: inline-block;\n}\n[data-supertokens~="providerButtonText"]:only-child {\n    margin: 0 auto;\n}\n';

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
                            props.dispatch({
                                type: "setError",
                                error: generalError.message,
                            });
                        } else {
                            if (response === undefined) {
                                throw new Error("Should not come here");
                            }
                            if (response.status === "ERROR") {
                                props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        _a.sent();
                        props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
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

var SignInAndUpHeader = uiEntry.withOverride("ThirdPartySignInAndUpHeader", function ThirdPartySignInAndUpHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "headerTitle" },
            { children: t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE") }
        )
    );
});

var SignUpFooter = uiEntry.withOverride("ThirdPartySignUpFooter", function ThirdPartySignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var t = translationContext.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
            {
                children: [
                    t("THIRD_PARTY_SIGN_IN_UP_FOOTER_START"),
                    termsOfServiceLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            genericComponentOverrideContext.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: termsOfServiceLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS") }
                            )
                        ),
                    termsOfServiceLink !== undefined &&
                        privacyPolicyLink !== undefined &&
                        t("THIRD_PARTY_SIGN_IN_UP_FOOTER_AND"),
                    privacyPolicyLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            genericComponentOverrideContext.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: privacyPolicyLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_PP") }
                            )
                        ),
                    t("THIRD_PARTY_SIGN_IN_UP_FOOTER_END"),
                ],
            }
        )
    );
});

var SignInAndUpTheme = function (props) {
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInAndUpHeader, {}),
                                    jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                    props.featureState.error &&
                                        jsxRuntime.jsx(generalError.GeneralError, { error: props.featureState.error }),
                                    jsxRuntime.jsx(ProvidersForm, genericComponentOverrideContext.__assign({}, props)),
                                    jsxRuntime.jsx(SignUpFooter, {
                                        privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                                        termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
                                    }),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var SignInAndUpThemeWrapper = function (props) {
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
                            userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style],
                        },
                        {
                            children: jsxRuntime.jsx(
                                SignInAndUpTheme,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
};

var defaultTranslationsThirdParty = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
        {
            THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
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
        }
    ),
};

var useFeatureReducer = function () {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setError":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { error: action.error }
                    );
                default:
                    return oldState;
            }
        },
        {},
        function () {
            var error = undefined;
            var errorQueryParam = genericComponentOverrideContext.getQueryParams("error");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "no_email_present") {
                    error = "THIRD_PARTY_ERROR_NO_EMAIL";
                } else {
                    var customError = genericComponentOverrideContext.getQueryParams("message");
                    if (customError === null) {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else {
                        error = customError;
                    }
                }
            }
            return {
                error: error,
            };
        }
    );
};
function useChildProps(recipe$1) {
    var recipeImplementation = React.useMemo(
        function () {
            return recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe);
        },
        [recipe$1]
    );
    var dynamicLoginMethods = uiEntry.useDynamicLoginMethods();
    return React.useMemo(
        function () {
            if (!recipe$1 || !recipeImplementation) {
                return undefined;
            }
            var tenantProviders;
            if (genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods) {
                if (dynamicLoginMethods.loaded === false) {
                    throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
                } else {
                    tenantProviders = dynamicLoginMethods.loginMethods.thirdparty.enabled
                        ? dynamicLoginMethods.loginMethods.thirdparty.providers
                        : [];
                }
            }
            return {
                providers: recipe.mergeProviders({
                    tenantProviders: tenantProviders,
                    clientProviders: recipe$1.config.signInAndUpFeature.providers,
                }),
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
                recipe: recipe$1,
            };
        },
        [recipe$1, recipeImplementation]
    );
}
var SignInAndUpFeature = function (props) {
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe);
    var themeProps = genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, childProps),
        { providers: childProps.providers }
    );
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            props.children === undefined &&
                jsxRuntime.jsx(
                    SignInAndUpThemeWrapper,
                    genericComponentOverrideContext.__assign({}, themeProps, {
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
    });
};
var SignInAndUpFeatureWrapper = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
                        {
                            children: jsxRuntime.jsx(
                                SignInAndUpFeature,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
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
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        ThemeBase,
        genericComponentOverrideContext.__assign(
            { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, props.config.signInAndUpFeature.style] },
            { children: jsxRuntime.jsx(SignInAndUpCallbackThemeWithOverride, {}) }
        )
    );
};

var SignInAndUpCallback$1 = function (props) {
    var userContext = uiEntry.useUserContext();
    var verifyCode = React.useCallback(
        function () {
            return props.recipe.webJSRecipe.signInAndUp({
                userContext: userContext,
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleVerifyResponse = React.useCallback(
        function (response) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var stateResponse, redirectToPath;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                history: props.history,
                                queryParams: {
                                    error: "no_email_present",
                                },
                                redirectBack: false,
                            }),
                        ];
                    }
                    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                history: props.history,
                                queryParams: {
                                    error: response.status,
                                    message: response.reason,
                                },
                                redirectBack: false,
                            }),
                        ];
                    }
                    if (response.status === "OK") {
                        stateResponse = props.recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
                            userContext: userContext,
                        });
                        redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                        return [
                            2 /*return*/,
                            recipe$1.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                {
                                    rid: props.recipe.config.recipeId,
                                    successRedirectContext: {
                                        action: "SUCCESS",
                                        isNewRecipeUser: response.createdNewRecipeUser,
                                        user: response.user,
                                        redirectToPath: redirectToPath,
                                    },
                                },
                                userContext,
                                props.history
                            ),
                        ];
                    }
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleError = React.useCallback(
        function (err) {
            if (STGeneralError__default.default.isThisError(err)) {
                return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            }
            return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
            });
        },
        [props.recipe, props.history]
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
                        { useShadowDom: props.recipe.config.useShadowDom, defaultStore: defaultTranslationsThirdParty },
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
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath_1 = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath_1.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop, useComponentOverrides);
                    },
                    recipeID: recipe.ThirdParty.RECIPE_ID,
                };
            }
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
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SuperTokensBranding.AuthWidgetWrapper,
                                    genericComponentOverrideContext.__assign(
                                        { authRecipe: _this.recipeInstance, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeatureWrapper,
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
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInAndUpFeatureWrapper,
                                    genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "signinupcallback") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                SignInAndUpCallback$1,
                                genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
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
    // For tests
    ThirdPartyPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    };
    ThirdPartyPreBuiltUI.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinup", prop);
    };
    ThirdPartyPreBuiltUI.SignInAndUpCallback = function (prop) {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    };
    ThirdPartyPreBuiltUI.SignInAndUpTheme = SignInAndUpThemeWrapper;
    ThirdPartyPreBuiltUI.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    return ThirdPartyPreBuiltUI;
})(uiEntry.RecipeRouter);
var SignInAndUp = ThirdPartyPreBuiltUI.SignInAndUp;
var SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

exports.ProvidersForm = ProvidersForm;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpCallback = SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.ThirdPartyPreBuiltUI = ThirdPartyPreBuiltUI;
exports.defaultTranslationsThirdParty = defaultTranslationsThirdParty;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
