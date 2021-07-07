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
var recipe_1 = __importDefault(require("./recipe"));
var sessionAuth_1 = __importDefault(require("../session/sessionAuth"));
var emailVerificationAuth_1 = __importDefault(require("../emailverification/emailVerificationAuth"));
var superTokens_1 = __importDefault(require("../../superTokens"));
var ThirdPartyAuth = /** @class */ (function (_super) {
    __extends(ThirdPartyAuth, _super);
    function ThirdPartyAuth() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        /*
         * Render.
         */
        _this.render = function () {
            var emailVerification = React.createElement(
                emailVerificationAuth_1.default,
                { recipe: _this.props.recipe.emailVerification, history: _this.props.history },
                _this.props.children
            );
            if (_this.props.requireAuth === false) {
                return React.createElement(
                    sessionAuth_1.default,
                    { onSessionExpired: _this.props.onSessionExpired },
                    emailVerification
                );
            }
            return React.createElement(
                sessionAuth_1.default,
                {
                    redirectToLogin: function () {
                        recipe_1.default
                            .getInstanceOrThrow()
                            .redirectToAuthWithRedirectToPath(undefined, _this.props.history);
                    },
                    requireAuth: _this.props.requireAuth === undefined || _this.props.requireAuth,
                    onSessionExpired: _this.props.onSessionExpired,
                },
                emailVerification
            );
        };
        return _this;
    }
    return ThirdPartyAuth;
})(react_1.PureComponent);
function ThirdPartyAuthWrapper(_a) {
    var children = _a.children,
        requireAuth = _a.requireAuth,
        onSessionExpired = _a.onSessionExpired;
    var reactRouterDom = superTokens_1.default.getInstanceOrThrow().getReactRouterDom();
    var Component = react_1.useRef(
        reactRouterDom === undefined ? ThirdPartyAuth : reactRouterDom.withRouter(ThirdPartyAuth)
    );
    return React.createElement(
        Component.current,
        { onSessionExpired: onSessionExpired, requireAuth: requireAuth, recipe: recipe_1.default.getInstanceOrThrow() },
        children
    );
}
exports.default = ThirdPartyAuthWrapper;
//# sourceMappingURL=thirdpartyAuth.js.map
