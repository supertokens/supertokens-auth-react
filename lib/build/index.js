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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserContext =
    exports.useTranslation =
    exports.SuperTokensWrapper =
    exports.redirectToAuth =
    exports.getSuperTokensRoutesForReactRouterDom =
    exports.getRoutingComponent =
    exports.loadTranslation =
    exports.changeLanguage =
    exports.init =
    exports.canHandleRoute =
        void 0;
/*
 * Imports.
 */
var translationContext_1 = require("./translation/translationContext");
var superTokens_1 = __importDefault(require("./superTokens"));
var usercontext_1 = require("./usercontext");
var supertokensWrapper_1 = require("./components/supertokensWrapper");
/*
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {}
    SuperTokensAPIWrapper.init = function (config) {
        superTokens_1.default.init(config);
    };
    SuperTokensAPIWrapper.canHandleRoute = function () {
        return superTokens_1.default.canHandleRoute();
    };
    SuperTokensAPIWrapper.getRoutingComponent = function () {
        return superTokens_1.default.getRoutingComponent();
    };
    SuperTokensAPIWrapper.changeLanguage = function (language) {
        return superTokens_1.default.getInstanceOrThrow().changeLanguage(language);
    };
    SuperTokensAPIWrapper.loadTranslation = function (store) {
        return superTokens_1.default.getInstanceOrThrow().loadTranslation(store);
    };
    SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom) {
        return superTokens_1.default.getSuperTokensRoutesForReactRouterDom(reactRouterDom);
    };
    var _a;
    _a = SuperTokensAPIWrapper;
    SuperTokensAPIWrapper.SuperTokensWrapper = supertokensWrapper_1.SuperTokensWrapper;
    SuperTokensAPIWrapper.redirectToAuth = function (options) {
        return __awaiter(void 0, void 0, void 0, function () {
            var _b;
            return __generator(_a, function (_c) {
                return [
                    2 /*return*/,
                    superTokens_1.default.getInstanceOrThrow().redirectToAuth(
                        __assign(__assign({}, options), {
                            redirectBack:
                                (_b = options === null || options === void 0 ? void 0 : options.redirectBack) !==
                                    null && _b !== void 0
                                    ? _b
                                    : true,
                        })
                    ),
                ];
            });
        });
    };
    SuperTokensAPIWrapper.useTranslation = translationContext_1.useTranslation;
    SuperTokensAPIWrapper.useUserContext = usercontext_1.useUserContext;
    return SuperTokensAPIWrapper;
})();
exports.default = SuperTokensAPIWrapper;
exports.canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
exports.init = SuperTokensAPIWrapper.init;
exports.changeLanguage = SuperTokensAPIWrapper.changeLanguage;
exports.loadTranslation = SuperTokensAPIWrapper.loadTranslation;
exports.getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom;
exports.redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;
var supertokensWrapper_2 = require("./components/supertokensWrapper");
Object.defineProperty(exports, "SuperTokensWrapper", {
    enumerable: true,
    get: function () {
        return supertokensWrapper_2.SuperTokensWrapper;
    },
});
var translationContext_2 = require("./translation/translationContext");
Object.defineProperty(exports, "useTranslation", {
    enumerable: true,
    get: function () {
        return translationContext_2.useTranslation;
    },
});
var usercontext_2 = require("./usercontext");
Object.defineProperty(exports, "useUserContext", {
    enumerable: true,
    get: function () {
        return usercontext_2.useUserContext;
    },
});
