"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var api_1 = require("./api");
var signInAndUpCallback_1 = __importDefault(require("../../themes/signInAndUpCallback"));
var utils_2 = require("../../../utils");
var authRecipeModule_1 = __importDefault(require("../../../../authRecipeModule"));
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
/*
 * Component.
 */
var SignInAndUpCallback = /** @class */ (function (_super) {
    __extends(SignInAndUpCallback, _super);
    function SignInAndUpCallback() {
        /*
         * Methods.
         */
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.getRecipeInstanceOrThrow = function () {
            if (_this.props.recipeId === undefined) {
                throw new Error("No recipeId props given to SignInAndUp component");
            }
            var recipe = superTokens_1.default.getInstanceOrThrow().getRecipeOrThrow(_this.props.recipeId);
            if (recipe instanceof authRecipeModule_1.default === false) {
                throw new Error(
                    recipe.recipeId + " must be an instance of AuthRecipeModule to use SignInAndUp component."
                );
            }
            return recipe;
        };
        _this.getRecipeConfigOrThrow = function () {
            return _this.getRecipeInstanceOrThrow().getConfig();
        };
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.componentDidMount = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var providerId, oauthCallbackError, code, provider, redirectUrl, response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            providerId = utils_1.getWindowOrThrow().location.pathname.split("/")[
                                utils_1.getWindowOrThrow().location.pathname.split("/").length - 1
                            ];
                            oauthCallbackError = this.getOAuthCallbackError(providerId);
                            if (oauthCallbackError !== undefined) {
                                return [
                                    2 /*return*/,
                                    this.getRecipeInstanceOrThrow().redirect(
                                        { action: "SIGN_IN_AND_UP" },
                                        this.props.history,
                                        {
                                            error: oauthCallbackError,
                                        }
                                    ),
                                ];
                            }
                            code = utils_1.getQueryParams("code");
                            if (code === null) {
                                return [
                                    2 /*return*/,
                                    this.getRecipeInstanceOrThrow().redirect(
                                        { action: "SIGN_IN_AND_UP" },
                                        this.props.history,
                                        {
                                            error: "no_code",
                                        }
                                    ),
                                ];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            provider = this.getRecipeConfigOrThrow().signInAndUpFeature.providers.find(function (p) {
                                return p.id === providerId;
                            });
                            if (provider === undefined) {
                                throw new Error();
                            }
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().getRedirectUrl({
                                    action: "GET_REDIRECT_URL",
                                    provider: provider,
                                }),
                            ];
                        case 2:
                            redirectUrl = _a.sent();
                            return [
                                4 /*yield*/,
                                api_1.signInAndUpAPI(providerId, code, this.getRecipeInstanceOrThrow(), redirectUrl),
                            ];
                        case 3:
                            response = _a.sent();
                            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                                return [
                                    2 /*return*/,
                                    this.getRecipeInstanceOrThrow().redirect(
                                        { action: "SIGN_IN_AND_UP" },
                                        this.props.history,
                                        {
                                            error: "no_email_present",
                                        }
                                    ),
                                ];
                            }
                            if (response.status === "OK") {
                                this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: response.createdNewUser,
                                    user: response.user,
                                });
                                return [
                                    2 /*return*/,
                                    this.getRecipeInstanceOrThrow().redirect(
                                        { action: "SUCCESS", isNewUser: response.createdNewUser },
                                        this.props.history
                                    ),
                                ];
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _a.sent();
                            return [
                                2 /*return*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SIGN_IN_AND_UP" },
                                    this.props.history,
                                    {
                                        error: "signin",
                                    }
                                ),
                            ];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.getOAuthCallbackError = function (providerIdFromPath) {
            // 1. error params is present.
            var error = utils_1.getQueryParams("error");
            if (error !== null) {
                return error;
            }
            // 2. No state params.
            var state = utils_1.getQueryParams("state");
            if (state === null) {
                return "no_query_state";
            }
            var stateObject = utils_2.getOAuthState();
            if (stateObject === undefined) {
                return "error_reading_local_state";
            }
            // 4. State nonce mismatch.
            if (stateObject.state !== state) {
                return "state_mismatch";
            }
            // 5. State expired.
            if (Date.now() > stateObject.expiresAt) {
                return "state_expired";
            }
            // 6. Third party provider mismatch between route and state object.
            if (stateObject.thirdPartyId !== providerIdFromPath) {
                return "provider_mismatch";
            }
            return undefined;
        };
        _this.render = function () {
            /*
             * Render.
             */
            return react_1.jsx(
                featureWrapper_1.default,
                { useShadowDom: _this.getRecipeConfigOrThrow().useShadowDom, isEmbedded: _this.getIsEmbedded() },
                react_1.jsx(
                    styleContext_1.StyleProvider,
                    {
                        rawPalette: _this.getRecipeConfigOrThrow().palette,
                        defaultPalette: styles_1.defaultPalette,
                        getDefaultStyles: styles_2.getStyles,
                    },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        _this.props.children === undefined && react_1.jsx(signInAndUpCallback_1.default, null),
                        _this.props.children
                    )
                )
            );
        };
        return _this;
    }
    return SignInAndUpCallback;
})(react_2.PureComponent);
exports.default = SignInAndUpCallback;
//# sourceMappingURL=index.js.map
