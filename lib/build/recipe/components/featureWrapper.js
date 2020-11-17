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
exports["default"] = FeatureWrapper;

var React = _interopRequireWildcard(require("react"));

var _emotion = _interopRequireDefault(require("react-shadow/emotion"));

var _constants = require("../../constants");

var _errorBoundary = _interopRequireDefault(require("./errorBoundary"));

var _core = require("@emotion/core");

var _styleContext = require("../emailpassword/styles/styleContext");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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
function FeatureWrapper(_ref) {
    var children = _ref.children,
        useShadowDom = _ref.useShadowDom;

    /*
     * Render.
     */
    return (0, _core.jsx)(
        _errorBoundary["default"],
        null,
        (0, _core.jsx)(
            WithOrWithoutShadowDom,
            {
                useShadowDom: useShadowDom
            },
            (0, _core.jsx)(
                React.Fragment,
                null,
                children,
                (0, _core.jsx)("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;500;700",
                    rel: "stylesheet",
                    type: "text/css"
                })
            )
        )
    );
}

function WithOrWithoutShadowDom(_ref2) {
    var children = _ref2.children,
        useShadowDom = _ref2.useShadowDom;

    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return (0, _core.jsx)(_styleContext.StyleConsumer, null, function(styles) {
            return (0, _core.jsx)(
                "div",
                {
                    css: styles.root,
                    id: _constants.ST_ROOT_ID
                },
                children
            );
        });
    } // Otherwise, use shadow dom.

    return (0, _core.jsx)(_styleContext.StyleConsumer, null, function(styles) {
        return (0, _core.jsx)(
            _emotion["default"].div,
            {
                css: styles.root,
                id: _constants.ST_ROOT_ID
            },
            children
        );
    });
}
