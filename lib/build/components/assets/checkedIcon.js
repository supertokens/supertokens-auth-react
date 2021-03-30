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
function CheckedIcon(_a) {
    var color = _a.color;
    return react_1.jsx(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "14.862", height: "12.033", viewBox: "0 0 14.862 12.033" },
        react_1.jsx("path", {
            fill: color,
            d: "M12.629 49L5.06 56.572l-2.829-2.829L0 55.977l5.057 5.057.654-.651 9.152-9.152z",
            transform: "translate(0 -49)",
        })
    );
}
exports.default = CheckedIcon;
//# sourceMappingURL=checkedIcon.js.map
