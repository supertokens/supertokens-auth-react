"use strict";
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
var recipeImplementation_1 = __importDefault(require("../../passwordless/recipeImplementation"));
var recipeImplementation_2 = __importDefault(require("../../thirdparty/recipeImplementation"));
var passwordlessImplementation_1 = __importDefault(require("./passwordlessImplementation"));
var thirdPartyImplementation_1 = __importDefault(require("./thirdPartyImplementation"));
function getRecipeImplementation(recipeId, appInfo) {
    var passwordlessImpl = recipeImplementation_1.default(recipeId, appInfo);
    var thirdPartyImpl = recipeImplementation_2.default(recipeId, appInfo);
    return {
        consumeCode: function (input) {
            return passwordlessImpl.consumeCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        createCode: function (input) {
            return passwordlessImpl.createCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist: function (input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(passwordlessImplementation_1.default(this))(input);
        },
        doesPasswordlessUserEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        passwordlessImpl.doesEmailExist.bind(passwordlessImplementation_1.default(this))(input),
                    ];
                });
            });
        },
        resendCode: function (input) {
            return passwordlessImpl.resendCode.bind(passwordlessImplementation_1.default(this))(input);
        },
        clearLoginAttemptInfo: function () {
            return passwordlessImpl.clearLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))();
        },
        getLoginAttemptInfo: function () {
            return passwordlessImpl.getLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))();
        },
        setLoginAttemptInfo: function (input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(passwordlessImplementation_1.default(this))(input);
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
        thirdPartySignInAndUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        thirdPartyImpl.signInAndUp.bind(thirdPartyImplementation_1.default(this))(input),
                    ];
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
