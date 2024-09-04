"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var TOTPWebJS = require("supertokens-web-js/recipe/totp");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
var index = require("./recipeModule-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var TOTPWebJS__default = /*#__PURE__*/ _interopDefault(TOTPWebJS);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

var TOTPIcon = function () {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "20", height: "19", viewBox: "0 0 20 19", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M13.0727 0.0271478C11.0009 0.343626 9.40589 1.73882 8.89418 3.68227C8.77036 4.1526 8.72854 4.75403 8.7285 6.06551L8.72847 6.85782C8.72846 7.08515 8.91818 7.26943 9.15221 7.26943H10.802C11.0336 7.26943 11.2222 7.08892 11.2257 6.86405L11.241 5.88029C11.2543 5.02626 11.282 4.41187 11.3129 4.28534C11.4705 3.64094 12.0318 2.95777 12.6307 2.68151C13.3876 2.33239 14.1326 2.33395 14.8727 2.68624C15.4121 2.94304 15.9055 3.4903 16.1287 4.07954C16.1973 4.26056 16.2093 4.46369 16.2283 5.7671L16.244 6.84666C16.2473 7.07027 16.4337 7.25044 16.664 7.25242L18.3464 7.26693C18.5842 7.26898 18.7771 7.0807 18.7739 6.8498L18.7587 5.75743C18.7362 4.13746 18.7178 3.96899 18.4901 3.29854C17.951 1.71141 16.5423 0.480359 14.8331 0.102841C14.4113 0.00969604 13.4559 -0.0313816 13.0727 0.0271478ZM7.4996 9.21444V10.3363L7.73224 10.6366C7.86016 10.8018 8.02703 11.0469 8.10301 11.1813L8.24115 11.4256L14.5318 11.4264C15.141 11.4265 15.6345 11.9068 15.6334 12.4986L15.6317 13.3313C15.6311 13.65 15.4843 13.9518 15.2312 14.1547L13.7306 15.3574L13.7296 15.9747C13.7291 16.3045 13.4537 16.5716 13.1142 16.5716H12.967C12.709 16.5716 12.4998 16.3684 12.4998 16.1177V15.6639L11.2497 15.6866L11.2377 16.1291C11.231 16.3753 11.0236 16.5716 10.77 16.5716H10.4658C10.2084 16.5716 9.99968 16.3689 9.99968 16.1188V15.666H8.23954L8.09767 15.9167C8.01966 16.0545 7.85317 16.2999 7.7277 16.4618L7.4996 16.7564V17.8782C7.4996 18.4977 8.01667 19 8.65451 19H17.966C19.0894 19 20 18.1155 20 17.0243V10.0683C20 8.97717 19.0894 8.09263 17.966 8.09263H8.65451C8.01667 8.09263 7.4996 8.59488 7.4996 9.21444ZM3.24099 9.93054C2.90742 9.98249 2.41385 10.1283 2.13265 10.2579C1.08317 10.7416 0.315516 11.6933 0.0797454 12.8028C-0.388447 15.0063 1.26004 17.0657 3.57998 17.1755C5.09152 17.2471 6.48364 16.427 7.14201 15.0771C7.39562 14.5572 7.4707 14.2032 7.47117 13.5257C7.47151 12.9931 7.45913 12.8893 7.35616 12.5605C6.95941 11.2936 5.96426 10.3428 4.7029 10.0255C4.34929 9.93659 3.53994 9.88399 3.24099 9.93054ZM4.36391 12.9495H5.21139C5.44542 12.9495 5.63514 13.1338 5.63514 13.3611V13.7315C5.63514 13.9589 5.44542 14.1431 5.21139 14.1431H3.64355C3.36271 14.1431 3.13505 13.922 3.13505 13.6492V12.1263C3.13505 11.899 3.32477 11.7147 3.5588 11.7147H3.94017C4.17419 11.7147 4.36391 11.899 4.36391 12.1263V12.9495ZM8.67794 12.6419C8.6657 12.6538 8.674 12.7602 8.69642 12.8785C8.73354 13.0743 8.72231 14.2432 8.68188 14.3901C8.66697 14.4443 8.92346 14.4532 10.7738 14.4625L12.8827 14.4732L14.3642 13.271V12.6202H11.5322C9.9746 12.6202 8.69019 12.6299 8.67794 12.6419Z",
                        fill: "url(#paint0_linear_4901_3396)",
                    }),
                    jsxRuntime.jsx("defs", {
                        children: jsxRuntime.jsxs(
                            "linearGradient",
                            genericComponentOverrideContext.__assign(
                                {
                                    id: "paint0_linear_4901_3396",
                                    x1: "10",
                                    y1: "0",
                                    x2: "10",
                                    y2: "19",
                                    gradientUnits: "userSpaceOnUse",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("stop", { stopColor: "#1C222A" }),
                                        jsxRuntime.jsx("stop", { offset: "1", stopColor: "#1C222A" }),
                                    ],
                                }
                            )
                        ),
                    }),
                ],
            }
        )
    );
};

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            createDevice: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.createDevice(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "TOTP_DEVICE_CREATED",
                                        deviceName: response.deviceName,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            verifyDevice: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.verifyDevice(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "TOTP_DEVICE_VERIFIED",
                                        deviceName: input.deviceName,
                                        wasAlreadyVerified: response.wasAlreadyVerified,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            verifyCode: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.verifyCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "TOTP_CODE_VERIFIED",
                                        userContext: input.userContext,
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
function totpCodeValidate(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "GENERAL_ERROR_TOTP_NON_STRING"];
            }
            if (value.length === 0) {
                return [2 /*return*/, "GENERAL_ERROR_TOTP_EMPTY"];
            }
            return [2 /*return*/, undefined];
        });
    });
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
var totpFactor = {
    id: types.FactorIds.TOTP,
    name: "TOTP_MFA_NAME",
    description: "TOTP_MFA_DESCRIPTION",
    path: "/mfa/totp",
    logo: TOTPIcon,
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getDefaultRedirectionURL = function (_context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    throw new Error("Should never come here");
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([totpFactor]);
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
            var error = "No instance of TOTP found. Make sure to call the TOTP.init method.";
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

exports.Provider = Provider;
exports.TOTP = TOTP;
exports.totpCodeValidate = totpCodeValidate;
exports.useContext = useContext;
