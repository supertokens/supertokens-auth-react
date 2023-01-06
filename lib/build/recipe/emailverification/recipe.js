"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
 * Imports.
 */
const recipeModule_1 = tslib_1.__importDefault(require("../recipeModule"));
const emailVerification_1 = tslib_1.__importDefault(require("./components/features/emailVerification"));
const normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
const constants_1 = require("./constants");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
const constants_2 = require("../../constants");
const recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
const session_1 = require("../session");
const emailverification_1 = require("supertokens-web-js/recipe/emailverification");
const sessionClaimValidatorStore_1 = require("supertokens-website/utils/sessionClaimValidatorStore");
const supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
const userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
const usercontext_1 = require("../../usercontext");
const postSuperTokensInitCallbacks_1 = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
const emailverification_2 = tslib_1.__importDefault(require("supertokens-web-js/recipe/emailverification"));
class EmailVerification extends recipeModule_1.default {
    constructor(config) {
        super((0, utils_2.normaliseEmailVerificationFeature)(config));
        this.getFeatures = () => {
            const features = {};
            if (this.config.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("emailverification", props),
                };
            }
            return features;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getFeatureComponent = (_, props) => {
            return (0, jsx_runtime_1.jsx)(
                userContextWrapper_1.default,
                Object.assign(
                    { userContext: props.userContext },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            session_1.SessionAuth,
                            Object.assign(
                                { requireAuth: false, overrideGlobalClaimValidators: () => [] },
                                {
                                    children: (0, jsx_runtime_1.jsx)(usercontext_1.UserContextContext.Consumer, {
                                        children: (value) => {
                                            return (0, jsx_runtime_1.jsx)(
                                                emailVerification_1.default,
                                                Object.assign(
                                                    { recipe: this },
                                                    Object.assign(Object.assign({}, props), {
                                                        // We do this to make sure it does not add another provider
                                                        userContext: value,
                                                    })
                                                )
                                            );
                                        },
                                    }),
                                }
                            )
                        ),
                    }
                )
            );
        };
        this.getDefaultRedirectionURL = (context) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (context.action === "VERIFY_EMAIL") {
                    const verifyEmailPath = new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH);
                    return `${this.config.appInfo.websiteBasePath
                        .appendPath(verifyEmailPath)
                        .getAsStringDangerous()}?rid=${this.config.recipeId}`;
                } else {
                    return "/";
                }
            });
        {
            const builder = new supertokens_js_override_1.default(
                (0, recipeImplementation_1.default)({
                    appInfo: this.config.appInfo,
                    recipeId: this.config.recipeId,
                    onHandleEvent: this.config.onHandleEvent,
                    preAPIHook: this.config.preAPIHook,
                    postAPIHook: this.config.postAPIHook,
                    webJSRecipe: emailverification_2.default,
                })
            );
            this.recipeImpl = builder.override(this.config.override.functions).build();
        }
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            sessionClaimValidatorStore_1.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
    }
    static init(config) {
        return {
            authReact: (appInfo) => {
                EmailVerification.instance = new EmailVerification(
                    Object.assign(Object.assign({}, config), { appInfo, recipeId: EmailVerification.RECIPE_ID })
                );
                return EmailVerification.instance;
            },
            webJS: emailverification_2.default.init(config),
        };
    }
    static getInstanceOrThrow() {
        if (EmailVerification.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_2.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    }
    isEmailVerified(userContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.recipeImpl.isEmailVerified({
                userContext,
            });
        });
    }
}
exports.default = EmailVerification;
_a = EmailVerification;
EmailVerification.RECIPE_ID = "emailverification";
EmailVerification.EmailVerificationClaim = new emailverification_1.EmailVerificationClaimClass(
    () => EmailVerification.getInstanceOrThrow().recipeImpl,
    (userContext) =>
        tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const recipe = EmailVerification.getInstanceOrThrow();
            if (recipe.config.mode === "REQUIRED") {
                (0, utils_1.saveInvalidClaimRedirectPathInContext)(
                    userContext,
                    yield recipe.getRedirectUrl({ action: "VERIFY_EMAIL" })
                );
            }
        })
);
