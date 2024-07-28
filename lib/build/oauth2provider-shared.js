"use strict";

var superTokens = require("./superTokens.js");
var OAuth2WebJS = require("supertokens-web-js/recipe/oauth2provider");
var index = require("./recipeModule-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var OAuth2WebJS__default = /*#__PURE__*/ _interopDefault(OAuth2WebJS);

function normaliseOAuth2Config(config) {
    return superTokens.__assign(superTokens.__assign({}, superTokens.normaliseRecipeModuleConfig(config)), {
        override: superTokens.__assign(
            {
                functions: function (originalImplementation) {
                    return originalImplementation;
                },
            },
            config === null || config === void 0 ? void 0 : config.override
        ),
    });
}

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
/*
 * Class.
 */
var OAuth2Provider = /** @class */ (function (_super) {
    superTokens.__extends(OAuth2Provider, _super);
    function OAuth2Provider(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = OAuth2WebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = OAuth2Provider.RECIPE_ID;
        return _this;
    }
    OAuth2Provider.init = function (config) {
        var normalisedConfig = normaliseOAuth2Config(config);
        return {
            recipeID: OAuth2Provider.RECIPE_ID,
            authReact: function (appInfo) {
                OAuth2Provider.instance = new OAuth2Provider(
                    superTokens.__assign(superTokens.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: OAuth2Provider.RECIPE_ID,
                    })
                );
                return OAuth2Provider.instance;
            },
            webJS: OAuth2WebJS__default.default.init(superTokens.__assign({}, normalisedConfig)),
        };
    };
    OAuth2Provider.getInstanceOrThrow = function () {
        if (OAuth2Provider.instance === undefined) {
            var error =
                "No instance of OAuth2Provider found. Make sure to call the OAuth2Provider.init method." +
                "See https://supertokens.io/docs/oauth2/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + superTokens.SSR_ERROR;
            }
            throw Error(error);
        }
        return OAuth2Provider.instance;
    };
    OAuth2Provider.getInstance = function () {
        return OAuth2Provider.instance;
    };
    OAuth2Provider.prototype.getDefaultRedirectionURL = function (ctx) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var domain, basePath;
            return superTokens.__generator(this, function (_a) {
                if (ctx.action === "SUCCESS_OAUTH2") {
                    domain = this.config.appInfo.apiDomain.getAsStringDangerous();
                    basePath = this.config.appInfo.apiBasePath.getAsStringDangerous();
                    return [
                        2 /*return*/,
                        "".concat(domain).concat(basePath, "/oauth2/login?loginChallenge=").concat(ctx.loginChallenge),
                    ];
                } else {
                    throw new Error(
                        "Should never come here: unknown action in OAuth2Provider.getDefaultRedirectionURL"
                    );
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    OAuth2Provider.reset = function () {
        if (!superTokens.isTest()) {
            return;
        }
        OAuth2Provider.instance = undefined;
        return;
    };
    OAuth2Provider.RECIPE_ID = "oauth2provider";
    return OAuth2Provider;
})(index.RecipeModule);

exports.OAuth2Provider = OAuth2Provider;
