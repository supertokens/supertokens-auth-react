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
exports.redirectToThirdPartyLogin =
    exports.matchRecipeIdUsingState =
    exports.normaliseSignInAndUpFeature =
    exports.normaliseThirdPartyConfig =
        void 0;
/*
 * Imports.
 */
var providers_1 = __importDefault(require("./providers"));
var custom_1 = __importDefault(require("./providers/custom"));
var utils_1 = require("../authRecipe/utils");
var utils_2 = require("../../utils");
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : {};
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof providers_1.default) {
            return provider;
        }
        return custom_1.default.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.recipeImpl.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
function redirectToThirdPartyLogin(input) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = input.config.signInAndUpFeature.providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            providerId: input.thirdPartyId,
                            authorisationURL: provider.getRedirectURL(),
                            providerClientId: provider.clientId,
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    response = _a.sent();
                    (0, utils_2.redirectWithFullPageReload)(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
}
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
