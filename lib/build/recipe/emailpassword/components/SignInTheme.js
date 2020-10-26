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
exports["default"] = SignInTheme;

var React = _interopRequireWildcard(require("react"));

var _styles = require("../../../styles/styles");

var _core = require("@emotion/core");

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
function SignInTheme(props) {
    return (0, _core.jsx)(
        "div",
        {
            css: _styles.defaultStyles.container
        },
        (0, _core.jsx)(
            "div",
            {
                css: _styles.defaultStyles.row
            },
            (0, _core.jsx)(
                "div",
                {
                    css: styles.header
                },
                (0, _core.jsx)(
                    "div",
                    {
                        css: styles.headerTitle
                    },
                    "Sign In"
                ),
                (0, _core.jsx)(
                    "div",
                    {
                        css: styles.headerSubtitle
                    },
                    (0, _core.jsx)("div", null, "Not registered yet?"),
                    (0, _core.jsx)(
                        "a",
                        {
                            onClick: props.signUpClicked,
                            css: styles.signUpLink
                        },
                        "Sign up"
                    )
                )
            ),
            (0, _core.jsx)("div", {
                css: _styles.defaultStyles.divider
            }),
            (0, _core.jsx)(
                "form",
                null,
                props.formFields.map(function(field) {
                    return (0, _core.jsx)(
                        "div",
                        {
                            key: field.id
                        },
                        (0, _core.jsx)("label", null, field.label),
                        (0, _core.jsx)("input", {
                            name: field.id,
                            placeholder: field.placeholder
                        })
                    );
                })
            ),
            (0, _core.jsx)("button", null, " Sign In "),
            (0, _core.jsx)("div", null, "Forgot password?")
        )
    );
}

var styles = {
    header: {
        height: "141px"
    },
    headerTitle: {
        paddingTop: "49px",
        fontSize: _styles.palette.fonts.size[1],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 700,
        fontFamily: _styles.palette.fonts.primary,
        color: _styles.palette.colors.primary
    },
    headerSubtitle: {
        fontSize: _styles.palette.fonts.size[0],
        fontWeight: 400,
        color: _styles.palette.colors.secondary,
        fontFamily: _styles.palette.fonts.primary
    },
    signUpLink: {
        color: "blue"
    }
};
