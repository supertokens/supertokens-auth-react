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
    setInputValue,
    getFieldErrors,
    toggleSignInSignUp,
    getInputNames,
    submitForm
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Consts.
 */
const SIGN_UP_API = `${TEST_SERVER_BASE_URL}/auth/signup`;

/*
 * Tests.
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
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, { waitUntil: "domcontentloaded" });

        await toggleSignInSignUp(page);
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

        it("Should return fields are not optional error fields when sign up without filling the form", async function() {
            await submitForm(page);

            // Assert.
            const formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Field is not optional",
                "Field is not optional",
                "Field is not optional",
                "Field is not optional"
            ]);
        });

        it("Should show error messages", async function() {
            // Set values.
            await setInputValue(page, "email", "john@doe");
            await setInputValue(page, "password", "test123");
            await setInputValue(page, "name", "John Doe");
            await setInputValue(page, "age", "17");

            await submitForm(page);

            // // Assert.
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Email is invalid",
                "Password must contain at least 8 characters, including a number",
                "You must be over 18 to register"
            ]);

            // Remove error on focus
            await setInputValue(page, "age", "15");
            // Wait 500ms because the form fields  clean after 500ms to prevent UI glitches.
            await new Promise(r => setTimeout(r, 500));

            // // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Email is invalid",
                "Password must contain at least 8 characters, including a number"
            ]);

            await setInputValue(page, "password", "Str0ngP@ssw0rd");

            await submitForm(page);

            // // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["Email is invalid", "You must be over 18 to register"]);
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

            // deosSessionExist return true, hence, redirecting to onSuccessFulRedirectUrl
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            const onSuccessFulRedirectUrl = "/dashboard";
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.strictEqual(pathname, onSuccessFulRedirectUrl);
        });
    });
});

export async function successfulSignUp(page) {
    // Set values.
    await setInputValue(page, "email", "john.doe@supertokens.io");
    await setInputValue(page, "password", "Str0ngP@ssw0rd");
    await setInputValue(page, "name", "John Doe");
    await setInputValue(page, "age", "20");

    await submitForm(page);

    // Assert Request.
    const signUpRequest = await page.waitForRequest(SIGN_UP_API, { request: "POST" });
    assert.strictEqual(signUpRequest.headers().rid, "emailpassword");
    assert.strictEqual(
        signUpRequest.postData(),
        '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}'
    );

    // Assert Response.
    const signUpResponse = await page.waitForResponse(response => {
        return response.url() === SIGN_UP_API && response.status() === 200;
    });

    const responseData = await signUpResponse.json();
    assert.strictEqual(responseData.status, "OK");
    await page.waitForNavigation();

    const onSuccessFulRedirectUrl = "/dashboard";
    const pathname = await page.evaluate(() => window.location.pathname);
    assert.deepStrictEqual(pathname, onSuccessFulRedirectUrl);
}
