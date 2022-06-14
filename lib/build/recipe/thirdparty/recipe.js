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
var authRecipeWithEmailVerification_1 = tslib_1.__importDefault(require("../authRecipeWithEmailVerification"));
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("../../constants");
var signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
var signInAndUpCallback_1 = tslib_1.__importDefault(require("./components/features/signInAndUpCallback"));
var recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
var authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
var supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
/*
 * Class.
 */
var ThirdParty = /** @class */ (function (_super) {
    tslib_1.__extends(ThirdParty, _super);
    function ThirdParty(config, recipes) {
        var _this =
            _super.call(this, (0, utils_2.normaliseThirdPartyConfig)(config), {
                emailVerificationInstance: recipes.emailVerificationInstance,
            }) || this;
        /*
         * Instance methods.
         */
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop);
                    },
                };
            }
            // Add callback route for each provider.
            _this.config.signInAndUpFeature.providers.forEach(function (provider) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/callback/".concat(provider.id))
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: function () {
                        return (0, utils_2.matchRecipeIdUsingState)(_this, {});
                    },
                    component: function (prop) {
                        return _this.getFeatureComponent("signinupcallback", prop);
                    },
                };
            });
            return tslib_1.__assign(tslib_1.__assign({}, features), _this.getAuthRecipeWithEmailVerificationFeatures());
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signinup") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    tslib_1.__assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                authWidgetWrapper_1.default,
                                tslib_1.__assign(
                                    { authRecipe: _this, history: props.history },
                                    {
                                        children: (0, jsx_runtime_1.jsx)(
                                            signInAndUp_1.default,
                                            tslib_1.__assign({ recipe: _this }, props)
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            } else if (componentName === "signinupcallback") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    tslib_1.__assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                signInAndUpCallback_1.default,
                                tslib_1.__assign({ recipe: _this }, props)
                            ),
                        }
                    )
                );
            } else {
                return _this.getAuthRecipeWithEmailVerificationFeatureComponent(componentName, props);
            }
        };
        _this.getDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeWithEmailVerificationDefaultRedirectionURL(context)];
                });
            });
        };
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
        return _this;
    }
    ThirdParty.init = function (config) {
        return function (appInfo) {
            ThirdParty.instance = new ThirdParty(
                tslib_1.__assign(tslib_1.__assign({}, config), { appInfo: appInfo, recipeId: ThirdParty.RECIPE_ID }),
                {
                    emailVerificationInstance: undefined,
                }
            );
            return ThirdParty.instance;
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(authRecipeWithEmailVerification_1.default);
exports.default = ThirdParty;
