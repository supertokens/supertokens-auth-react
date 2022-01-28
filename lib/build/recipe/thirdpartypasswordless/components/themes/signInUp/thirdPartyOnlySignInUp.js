"use strict";
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
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var themeBase_1 = require("../themeBase");
var header_1 = require("./header");
var signInAndUp_1 = __importDefault(require("../../../../thirdparty/components/features/signInAndUp"));
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var ThirdPartyOnlySignInUp = function (_a) {
    var thirdPartyRecipe = _a.thirdPartyRecipe,
        history = _a.history;
    var styles = React.useContext(styleContext_1.default);
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(header_1.Header, null),
            react_1.jsx(
                signInAndUp_1.default,
                { recipe: thirdPartyRecipe, history: history, isEmbedded: true },
                react_1.jsx(
                    providersForm_1.ProvidersForm,
                    // Seed props. Real props will be given by parent feature.
                    __assign({}, {})
                )
            )
        )
    );
};
exports.ThirdPartyOnlySignInUpWrapper = function (_a) {
    var thirdPartyRecipe = _a.thirdPartyRecipe,
        history = _a.history,
        config = _a.config;
    var hasFont = styles_1.hasFontDefined(config.rootStyle);
    // We can just use the providerAndEmailOrPhoneFormStyle because in this case we won't ever change screens
    return react_1.jsx(
        themeBase_1.ThemeBase,
        { loadDefaultFont: !hasFont },
        react_1.jsx(
            styleContext_1.StyleProvider,
            {
                rawPalette: config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: config.signInUpFeature.providerAndEmailOrPhoneFormStyle,
                rootStyleFromInit: config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            react_1.jsx(ThirdPartyOnlySignInUp, {
                history: history,
                config: config,
                thirdPartyRecipe: thirdPartyRecipe,
            })
        )
    );
};
