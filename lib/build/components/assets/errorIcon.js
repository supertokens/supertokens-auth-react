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
/*
 * Component.
 */
function ErrorIcon(_a) {
    var color = _a.color;
    return (0, jsx_runtime_1.jsx)(
        "svg",
        __assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "17", height: "15", viewBox: "0 0 17 15" },
            {
                children: (0, jsx_runtime_1.jsxs)("g", {
                    children: [
                        (0, jsx_runtime_1.jsx)(
                            "g",
                            __assign(
                                { fill: color },
                                {
                                    children: (0, jsx_runtime_1.jsx)("path", {
                                        d: "M13.568 14.75H3.432c-.63 0-1.195-.325-1.512-.869-.317-.544-.32-1.196-.01-1.744l5.067-8.943c.315-.556.884-.887 1.523-.887.639 0 1.208.331 1.523.887l5.067 8.943c.31.548.307 1.2-.01 1.744s-.882.869-1.512.869z",
                                        transform: "translate(-824.894 -352.829) translate(824.894 352.829)",
                                    }),
                                }
                            )
                        ),
                        (0, jsx_runtime_1.jsx)(
                            "text",
                            __assign(
                                {
                                    fill: "#fff",
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.829) translate(832.014 365.198)",
                                },
                                {
                                    children: (0, jsx_runtime_1.jsx)(
                                        "tspan",
                                        __assign({ x: "0", y: "0" }, { children: "!" })
                                    ),
                                }
                            )
                        ),
                    ],
                }),
            }
        )
    );
}
exports.default = ErrorIcon;
