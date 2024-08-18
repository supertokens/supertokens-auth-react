"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session.js");
var componentOverrideContext = require("./oauth2provider-shared2.js");
var React = require("react");
var recipe = require("./oauth2provider-shared.js");
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

var defaultTranslationsOAuth2Provider = {
    en: {},
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
                void props.recipe
                    .redirect(
                        {
                            action: "CONTINUE_OAUTH2_AFTER_REFRESH",
                            loginChallenge: loginChallenge !== null && loginChallenge !== void 0 ? loginChallenge : "",
                            recipeId: "oauth2provider",
                        },
                        props.navigate,
                        {},
                        userContext
                    )
                    .catch(rethrowInRender);
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
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
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
    return OAuth2ProviderPreBuiltUI;
})(uiEntry.RecipeRouter);
var TryRefreshPage = OAuth2ProviderPreBuiltUI.TryRefreshPage;

exports.OAuth2ProviderPreBuiltUI = OAuth2ProviderPreBuiltUI;
exports.TryRefreshPage = TryRefreshPage;
