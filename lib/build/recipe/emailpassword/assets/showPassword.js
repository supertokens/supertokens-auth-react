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
exports["default"] = ShowPasswordIcon;

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
function ShowPasswordIcon(_ref) {
    var color = _ref.color,
        showPassword = _ref.showPassword;

    if (showPassword === true) {
        return (0, _react.jsx)(
            "div",
            null,
            (0, _react.jsx)(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20.869",
                    height: "18.159",
                    viewBox: "0 0 20.869 18.159"
                },
                (0, _react.jsx)(
                    "g",
                    null,
                    (0, _react.jsx)(
                        "g",
                        null,
                        (0, _react.jsx)(
                            "g",
                            null,
                            (0, _react.jsx)(
                                "g",
                                null,
                                (0, _react.jsx)("path", {
                                    fill: color,
                                    d:
                                        "M31.75 101.089C29.028 96.97 25.374 94.7 21.459 94.7s-7.569 2.27-10.291 6.389a.871.871 0 0 0 0 .958c2.722 4.119 6.376 6.389 10.291 6.389s7.569-2.27 10.291-6.389a.87.87 0 0 0 0-.958zM21.459 106.7c-3.16 0-6.168-1.814-8.514-5.128 2.343-3.314 5.35-5.128 8.514-5.128s6.168 1.814 8.514 5.128c-2.346 3.312-5.349 5.128-8.514 5.128z",
                                    transform:
                                        "translate(-822 -420.048) translate(-54 149.088) translate(876 273) translate(-11.025 -94.7)"
                                })
                            )
                        )
                    ),
                    (0, _react.jsx)(
                        "g",
                        {
                            fill: color,
                            stroke: "#fff",
                            transform: "translate(-822 -420.048) translate(827.859 424.38)"
                        },
                        (0, _react.jsx)("circle", {
                            cx: "4.58",
                            cy: "4.58",
                            r: "4.58",
                            stroke: "none"
                        }),
                        (0, _react.jsx)("circle", {
                            cx: "4.58",
                            cy: "4.58",
                            r: "4.08",
                            fill: "none"
                        })
                    ),
                    (0, _react.jsx)("path", {
                        fill: "none",
                        stroke: "#707070",
                        "stroke-linecap": "round",
                        "stroke-width": "2.25px",
                        d: "M13.595 0L0 13.595",
                        transform: "translate(-822 -420.048) translate(825.5 421.639)"
                    }),
                    (0, _react.jsx)("path", {
                        fill: "none",
                        stroke: "#fff",
                        "stroke-linecap": "round",
                        d: "M15.861 0L0 15.861",
                        transform: "translate(-822 -420.048) translate(825.5 421.639)"
                    })
                )
            )
        );
    }

    return (0, _react.jsx)(
        "div",
        {
            style: {
                position: "relative",
                top: "2px"
            }
        },
        (0, _react.jsx)(
            "svg",
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20.869",
                height: "13.736",
                viewBox: "0 0 20.869 13.736"
            },
            (0, _react.jsx)(
                "g",
                null,
                (0, _react.jsx)(
                    "g",
                    null,
                    (0, _react.jsx)(
                        "g",
                        null,
                        (0, _react.jsx)(
                            "g",
                            null,
                            (0, _react.jsx)("path", {
                                fill: color,
                                d:
                                    "M31.75 101.089C29.028 96.97 25.374 94.7 21.459 94.7s-7.569 2.27-10.291 6.389a.871.871 0 0 0 0 .958c2.722 4.119 6.376 6.389 10.291 6.389s7.569-2.27 10.291-6.389a.87.87 0 0 0 0-.958zM21.459 106.7c-3.16 0-6.168-1.814-8.514-5.128 2.343-3.314 5.35-5.128 8.514-5.128s6.168 1.814 8.514 5.128c-2.346 3.312-5.349 5.128-8.514 5.128z",
                                transform:
                                    "translate(-822 -422.088) translate(-54 149.088) translate(876 273) translate(-11.025 -94.7)"
                            })
                        )
                    )
                ),
                (0, _react.jsx)(
                    "g",
                    {
                        fill: color,
                        stroke: "#fff",
                        transform: "translate(-822 -422.088) translate(827.859 424.38)"
                    },
                    (0, _react.jsx)("circle", {
                        cx: "4.58",
                        cy: "4.58",
                        r: "4.58",
                        stroke: "none"
                    }),
                    (0, _react.jsx)("circle", {
                        cx: "4.58",
                        cy: "4.58",
                        r: "4.08",
                        fill: "none"
                    })
                )
            )
        )
    );
}
