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
import assert from "assert";
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getFeatureFlags,
    screenshotOnFailure,
    toggleSignInSignUp,
    isReact16,
    setInputValues,
    submitFormReturnRequestAndResponse,
    getGeneralError,
    getInputAdornmentsSuccess,
    getInputAdornmentsError,
    getFieldErrors,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_SERVER_BASE_URL, SIGN_UP_API, SIGN_IN_API } from "../constants";

describe("General error rendering", function () {
    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("generalerror") || isReact16()) {
            this.skip();
        }
    });

    describe("EmailPassword", function () {
        let browser;
        let page;
        before(async function () {
            await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                method: "POST",
            }).catch(console.error);

            await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                method: "POST",
            }).catch(console.error);

            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            });
        });

        afterEach(function () {
            return screenshotOnFailure(this, browser);
        });

        beforeEach(async function () {
            page = await browser.newPage();
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
        });

        it("Sign up error", async function () {
            await toggleSignInSignUp(page);
            await page.evaluate(() =>
                localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD EMAIL_PASSWORD_SIGN_UP")
            );
            // Set values.
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
                { name: "age", value: "20" },
            ]);

            let [{ response }] = await Promise.all([submitFormReturnRequestAndResponse(page, SIGN_UP_API)]);

            assert(response.status === "GENERAL_ERROR" && response.message === "general error from API");

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response.message);
        });

        it("Sign in error", async function () {
            await page.evaluate(() =>
                localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD EMAIL_PASSWORD_SIGN_IN")
            );
            // Set values.
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
            ]);

            let [{ response }] = await Promise.all([submitFormReturnRequestAndResponse(page, SIGN_IN_API)]);

            assert(response.status === "GENERAL_ERROR" && response.message === "general error from API sign in");

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response.message);
        });

        it("Email exists error", async function () {
            await toggleSignInSignUp(page);
            await page.evaluate(() => localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD EMAIL_EXISTS"));
            // Set values.
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
                { name: "age", value: "20" },
            ]);

            const successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 3);

            const errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 1);
            let fieldErrors = await getFieldErrors(page);

            assert.deepStrictEqual(fieldErrors, ["general error from API email exists"]);
        });
    });

    describe("ThirdParty", function () {});

    describe("ThirdPartyEmailPassword", function () {});

    describe("Passwordless", function () {});

    describe("ThirdPartyPasswordless", function () {});
});
