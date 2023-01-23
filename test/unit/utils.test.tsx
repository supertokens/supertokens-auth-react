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
import { getRecipeIdFromSearch, validateForm, appendQueryParamsToURL } from "../../lib/ts/utils";

import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";

const assert = require("assert");
import { mockWindowLocation } from "../helpers";

describe("Config tests", function () {
    beforeEach(async function () {
        mockWindowLocation("http://localhost.org");
    });

    it("testing URL path normalisation", async function () {
        function normaliseURLPathOrThrowError(input) {
            return new NormalisedURLPath(input).getAsStringDangerous();
        }

        assert.strictEqual(normaliseURLPathOrThrowError(""), "");
        assert.strictEqual(normaliseURLPathOrThrowError(" "), "");
        assert.strictEqual(normaliseURLPathOrThrowError("exists?email=john.doe%40gmail.com"), "/exists");
        assert.strictEqual(
            normaliseURLPathOrThrowError("/auth/email/exists?email=john.doe%40gmail.com"),
            "/auth/email/exists"
        );
        assert.strictEqual(normaliseURLPathOrThrowError("exists"), "/exists");
        assert.strictEqual(normaliseURLPathOrThrowError("/exists"), "/exists");
        assert.strictEqual(normaliseURLPathOrThrowError("/exists?email=john.doe%40gmail.com"), "/exists");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("https://api.example.com"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com?hello=1"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/hello"), "/hello");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com:8080"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com#random2"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com/"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com#random"), "");
        assert.strictEqual(normaliseURLPathOrThrowError(".example.com"), "");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com/?hello=1&bye=2"), "");
        assert.strictEqual(normaliseURLPathOrThrowError(window.location.hostname), "");

        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("http://1.2.3.4/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("1.2.3.4/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("https://api.example.com/one/two/"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/one/two?hello=1"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/hello/"), "/hello");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/one/two/"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com:8080/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("http://api.example.com/one/two#random2"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com/one/two/#random"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError(".example.com/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("api.example.com/one/two?hello=1&bye=2"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError(window.location.hostname + "/one/two"), "/one/two");

        assert.strictEqual(normaliseURLPathOrThrowError("/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("one/two/"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("/one"), "/one");
        assert.strictEqual(normaliseURLPathOrThrowError("one"), "/one");
        assert.strictEqual(normaliseURLPathOrThrowError("one/"), "/one");
        assert.strictEqual(normaliseURLPathOrThrowError("/one/two/"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("/one/two?hello=1"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("one/two?hello=1"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("/one/two/#random"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("one/two#random"), "/one/two");

        assert.strictEqual(normaliseURLPathOrThrowError("localhost:4000/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("127.0.0.1:4000/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("127.0.0.1/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("https://127.0.0.1:80/one/two"), "/one/two");
        assert.strictEqual(normaliseURLPathOrThrowError("/"), "");

        assert.strictEqual(normaliseURLPathOrThrowError("/.netlify/functions/api"), "/.netlify/functions/api");
        assert.strictEqual(normaliseURLPathOrThrowError("/netlify/.functions/api"), "/netlify/.functions/api");
        assert.strictEqual(
            normaliseURLPathOrThrowError("app.example.com/.netlify/functions/api"),
            "/.netlify/functions/api"
        );
        assert.strictEqual(
            normaliseURLPathOrThrowError("app.example.com/netlify/.functions/api"),
            "/netlify/.functions/api"
        );
        assert.strictEqual(normaliseURLPathOrThrowError("/app.example.com"), "/app.example.com");
    });

    it("testing URL domain normalisation", async function () {
        function normaliseURLDomainOrThrowError(input) {
            return new NormalisedURLDomain(input).getAsStringDangerous();
        }
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
        } catch (err: any) {
            assert(err.message === "Please provide a valid domain name");
        }

        try {
            normaliseURLDomainOrThrowError("/.netlify/functions/api");
            assert(false);
        } catch (err: any) {
            assert(err.message === "Please provide a valid domain name");
        }
    });

    it("append search params to absolute/relative URL", async function () {
        assert.strictEqual(appendQueryParamsToURL("/"), "/");
        assert.strictEqual(appendQueryParamsToURL("/relativepath"), "/relativepath");
        assert.strictEqual(appendQueryParamsToURL("/relativepath", {}), "/relativepath");
        assert.strictEqual(appendQueryParamsToURL("https://127.0.0.1:80/"), "https://127.0.0.1:80/");
        assert.strictEqual(appendQueryParamsToURL("https://example.com/one/two"), "https://example.com/one/two");
        assert.strictEqual(appendQueryParamsToURL("https://example.com/one/two", {}), "https://example.com/one/two");
        assert.strictEqual(
            appendQueryParamsToURL("https://example.com/one/two", { foo: "bar" }),
            "https://example.com/one/two?foo=bar"
        );
        assert.strictEqual(
            appendQueryParamsToURL("https://example.com/one/two?blue=green", {
                foo: "bar",
            }),
            "https://example.com/one/two?blue=green&foo=bar"
        );
        assert.strictEqual(
            appendQueryParamsToURL("https://example.com/one/two?blue=green#with-hash", { foo: "bar" }),
            "https://example.com/one/two?blue=green&foo=bar#with-hash"
        );
        assert.strictEqual(appendQueryParamsToURL("/relative/path", { foo: "bar" }), "/relative/path?foo=bar");
        assert.strictEqual(
            appendQueryParamsToURL("/relative/path?blue=green#with-hash", {
                foo: "bar",
            }),
            "/relative/path?blue=green&foo=bar"
        );
        assert.strictEqual(appendQueryParamsToURL("?blue=green", { foo: "bar" }), "/?blue=green&foo=bar");
        assert.strictEqual(
            appendQueryParamsToURL("/auth", { scope: "read_user write_user" }),
            "/auth?scope=read_user+write_user"
        );
        // Overwrite already existing params
        assert.strictEqual(
            appendQueryParamsToURL("/auth?rid=emailpassword", {
                rid: "thirdparty_emailpassword",
            }),
            "/auth?rid=thirdparty_emailpassword"
        );
    });

    it("get recipe Id from URL search", async function () {
        assert.strictEqual(getRecipeIdFromSearch(""), null);
        assert.strictEqual(getRecipeIdFromSearch("?rid=test"), "test");
        assert.strictEqual(getRecipeIdFromSearch("?rid=2"), "2");
        assert.strictEqual(getRecipeIdFromSearch("?gid=blue&rid=green&foo=bar"), "green");
        assert.strictEqual(getRecipeIdFromSearch("?rId=blue&rid=green"), "green");
        assert.strictEqual(getRecipeIdFromSearch("?rId=blue&foo=bar"), null);
    });

    it("validateForm (TODO)", async function () {
        /*
         * TODO
         * - Test that no error return empty array [].
         * - Test that when an input is not provided at all it will return an error.
         * - Test that when an empty value is provided for a non optional value, it returns an error.
         * - Test that multiple errors can be returned.
         */

        // returns errors for password only.
        const formFields = [
            {
                id: "email",
                label: "Email",
                placeholder: "youremail@example.com",
                validate: async (email) => {
                    return undefined;
                },
                optional: false,
            },
            {
                id: "password",
                label: "Password",
                placeholder: "Enter your password",
                validate: async (password) => {
                    return "Error validating your password";
                },
                optional: false,
            },
        ];

        const input = [
            {
                id: "email",
                value: "john@doe.com",
            },
            {
                id: "password",
                value: "anything will throw",
            },
        ];
        const errors = await validateForm(input, formFields);
        assert.deepStrictEqual(errors, [
            {
                id: "password",
                error: "Error validating your password",
            },
        ]);
    });
});
