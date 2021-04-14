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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var session_1 = __importDefault(require("./session"));
var sessionAuth_1 = __importDefault(require("./sessionAuth"));
var useSessionContext_1 = __importDefault(require("./useSessionContext"));
/*
 * Class.
 */
var SessionAPIWrapper = /** @class */ (function () {
    function SessionAPIWrapper() {}
    SessionAPIWrapper.init = function (config) {
        return session_1.default.init(config);
    };
    SessionAPIWrapper.getRefreshURLDomain = function () {
        return session_1.default.getRefreshURLDomain();
    };
    SessionAPIWrapper.getUserId = function () {
        return session_1.default.getUserId();
    };
    SessionAPIWrapper.getJWTPayloadSecurely = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, session_1.default.getJWTPayloadSecurely()];
            });
        });
    };
    SessionAPIWrapper.attemptRefreshingSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, session_1.default.attemptRefreshingSession()];
            });
        });
    };
    SessionAPIWrapper.doesSessionExist = function () {
        return session_1.default.doesSessionExist();
    };
    SessionAPIWrapper.useSessionContext = useSessionContext_1.default;
    SessionAPIWrapper.SessionAuth = sessionAuth_1.default;
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    SessionAPIWrapper.addAxiosInterceptors = function (axiosInstance) {
        return session_1.default.addAxiosInterceptors(axiosInstance);
    };
    SessionAPIWrapper.setAuth0API = function (apiPath) {
        return session_1.default.setAuth0API(apiPath);
    };
    SessionAPIWrapper.getAuth0API = function () {
        return session_1.default.getAuth0API();
    };
    SessionAPIWrapper.signOut = function () {
        return session_1.default.signOut();
    };
    return SessionAPIWrapper;
})();
exports.default = SessionAPIWrapper;
exports.useSessionContext = SessionAPIWrapper.useSessionContext;
exports.SessionAuth = SessionAPIWrapper.SessionAuth;
exports.init = SessionAPIWrapper.init;
exports.getRefreshURLDomain = SessionAPIWrapper.getRefreshURLDomain;
exports.getUserId = SessionAPIWrapper.getUserId;
exports.getJWTPayloadSecurely = SessionAPIWrapper.getJWTPayloadSecurely;
exports.attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
exports.doesSessionExist = SessionAPIWrapper.doesSessionExist;
exports.addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
exports.setAuth0API = SessionAPIWrapper.setAuth0API;
exports.getAuth0API = SessionAPIWrapper.getAuth0API;
exports.signOut = SessionAPIWrapper.signOut;
//# sourceMappingURL=index.js.map
