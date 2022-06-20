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
var recipe_1 = tslib_1.__importDefault(require("../passwordless/recipe"));
var recipe_2 = tslib_1.__importDefault(require("../thirdparty/recipe"));
var recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
var passwordlessImplementation_1 = tslib_1.__importDefault(
    require("./recipeImplementation/passwordlessImplementation")
);
var thirdPartyImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation/thirdPartyImplementation"));
var authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
var supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
var ThirdPartyPasswordless = /** @class */ (function (_super) {
    tslib_1.__extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes) {
        var _this =
            _super.call(this, (0, utils_2.normaliseThirdPartyPasswordlessConfig)(config), {
                emailVerificationInstance: recipes.emailVerificationInstance,
            }) || this;
        _this.getFeatures = function () {
            var _a, _b;
            var features = {};
            if (_this.passwordlessRecipe !== undefined) {
                features = tslib_1.__assign(tslib_1.__assign({}, features), _this.passwordlessRecipe.getFeatures());
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = tslib_1.__assign(tslib_1.__assign({}, features), _this.thirdPartyRecipe.getFeatures());
            }
            if (
                (_this.config.passwordlessUserInput !== undefined &&
                    ((_a = _this.config.passwordlessUserInput.signInUpFeature) === null || _a === void 0
                        ? void 0
                        : _a.disableDefaultUI) !== true) ||
                (_this.config.thirdpartyUserInput !== undefined &&
                    ((_b = _this.config.thirdpartyUserInput.signInAndUpFeature) === null || _b === void 0
                        ? void 0
                        : _b.disableDefaultUI) !== true)
            ) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signInUp", prop);
                    },
                };
            }
            return tslib_1.__assign(tslib_1.__assign({}, features), _this.getAuthRecipeWithEmailVerificationFeatures());
        };
        _this.getDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeWithEmailVerificationDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signInUp") {
                return (0, jsx_runtime_1.jsx)(
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
                );
            } else if (componentName === "linkClickedScreen") {
                if (_this.passwordlessRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return _this.passwordlessRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                return _this.getAuthRecipeWithEmailVerificationFeatureComponent(componentName, props);
            }
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
        _this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : _this.config.passwordlessUserInput === undefined
                ? undefined
                : new recipe_1.default(
                      tslib_1.__assign(tslib_1.__assign({}, _this.config.passwordlessUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: tslib_1.__assign(
                              tslib_1.__assign({}, _this.config.passwordlessUserInput.override),
                              {
                                  functions: function () {
                                      return (0, passwordlessImplementation_1.default)(_this.recipeImpl);
                                  },
                              }
                          ),
                      })
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.thirdpartyUserInput === undefined
                ? undefined
                : new recipe_2.default(
                      tslib_1.__assign(tslib_1.__assign({}, _this.config.thirdpartyUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: tslib_1.__assign(tslib_1.__assign({}, _this.config.thirdpartyUserInput.override), {
                              functions: function () {
                                  return (0, thirdPartyImplementation_1.default)(_this.recipeImpl);
                              },
                          }),
                      }),
                      {
                          emailVerificationInstance: _this.emailVerification,
                      }
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyPasswordless.init = function (config) {
        return function (appInfo) {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                tslib_1.__assign(tslib_1.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyPasswordless.RECIPE_ID,
                }),
                {
                    passwordlessInstance: undefined,
                    emailVerificationInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyPasswordless.instance;
        };
    };
    ThirdPartyPasswordless.getInstanceOrThrow = function () {
        if (ThirdPartyPasswordless.instance === undefined) {
            var error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(authRecipeWithEmailVerification_1.default);
exports.default = ThirdPartyPasswordless;
