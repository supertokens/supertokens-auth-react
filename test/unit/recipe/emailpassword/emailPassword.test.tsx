/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import EmailPassword from "../../../../lib/ts/recipe/emailpassword/recipe";
import { getDefaultFormFields, getFormattedFormField } from "../../../../lib/ts/recipe/emailpassword/utils";
import { defaultLoginPasswordValidator, defaultValidate } from "../../../../lib/ts/recipe/emailpassword/validators";
import assert from "assert";
import SuperTokens from "../../../../lib/ts/superTokens";
import { assertFormFieldsEqual } from "../../../helpers";
import EmailPasswordIndex from "../../../../lib/ts/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "../../../../lib/ts/recipe/emailpassword/prebuiltui";
import { validateForm } from "../../../../lib/ts/utils";

/*
 * Tests.
 */
describe("EmailPassword", function () {
    const privacyPolicyLink = "https://example.com/privacy";
    const termsOfServiceLink = "https://example.com/terms";

    beforeAll(async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [EmailPassword.init()],
        });
    });

    afterEach(async function () {
        EmailPassword.reset();
        EmailPasswordPreBuiltUI.reset();
    });

    it("Initializing EmailPassword with empty configs", async function () {
        EmailPassword.init().authReact(SuperTokens.getInstanceOrThrow().appInfo, false);

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            getDefaultFormFields().map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );
        assert(EmailPassword.getInstanceOrThrow().getFirstFactorsForAuthPage().length !== 0);
        assert(EmailPasswordPreBuiltUI.getFeatures()["/auth/reset-password"] !== undefined);
        assert(EmailPasswordPreBuiltUI.getFeatures()["/auth/verify-email"] === undefined);
        assert.deepStrictEqual(EmailPassword.getInstanceOrThrow().config.recipeId, "emailpassword");
    });

    it("Initializing EmailPassword and disable default implementations", async function () {
        EmailPassword.init({
            signInAndUpFeature: {
                signInForm: {},
            },
            resetPasswordUsingTokenFeature: {
                disableDefaultUI: true,
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.strictEqual(EmailPasswordPreBuiltUI.getFeatures()["/auth/reset-password"], undefined);
    });

    it("Initializing EmailPassword with optional custom Fields for SignUp", async function () {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: true,
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test"],
            ]
        );

        // Sign In fields unchanged.

        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function () {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async (email) => "Custom Email Error",
            optional: false,
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customEmailField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email",
                },
                getDefaultFormFields()[1],
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        const signUpEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields[0].validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email Error");

        // Sign In fields changed.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email",
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        const signInEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields[0].validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");
    });

    it("Initializing EmailPassword with custom Email for Sign In only", async function () {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async (email) => "Custom Email Error",
            optional: false,
        };

        const randomFieldForSignInShouldBeIgnored = {
            id: "random",
            label: "Random",
            placeholder: "Random",
            validate: async (value) => undefined,
            optional: false,
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signInForm: {
                    formFields: [customEmailField, randomFieldForSignInShouldBeIgnored],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        // Sign Up fields unchanged.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            getDefaultFormFields().map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // Sign In email field changed only.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email",
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        const signInEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields[0].validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");
    });

    it("Initializing EmailPassword with non optional custom Fields for SignUp", async function () {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: true,
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                getDefaultFormFields()[1],
                {
                    validate: defaultValidate,
                    ...companyCustomField,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test"],
            ]
        );

        // Sign In fields unchanged.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );
    });

    it("Initializing EmailPassword with custom Email for SignUp", async function () {
        const customEmailField = {
            id: "email",
            label: "Custom Email Label",
            placeholder: "Your custom email",
            validate: async (email) => "Custom Email Error",
            optional: false,
        };
        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customEmailField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        // Default Sign Up fields + Custom fields.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email",
                },
                getDefaultFormFields()[1],
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        const signUpEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields[0].validate("foo");
        assert.strictEqual(signUpEmailValidateError, "Custom Email Error");

        // Sign In fields changed.
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                {
                    ...customEmailField,
                    autoComplete: "email",
                },
                {
                    ...getDefaultFormFields()[1],
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        const signInEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields[0].validate("foo");
        assert.strictEqual(signInEmailValidateError, "Custom Email Error");

        const enterEmailPasswordResetEmailValidateError =
            await EmailPassword.getInstanceOrThrow().config.resetPasswordUsingTokenFeature.enterEmailForm.formFields[0].validate(
                "foo"
            );
        assert.strictEqual(enterEmailPasswordResetEmailValidateError, "Custom Email Error");
    });

    it("Initializing EmailPassword with custom password validator for signup propagates to reset password", async function () {
        const customPasswordValidate = async (password) => "Custom Password Error";
        const customPasswordField = {
            id: "password",
            label: "Custom Password Label",
            placeholder: "Your custom password",
            validate: customPasswordValidate,
            optional: false,
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [customPasswordField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);

        // Sign Up fields changed
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...customPasswordField,
                    autoComplete: "new-password",
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // Sign In fields changed
        await assertFormFieldsEqual(
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields,
            [
                getDefaultFormFields()[0],
                {
                    ...customPasswordField,
                    autoComplete: "current-password",
                    validate: defaultLoginPasswordValidator,
                },
            ].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // TODO: Fix to take into account field is not optional Reset password fields gets custom password field.
        // assert.deepStrictEqual(
        //     EmailPassword.getInstanceOrThrow()
        //         .config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields[0].validate,
        //     customPasswordValidate
        // );
    });

    it("Validate SignIn EmailPassword fields validation", async function () {
        EmailPassword.init().authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        const formFields = [
            {
                id: "email",
                value: "test@supertokens.io",
            },
            {
                id: "password",
                value: "test123E",
            },
        ];
        const inputErrors = await validateForm(
            formFields,
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields
        );

        assert.deepStrictEqual(inputErrors, []);
    });

    it("Validate SignIn EmailPassword fields validation with spaces in email should trim and return no errors", async function () {
        EmailPassword.init().authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        const formFields = [
            {
                id: "email",
                value: "  test@supertokens.io    ",
            },
            {
                id: "password",
                value: "test123E",
            },
        ];
        const inputErrors = await validateForm(
            formFields,
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields
        );
        assert.deepStrictEqual(inputErrors, []);
    });

    it("Validate SignIn EmailPassword fields validation with invalid email should return error", async function () {
        EmailPassword.init().authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        const formFields = [
            {
                id: "email",
                value: "123",
            },
            {
                id: "password",
                value: "test123E",
            },
        ];
        const inputErrors = await validateForm(
            formFields,
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields
        );
        assert.deepStrictEqual(inputErrors, [
            {
                error: "ERROR_EMAIL_INVALID",
                id: "email",
            },
        ]);
    });

    it("Validate SignUp EmailPassword fields validation with non optional custom fields empty should return error", async function () {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: false,
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);

        const input = [
            {
                id: "email",
                value: "test@supertokens.io",
            },
            {
                id: "password",
                value: "test123E",
            },
            {
                id: "company",
                value: "",
            },
        ];
        const inputErrors = await validateForm(
            input,
            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields
        );

        assert.deepStrictEqual(inputErrors, [
            {
                error: "ERROR_NON_OPTIONAL",
                id: "company",
            },
        ]);
    });

    it("Validate SignUp EmailPassword fields validation with custom fields not provided should throw", async function () {
        const companyCustomField = {
            id: "company",
            label: "Company",
            placeholder: "Your company name",
            optional: true,
        };

        EmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [companyCustomField],
                },
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);

        const input = [
            {
                id: "email",
                value: "test@supertokens.io",
            },
            {
                id: "password",
                value: "test123E",
            },
        ];

        let caught;
        try {
            await validateForm(
                input,
                EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields
            );
        } catch (err) {
            caught = err;
        }

        assert.ok(caught);
        assert.deepStrictEqual(caught, Error("Are you sending too many / too few formFields?"));
    });

    it("Test that when calling submitNewPassword, userContext gets passed to getResetPasswordTokenFromURL", async function () {
        const { authReact, webJS } = EmailPassword.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getResetPasswordTokenFromURL: function (input) {
                            assert(input.userContext["key"] !== undefined);
                            throw new Error("Expected Test Error");
                        },
                    };
                },
            },
        });
        authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        webJS(SuperTokens.getInstanceOrThrow().appInfo, undefined, false, []);

        try {
            await EmailPasswordIndex.submitNewPassword({
                formFields: [],
                userContext: {
                    key: "value",
                },
            });
            throw new Error("submitNewPassword should have failed but didnt");
        } catch (e) {
            if ((e as any).message !== "Expected Test Error") {
                throw e;
            }
        }
    });

    it("Initializing EmailPassword and return null from getRedirectionURL", async function () {
        EmailPassword.init({
            async getRedirectionURL() {
                return null;
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);

        assert(
            (await EmailPassword.getInstanceOrThrow().getRedirectUrl(
                { action: "RESET_PASSWORD", tenantIdFromQueryParams: undefined },
                {}
            )) === null
        );
    });
});
