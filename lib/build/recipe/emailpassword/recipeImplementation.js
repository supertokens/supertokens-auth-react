"use strict";
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
        this.submitNewPassword = function (formFields, token, options) {
            return __awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                utils_1.validateForm(
                                    formFields,
                                    options.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            // Verify that both passwords match.
                            if (formFields[0].value !== formFields[1].value) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: [
                                            {
                                                id: formFields[1].id,
                                                error: "Confirmation password doesn't match",
                                            },
                                        ],
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                this.querier.post(
                                    "/user/password/reset",
                                    {
                                        body: JSON.stringify({
                                            formFields: [formFields[0]],
                                            token: token,
                                            method: "token",
                                        }),
                                    },
                                    options.preAPIHook
                                ),
                            ];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.sendPasswordResetEmail = function (formFields, options) {
            return __awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                utils_1.validateForm(
                                    formFields,
                                    options.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                this.querier.post(
                                    "/user/password/reset/token",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    options.preAPIHook
                                ),
                            ];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.signUp = function (formFields, options) {
            return __awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                utils_1.validateForm(
                                    formFields,
                                    options.config.signInAndUpFeature.signUpForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                this.querier.post(
                                    "/signup",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    options.preAPIHook
                                ),
                            ];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.signIn = function (formFields, options) {
            return __awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                utils_1.validateForm(
                                    formFields,
                                    options.config.signInAndUpFeature.signInForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                this.querier.post(
                                    "/signin",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    options.preAPIHook
                                ),
                            ];
                        case 2:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.doesEmailExist = function (email, options) {
            return __awaiter(_this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.querier.get("/signup/email/exists", {}, { email: email }, options.preAPIHook),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.exists];
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
