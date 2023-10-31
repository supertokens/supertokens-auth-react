"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var TOTPWebJS = require("supertokens-web-js/recipe/totp");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var otpIcon = require("./otpIcon.js");
var recipe = require("./multifactorauth-shared.js");
var index = require("./recipeModule-shared.js");
var recipe$1 = require("./session-shared2.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var TOTPWebJS__default = /*#__PURE__*/ _interopDefault(TOTPWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

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
var DEFAULT_TOTP_PATH = "/mfa/totp";

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
        genericComponentOverrideContext.__assign(
            {},
            genericComponentOverrideContext.normaliseRecipeModuleConfig(config)
        ),
        {
            totpMFAScreen: genericComponentOverrideContext.__assign(
                {
                    disableDefaultUI: false,
                    blockedScreenStyle: "",
                    setupScreenStyle: "",
                    verificationScreenStyle: "",
                    loadingScreenStyle: "",
                },
                config.totpMFAScreen
            ),
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
var totpFactor = {
    id: "totp",
    name: "TOTP",
    description: "Use an authenticator app to complete the authentication request",
    path: new NormalisedURLPath__default.default("/mfa/totp"),
    logo: otpIcon.OTPIcon,
};
var TOTP = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(TOTP, _super);
    function TOTP(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = TOTPWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = TOTP.RECIPE_ID;
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var chooserPath;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (context.action === "MFA_TOTP") {
                        chooserPath = new NormalisedURLPath__default.default(DEFAULT_TOTP_PATH);
                        return [
                            2 /*return*/,
                            "".concat(
                                this.config.appInfo.websiteBasePath.appendPath(chooserPath).getAsStringDangerous()
                            ),
                        ];
                    } else if (context.action === "SUCCESS") {
                        return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                    }
                    return [2 /*return*/, "/"];
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([], [totpFactor]);
            }
            var session = recipe$1.Session.getInstance();
            if (session !== undefined) {
                session.addAuthRecipeRedirectionHandler("totp", _this.redirect.bind(_this));
            }
        });
        return _this;
    }
    TOTP.init = function (config) {
        var normalisedConfig = normaliseMultiFactorAuthFeature(config);
        return {
            recipeID: TOTP.RECIPE_ID,
            authReact: function (appInfo) {
                TOTP.instance = new TOTP(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: TOTP.RECIPE_ID }
                    )
                );
                return TOTP.instance;
            },
            webJS: TOTPWebJS__default.default.init(
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
    TOTP.getInstance = function () {
        return TOTP.instance;
    };
    TOTP.getInstanceOrThrow = function () {
        if (TOTP.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return TOTP.instance;
    };
    TOTP.RECIPE_ID = "totp";
    return TOTP;
})(index.RecipeModule);

exports.DEFAULT_TOTP_PATH = DEFAULT_TOTP_PATH;
exports.Provider = Provider;
exports.TOTP = TOTP;
exports.useContext = useContext;
