"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var MultiFactorAuthWebJS = require("supertokens-web-js/recipe/multifactorauth");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");
var index = require("./recipeModule-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var MultiFactorAuthWebJS__default = /*#__PURE__*/ _interopDefault(MultiFactorAuthWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

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
var DEFAULT_FACTOR_CHOOSER_PATH = "/verify-email";

var getFunctionOverrides = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onHandleEvent
) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign({}, originalImp);
    };
};

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
function normaliseMultiFactorAuthFeature(config) {
    var _a;
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var override = genericComponentOverrideContext.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign(
            {},
            genericComponentOverrideContext.normaliseRecipeModuleConfig(config)
        ),
        {
            disableDefaultUI: disableDefaultUI,
            getFirstFactors:
                (config === null || config === void 0 ? void 0 : config.firstFactors) !== undefined
                    ? function () {
                          return config.firstFactors;
                      }
                    : function () {
                          return MultiFactorAuth.getInstanceOrThrow().getDefaultFirstFactors();
                      },
            factorChooserScreen: (_a = config.factorChooserScreen) !== null && _a !== void 0 ? _a : {},
            override: override,
        }
    );
}

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
var MultiFactorAuth = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(MultiFactorAuth, _super);
    function MultiFactorAuth(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = MultiFactorAuthWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = MultiFactorAuth.RECIPE_ID;
        _this.firstFactors = [];
        _this.factorRedirectionInfo = [];
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var chooserPath, redirectInfo;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (context.action === "FACTOR_CHOICE_REQUIRED") {
                        chooserPath = new NormalisedURLPath__default.default(DEFAULT_FACTOR_CHOOSER_PATH);
                        return [
                            2 /*return*/,
                            ""
                                .concat(
                                    this.config.appInfo.websiteBasePath.appendPath(chooserPath).getAsStringDangerous(),
                                    "?rid="
                                )
                                .concat(this.config.recipeId),
                        ];
                    } else if (context.action === "GO_TO_FACTOR") {
                        redirectInfo = this.factorRedirectionInfo.find(function (f) {
                            return f.id === context.factorId;
                        });
                        if (redirectInfo !== undefined) {
                            return [2 /*return*/, redirectInfo.path];
                        }
                        // TODO: access denied screen if not defined?
                        return [2 /*return*/, "/"];
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var defaultFactorsValidator = MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedDefaultFactors();
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                defaultFactorsValidator
            );
        });
        return _this;
    }
    MultiFactorAuth.init = function (config) {
        var normalisedConfig = normaliseMultiFactorAuthFeature(config);
        return {
            recipeID: MultiFactorAuth.RECIPE_ID,
            authReact: function (appInfo) {
                MultiFactorAuth.instance = new MultiFactorAuth(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: MultiFactorAuth.RECIPE_ID }
                    )
                );
                return MultiFactorAuth.instance;
            },
            webJS: MultiFactorAuthWebJS__default.default.init(
                genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, normalisedConfig),
                    {
                        override: {
                            functions: function (originalImpl, builder) {
                                var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                                builder.override(functions);
                                builder.override(normalisedConfig.override.functions);
                                return originalImpl;
                            },
                        },
                    }
                )
            ),
        };
    };
    MultiFactorAuth.getInstance = function () {
        return MultiFactorAuth.instance;
    };
    MultiFactorAuth.getInstanceOrThrow = function () {
        if (MultiFactorAuth.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return MultiFactorAuth.instance;
    };
    MultiFactorAuth.prototype.getDefaultFirstFactors = function () {
        return this.firstFactors;
    };
    MultiFactorAuth.prototype.addMFAFactors = function (firstFactors, secondaryFactors) {
        var _a, _b;
        (_a = this.firstFactors).push.apply(_a, firstFactors);
        (_b = this.factorRedirectionInfo).push.apply(_b, secondaryFactors);
    };
    MultiFactorAuth.RECIPE_ID = "multifactorauth";
    MultiFactorAuth.MultiFactorAuthClaim = MultiFactorAuthWebJS.MultiFactorAuthClaim;
    return MultiFactorAuth;
})(index.RecipeModule);

exports.DEFAULT_FACTOR_CHOOSER_PATH = DEFAULT_FACTOR_CHOOSER_PATH;
exports.MultiFactorAuth = MultiFactorAuth;
