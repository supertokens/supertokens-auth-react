"use strict";
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
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var recipeModule_1 = require("../recipeModule");
/*
 * Class.
 */
var EmailPassword = /** @class */ (function(_super) {
    __extends(EmailPassword, _super);
    function EmailPassword(config) {
        return _super.call(this, __assign({}, config, { recipeId: "email-password", routes: [""] })) || this;
    }
    EmailPassword.init = function(config) {
        return new EmailPassword(config);
    };
    EmailPassword.getInstanceIfDefined = function() {
        if (EmailPassword.instance === undefined) {
            throw Error(
                "No instance of " + EmailPassword.constructor.name + ' found. Make sure to call the "init" method.'
            ); // TODO Add relevant doc.
        }
        return EmailPassword.instance;
    };
    return EmailPassword;
})(recipeModule_1.default);
exports.default = EmailPassword;
