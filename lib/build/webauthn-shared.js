"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var WebauthnWebJS = require("supertokens-web-js/lib/build/recipe/webauthn");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
var index = require("./authRecipe-shared2.js");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var utils = require("./authRecipe-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var WebauthnWebJS__default = /*#__PURE__*/ _interopDefault(WebauthnWebJS);

/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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
function PasskeyIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M5.23974 0.00426122C5.20971 0.00917398 5.11635 0.023531 5.03227 0.0361517C4.26872 0.150797 3.53667 0.527026 2.99234 1.08462C1.7778 2.32876 1.67594 4.23877 2.75137 5.60384C3.47855 6.52688 4.6728 7.04702 5.85871 6.9572C6.17441 6.93329 6.23003 6.92444 6.5173 6.85235C7.49851 6.60612 8.30571 5.98307 8.79333 5.09562C9.19012 4.37346 9.30287 3.48404 9.1018 2.66238C8.85299 1.64555 8.10397 0.756337 7.12878 0.320054C6.63453 0.0989376 6.24276 0.0133032 5.67651 0.00256712C5.46631 -0.00143509 5.26976 -0.000672722 5.23974 0.00426122ZM10.6557 5.27343C10.0527 5.37376 9.55624 5.62311 9.14615 6.03156C8.75205 6.42412 8.50113 6.87791 8.36981 7.43553C8.33814 7.56998 8.33022 7.69015 8.33135 8.01787C8.33214 8.24497 8.34291 8.46891 8.35529 8.51549L8.37778 8.6002L7.45649 9.50016C6.69978 10.2393 6.51909 10.4271 6.44506 10.5509C6.14071 11.0599 6.15283 11.626 6.47843 12.1093C6.65032 12.3645 6.88539 12.5333 7.22706 12.6471C7.41015 12.7081 7.882 12.7037 8.08645 12.6391C8.4564 12.5223 8.46699 12.5139 9.49199 11.5255L10.4357 10.6155L10.6931 10.6508C11.2021 10.7205 11.6431 10.6746 12.1298 10.5012C12.6661 10.3101 13.0696 10.0101 13.4499 9.51964C13.7248 9.16523 13.8805 8.83599 13.9642 8.43238C14.0168 8.17874 14.0105 7.6749 13.9514 7.41044C13.7089 6.3251 12.8932 5.543 11.7477 5.29734C11.5289 5.25043 10.8794 5.2362 10.6557 5.27343ZM11.3837 7.50376C11.6039 7.58029 11.7631 7.85197 11.707 8.05537C11.6436 8.28527 11.4241 8.46336 11.2057 8.46209C11.1131 8.46156 10.9524 8.39644 10.877 8.32889C10.6068 8.08705 10.6618 7.67956 10.9856 7.5231C11.1211 7.45762 11.235 7.45209 11.3837 7.50376ZM4.91216 7.91218C4.22601 8.00179 3.70343 8.15612 3.11079 8.44415C1.63725 9.16034 0.531334 10.5122 0.15953 12.0518C0.0539832 12.4889 -0.0159007 13.1132 0.0031208 13.4491C0.0172068 13.6976 0.126772 13.8739 0.322949 13.9636C0.397419 13.9977 0.734237 14 5.63283 14H10.8632L10.952 13.9539C11.078 13.8885 11.1898 13.7597 11.2349 13.6282C11.2674 13.5334 11.2714 13.4709 11.2602 13.2388C11.239 12.8009 11.1878 12.4787 11.0683 12.0307C11.0094 11.8095 10.9775 11.7616 10.895 11.77C10.8442 11.7752 10.6791 11.9233 10.0829 12.4983C9.35956 13.1959 9.19625 13.338 8.96323 13.4727C8.39003 13.8042 7.595 13.8892 6.92132 13.6911C6.71145 13.6294 6.36331 13.458 6.19271 13.3324C5.60763 12.9016 5.24956 12.2772 5.19726 11.5966C5.15424 11.0364 5.27535 10.5421 5.56898 10.0796C5.67022 9.92014 5.80553 9.77737 6.50092 9.0963C7.2706 8.34249 7.31441 8.29544 7.31441 8.22274C7.31441 8.12885 7.27373 8.1002 7.07419 8.05359C6.30527 7.874 5.57177 7.82603 4.91216 7.91218Z",
                    fill: "currentColor",
                }),
            }
        )
    );
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
var DEFAULT_WEBAUTHN_RECOVERY_PATH = "/webauthn/recover";
var DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH = "/webauthn/recover/send-email";
var DEFAULT_WEBAUTHN_MFA_PATH = "/mfa/webauthn";

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
var webauthnFactor = {
    id: types.FactorIds.WEBAUTHN,
    name: "WEBAUTHN_MFA_NAME",
    description: "WEBAUTHN_MFA_DESCRIPTION",
    path: "/mfa/webauthn",
    logo: PasskeyIcon,
};
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
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([webauthnFactor]);
            }
        });
        return _this;
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

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(undefined, Webauthn.RECIPE_ID),
    useContext = _a[0],
    Provider = _a[1];

exports.DEFAULT_WEBAUTHN_MFA_PATH = DEFAULT_WEBAUTHN_MFA_PATH;
exports.DEFAULT_WEBAUTHN_RECOVERY_PATH = DEFAULT_WEBAUTHN_RECOVERY_PATH;
exports.DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH = DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH;
exports.PasskeyIcon = PasskeyIcon;
exports.Provider = Provider;
exports.Webauthn = Webauthn;
exports.useContext = useContext;
