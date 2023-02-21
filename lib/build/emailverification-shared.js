"use strict";

var index = require("./index2.js");
var utils = require("./recipeModule-shared.js");
var emailverification = require("supertokens-web-js/recipe/emailverification");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var sessionClaimValidatorStore = require("supertokens-web-js/utils/sessionClaimValidatorStore");
var recipeImplementation = require("supertokens-web-js/recipe/emailverification/recipeImplementation");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var _a = index.createGenericComponentsOverrideContext(),
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

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = recipeImplementation.getRecipeImplementation(recipeInput);
    return {
        verifyEmail: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.verifyEmail.bind(this)(utils.__assign({}, input))];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
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
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendVerificationEmail.bind(this)(utils.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "VERIFY_EMAIL_SENT",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        isEmailVerified: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.isEmailVerified.bind(this)(utils.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        getEmailVerificationTokenFromURL: function (input) {
            return webJsImplementation.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
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
function normaliseEmailVerificationFeature(config) {
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
    var override = utils.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return utils.__assign(utils.__assign({}, utils.normaliseRecipeModuleConfig(config)), {
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
    utils.__extends(EmailVerification, _super);
    function EmailVerification(config) {
        var _this = _super.call(this, normaliseEmailVerificationFeature(config)) || this;
        _this.getDefaultRedirectionURL = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return utils.__generator(this, function (_b) {
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
        {
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
        }
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        return function (appInfo) {
            EmailVerification.instance = new EmailVerification(
                utils.__assign(utils.__assign({}, config), { appInfo: appInfo, recipeId: EmailVerification.RECIPE_ID })
            );
            return EmailVerification.instance;
        };
    };
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.recipeImpl.isEmailVerified({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    var _a;
    _a = EmailVerification;
    EmailVerification.RECIPE_ID = "emailverification";
    EmailVerification.EmailVerificationClaim = new emailverification.EmailVerificationClaimClass(
        function () {
            return EmailVerification.getInstanceOrThrow().recipeImpl;
        },
        function (userContext) {
            return utils.__awaiter(void 0, void 0, void 0, function () {
                var recipe, _b, _c;
                return utils.__generator(_a, function (_d) {
                    switch (_d.label) {
                        case 0:
                            recipe = EmailVerification.getInstanceOrThrow();
                            if (!(recipe.config.mode === "REQUIRED")) return [3 /*break*/, 2];
                            _b = utils.saveInvalidClaimRedirectPathInContext;
                            _c = [userContext];
                            return [4 /*yield*/, recipe.getRedirectUrl({ action: "VERIFY_EMAIL" })];
                        case 1:
                            _b.apply(void 0, _c.concat([_d.sent()]));
                            _d.label = 2;
                        case 2:
                            return [2 /*return*/];
                    }
                });
            });
        }
    );
    return EmailVerification;
})(utils.RecipeModule);

exports.DEFAULT_VERIFY_EMAIL_PATH = DEFAULT_VERIFY_EMAIL_PATH;
exports.EmailVerification = EmailVerification;
exports.Provider = Provider;
exports.useContext = useContext;
//# sourceMappingURL=emailverification-shared.js.map
