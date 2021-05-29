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
var querier_1 = __importDefault(require("../../querier"));
var utils_1 = require("../../utils");
var RecipeImplementation = /** @class */ (function () {
    function RecipeImplementation(recipeId, appInfo) {
        var _this = this;
        this.getOAuthAuthorisationURL = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.querier.get(
                                    "/authorisationurl",
                                    {},
                                    { thirdPartyId: input.thirdPartyId },
                                    function (context) {
                                        return input.config.preAPIHook(
                                            __assign({}, context, { action: "GET_AUTHORISATION_URL" })
                                        );
                                    }
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.url];
                    }
                });
            });
        };
        this.signInAndUp = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var provider, stateFromStorage, code, stateFromQueryParams, redirectURI, response, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            provider = input.config.signInAndUpFeature.providers.find(function (p) {
                                return p.id === input.thirdPartyId;
                            });
                            stateFromStorage = this.getOAuthState();
                            code = utils_1.getQueryParams("code");
                            stateFromQueryParams = utils_1.getQueryParams("state");
                            if (
                                utils_1.getQueryParams("error") !== null ||
                                stateFromStorage === undefined ||
                                stateFromStorage.thirdPartyId !== input.thirdPartyId ||
                                stateFromStorage.state !== stateFromQueryParams ||
                                code === null ||
                                provider === undefined
                            ) {
                                return [2 /*return*/, { status: "GENERAL_ERROR" }];
                            }
                            return [4 /*yield*/, provider.getRedirectURL()];
                        case 1:
                            redirectURI = _a.sent();
                            return [
                                4 /*yield*/,
                                this.querier.post(
                                    "/signinup",
                                    {
                                        body: JSON.stringify({
                                            code: code,
                                            thirdPartyId: input.thirdPartyId,
                                            redirectURI: redirectURI,
                                        }),
                                    },
                                    function (context) {
                                        return input.config.preAPIHook(__assign({}, context, { action: "SIGN_IN" }));
                                    }
                                ),
                            ];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response];
                        case 3:
                            err_1 = _a.sent();
                            return [2 /*return*/, { status: "GENERAL_ERROR" }];
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getOAuthState = function () {
            try {
                var state = JSON.parse(utils_1.getWindowOrThrow().sessionStorage.getItem("supertokens-oauth-state"));
                if (state === null) {
                    return undefined;
                }
                if (Date.now() > state.expiresAt) {
                    return undefined;
                }
                return state;
            } catch (e) {
                return undefined;
            }
        };
        this.setOAuthState = function (state) {
            var expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            var value = JSON.stringify({
                redirectToPath: state.redirectToPath,
                state: state.state,
                thirdPartyId: state.thirdPartyId,
                rid: state.rid,
                expiresAt: expiresAt,
            });
            utils_1.getWindowOrThrow().sessionStorage.setItem("supertokens-oauth-state", value);
        };
        this.redirectToThirdPartyLogin = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var provider, state, url, urlWithState, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            provider = input.config.signInAndUpFeature.providers.find(function (p) {
                                return p.id === input.thirdPartyId;
                            });
                            if (provider === undefined) {
                                return [2 /*return*/, { status: "ERROR" }];
                            }
                            state =
                                input.state === undefined || input.state.state === undefined
                                    ? provider.generateState()
                                    : input.state.state;
                            // 2. Store state in Session Storage.
                            this.setOAuthState(
                                __assign({}, input.state, {
                                    rid:
                                        input.state === undefined || input.state.rid === undefined
                                            ? input.config.recipeId
                                            : input.state.rid,
                                    thirdPartyId:
                                        input.state === undefined || input.state.thirdPartyId === undefined
                                            ? input.thirdPartyId
                                            : input.state.thirdPartyId,
                                    state: state,
                                })
                            );
                            return [
                                4 /*yield*/,
                                this.getOAuthAuthorisationURL({
                                    thirdPartyId: provider.id,
                                    config: input.config,
                                }),
                            ];
                        case 1:
                            url = _a.sent();
                            urlWithState = utils_1.appendQueryParamsToURL(url, {
                                state: state,
                                redirect_uri: provider.getRedirectURL(),
                            });
                            // 4. Redirect to provider authorisation URL.
                            utils_1.getWindowOrThrow().location.href = urlWithState;
                            return [2 /*return*/, { status: "OK" }];
                        case 2:
                            err_2 = _a.sent();
                            return [2 /*return*/, { status: "ERROR" }];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.querier = new querier_1.default(recipeId, appInfo);
    }
    return RecipeImplementation;
})();
exports.default = RecipeImplementation;
//# sourceMappingURL=recipeImplementation.js.map
