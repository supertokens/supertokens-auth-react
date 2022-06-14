"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var react_2 = require("react");
var spinnerIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
/*
 * Component.
 */
var ThirdPartySignInAndUpCallbackTheme = /** @class */ (function (_super) {
    tslib_1.__extends(ThirdPartySignInAndUpCallbackTheme, _super);
    function ThirdPartySignInAndUpCallbackTheme() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        /*
         * Methods.
         */
        _this.render = function () {
            var styles = _this.context;
            return react_1.jsx(
                "div",
                { "data-supertokens": "container", css: styles.container },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "row", css: styles.row },
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "spinner", css: styles.spinner },
                        react_1.jsx(spinnerIcon_1.default, { color: styles.palette.colors.primary })
                    )
                )
            );
        };
        return _this;
    }
    ThirdPartySignInAndUpCallbackTheme.contextType = styleContext_1.default;
    return ThirdPartySignInAndUpCallbackTheme;
})(react_2.PureComponent);
exports.SignInAndUpCallbackTheme = withOverride_1.withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
