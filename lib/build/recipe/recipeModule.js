"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
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

/*
 * Class.
 */
var RecipeModule =
    /*
     * Instance attributes.
     */

    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;

        _classCallCheck(this, RecipeModule);

        this.getRecipeId = function() {
            return _this.recipeId;
        };

        this.getAppInfo = function() {
            return _this.appInfo;
        };

        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
    };
/*
 * Instance Methods.
 */
exports["default"] = RecipeModule;
