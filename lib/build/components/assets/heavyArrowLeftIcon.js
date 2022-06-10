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
        { xmlns: "http://www.w3.org/2000/svg", width: "15.743", height: "13.076", viewBox: "0 0 15.743 13.076" },
        react_1.jsx("path", {
            fill: color,
            d: "m14.858 7.773.025-.005H4.348l3.312 3.318a.87.87 0 0 1 0 1.223l-.515.516a.862.862 0 0 1-1.217 0L.251 7.149a.868.868 0 0 1 0-1.221L5.928.251a.863.863 0 0 1 1.217 0l.515.516a.853.853 0 0 1 .251.608.827.827 0 0 1-.251.6L4.311 5.309H14.87a.892.892 0 0 1 .873.883v.729a.875.875 0 0 1-.885.852z",
        })
    );
}
exports.default = HeavyArrowLeftIcon;
