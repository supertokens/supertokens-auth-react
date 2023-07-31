"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var componentOverrideContext = require("./session-shared.js");
var recipe = require("./session-shared2.js");
var uiEntry = require("./index2.js");
var React = require("react");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

var BooleanClaim = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(BooleanClaim, _super);
    function BooleanClaim(config) {
        var _this = _super.call(this, config) || this;
        var validatorsWithCallbacks = genericComponentOverrideContext.__assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, validator.apply(void 0, args)),
                    {
                        onFailureRedirection: config.onFailureRedirection,
                        showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                    }
                );
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return BooleanClaim;
})(WebJSSessionRecipe.BooleanClaim);

var PrimitiveArrayClaim = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(PrimitiveArrayClaim, _super);
    function PrimitiveArrayClaim(config) {
        var _this = _super.call(this, config) || this;
        var validatorsWithCallbacks = genericComponentOverrideContext.__assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, validator.apply(void 0, args)),
                    {
                        onFailureRedirection: config.onFailureRedirection,
                        showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                    }
                );
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return PrimitiveArrayClaim;
})(WebJSSessionRecipe.PrimitiveArrayClaim);

var PrimitiveClaim = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(PrimitiveClaim, _super);
    function PrimitiveClaim(config) {
        var _this = _super.call(this, config) || this;
        var validatorsWithCallbacks = genericComponentOverrideContext.__assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, validator.apply(void 0, args)),
                    {
                        onFailureRedirection: config.onFailureRedirection,
                        showAccessDeniedOnFailure: config.showAccessDeniedOnFailure,
                    }
                );
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return PrimitiveClaim;
})(WebJSSessionRecipe.PrimitiveClaim);

var useSessionContext$1 = function () {
    var ctx = React__default.default.useContext(uiEntry.SessionContext);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

var useClaimValue$1 = function (claim) {
    var ctx = useSessionContext$1();
    if (ctx.loading) {
        return {
            loading: true,
        };
    }
    if (ctx.doesSessionExist === false) {
        return {
            loading: false,
            doesSessionExist: false,
            value: undefined,
        };
    }
    return {
        loading: false,
        doesSessionExist: true,
        value: claim.getValueFromPayload(ctx.accessTokenPayload),
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
var SessionAPIWrapper = /** @class */ (function () {
    function SessionAPIWrapper() {}
    SessionAPIWrapper.init = function (config) {
        return recipe.Session.init(config);
    };
    SessionAPIWrapper.getUserId = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Session.getInstanceOrThrow().getUserId({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.getAccessToken = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Session.getInstanceOrThrow().getAccessToken({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.getAccessTokenPayloadSecurely = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.attemptRefreshingSession = function () {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [2 /*return*/, recipe.Session.getInstanceOrThrow().attemptRefreshingSession()];
            });
        });
    };
    SessionAPIWrapper.doesSessionExist = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Session.getInstanceOrThrow().doesSessionExist({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    /**
     * @deprecated
     */
    SessionAPIWrapper.addAxiosInterceptors = function (axiosInstance, userContext) {
        return recipe.Session.addAxiosInterceptors(
            axiosInstance,
            genericComponentOverrideContext.getNormalisedUserContext(userContext)
        );
    };
    SessionAPIWrapper.signOut = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.Session.getInstanceOrThrow().signOut({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    SessionAPIWrapper.validateClaims = function (input) {
        return recipe.Session.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators:
                input === null || input === void 0 ? void 0 : input.overrideGlobalClaimValidators,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    SessionAPIWrapper.getInvalidClaimsFromResponse = function (input) {
        return recipe.Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    };
    SessionAPIWrapper.getClaimValue = function (input) {
        return recipe.Session.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    SessionAPIWrapper.useSessionContext = useSessionContext$1;
    SessionAPIWrapper.useClaimValue = useClaimValue$1;
    SessionAPIWrapper.SessionAuth = uiEntry.SessionAuthWrapper;
    SessionAPIWrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return SessionAPIWrapper;
})();
var useSessionContext = SessionAPIWrapper.useSessionContext;
var useClaimValue = SessionAPIWrapper.useClaimValue;
var SessionAuth = SessionAPIWrapper.SessionAuth;
var init = SessionAPIWrapper.init;
var getUserId = SessionAPIWrapper.getUserId;
var getAccessToken = SessionAPIWrapper.getAccessToken;
var getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
var attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
var doesSessionExist = SessionAPIWrapper.doesSessionExist;
/**
 * @deprecated
 */
var addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
var signOut = SessionAPIWrapper.signOut;
var validateClaims = SessionAPIWrapper.validateClaims;
var getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;
var getClaimValue = SessionAPIWrapper.getClaimValue;
var SessionComponentsOverrideProvider = SessionAPIWrapper.ComponentsOverrideProvider;

exports.BooleanClaim = BooleanClaim;
exports.PrimitiveArrayClaim = PrimitiveArrayClaim;
exports.PrimitiveClaim = PrimitiveClaim;
exports.SessionAPIWrapper = SessionAPIWrapper;
exports.SessionAuth = SessionAuth;
exports.SessionComponentsOverrideProvider = SessionComponentsOverrideProvider;
exports.addAxiosInterceptors = addAxiosInterceptors;
exports.attemptRefreshingSession = attemptRefreshingSession;
exports.doesSessionExist = doesSessionExist;
exports.getAccessToken = getAccessToken;
exports.getAccessTokenPayloadSecurely = getAccessTokenPayloadSecurely;
exports.getClaimValue = getClaimValue;
exports.getInvalidClaimsFromResponse = getInvalidClaimsFromResponse;
exports.getUserId = getUserId;
exports.init = init;
exports.signOut = signOut;
exports.useClaimValue = useClaimValue;
exports.useSessionContext = useSessionContext$1;
exports.useSessionContext$1 = useSessionContext;
exports.validateClaims = validateClaims;
