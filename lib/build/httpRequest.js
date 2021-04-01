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
var constants_1 = require("./constants");
var normalisedURLPath_1 = __importDefault(require("./normalisedURLPath"));
var utils_1 = require("./utils");
var version_1 = require("./version");
var HttpRequest = /** @class */ (function () {
    /*
     * Constructor.
     */
    function HttpRequest(recipe) {
        var _this = this;
        /*
         * Instance Methods.
         */
        this.get = function (path, config, action, queryParams) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetchResponseJsonOrThrowAbove300(
                                    this.getFullUrl(path, queryParams),
                                    __assign({ method: "GET" }, config),
                                    action
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.post = function (path, config, action) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetchResponseJsonOrThrowAbove300(
                                    this.getFullUrl(path),
                                    __assign({ method: "POST" }, config),
                                    action
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.delete = function (path, action, config) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetchResponseJsonOrThrowAbove300(
                                    this.getFullUrl(path),
                                    __assign({ method: "DELETE" }, config),
                                    action
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.put = function (path, action, config) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.fetchResponseJsonOrThrowAbove300(
                                    this.getFullUrl(path),
                                    __assign({ method: "PUT" }, config),
                                    action
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.fetch = function (baseUrl, config, action) {
            return __awaiter(_this, void 0, void 0, function () {
                var headers, _a, requestInit, url;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (config === undefined) {
                                headers = {};
                            } else {
                                headers = config.headers;
                            }
                            return [
                                4 /*yield*/,
                                this.preAPIHook({
                                    action: action,
                                    requestInit: __assign({}, config, {
                                        headers: __assign({}, headers, {
                                            "fdi-version": version_1.supported_fdi.join(","),
                                            "Content-Type": "application/json",
                                            rid: this.recipe.recipeId,
                                        }),
                                    }),
                                    url: baseUrl,
                                }),
                            ];
                        case 1:
                            (_a = _b.sent()), (requestInit = _a.requestInit), (url = _a.url);
                            return [4 /*yield*/, fetch(url, requestInit)];
                        case 2:
                            return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        /*
         * For backward compatibility
         */
        this.preAPIHook = function (_a) {
            var action = _a.action,
                url = _a.url,
                requestInit = _a.requestInit;
            return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.recipe.hooks.preAPIHook({ action: action, url: url, requestInit: requestInit }),
                            ];
                        case 1:
                            result = _b.sent();
                            if (utils_1.isRequestInit(result)) {
                                return [
                                    2 /*return*/,
                                    {
                                        url: url,
                                        requestInit: result,
                                    },
                                ];
                            } else {
                                return [2 /*return*/, __assign({ url: url }, result)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.fetchResponseJsonOrThrowAbove300 = function (url, config, action) {
            return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.fetch(url, config, action)];
                        case 1:
                            result = _a.sent();
                            if (result.status >= 300) {
                                throw Error(constants_1.SOMETHING_WENT_WRONG_ERROR);
                            }
                            return [4 /*yield*/, result.json()];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.getFullUrl = function (pathStr, queryParams) {
            var path = new normalisedURLPath_1.default(pathStr);
            var fullUrl =
                "" +
                _this.recipe.appInfo.apiDomain.getAsStringDangerous() +
                _this.recipe.appInfo.apiBasePath.getAsStringDangerous() +
                path.getAsStringDangerous();
            if (queryParams === undefined) {
                return fullUrl;
            }
            // If query params, add.
            return fullUrl + "?" + new URLSearchParams(queryParams);
        };
        this.recipe = recipe;
    }
    return HttpRequest;
})();
exports.default = HttpRequest;
//# sourceMappingURL=httpRequest.js.map
