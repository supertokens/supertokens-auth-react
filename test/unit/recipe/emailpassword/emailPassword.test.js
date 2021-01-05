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
import {getDefaultFormFields, getFormattedFormField} from "../../../../lib/build/recipe/emailpassword/utils";
import {defaultLoginPasswordValidator, defaultValidate} from "../../../../lib/build/recipe/emailpassword/validators";
import assert from "assert";
import SuperTokens from "../../../../lib/build/superTokens";
import {assertFormFieldsEqual} from "../../../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe.only("EmailPassword", function() {
    const onSuccessRedirectURL = "https://example.com/login";
    const privacyPolicyLink = "https://example.com/privacy";
    const termsOfServiceLink = "https://example.com/terms";
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

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.signUpForm.formFields,
            getDefaultFormFields().map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth"] !== undefined);
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth/reset-password"] !== undefined);
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth/verify-email"] !== undefined);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getRecipeId(), "emailpassword");
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL, "/");
    });

    it("Initializing EmailPassword with onSuccessRedirectURL and disable default implementation ", async function() {
        EmailPassword.init({
            signInAndUpFeature: {
                onSuccessRedirectURL,
                disableDefaultImplementation: true,
                signUpForm: {
                    privacyPolicyLink,
                    termsOfServiceLink
                },
                signInForm: {
                    resetPasswordURL
                }
            },
            resetPasswordUsingTokenFeature: {
                disableDefaultImplementation: true
            },
            emailVerificationFeature: {
                mode: "REQUIRED",
                disableDefaultImplementation: true
            }
        })(SuperTokens.getAppInfo());
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth"] === undefined);
        assert(EmailPassword.getInstanceOrThrow().getFeatures()["/auth/reset-password"] === undefined);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL, onSuccessRedirectURL);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().getConfig().emailVerificationFeature.mode, "REQUIRED");
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
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test"]
            ]
        );

        // Sign In fields unchanged.

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().getConfig().signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function() {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async email => "Custom Email Error",
            optional: false
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customEmailField]
                }
            }
        })(SuperTokens.getAppInfo());
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email"
                },
                getDefaultFormFields()[1]
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        const signUpEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signUpForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email Error");

        // Sign In fields changed.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email"
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signInForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");
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
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm
                .formFields,
            getDefaultFormFields().map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        // Sign In email field changed only.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email"
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signInForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");
    });


    it("Initializing EmailPassword with non optional custom Fields for SignUp", async function() {
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
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test"]
            ]
        );

        // Sign In fields unchanged.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function() {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async email => "Custom Email Error",
            optional: false
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customEmailField]
                }
            }
        })(SuperTokens.getAppInfo());
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email"
                },
                getDefaultFormFields()[1]
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        const signUpEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signUpForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email Error");

        // Sign In fields changed.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm
                .formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email"
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        const signInEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().signInAndUpFeature.signInForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");

        const enterEmailPasswordResetEmailValidateError = await EmailPassword.getInstanceOrThrow()
            .getConfig().resetPasswordUsingTokenFeature.enterEmailForm
            .formFields[0]
            .validate("foo");
        assert.strictEqual(enterEmailPasswordResetEmailValidateError, "Custom Email Error");
    });

    it("Initializing EmailPassword with custom password validator for signup propagates to reset password", async function() {
        const customPasswordValidate = async (password) => "Custom Password Error";
        const customPasswordField = {
            id: "password",
            label: "Custom Password Label",
            placeholder: "Your custom password",
            validate: customPasswordValidate,
            optional: false
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customPasswordField]
                }
            }
        })(SuperTokens.getAppInfo());

        // Sign Up fields changed
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...customPasswordField,
                    autoComplete: "new-password"
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );


        // Sign In fields changed
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow()
                .getConfig().signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...customPasswordField,
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator
                }
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"]
            ]
        );

        // TODO: Fix to take into account field is not optional Reset password fields gets custom password field.
        // assert.deepStrictEqual(
        //     EmailPassword.getInstanceOrThrow()
        //         .getConfig().resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields[0].validate,
        //     customPasswordValidate
        // );

    });


    it("Validate SignIn EmailPassword fields validation", async function() {
        EmailPassword.init()(SuperTokens.getAppInfo());
        const inputErrors = await EmailPassword.getInstanceOrThrow().signInValidate([{
            id: "email",
            value: "test@supertokens.io"
        }, {
            id: "password",
            value: "test123E"
        }]);
        assert.deepStrictEqual(inputErrors, []);
    });

    it("Validate SignIn EmailPassword fields validation with spaces in email should trim and return no errors", async function() {
        EmailPassword.init()(SuperTokens.getAppInfo());
        const inputErrors = await EmailPassword.getInstanceOrThrow().signInValidate([{
            id: "email",
            value: "  test@supertokens.io    "
        }, {
            id: "password",
            value: "test123E"
        }]);
        assert.deepStrictEqual(inputErrors, []);
    });

    it("Validate SignIn EmailPassword fields validation with invalid email should return error", async function() {
        EmailPassword.init()(SuperTokens.getAppInfo());
        const inputErrors = await EmailPassword.getInstanceOrThrow().signInValidate([{
            id: "email",
            value: "123"
        }, {
            id: "password",
            value: "test123E"
        }]);
        assert.deepStrictEqual(inputErrors, [{
            error: "Email is invalid",
            id: "email"
        }]);
    });


    it("Validate SignUp EmailPassword fields validation with non optional custom fields empty should return error", async function() {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: false
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField]
                }
            }
        })(SuperTokens.getAppInfo());

        
        const inputErrors = await EmailPassword.getInstanceOrThrow().signUpValidate([{
            id: "email",
            value: "test@supertokens.io"
        }, {
            id: "password",
            value: "test123E"
        }, {
            id: "company",
            value: ""
        }]);
        assert.deepStrictEqual(inputErrors, [
            {
                error: "Field is not optional",
                id: "company"
            }
        ]);
    });


    it("Validate SignUp EmailPassword fields validation with custom fields not provided should throw", async function() {
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

        assert.rejects(EmailPassword.getInstanceOrThrow().signUpValidate([{
            id: "email",
            value: "test@supertokens.io"
        }, {
            id: "password",
            value: "test123E"
        }]), Error("Are you sending too many / too few formFields?"))
                
    });

});
