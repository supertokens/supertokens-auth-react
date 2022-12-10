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
import assert from "assert";
import { mergeFormFields, getFormattedFormField } from "../../../../lib/ts/recipe/emailpassword/utils";
import { assertFormFieldsEqual } from "../../../helpers";

describe("Email password utils tests", function () {
    it("merge form fields", async function () {
        const defaultEmailFormField = {
            id: "email",
            label: "Email",
            placeholder: "youremail@example.com",
            validate: async (email) => {
                return undefined;
            },
            optional: false,
        };

        const defaultPasswordFormField = {
            id: "password",
            label: "Password",
            placeholder: "Enter your password",
            validate: async (password) => {
                return undefined;
            },
            optional: false,
        };

        const customEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: async (email) => {
                return undefined;
            },
            optional: false,
        };

        const optionalCustomEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: async (email) => {
                return "Wrong email! Keep trying";
            },
            optional: true,
        };

        const customEmailFormFieldWithoutValidateMethod = {
            id: "email",
            label: " Custom Email Label Without Validate",
            placeholder: "Custom Email Placeholder Without Validate",
        };

        const customPasswordFormField = {
            id: "password",
            label: "Custom Password",
            placeholder: "Enter your password",
            validate: async (password) => {
                return undefined;
            },
            optional: false,
        };

        const randomCustomFormFieldWithValidate = {
            id: "random",
            label: "Custom Random",
            placeholder: "Enter whatever",
            validate: async (random) => {
                return "Always throw an error";
            },
            optional: true,
        };

        const randomCustomFormFieldWithoutOptionalProperties = {
            id: "random",
            label: "Custom Random",
        };

        // No user input => default form fields.
        await assertFormFieldsEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], []),
            [defaultEmailFormField, defaultPasswordFormField].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // custom email => custom email, default password.
        await assertFormFieldsEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [customEmailFormField]),
            [customEmailFormField, defaultPasswordFormField].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // default email + custom password => default email, custom password.
        await assertFormFieldsEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [customPasswordFormField]),
            [defaultEmailFormField, customPasswordFormField].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // custom password + custom email (reverse order) => custom email + custom password (right order).
        await assertFormFieldsEqual(
            mergeFormFields(
                [defaultEmailFormField, defaultPasswordFormField],
                [customPasswordFormField, customEmailFormField]
            ),
            [customEmailFormField, customPasswordFormField].map(getFormattedFormField),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
            ]
        );

        // custom field => default email, default password, custom field.
        await assertFormFieldsEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [randomCustomFormFieldWithValidate]),
            [defaultEmailFormField, defaultPasswordFormField, randomCustomFormFieldWithValidate].map(
                getFormattedFormField
            ),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test", "1", "5", "john@email.com"],
            ]
        );

        // optional custom email => custom email not optional.
        const mergedOptionalCustomEmailFormFields = mergeFormFields(
            [defaultEmailFormField, defaultPasswordFormField],
            [optionalCustomEmailFormField]
        );
        assert.strictEqual(mergedOptionalCustomEmailFormFields[0].optional, false);

        // custom field, custom password, custom email => custom email, custom password, custom field
        await assertFormFieldsEqual(
            mergeFormFields(
                [defaultEmailFormField, defaultPasswordFormField],
                [randomCustomFormFieldWithValidate, customPasswordFormField, customEmailFormField]
            ),
            [customEmailFormField, customPasswordFormField, randomCustomFormFieldWithValidate].map(
                getFormattedFormField
            ),
            [
                ["", "john", "john.doe@gmail.com"],
                ["", "test", "test123", "Str0ngP@ssword"],
                ["", "test", "1", "5", "john@email.com"],
            ]
        );

        // custom email without validate method => custom email with default validate method.
        const mergedCustomEmailWithoutValidate = mergeFormFields(
            [defaultEmailFormField, defaultPasswordFormField],
            [customEmailFormFieldWithoutValidateMethod]
        );
        assert(mergedCustomEmailWithoutValidate[0].label === customEmailFormFieldWithoutValidateMethod.label);
        assert(
            mergedCustomEmailWithoutValidate[0].placeholder === customEmailFormFieldWithoutValidateMethod.placeholder
        );
        assert(mergedCustomEmailWithoutValidate[0].validate !== undefined);

        // custom field without validate => default validate and optional = false.
        const mergedRandomWithoutValidateNorOptional = mergeFormFields(
            [defaultEmailFormField, defaultPasswordFormField],
            [randomCustomFormFieldWithoutOptionalProperties]
        );
        assert(
            mergedRandomWithoutValidateNorOptional[2].label === randomCustomFormFieldWithoutOptionalProperties.label
        );
        assert(
            mergedRandomWithoutValidateNorOptional[2].placeholder ===
                randomCustomFormFieldWithoutOptionalProperties.label
        );
        assert(mergedRandomWithoutValidateNorOptional[2].validate !== undefined);
        assert(mergedRandomWithoutValidateNorOptional[2].optional === false);
    });
});
