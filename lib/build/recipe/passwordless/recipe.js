"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const utils_1 = require("../../utils");
const utils_2 = require("./utils");
const recipeImplementation_1 = tslib_1.__importDefault(require("./recipeImplementation"));
const supertokens_js_override_1 = tslib_1.__importDefault(require("supertokens-js-override"));
const authRecipe_1 = tslib_1.__importDefault(require("../authRecipe"));
const constants_1 = require("../../constants");
const signInAndUp_1 = tslib_1.__importDefault(require("./components/features/signInAndUp"));
const authWidgetWrapper_1 = tslib_1.__importDefault(require("../authRecipe/authWidgetWrapper"));
const linkClickedScreen_1 = tslib_1.__importDefault(require("./components/features/linkClickedScreen"));
const normalisedURLPath_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
const userContextWrapper_1 = tslib_1.__importDefault(require("../../usercontext/userContextWrapper"));
const passwordless_1 = tslib_1.__importDefault(require("supertokens-web-js/recipe/passwordless"));
/*
 * Class.
 */
class Passwordless extends authRecipe_1.default {
    constructor(config) {
        super((0, utils_2.normalisePasswordlessConfig)(config));
        this.getFeatures = () => {
            const features = {};
            if (this.config.signInUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("signInUp", props),
                };
            }
            if (this.config.linkClickedScreenFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/verify")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("linkClickedScreen", props),
                };
            }
            return features;
        };
        this.getDefaultRedirectionURL = (context) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        this.getFeatureComponent = (componentName, props) => {
            if (componentName === "signInUp") {
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
            }
            if (componentName === "linkClickedScreen") {
                return (0, jsx_runtime_1.jsx)(
                    userContextWrapper_1.default,
                    Object.assign(
                        { userContext: props.userContext },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                linkClickedScreen_1.default,
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
                webJSRecipe: passwordless_1.default,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }
    static init(config) {
        return {
            authReact: (appInfo) => {
                Passwordless.instance = new Passwordless(
                    Object.assign(Object.assign({}, config), { appInfo, recipeId: Passwordless.RECIPE_ID })
                );
                return Passwordless.instance;
            },
            webJS: passwordless_1.default.init(config),
        };
    }
    static getInstanceOrThrow() {
        if (Passwordless.instance === undefined) {
            let error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    }
}
exports.default = Passwordless;
Passwordless.RECIPE_ID = "passwordless";
