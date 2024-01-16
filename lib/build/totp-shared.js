"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var TOTPWebJS = require("supertokens-web-js/recipe/totp");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
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

var TOTPIcon = function () {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "23", viewBox: "0 4 22 23", fill: "none" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        d: "M7.56428 15.8664L5.26639 18.1643C5.11403 18.3167 4.90738 18.4023 4.69192 18.4023C4.47645 18.4023 4.2698 18.3167 4.11744 18.1643C3.96508 18.012 3.87949 17.8053 3.87949 17.5898C3.87949 17.3744 3.96508 17.1677 4.11744 17.0154L6.41533 14.7175C6.56769 14.5651 6.77434 14.4795 6.98981 14.4795C7.20528 14.4795 7.41192 14.5651 7.56428 14.7175C7.71664 14.8698 7.80224 15.0765 7.80224 15.292C7.80224 15.5074 7.71664 15.7141 7.56428 15.8664Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M5.17026 13.4675L1.72342 16.9143C1.57106 17.0667 1.36442 17.1523 1.14895 17.1523C0.933477 17.1523 0.726833 17.0667 0.574473 16.9143C0.422113 16.762 0.336519 16.5553 0.336519 16.3398C0.336519 16.1244 0.422113 15.9177 0.574473 15.7654L4.02131 12.3185C4.17367 12.1662 4.38032 12.0806 4.59579 12.0806C4.81125 12.0806 5.0179 12.1662 5.17026 12.3185C5.32262 12.4709 5.40821 12.6775 5.40821 12.893C5.40821 13.1085 5.32262 13.3151 5.17026 13.4675Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M10.0492 18.1315L6.60233 21.5784C6.44997 21.7307 6.24332 21.8163 6.02785 21.8163C5.81238 21.8163 5.60574 21.7307 5.45338 21.5784C5.30102 21.426 5.21542 21.2194 5.21542 21.0039C5.21542 20.7884 5.30102 20.5818 5.45338 20.4294L8.90022 16.9826C9.05258 16.8302 9.25922 16.7446 9.47469 16.7446C9.69016 16.7446 9.89681 16.8302 10.0492 16.9826C10.2015 17.135 10.2871 17.3416 10.2871 17.5571C10.2871 17.7725 10.2015 17.9792 10.0492 18.1315Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M16.935 4.28797L4.96211 8.24925C4.38349 8.47179 4.29448 9.27295 4.87309 9.49549L8.96789 11.3649L14.8876 7.13653L10.6592 13.0562L12.5286 17.151C12.7956 17.6851 13.5523 17.6406 13.7303 17.0175L17.6916 5.04462C17.8696 4.59953 17.4246 4.15444 16.935 4.28797Z",
                        fill: "url(#paint0_linear_3828_8733)",
                    }),
                    jsxRuntime.jsx("defs", {
                        children: jsxRuntime.jsxs(
                            "linearGradient",
                            genericComponentOverrideContext.__assign(
                                {
                                    id: "paint0_linear_3828_8733",
                                    x1: "16.9576",
                                    y1: "4.56946",
                                    x2: "9.50502",
                                    y2: "12.0221",
                                    gradientUnits: "userSpaceOnUse",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("stop", { stopColor: "#5FABFF" }),
                                        jsxRuntime.jsx("stop", { offset: "1", stopColor: "#1485FF" }),
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
                mfa.addMFAFactors([totpFactor]);
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

exports.DEFAULT_TOTP_PATH = DEFAULT_TOTP_PATH;
exports.Provider = Provider;
exports.TOTP = TOTP;
exports.useContext = useContext;
