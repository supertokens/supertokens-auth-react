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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
const module_1 = require("../module");
/*
 * Class.
 */
class EmailPassword extends module_1.default {
    constructor(config) {
        super(Object.assign({}, config, { recipeId: EmailPassword.recipeId, routes: EmailPassword.routes }));
    }
    static init(config) {
        return new EmailPassword(config);
    }
    static getInstanceIfDefined() {
        if (EmailPassword.instance === undefined)
            throw Error(`No instance of ${EmailPassword.constructor.name} found. Make sure to call "init" method.`); // TODO Add relevant doc.
        return EmailPassword.instance;
    }
}
EmailPassword.recipeId = "email-password";
EmailPassword.routes = ["/auth"];
exports.default = EmailPassword;
