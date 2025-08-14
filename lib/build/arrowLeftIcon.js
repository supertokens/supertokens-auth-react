"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");

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
function ArrowLeftIcon(_a) {
    var color = _a.color;
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "6", height: "8", viewBox: "0 0 6 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    d: "M0.372871 3.24407C-0.0875903 3.64284 -0.0875899 4.35716 0.372872 4.75593L3.84535 7.76318C4.49299 8.32406 5.5 7.864 5.5 7.00725L5.5 0.992749C5.5 0.135997 4.49299 -0.324056 3.84535 0.23682L0.372871 3.24407Z",
                    fill: "".concat(color),
                }),
            }
        )
    );
}

exports.ArrowLeftIcon = ArrowLeftIcon;
