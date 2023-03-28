"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var superTokens = require("./superTokens.js");
var EmailVerificationWebJS = require("supertokens-web-js/recipe/emailverification");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var EmailVerificationWebJS__default = /*#__PURE__*/ _interopDefault(EmailVerificationWebJS);
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
var DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return superTokens.__assign(superTokens.__assign({}, originalImp), {
            verifyEmail: function (input) {
                return superTokens.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return superTokens.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.verifyEmail(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "EMAIL_VERIFIED_SUCCESSFUL",
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            sendVerificationEmail: function (input) {
                return superTokens.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return superTokens.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.sendVerificationEmail(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "VERIFY_EMAIL_SENT",
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
function normaliseEmailVerificationFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var mode = config.mode === undefined ? "REQUIRED" : config.mode;
    var sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : "";
    var sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle,
    };
    var verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : "";
    var verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle,
    };
    var override = superTokens.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return superTokens.__assign(superTokens.__assign({}, superTokens.normaliseRecipeModuleConfig(config)), {
        disableDefaultUI: disableDefaultUI,
        mode: mode,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        override: override,
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
var EmailVerification = /** @class */ (function (_super) {
    superTokens.__extends(EmailVerification, _super);
    function EmailVerification(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = EmailVerificationWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = EmailVerification.RECIPE_ID;
        _this.getDefaultRedirectionURL = function (context) {
            return superTokens.__awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return superTokens.__generator(this, function (_a) {
                    if (context.action === "VERIFY_EMAIL") {
                        verifyEmailPath = new NormalisedURLPath__default.default(DEFAULT_VERIFY_EMAIL_PATH);
                        return [
                            2 /*return*/,
                            ""
                                .concat(
                                    this.config.appInfo.websiteBasePath
                                        .appendPath(verifyEmailPath)
                                        .getAsStringDangerous(),
                                    "?rid="
                                )
                                .concat(this.config.recipeId),
                        ];
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        var normalisedConfig = normaliseEmailVerificationFeature(config);
        return {
            recipeID: EmailVerification.RECIPE_ID,
            authReact: function (
                appInfo,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _
            ) {
                EmailVerification.instance = new EmailVerification(
                    superTokens.__assign(superTokens.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: EmailVerification.RECIPE_ID,
                    })
                );
                return EmailVerification.instance;
            },
            webJS: EmailVerificationWebJS__default.default.init(
                superTokens.__assign(superTokens.__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + superTokens.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.webJSRecipe.isEmailVerified({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.RECIPE_ID = "emailverification";
    EmailVerification.EmailVerificationClaim = new EmailVerificationWebJS.EmailVerificationClaimClass(function () {
        return EmailVerification.getInstanceOrThrow().webJSRecipe;
    });
    return EmailVerification;
})(superTokens.RecipeModule);

exports.DEFAULT_VERIFY_EMAIL_PATH = DEFAULT_VERIFY_EMAIL_PATH;
exports.EmailVerification = EmailVerification;
exports.Provider = Provider;
exports.useContext = useContext;
//# sourceMappingURL=emailverification-shared.js.map
