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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
/*
 * Component.
 */
function SpinnerIcon(_a) {
    var color = _a.color;
    return react_1.jsx(
        "svg",
        { version: "1.1", viewBox: "25 25 50 50" },
        react_1.jsx(
            "circle",
            {
                cx: "50",
                cy: "50",
                r: "20",
                fill: "none",
                strokeWidth: "5",
                stroke: color,
                strokeLinecap: "round",
                strokeDashoffset: "0",
                strokeDasharray: "100, 200",
            },
            react_1.jsx("animateTransform", {
                attributeName: "transform",
                attributeType: "XML",
                type: "rotate",
                from: "0 50 50",
                to: "360 50 50",
                dur: "4s",
                repeatCount: "indefinite",
            }),
            react_1.jsx("animate", {
                attributeName: "stroke-dashoffset",
                values: "0;-30;-124",
                dur: "2s",
                repeatCount: "indefinite",
            }),
            react_1.jsx("animate", {
                attributeName: "stroke-dasharray",
                values: "0,200;110,200;110,200",
                dur: "2s",
                repeatCount: "indefinite",
            })
        )
    );
}
exports.default = SpinnerIcon;
//# sourceMappingURL=spinnerIcon.js.map
