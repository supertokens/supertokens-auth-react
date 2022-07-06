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
var react_1 = __importStar(require("react"));
var session_1 = require("../session");
var usercontext_1 = require("../../usercontext");
var userContextWrapper_1 = __importDefault(require("../../usercontext/userContextWrapper"));
var utils_1 = require("../../utils");
var EmailVerificationAuth = function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);
    var sessionContext = (0, react_1.useContext)(session_1.SessionContext);
    var _b = (0, react_1.useState)(false),
        isEmailVerified = _b[0],
        setIsEmailVerified = _b[1];
    var recipe = react_1.default.useRef();
    var propsRef = react_1.default.useRef(props);
    var userContext = (0, usercontext_1.useUserContext)();
    if (recipe.current === undefined) {
        try {
            recipe.current = propsRef.current.getRecipe();
        } catch (_c) {
            // We are in either an SSR environment or the user forgot to initialize the recipe
            // We are ignoring this exception here, because in SSR we don't want to throw and the callback below will throw in a browser
        }
    }
    var checkIsEmailVerified = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            if (!recipe.current) {
                                // If the recipe.current isn't initialized here, this will likely throw and produce a user friendly error
                                recipe.current = propsRef.current.getRecipe();
                            }
                            if (!(sessionContext.doesSessionExist && recipe.current.config.mode === "REQUIRED"))
                                return [3 /*break*/, 2];
                            return [4 /*yield*/, recipe.current.isEmailVerified(userContext)];
                        case 1:
                            return [2 /*return*/, _a.sent().isVerified];
                        case 2:
                            return [2 /*return*/, undefined];
                    }
                });
            });
        },
        [sessionContext]
    );
    var useIsEmailVerified = (0, react_1.useCallback)(
        function (isEmailVerified) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            if (!(sessionContext.doesSessionExist && recipe.current.config.mode === "REQUIRED"))
                                return [3 /*break*/, 3];
                            if (!(isEmailVerified === false)) return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                recipe.current.redirect({ action: "VERIFY_EMAIL" }, propsRef.current.history),
                            ];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            setIsEmailVerified(true);
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [sessionContext.loading]
    );
    (0, utils_1.useOnMountAPICall)(
        checkIsEmailVerified,
        useIsEmailVerified,
        undefined,
        sessionContext.loading === false
    );
    // We only render after loading has finished to eliminate flicker
    // recipe.current should only be undefined during SSR but this makes the type system happy
    if (sessionContext.loading === true || recipe.current === undefined) {
        return null;
    }
    if (recipe.current.config.mode !== "REQUIRED" || sessionContext.doesSessionExist === false || isEmailVerified) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
    }
    return null;
};
var EmailVerificationAuthWrapper = function (props) {
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: props.userContext },
            { children: (0, jsx_runtime_1.jsx)(EmailVerificationAuth, __assign({}, props)) }
        )
    );
};
exports.default = EmailVerificationAuthWrapper;
