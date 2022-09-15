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
var recipeModule_1 = __importDefault(require("../recipeModule"));
var emailVerification_1 = __importDefault(require("./components/features/emailVerification"));
var normalisedURLPath_1 = __importDefault(require("supertokens-web-js/utils/normalisedURLPath"));
var constants_1 = require("./constants");
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var constants_2 = require("../../constants");
var recipeImplementation_1 = __importDefault(require("./recipeImplementation"));
var session_1 = require("../session");
var emailverification_1 = require("supertokens-web-js/recipe/emailverification");
var sessionClaimValidatorStore_1 = require("supertokens-website/utils/sessionClaimValidatorStore");
var supertokens_js_override_1 = __importDefault(require("supertokens-js-override"));
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var usercontext_1 = require("../../usercontext");
var postSuperTokensInitCallbacks_1 = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var EmailVerification = /** @class */ (function (_super) {
    __extends(EmailVerification, _super);
    function EmailVerification(config) {
        var _this = _super.call(this, (0, utils_2.normaliseEmailVerificationFeature)(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: (0, utils_1.matchRecipeIdUsingQueryParams)(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props);
                    },
                };
            }
            return features;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_, props) {
            return (0, jsx_runtime_1.jsx)(
                userContextWrapper_1.default,
                __assign(
                    { userContext: props.userContext },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            session_1.SessionAuth,
                            __assign(
                                {
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: (0, jsx_runtime_1.jsx)(usercontext_1.UserContextContext.Consumer, {
                                        children: function (value) {
                                            return (0, jsx_runtime_1.jsx)(
                                                emailVerification_1.default,
                                                __assign(
                                                    { recipe: _this },
                                                    __assign(__assign({}, props), {
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
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return __generator(this, function (_b) {
                    if (context.action === "VERIFY_EMAIL") {
                        verifyEmailPath = new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH);
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
                    return [2 /*return*/];
                });
            });
        };
        {
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
        }
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore_1.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        return function (appInfo) {
            EmailVerification.instance = new EmailVerification(
                __assign(__assign({}, config), { appInfo: appInfo, recipeId: EmailVerification.RECIPE_ID })
            );
            return EmailVerification.instance;
        };
    };
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + constants_2.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
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
    EmailVerification.EmailVerificationClaim = new emailverification_1.EmailVerificationClaimClass(
        function () {
            return EmailVerification.getInstanceOrThrow().recipeImpl;
        },
        function (userContext) {
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, _b, _c;
                return __generator(_a, function (_d) {
                    switch (_d.label) {
                        case 0:
                            recipe = EmailVerification.getInstanceOrThrow();
                            if (!(recipe.config.mode === "REQUIRED")) return [3 /*break*/, 2];
                            _b = utils_1.saveInvalidClaimRedirectPathInContext;
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
})(recipeModule_1.default);
exports.default = EmailVerification;
