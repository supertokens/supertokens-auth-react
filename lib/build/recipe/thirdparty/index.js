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
exports.signOut =
    exports.SignInAndUpCallbackTheme =
    exports.SignInAndUpCallback =
    exports.SignInAndUpTheme =
    exports.SignInAndUp =
    exports.redirectToThirdPartyLogin =
    exports.signInAndUp =
    exports.getAuthStateFromURL =
    exports.getAuthErrorFromURL =
    exports.getAuthCodeFromURL =
    exports.verifyAndGetStateOrThrowError =
    exports.generateStateToSendToOAuthProvider =
    exports.getAuthorisationURLFromBackend =
    exports.getAuthorisationURLWithQueryParamsAndSetState =
    exports.setStateAndOtherInfoToStorage =
    exports.getStateAndOtherInfoFromStorage =
    exports.Github =
    exports.Facebook =
    exports.Google =
    exports.Apple =
    exports.init =
        void 0;
/*
 * Import
 */
// /!\ ThirdParty must be imported before any of the providers to prevent circular dependencies.
var recipe_1 = __importDefault(require("./recipe"));
var signInAndUp_1 = __importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var signInAndUpCallback_1 = require("./components/themes/signInAndUpCallback");
Object.defineProperty(exports, "SignInAndUpCallbackTheme", {
    enumerable: true,
    get: function () {
        return signInAndUpCallback_1.SignInAndUpCallbackTheme;
    },
});
var apple_1 = __importDefault(require("./providers/apple"));
exports.Apple = apple_1.default;
var google_1 = __importDefault(require("./providers/google"));
exports.Google = google_1.default;
var facebook_1 = __importDefault(require("./providers/facebook"));
exports.Facebook = facebook_1.default;
var github_1 = __importDefault(require("./providers/github"));
exports.Github = github_1.default;
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().signOut({
                        userContext: (0, utils_1.getNormalisedUserContext)(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return __generator(this, function (_a) {
                recipeInstance = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    (0, utils_2.redirectToThirdPartyLogin)({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        recipeImplementation: recipeInstance.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setStateAndOtherInfoToStorage = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.signInAndUp(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateStateToSendToOAuthProvider = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetStateOrThrowError = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthErrorFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthStateFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /*
     * Providers
     */
    Wrapper.Google = google_1.default;
    Wrapper.Apple = apple_1.default;
    Wrapper.Facebook = facebook_1.default;
    Wrapper.Github = github_1.default;
    Wrapper.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = signInAndUp_1.default;
    Wrapper.SignInAndUpCallback = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.SignInAndUpCallbackTheme = signInAndUpCallback_1.SignInAndUpCallbackTheme;
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var signOut = Wrapper.signOut;
exports.signOut = signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
var getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
var getAuthStateFromURL = Wrapper.getAuthStateFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
var signInAndUp = Wrapper.signInAndUp;
exports.signInAndUp = signInAndUp;
var SignInAndUp = Wrapper.SignInAndUp;
exports.SignInAndUp = SignInAndUp;
var SignInAndUpCallback = Wrapper.SignInAndUpCallback;
exports.SignInAndUpCallback = SignInAndUpCallback;
