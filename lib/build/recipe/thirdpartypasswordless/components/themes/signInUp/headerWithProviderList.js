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
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var header_1 = require("./header");
var signInAndUp_1 = __importDefault(require("../../../../thirdparty/components/features/signInAndUp"));
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
exports.HeaderWithProviderList = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    if (props.thirdPartyRecipe === undefined) {
        throw new Error("HeaderWithProviderList loaded without thirdPartyRecipe");
    }
    return react_1.jsx(
        React.Fragment,
        null,
        react_1.jsx(header_1.Header, null),
        react_1.jsx(
            signInAndUp_1.default,
            { recipe: props.thirdPartyRecipe, history: history, isEmbedded: true },
            react_1.jsx(
                providersForm_1.ProvidersForm,
                // Seed props. Real props will be given by parent feature.
                __assign({}, {})
            )
        ),
        react_1.jsx(
            "div",
            { "data-supertokens": "thirdPartyPasswordlessDivider", css: styles.thirdPartyPasswordlessDivider },
            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "thirdPartyPasswordlessDividerText",
                    css: styles.thirdPartyPasswordlessDividerText,
                },
                "or"
            ),
            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
        )
    );
};
