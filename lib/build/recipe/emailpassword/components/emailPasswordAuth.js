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
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
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
var React = __importStar(require("react"));
var react_1 = require("react");
var emailPassword_1 = __importDefault(require("../emailPassword"));
var sessionAuth_1 = __importDefault(require("../../session/sessionAuth"));
var emailVerificationAuth_1 = __importDefault(require("../../emailverification/emailVerificationAuth"));
var superTokens_1 = __importDefault(require("../../../superTokens"));
/*
 * Component.
 */
var EmailPasswordAuth = /** @class */ (function (_super) {
    __extends(EmailPasswordAuth, _super);
    function EmailPasswordAuth() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        /*
         * Render.
         */
        _this.render = function () {
            return React.createElement(
                sessionAuth_1.default,
                {
                    requireAuth: _this.props.requireAuth === undefined || _this.props.requireAuth,
                    recipeId: emailPassword_1.default.getInstanceOrThrow().recipeId,
                    history: _this.props.history,
                },
                React.createElement(
                    emailVerificationAuth_1.default,
                    { recipeId: emailPassword_1.default.getInstanceOrThrow().recipeId, history: _this.props.history },
                    _this.props.children
                )
            );
        };
        return _this;
    }
    return EmailPasswordAuth;
})(react_1.PureComponent);
function EmailPasswordAuthWrapper(_a) {
    var children = _a.children,
        requireAuth = _a.requireAuth;
    var reactRouterDom = superTokens_1.default.getInstanceOrThrow().getReactRouterDom();
    if (reactRouterDom === undefined) {
        return React.createElement(
            EmailPasswordAuth,
            { requireAuth: requireAuth, recipeId: emailPassword_1.default.getInstanceOrThrow().recipeId },
            children
        );
    }
    var Component = reactRouterDom.withRouter(EmailPasswordAuth);
    return React.createElement(
        Component,
        { requireAuth: requireAuth, recipeId: emailPassword_1.default.getInstanceOrThrow().recipeId },
        children
    );
}
exports.default = EmailPasswordAuthWrapper;
//# sourceMappingURL=emailPasswordAuth.js.map
