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
var _1 = tslib_1.__importDefault(require("."));
/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    tslib_1.__extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getButton = function () {
            if (_this.buttonComponent !== undefined) {
                if (typeof _this.buttonComponent === "function") {
                    return _this.buttonComponent();
                }
                return _this.buttonComponent;
            }
            return _this.getDefaultButton("Custom");
        };
        _this.getLogo = function () {
            return undefined;
        };
        _this.buttonComponent = config.buttonComponent;
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
        }
        return new Custom(config);
    };
    return Custom;
})(_1.default);
exports.default = Custom;
