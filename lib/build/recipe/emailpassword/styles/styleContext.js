"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StyleProvider = StyleProvider;
exports.StyleConsumer = void 0;

var _react = _interopRequireDefault(require("react"));

var _emailPassword = _interopRequireDefault(require("../emailPassword"));

var _styles = require("./styles");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
var StyleContext = /*#__PURE__*/ _react["default"].createContext({
    palette: _styles.defaultPalette,
    defaultStyles: (0, _styles.getDefaultStyles)(_styles.defaultPalette)
});

function StyleProvider(_ref) {
    var children = _ref.children;

    var palette = _emailPassword["default"].getInstanceOrThrow().getConfig().palette;

    return /*#__PURE__*/ _react["default"].createElement(
        StyleContext.Provider,
        {
            value: {
                palette: palette,
                defaultStyles: (0, _styles.getDefaultStyles)(palette)
            }
        },
        children
    );
}

var StyleConsumer = StyleContext.Consumer;
exports.StyleConsumer = StyleConsumer;
