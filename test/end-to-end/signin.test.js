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
import puppeteer from "puppeteer";
import {
    clearBrowserCookies,
    getLogoutButton,
    getSubmitFormButtonLabel,
    getPlaceholders,
    getLabelsText,
    setInputValue,
    getGeneralError,
    getFieldErrors,
    clickForgotPasswordLink,
    submitForm,
    getInputNames,
    toggleSignInSignUp
} from "../helpers";
import fetch from "isomorphic-fetch";
import { successfulSignUp } from "./signup.test";
import { SOMETHING_WENT_WRONG_ERROR, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Consts.
 */
const SIGN_IN_API = `${TEST_SERVER_BASE_URL}/auth/signin`;

/*
 * Tests.
 */
describe("SuperTokens SignIn feature/theme", function() {
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
        await clearBrowserCookies(page);
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
    });

    describe("SignIn test (default)", function() {
        it("Should contain email and password fields only", async function() {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email", "password"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, ["Your Email:", "Password:"]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, ["Your work email", "Password"]);
        });

        it('Should switch between signup and sign in widget when "Sign Up" is clicked.', async function() {
            await toggleSignInSignUp(page);

            let buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "SIGN UP");

            await toggleSignInSignUp(page);

            buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "SIGN IN");
        });

        it('Should switch to resetPassword when "Forgot password" is clicked.', async function() {
            await clickForgotPasswordLink(page);
            const buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "Email me");
        });

        it("Should return fields are not optional error fields when sign in without filling the form", async function() {
            await submitForm(page);

            // Assert.
            const formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Field is not optional", "Field is not optional"]);
        });

        it("Should show error messages with incorrect inputs", async function() {
            // Set values.
            await setInputValue(page, "email", "invalid_email");

            await submitForm(page);

            // // Assert.
            let formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Email is invalid", "Field is not optional"]);

            // Set values.
            await setInputValue(page, "email", "john@gmail.com");
            await setInputValue(page, "password", "********");

            await submitForm(page);

            // Assert Request.
            const signInRequest = await page.waitForRequest(
                request => request.url() === SIGN_IN_API && request.method() === "POST"
            );
            assert.strictEqual(signInRequest.headers().rid, "emailpassword");
            assert.strictEqual(
                signInRequest.postData(),
                '{"formFields":[{"id":"email","value":"john@gmail.com"},{"id":"password","value":"********"}]}'
            );

            // Assert Response.
            const signInResponse = await page.waitForResponse(response => {
                return response.url() === SIGN_IN_API && response.status() === 200;
            });
            const responseData = await signInResponse.json();
            assert.strictEqual(responseData.status, "WRONG_CREDENTIALS_ERROR");

            // Assert wrong credentials
            formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, []);
            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR);
        });

        it("Successful Sign In", async function() {
            await toggleSignInSignUp(page);
            await successfulSignUp(page);
            await clearBrowserCookies(page);

            let cookies = await page.cookies();
            assert.deepStrictEqual(cookies, []); // Make sure cookies were removed.

            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);

            // Set correct values.
            await setInputValue(page, "email", "john.doe@supertokens.io");
            await setInputValue(page, "password", "Str0ngP@ssw0rd");

            // Submit.
            await submitForm(page);

            // Assert Request.
            const signInRequest = await page.waitForRequest(
                request => request.url() === SIGN_IN_API && request.method() === "POST"
            );
            assert.strictEqual(signInRequest.headers().rid, "emailpassword");
            assert.strictEqual(
                signInRequest.postData(),
                '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"}]}'
            );

            // Assert Response.
            const signInResponse = await page.waitForResponse(response => {
                return response.url() === SIGN_IN_API && response.status() === 200;
            });
            const responseData = await signInResponse.json();
            assert.strictEqual(responseData.status, "OK");
            await page.waitForNavigation({ waitUntil: "networkidle0" });

            // Verify cookies were set.
            cookies = await page.cookies();
            assert.deepStrictEqual(cookies.map(c => c.name), [
                "sIRTFrontend",
                "sFrontToken",
                "sIdRefreshToken",
                "sAccessToken"
            ]);

            await new Promise(r => setTimeout(r, 500)); // Make sure to wait for navigation. TODO Make more robust.
            // Redirected to onSuccessFulRedirectUrl
            const onSuccessFulRedirectUrl = "/dashboard";
            let pathname = await page.evaluate(() => window.location.pathname);
            // Session.doesSessionExist returns true, allow to stay on /dashboard
            assert.deepStrictEqual(pathname, onSuccessFulRedirectUrl);

            // Test that sessionInfo was fetched successfully using axios and fetch (i.e. Interceptors work)
            const axiosUserId = await page.evaluate(
                () =>
                    document.querySelector("#root > div > div.page > div > div.axios > ul > li.sessionInfo-user-id")
                        .innerText
            );
            const axiosSessionHandle = await page.evaluate(
                () =>
                    document.querySelector(
                        "#root > div > div.page > div > div.axios > ul > li.sessionInfo-session-handle"
                    ).innerText
            );

            const fetchUserId = await page.evaluate(
                () =>
                    document.querySelector("#root > div > div.page > div > div.fetch > ul > li.sessionInfo-user-id")
                        .innerText
            );
            const fetchSessionHandle = await page.evaluate(
                () =>
                    document.querySelector(
                        "#root > div > div.page > div > div.fetch > ul > li.sessionInfo-session-handle"
                    ).innerText
            );

            assert.deepStrictEqual(axiosUserId, fetchUserId);
            assert.deepStrictEqual(axiosSessionHandle, fetchSessionHandle);

            const isUUIDRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            assert.deepStrictEqual(isUUIDRegexp.test(axiosUserId), true);
            assert.deepStrictEqual(isUUIDRegexp.test(axiosSessionHandle), true);

            // Logout
            const logoutButton = await getLogoutButton(page);
            await logoutButton.click();
            await page.waitForNavigation();
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            cookies = await page.cookies();
            assert.deepStrictEqual(cookies, []); // Make sure cookies were removed on logout.
        });
    });
});

describe("SuperTokens SignIn feature/theme => Server Error", function() {
    let browser;
    let page;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });

        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
    });

    after(async function() {
        await browser.close();
    });

    it("Server Error shows Something went wrong general error", async function() {
        await setInputValue(page, "email", "john.doe@supertokens.io");
        await setInputValue(page, "password", "Str0ngP@ssw0rd");

        await submitForm(page);

        await page.waitForResponse(response => {
            return response.url() === SIGN_IN_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
    });
});

describe("SuperTokens SignIn feature/theme callbacks", function() {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });

        page = await browser.newPage();

        // Catch console.log sent from ST callbacks.
        page.on("console", consoleObj => {
            const log = consoleObj.text();
            if (log.startsWith("ST_CALLBACKS")) {
                consoleLogs.push(log);
            }
        });
    });

    after(async function() {
        await browser.close();
    });

    beforeEach(async function() {
        consoleLogs = [];
        clearBrowserCookies(page);
        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth`);
    });

    it("Call doesSessionExist callback on load if provided", async function() {
        assert.deepStrictEqual(consoleLogs, ["ST_CALLBACKS Does session exist props session:false"]);
    });

    it("Sign In using custom callbacks", async function() {
        // Set values.
        await setInputValue(page, "email", "john.doe");
        await setInputValue(page, "password", "Str0ngP@ssw0rd");

        await submitForm(page);

        // Use front end validation first before calling custom API.
        const formFieldsErrors = await getFieldErrors(page);
        assert.deepStrictEqual(formFieldsErrors, ["Email is invalid"]);

        // Update email and retry.
        await setInputValue(page, "email", "john.doe@supertokens.io");
        await submitForm(page);
        await page.waitForNavigation({ waitUntil: "networkidle0" });

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS Does session exist props session:false",
            "ST_CALLBACKS onCallSignInAPI, email:john.doe@supertokens.io password:Str0ngP@ssw0rd rid:emailpassword",
            "ST_CALLBACKS onHandleSuccess SIGN_IN_COMPLETE email:john.doe@supertokens.io id:1"
        ]);
        consoleLogs = [];

        // Redirected to onSuccessFulRedirectUrl
        let pathname = await page.evaluate(() => window.location.pathname);
        // Session.doesSessionExist returns true, allow to stay on /dashboard
        assert.deepStrictEqual(pathname, "/custom-success-redirect");

        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth`);

        pathname = await page.evaluate(() => window.location.pathname);
        // Custom props doesSessionExist returns true, redirect to /dashboard
        assert.deepStrictEqual(pathname, "/custom-success-redirect");

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS Does session exist props session:true",
            "ST_CALLBACKS onHandleSuccess SESSION_ALREADY_EXISTS"
        ]);
    });

    it("Sign up using custom callbacks", async function() {
        await toggleSignInSignUp(page);

        // Set values.
        await setInputValue(page, "email", "john.doe@supertokens.io");
        await setInputValue(page, "password", "weakpassword");
        await setInputValue(page, "name", "John Doe");
        await setInputValue(page, "age", "20");

        await submitForm(page);

        // Use front end validation first before calling custom API.
        const formFieldsErrors = await getFieldErrors(page);
        assert.deepStrictEqual(formFieldsErrors, ["Password must contain at least one number"]);

        await setInputValue(page, "password", "Str0ngP@ssw0rd");
        await submitForm(page);

        await page.waitForNavigation({ waitUntil: "networkidle0" });

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS Does session exist props session:false",
            "ST_CALLBACKS onCallSignUpAPI, email:john.doe@supertokens.io password:Str0ngP@ssw0rd rid:emailpassword",
            "ST_CALLBACKS onHandleSuccess SIGN_UP_COMPLETE email:john.doe@supertokens.io id:1"
        ]);

        consoleLogs = [];

        // Redirected to onSuccessFulRedirectUrl
        let pathname = await page.evaluate(() => window.location.pathname);
        // Session.doesSessionExist returns true, allow to stay on /dashboard
        assert.deepStrictEqual(pathname, "/custom-success-redirect");

        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth`);

        pathname = await page.evaluate(() => window.location.pathname);
        // Do not login on signup, custom props doesSessionExist returns false
        assert.deepStrictEqual(pathname, "/custom/auth");

        assert.deepStrictEqual(consoleLogs, ["ST_CALLBACKS Does session exist props session:false"]);
    });

    it("Call onHandleForgotPasswordClicked callback on forgotPassword clicked if provided", async function() {
        await clickForgotPasswordLink(page);
        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS Does session exist props session:false",
            "ST_CALLBACKS will redirect to ForgotPassword"
        ]);
        // Redirected to onSuccessFulRedirectUrl
        const pathname = await page.evaluate(() => window.location.pathname);
        // Session.doesSessionExist returns true, allow to stay on /dashboard
        assert.deepStrictEqual(pathname, "/custom/auth/reset-password");
    });
});
