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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut =
    exports.clearLoginAttemptInfo =
    exports.setLoginAttemptInfo =
    exports.getLoginAttemptInfo =
    exports.doesPhoneNumberExist =
    exports.doesEmailExist =
    exports.getPreAuthSessionIdFromURL =
    exports.getLinkCodeFromURL =
    exports.consumeCode =
    exports.resendCode =
    exports.createCode =
    exports.init =
    exports.LinkClicked =
    exports.SignInUpTheme =
    exports.SignInUp =
        void 0;
var recipe_1 = __importDefault(require("./recipe"));
var signInUp_1 = __importDefault(require("./components/themes/signInUp"));
var utils_1 = require("../../utils");
var UtilFunctions = __importStar(require("./utils"));
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
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
    Wrapper.createCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.createCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.resendCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumeCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    UtilFunctions.consumeCode(
                        __assign(__assign({}, input), {
                            recipeImplementation: recipe_1.default.getInstanceOrThrow().recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLinkCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getLinkCodeFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getPreAuthSessionIdFromURL(
            __assign(__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.doesPhoneNumberExist(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getLoginAttemptInfo(
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
    Wrapper.setLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.setLoginAttemptInfo(
                        __assign(__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.clearLoginAttemptInfo(
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
    Wrapper.SignInUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    };
    Wrapper.SignInUpTheme = signInUp_1.default;
    Wrapper.LinkClicked = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    };
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var createCode = Wrapper.createCode;
exports.createCode = createCode;
var resendCode = Wrapper.resendCode;
exports.resendCode = resendCode;
var consumeCode = Wrapper.consumeCode;
exports.consumeCode = consumeCode;
var getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
exports.getLinkCodeFromURL = getLinkCodeFromURL;
var getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
exports.getPreAuthSessionIdFromURL = getPreAuthSessionIdFromURL;
var doesEmailExist = Wrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
exports.doesPhoneNumberExist = doesPhoneNumberExist;
var getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
exports.getLoginAttemptInfo = getLoginAttemptInfo;
var setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
exports.setLoginAttemptInfo = setLoginAttemptInfo;
var clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
exports.clearLoginAttemptInfo = clearLoginAttemptInfo;
var signOut = Wrapper.signOut;
exports.signOut = signOut;
var SignInUp = Wrapper.SignInUp;
exports.SignInUp = SignInUp;
var SignInUpTheme = Wrapper.SignInUpTheme;
exports.SignInUpTheme = SignInUpTheme;
var LinkClicked = Wrapper.LinkClicked;
exports.LinkClicked = LinkClicked;
