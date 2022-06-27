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
function ArrowRightIcon(_a) {
    var color = _a.color;
    return (0, jsx_runtime_1.jsx)(
        "svg",
        __assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "11.272", height: "9.49", viewBox: "0 0 11.272 9.49" },
            {
                children: (0, jsx_runtime_1.jsx)("path", {
                    fill: color,
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 5.2h.016-7.041L5.12 7.41a.581.581 0 0 1 0 .817l-.344.345a.576.576 0 0 1-.813 0L.168 4.778a.58.58 0 0 1 0-.816L3.962.168a.577.577 0 0 1 .813 0l.345.344a.57.57 0 0 1 .168.407.553.553 0 0 1-.168.4l-2.239 2.23h7.058a.6.6 0 0 1 .584.59v.487a.585.585 0 0 1-.592.574z",
                    transform: "translate(.375 .375)",
                }),
            }
        )
    );
}
exports.default = ArrowRightIcon;
