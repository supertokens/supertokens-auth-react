"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WINDOW_UNDEFINED_ERROR = exports.SSR_ERROR = exports.INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR = exports.RESET_PASSWORD_INVALID_TOKEN_ERROR = exports.SOMETHING_WENT_WRONG_ERROR = exports.ST_ROOT_ID = exports.DEFAULT_WEBSITE_BASE_PATH = exports.DEFAULT_API_BASE_PATH = exports.RECIPE_ID_QUERY_PARAM = void 0;

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
 * Consts.
 */
var RECIPE_ID_QUERY_PARAM = "rid";
exports.RECIPE_ID_QUERY_PARAM = RECIPE_ID_QUERY_PARAM;
var DEFAULT_API_BASE_PATH = "/auth";
exports.DEFAULT_API_BASE_PATH = DEFAULT_API_BASE_PATH;
var DEFAULT_WEBSITE_BASE_PATH = "/auth";
exports.DEFAULT_WEBSITE_BASE_PATH = DEFAULT_WEBSITE_BASE_PATH;
var ST_ROOT_ID = "supertokens-root";
exports.ST_ROOT_ID = ST_ROOT_ID;
var SOMETHING_WENT_WRONG_ERROR = "Something went wrong. Please try again";
exports.SOMETHING_WENT_WRONG_ERROR = SOMETHING_WENT_WRONG_ERROR;
var RESET_PASSWORD_INVALID_TOKEN_ERROR = "Invalid password reset token";
exports.RESET_PASSWORD_INVALID_TOKEN_ERROR = RESET_PASSWORD_INVALID_TOKEN_ERROR;
var INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR = "Incorrect email and password combination";
exports.INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR = INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR;
var SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";
exports.SSR_ERROR = SSR_ERROR;
var WINDOW_UNDEFINED_ERROR =
    "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined.";
exports.WINDOW_UNDEFINED_ERROR = WINDOW_UNDEFINED_ERROR;
