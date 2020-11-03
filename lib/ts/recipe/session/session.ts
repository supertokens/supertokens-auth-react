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
import { CreateRecipeFunction, NormalisedAppInfo, RouteToFeatureComponentMap } from "../../types";
import { SessionUserInput, NormalisedSessionConfig, SessionConfig } from "./types";
import { isTest } from "../../utils";
import HttpRequest from "../../httpRequest";
import { normaliseSessionConfigOrThrow } from "./utils";

/*
 * Class.
 */
export default class Session extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: Session;

    /*
     * Instance Attributes.
     */
    private config: NormalisedSessionConfig;

    private httpRequest: HttpRequest;

    /*
     * Constructor.
     */
    constructor(config: SessionConfig) {
        super(config);
        this.config = normaliseSessionConfigOrThrow(config);
        this.httpRequest = new HttpRequest(config.appInfo);
    }

    /*
     * Instance methods.
     */

    getConfig = (): NormalisedSessionConfig => {
        return this.config;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        return {};
    };

    /*
     * Static methods.
     */

    static init(config?: SessionUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            Session.instance = new Session({
                ...config,
                appInfo,
                recipeId: "email-password"
            });
            return Session.instance;
        };
    }

    static getInstanceOrThrow(): Session {
        if (Session.instance === undefined) {
            throw Error(`No instance of ${Session.constructor.name} found. Make sure to call the "init" method.`); // TODO Add relevant doc.
        }

        return Session.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Session.instance = undefined;
        return;
    }
}
