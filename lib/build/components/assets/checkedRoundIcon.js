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
function CheckedRoundIcon(_a) {
    var color = _a.color;
    return react_1.jsx(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "33", height: "33", viewBox: "0 0 33 33" },
        react_1.jsx(
            "g",
            { fill: color, stroke: color },
            react_1.jsx("path", {
                d:
                    "M6.715 15.334a1.135 1.135 0 0 1 1.605-1.605l4.558 4.558 9.573-9.573a1.135 1.135 0 0 1 1.605 1.605L13.748 20.627a1.231 1.231 0 0 1-1.741 0z",
                transform: "translate(-.5 -.5) translate(1.242 1.703)",
            }),
            react_1.jsx("path", {
                fillRule: "evenodd",
                d:
                    "M17 1a16 16 0 1 0 16 16A16 16 0 0 0 17 1zM3.462 17A13.538 13.538 0 1 1 17 30.538 13.538 13.538 0 0 1 3.462 17z",
                transform: "translate(-.5 -.5)",
            })
        )
    );
}
exports.default = CheckedRoundIcon;
//# sourceMappingURL=checkedRoundIcon.js.map
