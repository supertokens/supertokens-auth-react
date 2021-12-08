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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var react_2 = require("react");
var signInUp_1 = __importDefault(require("../../themes/signInUp"));
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var utils_1 = require("../../../../../utils");
var styles_2 = require("../../../components/themes/styles");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var min_1 = require("react-phone-number-input/min");
var SignInUp = /** @class */ (function (_super) {
    __extends(SignInUp, _super);
    function SignInUp(props) {
        var _this = _super.call(this, props) || this;
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.getModifiedRecipeImplementation = function () {
            return __assign(__assign({}, _this.props.recipe.recipeImpl), {
                createCode: function (input) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var contactInfo, res, loginAttemptInfo_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if ("email" in input) {
                                        contactInfo = input.email;
                                    } else {
                                        contactInfo = min_1.formatPhoneNumberIntl(input.phoneNumber);
                                    }
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.createCode(input)];
                                case 1:
                                    res = _a.sent();
                                    if (!(res.status === "OK")) return [3 /*break*/, 3];
                                    loginAttemptInfo_1 = __assign(__assign({}, res), {
                                        lastResend: new Date().getTime(),
                                        contactMethod: this.props.recipe.config.contactMethod,
                                        contactInfo: contactInfo,
                                    });
                                    return [
                                        4 /*yield*/,
                                        this.props.recipe.recipeImpl.setLoginAttemptInfo(loginAttemptInfo_1),
                                    ];
                                case 2:
                                    _a.sent();
                                    this.setState(function (os) {
                                        return __assign(__assign({}, os), {
                                            error: undefined,
                                            loginAttemptInfo: loginAttemptInfo_1,
                                        });
                                    });
                                    _a.label = 3;
                                case 3:
                                    return [2 /*return*/, res];
                            }
                        });
                    });
                },
                resendCode: function (input) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var res, loginAttemptInfo_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this.state.loginAttemptInfo) {
                                        // This should never happen, but it makes TS happy
                                        throw new Error("Resend without loginAttemptInfo");
                                    }
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.resendCode(input)];
                                case 1:
                                    res = _a.sent();
                                    if (!(res.status === "OK")) return [3 /*break*/, 3];
                                    loginAttemptInfo_2 = __assign(__assign({}, this.state.loginAttemptInfo), {
                                        lastResend: new Date().getTime(),
                                    });
                                    return [
                                        4 /*yield*/,
                                        this.props.recipe.recipeImpl.setLoginAttemptInfo(loginAttemptInfo_2),
                                    ];
                                case 2:
                                    _a.sent();
                                    this.setState(function (os) {
                                        return __assign(__assign({}, os), {
                                            error: undefined,
                                            loginAttemptInfo: loginAttemptInfo_2,
                                        });
                                    });
                                    return [3 /*break*/, 6];
                                case 3:
                                    if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.clearLoginAttemptInfo()];
                                case 4:
                                    _a.sent();
                                    this.setState(function (os) {
                                        return __assign(__assign({}, os), {
                                            error: "Please try again.",
                                            loginAttemptInfo: undefined,
                                        });
                                    });
                                    return [3 /*break*/, 6];
                                case 5:
                                    if (res.status === "GENERAL_ERROR") {
                                        this.setState(function (os) {
                                            return __assign(__assign({}, os), {
                                                error: res.message,
                                                loginAttemptInfo: undefined,
                                            });
                                        });
                                    }
                                    _a.label = 6;
                                case 6:
                                    return [2 /*return*/, res];
                            }
                        });
                    });
                },
                consumeCode: function (input) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.consumeCode(input)];
                                case 1:
                                    res = _a.sent();
                                    if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.clearLoginAttemptInfo()];
                                case 2:
                                    _a.sent();
                                    this.setState(function (os) {
                                        return __assign(__assign({}, os), {
                                            error: "Please try again.",
                                            loginAttemptInfo: undefined,
                                        });
                                    });
                                    _a.label = 3;
                                case 3:
                                    if (!(res.status === "OK")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.clearLoginAttemptInfo()];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    return [2 /*return*/, res];
                            }
                        });
                    });
                },
                clearLoginAttemptInfo: function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, this.props.recipe.recipeImpl.clearLoginAttemptInfo()];
                                case 1:
                                    _a.sent();
                                    this.setState(function (os) {
                                        return __assign(__assign({}, os), { loginAttemptInfo: undefined });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            });
        };
        _this.componentDidMount = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var loginAttemptInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getModifiedRecipeImplementation().getLoginAttemptInfo()];
                        case 1:
                            loginAttemptInfo = _a.sent();
                            this.setState(function (s) {
                                return __assign(__assign({}, s), { loaded: true, loginAttemptInfo: loginAttemptInfo });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.render = function () {
            var componentOverrides = _this.props.recipe.config.override.components;
            var isEmail = _this.props.recipe.config.contactMethod === "EMAIL";
            var conf = isEmail ? _this.props.recipe.config.emailForm : _this.props.recipe.config.mobileForm;
            var props = {
                onSuccess: function () {
                    return _this.props.recipe.redirect(
                        {
                            action: "SUCCESS",
                            isNewUser: false,
                            redirectToPath: utils_1.getRedirectToPathFromURL(),
                        },
                        _this.props.history
                    );
                },
                loaded: _this.state.loaded,
                loginAttemptInfo: _this.state.loginAttemptInfo,
                error: _this.state.error,
                recipeImplementation: _this.getModifiedRecipeImplementation(),
                config: _this.props.recipe.config,
            };
            return react_1.jsx(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                { value: componentOverrides },
                react_1.jsx(
                    featureWrapper_1.default,
                    { useShadowDom: _this.props.recipe.config.useShadowDom, isEmbedded: _this.getIsEmbedded() },
                    react_1.jsx(
                        styleContext_1.StyleProvider,
                        {
                            rawPalette: _this.props.recipe.config.palette,
                            defaultPalette: styles_1.defaultPalette,
                            styleFromInit: conf.style,
                            rootStyleFromInit: _this.props.recipe.config.rootStyle,
                            getDefaultStyles: styles_2.getStyles,
                        },
                        react_1.jsx(
                            react_2.Fragment,
                            null,
                            _this.props.children === undefined && react_1.jsx(signInUp_1.default, __assign({}, props)),
                            _this.props.children && React.cloneElement(_this.props.children, props)
                        )
                    )
                )
            );
        };
        var error = undefined;
        var errorQueryParam = utils_1.getQueryParams("error");
        var messageQueryParam = utils_1.getQueryParams("message");
        if (errorQueryParam !== null) {
            if (errorQueryParam === "signin") {
                error = "Something went wrong. Please try again";
            } else if (errorQueryParam === "restart_link") {
                error = "The link you tried to click expired or was revoked. Please try again.";
            } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                error = messageQueryParam;
            }
        }
        _this.state = {
            loaded: false,
            loginAttemptInfo: undefined,
            error: error,
        };
        return _this;
    }
    return SignInUp;
})(react_2.PureComponent);
exports.default = SignInUp;
