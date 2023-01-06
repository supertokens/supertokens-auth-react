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
const constants_1 = require("../../constants");
const signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
const signInAndUpCallback_1 = tslib_1.__importDefault(require("./components/features/signInAndUpCallback"));
const recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
const authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
const supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
const userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
const thirdparty_1 = tslib_1.__importDefault(require("supertokens-web-js/recipe/thirdparty"));
/*
 * Class.
 */
class ThirdParty extends authRecipe_1.default {
    constructor(config) {
        super((0, utils_2.normaliseThirdPartyConfig)(config));
        /*
         * Instance methods.
         */
        this.getFeatures = () => {
            const features = {};
            if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (prop) => this.getFeatureComponent("signinup", prop),
                };
            }
            // Add callback route for each provider.
            this.config.signInAndUpFeature.providers.forEach((provider) => {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(`/callback/${provider.id}`)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: () => (0, utils_2.matchRecipeIdUsingState)(this, {}),
                    component: (prop) => this.getFeatureComponent("signinupcallback", prop),
                };
            });
            return features;
        };
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
            } else if (componentName === "signinupcallback") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    Object.assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                signInAndUpCallback_1.default,
                                Object.assign({ recipe: this }, props)
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here");
            }
        };
        this.getDefaultRedirectionURL = (context) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        const builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                appInfo: this.config.appInfo,
                recipeId: this.config.recipeId,
                onHandleEvent: this.config.onHandleEvent,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
                webJSRecipe: thirdparty_1.default,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }
    static init(config) {
        return {
            authReact: (appInfo) => {
                ThirdParty.instance = new ThirdParty(
                    Object.assign(Object.assign({}, config), { appInfo, recipeId: ThirdParty.RECIPE_ID })
                );
                return ThirdParty.instance;
            },
            webJS: thirdparty_1.default.init(config),
        };
    }
    static getInstanceOrThrow() {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            let error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    }
}
exports.default = ThirdParty;
ThirdParty.RECIPE_ID = "thirdparty";
