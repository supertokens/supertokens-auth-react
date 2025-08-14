"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var MultiFactorAuthWebJS = require("supertokens-web-js/recipe/multifactorauth");
var utils = require("supertokens-web-js/utils");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");
var windowHandler = require("supertokens-web-js/utils/windowHandler");
var index = require("./recipeModule-shared.js");
var types = require("./multifactorauth-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var MultiFactorAuthWebJS__default = /*#__PURE__*/ _interopDefault(MultiFactorAuthWebJS);

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
var MFA_INFO_CACHE_KEY = "st-mfa-info-cache";

// This is a simple in-memory lock using a promise
// We do not need anything more complex than this, since the cache we are locking is in sessionStorage anyway.
var lockProm = undefined;
var getFunctionOverrides = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onHandleEvent
) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            resyncSessionAndFetchMFAInfo: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var stWindow, stored, parsed, unlock, stored_1, parsed, val;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                stWindow = windowHandler.WindowHandlerReference.getReferenceOrThrow();
                                // If someone is refreshing from the server we wait for it to finish.
                                return [4 /*yield*/, lockProm];
                            case 1:
                                // If someone is refreshing from the server we wait for it to finish.
                                _a.sent();
                                return [4 /*yield*/, stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY)];
                            case 2:
                                stored = _a.sent();
                                if (stored !== null) {
                                    parsed = JSON.parse(stored);
                                    if (parsed.t > Date.now() - 1000) {
                                        return [
                                            2 /*return*/,
                                            genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, parsed.v),
                                                {
                                                    // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                                                    // so they could even add specific handling for it if they preferred.
                                                    fetchResponse: new Response(null, { status: 304 }),
                                                }
                                            ),
                                        ];
                                    }
                                }
                                _a.label = 3;
                            case 3:
                                if (!(lockProm !== undefined)) return [3 /*break*/, 5];
                                return [4 /*yield*/, lockProm];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 5:
                                lockProm = new Promise(function (res) {
                                    return (unlock = res);
                                });
                                _a.label = 6;
                            case 6:
                                _a.trys.push([6, , 11, 12]);
                                return [4 /*yield*/, stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY)];
                            case 7:
                                stored_1 = _a.sent();
                                if (stored_1 !== null) {
                                    parsed = JSON.parse(stored_1);
                                    if (parsed.t > Date.now() - 1000) {
                                        return [
                                            2 /*return*/,
                                            genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, parsed.v),
                                                {
                                                    // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                                                    // so they could even add specific handling for it if they preferred.
                                                    fetchResponse: new Response(null, { status: 304 }),
                                                }
                                            ),
                                        ];
                                    }
                                }
                                return [4 /*yield*/, originalImp.resyncSessionAndFetchMFAInfo(input)];
                            case 8:
                                val = _a.sent();
                                if (!(val.status === "OK")) return [3 /*break*/, 10];
                                // We are not storing the fetchResponse
                                return [
                                    4 /*yield*/,
                                    stWindow.windowHandler.sessionStorage.setItem(
                                        MFA_INFO_CACHE_KEY,
                                        JSON.stringify({
                                            t: Date.now(),
                                            v: {
                                                emails: val.emails,
                                                phoneNumbers: val.phoneNumbers,
                                                factors: val.factors,
                                                status: val.status,
                                            },
                                        })
                                    ),
                                ];
                            case 9:
                                // We are not storing the fetchResponse
                                _a.sent();
                                _a.label = 10;
                            case 10:
                                return [2 /*return*/, val];
                            case 11:
                                // Release the lock
                                lockProm = undefined;
                                unlock();
                                return [7 /*endfinally*/];
                            case 12:
                                return [2 /*return*/];
                        }
                    });
                });
            },
        });
    };
};

var MultiFactorAuthClaimClass = /** @class */ (function () {
    function MultiFactorAuthClaimClass(getRecipe, getRedirectURL, onFailureRedirection) {
        var _this = this;
        this.webJSClaim = new MultiFactorAuthWebJS.MultiFactorAuthClaimClass(function () {
            return getRecipe().webJSRecipe;
        });
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;
        var defaultOnFailureRedirection = function (_a) {
            var reason = _a.reason,
                userContext = _a.userContext;
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var recipe, nextFactorOptions, availableFactors, mfaInfo_1, availableFactors;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            recipe = getRecipe();
                            nextFactorOptions =
                                reason.oneOf ||
                                reason.allOfInAnyOrder ||
                                (reason.factorId !== undefined ? [reason.factorId] : undefined);
                            if (!(nextFactorOptions !== undefined)) return [3 /*break*/, 1];
                            genericComponentOverrideContext.logDebugMessage(
                                "Redirecting to MFA on next array from validation failure: " +
                                    nextFactorOptions.join(", ")
                            );
                            availableFactors = recipe
                                .getSecondaryFactors(userContext)
                                .filter(function (v) {
                                    return nextFactorOptions.factors.next.includes(v.id);
                                })
                                .map(function (v) {
                                    return v.id;
                                });
                            // In this case we got here from a validator that defined the list of validators
                            if (availableFactors.length === 1) {
                                return [
                                    2 /*return*/,
                                    getRedirectURL(
                                        { action: "GO_TO_FACTOR", factorId: availableFactors[0] },
                                        userContext
                                    ),
                                ];
                            } else {
                                return [
                                    2 /*return*/,
                                    getRedirectURL(
                                        { action: "FACTOR_CHOOSER", nextFactorOptions: nextFactorOptions },
                                        userContext
                                    ),
                                ];
                            }
                        case 1:
                            return [
                                4 /*yield*/,
                                recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext: userContext }),
                            ];
                        case 2:
                            mfaInfo_1 = _b.sent();
                            availableFactors = recipe
                                .getSecondaryFactors(userContext)
                                .filter(function (v) {
                                    return mfaInfo_1.factors.next.includes(v.id);
                                })
                                .map(function (v) {
                                    return v.id;
                                });
                            genericComponentOverrideContext.logDebugMessage(
                                "Redirecting to MFA on next array from backend: " + availableFactors.join(", ")
                            );
                            if (availableFactors.length === 1) {
                                return [
                                    2 /*return*/,
                                    getRedirectURL(
                                        { action: "GO_TO_FACTOR", factorId: availableFactors[0] },
                                        userContext
                                    ),
                                ];
                            } else {
                                return [2 /*return*/, getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext)];
                            }
                        case 3:
                            // If this happens the user can't complete sign-in (the claim validator fails, but there is no valid next factor for us)
                            // Returning undefined here will make SessionAuth render an access denied screen.
                            return [2 /*return*/, undefined];
                    }
                });
            });
        };
        this.validators = genericComponentOverrideContext.__assign(
            genericComponentOverrideContext.__assign({}, this.webJSClaim.validators),
            {
                hasCompletedMFARequirementsForAuth: function (doRedirection, showAccessDeniedOnFailure) {
                    if (doRedirection === void 0) {
                        doRedirection = true;
                    }
                    if (showAccessDeniedOnFailure === void 0) {
                        showAccessDeniedOnFailure = true;
                    }
                    var orig = _this.webJSClaim.validators.hasCompletedMFARequirementsForAuth();
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, orig),
                        {
                            showAccessDeniedOnFailure: showAccessDeniedOnFailure,
                            onFailureRedirection:
                                onFailureRedirection !== null && onFailureRedirection !== void 0
                                    ? onFailureRedirection
                                    : function (_a) {
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
                                    : function (_a) {
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

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
            getSecondaryFactorInfo: function (orig) {
                return orig;
            },
            factorChooserScreen: (_a = config.factorChooserScreen) !== null && _a !== void 0 ? _a : {},
            override: override,
        }
    );
}
function getAvailableFactors(factors, nextArrayQueryParam, recipe, userContext) {
    genericComponentOverrideContext.logDebugMessage(
        "getAvailableFactors: allowed to setup: ".concat(factors.allowedToSetup)
    );
    genericComponentOverrideContext.logDebugMessage(
        "getAvailableFactors: already setup: ".concat(factors.alreadySetup)
    );
    genericComponentOverrideContext.logDebugMessage("getAvailableFactors: next from factorInfo: ".concat(factors.next));
    genericComponentOverrideContext.logDebugMessage(
        "getAvailableFactors: nextArrayQueryParam: ".concat(nextArrayQueryParam)
    );
    genericComponentOverrideContext.logDebugMessage(
        "getAvailableFactors: secondary factors: ".concat(
            recipe.getSecondaryFactors(userContext).map(function (f) {
                return f.id;
            })
        )
    );
    // There are 3 cases here:
    // 1. The app provided an array of factors to show (nextArrayQueryParam) -> we show whatever is in the array
    // 2. no app provided list and validator passed -> we show all factors available to set up or complete
    // 3. no app provided list and validator failing -> we show whatever the BE tells us to (this is already filtered by allowedToSetup&alreadySetup on the BE)
    var nextArr = nextArrayQueryParam !== undefined ? nextArrayQueryParam.split(",") : factors.next;
    var availableFactors = recipe.getSecondaryFactors(userContext).filter(function (_a) {
        var id = _a.id;
        return nextArr.length === 0
            ? factors.allowedToSetup.includes(id) || factors.alreadySetup.includes(id)
            : nextArr.includes(id);
    });
    return availableFactors;
}

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
        _this.secondaryFactors = [];
        _this.getDefaultRedirectionURL = function (context, userContext) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var nParam, redirectInfo;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    if (context.action === "FACTOR_CHOOSER") {
                        nParam =
                            context.nextFactorOptions && context.nextFactorOptions.length > 0
                                ? context.nextFactorOptions.join(",")
                                : undefined;
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.getDefaultRedirectionURLForPath(
                                this.config,
                                DEFAULT_FACTOR_CHOOSER_PATH,
                                context,
                                {
                                    n: nParam,
                                    stepUp: context.stepUp ? "true" : undefined,
                                }
                            ),
                        ];
                    } else if (context.action === "GO_TO_FACTOR") {
                        redirectInfo = this.getSecondaryFactors(userContext).find(function (f) {
                            return f.id === context.factorId;
                        });
                        if (redirectInfo !== undefined) {
                            return [
                                2 /*return*/,
                                genericComponentOverrideContext.getDefaultRedirectionURLForPath(
                                    this.config,
                                    redirectInfo.path,
                                    context,
                                    {
                                        setup: context.forceSetup ? "true" : undefined,
                                        stepUp: context.stepUp ? "true" : undefined,
                                    }
                                ),
                            ];
                        }
                        throw new Error("Requested redirect to unknown factor id: " + context.factorId);
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var defaultFactorsValidator =
                MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedMFARequirementsForAuth();
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                defaultFactorsValidator
            );
            types.Session.getInstanceOrThrow().addEventListener(function () {
                // We clear the cache if the session updated, since that may mean that the MFA info has changed
                var stWindow = windowHandler.WindowHandlerReference.getReferenceOrThrow();
                stWindow.windowHandler.sessionStorage.removeItemSync(MFA_INFO_CACHE_KEY);
            });
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
            var error = "No instance of MultiFactorAuth found. Make sure to call the MultiFactorAuth.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return MultiFactorAuth.instance;
    };
    MultiFactorAuth.prototype.addMFAFactors = function (secondaryFactors) {
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
    MultiFactorAuth.prototype.isFirstFactorEnabledOnClient = function (factorId) {
        return this.config.firstFactors === undefined || this.config.firstFactors.includes(factorId);
    };
    MultiFactorAuth.prototype.getSecondaryFactors = function (userContext) {
        return this.config.getSecondaryFactorInfo(this.secondaryFactors, userContext);
    };
    MultiFactorAuth.prototype.redirectToFactor = function (_b) {
        var factorId = _b.factorId,
            forceSetup = _b.forceSetup,
            stepUp = _b.stepUp,
            redirectBack = _b.redirectBack,
            navigate = _b.navigate,
            userContext = _b.userContext;
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return genericComponentOverrideContext.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.getRedirectUrl(
                                {
                                    action: "GO_TO_FACTOR",
                                    forceSetup: forceSetup,
                                    stepUp: stepUp,
                                    factorId: factorId,
                                    tenantIdFromQueryParams:
                                        genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                },
                                utils.getNormalisedUserContext(userContext)
                            ),
                        ];
                    case 1:
                        url = _c.sent();
                        if (url === null) {
                            return [2 /*return*/];
                        }
                        // If redirectBack was set to true we always set redirectToPath to that value
                        // otherwise we try and get it from the query params, finally falling back to not setting it.
                        // Example:
                        // 1. If the app calls this on pathX and with redirectBack=false, we redirect to /auth/mfa/factor-id
                        // 2. If the app calls this on pathX and with redirectBack=true, we redirect to /auth/mfa/factor-id?redirectToPath=pathX
                        // 3. If:
                        //      - the app redirects to the factor chooser with redirectBack=true from path=X, they end up on /auth/mfa?redirectToPath=pathX
                        //      - the factor chooser screen then calls this with redirectBack=false, then they end up on /auth/mfa/factor-id?redirectToPath=pathX
                        // 4. In the unlikely case that the app itself uses a `redirectToPath` query param internally
                        //    and is on a custom path that has a redirectToPath set to pathX when calling this function,
                        //    then we keep that in the query params if redirectBack is set to false.
                        if (redirectBack) {
                            redirectUrl =
                                genericComponentOverrideContext.getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
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
                                navigate
                            ),
                        ];
                }
            });
        });
    };
    MultiFactorAuth.prototype.redirectToFactorChooser = function (_b) {
        var _c = _b.redirectBack,
            redirectBack = _c === void 0 ? false : _c,
            _d = _b.nextFactorOptions,
            nextFactorOptions = _d === void 0 ? [] : _d,
            stepUp = _b.stepUp,
            navigate = _b.navigate,
            userContext = _b.userContext;
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return genericComponentOverrideContext.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.getRedirectUrl(
                                {
                                    action: "FACTOR_CHOOSER",
                                    nextFactorOptions: nextFactorOptions,
                                    stepUp: stepUp,
                                    tenantIdFromQueryParams:
                                        genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                },
                                utils.getNormalisedUserContext(userContext)
                            ),
                        ];
                    case 1:
                        url = _e.sent();
                        if (url === null) {
                            return [2 /*return*/];
                        }
                        if (redirectBack) {
                            redirectUrl =
                                genericComponentOverrideContext.getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
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
                                navigate
                            ),
                        ];
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    MultiFactorAuth.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        MultiFactorAuth.instance = undefined;
        return;
    };
    var _a;
    _a = MultiFactorAuth;
    MultiFactorAuth.RECIPE_ID = "multifactorauth";
    MultiFactorAuth.MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        function () {
            return MultiFactorAuth.getInstanceOrThrow();
        },
        function (context, userContext) {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.getInstanceOrThrow().getRedirectUrl(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, context),
                                        {
                                            tenantIdFromQueryParams:
                                                genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                        }
                                    ),
                                    userContext
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _b.sent() || undefined];
                    }
                });
            });
        }
    );
    return MultiFactorAuth;
})(index.RecipeModule);

exports.DEFAULT_FACTOR_CHOOSER_PATH = DEFAULT_FACTOR_CHOOSER_PATH;
exports.MultiFactorAuth = MultiFactorAuth;
exports.getAvailableFactors = getAvailableFactors;
