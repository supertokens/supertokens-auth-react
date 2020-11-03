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
import {
    CreateRecipeFunction,
    RouteToFeatureComponentMap,
    RequestJson,
    NormalisedAppInfo,
    APIFormField
} from "../../types";
import {
    EmailPasswordConfig,
    EmailPasswordUserInput,
    EnterEmailThemeResponse,
    FormFieldError,
    NormalisedEmailPasswordConfig,
    SignInThemeResponse,
    SignUpThemeResponse,
    SubmitNewPasswordThemeResponse
} from "./types";
import { isTest, validateFormOrThrow } from "../../utils";
import HttpRequest from "../../httpRequest";
import { normaliseEmailPasswordConfig } from "./utils";
import { SignInAndUp } from ".";
import NormalisedURLPath from "../../normalisedURLPath";
import ResetPasswordUsingToken from "./components/resetPasswordUsingToken/resetPasswordUsingToken";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";

/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "email-password";

    /*
     * Instance Attributes.
     */
    private config: NormalisedEmailPasswordConfig;

    private httpRequest: HttpRequest;

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig) {
        super(config);
        this.config = normaliseEmailPasswordConfig(config);
        this.httpRequest = new HttpRequest(config.appInfo);
    }

    /*
     * Instance methods.
     */

    getConfig = (): NormalisedEmailPasswordConfig => {
        return this.config;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        const features: RouteToFeatureComponentMap = {};
        if (this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = SignInAndUp;
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = ResetPasswordUsingToken;
        }
        return features;
    };

    /*
     * API.
     */

    /*
     * SignIn/SignUp
     */

    signUpAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignUpThemeResponse> => {
        return this.httpRequest.post("/signup", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    signInAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignInThemeResponse> => {
        return this.httpRequest.post("/signin", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    /*
     * Reset Password
     */

    submitNewPasswordAPI = async (
        requestJson: RequestJson,
        headers: HeadersInit
    ): Promise<SubmitNewPasswordThemeResponse> => {
        return this.httpRequest.post("/user/password/reset", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    enterEmailAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailThemeResponse> => {
        return this.httpRequest.post("/user/password/reset/token", {
            body: JSON.stringify(requestJson),
            headers
        });
    };

    /*
     * Validate
     */

    /*
     * SignIn/SignUp
     */

    async signUpValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateFormOrThrow(input, this.config.signInAndUpFeature.signUpForm.formFields);
    }

    async signInValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateFormOrThrow(input, this.config.signInAndUpFeature.signInForm.formFields);
    }

    /*
     * Reset Password
     */

    async submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateFormOrThrow(
            input,
            this.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
        );
    }

    async enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateFormOrThrow(input, this.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields);
    }

    /*
     * Static methods.
     */

    static init(config?: EmailPasswordUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                recipeId: EmailPassword.RECIPE_ID
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
