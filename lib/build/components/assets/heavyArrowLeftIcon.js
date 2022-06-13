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
function HeavyArrowLeftIcon(_a) {
    var color = _a.color;
    return react_1.jsx(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "15.651", height: "13", viewBox: "0 0 15.651 13" },
        react_1.jsx("path", {
            fill: color,
            d: "m14.771 7.727.024-.005H4.323l3.292 3.3a.865.865 0 0 1 0 1.216l-.515.512a.857.857 0 0 1-1.21 0L.25 7.107a.863.863 0 0 1 0-1.214L5.893.25A.858.858 0 0 1 7.1.25l.512.513a.848.848 0 0 1 .25.6.822.822 0 0 1-.25.593L4.286 5.278h10.5a.887.887 0 0 1 .868.878v.725a.87.87 0 0 1-.883.846z",
        })
    );
}
exports.default = HeavyArrowLeftIcon;
