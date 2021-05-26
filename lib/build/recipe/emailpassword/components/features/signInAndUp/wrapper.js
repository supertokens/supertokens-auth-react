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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importDefault(require("react"));
var _1 = __importDefault(require("."));
var recipe_1 = __importDefault(require("../../../recipe"));
/*
 * Used for embedding in page.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SignInAndUp() {
    return react_1.default.createElement(_1.default, { recipeId: recipe_1.default.getInstanceOrThrow().config.recipeId, recipeImplemetation: recipe_1.default.getInstanceOrThrow().recipeImpl });
}
exports.default = SignInAndUp;
//# sourceMappingURL=wrapper.js.map