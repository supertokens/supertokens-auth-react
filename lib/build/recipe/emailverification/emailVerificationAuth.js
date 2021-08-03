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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var session_1 = require("../session");
var EmailVerificationAuth = function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);
    var sessionContext = react_1.useContext(session_1.SessionContext);
    var _b = react_1.useState(false),
        isEmailVerified = _b[0],
        setIsEmailVerified = _b[1];
    // we extract these three this way so that the useEffect below
    // doesn't rerun just because the sessionContext or props objects
    // have changed, even though the doesSessionExist & emailVerificationMode
    // have not.
    var doesSessionExist = sessionContext.doesSessionExist;
    var emailVerificationMode = props.recipe.config.mode;
    var propsRef = react_1.default.useRef(props);
    react_1.useEffect(
        function () {
            var thisUseEffectMustReturnImmediately = false;
            function doTask() {
                return __awaiter(this, void 0, void 0, function () {
                    var isEmailVerified_1, _1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(doesSessionExist && emailVerificationMode === "REQUIRED"))
                                    return [3 /*break*/, 7];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, propsRef.current.recipe.isEmailVerified()];
                            case 2:
                                isEmailVerified_1 = _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _1 = _a.sent();
                                /* if there is an error, we assume that the email is verified
                                 * so that the user can see the content on the page...
                                 *
                                 * This is not a security issue since the backend should check
                                 * for email verification on each request anyway (via sessions...)
                                 */
                                isEmailVerified_1 = true;
                                return [3 /*break*/, 4];
                            case 4:
                                if (thisUseEffectMustReturnImmediately) {
                                    return [2 /*return*/];
                                }
                                if (!(isEmailVerified_1 === false)) return [3 /*break*/, 6];
                                return [
                                    4 /*yield*/,
                                    propsRef.current.recipe.redirect(
                                        { action: "VERIFY_EMAIL" },
                                        propsRef.current.history
                                    ),
                                ];
                            case 5:
                                _a.sent();
                                return [3 /*break*/, 7];
                            case 6:
                                setIsEmailVerified(true);
                                _a.label = 7;
                            case 7:
                                return [2 /*return*/];
                        }
                    });
                });
            }
            doTask();
            return function () {
                // this means that the sessionContext or props have changed..
                // so we should not update state or do anything anymore in this useEffect.
                // We need this cause we are doing an async task in this.
                thisUseEffectMustReturnImmediately = true;
            };
        },
        [doesSessionExist, emailVerificationMode]
    );
    if (sessionContext.doesSessionExist === false) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    if (props.recipe.config.mode !== "REQUIRED") {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return isEmailVerified ? react_1.default.createElement(react_1.default.Fragment, null, children) : null;
};
exports.default = EmailVerificationAuth;
//# sourceMappingURL=emailVerificationAuth.js.map
