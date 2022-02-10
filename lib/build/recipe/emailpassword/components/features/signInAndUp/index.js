"use strict";
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
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var react_2 = require("react");
var signInAndUp_1 = __importDefault(require("../../themes/signInAndUp"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var SignInAndUp = /** @class */ (function (_super) {
    __extends(SignInAndUp, _super);
    function SignInAndUp(props) {
        var _this = _super.call(this, props) || this;
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.onSignInSuccess = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var isEmailVerified, ignored_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.state.user === undefined) {
                                return [2 /*return*/];
                            }
                            if (!(this.props.recipe.emailVerification.config.mode === "REQUIRED"))
                                return [3 /*break*/, 6];
                            isEmailVerified = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.props.recipe.emailVerification.isEmailVerified()];
                        case 2:
                            isEmailVerified = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            ignored_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            if (!!isEmailVerified) return [3 /*break*/, 6];
                            return [
                                4 /*yield*/,
                                this.props.recipe.savePostEmailVerificationSuccessRedirectState({
                                    redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    isNewUser: false,
                                    action: "SUCCESS",
                                }),
                            ];
                        case 5:
                            _a.sent();
                            return [
                                2 /*return*/,
                                this.props.recipe.emailVerification.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                    },
                                    this.props.history
                                ),
                            ];
                        case 6:
                            return [
                                4 /*yield*/,
                                this.props.recipe.redirect(
                                    {
                                        action: "SUCCESS",
                                        isNewUser: false,
                                        redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    },
                                    this.props.history
                                ),
                            ];
                        case 7:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.onSignUpSuccess = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.state.user === undefined) {
                                return [2 /*return*/];
                            }
                            if (!(this.props.recipe.emailVerification.config.mode === "REQUIRED"))
                                return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                this.props.recipe.savePostEmailVerificationSuccessRedirectState({
                                    redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    isNewUser: true,
                                    action: "SUCCESS",
                                }),
                            ];
                        case 1:
                            _a.sent();
                            return [
                                4 /*yield*/,
                                this.props.recipe.emailVerification.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                    },
                                    this.props.history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            return [
                                4 /*yield*/,
                                this.props.recipe.redirect(
                                    {
                                        redirectToPath: utils_1.getRedirectToPathFromURL(),
                                        isNewUser: true,
                                        action: "SUCCESS",
                                    },
                                    this.props.history
                                ),
                            ];
                        case 4:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        _this.modifiedRecipeImplementation = __assign(__assign({}, _this.props.recipe.recipeImpl), {
            signIn: function (input) {
                return __awaiter(_this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, this.props.recipe.recipeImpl.signIn(input)];
                            case 1:
                                response = _a.sent();
                                this.setState(function (oldState) {
                                    return response.status !== "OK"
                                        ? oldState
                                        : {
                                              user: response.user,
                                          };
                                });
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            signUp: function (input) {
                return __awaiter(_this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, this.props.recipe.recipeImpl.signUp(input)];
                            case 1:
                                response = _a.sent();
                                this.setState(function (oldState) {
                                    return response.status !== "OK"
                                        ? oldState
                                        : {
                                              user: response.user,
                                          };
                                });
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
        });
        _this.render = function () {
            var componentOverrides = _this.props.recipe.config.override.components;
            var signInAndUpFeature = _this.props.recipe.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            var signInFeature = signInAndUpFeature.signInForm;
            var signInForm = {
                recipeImplementation: _this.modifiedRecipeImplementation,
                config: _this.props.recipe.config,
                styleFromInit: signInFeature.style,
                formFields: signInFeature.formFields,
                onSuccess: _this.onSignInSuccess,
                forgotPasswordClick: function () {
                    return _this.props.recipe.redirect({ action: "RESET_PASSWORD" }, _this.props.history);
                },
            };
            var signUpForm = {
                recipeImplementation: _this.modifiedRecipeImplementation,
                config: _this.props.recipe.config,
                styleFromInit: signUpFeature.style,
                formFields: _this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
                onSuccess: _this.onSignUpSuccess,
            };
            var props = {
                config: _this.props.recipe.config,
                signInForm: signInForm,
                signUpForm: signUpForm,
            };
            return react_1.jsx(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                { value: componentOverrides },
                react_1.jsx(
                    featureWrapper_1.default,
                    {
                        useShadowDom: _this.props.recipe.config.useShadowDom,
                        isEmbedded: _this.getIsEmbedded(),
                        defaultStore: translations_1.defaultTranslationsEmailPassword,
                    },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        _this.props.children === undefined && react_1.jsx(signInAndUp_1.default, __assign({}, props)),
                        _this.props.children &&
                            React.Children.map(_this.props.children, function (child) {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, props);
                                }
                                return child;
                            })
                    )
                )
            );
        };
        _this.state = {
            user: undefined,
        };
        return _this;
    }
    SignInAndUp.prototype.getThemeSignUpFeatureFormFields = function (formFields) {
        var _this = this;
        var emailPasswordOnly = formFields.length === 2;
        return formFields.map(function (field) {
            return __assign(__assign({}, field), {
                showIsRequired: (function () {
                    // If email and password only, do not show required indicator (*).
                    if (emailPasswordOnly) {
                        return false;
                    }
                    // Otherwise, show for all non optional fields (including email and password).
                    return field.optional === false;
                })(),
                validate: (function () {
                    // If field is not email, return field validate unchanged.
                    if (field.id !== "email") {
                        return field.validate;
                    }
                    // Otherwise, if email, use syntax validate method and check if email exists.
                    return function (value) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var error, emailExists, _1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4 /*yield*/, field.validate(value)];
                                    case 1:
                                        error = _a.sent();
                                        if (error !== undefined) {
                                            return [2 /*return*/, error];
                                        }
                                        if (typeof value !== "string") {
                                            return [2 /*return*/, "GENERAL_ERROR_EMAIL_NON_STRING"];
                                        }
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [
                                            4 /*yield*/,
                                            this.props.recipe.recipeImpl.doesEmailExist({
                                                email: value,
                                                config: this.props.recipe.config,
                                            }),
                                        ];
                                    case 3:
                                        emailExists = _a.sent();
                                        if (emailExists) {
                                            return [2 /*return*/, "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS"];
                                        }
                                        return [3 /*break*/, 5];
                                    case 4:
                                        _1 = _a.sent();
                                        return [3 /*break*/, 5];
                                    case 5:
                                        return [2 /*return*/, undefined];
                                }
                            });
                        });
                    };
                })(),
            });
        });
    };
    return SignInAndUp;
})(react_2.PureComponent);
exports.default = SignInAndUp;
