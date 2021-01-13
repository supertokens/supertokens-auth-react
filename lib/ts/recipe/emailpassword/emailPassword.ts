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
import sessionSdk from "supertokens-website/lib/build/fetch";

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
    EnterEmailAPIResponse,
    FormFieldError,
    NormalisedEmailPasswordConfig,
    SignInAPIResponse,
    SignOutAPIResponse,
    SignUpAPIResponse,
    SubmitNewPasswordAPIResponse,
    EmailExistsAPIResponse,
    SendVerificationEmailAPIResponse,
    VerifyEmailAPIResponse,
    IsEmailVerifiedAPIResponse,
    PreAPIHookContext
} from "./types";
import { isTest, validateForm } from "../../utils";
import HttpRequest from "../../httpRequest";
import { normaliseEmailPasswordConfig } from "./utils";
import { ResetPasswordUsingToken, SignInAndUp, EmailVerification } from ".";
import NormalisedURLPath from "../../normalisedURLPath";
import {
    API_RESPONSE_STATUS,
    DEFAULT_RESET_PASSWORD_PATH,
    DEFAULT_VERIFY_EMAIL_PATH,
    EMAIL_VERIFICATION_MODE,
    PRE_API_HOOK_ACTION
} from "./constants";
import { SOMETHING_WENT_WRONG_ERROR, SSR_ERROR } from "../../constants";

/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

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

        if (
            this.config.emailVerificationFeature.disableDefaultImplementation !== true &&
            this.config.emailVerificationFeature.mode !== EMAIL_VERIFICATION_MODE.OFF
        ) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = EmailVerification;
        }

        return features;
    };

    preAPIHook = async (context: PreAPIHookContext): Promise<RequestInit> => {
        const preAPIHook = this.getConfig().preAPIHook;
        if (preAPIHook !== undefined) {
            return await preAPIHook(context);
        }

        return context.requestInit;
    };

    /*
     * API.
     */

    /*
     * SignIn/SignUp
     */

    signUpAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignUpAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SIGN_UP,
            requestInit: {
                body: JSON.stringify(requestJson),
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/signup", requestInit);
    };

    emailExistsAPI = async (value: string, headers: HeadersInit): Promise<EmailExistsAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.EMAIL_EXISTS,
            requestInit: {
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.get("/signup/email/exists", requestInit, {
            email: value
        });
    };

    signInAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignInAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SIGN_IN,
            requestInit: {
                body: JSON.stringify(requestJson),
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/signin", requestInit);
    };

    /*
     * Reset Password
     */

    submitNewPasswordAPI = async (
        requestJson: RequestJson,
        headers: HeadersInit
    ): Promise<SubmitNewPasswordAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SUBMIT_NEW_PASSWORD,
            requestInit: {
                body: JSON.stringify(requestJson),
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/user/password/reset", requestInit);
    };

    enterEmailAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SEND_RESET_PASSWORD_EMAIL,
            requestInit: {
                body: JSON.stringify(requestJson),
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/user/password/reset/token", requestInit);
    };

    /*
     * SignOut
     */

    signOut = async (): Promise<SignOutAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SIGN_OUT,
            requestInit: {
                method: "POST",
                headers: {
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);

        const result = await this.httpRequest.fetch(this.httpRequest.getFullUrl("/signout"), requestInit);

        const sessionExpiredStatusCode = sessionSdk.sessionExpiredStatusCode;
        if (result.status === sessionExpiredStatusCode) {
            return {
                status: API_RESPONSE_STATUS.OK
            };
        }
        if (result.status >= 300) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        return await result.json();
    };

    /*
     * Email Verification
     */

    sendVerificationEmailAPI = async (headers: HeadersInit): Promise<SendVerificationEmailAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SEND_VERIFY_EMAIL,
            requestInit: {
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/user/email/verify/token", requestInit);
    };

    verifyEmailAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<VerifyEmailAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.SEND_VERIFY_EMAIL,
            requestInit: {
                body: JSON.stringify(requestJson),
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.post("/user/email/verify", requestInit);
    };

    isEmailVerifiedAPI = async (headers: HeadersInit): Promise<IsEmailVerifiedAPIResponse> => {
        const context = {
            action: PRE_API_HOOK_ACTION.IS_EMAIL_VERIFIED,
            requestInit: {
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            }
        };
        const requestInit = await this.preAPIHook(context);
        return this.httpRequest.get("/user/email/verify", requestInit);
    };

    async isEmailVerified(): Promise<boolean> {
        const response = await this.isEmailVerifiedAPI({});
        return response.isVerified;
    }

    /*
     * Validate
     */

    /*
     * SignIn/SignUp
     */

    async signUpValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.signInAndUpFeature.signUpForm.formFields);
    }

    async signInValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.signInAndUpFeature.signInForm.formFields);
    }

    /*
     * Reset Password
     */

    async submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields);
    }

    async enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields);
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

    static signOut(): Promise<SignOutAPIResponse> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return await EmailPassword.getInstanceOrThrow().isEmailVerified();
    }

    static getInstanceOrThrow(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/starter-guide/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
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
