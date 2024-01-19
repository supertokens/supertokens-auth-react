"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

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
    genericComponentOverrideContext.__extends(RecipeModule, _super);
    function RecipeModule() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.redirect = function (context, navigate, queryParams, userContext) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.getRedirectUrl(
                                    context,
                                    genericComponentOverrideContext.getNormalisedUserContext(userContext)
                                ),
                            ];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl === null) {
                                genericComponentOverrideContext.logDebugMessage(
                                    "Skipping redirection because the user override returned null for context ".concat(
                                        JSON.stringify(context, null, 2)
                                    )
                                );
                                return [2 /*return*/];
                            }
                            redirectUrl = genericComponentOverrideContext.appendQueryParamsToURL(
                                redirectUrl,
                                queryParams
                            );
                            return [
                                2 /*return*/,
                                genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    redirectUrl,
                                    navigate
                                ),
                            ];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        _this.getRedirectUrl = function (context, userContext) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.config.getRedirectionURL(context, userContext)];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl !== undefined) {
                                return [2 /*return*/, redirectUrl];
                            }
                            return [4 /*yield*/, this.getDefaultRedirectionURL(context, userContext)];
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
    RecipeModule.prototype.getDefaultRedirectionURL = function (_, _userContext) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})(genericComponentOverrideContext.BaseRecipeModule);

exports.RecipeModule = RecipeModule;
