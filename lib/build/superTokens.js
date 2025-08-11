'use strict';

var utils = require('./utils.js');
var SuperTokensWebJS = require('supertokens-web-js');
var cookieHandler = require('supertokens-web-js/utils/cookieHandler');
var postSuperTokensInitCallbacks = require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
var windowHandler = require('supertokens-web-js/utils/windowHandler');
var MultitenancyWebJS = require('supertokens-web-js/recipe/multitenancy');
var utils$1 = require('supertokens-web-js/utils');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var SuperTokensWebJS__default = /*#__PURE__*/_interopDefault(SuperTokensWebJS);
var MultitenancyWebJS__default = /*#__PURE__*/_interopDefault(MultitenancyWebJS);

var BaseRecipeModule = /** @class */ (function () {
    /*
     * Constructor.
     */
    function BaseRecipeModule(config) {
        this.config = config;
    }
    return BaseRecipeModule;
}());

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    if (config === undefined) {
        config = {};
    }
    var onHandleEvent = config.onHandleEvent, getRedirectionURL = config.getRedirectionURL, preAPIHook = config.preAPIHook, postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) { };
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) { return utils.__awaiter(_this, void 0, void 0, function () { return utils.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        }); }); };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) { return utils.__awaiter(_this, void 0, void 0, function () { return utils.__generator(this, function (_a) {
            return [2 /*return*/, context];
        }); }); };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () { return utils.__awaiter(_this, void 0, void 0, function () { return utils.__generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
    }
    var rootStyle = config.style === undefined ? "" : config.style;
    return utils.__assign(utils.__assign({}, config), { getRedirectionURL: getRedirectionURL, onHandleEvent: onHandleEvent, preAPIHook: preAPIHook, postAPIHook: postAPIHook, recipeRootStyle: rootStyle });
}

function normaliseMultitenancyConfig(config) {
    return utils.__assign(utils.__assign({}, normaliseRecipeModuleConfig(config)), { override: utils.__assign({ functions: function (originalImplementation) { return originalImplementation; } }, config === null || config === void 0 ? void 0 : config.override) });
}
function hasIntersectingRecipes(tenantMethods, recipeList) {
    return tenantMethods.firstFactors.some(function (factorId) { return recipeList.some(function (r) { return r.firstFactorIds.includes(factorId); }); });
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
        if (webJSRecipe === void 0) { webJSRecipe = MultitenancyWebJS__default.default; }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Multitenancy.RECIPE_ID;
        _this.dynamicLoginMethodsCache = {};
        return _this;
    }
    Multitenancy.prototype.getCurrentDynamicLoginMethods = function (input) {
        var _a;
        return utils.__awaiter(this, void 0, void 0, function () {
            var userContext, tenantId, tenantMethods;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (SuperTokens.usesDynamicLoginMethods === false) {
                            return [2 /*return*/, undefined];
                        }
                        userContext = utils$1.getNormalisedUserContext(input.userContext);
                        return [4 /*yield*/, Multitenancy.getInstanceOrThrow().webJSRecipe.getTenantId()];
                    case 1:
                        tenantId = (_a = (_b.sent())) !== null && _a !== void 0 ? _a : "public";
                        if (this.dynamicLoginMethodsCache[tenantId] === undefined) {
                            this.dynamicLoginMethodsCache[tenantId] = Multitenancy.getDynamicLoginMethods({
                                tenantId: tenantId,
                                userContext: userContext,
                            });
                        }
                        return [4 /*yield*/, this.dynamicLoginMethodsCache[tenantId]];
                    case 2:
                        tenantMethods = _b.sent();
                        if (!hasIntersectingRecipes(tenantMethods, SuperTokens.getInstanceOrThrow().recipeList.filter(function (recipe) { return "firstFactorIds" in recipe; }))) {
                            throw new Error("Initialized recipes have no overlap with core recipes or could not load login methods");
                        }
                        return [2 /*return*/, tenantMethods];
                }
            });
        });
    };
    Multitenancy.getDynamicLoginMethods = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var _a, thirdParty, firstFactors;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, MultitenancyWebJS__default.default.getLoginMethods(input)];
                    case 1:
                        _a = _b.sent(), thirdParty = _a.thirdParty, firstFactors = _a.firstFactors;
                        return [2 /*return*/, {
                                thirdparty: thirdParty,
                                firstFactors: firstFactors,
                            }];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (appInfo) {
                Multitenancy.instance = new Multitenancy(utils.__assign(utils.__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: Multitenancy.RECIPE_ID }));
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS__default.default.init(utils.__assign({}, normalisedConfig)),
        };
    };
    Multitenancy.getInstanceOrThrow = function () {
        if (Multitenancy.instance === undefined) {
            var error = "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend";
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
}(BaseRecipeModule));

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
        this.handlers.set(event, handlerList.filter(function (h) { return h !== handler; }));
    };
    return TranslationController;
}());
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
                case 3: return [2 /*return*/];
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
                case 1: return [2 /*return*/, _b.sent()];
                case 2:
                    _b.sent();
                    // This can throw if we are not in a browser
                    // Since this is just loading a preference we can safely ignore the exception
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
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
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        var _a, _b, _c, _d;
        this.recipeList = [];
        this.changeLanguage = function (lang) { return utils.__awaiter(_this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope)];
                    case 1:
                        _a.sent();
                        this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                        return [2 /*return*/];
                }
            });
        }); };
        this.redirectToAuth = function (options) { return utils.__awaiter(_this, void 0, void 0, function () {
            var queryParams, redirectUrl;
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = options.queryParams === undefined ? {} : options.queryParams;
                        if (options.show !== undefined) {
                            queryParams.show = options.show;
                        }
                        if (options.redirectBack === true) {
                            queryParams.redirectToPath = utils.getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
                        }
                        return [4 /*yield*/, this.getRedirectUrl({
                                action: "TO_AUTH",
                                showSignIn: options.show === "signin",
                                tenantIdFromQueryParams: utils.getTenantIdFromQueryParams(),
                            }, options.userContext)];
                    case 1:
                        redirectUrl = _a.sent();
                        if (redirectUrl === null) {
                            utils.logDebugMessage("Skipping redirection because the user override returned null");
                            return [2 /*return*/];
                        }
                        redirectUrl = utils.appendQueryParamsToURL(redirectUrl, queryParams);
                        return [2 /*return*/, this.redirectToUrl(redirectUrl, options.navigate)];
                }
            });
        }); };
        this.redirectToUrl = function (redirectUrl, navigate) { return utils.__awaiter(_this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                doRedirection(this.appInfo, redirectUrl, navigate);
                return [2 /*return*/];
            });
        }); };
        this.redirect = function (context, navigate, queryParams, userContext) { return utils.__awaiter(_this, void 0, void 0, function () {
            var redirectUrl;
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRedirectUrl(context, utils.getNormalisedUserContext(userContext))];
                    case 1:
                        redirectUrl = _a.sent();
                        if (redirectUrl === null) {
                            utils.logDebugMessage("Skipping redirection because the user override returned null for context ".concat(JSON.stringify(context, null, 2)));
                            return [2 /*return*/];
                        }
                        redirectUrl = utils.appendQueryParamsToURL(redirectUrl, queryParams);
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate)];
                }
            });
        }); };
        this.appInfo = utils.normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error("Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend");
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope: translationConfig.currentLanguageCookieScope !== undefined
                ? utils.normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                : utils.getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = Boolean(config === null || config === void 0 ? void 0 : config.enableDebugLogs);
        if (enableDebugLogs) {
            utils.enableLogging();
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (_a) {
            var authReact = _a.authReact;
            return authReact(_this.appInfo, enableDebugLogs);
        });
        this.rootStyle = (_a = config.style) !== null && _a !== void 0 ? _a : "";
        this.privacyPolicyLink = config.privacyPolicyLink;
        this.termsOfServiceLink = config.termsOfServiceLink;
        this.useShadowDom = (_b = config.useShadowDom) !== null && _b !== void 0 ? _b : true;
        this.defaultToSignUp = (_c = config.defaultToSignUp) !== null && _c !== void 0 ? _c : false;
        this.disableAuthRoute = (_d = config.disableAuthRoute) !== null && _d !== void 0 ? _d : false;
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        var _a;
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.usesDynamicLoginMethods = (_a = config.usesDynamicLoginMethods) !== null && _a !== void 0 ? _a : false;
        var recipes = config.recipeList.find(function (recipe) { return recipe.recipeID === Multitenancy.RECIPE_ID; }) !== undefined
            ? config.recipeList
            : config.recipeList.concat(Multitenancy.init({}));
        SuperTokensWebJS__default.default.init(utils.__assign(utils.__assign({}, config), { recipeList: recipes.map(function (_a) {
                var webJS = _a.webJS;
                return webJS;
            }) }));
        SuperTokens.instance = new SuperTokens(utils.__assign(utils.__assign({}, config), { recipeList: recipes }));
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
    SuperTokens.prototype.getRedirectUrl = function (context, userContext) {
        var _a;
        return utils.__awaiter(this, void 0, void 0, function () {
            var userRes, redirectUrl, basePath;
            var _b;
            return utils.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context, userContext)];
                    case 1:
                        userRes = _c.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _c.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                            basePath = utils.appendTrailingSlashToURL(redirectUrl);
                            if (context.tenantIdFromQueryParams) {
                                return [2 /*return*/, utils.appendQueryParamsToURL(basePath, (_b = {}, _b[utils.TENANT_ID_QUERY_PARAM] = context.tenantIdFromQueryParams, _b))];
                            }
                            return [2 /*return*/, basePath];
                        }
                        else if (context.action === "SUCCESS") {
                            return [2 /*return*/, (_a = context.redirectToPath) !== null && _a !== void 0 ? _a : "/"];
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
    return SuperTokens;
}());
function doRedirection(appInfo, redirectUrl, navigate) {
    try {
        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
    }
    catch (e) {
        // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
        var origin_1 = utils.getOriginOfPage().getAsStringDangerous();
        if (origin_1 !== appInfo.websiteDomain.getAsStringDangerous()) {
            redirectUrl = "".concat(appInfo.websiteDomain.getAsStringDangerous()).concat(redirectUrl);
            utils.redirectWithFullPageReload(redirectUrl);
            return;
        }
        // If navigate was provided, use to redirect without reloading.
        if (navigate !== undefined) {
            utils.redirectWithNavigate(redirectUrl, navigate);
            return;
        }
    }
    // Otherwise, redirect in app.
    utils.redirectWithFullPageReload(redirectUrl);
}

exports.BaseRecipeModule = BaseRecipeModule;
exports.Multitenancy = Multitenancy;
exports.SuperTokens = SuperTokens;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
