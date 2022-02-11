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
var querier_1 = __importDefault(require("../../querier"));
var constants_1 = require("./constants");
var utils_1 = require("../../utils");
function getRecipeImplementation(recipeId, appInfo) {
    var querier = new querier_1.default(recipeId, appInfo);
    return {
        createCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, validationRes, validationRes, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!("email" in input)) return [3 /*break*/, 2];
                            return [4 /*yield*/, input.config.validateEmailAddress(input.email)];
                        case 1:
                            validationRes = _a.sent();
                            if (validationRes !== undefined) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "GENERAL_ERROR",
                                        message: validationRes,
                                    },
                                ];
                            }
                            bodyObj = {
                                email: input.email,
                            };
                            _a.label = 2;
                        case 2:
                            if (!("phoneNumber" in input)) return [3 /*break*/, 4];
                            return [4 /*yield*/, input.config.validatePhoneNumber(input.phoneNumber)];
                        case 3:
                            validationRes = _a.sent();
                            if (validationRes !== undefined) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "GENERAL_ERROR",
                                        message: validationRes,
                                    },
                                ];
                            }
                            bodyObj = {
                                phoneNumber: input.phoneNumber,
                            };
                            _a.label = 4;
                        case 4:
                            return [
                                4 /*yield*/,
                                querier.post("/signinup/code", { body: JSON.stringify(bodyObj) }, function (context) {
                                    return input.config.preAPIHook(
                                        __assign(__assign({}, context), {
                                            action: "PASSWORDLESS_CREATE_CODE",
                                            userContext: input.userContext,
                                        })
                                    );
                                }),
                            ];
                        case 5:
                            response = _a.sent();
                            if (response.status === "OK") {
                                input.config.onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: false,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        resendCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bodyObj = {
                                deviceId: input.deviceId,
                                preAuthSessionId: input.preAuthSessionId,
                            };
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup/code/resend",
                                    { body: JSON.stringify(bodyObj) },
                                    function (context) {
                                        return input.config.preAPIHook(
                                            __assign(__assign({}, context), {
                                                action: "PASSWORDLESS_RESEND_CODE",
                                                userContext: input.userContext,
                                            })
                                        );
                                    }
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                input.config.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                input.config.onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: true,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if ("userInputCode" in input) {
                                bodyObj = {
                                    userInputCode: input.userInputCode,
                                    deviceId: input.deviceId,
                                    preAuthSessionId: input.preAuthSessionId,
                                };
                            }
                            if ("linkCode" in input) {
                                bodyObj = {
                                    linkCode: input.linkCode,
                                    preAuthSessionId: input.preAuthSessionId,
                                };
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup/code/consume",
                                    { body: JSON.stringify(bodyObj) },
                                    function (context) {
                                        return input.config.preAPIHook(
                                            __assign(__assign({}, context), {
                                                action: "PASSWORDLESS_CONSUME_CODE",
                                                userContext: input.userContext,
                                            })
                                        );
                                    }
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                input.config.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                input.config.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: response.createdUser,
                                    user: response.user,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        doesEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get("/signup/email/exists", {}, { email: input.email }, function (context) {
                                    return input.config.preAPIHook(
                                        __assign(__assign({}, context), {
                                            action: "EMAIL_EXISTS",
                                            userContext: input.userContext,
                                        })
                                    );
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.exists];
                    }
                });
            });
        },
        doesPhoneNumberExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/signup/phoneNumber/exists",
                                    {},
                                    { phoneNumber: input.phoneNumber },
                                    function (context) {
                                        return input.config.preAPIHook(
                                            __assign(__assign({}, context), {
                                                action: "PHONE_NUMBER_EXISTS",
                                                userContext: input.userContext,
                                            })
                                        );
                                    }
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.exists];
                    }
                });
            });
        },
        getLoginAttemptInfo: function () {
            var storedInfo = utils_1.getLocalStorage(constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
            if (!storedInfo) {
                return undefined;
            }
            try {
                var info = JSON.parse(storedInfo);
                return {
                    contactInfo: info.contactInfo,
                    contactMethod: info.contactMethod,
                    deviceId: info.deviceId,
                    flowType: info.flowType,
                    preAuthSessionId: info.preAuthSessionId,
                    lastResend: info.lastResend,
                    redirectToPath: info.redirectToPath,
                };
            } catch (ex) {
                return undefined;
            }
        },
        setLoginAttemptInfo: function (input) {
            utils_1.setLocalStorage(
                constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                JSON.stringify(
                    __assign(
                        {
                            // This can make future changes/migrations a lot cleaner
                            version: 1,
                        },
                        input
                    )
                )
            );
        },
        clearLoginAttemptInfo: function () {
            utils_1.removeFromLocalStorage(constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY);
        },
    };
}
exports.default = getRecipeImplementation;
