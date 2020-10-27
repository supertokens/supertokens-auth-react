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
 * Imports
 */

/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import EmailPassword from "../../lib/build/recipe/emailpassword/emailPassword";
import assert from "assert";
import SuperTokens from "../../lib/build/SuperTokens";
import { defaultValidate } from "../../lib/build/utils";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("EmailPassword", function() {
    const onSuccessRedirectURL = "https://example.com/login";
    const privacyPolicyLink = "https://example.com/privacy";
    const termsAndConditionsLink = "https://example.com/terms";
    const resetPasswordURL = "https://example.com/reset";
    SuperTokens.init({
        appInfo: {
            appName: "SuperTokens",
            websiteDomain: "supertokens.io",
            apiDomain: "api.supertokens.io"
        },
        recipeList: [EmailPassword.init()]
    });

    afterEach(async function() {
        EmailPassword.reset();
    });

    it("Initializing EmailPassword with empty configs", async function() {
        EmailPassword.init()(SuperTokens.getAppInfo());
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getFormFields(),
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getDefaultFormFields()
        );
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignInFeature()
                .getFormFields(),
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getDefaultFormFields()
        );
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth"] !== undefined);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getRecipeId(), "email-password");
        assert.strictEqual(EmailPassword.getInstanceOrThrow().getOnSuccessRedirectURL(), "/");
    });

    it("Initializing EmailPassword with onSuccessRedirectURL and disable default implementation for signInAndUp", async function() {
        EmailPassword.init({
            signInAndUpFeature: {
                onSuccessRedirectURL,
                disableDefaultImplementation: true,
                signUpForm: {
                    privacyPolicyLink,
                    termsAndConditionsLink
                },
                signInForm: {
                    resetPasswordURL
                }
            }
        })(SuperTokens.getAppInfo());
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/"] === undefined);
        assert.strictEqual(EmailPassword.getInstanceOrThrow().getOnSuccessRedirectURL(), onSuccessRedirectURL);
    });

    it("Initializing EmailPassword with optional custom Fields for SignUp", async function() {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: true
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField]
                }
            }
        })(SuperTokens.getAppInfo());
        // Default Sign Up fields + Custom fields.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getFormFields(),
            [
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[0],
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField
                }
            ]
        );
        // Sign In fields unchanged.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignInFeature()
                .getFormFields(),
            [
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[0],
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[1]
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function() {
        const companyEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: email => new Promise(resolve => resolve("Custom Email")),
            optional: false
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyEmailField]
                }
            }
        })(SuperTokens.getAppInfo());
        // Default Sign Up fields + Custom fields.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getFormFields(),
            [
                companyEmailField,
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[1]
            ]
        );
        const signUpEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getSignUpFeature()
            .getFormFields()[0]
            .validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email");

        // Sign In fields changed.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignInFeature()
                .getFormFields(),
            [
                companyEmailField,
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[1]
            ]
        );
        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getSignInFeature()
            .getFormFields()[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email");
    });

    it("Initializing EmailPassword with custom Email for Sign In only", async function() {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: email => new Promise(resolve => resolve("Custom Email")),
            optional: false
        };

        const randomFieldForSignInShouldBeIgnored = {
            id: "random",
            label: "Random",
            placeholder: "Random",
            validate: email => new Promise(resolve => resolve()),
            optional: false
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signInForm: {
                    formFields: [customEmailField, randomFieldForSignInShouldBeIgnored]
                }
            }
        })(SuperTokens.getAppInfo());
        // Sign Up fields unchanged.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getFormFields(),
            EmailPassword.getInstanceOrThrow()
                .getSignUpFeature()
                .getDefaultFormFields()
        );

        // Sign In email field changed only.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getSignInFeature()
                .getFormFields(),
            [
                customEmailField,
                EmailPassword.getInstanceOrThrow()
                    .getSignUpFeature()
                    .getDefaultFormFields()[1]
            ]
        );

        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getSignInFeature()
            .getFormFields()[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email");
    });
});
