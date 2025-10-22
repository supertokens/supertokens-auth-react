"use strict";

var utils = require("./utils.js");
var index = require("./recipeModule-shared.js");
var types = require("./multifactorauth-shared.js");

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
var AuthRecipe = /** @class */ (function (_super) {
    utils.__extends(AuthRecipe, _super);
    function AuthRecipe() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getAuthRecipeDefaultRedirectionURL = function (_context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    throw new Error("Should never come here");
                });
            });
        };
        _this.signOut = function (input) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().signOut({
                                    userContext: utils.getNormalisedUserContext(
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
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().doesSessionExist({
                                    userContext: utils.getNormalisedUserContext(
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
        return _this;
    }
    return AuthRecipe;
})(index.RecipeModule);

exports.AuthRecipe = AuthRecipe;
