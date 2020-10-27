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
import { getRecipeIdFromSearch, mergeFormFields, defaultValidate, capitalize } from "../../lib/build/utils";

import { normaliseURLPathOrThrowError } from "../../lib/build/normalisedURLPath";
import { normaliseURLDomainOrThrowError } from "../../lib/build/normalisedURLDomain";

const assert = require("assert");
import { mockWindowLocation } from "../helpers";

describe("Config tests", function() {
    beforeEach(async function() {
        global.document = {};
        mockWindowLocation("http://localhost.org");
    });

    it("testing URL path normalisation", async function() {
        assert(normaliseURLPathOrThrowError("http://api.example.com") === "");
        assert(normaliseURLPathOrThrowError("https://api.example.com") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com?hello=1") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com/hello") === "/hello");
        assert(normaliseURLPathOrThrowError("http://api.example.com/") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com:8080") === "");
        assert(normaliseURLPathOrThrowError("http://api.example.com#random2") === "");
        assert(normaliseURLPathOrThrowError("api.example.com/") === "");
        assert(normaliseURLPathOrThrowError("api.example.com#random") === "");
        assert(normaliseURLPathOrThrowError(".example.com") === "");
        assert(normaliseURLPathOrThrowError("api.example.com/?hello=1&bye=2") === "");
        assert(normaliseURLPathOrThrowError(window.location.hostname) === "");

        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://1.2.3.4/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("1.2.3.4/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("https://api.example.com/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/hello/") === "/hello");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com:8080/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("http://api.example.com/one/two#random2") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two/#random") === "/one/two");
        assert(normaliseURLPathOrThrowError(".example.com/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("api.example.com/one/two?hello=1&bye=2") === "/one/two");
        assert(normaliseURLPathOrThrowError(window.location.hostname + "/one/two") === "/one/two");

        assert(normaliseURLPathOrThrowError("/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one") === "/one");
        assert(normaliseURLPathOrThrowError("one") === "/one");
        assert(normaliseURLPathOrThrowError("one/") === "/one");
        assert(normaliseURLPathOrThrowError("/one/two/") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two?hello=1") === "/one/two");
        assert(normaliseURLPathOrThrowError("/one/two/#random") === "/one/two");
        assert(normaliseURLPathOrThrowError("one/two#random") === "/one/two");

        assert(normaliseURLPathOrThrowError("localhost:4000/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("127.0.0.1:4000/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("127.0.0.1/one/two") === "/one/two");
        assert(normaliseURLPathOrThrowError("https://127.0.0.1:80/one/two") === "/one/two");
    });

    it("testing URL domain normalisation", async function() {
        assert(normaliseURLDomainOrThrowError("http://api.example.com") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("https://api.example.com") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com?hello=1") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/hello") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com:8080") === "http://api.example.com:8080");
        assert(normaliseURLDomainOrThrowError("http://api.example.com#random2") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com#random") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(".example.com") === "https://example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/?hello=1&bye=2") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(window.location.hostname) === "http://localhost.org");
        assert(normaliseURLDomainOrThrowError("localhost") === "http://localhost");
        assert(normaliseURLDomainOrThrowError("https://localhost") === "https://localhost");

        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://1.2.3.4/one/two") === "http://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("https://1.2.3.4/one/two") === "https://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("1.2.3.4/one/two") === "http://1.2.3.4");
        assert(normaliseURLDomainOrThrowError("https://api.example.com/one/two/") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two?hello=1") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("http://api.example.com/one/two#random2") === "http://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/one/two") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError("api.example.com/one/two/#random") === "https://api.example.com");
        assert(normaliseURLDomainOrThrowError(".example.com/one/two") === "https://example.com");
        assert(normaliseURLDomainOrThrowError(window.location.hostname + "/one/two") === "http://localhost.org");
        assert(normaliseURLDomainOrThrowError("localhost:4000") === "http://localhost:4000");
        assert(normaliseURLDomainOrThrowError("127.0.0.1:4000") === "http://127.0.0.1:4000");
        assert(normaliseURLDomainOrThrowError("127.0.0.1") === "http://127.0.0.1");
        assert(normaliseURLDomainOrThrowError("https://127.0.0.1:80/") === "https://127.0.0.1:80");

        try {
            normaliseURLDomainOrThrowError("/one/two");
            assert(false);
        } catch (err) {
            assert(err.message === "Please provide a valid domain name");
        }
    });

    it("get recipe Id from URL search", async function() {
        assert.strictEqual(getRecipeIdFromSearch(""), null);
        assert.strictEqual(getRecipeIdFromSearch("?rid=test"), "test");
        assert.strictEqual(getRecipeIdFromSearch("?rid=2"), "2");
        assert.strictEqual(getRecipeIdFromSearch("?gid=blue&rid=green&foo=bar"), "green");
        assert.strictEqual(getRecipeIdFromSearch("?rId=blue&rid=green"), "green");
        assert.strictEqual(getRecipeIdFromSearch("?rId=blue&foo=bar"), null);
    });

    it("merge form fields", async function() {
        const defaultEmailFormField = {
            id: "email",
            label: "Email",
            placeholder: "youremail@example.com",
            validate: email => {
                return new Promise(resolve => resolve(undefined));
            },
            optional: false
        };

        const defaultPasswordFormField = {
            id: "password",
            label: "Password",
            placeholder: "Enter your password",
            validate: password => {
                return new Promise(resolve => resolve(undefined));
            },
            optional: false
        };

        const customEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: email => {
                return new Promise(resolve => resolve("Wrong email! Keep trying"));
            },
            optional: false
        };

        const optionalCustomEmailFormField = {
            id: "email",
            label: " Custom Email Label",
            placeholder: "Custom Email Placeholder",
            validate: email => {
                return new Promise(resolve => resolve("Wrong email! Keep trying"));
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
            validate: password => {
                return new Promise(resolve => resolve(undefined));
            },
            optional: false
        };

        const randomCustomFormFieldWithValidate = {
            id: "random",
            label: "Custom Random",
            placeholder: "Enter whatever",
            validate: random => {
                return new Promise(resolve => resolve("Always throw an error"));
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
