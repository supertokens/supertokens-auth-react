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
var DEFAULT_FACTOR_CHOOSER_PATH = "/mfa";

var getFunctionOverrides = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onHandleEvent
) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign({}, originalImp);
    };
};

var MultiFactorAuthClaimClass = /** @class */ (function () {
    function MultiFactorAuthClaimClass(getRecipeImpl, getRedirectURL, onFailureRedirection) {
        var _this = this;
        this.webJSClaim = new MultiFactorAuthWebJS.MultiFactorAuthClaimClass(getRecipeImpl);
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;
        var defaultOnFailureRedirection = function (_a) {
            var reason = _a.reason,
                userContext = _a.userContext;
            if (reason.nextFactorOptions) {
                if (reason.nextFactorOptions.length === 1) {
                    return getRedirectURL(
                        { action: "GO_TO_FACTOR", factorId: reason.nextFactorOptions[0] },
                        userContext
                    );
                } else {
                    return getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext);
                }
            }
            return getRedirectURL({ action: "GO_TO_FACTOR", factorId: reason.factorId }, userContext);
        };
        this.validators = genericComponentOverrideContext.__assign(
            genericComponentOverrideContext.__assign({}, this.webJSClaim.validators),
            {
                hasCompletedDefaultFactors: function (doRedirection, showAccessDeniedOnFailure) {
                    if (doRedirection === void 0) {
                        doRedirection = true;
                    }
                    if (showAccessDeniedOnFailure === void 0) {
                        showAccessDeniedOnFailure = true;
                    }
                    var orig = _this.webJSClaim.validators.hasCompletedDefaultFactors();
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, orig),
                        {
                            showAccessDeniedOnFailure: showAccessDeniedOnFailure,
                            onFailureRedirection:
                                onFailureRedirection !== null && onFailureRedirection !== void 0
                                    ? onFailureRedirection
                                    : function (
                                          _a // TODO: feels brittle to rely on reason
                                      ) {
                                          var reason = _a.reason,
                                              userContext = _a.userContext;
                                          return doRedirection
                                              ? defaultOnFailureRedirection({
                                                    reason: reason,
                                                    userContext: userContext,
                                                })
                                              : undefined;
                                      },
                        }
                    );
                },
                hasCompletedFactors: function (requirements, doRedirection, showAccessDeniedOnFailure) {
                    if (doRedirection === void 0) {
                        doRedirection = true;
                    }
                    if (showAccessDeniedOnFailure === void 0) {
                        showAccessDeniedOnFailure = true;
                    }
                    var orig = _this.webJSClaim.validators.hasCompletedFactors(requirements);
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, orig),
                        {
                            showAccessDeniedOnFailure: showAccessDeniedOnFailure,
                            onFailureRedirection:
                                onFailureRedirection !== null && onFailureRedirection !== void 0
                                    ? onFailureRedirection
                                    : function (
                                          _a // TODO: feels brittle to rely on reason
                                      ) {
                                          var reason = _a.reason,
                                              userContext = _a.userContext;
                                          return doRedirection
                                              ? defaultOnFailureRedirection({
                                                    reason: reason,
                                                    userContext: userContext,
                                                })
                                              : undefined;
                                      },
                        }
                    );
                },
            }
        );
    }
    return MultiFactorAuthClaimClass;
})();

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
            firstFactors: config === null || config === void 0 ? void 0 : config.firstFactors,
            getFactorInfo: function (orig) {
                return orig;
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
        _this.firstFactors = new Set();
        _this.secondaryFactors = [];
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var chooserPath, redirectInfo;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    if (context.action === "FACTOR_CHOOSER") {
                        chooserPath = new NormalisedURLPath__default.default(DEFAULT_FACTOR_CHOOSER_PATH);
                        return [
                            2 /*return*/,
                            this.config.appInfo.websiteBasePath.appendPath(chooserPath).getAsStringDangerous(),
                        ];
                    } else if (context.action === "GO_TO_FACTOR") {
                        redirectInfo = this.getSecondaryFactors().find(function (f) {
                            return f.id === context.factorId;
                        });
                        if (redirectInfo !== undefined) {
                            return [
                                2 /*return*/,
                                this.config.appInfo.websiteBasePath
                                    .appendPath(redirectInfo.path)
                                    .getAsStringDangerous(),
                            ];
                        }
                        throw new Error("Requested redirect to unknown factor id");
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
    MultiFactorAuth.prototype.addMFAFactors = function (firstFactors, secondaryFactors) {
        for (var _i = 0, firstFactors_1 = firstFactors; _i < firstFactors_1.length; _i++) {
            var fact = firstFactors_1[_i];
            this.firstFactors.add(fact);
        }
        this.secondaryFactors = genericComponentOverrideContext.__spreadArray(
            genericComponentOverrideContext.__spreadArray(
                [],
                this.secondaryFactors.filter(function (factor) {
                    return secondaryFactors.every(function (newFactor) {
                        return factor.id !== newFactor.id;
                    });
                }),
                true
            ),
            secondaryFactors,
            true
        );
    };
    MultiFactorAuth.prototype.getFirstFactors = function () {
        var _b;
        return (_b = this.config.firstFactors) !== null && _b !== void 0 ? _b : Array.from(this.firstFactors);
    };
    MultiFactorAuth.prototype.getSecondaryFactors = function () {
        return this.config.getFactorInfo(this.secondaryFactors);
    };
    MultiFactorAuth.prototype.redirectToFactor = function (factorId, redirectBack, history) {
        if (redirectBack === void 0) {
            redirectBack = false;
        }
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return genericComponentOverrideContext.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [4 /*yield*/, this.getRedirectUrl({ action: "GO_TO_FACTOR", factorId: factorId })];
                    case 1:
                        url = _b.sent();
                        if (redirectBack) {
                            redirectUrl = genericComponentOverrideContext
                                .getCurrentNormalisedUrlPath()
                                .getAsStringDangerous();
                            url = genericComponentOverrideContext.appendQueryParamsToURL(url, {
                                redirectToPath: redirectUrl,
                            });
                        } else {
                            redirectUrl = genericComponentOverrideContext.getRedirectToPathFromURL();
                            if (redirectUrl) {
                                url = genericComponentOverrideContext.appendQueryParamsToURL(url, {
                                    redirectToPath: redirectUrl,
                                });
                            }
                        }
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                url,
                                history
                            ),
                        ];
                }
            });
        });
    };
    MultiFactorAuth.prototype.redirectToFactorChooser = function (redirectBack, history) {
        if (redirectBack === void 0) {
            redirectBack = false;
        }
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return genericComponentOverrideContext.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [4 /*yield*/, this.getRedirectUrl({ action: "FACTOR_CHOOSER" })];
                    case 1:
                        url = _b.sent();
                        if (redirectBack) {
                            redirectUrl = genericComponentOverrideContext
                                .getCurrentNormalisedUrlPath()
                                .getAsStringDangerous();
                            url = genericComponentOverrideContext.appendQueryParamsToURL(url, {
                                redirectToPath: redirectUrl,
                            });
                        } else {
                            redirectUrl = genericComponentOverrideContext.getRedirectToPathFromURL();
                            if (redirectUrl) {
                                url = genericComponentOverrideContext.appendQueryParamsToURL(url, {
                                    redirectToPath: redirectUrl,
                                });
                            }
                        }
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                url,
                                history
                            ),
                        ];
                }
            });
        });
    };
    var _a;
    _a = MultiFactorAuth;
    MultiFactorAuth.RECIPE_ID = "multifactorauth";
    MultiFactorAuth.MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        function () {
            return MultiFactorAuth.getInstanceOrThrow().webJSRecipe;
        },
        function (context) {
            return _a.getInstanceOrThrow().getDefaultRedirectionURL(context);
        }
    );
    return MultiFactorAuth;
})(index.RecipeModule);

exports.DEFAULT_FACTOR_CHOOSER_PATH = DEFAULT_FACTOR_CHOOSER_PATH;
exports.MultiFactorAuth = MultiFactorAuth;
