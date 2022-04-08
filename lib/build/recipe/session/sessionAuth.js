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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importStar(require("react"));
var sessionContext_1 = __importStar(require("./sessionContext"));
var recipe_1 = __importDefault(require("./recipe"));
// if it's not the default context, it means SessionAuth from top has
// given us a sessionContext.
var hasParentProvider = function (ctx) {
    return !sessionContext_1.isDefaultContext(ctx);
};
var SessionAuth = function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin or onSessionExpired function when requireAuth is true");
    }
    var requireAuth = react_1.useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    var parentSessionContext = react_1.useContext(sessionContext_1.default);
    // assign the parent context here itself so that there is no flicker in the UI
    var _b = react_1.useState(hasParentProvider(parentSessionContext) ? parentSessionContext : undefined),
        context = _b[0],
        setContext = _b[1];
    var session = react_1.useRef(recipe_1.default.getInstanceOrThrow());
    // on mount
    react_1.useEffect(function () {
        var cancelUseEffect = false;
        var buildContext = function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var sessionExists, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (hasParentProvider(parentSessionContext)) {
                                return [2 /*return*/, parentSessionContext];
                            }
                            return [4 /*yield*/, session.current.doesSessionExist()];
                        case 1:
                            sessionExists = _b.sent();
                            if (sessionExists === false) {
                                return [
                                    2 /*return*/,
                                    {
                                        doesSessionExist: false,
                                        accessTokenPayload: {},
                                        userId: "",
                                    },
                                ];
                            }
                            _a = {
                                doesSessionExist: true,
                            };
                            return [4 /*yield*/, session.current.getAccessTokenPayloadSecurely()];
                        case 2:
                            _a.accessTokenPayload = _b.sent();
                            return [4 /*yield*/, session.current.getUserId()];
                        case 3:
                            return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                    }
                });
            });
        };
        function setInitialContextAndMaybeRedirect() {
            return __awaiter(this, void 0, void 0, function () {
                var toSetContext;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, buildContext()];
                        case 1:
                            toSetContext = _a.sent();
                            // if this component is unmounting, or the context has already
                            // been set, then we don't need to proceed...
                            if (cancelUseEffect) {
                                return [2 /*return*/];
                            }
                            if (!toSetContext.doesSessionExist && props.requireAuth === true) {
                                props.redirectToLogin();
                            } else {
                                if (context === undefined) {
                                    setContext(toSetContext);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        if (context === undefined) {
            void setInitialContextAndMaybeRedirect();
            return function () {
                cancelUseEffect = true;
            };
        } else {
            if (!context.doesSessionExist && props.requireAuth === true) {
                props.redirectToLogin();
            }
            return;
        }
    }, []);
    // subscribe to events on mount
    react_1.useEffect(
        function () {
            function onHandleEvent(event) {
                switch (event.action) {
                    case "SESSION_CREATED":
                        setContext(event.sessionContext);
                        return;
                    case "REFRESH_SESSION":
                        setContext(event.sessionContext);
                        return;
                    case "SIGN_OUT":
                        if (props.requireAuth !== true) {
                            setContext(event.sessionContext);
                        }
                        return;
                    case "UNAUTHORISED":
                        if (props.requireAuth === true) {
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                            } else {
                                props.redirectToLogin();
                            }
                        } else {
                            setContext(event.sessionContext);
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                            }
                        }
                        return;
                }
            }
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        },
        [props]
    );
    if (context === undefined) {
        return null;
    }
    // this will display null only if initially the below condition is true.
    // cause if the session goes from existing to non existing, then
    // the context is not updated if props.requireAuth === true
    if (!context.doesSessionExist && props.requireAuth === true) {
        return null;
    }
    return react_1.default.createElement(sessionContext_1.default.Provider, { value: context }, children);
};
exports.default = SessionAuth;
