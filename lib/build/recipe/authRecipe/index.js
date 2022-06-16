"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
var recipe_1 = tslib_1.__importDefault(require("../session/recipe"));
var recipeModule_1 = tslib_1.__importDefault(require("../recipeModule"));
var utils_1 = require("../../utils");
var AuthRecipe = /** @class */ (function (_super) {
    tslib_1.__extends(AuthRecipe, _super);
    function AuthRecipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (context.action === "SIGN_IN_AND_UP") {
                        return [
                            2 /*return*/,
                            ""
                                .concat(this.config.appInfo.websiteBasePath.getAsStringDangerous(), "?rid=")
                                .concat(this.config.recipeId),
                        ];
                    } else if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    } else {
                        throw new Error("Should never come here");
                    }
                    return [2 /*return*/];
                });
            });
        };
        _this.signOut = function (input) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().signOut({
                                    userContext: (0, utils_1.getNormalisedUserContext)(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().doesSessionExist({
                                    userContext: (0, utils_1.getNormalisedUserContext)(
                                        input === null || input === void 0 ? void 0 : input.userContext
                                    ),
                                }),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.redirectToAuthWithRedirectToPath = function (show, history, queryParams) {
            var redirectToPath = (0, utils_1.getCurrentNormalisedUrlPath)().getAsStringDangerous();
            if (queryParams === undefined) {
                queryParams = {};
            }
            queryParams = tslib_1.__assign(tslib_1.__assign({}, queryParams), { redirectToPath: redirectToPath });
            return _this.redirectToAuthWithoutRedirectToPath(show, history, queryParams);
        };
        _this.redirectToAuthWithoutRedirectToPath = function (show, history, queryParams) {
            if (queryParams === undefined) {
                queryParams = {};
            }
            if (show !== undefined) {
                queryParams = tslib_1.__assign(tslib_1.__assign({}, queryParams), { show: show });
            }
            return _this.redirect(
                {
                    action: "SIGN_IN_AND_UP",
                },
                history,
                queryParams
            );
        };
        return _this;
    }
    return AuthRecipe;
})(recipeModule_1.default);
exports.default = AuthRecipe;
