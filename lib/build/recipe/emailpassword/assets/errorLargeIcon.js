"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = ErrorLargeIcon;

var _react = require("@emotion/react");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

/** @jsx jsx */

/*
 * Component.
 */
function ErrorLargeIcon(_ref) {
    var color = _ref.color;
    return (0, _react.jsx)(
        "svg",
        {
            xmlns: "http://www.w3.org/2000/svg",
            width: "33",
            height: "30",
            viewBox: "0 0 33 30"
        },
        (0, _react.jsx)(
            "g",
            null,
            (0, _react.jsx)(
                "g",
                {
                    fill: color
                },
                (0, _react.jsx)("path", {
                    d:
                        "M29.617 29.75H3.383c-.626 0-1.189-.321-1.507-.86-.318-.537-.328-1.186-.027-1.733l13.118-23.85c.312-.568.885-.907 1.533-.907.648 0 1.221.339 1.533.907l13.118 23.85c.301.547.291 1.196-.027 1.734s-.881.859-1.507.859z",
                    transform: "translate(-824.894 -352.483) translate(824.894 352.483)"
                })
            ),
            (0, _react.jsx)(
                "text",
                {
                    fill: "#fff",
                    "font-family": "Rubik-Bold, Rubik",
                    "font-size": "18px",
                    fontWeight: "700",
                    transform: "translate(-824.894 -352.483) translate(838.997 377.437)"
                },
                (0, _react.jsx)(
                    "tspan",
                    {
                        x: "0",
                        y: "0"
                    },
                    "!"
                )
            )
        )
    );
}
