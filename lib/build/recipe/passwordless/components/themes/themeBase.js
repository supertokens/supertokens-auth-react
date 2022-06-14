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
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_2 = require("react");
/*
 * Component
 */
exports.ThemeBase = function (_a) {
    var children = _a.children,
        loadDefaultFont = _a.loadDefaultFont;
    return react_1.default.createElement(
        react_2.Fragment,
        null,
        children,
        loadDefaultFont &&
            react_1.default.createElement("link", {
                href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                rel: "stylesheet",
                type: "text/css",
            })
    );
};
