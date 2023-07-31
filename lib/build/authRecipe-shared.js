"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var index = require("./recipeModule-shared.js");
var recipe = require("./session-shared2.js");

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
    genericComponentOverrideContext.__extends(AuthRecipe, _super);
    function AuthRecipe(config) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    } else {
                        throw new Error("Should never come here");
                    }
                });
            });
        };
        _this.signOut = function (input) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe.Session.getInstanceOrThrow().signOut({
                                    userContext: genericComponentOverrideContext.getNormalisedUserContext(
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
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe.Session.getInstanceOrThrow().doesSessionExist({
                                    userContext: genericComponentOverrideContext.getNormalisedUserContext(
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
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var session = recipe.Session.getInstance();
            if (session !== undefined) {
                session.addAuthRecipeRedirectionHandler(_this.config.recipeId, _this.redirect.bind(_this));
            }
        });
        return _this;
    }
    return AuthRecipe;
})(index.RecipeModule);

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
    return genericComponentOverrideContext.normaliseRecipeModuleConfig(config);
}

exports.AuthRecipe = AuthRecipe;
exports.normaliseAuthRecipe = normaliseAuthRecipe;
