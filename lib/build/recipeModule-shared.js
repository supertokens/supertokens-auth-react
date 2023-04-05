"use strict";

var utils = require("./utils.js");
var cookieHandler = require("supertokens-web-js/utils/cookieHandler");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

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
        this.recipeList = config.recipeList.map(function (recipe) {
            return recipe(_this.appInfo, enableDebugLogs);
        });
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        cookieHandler.CookieHandlerReference.init(config.cookieHandler);
        windowHandler.WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.instance = new SuperTokens(config);
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
    return SuperTokens;
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
        recipeId: config.recipeId,
        appInfo: config.appInfo,
    });
}
function getShouldUseShadowDomBasedOnBrowser(useShadowDom) {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    // If browser is Internet Explorer, always disable shadow dom.
    if (utils.isIE() === true) {
        return false;
    }
    // Otherwise, use provided config or default to true.
    return useShadowDom !== undefined ? useShadowDom : true;
}

exports.RecipeModule = RecipeModule;
exports.SuperTokens = SuperTokens;
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
exports.normaliseRecipeModuleConfig = normaliseRecipeModuleConfig;
//# sourceMappingURL=recipeModule-shared.js.map
