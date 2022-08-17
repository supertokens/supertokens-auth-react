"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var authRecipe_1 = __importDefault(require("../authRecipe"));
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var normalisedURLPath_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("../../constants");
var signInAndUp_1 = __importDefault(require("./components/features/signInAndUp"));
var recipe_1 = __importDefault(require("../emailpassword/recipe"));
var recipe_2 = __importDefault(require("../thirdparty/recipe"));
var recipeImplementation_1 = __importDefault(require("./recipeImplementation"));
var authWidgetWrapper_1 = __importDefault(require("../authRecipe/authWidgetWrapper"));
var supertokens_js_override_1 = __importDefault(require("supertokens-js-override"));
var emailPasswordImplementation_1 = __importDefault(require("./recipeImplementation/emailPasswordImplementation"));
var thirdPartyImplementation_1 = __importDefault(require("./recipeImplementation/thirdPartyImplementation"));
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var ThirdPartyEmailPassword = /** @class */ (function (_super) {
    __extends(ThirdPartyEmailPassword, _super);
    function ThirdPartyEmailPassword(config, recipes) {
        var _this = _super.call(this, (0, utils_2.normaliseThirdPartyEmailPasswordConfig)(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.emailPasswordRecipe !== undefined) {
                features = __assign(__assign({}, features), _this.emailPasswordRecipe.getFeatures());
            }
            if (_this.thirdPartyRecipe !== undefined) {
                features = __assign(__assign({}, features), _this.thirdPartyRecipe.getFeatures());
            }
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (prop) {
                        return _this.getFeatureComponent("signinup", prop);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        if (this.emailPasswordRecipe === undefined) {
                            throw new Error("Should not come here...");
                        }
                        return [2 /*return*/, this.emailPasswordRecipe.getDefaultRedirectionURL(context)];
                    } else {
                        return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return (0, jsx_runtime_1.jsx)(
                        userContextWrapper_1.default,
                        __assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    authWidgetWrapper_1.default,
                                    __assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: (0, jsx_runtime_1.jsx)(
                                                signInAndUp_1.default,
                                                __assign({ recipe: _this }, props)
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
                        __assign(
                            { userContext: props.userContext },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    signInAndUp_1.default,
                                    __assign({ recipe: _this }, props)
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                if (_this.emailPasswordRecipe === undefined) {
                    throw new Error("Should not come here...");
                }
                return _this.emailPasswordRecipe.getFeatureComponent(componentName, props);
            } else if (componentName === "signinupcallback") {
                if (_this.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                    );
                }
                return _this.thirdPartyRecipe.getFeatureComponent(componentName, props);
            } else {
                throw new Error("Should not come here...");
            }
        };
        var builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                appInfo: _this.config.appInfo,
                recipeId: _this.config.recipeId,
                onHandleEvent: _this.config.onHandleEvent,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        _this.recipeImpl = builder.override(_this.config.override.functions).build();
        _this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : _this.config.disableEmailPassword
                ? undefined
                : new recipe_1.default({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      onHandleEvent: _this.config.onHandleEvent,
                      palette: _this.config.palette,
                      style: _this.config.rootStyle,
                      preAPIHook: _this.config.preAPIHook,
                      resetPasswordUsingTokenFeature: _this.config.resetPasswordUsingTokenFeature,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return (0, emailPasswordImplementation_1.default)(_this.recipeImpl);
                          },
                          components: _this.config.override.components,
                      },
                  });
        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        _this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : _this.config.signInAndUpFeature.providers === undefined ||
                  _this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new recipe_2.default({
                      appInfo: _this.config.appInfo,
                      recipeId: _this.config.recipeId,
                      getRedirectionURL: _this.config.getRedirectionURL,
                      style: _this.config.rootStyle,
                      onHandleEvent: _this.config.onHandleEvent,
                      palette: _this.config.palette,
                      preAPIHook: _this.config.preAPIHook,
                      signInAndUpFeature: _this.config.signInAndUpFeature,
                      oAuthCallbackScreen: _this.config.oAuthCallbackScreen,
                      useShadowDom: _this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: function (_) {
                              return (0, thirdPartyImplementation_1.default)(_this.recipeImpl);
                          },
                          components: _this.config.override.components,
                      },
                  });
        return _this;
    }
    /*
     * Static methods.
     */
    ThirdPartyEmailPassword.init = function (config) {
        return function (appInfo) {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                __assign(__assign({}, config), { appInfo: appInfo, recipeId: ThirdPartyEmailPassword.RECIPE_ID }),
                {
                    emailPasswordInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyEmailPassword.instance;
        };
    };
    ThirdPartyEmailPassword.getInstanceOrThrow = function () {
        if (ThirdPartyEmailPassword.instance === undefined) {
            var error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method." +
                "See https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_1.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdPartyEmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    ThirdPartyEmailPassword.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    };
    ThirdPartyEmailPassword.RECIPE_ID = "thirdpartyemailpassword";
    return ThirdPartyEmailPassword;
})(authRecipe_1.default);
exports.default = ThirdPartyEmailPassword;
