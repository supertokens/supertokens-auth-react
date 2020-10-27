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
import RecipeModule from "../recipeModule";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./SignInAndUp";
import SignInAndUpTheme from "./SignInAndUpTheme";
import { AppInfo, CreateRecipeFunction } from "../../types";
/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    static instance?: EmailPassword;

    constructor(config: EmailPasswordConfig) {
        super({
            ...config,
            recipeId: "email-password",
            features: {
                "/": SignInAndUp
            }
        });
    }

    static init(config: EmailPasswordConfig): CreateRecipeFunction {
        return (appInfo: AppInfo): RecipeModule => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo
            });
            return EmailPassword.instance;
        };
    }

    static getInstanceOrThrowError(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            throw Error(`No instance of ${EmailPassword.constructor.name} found. Make sure to call the "init" method.`); // TODO Add relevant doc.
        }

        return EmailPassword.instance;
    }
}

export { SignInAndUp, SignInAndUpTheme };
