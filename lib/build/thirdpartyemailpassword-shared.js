"use strict";

var index = require("./index2.js");
var utils = require("./recipeModule-shared.js");
var utils$1 = require("./authRecipe-shared.js");
var recipe = require("./emailpassword-shared3.js");
var recipe$1 = require("./thirdparty-shared.js");

var _a = index.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
function getRecipeImplementation$2(originalImplementation) {
    return {
        doesEmailExist: originalImplementation.doesEmailExist.bind(originalImplementation),
        sendPasswordResetEmail: originalImplementation.sendPasswordResetEmail.bind(originalImplementation),
        getResetPasswordTokenFromURL: originalImplementation.getResetPasswordTokenFromURL.bind(originalImplementation),
        submitNewPassword: originalImplementation.submitNewPassword.bind(originalImplementation),
        signIn: originalImplementation.emailPasswordSignIn.bind(originalImplementation),
        signUp: originalImplementation.emailPasswordSignUp.bind(originalImplementation),
    };
}

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
function getRecipeImplementation$1(originalImplementation) {
    return {
        generateStateToSendToOAuthProvider:
            originalImplementation.generateStateToSendToOAuthProvider.bind(originalImplementation),
        getAuthCodeFromURL: originalImplementation.getAuthCodeFromURL.bind(originalImplementation),
        getAuthErrorFromURL: originalImplementation.getAuthErrorFromURL.bind(originalImplementation),
        getAuthStateFromURL: originalImplementation.getAuthStateFromURL.bind(originalImplementation),
        getAuthorisationURLFromBackend:
            originalImplementation.getAuthorisationURLFromBackend.bind(originalImplementation),
        getAuthorisationURLWithQueryParamsAndSetState:
            originalImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(originalImplementation),
        getStateAndOtherInfoFromStorage:
            originalImplementation.getStateAndOtherInfoFromStorage.bind(originalImplementation),
        setStateAndOtherInfoToStorage:
            originalImplementation.setStateAndOtherInfoToStorage.bind(originalImplementation),
        signInAndUp: originalImplementation.thirdPartySignInAndUp.bind(originalImplementation),
        verifyAndGetStateOrThrowError:
            originalImplementation.verifyAndGetStateOrThrowError.bind(originalImplementation),
    };
}

function getRecipeImplementation(recipeInput) {
    var emailpasswordImpl = recipe.getRecipeImplementation(utils.__assign({}, recipeInput));
    var thirdPartyImpl = recipe$1.getRecipeImplementation(utils.__assign({}, recipeInput));
    return {
        submitNewPassword: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.submitNewPassword.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        sendPasswordResetEmail: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.sendPasswordResetEmail.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        doesEmailExist: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.doesEmailExist.bind(getRecipeImplementation$2(this))(input),
                    ];
                });
            });
        },
        getResetPasswordTokenFromURL: function (input) {
            return emailpasswordImpl.getResetPasswordTokenFromURL.bind(getRecipeImplementation$2(this))(input);
        },
        emailPasswordSignIn: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, emailpasswordImpl.signIn.bind(getRecipeImplementation$2(this))(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        emailPasswordSignUp: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, emailpasswordImpl.signUp.bind(getRecipeImplementation$2(this))(input)];
                });
            });
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
        getAuthorisationURLWithQueryParamsAndSetState: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getAuthorisationURLWithQueryParamsAndSetState.bind(
                            getRecipeImplementation$1(this)
                        )(input),
                    ];
                });
            });
        },
        thirdPartySignInAndUp: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                thirdPartyImpl.signInAndUp.bind(getRecipeImplementation$1(this))(input),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return thirdPartyImpl.getStateAndOtherInfoFromStorage.bind(getRecipeImplementation$1(this))(input);
        },
        setStateAndOtherInfoToStorage: function (input) {
            return thirdPartyImpl.setStateAndOtherInfoToStorage.bind(getRecipeImplementation$1(this))(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return thirdPartyImpl.generateStateToSendToOAuthProvider.bind(getRecipeImplementation$1(this))(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return thirdPartyImpl.verifyAndGetStateOrThrowError.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthCodeFromURL: function (input) {
            return thirdPartyImpl.getAuthCodeFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthErrorFromURL: function (input) {
            return thirdPartyImpl.getAuthErrorFromURL.bind(getRecipeImplementation$1(this))(input);
        },
        getAuthStateFromURL: function (input) {
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
/*
 * Methods.
 */
function normaliseThirdPartyEmailPasswordConfig(config) {
    var disableEmailPassword = config.disableEmailPassword === true;
    if (
        disableEmailPassword &&
        (config.signInAndUpFeature === undefined ||
            config.signInAndUpFeature.providers === undefined ||
            config.signInAndUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
    var override = utils.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var signInAndUpFeature = normaliseSignInUpFeatureConfig(config.signInAndUpFeature);
    return utils.__assign(utils.__assign({}, utils$1.normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: config.oAuthCallbackScreen,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        disableEmailPassword: disableEmailPassword,
        override: override,
    });
}
function normaliseSignInUpFeatureConfig(config) {
    var disableDefaultUI =
        config === undefined || config.disableDefaultUI === undefined ? false : config.disableDefaultUI;
    var defaultToSignUp = config === undefined || config.defaultToSignUp === undefined ? false : config.defaultToSignUp;
    return utils.__assign(utils.__assign({}, config), {
        disableDefaultUI: disableDefaultUI,
        defaultToSignUp: defaultToSignUp,
        style: config === undefined || config.style === undefined ? "" : config.style,
    });
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
var ThirdPartyEmailPassword = /** @class */ (function (_super) {
    utils.__extends(ThirdPartyEmailPassword, _super);
    function ThirdPartyEmailPassword(config, recipes) {
        var _this = _super.call(this, normaliseThirdPartyEmailPasswordConfig(config)) || this;
        _this.getDefaultRedirectionURL = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        if (this.emailPasswordRecipe === undefined) {
                            throw new Error("Should not come here...");
                        }
                        return [2 /*return*/, this.emailPasswordRecipe.getDefaultRedirectionURL(context)];
                    } else {
                        return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                    }
                });
            });
        };
        var builder = new index.OverrideableBuilder_1(
            getRecipeImplementation({
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
                : new recipe.EmailPassword({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      onHandleEvent: _this.config.onHandleEvent,
                      style: _this.config.rootStyle,
                      preAPIHook: _this.config.preAPIHook,
                      resetPasswordUsingTokenFeature: _this.config.resetPasswordUsingTokenFeature,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return getRecipeImplementation$2(_this.recipeImpl);
                          },
                      },
                  });
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.signInAndUpFeature.providers === undefined ||
                  _this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new recipe$1.ThirdParty({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      style: _this.config.rootStyle,
                      onHandleEvent: _this.config.onHandleEvent,
                      preAPIHook: _this.config.preAPIHook,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      oAuthCallbackScreen: _this.config.oAuthCallbackScreen,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return getRecipeImplementation$1(_this.recipeImpl);
                          },
                      },
                  });
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyEmailPassword.init = function (config) {
        return function (appInfo) {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                utils.__assign(utils.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                }),
                {
                    emailPasswordInstance: undefined,
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
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyEmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyEmailPassword.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    };
    ThirdPartyEmailPassword.RECIPE_ID = "thirdpartyemailpassword";
    return ThirdPartyEmailPassword;
})(utils$1.AuthRecipe);

exports.Provider = Provider;
exports.ThirdPartyEmailPassword = ThirdPartyEmailPassword;
exports.useContext = useContext;
//# sourceMappingURL=thirdpartyemailpassword-shared.js.map
