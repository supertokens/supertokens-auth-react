"use strict";
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
const authRecipe_1 = tslib_1.__importDefault(require("../authRecipe"));
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
const normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
const constants_1 = require("./constants");
const constants_2 = require("../../constants");
const signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
const resetPasswordUsingToken_1 = tslib_1.__importDefault(require("./components/features/resetPasswordUsingToken"));
const recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
const authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
const supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
const userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
const emailpassword_1 = tslib_1.__importDefault(require("supertokens-web-js/recipe/emailpassword"));
/*
 * Class.
 */
class EmailPassword extends authRecipe_1.default {
    constructor(config) {
        super((0, utils_2.normaliseEmailPasswordConfig)(config));
        this.getFeatures = () => {
            const features = {};
            if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("signinup", props),
                };
            }
            if (this.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(constants_1.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("resetpassword", props),
                };
            }
            return features;
        };
        this.getDefaultRedirectionURL = (context) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (context.action === "RESET_PASSWORD") {
                    const resetPasswordPath = new normalisedURLPath_1.default(constants_1.DEFAULT_RESET_PASSWORD_PATH);
                    return `${this.config.appInfo.websiteBasePath
                        .appendPath(resetPasswordPath)
                        .getAsStringDangerous()}?rid=${this.config.recipeId}`;
                }
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        this.getFeatureComponent = (componentName, props) => {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return (0, jsx_runtime_1.jsx)(
                        userContextWrapper_1.default,
                        Object.assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    authWidgetWrapper_1.default,
                                    Object.assign(
                                        { authRecipe: this, history: props.history },
                                        {
                                            children: (0, jsx_runtime_1.jsx)(
                                                signInAndUp_1.default,
                                                Object.assign({ recipe: this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return (0, jsx_runtime_1.jsx)(
                        userContextWrapper_1.default,
                        Object.assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    signInAndUp_1.default,
                                    Object.assign({ recipe: this }, props)
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    Object.assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                resetPasswordUsingToken_1.default,
                                Object.assign({ recipe: this }, props)
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        const builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                appInfo: this.config.appInfo,
                recipeId: this.config.recipeId,
                onHandleEvent: this.config.onHandleEvent,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
                webJSRecipe: emailpassword_1.default,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }
    static init(config) {
        return {
            authReact: (appInfo) => {
                EmailPassword.instance = new EmailPassword(
                    Object.assign(Object.assign({}, config), { appInfo, recipeId: EmailPassword.RECIPE_ID })
                );
                return EmailPassword.instance;
            },
            webJS: emailpassword_1.default.init(config),
        };
    }
    static getInstanceOrThrow() {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_2.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    }
}
exports.default = EmailPassword;
EmailPassword.RECIPE_ID = "emailpassword";
