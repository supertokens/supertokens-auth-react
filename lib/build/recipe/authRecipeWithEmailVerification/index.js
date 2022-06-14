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
var authRecipe_1 = tslib_1.__importDefault(require("../authRecipe"));
var recipe_1 = tslib_1.__importDefault(require("../emailverification/recipe"));
var utils_1 = require("../../utils");
var AuthRecipeWithEmailVerification = /** @class */ (function (_super) {
    tslib_1.__extends(AuthRecipeWithEmailVerification, _super);
    function AuthRecipeWithEmailVerification(config, recipes) {
        var _this = _super.call(this, config) || this;
        // this function is used by auth recipes to save the success context before
        // redirecting to email verification screen - so that post verification,
        // the user is redirected to the correct place.
        _this.savePostEmailVerificationSuccessRedirectState = function (context) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var jsonContext;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            jsonContext = JSON.stringify(context);
                            return [
                                4 /*yield*/,
                                (0, utils_1.setLocalStorage)("supertokens-post-email-verification", jsonContext),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.getAuthRecipeWithEmailVerificationDefaultRedirectionURL = function (context) {
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
        _this.getAuthRecipeWithEmailVerificationFeatureComponent = function (componentName, props) {
            return _this.emailVerification.getFeatureComponent(componentName, props);
        };
        _this.getAuthRecipeWithEmailVerificationFeatures = function () {
            return _this.emailVerification.getFeatures();
        };
        _this.emailVerification =
            recipes.emailVerificationInstance === undefined
                ? new recipe_1.default(
                      tslib_1.__assign(
                          tslib_1.__assign(
                              {
                                  appInfo: config.appInfo,
                                  recipeId: config.recipeId,
                                  signOut: _this.signOut,
                                  style: _this.config.rootStyle,
                                  postVerificationRedirect: function (history) {
                                      return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                          var successContextStr;
                                          return tslib_1.__generator(this, function (_a) {
                                              switch (_a.label) {
                                                  case 0:
                                                      _a.trys.push([0, , 6, 8]);
                                                      return [
                                                          4 /*yield*/,
                                                          (0, utils_1.getLocalStorage)(
                                                              "supertokens-post-email-verification"
                                                          ),
                                                      ];
                                                  case 1:
                                                      successContextStr = _a.sent();
                                                      if (!(successContextStr !== null)) return [3 /*break*/, 3];
                                                      return [
                                                          4 /*yield*/,
                                                          this.redirect(JSON.parse(successContextStr), history),
                                                      ];
                                                  case 2:
                                                      _a.sent();
                                                      return [3 /*break*/, 5];
                                                  case 3:
                                                      // else, we do the default behaviour
                                                      return [
                                                          4 /*yield*/,
                                                          this.redirect({
                                                              action: "SUCCESS",
                                                              isNewUser: false,
                                                          }),
                                                      ];
                                                  case 4:
                                                      // else, we do the default behaviour
                                                      _a.sent();
                                                      _a.label = 5;
                                                  case 5:
                                                      return [3 /*break*/, 8];
                                                  case 6:
                                                      return [
                                                          4 /*yield*/,
                                                          (0, utils_1.removeFromLocalStorage)(
                                                              "supertokens-post-email-verification"
                                                          ),
                                                      ];
                                                  case 7:
                                                      _a.sent();
                                                      return [7 /*endfinally*/];
                                                  case 8:
                                                      return [2 /*return*/];
                                              }
                                          });
                                      });
                                  },
                                  redirectToSignIn: function (history) {
                                      return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                          return tslib_1.__generator(this, function (_a) {
                                              return [
                                                  2 /*return*/,
                                                  this.redirectToAuthWithoutRedirectToPath(undefined, history),
                                              ];
                                          });
                                      });
                                  },
                                  getRedirectionURL: config.getRedirectionURL,
                                  onHandleEvent: config.onHandleEvent,
                                  palette: config.palette,
                                  preAPIHook: config.preAPIHook,
                                  useShadowDom: config.useShadowDom,
                              },
                              config.emailVerificationFeature
                          ),
                          { override: config.override === undefined ? undefined : config.override.emailVerification }
                      )
                  )
                : recipes.emailVerificationInstance;
        return _this;
    }
    return AuthRecipeWithEmailVerification;
})(authRecipe_1.default);
exports.default = AuthRecipeWithEmailVerification;
