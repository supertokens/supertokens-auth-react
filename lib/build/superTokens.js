"use strict";

var utils = require("./utils.js");
var SuperTokensWebJS = require("supertokens-web-js");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var SuperTokensWebJS__default = /*#__PURE__*/ _interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/ _interopDefault(MultitenancyWebJS);

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
var RecipeModule = /** @class */ (function () {
    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;
        this.redirect = function (context, history, queryParams) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = utils.appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, history)];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.getRedirectUrl = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.config.getRedirectionURL(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl !== undefined) {
                                return [2 /*return*/, redirectUrl];
                            }
                            return [4 /*yield*/, this.getDefaultRedirectionURL(context)];
                        case 2:
                            // Otherwise, use default.
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.config = config;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RecipeModule.prototype.getDefaultRedirectionURL = function (_) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})();

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    if (config === undefined) {
        config = {};
    }
    var onHandleEvent = config.onHandleEvent,
        getRedirectionURL = config.getRedirectionURL,
        preAPIHook = config.preAPIHook,
        postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) {};
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, undefined];
                });
            });
        };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, context];
                });
            });
        };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
    }
    var useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    useShadowDom = getShouldUseShadowDomBasedOnBrowser(useShadowDom);
    var rootStyle = config.style === undefined ? "" : config.style;
    return utils.__assign(utils.__assign({}, config), {
        getRedirectionURL: getRedirectionURL,
        onHandleEvent: onHandleEvent,
        preAPIHook: preAPIHook,
        postAPIHook: postAPIHook,
        useShadowDom: useShadowDom,
        rootStyle: rootStyle,
    });
}
function getShouldUseShadowDomBasedOnBrowser(useShadowDom) {
    return useShadowDom !== undefined ? useShadowDom : true;
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
function normaliseAuthRecipe(config) {
    return normaliseRecipeModuleConfig(config);
}

function normaliseMultitenancyConfig(config) {
    var getTenantID =
        config.getTenantID !== undefined
            ? config.getTenantID
            : function () {
                  return undefined;
              };
    return utils.__assign(utils.__assign({}, normaliseAuthRecipe(config)), {
        getTenantID: getTenantID,
        override: utils.__assign(
            {
                functions: function (originalImplementation) {
                    return originalImplementation;
                },
            },
            config.override
        ),
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
var Multitenancy = /** @class */ (function (_super) {
    utils.__extends(Multitenancy, _super);
    function Multitenancy(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = MultitenancyWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Multitenancy.RECIPE_ID;
        return _this;
    }
    Multitenancy.prototype.initMultitenancyWithDynamicLoginMethods = function () {
        return utils.__awaiter(this, void 0, void 0, function () {
            var tenantID, tenantMethods, hasIntersection;
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tenantID = Multitenancy.getInstanceOrThrow().config.getTenantID();
                        return [4 /*yield*/, Multitenancy.getDynamicLoginMethods({ tenantId: tenantID })];
                    case 1:
                        tenantMethods = _a.sent();
                        hasIntersection = utils.hasIntersectingRecipes(
                            tenantMethods,
                            SuperTokens.getInstanceOrThrow().recipeList
                        );
                        if (hasIntersection === false) {
                            throw new Error("Initialized recipes have no overlap with core recipes");
                        }
                        SuperTokens.uiController.emit("LoginMethodsLoaded");
                        return [2 /*return*/];
                }
            });
        });
    };
    Multitenancy.getDynamicLoginMethods = function () {
        var options = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            options[_i] = arguments[_i];
        }
        return utils.__awaiter(this, void 0, void 0, function () {
            var instance, _a, emailPassword, passwordless, thirdParty;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        instance = Multitenancy.getInstanceOrThrow();
                        if (instance.dynamicLoginMethods !== undefined) {
                            return [2 /*return*/, instance.dynamicLoginMethods];
                        }
                        return [
                            4 /*yield*/,
                            MultitenancyWebJS__default.default.getLoginMethods.apply(
                                MultitenancyWebJS__default.default,
                                options
                            ),
                        ];
                    case 1:
                        (_a = _b.sent()),
                            (emailPassword = _a.emailPassword),
                            (passwordless = _a.passwordless),
                            (thirdParty = _a.thirdParty);
                        instance.dynamicLoginMethods = {
                            passwordless: passwordless,
                            emailpassword: emailPassword,
                            thirdparty: utils.__assign(utils.__assign({}, thirdParty), {
                                enabled: thirdParty.enabled && thirdParty.providers !== null,
                            }),
                        };
                        return [2 /*return*/, instance.dynamicLoginMethods];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (appInfo) {
                Multitenancy.instance = new Multitenancy(
                    utils.__assign(utils.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Multitenancy.RECIPE_ID,
                    })
                );
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS__default.default.init(utils.__assign({}, normalisedConfig)),
        };
    };
    Multitenancy.getInstanceOrThrow = function () {
        if (Multitenancy.instance === undefined) {
            var error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend"; // TODO check if page exists in docs
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return Multitenancy.instance;
    };
    /*
     * Tests methods.
     */
    Multitenancy.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        Multitenancy.instance = undefined;
        return;
    };
    Multitenancy.RECIPE_ID = "multitenancy";
    return Multitenancy;
})(RecipeModule);

var TranslationController = /** @class */ (function () {
    function TranslationController() {
        this.handlers = new Map();
    }
    TranslationController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    TranslationController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    TranslationController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return TranslationController;
})();
var CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, utils.setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
function getCurrentLanguageFromCookie() {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, utils.getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME)];
                case 1:
                    return [2 /*return*/, _b.sent()];
                case 2:
                    _b.sent();
                    // This can throw if we are not in a browser
                    // Since this is just loading a preference we can safely ignore the exception
                    return [2 /*return*/, null];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}

var UIController = /** @class */ (function () {
    function UIController() {
        this.handlers = new Map();
    }
    UIController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    UIController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    UIController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return UIController;
})();

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
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        this.recipeList = [];
        this.changeLanguage = function (lang) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope),
                            ];
                        case 1:
                            _a.sent();
                            this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.redirectToAuth = function (options) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var queryParams, redirectUrl;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = options.queryParams === undefined ? {} : options.queryParams;
                            if (options.show !== undefined) {
                                queryParams.show = options.show;
                            }
                            if (options.redirectBack === true) {
                                queryParams.redirectToPath = utils.getCurrentNormalisedUrlPath().getAsStringDangerous();
                            }
                            return [
                                4 /*yield*/,
                                this.getRedirectUrl({
                                    action: "TO_AUTH",
                                    showSignIn: options.show === "signin",
                                }),
                            ];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = utils.appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, this.redirectToUrl(redirectUrl, options.history)];
                    }
                });
            });
        };
        this.redirectToUrl = function (redirectUrl, history) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var origin_1;
                return utils.__generator(this, function (_a) {
                    try {
                        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                    } catch (e) {
                        origin_1 = utils.getOriginOfPage().getAsStringDangerous();
                        if (origin_1 !== this.appInfo.websiteDomain.getAsStringDangerous()) {
                            redirectUrl = ""
                                .concat(this.appInfo.websiteDomain.getAsStringDangerous())
                                .concat(redirectUrl);
                            utils.redirectWithFullPageReload(redirectUrl);
                            return [2 /*return*/];
                        }
                        // If history was provided, use to redirect without reloading.
                        if (history !== undefined) {
                            utils.redirectWithHistory(redirectUrl, history);
                            return [2 /*return*/];
                        }
                    }
                    // Otherwise, redirect in app.
                    utils.redirectWithFullPageReload(redirectUrl);
                    return [2 /*return*/];
                });
            });
        };
        this.appInfo = utils.normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope:
                translationConfig.currentLanguageCookieScope !== undefined
                    ? utils.normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                    : utils.getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = false;
        if (config.enableDebugLogs !== undefined) {
            enableDebugLogs = config.enableDebugLogs;
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (_a) {
            var authReact = _a.authReact;
            return authReact(_this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        var _a, _b;
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokensWebJS__default.default.init(
            utils.__assign(utils.__assign({}, config), {
                recipeList: config.recipeList.map(function (_a) {
                    var webJS = _a.webJS;
                    return webJS;
                }),
            })
        );
        var multitenancyRecipe =
            (_a = config.recipeList.find(function (_a) {
                var recipeID = _a.recipeID;
                return recipeID === Multitenancy.RECIPE_ID;
            })) !== null && _a !== void 0
                ? _a
                : Multitenancy.init({});
        // we need to avoid duplicated init call in Supertokens constructor since we are doing it manually
        var recipes = config.recipeList.filter(function (recipe) {
            return recipe.recipeID !== Multitenancy.RECIPE_ID;
        });
        var appInfo = utils.normaliseInputAppInfoOrThrowError(config.appInfo);
        var enableDebugLogs = config.enableDebugLogs === true;
        // initialize auth-react and web-js multitenancy recipes
        multitenancyRecipe.authReact(appInfo, enableDebugLogs);
        multitenancyRecipe.webJS(appInfo, config.clientType, enableDebugLogs);
        SuperTokens.instance = new SuperTokens(utils.__assign(utils.__assign({}, config), { recipeList: recipes }));
        SuperTokens.usesDynamicLoginMethods =
            (_b = config.usesDynamicLoginMethods) !== null && _b !== void 0 ? _b : false;
        if (config.usesDynamicLoginMethods === true) {
            void Multitenancy.getInstanceOrThrow().initMultitenancyWithDynamicLoginMethods().catch();
        }
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    };
    SuperTokens.getInstanceOrThrow = function () {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + utils.SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.prototype.getRecipeOrThrow = function (recipeId) {
        var recipe = this.recipeList.find(function (recipe) {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error("Missing recipe: ".concat(recipeId));
        }
        return recipe;
    };
    SuperTokens.prototype.loadTranslation = function (store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    };
    SuperTokens.prototype.getRedirectUrl = function (context) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var userRes, redirectUrl;
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context)];
                    case 1:
                        userRes = _a.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _a.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                            return [2 /*return*/, utils.appendTrailingSlashToURL(redirectUrl)];
                        }
                        throw new Error("Should never come here: unexpected redirection context");
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    SuperTokens.usesDynamicLoginMethods = false;
    SuperTokens.uiController = new UIController();
    return SuperTokens;
})();

exports.Multitenancy = Multitenancy;
exports.RecipeModule = RecipeModule;
exports.SuperTokens = SuperTokens;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
//# sourceMappingURL=superTokens.js.map
