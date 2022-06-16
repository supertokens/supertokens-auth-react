"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
 * Imports.
 */
var recipeModule_1 = tslib_1.__importDefault(require("../recipeModule"));
var emailVerification_1 = tslib_1.__importDefault(require("./components/features/emailVerification"));
var normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("./constants");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var constants_2 = require("../../constants");
var recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
var session_1 = require("../session");
var supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var usercontext_1 = require("../../usercontext");
var EmailVerification = /** @class */ (function (_super) {
    tslib_1.__extends(EmailVerification, _super);
    function EmailVerification(config) {
        var _this = _super.call(this, (0, utils_2.normaliseEmailVerificationFeature)(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.mode !== "OFF" && _this.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props);
                    },
                };
            }
            return features;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_, props) {
            return (0, jsx_runtime_1.jsx)(
                userContextWrapper_1.default,
                tslib_1.__assign(
                    { userContext: props.userContext },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            session_1.SessionAuth,
                            tslib_1.__assign(
                                { requireAuth: false },
                                {
                                    children: (0, jsx_runtime_1.jsx)(usercontext_1.UserContextContext.Consumer, {
                                        children: function (value) {
                                            return (0, jsx_runtime_1.jsx)(
                                                emailVerification_1.default,
                                                tslib_1.__assign(
                                                    { recipe: _this },
                                                    tslib_1.__assign(tslib_1.__assign({}, props), {
                                                        // We do this to make sure it does not add another provider
                                                        userContext: value,
                                                    })
                                                )
                                            );
                                        },
                                    }),
                                }
                            )
                        ),
                    }
                )
            );
        };
        _this.getDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return tslib_1.__generator(this, function (_a) {
                    if (context.action === "VERIFY_EMAIL") {
                        verifyEmailPath = new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH);
                        return [
                            2 /*return*/,
                            ""
                                .concat(
                                    this.config.appInfo.websiteBasePath
                                        .appendPath(verifyEmailPath)
                                        .getAsStringDangerous(),
                                    "?rid="
                                )
                                .concat(this.config.recipeId),
                        ];
                    } else {
                        return [2 /*return*/, "/"];
                    }
                    return [2 /*return*/];
                });
            });
        };
        {
            var builder = new supertokens_js_override_1.default(
                (0, recipeImplementation_1.default)({
                    appInfo: _this.config.appInfo,
                    recipeId: _this.config.recipeId,
                    onHandleEvent: _this.config.onHandleEvent,
                    preAPIHook: _this.config.preAPIHook,
                    postAPIHook: _this.config.postAPIHook,
                })
            );
            _this.recipeImpl = builder.override(_this.config.override.functions).build();
        }
        return _this;
    }
    EmailVerification.init = function (config) {
        return function (appInfo) {
            EmailVerification.instance = new EmailVerification(
                tslib_1.__assign(tslib_1.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: EmailVerification.RECIPE_ID,
                })
            );
            return EmailVerification.instance;
        };
    };
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_2.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.recipeImpl.isEmailVerified({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.RECIPE_ID = "emailverification";
    return EmailVerification;
})(recipeModule_1.default);
exports.default = EmailVerification;
