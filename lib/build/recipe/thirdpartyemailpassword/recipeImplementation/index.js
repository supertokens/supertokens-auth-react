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
var recipeImplementation_1 = __importDefault(require("../../emailpassword/recipeImplementation"));
var recipeImplementation_2 = __importDefault(require("../../thirdparty/recipeImplementation"));
var emailPasswordImplementation_1 = __importDefault(require("./emailPasswordImplementation"));
var thirdPartyImplementation_1 = __importDefault(require("./thirdPartyImplementation"));
function getRecipeImplementation(recipeId, appInfo) {
    var emailpasswordImpl = recipeImplementation_1.default(recipeId, appInfo);
    var thirdPartyImpl = recipeImplementation_2.default(recipeId, appInfo);
    return {
        submitNewPassword: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.submitNewPassword.bind(emailPasswordImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        sendPasswordResetEmail: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.sendPasswordResetEmail.bind(emailPasswordImplementation_1.default(this))(
                            input
                        ),
                    ];
                });
            });
        },
        doesEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        emailpasswordImpl.doesEmailExist.bind(emailPasswordImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        getOAuthAuthorisationURL: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.getOAuthAuthorisationURL.bind(thirdPartyImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        signInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response, response, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(input.type === "emailpassword")) return [3 /*break*/, 5];
                            if (!input.isSignIn) return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                emailpasswordImpl.signIn.bind(emailPasswordImplementation_1.default(this))(input),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                return [
                                    2 /*return*/,
                                    __assign(__assign({}, response), { createdNewUser: false, type: "emailpassword" }),
                                ];
                            } else {
                                return [2 /*return*/, __assign(__assign({}, response), { type: "emailpassword" })];
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            return [
                                4 /*yield*/,
                                emailpasswordImpl.signUp.bind(emailPasswordImplementation_1.default(this))(input),
                            ];
                        case 3:
                            response = _a.sent();
                            if (response.status === "OK") {
                                return [
                                    2 /*return*/,
                                    __assign(__assign({}, response), { createdNewUser: true, type: "emailpassword" }),
                                ];
                            } else {
                                return [2 /*return*/, __assign(__assign({}, response), { type: "emailpassword" })];
                            }
                            _a.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            return [
                                4 /*yield*/,
                                thirdPartyImpl.signInAndUp.bind(thirdPartyImplementation_1.default(this))(input),
                            ];
                        case 6:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response), { type: "thirdparty" })];
                        case 7:
                            return [2 /*return*/];
                    }
                });
            });
        },
        getOAuthState: function () {
            return thirdPartyImpl.getOAuthState.bind(thirdPartyImplementation_1.default(this))();
        },
        setOAuthState: function (input) {
            return thirdPartyImpl.setOAuthState.bind(thirdPartyImplementation_1.default(this))(input);
        },
        redirectToThirdPartyLogin: function (input) {
            return thirdPartyImpl.redirectToThirdPartyLogin.bind(thirdPartyImplementation_1.default(this))(input);
        },
    };
}
exports.default = getRecipeImplementation;
