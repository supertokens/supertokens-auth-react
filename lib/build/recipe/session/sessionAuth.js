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
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
        return t;
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importStar(require("react"));
var sessionContext_1 = __importStar(require("./sessionContext"));
var recipe_1 = __importDefault(require("./recipe"));
var requireSession_1 = require("./requireSession");
var index_1 = require("./index");
var hasParentProvider = function (ctx) {
    return !sessionContext_1.isDefaultContext(ctx);
};
var SessionAuth = function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin function when requireAuth is true");
    }
    var parentSessionContext = react_1.useContext(sessionContext_1.default);
    var _b = react_1.useState(undefined),
        context = _b[0],
        setContext = _b[1];
    var session = react_1.useRef(recipe_1.default.getInstanceOrThrow());
    var setInitialContext = react_1.useCallback(function () {
        return __awaiter(_this, void 0, void 0, function () {
            var sessionExists, _a, jwtPayload, userId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [4 /*yield*/, index_1.doesSessionExist()];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                setContext({
                                    doesSessionExist: sessionExists,
                                    jwtPayload: {},
                                    userId: "",
                                }),
                            ];
                        }
                        return [4 /*yield*/, Promise.all([index_1.getJWTPayloadSecurely(), index_1.getUserId()])];
                    case 2:
                        (_a = _b.sent()), (jwtPayload = _a[0]), (userId = _a[1]);
                        return [
                            2 /*return*/,
                            setContext({
                                doesSessionExist: sessionExists,
                                jwtPayload: jwtPayload,
                                userId: userId,
                            }),
                        ];
                }
            });
        });
    }, []);
    var onHandleEvent = react_1.useCallback(
        function (event) {
            return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _a = event.action;
                            switch (_a) {
                                case "SESSION_CREATED":
                                    return [3 /*break*/, 1];
                                case "REFRESH_SESSION":
                                    return [3 /*break*/, 4];
                                case "SIGN_OUT":
                                    return [3 /*break*/, 6];
                                case "UNAUTHORISED":
                                    return [3 /*break*/, 7];
                            }
                            return [3 /*break*/, 8];
                        case 1:
                            _b = setContext;
                            _c = {
                                doesSessionExist: true,
                            };
                            return [4 /*yield*/, index_1.getUserId()];
                        case 2:
                            _c.userId = _f.sent();
                            return [4 /*yield*/, index_1.getJWTPayloadSecurely()];
                        case 3:
                            _b.apply(void 0, [((_c.jwtPayload = _f.sent()), _c)]);
                            return [2 /*return*/];
                        case 4:
                            _d = setContext;
                            _e = {
                                doesSessionExist: true,
                                userId: context === undefined ? "" : context.userId,
                            };
                            return [4 /*yield*/, index_1.getJWTPayloadSecurely()];
                        case 5:
                            _d.apply(void 0, [((_e.jwtPayload = _f.sent()), _e)]);
                            return [2 /*return*/];
                        case 6:
                            setContext({
                                doesSessionExist: false,
                                userId: "",
                                jwtPayload: {},
                            });
                            return [2 /*return*/];
                        case 7:
                            // If there's onSessionExpired handler, use it without setting state...
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                                return [2 /*return*/];
                            }
                            // ...else fallback to default behaviour
                            if (!hasParentProvider(parentSessionContext)) {
                                setContext({
                                    doesSessionExist: false,
                                    userId: "",
                                    jwtPayload: {},
                                });
                            }
                            return [2 /*return*/];
                        case 8:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [parentSessionContext, context, props]
    );
    react_1.useEffect(
        function () {
            // If there's a parent provider, it already listens for events, so we don't have to
            if (hasParentProvider(parentSessionContext)) {
                setContext(parentSessionContext);
                return;
            }
        },
        [parentSessionContext]
    );
    // Read and set the current state
    react_1.useEffect(
        function () {
            if (hasParentProvider(parentSessionContext)) {
                return;
            }
            if (context === undefined) {
                setInitialContext();
            }
        },
        [context, parentSessionContext, setInitialContext]
    );
    react_1.useEffect(
        function () {
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect on
            // component unmount
            return session.current.addEventListener(onHandleEvent);
        },
        [onHandleEvent]
    );
    react_1.useEffect(
        function () {
            if (context === undefined) {
                return;
            }
            // If the session doesn't exist and we require auth, redirect to login
            if (context.doesSessionExist === false && props.requireAuth === true) {
                props.redirectToLogin();
                return;
            }
        },
        [context, props]
    );
    // If the context is undefined, we are still waiting to know whether session exists.
    if (context === undefined) {
        return null;
    }
    return react_1.default.createElement(
        sessionContext_1.default.Provider,
        { value: context },
        react_1.default.createElement(
            requireSession_1.RequireSession,
            { requireSession: props.requireAuth !== undefined },
            children
        )
    );
};
exports.default = SessionAuth;
//# sourceMappingURL=sessionAuth.js.map
