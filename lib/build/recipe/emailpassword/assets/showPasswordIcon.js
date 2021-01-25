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

/** @jsx jsx */

/*
 * Component.
 */
function ShowPasswordIcon(_ref) {
    var primaryColor = _ref.primaryColor,
        secondaryColor = _ref.secondaryColor,
        showPassword = _ref.showPassword;

    if (showPassword === true) {
        return (0, _react.jsx)(
            "div",
            null,
            (0, _react.jsx)(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "18.391",
                    height: "16.276",
                    viewBox: "0 0 18.391 16.276"
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
                                    fill: primaryColor,
                                    d:
                                        "M29.289 100.33c-2.4-3.63-5.619-5.63-9.069-5.63s-6.67 2-9.069 5.63a.767.767 0 0 0 0 .845c2.4 3.63 5.619 5.63 9.069 5.63s6.67-2 9.069-5.63a.767.767 0 0 0 0-.845zm-9.069 4.944c-2.785 0-5.435-1.6-7.5-4.519 2.065-2.92 4.715-4.519 7.5-4.519s5.435 1.6 7.5 4.519c-2.064 2.92-4.711 4.519-7.5 4.519z",
                                    transform:
                                        "translate(-822 -420.048) translate(822 422.035) translate(-11.025 -94.7)"
                                })
                            )
                        )
                    ),
                    (0, _react.jsx)(
                        "g",
                        {
                            fill: primaryColor,
                            stroke: secondaryColor,
                            transform: "translate(-822 -420.048) translate(827.164 424.055)"
                        },
                        (0, _react.jsx)("circle", {
                            cx: "4.036",
                            cy: "4.036",
                            r: "4.036",
                            stroke: "none"
                        }),
                        (0, _react.jsx)("circle", {
                            cx: "4.036",
                            cy: "4.036",
                            r: "3.536",
                            fill: "none"
                        })
                    ),
                    (0, _react.jsx)("path", {
                        fill: "none",
                        stroke: "#707070",
                        "stroke-linecap": "round",
                        "stroke-width": "2.25px",
                        d: "M11.981 0L0 11.981",
                        transform: "translate(-822 -420.048) translate(825.084 421.639)"
                    }),
                    (0, _react.jsx)("path", {
                        fill: "none",
                        stroke: secondaryColor,
                        "stroke-linecap": "round",
                        d: "M13.978 0L0 13.978",
                        transform: "translate(-822 -420.048) translate(825.084 421.639)"
                    })
                )
            )
        );
    }

    return (0, _react.jsx)(
        "div",
        null,
        (0, _react.jsx)(
            "svg",
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "18.281",
                height: "12.033",
                viewBox: "0 0 18.281 12.033"
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
                                fill: primaryColor,
                                d:
                                    "M29.18 100.3c-2.384-3.608-5.586-5.6-9.015-5.6s-6.63 1.989-9.015 5.6a.763.763 0 0 0 0 .84c2.384 3.608 5.586 5.6 9.015 5.6s6.63-1.989 9.015-5.6a.763.763 0 0 0 0-.84zm-9.015 4.914c-2.769 0-5.4-1.589-7.459-4.492 2.052-2.9 4.686-4.492 7.459-4.492s5.4 1.589 7.459 4.492c-2.056 2.899-4.686 4.489-7.458 4.489z",
                                transform: "translate(-822 -422.088) translate(822 422.088) translate(-11.025 -94.7)"
                            })
                        )
                    )
                ),
                (0, _react.jsx)(
                    "g",
                    {
                        fill: primaryColor,
                        stroke: secondaryColor,
                        transform: "translate(-822 -422.088) translate(827.133 424.096)"
                    },
                    (0, _react.jsx)("circle", {
                        cx: "4.012",
                        cy: "4.012",
                        r: "4.012",
                        stroke: "none"
                    }),
                    (0, _react.jsx)("circle", {
                        cx: "4.012",
                        cy: "4.012",
                        r: "3.512",
                        fill: "none"
                    })
                )
            )
        )
    );
}
