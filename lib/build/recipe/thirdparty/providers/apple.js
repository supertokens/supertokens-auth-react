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
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var _1 = __importDefault(require("."));
var utils_1 = require("../../../utils");
/*
 * Class.
 */
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    /*
     * Constructor.
     */
    function Apple(config) {
        var _this =
            _super.call(this, {
                id: "apple",
                name: "Apple",
                clientId: config === null || config === void 0 ? void 0 : config.clientId,
                getRedirectURL: config === null || config === void 0 ? void 0 : config.getRedirectURL,
            }) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                return _this.buttonComponent;
            }
            return _this.getDefaultButton();
        };
        _this.getLogo = function () {
            return (0, jsx_runtime_1.jsx)(
                "svg",
                __assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15.614",
                        height: "18",
                        viewBox: "0 0 15.614 18.737",
                    },
                    {
                        children: (0, jsx_runtime_1.jsxs)(
                            "g",
                            __assign(
                                {
                                    id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701",
                                    transform: "translate(-2)",
                                },
                                {
                                    children: [
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91415",
                                            d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z",
                                            style: { fill: "#000" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#000" },
                                            transform: "translate(-2.193)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        (0, jsx_runtime_1.jsx)("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#000" },
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        if (config === undefined) {
            return _this;
        }
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Apple.init = function (config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    };
    /*
     * Tests methods.
     */
    Apple.reset = function () {
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Apple.instance = undefined;
        return;
    };
    return Apple;
})(_1.default);
exports.default = Apple;
