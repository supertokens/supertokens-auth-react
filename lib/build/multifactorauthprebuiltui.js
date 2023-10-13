"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session-shared3.js");
var componentOverrideContext = require("./multifactorauth-shared2.js");
var React = require("react");
var recipe = require("./session-shared2.js");
var translations = require("./translations.js");
var themeBase = require("./emailpassword-shared.js");
var recipe$1 = require("./multifactorauth-shared.js");
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

function FactorChooserTheme(props) {
    var sessionContext = session.useSessionContext$1();
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return jsxRuntime.jsx("pre", {
            children: JSON.stringify({ props: props, sessionContext: sessionContext }, null, 2),
        });
    }
    // Otherwise, return an empty screen, waiting for the feature component to redirection to complete.
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
                    themeBase.ThemeBase,
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

var defaultTranslationsEmailVerification = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
        {
            EMAIL_VERIFICATION_RESEND_SUCCESS: "Email resent",
            EMAIL_VERIFICATION_SEND_TITLE: "Verify your email address",
            EMAIL_VERIFICATION_SEND_DESC_START: "",
            EMAIL_VERIFICATION_SEND_DESC_STRONG: "Please click on the link",
            EMAIL_VERIFICATION_SEND_DESC_END: " in the email we just sent you to confirm your email address.",
            EMAIL_VERIFICATION_RESEND_BTN: "Resend Email",
            EMAIL_VERIFICATION_LOGOUT: "Logout ",
            EMAIL_VERIFICATION_SUCCESS: "Email verification successful!",
            EMAIL_VERIFICATION_CONTINUE_BTN: "CONTINUE",
            EMAIL_VERIFICATION_CONTINUE_LINK: "Continue",
            EMAIL_VERIFICATION_EXPIRED: "The email verification link has expired",
            EMAIL_VERIFICATION_ERROR_TITLE: "Something went wrong",
            EMAIL_VERIFICATION_ERROR_DESC: "We encountered an unexpected error. Please contact support for assistance",
            EMAIL_VERIFICATION_LINK_CLICKED_HEADER: "Verify your email address",
            EMAIL_VERIFICATION_LINK_CLICKED_DESC: "Please click on the button below to verify your email address",
            EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
        }
    ),
};

var EmailVerification = function (props) {
    var sessionContext = React.useContext(uiEntry.SessionContext);
    var _a = React.useState("LOADING"),
        status = _a[0],
        setStatus = _a[1];
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
    var fetchIsEmailVerified = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            return [4 /*yield*/, props.recipe.webJSRecipe.getMFAInfo({ userContext: userContext })];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        [props.recipe, sessionContext, redirectToAuthWithHistory, userContext]
    );
    var checkIsEmailVerified = React.useCallback(
        function (mfaInfo) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    setStatus("READY" + mfaInfo.factors.isAllowedToSetup.length); // TODO
                    return [2 /*return*/];
                });
            });
        },
        [setStatus]
    );
    var handleError = React.useCallback(
        function (err) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    if (status === "LOADING") {
        return jsxRuntime.jsx(React.Fragment, {});
    }
    // const factorChooserScreen = props.recipe.config.factorChooserScreen;
    var childProps = {
        config: props.recipe.config,
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
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsEmailVerification,
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
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe$1.DEFAULT_FACTOR_CHOOSER_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("factorchooser", props, useComponentOverrides);
                    },
                    recipeID: recipe$1.MultiFactorAuth.RECIPE_ID,
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
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        EmailVerification,
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
            var recipeInstance = recipe$1.MultiFactorAuth.getInstanceOrThrow();
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
