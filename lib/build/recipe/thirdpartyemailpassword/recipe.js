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
var react_1 = tslib_1.__importDefault(require("react"));
var authRecipeWithEmailVerification_1 = tslib_1.__importDefault(require("../authRecipeWithEmailVerification"));
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("../../constants");
var signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
var recipe_1 = tslib_1.__importDefault(require("../emailpassword/recipe"));
var recipe_2 = tslib_1.__importDefault(require("../thirdparty/recipe"));
var recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
var authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
var supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
var emailPasswordImplementation_1 = tslib_1.__importDefault(
    require("./recipeImplementation/emailPasswordImplementation")
);
var thirdPartyImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation/thirdPartyImplementation"));
var userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
var ThirdPartyEmailPassword = /** @class */ (function (_super) {
    tslib_1.__extends(ThirdPartyEmailPassword, _super);
    function ThirdPartyEmailPassword(config, recipes) {
        var _this =
            _super.call(this, utils_2.normaliseThirdPartyEmailPasswordConfig(config), {
                emailVerificationInstance: recipes.emailVerificationInstance,
            }) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.emailPasswordRecipe !== undefined) {
                features = tslib_1.__assign(tslib_1.__assign({}, features), _this.emailPasswordRecipe.getFeatures());
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = tslib_1.__assign(tslib_1.__assign({}, features), _this.thirdPartyRecipe.getFeatures());
            }
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: utils_1.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop);
                    },
                };
            }
            return tslib_1.__assign(tslib_1.__assign({}, features), _this.getAuthRecipeWithEmailVerificationFeatures());
        };
        _this.getDefaultRedirectionURL = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        if (this.emailPasswordRecipe === undefined) {
                            throw new Error("Should not come here...");
                        }
                        return [2 /*return*/, this.emailPasswordRecipe.getDefaultRedirectionURL(context)];
                    } else {
                        return [2 /*return*/, this.getAuthRecipeWithEmailVerificationDefaultRedirectionURL(context)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signinup") {
                return react_1.default.createElement(
                    userContextWrapper_1.default,
                    { userContext: props.userContext },
                    react_1.default.createElement(
                        authWidgetWrapper_1.default,
                        { authRecipe: _this, history: props.history },
                        react_1.default.createElement(signInAndUp_1.default, tslib_1.__assign({ recipe: _this }, props))
                    )
                );
            } else if (componentName === "resetpassword") {
                if (_this.emailPasswordRecipe === undefined) {
                    throw new Error("Should not come here...");
                }
                return _this.emailPasswordRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                return _this.getAuthRecipeWithEmailVerificationFeatureComponent(componentName, props);
            }
        };
        var builder = new supertokens_js_override_1.default(
            recipeImplementation_1.default({
                appInfo: _this.config.appInfo,
                recipeId: _this.config.recipeId,
                onHandleEvent: _this.config.onHandleEvent,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        _this.recipeImpl = builder.override(_this.config.override.functions).build();
        _this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : _this.config.disableEmailPassword
                ? undefined
                : new recipe_1.default(
                      {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          emailVerificationFeature: _this.config.emailVerificationFeature,
                          getRedirectionURL: _this.config.getRedirectionURL,
                          onHandleEvent: _this.config.onHandleEvent,
                          palette: _this.config.palette,
                          style: _this.config.rootStyle,
                          preAPIHook: _this.config.preAPIHook,
                          resetPasswordUsingTokenFeature: _this.config.resetPasswordUsingTokenFeature,
                          signInAndUpFeature: _this.config.signInAndUpFeature,
                          useShadowDom: _this.config.useShadowDom,
                          override: {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              functions: function (_) {
                                  return emailPasswordImplementation_1.default(_this.recipeImpl);
                              },
                              components: _this.config.override.components,
                          },
                      },
                      {
                          emailVerificationInstance: _this.emailVerification,
                      }
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.signInAndUpFeature.providers === undefined ||
                  _this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new recipe_2.default(
                      {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          emailVerificationFeature: _this.config.emailVerificationFeature,
                          getRedirectionURL: _this.config.getRedirectionURL,
                          style: _this.config.rootStyle,
                          onHandleEvent: _this.config.onHandleEvent,
                          palette: _this.config.palette,
                          preAPIHook: _this.config.preAPIHook,
                          signInAndUpFeature: _this.config.signInAndUpFeature,
                          oAuthCallbackScreen: _this.config.oAuthCallbackScreen,
                          useShadowDom: _this.config.useShadowDom,
                          override: {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              functions: function (_) {
                                  return thirdPartyImplementation_1.default(_this.recipeImpl);
                              },
                              components: _this.config.override.components,
                          },
                      },
                      {
                          emailVerificationInstance: _this.emailVerification,
                      }
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyEmailPassword.init = function (config) {
        return function (appInfo) {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                tslib_1.__assign(tslib_1.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                }),
                {
                    emailPasswordInstance: undefined,
                    emailVerificationInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyEmailPassword.instance;
        };
    };
    ThirdPartyEmailPassword.getInstanceOrThrow = function () {
        if (ThirdPartyEmailPassword.instance === undefined) {
            var error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method." +
                "See https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyEmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyEmailPassword.reset = function () {
        if (!utils_1.isTest()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    };
    ThirdPartyEmailPassword.RECIPE_ID = "thirdpartyemailpassword";
    return ThirdPartyEmailPassword;
})(authRecipeWithEmailVerification_1.default);
exports.default = ThirdPartyEmailPassword;
