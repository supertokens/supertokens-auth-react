"use strict";

var utils = require("./recipeModule-shared.js");
var utils$1 = require("./authRecipe-shared.js");
var recipe = require("./passwordless-shared.js");
var componentOverrideContext = require("./thirdparty-shared.js");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

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
    var disablePasswordless = config.disablePasswordless === true;
    var disableThirdParty =
        config.signInUpFeature === undefined ||
        config.signInUpFeature.providers === undefined ||
        config.signInUpFeature.providers.length === 0;
    if (disablePasswordless && disableThirdParty) {
        throw new Error("You need to enable either passwordless or third party providers login.");
    }
    var override = utils.__assign(
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
    return utils.__assign(utils.__assign({}, utils$1.normaliseAuthRecipe(config)), {
        thirdPartyProviderAndEmailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
        thirdpartyUserInput: disableThirdParty
            ? undefined
            : {
                  getRedirectionURL: config.getRedirectionURL,
                  style: config.style,
                  onHandleEvent: config.onHandleEvent,
                  preAPIHook: config.preAPIHook,
                  signInAndUpFeature: utils.__assign(utils.__assign({}, config.signInUpFeature), {
                      style: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  oAuthCallbackScreen: config.oAuthCallbackScreen,
                  useShadowDom: config.useShadowDom,
                  override: {},
              },
        passwordlessUserInput: disablePasswordless
            ? undefined
            : {
                  contactMethod: config.contactMethod,
                  style: config.style,
                  validateEmailAddress: "validateEmailAddress" in config ? config.validateEmailAddress : undefined,
                  validatePhoneNumber: "validatePhoneNumber" in config ? config.validatePhoneNumber : undefined,
                  getRedirectionURL: config.getRedirectionURL,
                  onHandleEvent: config.onHandleEvent,
                  preAPIHook: config.preAPIHook,
                  useShadowDom: config.useShadowDom,
                  signInUpFeature: utils.__assign(utils.__assign({}, config.signInUpFeature), {
                      emailOrPhoneFormStyle: thirdPartyProviderAndEmailOrPhoneFormStyle,
                  }),
                  linkClickedScreenFeature: config.linkClickedScreenFeature,
                  override: {},
              },
        override: override,
    });
}

function getRecipeImplementation$2(originalImplementation) {
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
    };
}

function getRecipeImplementation$1(originalImplementation) {
    return {
        generateStateToSendToOAuthProvider:
            originalImplementation.generateThirdPartyStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getThirdPartyAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getThirdPartyAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getThirdPartyAuthStateFromURL.bind(originalImplementation),
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getThirdPartyAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getThirdPartyStateAndOtherInfoFromStorage.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setThirdPartyStateAndOtherInfoToStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetThirdPartyStateOrThrowError.bind(originalImplementation),
    };
}

function getRecipeImplementation(recipeInput) {
    var passwordlessImpl = recipe.getRecipeImplementation(utils.__assign({}, recipeInput));
    var thirdPartyImpl = componentOverrideContext.getRecipeImplementation(utils.__assign({}, recipeInput));
    return {
        consumePasswordlessCode: function (input) {
            return passwordlessImpl.consumeCode.bind(getRecipeImplementation$2(this))(input);
        },
        createPasswordlessCode: function (input) {
            return passwordlessImpl.createCode.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(getRecipeImplementation$2(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, passwordlessImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input)];
                });
            });
        },
        resendPasswordlessCode: function (input) {
            return passwordlessImpl.resendCode.bind(getRecipeImplementation$2(this))(input);
        },
        clearPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.clearLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.getLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        setPasswordlessLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return passwordlessImpl.getLinkCodeFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return passwordlessImpl.getPreAuthSessionIdFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        getAuthorisationURLFromBackend: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLFromBackend.bind(getRecipeImplementation$1(this))(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input)];
                });
            });
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(getRecipeImplementation$1(this))(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(getRecipeImplementation$1(this))(
                input
            );
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(getRecipeImplementation$1(this))(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return thirdPartyImpl.getAuthStateFromURL.bind(getRecipeImplementation$1(this))(input);
        },
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
var ThirdPartyPasswordless = /** @class */ (function (_super) {
    utils.__extends(ThirdPartyPasswordless, _super);
    function ThirdPartyPasswordless(config, recipes) {
        var _this = _super.call(this, normaliseThirdPartyPasswordlessConfig(config)) || this;
        _this.getDefaultRedirectionURL = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        {
            var builder = new genericComponentOverrideContext.OverrideableBuilder_1(
                getRecipeImplementation({
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
                : new recipe.Passwordless(
                      utils.__assign(utils.__assign({}, _this.config.passwordlessUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: utils.__assign(utils.__assign({}, _this.config.passwordlessUserInput.override), {
                              functions: function () {
                                  return getRecipeImplementation$2(_this.recipeImpl);
                              },
                          }),
                      })
                  );
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.thirdpartyUserInput === undefined
                ? undefined
                : new componentOverrideContext.ThirdParty(
                      utils.__assign(utils.__assign({}, _this.config.thirdpartyUserInput), {
                          appInfo: _this.config.appInfo,
                          recipeId: _this.config.recipeId,
                          override: utils.__assign(utils.__assign({}, _this.config.thirdpartyUserInput.override), {
                              functions: function () {
                                  return getRecipeImplementation$1(_this.recipeImpl);
                              },
                          }),
                      })
                  );
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyPasswordless.init = function (config) {
        return function (appInfo) {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                utils.__assign(utils.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyPasswordless.RECIPE_ID,
                }),
                {
                    passwordlessInstance: undefined,
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
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyPasswordless.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyPasswordless.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    };
    ThirdPartyPasswordless.RECIPE_ID = "thirdpartypasswordless";
    return ThirdPartyPasswordless;
})(utils$1.AuthRecipe);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

exports.Provider = Provider;
exports.ThirdPartyPasswordless = ThirdPartyPasswordless;
exports.useContext = useContext;
//# sourceMappingURL=thirdpartypasswordless-shared.js.map
