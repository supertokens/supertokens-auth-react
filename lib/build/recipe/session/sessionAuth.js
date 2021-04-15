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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importDefault(require("react"));
var utils_1 = require("supertokens-website/lib/build/utils");
var superTokens_1 = __importDefault(require("../../superTokens"));
var utils_2 = require("../authRecipeModule/utils");
var sessionContext_1 = __importDefault(require("./sessionContext"));
var _1 = require("./");
/*
 * Component.
 */
var SessionAuth = /** @class */ (function (_super) {
    __extends(SessionAuth, _super);
    /*
     * Constructor.
     */
    function SessionAuth(props) {
        var _this = _super.call(this, props) || this;
        /*
         * Methods.
         */
        _this.getRecipeInstanceOrThrow = function () {
            if (_this.props.recipeId === undefined) {
                throw new Error("No recipeId props given to SessionAuth component");
            }
            var recipe = superTokens_1.default.getInstanceOrThrow().getRecipeOrThrow(_this.props.recipeId);
            if (utils_2.isAuthRecipeModule(recipe)) {
                return recipe;
            }
            throw new Error(recipe.recipeId + " must be an instance of AuthRecipeModule to use SessionAuth component.");
        };
        _this.redirectToLogin = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var redirectToPath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            redirectToPath = utils_1.getWindowOrThrow().location.pathname;
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SIGN_IN_AND_UP" },
                                    this.props.history,
                                    {
                                        redirectToPath: redirectToPath,
                                    }
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /*
         * Render.
         */
        _this.render = function () {
            if (_this.state.status === "READY") {
                return react_1.default.createElement(
                    sessionContext_1.default.Provider,
                    {
                        value: {
                            userId: _this.state.userId,
                            doesSessionExist: _this.state.doesSessionExist,
                            jwtPayload: _this.state.jwtPayload,
                        },
                    },
                    _this.props.children
                );
            }
            return null;
        };
        _this.state = {
            status: "LOADING",
        };
        return _this;
    }
    SessionAuth.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionExists, userIdPromise, jwtPayloadPromise, userId_1, jwtPayload_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, _1.doesSessionExist()];
                    case 1:
                        sessionExists = _a.sent();
                        if (!(sessionExists === false)) return [3 /*break*/, 5];
                        if (!(this.props.requireAuth !== true)) return [3 /*break*/, 2];
                        this.setState(function (oldState) {
                            return __assign({}, oldState, {
                                status: "READY",
                                userId: "",
                                doesSessionExist: false,
                                jwtPayload: {},
                            });
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        return [4 /*yield*/, this.redirectToLogin()];
                    case 3:
                        return [2 /*return*/, _a.sent()];
                    case 4:
                        return [3 /*break*/, 8];
                    case 5:
                        userIdPromise = _1.getUserId();
                        jwtPayloadPromise = _1.getJWTPayloadSecurely();
                        return [4 /*yield*/, userIdPromise];
                    case 6:
                        userId_1 = _a.sent();
                        return [4 /*yield*/, jwtPayloadPromise];
                    case 7:
                        jwtPayload_1 = _a.sent();
                        this.setState(function (oldState) {
                            return __assign({}, oldState, {
                                status: "READY",
                                userId: userId_1,
                                doesSessionExist: true,
                                jwtPayload: jwtPayload_1,
                            });
                        });
                        _a.label = 8;
                    case 8:
                        return [2 /*return*/];
                }
            });
        });
    };
    return SessionAuth;
})(react_1.default.PureComponent);
exports.default = SessionAuth;
//# sourceMappingURL=sessionAuth.js.map
