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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
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
var sessionContext_1 = __importStar(require("./sessionContext"));
var recipe_1 = __importDefault(require("./recipe"));
var usercontext_1 = require("../../usercontext");
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var utils_1 = require("../../utils");
var superTokens_1 = __importDefault(require("../../superTokens"));
var SessionAuth = function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);
    if (props.requireAuth === true && props.redirectToLogin === undefined) {
        throw new Error("You have to provide redirectToLogin or onSessionExpired function when requireAuth is true");
    }
    var requireAuth = (0, react_1.useRef)(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
            // eslint-disable-next-line @typescript-eslint/quotes
            'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>'
        );
    }
    var parentSessionContext = (0, react_1.useContext)(sessionContext_1.default);
    // assign the parent context here itself so that there is no flicker in the UI
    var _b = (0, react_1.useState)(
            !(0, sessionContext_1.isDefaultContext)(parentSessionContext) ? parentSessionContext : { loading: true }
        ),
        context = _b[0],
        setContext = _b[1];
    var _c = (0, react_1.useState)(undefined),
        contextUpdate = _c[0],
        setContextUpdate = _c[1];
    var session = (0, react_1.useRef)();
    var userContext = (0, usercontext_1.useUserContext)();
    var redirectToLogin = (0, react_1.useCallback)(
        function () {
            var _a;
            if (props.redirectToLogin !== undefined) {
                props.redirectToLogin();
            } else {
                void session.current.redirectToAuthWithRedirectToPath(
                    (_a = superTokens_1.default.getInstanceOrThrow().getReactRouterDomWithCustomHistory()) === null ||
                        _a === void 0
                        ? void 0
                        : _a.useHistoryCustom()
                );
            }
        },
        [props.redirectToLogin]
    );
    (0, react_1.useEffect)(
        function () {
            var abortController = new AbortController();
            function effect() {
                return __awaiter(this, void 0, void 0, function () {
                    var invalidClaim,
                        userContext_1,
                        accessTokenPayload,
                        defaultValidators,
                        requiredClaims,
                        _i,
                        requiredClaims_1,
                        validator,
                        validationRes;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                invalidClaim = undefined;
                                if (contextUpdate === undefined) {
                                    return [2 /*return*/];
                                }
                                if (
                                    !(
                                        contextUpdate.doesSessionExist &&
                                        props.overwriteDefaultClaimValidators !== undefined
                                    )
                                )
                                    return [3 /*break*/, 8];
                                userContext_1 = {};
                                accessTokenPayload = contextUpdate.accessTokenPayload;
                                defaultValidators = session.current.getDefaultClaimValidators();
                                requiredClaims =
                                    props.overwriteDefaultClaimValidators !== undefined
                                        ? props.overwriteDefaultClaimValidators(defaultValidators)
                                        : defaultValidators;
                                (_i = 0), (requiredClaims_1 = requiredClaims);
                                _a.label = 1;
                            case 1:
                                if (!(_i < requiredClaims_1.length)) return [3 /*break*/, 8];
                                validator = requiredClaims_1[_i];
                                return [4 /*yield*/, validator.shouldRefresh(accessTokenPayload, userContext_1)];
                            case 2:
                                if (!_a.sent()) return [3 /*break*/, 5];
                                return [4 /*yield*/, validator.refresh(userContext_1)];
                            case 3:
                                _a.sent();
                                return [
                                    4 /*yield*/,
                                    session.current.getAccessTokenPayloadSecurely({ userContext: userContext_1 }),
                                ];
                            case 4:
                                accessTokenPayload = _a.sent();
                                _a.label = 5;
                            case 5:
                                return [4 /*yield*/, validator.validate(accessTokenPayload, userContext_1)];
                            case 6:
                                validationRes = _a.sent();
                                if (!validationRes.isValid) {
                                    invalidClaim = {
                                        validatorId: validator.id,
                                        reason: validationRes.reason,
                                    };
                                    return [3 /*break*/, 8];
                                }
                                if (abortController.signal.aborted) {
                                    return [2 /*return*/];
                                }
                                _a.label = 7;
                            case 7:
                                _i++;
                                return [3 /*break*/, 1];
                            case 8:
                                if (!abortController.signal.aborted) {
                                    setContext(function (os) {
                                        return os.loading === false &&
                                            // We do these checks to prevent unnecessary rerenders
                                            os.userId === contextUpdate.userId &&
                                            JSON.stringify(os.accessTokenPayload) ===
                                                JSON.stringify(contextUpdate.accessTokenPayload) &&
                                            JSON.stringify(os.invalidClaim) === JSON.stringify(invalidClaim)
                                            ? os
                                            : __assign(__assign({}, contextUpdate), {
                                                  invalidClaim: invalidClaim,
                                                  loading: false,
                                              });
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }
            void effect();
            return function () {
                return abortController.abort();
            };
        },
        [contextUpdate, props.overwriteDefaultClaimValidators]
    );
    var buildContext = (0, react_1.useCallback)(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var sessionExists;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (session.current === undefined) {
                            session.current = recipe_1.default.getInstanceOrThrow();
                        }
                        if (!context.loading) {
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
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    userId: "",
                                    invalidClaim: undefined,
                                    loading: false,
                                },
                            ];
                        }
                        _a = {
                            doesSessionExist: true,
                        };
                        return [
                            4 /*yield*/,
                            session.current.getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        _a.accessTokenPayload = _b.sent();
                        return [
                            4 /*yield*/,
                            session.current.getUserId({
                                userContext: userContext,
                            }),
                        ];
                    case 3:
                        return [
                            2 /*return*/,
                            ((_a.userId = _b.sent()), (_a.invalidClaim = undefined), (_a.loading = false), _a),
                        ];
                }
            });
        });
    }, []);
    var setInitialContextAndMaybeRedirect = (0, react_1.useCallback)(
        function (toSetContext) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (toSetContext.loading === true) {
                        // We should not be updating the context to loading
                        throw new Error("Should never come here");
                    }
                    if (!toSetContext.doesSessionExist && props.requireAuth === true) {
                        redirectToLogin();
                    } else {
                        setContextUpdate(toSetContext);
                    }
                    return [2 /*return*/];
                });
            });
        },
        [props.requireAuth, redirectToLogin]
    );
    (0, utils_1.useOnMountAPICall)(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    (0, react_1.useEffect)(
        function () {
            function onHandleEvent(event) {
                switch (event.action) {
                    case "SESSION_CREATED":
                        setContextUpdate(event.sessionContext);
                        return;
                    case "REFRESH_SESSION":
                        setContextUpdate(event.sessionContext);
                        return;
                    case "ACCESS_TOKEN_PAYLOAD_UPDATED":
                        setContextUpdate(event.sessionContext);
                        return;
                    case "API_INVALID_CLAIM":
                        // In general the user should not be calling APIs that throw this
                        // so this may suggest that a claim was invalidated
                        setContextUpdate(event.sessionContext);
                        return;
                    case "SIGN_OUT":
                        setContextUpdate(event.sessionContext);
                        return;
                    case "UNAUTHORISED":
                        setContextUpdate(event.sessionContext);
                        if (props.onSessionExpired !== undefined) {
                            props.onSessionExpired();
                        } else if (props.requireAuth === true) {
                            redirectToLogin();
                        }
                        return;
                }
            }
            if (session.current === undefined) {
                session.current = recipe_1.default.getInstanceOrThrow();
            }
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        },
        [props, setContextUpdate]
    );
    var actualContext = !(0, sessionContext_1.isDefaultContext)(parentSessionContext) ? parentSessionContext : context;
    if (props.requireAuth === true && (actualContext.loading || !actualContext.doesSessionExist)) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(
        sessionContext_1.default.Provider,
        __assign({ value: __assign(__assign({}, actualContext), { isDefault: false }) }, { children: children })
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
