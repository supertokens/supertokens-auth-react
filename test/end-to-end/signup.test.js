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
import assert from "assert";
import { spawn } from "child_process";
import puppeteer from "puppeteer";
import {
    clearBrowserCookies,
    getPlaceholders,
    getLabelsText,
    setInputValues,
    getFieldErrors,
    submitFormReturnRequestAndResponse,
    getInputNames,
    submitForm,
    isFormButtonDisabled
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Consts.
 */
const SIGN_UP_API = `${TEST_SERVER_BASE_URL}/auth/signup`;
const EMAIL_EXISTS_API = `${TEST_SERVER_BASE_URL}/email/exists`;

/*
 * Tests.
 * TODOs (inside current tests and not as new tests.)
 *  - Test that a Verify Email Exist API call is made on blur for SignUp.
 *  - Test that a Verify Email Exist API call is NOT made on blur for SignIn/ResetPassword.
 *  - Test this call is not made on signup clicked.
 *  - Try to register with same email after success should return error form field on blur.
 */
describe("SuperTokens SignUp feature/theme", function() {
    let browser;
    let page;

    before(async function() {
        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST"
        }).catch(console.error);

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST"
        }).catch(console.error);
    });

    beforeEach(async function() {
        page = await browser.newPage();
        clearBrowserCookies(page);
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
    });

    describe("SignUp test (default)", function() {
        it("Should contain form fields as defined in SuperTokens.init call", async function() {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email", "password", "name", "age", "country"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, [
                "Your Email: *",
                "Password: *",
                "Full name: *",
                "Your age: *",
                "Your Country:"
            ]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, [
                "Your work email",
                "Password",
                "First name and last name",
                "How old are you?",
                "Where do you live?"
            ]);
        });

        it("Should show error messages", async function() {
            // Form is disabled on init.
            let disabled = await isFormButtonDisabled(page);
            assert.strictEqual(disabled, true);

            // Set values with errors.
            await setInputValues(page, [
                { name: "email", value: "john@doe" },
                { name: "password", value: "test123" },
                { name: "name", value: "" },
                { name: "age", value: "17" }
            ]);
            disabled = await isFormButtonDisabled(page);
            assert.strictEqual(disabled, true);

            // // Assert.
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "!\nEmail is invalid",
                "!\nPassword must contain at least 8 characters, including a number",
                "!\nField is not optional",
                "!\nYou must be over 18 to register"
            ]);

            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" }
            ]);

            await submitForm(page);

            // // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["!\nEmail is invalid", "!\nYou must be over 18 to register"]);
        });

        it("Successful signup", async function() {
            await successfulSignUp(page);

            const cookies = await page.cookies();

            assert.deepStrictEqual(cookies.map(c => c.name), [
                "sIRTFrontend",
                "sFrontToken",
                "sIdRefreshToken",
                "sAccessToken"
            ]);
            // doesSessionExist return true, hence, redirecting to onSuccessFulRedirectUrl
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, { waitUntil: "domcontentloaded" });

            const onSuccessFulRedirectUrl = "/dashboard";
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.strictEqual(pathname, onSuccessFulRedirectUrl);
        });
    });
});

export async function successfulSignUp(page) {
    // Set values.
    await setInputValues(page, [
        { name: "email", value: "john.doe@supertokens.io" },
        { name: "password", value: "Str0ngP@ssw0rd" },
        { name: "name", value: "John Doe" },
        { name: "age", value: "20" }
    ]);

    const { request, response } = await submitFormReturnRequestAndResponse(page, SIGN_UP_API);

    assert.strictEqual(request.headers().rid, "emailpassword");
    assert.strictEqual(
        request.postData(),
        '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}'
    );

    const responseData = await response.json();
    assert.strictEqual(responseData.status, "OK");

    await new Promise(r => setTimeout(r, 500)); // Make sure to wait for navigation. TODO Make more robust.
    const onSuccessFulRedirectUrl = "/dashboard";
    const pathname = await page.evaluate(() => window.location.pathname);
    assert.deepStrictEqual(pathname, onSuccessFulRedirectUrl);
}
