"use strict";

var superTokens = require("./superTokens.js");

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
var RecipeModule = /** @class */ (function (_super) {
    superTokens.__extends(RecipeModule, _super);
    function RecipeModule() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.redirect = function (context, history, queryParams) {
            return superTokens.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return superTokens.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = superTokens.appendQueryParamsToURL(redirectUrl, queryParams);
                            return [
                                2 /*return*/,
                                superTokens.SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, history),
                            ];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        _this.getRedirectUrl = function (context) {
            return superTokens.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return superTokens.__generator(this, function (_a) {
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
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RecipeModule.prototype.getDefaultRedirectionURL = function (_) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})(superTokens.BaseRecipeModule);

exports.RecipeModule = RecipeModule;
