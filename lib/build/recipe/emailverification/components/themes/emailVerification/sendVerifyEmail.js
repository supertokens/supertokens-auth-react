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
/*
 * Imports.
 */
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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var constants_1 = require("../../../../../constants");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var arrowRightIcon_1 = __importDefault(require("../../../../../components/assets/arrowRightIcon"));
var emailLargeIcon_1 = __importDefault(require("../../../../../components/assets/emailLargeIcon"));
/*
 * Component.
 */
var SendVerifyEmail = /** @class */ (function (_super) {
    __extends(SendVerifyEmail, _super);
    /*
     * Constructor.
     */
    function SendVerifyEmail(props) {
        var _this = _super.call(this, props) || this;
        /*
         * Methods.
         */
        _this.onSuccess = function () {
            _this.setState(function () {
                return {
                    status: "SUCCESS",
                };
            });
            _this.props.onSuccess();
        };
        _this.sendEmail = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var _a, sendVerifyEmailAPI, onEmailAlreadyVerified, response, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            (_a = this.props),
                                (sendVerifyEmailAPI = _a.sendVerifyEmailAPI),
                                (onEmailAlreadyVerified = _a.onEmailAlreadyVerified);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, sendVerifyEmailAPI()];
                        case 2:
                            response = _b.sent();
                            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                                return [2 /*return*/, onEmailAlreadyVerified()];
                            }
                            if (response.status === "OK") {
                                this.setState({
                                    status: "SUCCESS",
                                });
                                return [2 /*return*/];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            this.setState({
                                status: "ERROR",
                            });
                            return [3 /*break*/, 4];
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.state = {
            status: "READY",
        };
        return _this;
    }
    /*
     * Render.
     */
    SendVerifyEmail.prototype.render = function () {
        var styles = this.context;
        var signOut = this.props.signOut;
        var status = this.state.status;
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                status === "ERROR" &&
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "generalError", css: styles.generalError },
                        constants_1.SOMETHING_WENT_WRONG_ERROR
                    ),
                status === "SUCCESS" &&
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "generalSuccess", css: styles.generalSuccess },
                        "Email resent"
                    ),
                react_1.jsx(
                    "div",
                    { "data-supertokens": "sendVerifyEmailIcon", css: styles.sendVerifyEmailIcon },
                    react_1.jsx(emailLargeIcon_1.default, null)
                ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    "Verify your email address"
                ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "primaryText sendVerifyEmailText",
                        css: [styles.primaryText, styles.sendVerifyEmailText],
                    },
                    react_1.jsx("strong", null, "Please click on the link"),
                    " in the email we just sent you to confirm your email address."
                ),
                status !== "SUCCESS" &&
                    react_1.jsx(
                        "div",
                        {
                            "data-supertokens": "link sendVerifyEmailResend",
                            css: [styles.link, styles.sendVerifyEmailResend],
                            onClick: this.sendEmail,
                        },
                        "Resend Email"
                    ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithArrow",
                        css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                        onClick: function () {
                            return signOut();
                        },
                    },
                    "Logout ",
                    react_1.jsx(arrowRightIcon_1.default, { color: styles.palette.colors.textPrimary })
                )
            )
        );
    };
    SendVerifyEmail.contextType = styleContext_1.default;
    return SendVerifyEmail;
})(react_2.PureComponent);
exports.default = SendVerifyEmail;
//# sourceMappingURL=sendVerifyEmail.js.map
