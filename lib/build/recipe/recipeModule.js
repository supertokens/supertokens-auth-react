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
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var httpRequest_1 = __importDefault(require("../httpRequest"));
var utils_1 = require("../utils");
/*
 * Class.
 */
var RecipeModule = /** @class */ (function() {
    /*
     * Constructor.
     */
    function RecipeModule(config) {
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new httpRequest_1.default(this);
        this.hooks = utils_1.normalisedRecipeModuleHooks(config);
    }
    return RecipeModule;
})();
exports.default = RecipeModule;
