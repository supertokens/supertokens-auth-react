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
import { CreateRecipeFunction, AppInfo, FormFields, RouteToFeatureComponentMap, RequestJson } from "../../types";
import {
    EmailPasswordConfig,
    SignInAndUpConfig,
    SignInFormFeatureConfig,
    SignUpFormFeatureConfig,
    EmailPasswordUserInput
} from "./types";
import { isTest } from "../../utils";
import SignInFeature from "./signInFeature";
import SignUpFeature from "./signUpFeature";
import SignInAndUp from "./components/SignInAndUp";
import HttpRequest from "../../httpRequest";

/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;

    /*
     * Instance Attributes.
     */
    private signInFeature: SignInFeature;
    private signUpFeature: SignUpFeature;
    private onSuccessRedirectURL: string;
    private httpRequest: HttpRequest;

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig, features: RouteToFeatureComponentMap = {}) {
        super(config);

        const signInAndUpConfig = EmailPassword.getSignInAndUpConfig(config);
        if (signInAndUpConfig !== undefined && signInAndUpConfig.onSuccessRedirectURL !== undefined) {
            this.onSuccessRedirectURL = signInAndUpConfig.onSuccessRedirectURL;
        } else {
            this.onSuccessRedirectURL = "/";
        }

        this.httpRequest = new HttpRequest(config.appInfo);

        let signUpForm: SignUpFormFeatureConfig | undefined = undefined;
        let signInForm: SignInFormFeatureConfig | undefined = undefined;
        if (signInAndUpConfig !== undefined) {
            signUpForm = signInAndUpConfig.signUpForm;
            signInForm = signInAndUpConfig.signInForm;
        }

        this.signUpFeature = new SignUpFeature(signUpForm);

        /*
         * Default Sign In corresponds tocomputed Sign Up fields filtered by email and password only.
         * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
         */
        const defaultSignInFields: FormFields[] = this.signUpFeature.formFields.filter(field => {
            return ["email", "password"].includes(field.id);
        });
        this.signInFeature = new SignInFeature(defaultSignInFields, signInForm);
    }

    /*
     * Instance methods.
     */
    getSignInFeature = (): SignInFeature => {
        return this.signInFeature;
    };

    getSignUpFeature = (): SignUpFeature => {
        return this.signUpFeature;
    };

    getOnSuccessRedirectURL = (): string => {
        return this.onSuccessRedirectURL;
    };

    signUpApi = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // TODO Validation.
        return this.httpRequest.post("/signup", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    signInApi = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // TODO Validation.
        return this.httpRequest.post("/signin", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    /*
     * Static methods.
     */

    static init(config?: EmailPasswordUserInput): CreateRecipeFunction {
        return (appInfo: AppInfo): RecipeModule => {
            /*
             * This needs to happen before the constructor is called
             * See https://github.com/microsoft/TypeScript/issues/8277
             */
            let features: RouteToFeatureComponentMap = {};

            if (config === undefined) config = {};

            const signInAndUpConfig = EmailPassword.getSignInAndUpConfig(config);

            if (!EmailPassword.hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig)) {
                features = {
                    "/": SignInAndUp
                };
            }

            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                features,
                recipeId: "email-password"
            });
            return EmailPassword.instance;
        };
    }

    static getInstanceOrThrow(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            throw Error(`No instance of ${EmailPassword.constructor.name} found. Make sure to call the "init" method.`); // TODO Add relevant doc.
        }

        return EmailPassword.instance;
    }

    static getSignInAndUpConfig(config: EmailPasswordUserInput): SignInAndUpConfig | undefined {
        if (config === undefined) {
            return undefined;
        }

        return config.signInAndUpFeature;
    }

    static hasDisabledSignInAndUpDefaultImplementation(signInAndUpConfig?: SignInAndUpConfig): boolean {
        if (signInAndUpConfig == undefined) return false;

        return signInAndUpConfig.disableDefaultImplementation === true;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPassword.instance = undefined;
        return;
    }
}
