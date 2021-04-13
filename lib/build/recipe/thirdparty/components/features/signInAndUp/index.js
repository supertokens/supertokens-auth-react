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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
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
var React = __importStar(require("react"));
var react_2 = require("react");
var __1 = require("../../..");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var utils_1 = require("../../../../../utils");
var authRecipeModule_1 = __importDefault(require("../../../../authRecipeModule"));
var styles_2 = require("../../../components/themes/styles");
var constants_1 = require("../../../constants");
var api_1 = require("./api");
/*
 * Component.
 */
var SignInAndUp = /** @class */ (function (_super) {
    __extends(SignInAndUp, _super);
    /*
     * Constructor.
     */
    function SignInAndUp(props) {
        var _this = _super.call(this, props) || this;
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
        /*
         * Methods.
         */
        _this.componentDidMount = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var sessionExists;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRecipeInstanceOrThrow().doesSessionExist()];
                        case 1:
                            sessionExists = _a.sent();
                            if (!sessionExists) return [3 /*break*/, 3];
                            this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                                action: "SESSION_ALREADY_EXISTS",
                            });
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().redirect(
                                    { action: "SUCCESS", isNewUser: false },
                                    this.props.history
                                ),
                            ];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            this.setState(function (oldState) {
                                if (oldState.status !== "LOADING") {
                                    return oldState;
                                }
                                return __assign({}, oldState, { status: "READY" });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.signInAndUpClick = function (providerId) {
            return __awaiter(_this, void 0, void 0, function () {
                var provider, state, url, redirectToPath, redirect_uri, urlWithState, expiresAt, value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            provider = this.getRecipeConfigOrThrow().signInAndUpFeature.providers.find(function (p) {
                                return p.id === providerId;
                            });
                            if (provider === undefined) {
                                return [2 /*return*/, "Unknown Provider"];
                            }
                            state = provider.generateState();
                            return [
                                4 /*yield*/,
                                api_1.getOAuthAuthorisationURLAPI(provider.id, this.getRecipeInstanceOrThrow()),
                            ];
                        case 1:
                            url = _a.sent().url;
                            redirectToPath = utils_1.getRedirectToPathFromURL();
                            return [
                                4 /*yield*/,
                                this.getRecipeInstanceOrThrow().getRedirectUrl({
                                    action: "GET_REDIRECT_URL",
                                    provider: provider,
                                }),
                            ];
                        case 2:
                            redirect_uri = _a.sent();
                            urlWithState = utils_1.appendQueryParamsToURL(url, {
                                state: state,
                                redirect_uri: redirect_uri,
                            });
                            expiresAt = Date.now() + 1000 * 60 * 10;
                            value = JSON.stringify({
                                redirectToPath: redirectToPath,
                                state: state,
                                thirdPartyId: provider.id,
                                rid: this.getRecipeInstanceOrThrow().recipeId,
                                expiresAt: expiresAt,
                            });
                            utils_1
                                .getWindowOrThrow()
                                .sessionStorage.setItem(constants_1.SESSION_STORAGE_STATE_KEY, value);
                            // 4. Redirect to provider authorisation URL.
                            utils_1.getWindowOrThrow().location.href = urlWithState;
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.render = function () {
            // Before session is verified, return empty fragment, prevent UI glitch.
            if (_this.state.status === "LOADING") {
                return react_1.jsx(react_2.Fragment, null);
            }
            var signInAndUpFeature = _this.getRecipeConfigOrThrow().signInAndUpFeature;
            var providers = signInAndUpFeature.providers.map(function (provider) {
                return {
                    id: provider.id,
                    buttonComponent: provider.getButton(),
                };
            });
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
                        styleFromInit: signInAndUpFeature.style,
                        getDefaultStyles: styles_2.getStyles,
                    },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        _this.props.children === undefined &&
                            react_1.jsx(__1.SignInAndUpTheme, {
                                status: _this.state.status,
                                providers: providers,
                                signInAndUpClick: _this.signInAndUpClick,
                                privacyPolicyLink: signInAndUpFeature.privacyPolicyLink,
                                termsOfServiceLink: signInAndUpFeature.termsOfServiceLink,
                            }),
                        _this.props.children &&
                            React.cloneElement(_this.props.children, {
                                rawPalette: _this.getRecipeConfigOrThrow().palette,
                                termsOfServiceLink: signInAndUpFeature.termsOfServiceLink,
                                privacyPolicyLink: signInAndUpFeature.privacyPolicyLink,
                                signInAndUpClick: _this.signInAndUpClick,
                                providers: providers,
                            })
                    )
                )
            );
        };
        var status = "LOADING";
        var error = utils_1.getQueryParams("error");
        if (error !== null) {
            status = "GENERAL_ERROR";
        }
        _this.state = {
            status: status,
        };
        return _this;
    }
    return SignInAndUp;
})(react_2.PureComponent);
exports.default = SignInAndUp;
//# sourceMappingURL=index.js.map
