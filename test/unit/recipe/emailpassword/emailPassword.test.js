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
import EmailPassword from "../../../../lib/build/recipe/emailpassword/emailPassword";
import {getDefaultFormFields, defaultLoginPasswordValidator, defaultValidate} from "../../../../lib/build/recipe/emailpassword/utils"
import assert from "assert";
import SuperTokens from "../../../../lib/build/SuperTokens";
import NormalisedURLPath from "../../../../lib/build/normalisedURLPath";

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

    before(async function() {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io"
            },
            recipeList: [EmailPassword.init()]
        });
    });

    afterEach(async function() {
        EmailPassword.reset();
    });

    it("Initializing EmailPassword with empty configs", async function() {
        EmailPassword.init()(SuperTokens.getAppInfo());
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            getDefaultFormFields()
        );
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    validate: defaultLoginPasswordValidator
                }
            ]

        );
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth"] !== undefined);
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth/reset-password"] !== undefined);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getRecipeId(), "email-password");
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL.getAsStringDangerous(), new NormalisedURLPath("/").getAsStringDangerous());
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
            },
            resetPasswordUsingTokenFeature: {
                disableDefaultImplementation: true
            }
        })(SuperTokens.getAppInfo());
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth"] === undefined);
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth/reset-password"] === undefined);
        const normalisedOnSuccessRedirectURL = new NormalisedURLPath(onSuccessRedirectURL);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL.getAsStringDangerous(), normalisedOnSuccessRedirectURL.getAsStringDangerous());
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
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField
                }
            ]
        );
        // Sign In fields unchanged.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    validate: defaultLoginPasswordValidator
                }
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function() {
        const companyEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async email => "Custom Email",
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
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                companyEmailField,
                getDefaultFormFields()[1]
            ]
        );
        const signUpEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signUpForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email");

        // Sign In fields changed.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                companyEmailField,
                {
                    ...getDefaultFormFields()[1],
                    validate: defaultLoginPasswordValidator
                }
            ]
        );
        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signInForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email");
    });

    it("Initializing EmailPassword with custom Email for Sign In only", async function() {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async email => "Custom Email Error",
            optional: false
        };

        const randomFieldForSignInShouldBeIgnored = {
            id: "random",
            label: "Random",
            placeholder: "Random",
            validate: async value => undefined,
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
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            getDefaultFormFields()
        );

        // Sign In email field changed only.
        assert.deepStrictEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                customEmailField,
                {
                    ...getDefaultFormFields()[1],
                    validate: defaultLoginPasswordValidator
                }
            ]
        );

        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signInForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");
    });
});
