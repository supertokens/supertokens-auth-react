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
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
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
                result.done
                    ? resolve(result.value)
                    : new P(function (resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
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
var utils_1 = require("../../../../../utils");
var api_1 = require("./api");
var session_1 = __importDefault(require("../../../../session"));
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var emailVerification_1 = require("../../themes/emailVerification");
var utils_2 = require("../../../../authRecipeModule/utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var authRecipeModule_1 = __importDefault(require("../../../../authRecipeModule"));
/*
 * Component.
 */
var EmailVerification = /** @class */ (function (_super) {
    __extends(EmailVerification, _super);
    /*
     * Constructor.
     */
    function EmailVerification(props) {
        var _this = _super.call(this, props) || this;
        /*
         * Methods.
         */
        _this.getAuthRecipeOrThrow = function () {
            if (_this.props.recipeId === undefined) {
                throw new Error("No recipeId props given to EmailVerification component");
            }
            var recipe = superTokens_1.default.getInstanceOrThrow().getRecipeOrThrow(_this.props.recipeId);
            if (recipe instanceof authRecipeModule_1.default === false) {
                throw new Error(
                    recipe.recipeId + " must be an instance of AuthRecipeModule to use EmailVerification component."
                );
            }
            return recipe;
        };
        _this.getRecipeInstanceOrThrow = function () {
            var recipe = _this.getAuthRecipeOrThrow();
            if (utils_2.isAuthRecipeModule(recipe)) {
                if (recipe.emailVerification === undefined) {
                    throw new Error(
                        recipe.recipeId + " must have EmailVerification enabled to use the EmailVerification component."
                    );
                }
                return recipe.emailVerification;
            }
            throw new Error(
                _this.props.recipeId + " must be an instance of AuthRecipeModule to use EmailVerification component."
            );
        };
        _this.signOut = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.getRecipeInstanceOrThrow().signOut()];
                        case 1:
                            _a.sent();
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SIGN_IN_AND_UP" },
                                    this.props.history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            e_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.onTokenInvalidRedirect = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var response, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, session_1.default.doesSessionExist()];
                        case 1:
                            if (!(_a.sent() !== true)) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SIGN_IN_AND_UP" },
                                    this.props.history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            _a.trys.push([3, 7, , 8]);
                            return [4 /*yield*/, api_1.sendVerifyEmailAPI(this.getRecipeInstanceOrThrow())];
                        case 4:
                            response = _a.sent();
                            if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 6];
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SUCCESS", isNewUser: false },
                                    this.props.history
                                ),
                            ];
                        case 5:
                            return [2 /*return*/, _a.sent()];
                        case 6:
                            return [3 /*break*/, 8];
                        case 7:
                            e_2 = _a.sent();
                            return [3 /*break*/, 8];
                        case 8:
                            this.setState(function () {
                                return {
                                    token: "",
                                };
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.render = function () {
            var sendVerifyEmailScreenFeature = _this.getRecipeInstanceOrThrow().config.sendVerifyEmailScreen;
            var sendVerifyEmailScreen = {
                styleFromInit: sendVerifyEmailScreenFeature.style,
                sendVerifyEmailAPI: function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, api_1.sendVerifyEmailAPI(this.getRecipeInstanceOrThrow())];
                                case 1:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                },
                signOut: _this.signOut,
                onSuccess: function () {
                    return _this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                        action: "VERIFY_EMAIL_SENT",
                    });
                },
                onEmailAlreadyVerified: function () {
                    return _this
                        .getRecipeInstanceOrThrow()
                        .redirect({ action: "SUCCESS", isNewUser: false }, _this.props.history);
                },
            };
            var verifyEmailLinkClickedScreenFeature = _this.getRecipeInstanceOrThrow().config
                .verifyEmailLinkClickedScreen;
            var verifyEmailLinkClickedScreen = {
                styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                onTokenInvalidRedirect: _this.onTokenInvalidRedirect,
                onSuccess: function () {
                    return _this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                        action: "EMAIL_VERIFIED_SUCCESSFUL",
                    });
                },
                onContinueClicked: function () {
                    return _this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, _this.props.history);
                },
                verifyEmailAPI: function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        api_1.verifyEmailAPI(this.getRecipeInstanceOrThrow(), this.state.token),
                                    ];
                                case 1:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                },
            };
            var hasToken = _this.state.token.length !== 0;
            /*
             * Render.
             */
            return react_1.jsx(
                featureWrapper_1.default,
                { useShadowDom: _this.getAuthRecipeOrThrow().config.useShadowDom },
                react_1.jsx(
                    react_2.Fragment,
                    null,
                    _this.props.children === undefined &&
                        react_1.jsx(emailVerification_1.EmailVerificationTheme, {
                            rawPalette: _this.getRecipeInstanceOrThrow().config.palette,
                            sendVerifyEmailScreen: sendVerifyEmailScreen,
                            verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
                            hasToken: hasToken,
                        }),
                    _this.props.children &&
                        React.cloneElement(_this.props.children, {
                            rawPalette: _this.getRecipeInstanceOrThrow().config.palette,
                            sendVerifyEmailScreen: sendVerifyEmailScreen,
                            verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
                            hasToken: hasToken,
                        })
                )
            );
        };
        var urlParams = new URLSearchParams(utils_1.getWindowOrThrow().location.search);
        var token = urlParams.get("token");
        if (token === null) {
            token = "";
        }
        _this.state = {
            token: token,
        };
        return _this;
    }
    EmailVerification.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hasToken, sessionExists, response, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hasToken = this.state.token.length !== 0;
                        return [4 /*yield*/, session_1.default.doesSessionExist()];
                    case 1:
                        sessionExists = _a.sent();
                        if (!(sessionExists === false && hasToken === false)) return [3 /*break*/, 3];
                        return [
                            4 /*yield*/,
                            this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history),
                        ];
                    case 2:
                        return [2 /*return*/, _a.sent()];
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (!(hasToken === false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, api_1.sendVerifyEmailAPI(this.getRecipeInstanceOrThrow())];
                    case 4:
                        response = _a.sent();
                        if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 6];
                        return [
                            4 /*yield*/,
                            this.getRecipeInstanceOrThrow().redirect(
                                { action: "SUCCESS", isNewUser: false },
                                this.props.history
                            ),
                        ];
                    case 5:
                        return [2 /*return*/, _a.sent()];
                    case 6:
                        return [3 /*break*/, 8];
                    case 7:
                        e_3 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        return [2 /*return*/];
                }
            });
        });
    };
    return EmailVerification;
})(react_2.PureComponent);
exports.default = EmailVerification;
//# sourceMappingURL=index.js.map
