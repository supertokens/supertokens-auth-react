"use strict";
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
var react_1 = require("react");
var sessionContext_1 = __importDefault(require("./sessionContext"));
var recipe_1 = __importDefault(require("./recipe"));
var usercontext_1 = require("../../usercontext");
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var utils_1 = require("../../utils");
var superTokens_1 = __importDefault(require("../../superTokens"));
var SessionAuth = function (_a) {
    var _b;
    var children = _a.children,
        props = __rest(_a, ["children"]);
    var requireAuth = (0, react_1.useRef)(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    // TODO: check if using the parent context here reduces flickering
    // It was removed because reusing it (including invalidclaim) caused a redirect loop in an edge case
    var _c = (0, react_1.useState)({ loading: true }),
        context = _c[0],
        setContext = _c[1];
    var session = (0, react_1.useRef)();
    var history =
        (_b = superTokens_1.default.getReactRouterDomWithCustomHistory()) === null || _b === void 0
            ? void 0
            : _b.useHistoryCustom();
    var userContext = (0, usercontext_1.useUserContext)();
    var redirectToLogin = (0, react_1.useCallback)(
        function () {
            if (props.redirectToLogin !== undefined) {
                props.redirectToLogin();
            } else {
                void superTokens_1.default
                    .getInstanceOrThrow()
                    .redirectToAuth({ history: history, redirectBack: true });
            }
        },
        [props.redirectToLogin]
    );
    var buildContext = (0, react_1.useCallback)(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var sessionExists, invalidClaims;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = recipe_1.default.getInstanceOrThrow();
                        }
                        if (context.loading === false) {
                            return [2 /*return*/, context];
                        }
                        return [
                            4 /*yield*/,
                            session.current.doesSessionExist({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        sessionExists = _b.sent();
                        if (sessionExists === false) {
                            return [
                                2 /*return*/,
                                {
                                    loading: false,
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    invalidClaims: [],
                                    userId: "",
                                },
                            ];
                        }
                        return [
                            4 /*yield*/,
                            session.current.validateClaims({
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        invalidClaims = _b.sent();
                        _a = {
                            loading: false,
                            doesSessionExist: true,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        (_a.accessTokenPayload = _b.sent()), (_a.invalidClaims = invalidClaims);
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 4:
                        return [2 /*return*/, ((_a.userId = _b.sent()), _a)];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = (0, react_1.useCallback)(
        function (toSetContext) {
            return __awaiter(void 0, void 0, void 0, function () {
                var redirectPath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (toSetContext.loading === true) {
                                // We should not be updating the context to loading
                                throw new Error("Should never come here");
                            }
                            if (context.loading === false) {
                                return [2 /*return*/];
                            }
                            if (!(!toSetContext.doesSessionExist && props.requireAuth !== false))
                                return [3 /*break*/, 1];
                            redirectToLogin();
                            return [3 /*break*/, 3];
                        case 1:
                            setContext(toSetContext);
                            redirectPath = (0, utils_1.popInvalidClaimRedirectPathFromContext)(userContext);
                            if (!redirectPath) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                superTokens_1.default.getInstanceOrThrow().redirectToUrl(redirectPath, history),
                            ];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.requireAuth, redirectToLogin, context]
    );
    (0, utils_1.useOnMountAPICall)(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    (0, react_1.useEffect)(
        function () {
            function onHandleEvent(event) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, invalidClaims, redirectPath;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = event.action;
                                switch (_a) {
                                    case "SESSION_CREATED":
                                        return [3 /*break*/, 1];
                                    case "REFRESH_SESSION":
                                        return [3 /*break*/, 1];
                                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                                        return [3 /*break*/, 1];
                                    case "API_INVALID_CLAIM":
                                        return [3 /*break*/, 1];
                                    case "SIGN_OUT":
                                        return [3 /*break*/, 5];
                                    case "UNAUTHORISED":
                                        return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 7];
                            case 1:
                                return [
                                    4 /*yield*/,
                                    session.current.validateClaims({
                                        overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                        userContext: userContext,
                                    }),
                                ];
                            case 2:
                                invalidClaims = _b.sent();
                                setContext(
                                    __assign(__assign({}, event.sessionContext), {
                                        loading: false,
                                        invalidClaims: invalidClaims,
                                    })
                                );
                                redirectPath = (0, utils_1.popInvalidClaimRedirectPathFromContext)(userContext);
                                if (!redirectPath) return [3 /*break*/, 4];
                                return [
                                    4 /*yield*/,
                                    superTokens_1.default.getInstanceOrThrow().redirectToUrl(redirectPath, history),
                                ];
                            case 3:
                                _b.sent();
                                _b.label = 4;
                            case 4:
                                return [2 /*return*/];
                            case 5:
                                setContext(
                                    __assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: [] })
                                );
                                return [2 /*return*/];
                            case 6:
                                setContext(
                                    __assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: [] })
                                );
                                if (props.onSessionExpired !== undefined) {
                                    props.onSessionExpired();
                                } else if (props.requireAuth !== false) {
                                    redirectToLogin();
                                }
                                return [2 /*return*/];
                            case 7:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (session.current === undefined) {
                session.current = recipe_1.default.getInstanceOrThrow();
            }
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        },
        [props, setContext]
    );
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(
        sessionContext_1.default.Provider,
        __assign({ value: __assign(__assign({}, context), { isDefault: false }) }, { children: children })
    );
};
var SessionAuthWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: props.userContext },
            { children: (0, jsx_runtime_1.jsx)(SessionAuth, __assign({}, props)) }
        )
    );
};
exports.default = SessionAuthWrapper;
