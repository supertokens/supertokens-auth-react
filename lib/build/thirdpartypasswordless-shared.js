"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var ThirdpartyPasswordlessWebJS = require("supertokens-web-js/recipe/thirdpartypasswordless");
var utils = require("./authRecipe-shared.js");
var recipe$1 = require("./passwordless-shared2.js");
var recipe = require("./thirdparty-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var ThirdpartyPasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(ThirdpartyPasswordlessWebJS);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            thirdPartySignInAndUp: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.thirdPartySignInAndUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewRecipeUser: response.createdNewRecipeUser,
                                        user: response.user,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setThirdPartyStateAndOtherInfoToStorage: function (input) {
                return originalImp.setThirdPartyStateAndOtherInfoToStorage({
                    state: genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, input.state),
                        { rid: recipeId, redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL() }
                    ),
                    userContext: input.userContext,
                });
            },
            createPasswordlessCode: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.createPasswordlessCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_CODE_SENT",
                                        isResend: false,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            resendPasswordlessCode: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.resendPasswordlessCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "RESTART_FLOW_ERROR") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_RESTART_FLOW",
                                    });
                                } else if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_CODE_SENT",
                                        isResend: true,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            consumePasswordlessCode: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.consumePasswordlessCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "RESTART_FLOW_ERROR") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_RESTART_FLOW",
                                    });
                                } else if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewRecipeUser: response.createdNewRecipeUser,
                                        user: response.user,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setPasswordlessLoginAttemptInfo: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        return [
                            2 /*return*/,
                            originalImp.setPasswordlessLoginAttemptInfo(
                                genericComponentOverrideContext.__assign(
                                    genericComponentOverrideContext.__assign({}, input),
                                    {
                                        attemptInfo: genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, input.attemptInfo),
                                            input.userContext.additionalAttemptInfo
                                        ),
                                    }
                                )
                            ),
                        ];
                    });
                });
            },
        });
    };
};

function getRecipeImplementation$1(originalImplementation) {
    return {
        clearLoginAttemptInfo: originalImplementation.clearPasswordlessLoginAttemptInfo.bind(originalImplementation),
        consumeCode: originalImplementation.consumePasswordlessCode.bind(originalImplementation),
        createCode: originalImplementation.createPasswordlessCode.bind(originalImplementation),
        doesEmailExist: originalImplementation.doesPasswordlessUserEmailExist.bind(originalImplementation),
        doesPhoneNumberExist: originalImplementation.doesPasswordlessUserPhoneNumberExist.bind(originalImplementation),
        getLoginAttemptInfo: originalImplementation.getPasswordlessLoginAttemptInfo.bind(originalImplementation),
        resendCode: originalImplementation.resendPasswordlessCode.bind(originalImplementation),
        setLoginAttemptInfo: originalImplementation.setPasswordlessLoginAttemptInfo.bind(originalImplementation),
        getLinkCodeFromURL: originalImplementation.getPasswordlessLinkCodeFromURL.bind(originalImplementation),
        getPreAuthSessionIdFromURL:
            originalImplementation.getPasswordlessPreAuthSessionIdFromURL.bind(originalImplementation),
        getTenantIdFromURL: originalImplementation.getTenantIdFromURL.bind(originalImplementation),
    };
}

function getRecipeImplementation(originalImplementation) {
    return {
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getThirdPartyStateAndOtherInfoFromStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
    };
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
function normaliseThirdPartyPasswordlessConfig(config) {
    var _a;
    if (config === undefined) {
        config = {};
    }
    var override = genericComponentOverrideContext.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var thirdPartyProviderAndEmailOrPhoneFormStyle =
        ((_a = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _a === void 0
            ? void 0
            : _a.thirdPartyProviderAndEmailOrPhoneFormStyle) === undefined
            ? ""
            : config === null || config === void 0
            ? void 0
            : config.signInUpFeature.thirdPartyProviderAndEmailOrPhoneFormStyle;
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        {
            thirdPartyProviderAndEmailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
            thirdpartyConfig: recipe.normaliseThirdPartyConfig({
                getRedirectionURL: config.getRedirectionURL,
                style: config.style,
                onHandleEvent: config.onHandleEvent,
                preAPIHook: config.preAPIHook,
                signInAndUpFeature: genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, config.signInUpFeature),
                    { style: thirdPartyProviderAndEmailOrPhoneFormStyle }
                ),
                oAuthCallbackScreen: config.oAuthCallbackScreen,
                useShadowDom: config.useShadowDom,
                override: {},
            }),
            passwordlessConfig: recipe$1.normalisePasswordlessConfig({
                contactMethod: config.contactMethod,
                style: config.style,
                validateEmailAddress: "validateEmailAddress" in config ? config.validateEmailAddress : undefined,
                validatePhoneNumber: "validatePhoneNumber" in config ? config.validatePhoneNumber : undefined,
                getRedirectionURL: config.getRedirectionURL,
                onHandleEvent: config.onHandleEvent,
                preAPIHook: config.preAPIHook,
                useShadowDom: config.useShadowDom,
                signInUpFeature: genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, config.signInUpFeature),
                    { emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle }
                ),
                linkClickedScreenFeature: config.linkClickedScreenFeature,
                override: {},
            }),
            disablePasswordless: config.disablePasswordless === true,
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
var ThirdPartyPasswordless = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = ThirdpartyPasswordlessWebJS__default.default;
        }
        var _this = this;
        var _a, _b, _c;
        var disableThirdParty =
            ((_b = (_a = config.thirdpartyConfig) === null || _a === void 0 ? void 0 : _a.signInAndUpFeature) ===
                null || _b === void 0
                ? void 0
                : _b.providers) === undefined ||
            ((_c = config.thirdpartyConfig) === null || _c === void 0
                ? void 0
                : _c.signInAndUpFeature.providers.length) === 0;
        if (
            genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false &&
            config.disablePasswordless === true &&
            disableThirdParty
        ) {
            throw new Error("You need to enable either passwordless or third party providers login.");
        }
        _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = ThirdPartyPasswordless.RECIPE_ID;
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false &&
                  _this.config.disablePasswordless
                ? undefined
                : new recipe$1.Passwordless(
                      genericComponentOverrideContext.__assign(
                          genericComponentOverrideContext.__assign({}, _this.config.passwordlessConfig),
                          { appInfo: _this.config.appInfo, recipeId: _this.config.recipeId }
                      ),
                      // ThirdPartyPasswordless has passwordless and thirdparty instances initialized within it,
                      // so we pass the ThirdPartyPasswordless instance to getRecipeImpl functions to get each recipe instance
                      // importing the sub-recipes (thirdparty, passwordless) directly from web-js would throw an error due to them not being initialized
                      // getting the appropriate interfaces (the ones exposed by the recipe index files) through the web-js
                      // instance of ThirdPartyPasswordless would require reworking web-js and is impractical
                      getRecipeImplementation$1(_this.webJSRecipe)
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false && disableThirdParty
                ? undefined
                : new recipe.ThirdParty(
                      genericComponentOverrideContext.__assign(
                          genericComponentOverrideContext.__assign({}, _this.config.thirdpartyConfig),
                          { appInfo: _this.config.appInfo, recipeId: _this.config.recipeId }
                      ),
                      getRecipeImplementation(_this.webJSRecipe)
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyPasswordless.init = function (config) {
        var normalisedConfig = normaliseThirdPartyPasswordlessConfig(config);
        return {
            recipeID: ThirdPartyPasswordless.RECIPE_ID,
            authReact: function (appInfo) {
                ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: ThirdPartyPasswordless.RECIPE_ID }
                    ),
                    {
                        passwordlessInstance: undefined,
                        thirdPartyInstance: undefined,
                    }
                );
                return ThirdPartyPasswordless.instance;
            },
            webJS: ThirdpartyPasswordlessWebJS__default.default.init(
                genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, normalisedConfig),
                    {
                        override: {
                            functions: function (originalImpl, builder) {
                                var functions = getFunctionOverrides(
                                    ThirdPartyPasswordless.RECIPE_ID,
                                    normalisedConfig.onHandleEvent
                                );
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
    ThirdPartyPasswordless.getInstanceOrThrow = function () {
        if (ThirdPartyPasswordless.instance === undefined) {
            var error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(utils.AuthRecipe);

exports.Provider = Provider;
exports.ThirdPartyPasswordless = ThirdPartyPasswordless;
exports.useContext = useContext;
