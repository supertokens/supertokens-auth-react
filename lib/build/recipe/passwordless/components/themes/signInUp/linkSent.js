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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var constants_1 = require("../../../../../constants");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var arrowLeftIcon_1 = __importDefault(require("../../../../../components/assets/arrowLeftIcon"));
var emailLargeIcon_1 = __importDefault(require("../../../../../components/assets/emailLargeIcon"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var resendButton_1 = require("./resendButton");
var smsLargeIcon_1 = __importDefault(require("../../../../../components/assets/smsLargeIcon"));
/*
 * Component.
 */
var PasswordlessLinkSent = /** @class */ (function (_super) {
    __extends(PasswordlessLinkSent, _super);
    function PasswordlessLinkSent(props) {
        var _this = _super.call(this, props) || this;
        _this.resendEmail = function () {
            return __awaiter(_this, void 0, void 0, function () {
                var response, e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                this.props.recipeImplementation.resendCode({
                                    deviceId: this.props.loginAttemptInfo.deviceId,
                                    preAuthSessionId: this.props.loginAttemptInfo.preAuthSessionId,
                                    config: this.props.config,
                                    userContext: {},
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                this.setState(function () {
                                    return {
                                        status: "LINK_RESENT",
                                        resendNotifTimeout: setTimeout(function () {
                                            _this.setState(function (os) {
                                                return os.status === "LINK_RESENT"
                                                    ? __assign(__assign({}, os), { status: "READY" })
                                                    : os;
                                            });
                                        }, 2000),
                                    };
                                });
                            } else {
                                this.setState({
                                    status: "ERROR",
                                });
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            this.setState({
                                status: "ERROR",
                            });
                            return [3 /*break*/, 3];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.state = {
            status: props.error !== undefined ? "ERROR" : "READY",
        };
        return _this;
    }
    PasswordlessLinkSent.prototype.componentWillUnmount = function () {
        if (this.state.resendNotifTimeout) {
            clearTimeout(this.state.resendNotifTimeout);
        }
    };
    PasswordlessLinkSent.prototype.render = function () {
        var _this = this;
        var styles = this.context;
        var status = this.state.status;
        var resendActive = status === "LINK_RESENT";
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
                        this.props.error === undefined ? constants_1.SOMETHING_WENT_WRONG_ERROR : this.props.error
                    ),
                resendActive &&
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "generalSuccess", css: styles.generalSuccess },
                        "Link resent"
                    ),
                react_1.jsx(
                    "div",
                    { "data-supertokens": "sendCodeIcon", css: styles.sendCodeIcon },
                    this.props.loginAttemptInfo.contactMethod === "EMAIL"
                        ? react_1.jsx(emailLargeIcon_1.default, null)
                        : react_1.jsx(smsLargeIcon_1.default, null)
                ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    "Link sent!"
                ),
                react_1.jsx(
                    "div",
                    { "data-supertokens": "primaryText sendCodeText", css: [styles.primaryText, styles.sendCodeText] },
                    "We sent a link to",
                    this.props.loginAttemptInfo.contactMethod === "EMAIL" ? " " : " your phone number ",
                    react_1.jsx("strong", null, this.props.loginAttemptInfo.contactInfo),
                    this.props.loginAttemptInfo.contactMethod === "EMAIL" ? " Click the link to login or sign up" : ""
                ),
                react_1.jsx(resendButton_1.ResendButton, {
                    loginAttemptInfo: this.props.loginAttemptInfo,
                    resendEmailOrSMSGapInSeconds: this.props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                    target: this.props.loginAttemptInfo.contactMethod === "EMAIL" ? "Email" : "SMS",
                    onClick: this.resendEmail,
                }),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                        css: [styles.secondaryText, styles.secondaryLinkWithLeftArrow],
                        onClick: function () {
                            return _this.props.recipeImplementation.clearLoginAttemptInfo();
                        },
                    },
                    react_1.jsx(arrowLeftIcon_1.default, { color: styles.palette.colors.textPrimary }),
                    " Change",
                    " ",
                    this.props.loginAttemptInfo.contactMethod === "EMAIL" ? "email" : "phone number"
                )
            )
        );
    };
    PasswordlessLinkSent.contextType = styleContext_1.default;
    return PasswordlessLinkSent;
})(react_2.PureComponent);
exports.LinkSent = withOverride_1.withOverride("PasswordlessLinkSent", PasswordlessLinkSent);
