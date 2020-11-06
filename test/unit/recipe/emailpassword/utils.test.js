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
import assert from "assert";
import {mergeFormFields, capitalize} from "../../../../lib/build/recipe/emailpassword/utils";
import {defaultValidate} from "../../../../lib/build/recipe/emailpassword/validators";

describe("Email password utils tests", function() {
    it("merge form fields", async function() {
        const defaultEmailFormField = {
            id: "email",
            label: "Email",
            placeholder: "youremail@example.com",
            validate: async email => {
                return undefined;
            },
            optional: false
        };

        const defaultPasswordFormField = {
            id: "password",
            label: "Password",
            placeholder: "Enter your password",
            validate: async password => {
                return undefined;
            },
            optional: false
        };

        const customEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: async email => {
                return undefined;
            },
            optional: false
        };

        const optionalCustomEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: async email => {
                return "Wrong email! Keep trying";
            },
            optional: true
        };

        const customEmailFormFieldWithoutValidateMethod = {
            id: "email",
            label: " Custom Email Label Without Validate",
            placeholder: "Custom Email Placeholder Without Validate"
        };

        const customPasswordFormField = {
            id: "password",
            label: "Custom Password",
            placeholder: "Enter your password",
            validate: async password => {
                return undefined;
            },
            optional: false
        };

        const randomCustomFormFieldWithValidate = {
            id: "random",
            label: "Custom Random",
            placeholder: "Enter whatever",
            validate: async random => {
                return "Always throw an error";
            },
            optional: true
        };

        const randomCustomFormFieldWithoutOptionalProperties = {
            id: "random",
            label: "Custom Random"
        };

        // No user input => default form fields.
        assert.deepStrictEqual(mergeFormFields([defaultEmailFormField, defaultPasswordFormField], []), [
            defaultEmailFormField,
            defaultPasswordFormField
        ]);

        // custom email => custom email, default password.
        assert.deepStrictEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [customEmailFormField]),
            [customEmailFormField, defaultPasswordFormField]
        );

        // default email + custom password => default email, custom password.
        assert.deepStrictEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [customPasswordFormField]),
            [defaultEmailFormField, customPasswordFormField]
        );

        // custom password + custom email (reverse order) => custom email + custom password (right order).
        assert.deepStrictEqual(
            mergeFormFields(
                [defaultEmailFormField, defaultPasswordFormField],
                [customPasswordFormField, customEmailFormField]
            ),
            [customEmailFormField, customPasswordFormField]
        );

        // custom field => default email, default password, custom field.
        assert.deepStrictEqual(
            mergeFormFields([defaultEmailFormField, defaultPasswordFormField], [randomCustomFormFieldWithValidate]),
            [defaultEmailFormField, defaultPasswordFormField, randomCustomFormFieldWithValidate]
        );

        // optional custom email => custom email not optional.
        const mergedOptionalCustomEmailFormFields = mergeFormFields(
            [defaultEmailFormField, defaultPasswordFormField],
            [optionalCustomEmailFormField]
        );
        assert.strictEqual(mergedOptionalCustomEmailFormFields[0].optional, false);

        // custom field, custom password, custom email => custom email, custom password, custom field
        assert.deepStrictEqual(
            mergeFormFields(
                [defaultEmailFormField, defaultPasswordFormField],
                [randomCustomFormFieldWithValidate, customPasswordFormField, customEmailFormField]
            ),
            [customEmailFormField, customPasswordFormField, randomCustomFormFieldWithValidate]
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
                capitalize(randomCustomFormFieldWithoutOptionalProperties.id)
        );
        assert(mergedRandomWithoutValidateNorOptional[2].validate === defaultValidate);
        assert(mergedRandomWithoutValidateNorOptional[2].optional === false);
    });
});
