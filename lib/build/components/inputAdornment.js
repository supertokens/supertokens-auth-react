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
exports["default"] = InputAdornment;

var _core = require("@emotion/core");

var React = _interopRequireWildcard(require("react"));

var _styles = require("../styles/styles");

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
var Checked = function Checked(props) {
    return (0, _core.jsx)(
        "svg",
        props,
        (0, _core.jsx)("path", {
            fill: "#ff9b33",
            d:
                "M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM8.166 15.137l-4.4-4.4L5.23 9.266 8.166 12.2l6.6-6.6 1.468 1.468z",
            "'data-name'": "checked (3)"
        })
    );
};

Checked.defaultProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
};

var Error = function Error(props) {
    return (0, _core.jsx)(
        "svg",
        props,
        (0, _core.jsx)(
            "g",
            {
                fill: "#ff1717"
            },
            (0, _core.jsx)("path", {
                d:
                    "M15.683 17.75H3.317c-.619 0-1.18-.316-1.499-.846a1.734 1.734 0 0 1-.049-1.72L7.952 3.467A1.725 1.725 0 0 1 9.5 2.534c.66 0 1.24.349 1.548.933l6.183 11.715c.289.547.27 1.19-.05 1.72-.319.53-.88.847-1.498.847z"
            }),
            (0, _core.jsx)("path", {
                fill: "#ff6a6a",
                d:
                    "M9.5 2.785c-.566 0-1.062.299-1.327.8L1.99 15.3a1.493 1.493 0 0 0 .042 1.475 1.49 1.49 0 0 0 1.285.725h12.366c.53 0 1.01-.271 1.285-.725a1.49 1.49 0 0 0 .042-1.475L10.827 3.585c-.265-.501-.76-.8-1.327-.8m0-.5c.697 0 1.394.355 1.769 1.066l6.183 11.715c.703 1.332-.263 2.934-1.769 2.934H3.317c-1.506 0-2.472-1.602-1.769-2.934L7.731 3.351A1.98 1.98 0 0 1 9.5 2.285z"
            })
        ),
        (0, _core.jsx)(
            "text",
            {
                fill: "#fff",
                fontFamily: "Rubik-Bold, Rubik",
                fontSize: "12",
                fontWeight: "700",
                transform: "translate(7.696 14.715)"
            },
            (0, _core.jsx)(
                "tspan",
                {
                    x: "0",
                    y: "0"
                },
                "!"
            )
        )
    );
};

Error.defaultProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "19",
    height: "18",
    viewBox: "0 0 19 18"
};

/*
 * Component.
 */
function InputAdornment(props) {
    /*
     * Props.
     */
    var type = props.type,
        style = props.style;
    /*
     * Render.
     */

    return (0, _core.jsx)(
        "div",
        {
            css: [_styles.defaultStyles.inputAdornment, style]
        },
        type === "success" &&
            (0, _core.jsx)("img", {
                src: Checked,
                alt: ""
            }),
        type === "error" &&
            (0, _core.jsx)("img", {
                src: Error,
                alt: ""
            })
    );
}
