"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var WebauthnWebJS = require("supertokens-web-js/lib/build/recipe/webauthn");
var index = require("./authRecipe-shared2.js");
var types = require("./multifactorauth-shared.js");
var utils = require("./authRecipe-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var WebauthnWebJS__default = /*#__PURE__*/ _interopDefault(WebauthnWebJS);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

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
var DEFAULT_WEBAUTHN_RECOVERY_PATH = "/webauthn/recover";
var DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH = "/webauthn/recover/send-email";

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            getEmailExists: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.getEmailExists(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "GET_EMAIL_EXISTS",
                                        exists: response.exists,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            registerCredential: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.registerCredential(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "REGISTER_CREDENTIAL_OK",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            authenticateCredential: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.authenticateCredential(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "AUTHENTICATE_CREDENTIAL_OK",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            registerCredentialWithSignUp: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.registerCredentialWithSignUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "FAILED_TO_REGISTER_USER") {
                                    onHandleEvent({
                                        action: "FAILED_TO_REGISTER_USER",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
        });
    };
};

function normaliseWebauthnConfig(config) {
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
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        {
            signInAndUpFeature: normalisePasskeyBaseConfig(config.signInAndUpFeature),
            recoveryFeature: normalisePasskeyBaseConfig(config.recoveryFeature),
            override: override,
        }
    );
}
function normalisePasskeyBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : "";
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, config), {
        style: style,
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
var Webauthn = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Webauthn, _super);
    function Webauthn(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebauthnWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Webauthn.RECIPE_ID;
        _this.firstFactorIds = [types.FactorIds.WEBAUTHN];
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (context.action === "SEND_RECOVERY_EMAIL") {
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.getDefaultRedirectionURLForPath(
                                this.config,
                                DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH,
                                context
                            ),
                        ];
                    }
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.recipeID = config.recipeId;
        return _this;
        // We can ideally call postInitCallbacks to set MFA's if
        // we are using it.
    }
    Webauthn.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    Webauthn.init = function (config) {
        var normalisedConfig = normaliseWebauthnConfig(config);
        return {
            recipeID: Webauthn.RECIPE_ID,
            authReact: function (appInfo) {
                Webauthn.instance = new Webauthn(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: Webauthn.RECIPE_ID }
                    )
                );
                return Webauthn.instance;
            },
            webJS: WebauthnWebJS__default.default.init(
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
    Webauthn.getInstanceOrThrow = function () {
        if (Webauthn.instance === undefined) {
            var error = "No instance of Webauthn found. Make sure to call the Webauthn.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return Webauthn.instance;
    };
    /*
     * Tests methods.
     */
    Webauthn.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Webauthn.instance = undefined;
        return;
    };
    Webauthn.RECIPE_ID = "webauthn";
    return Webauthn;
})(index.AuthRecipe);

exports.DEFAULT_WEBAUTHN_RECOVERY_PATH = DEFAULT_WEBAUTHN_RECOVERY_PATH;
exports.DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH = DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH;
exports.Provider = Provider;
exports.Webauthn = Webauthn;
exports.useContext = useContext;
