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
var utils_1 = require("../../utils");
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl, origin_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            redirectUrl = (0, utils_1.appendQueryParamsToURL)(redirectUrl, queryParams);
                            try {
                                new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
                            } catch (e) {
                                origin_1 = (0, utils_1.getOriginOfPage)().getAsStringDangerous();
                                if (origin_1 !== this.config.appInfo.websiteDomain.getAsStringDangerous()) {
                                    redirectUrl = ""
                                        .concat(this.config.appInfo.websiteDomain.getAsStringDangerous())
                                        .concat(redirectUrl);
                                    (0, utils_1.redirectWithFullPageReload)(redirectUrl);
                                    return [2 /*return*/];
                                }
                                // If history was provided, use to redirect without reloading.
                                if (history !== undefined) {
                                    (0, utils_1.redirectWithHistory)(redirectUrl, history);
                                    return [2 /*return*/];
                                }
                            }
                            // Otherwise, redirect in app.
                            (0, utils_1.redirectWithFullPageReload)(redirectUrl);
                            return [2 /*return*/];
                    }
                });
            });
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.getRedirectUrl = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                throw new Error("getDefaultRedirectionURL is not implemented.");
            });
        });
    };
    return RecipeModule;
})();
exports.default = RecipeModule;
