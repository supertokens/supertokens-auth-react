"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var superTokens = require("./superTokens.js");
var ThirdpartyWebJS = require("supertokens-web-js/recipe/thirdparty");
var index = require("./authRecipe-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var translationContext = require("./translationContext.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var ThirdpartyWebJS__default = /*#__PURE__*/ _interopDefault(ThirdpartyWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider$1 = _a[1];

function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    var t = translationContext.useTranslation();
    var providerStyleName = "provider".concat(providerName);
    return jsxRuntime.jsxs(
        "button",
        superTokens.__assign(
            { "data-supertokens": "button providerButton ".concat(providerStyleName) },
            {
                children: [
                    logo !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            superTokens.__assign(
                                { "data-supertokens": "providerButtonLeft" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        superTokens.__assign(
                                            { "data-supertokens": "providerButtonLogo" },
                                            {
                                                children: jsxRuntime.jsx(
                                                    "div",
                                                    superTokens.__assign(
                                                        { "data-supertokens": "providerButtonLogoCenter" },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    jsxRuntime.jsxs(
                        "div",
                        superTokens.__assign(
                            { "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}

/*
 * Imports.
 */
/*
 * Class.
 */
var Provider = /** @class */ (function () {
    /*
     * Constructor.
     */
    function Provider(config) {
        var _this = this;
        this.getButton = function (name) {
            if (_this.buttonComponent !== undefined) {
                if (typeof _this.buttonComponent === "function") {
                    return jsxRuntime.jsx(_this.buttonComponent, {
                        name: name !== null && name !== void 0 ? name : _this.name,
                    });
                }
                return _this.buttonComponent;
            }
            return _this.getDefaultButton(name);
        };
        /*
         * State management.
         */
        this.generateState = function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return "".concat(1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        };
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
        this.getFrontendRedirectURI =
            config.getFrontendRedirectURI !== undefined
                ? config.getFrontendRedirectURI
                : function () {
                      return _this.defaultGetFrontendRedirectURI();
                  };
    }
    /*
     * Components.
     */
    Provider.prototype.getDefaultButton = function (name) {
        var providerName = name !== undefined ? name : this.name;
        return jsxRuntime.jsx(ProviderButton, {
            logo: this.getLogo(),
            providerName: providerName,
            displayName: providerName,
        });
    };
    Provider.prototype.defaultGetFrontendRedirectURI = function () {
        var domain = superTokens.SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default.default("/callback/".concat(this.id));
        var path = superTokens.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    Provider.prototype.getRedirectURIOnProviderDashboard = function () {
        return undefined;
    };
    return Provider;
})();

var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        return superTokens.__assign(superTokens.__assign({}, originalImp), {
            signInAndUp: function (input) {
                return superTokens.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return superTokens.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.signInAndUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        user: response.user,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setStateAndOtherInfoToStorage: function (input) {
                return originalImp.setStateAndOtherInfoToStorage({
                    state: superTokens.__assign(superTokens.__assign({}, input.state), {
                        rid: recipeId,
                        redirectToPath: superTokens.getRedirectToPathFromURL(),
                    }),
                    userContext: input.userContext,
                });
            },
        });
    };
};

/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    superTokens.__extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getLogo = function () {
            return undefined;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    };
    return Custom;
})(Provider);

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
function normaliseThirdPartyConfig(config) {
    if (config === undefined) {
        throw new Error("ThirdParty config should not be empty");
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = superTokens.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return superTokens.__assign(superTokens.__assign({}, superTokens.normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : "";
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin(input) {
    return superTokens.__awaiter(this, void 0, void 0, function () {
        var provider, response;
        return superTokens.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = input.config.signInAndUpFeature.providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            thirdPartyId: input.thirdPartyId,
                            frontendRedirectURI: provider.getFrontendRedirectURI(),
                            redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    response = _a.sent();
                    superTokens.redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
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
 * Class.
 */
var ThirdParty = /** @class */ (function (_super) {
    superTokens.__extends(ThirdParty, _super);
    function ThirdParty(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = ThirdpartyWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = ThirdParty.RECIPE_ID;
        /*
         * Instance methods.
         */
        _this.getDefaultRedirectionURL = function (context) {
            return superTokens.__awaiter(_this, void 0, void 0, function () {
                return superTokens.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        return _this;
    }
    ThirdParty.init = function (config) {
        var normalisedConfig = normaliseThirdPartyConfig(config);
        return {
            recipeID: ThirdParty.RECIPE_ID,
            authReact: function (appInfo) {
                ThirdParty.instance = new ThirdParty(
                    superTokens.__assign(superTokens.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: ThirdParty.RECIPE_ID,
                    })
                );
                return ThirdParty.instance;
            },
            webJS: ThirdpartyWebJS__default.default.init(
                superTokens.__assign(superTokens.__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(ThirdParty.RECIPE_ID, normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + superTokens.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!superTokens.isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(index.AuthRecipe);

exports.Provider = Provider;
exports.Provider$1 = Provider$1;
exports.ThirdParty = ThirdParty;
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.useContext = useContext;
//# sourceMappingURL=thirdparty-shared.js.map
