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
import assert from "assert";
import puppeteer from "puppeteer";
import {
    clearBrowserCookies,
    clickForgotPasswordLink,
    getFieldErrors,
    getGeneralError,
    getInputNames,
    getInputTypes,
    getLogoutButton,
    getLabelsText,
    getPlaceholders,
    getShowPasswordIcon,
    getSubmitFormButtonLabel,
    getInputAdornmentsSuccess,
    hasMethodBeenCalled,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse,
    toggleShowPasswordIcon,
    toggleSignInSignUp,
    getInputAdornmentsError
} from "../helpers";
import fetch from "isomorphic-fetch";
import { successfulSignUp } from "./signup.test";
import { SOMETHING_WENT_WRONG_ERROR, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { EMAIL_EXISTS_API, SIGN_IN_API, TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignIn feature/theme", function() {
    let browser;
    let page;
    let consoleLogs;
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
        consoleLogs = [];
        page.on("console", consoleObj => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        await clearBrowserCookies(page);
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
        await toggleSignInSignUp(page);
        assert.deepStrictEqual(consoleLogs, []);
    });

    describe("SignIn test (default)", function() {
        it("Should contain email and password fields only", async function() {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email", "password"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, ["Your Email:", "Password:"]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, ["Your work email", "Password"]);

            const adornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornments.length, 0);
            assert.deepStrictEqual(consoleLogs, []);
        });

        it('Should switch between signup and sign in widget when "Sign Up" is clicked.', async function() {
            await toggleSignInSignUp(page);

            let buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "SIGN UP");

            await toggleSignInSignUp(page);

            buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "SIGN IN");
            assert.deepStrictEqual(consoleLogs, []);
        });

        it('Should switch to resetPassword when "Forgot password" is clicked.', async function() {
            await clickForgotPasswordLink(page);
            const buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "Email me");
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS GET_REDIRECTION_URL RESET_PASSWORD"]);
        });

        it("Should show error messages with incorrect inputs", async function() {
            // Set incorrect values.
            await setInputValues(page, [
                { name: "email", value: "invalid_email" },
                { name: "password", value: "********" }
            ]);

            let adornmentsSuccess = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornmentsSuccess.length, 0);

            let adornmentsError = await getInputAdornmentsError(page);
            assert.strictEqual(adornmentsError.length, 0);

            await submitForm(page);
            // // Assert.
            let formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Email is invalid"]);

            // Set values.
            await setInputValues(page, [
                { name: "email", value: "john@gmail.com" },
                { name: "password", value: "********" }
            ]);

            adornmentsSuccess = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornmentsSuccess.length, 0);

            adornmentsError = await getInputAdornmentsError(page);
            assert.strictEqual(adornmentsError.length, 0);

            // Submit.
            const { request, response } = await submitFormReturnRequestAndResponse(page, SIGN_IN_API);

            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.strictEqual(
                request.postData(),
                '{"formFields":[{"id":"email","value":"john@gmail.com"},{"id":"password","value":"********"}]}'
            );

            assert.strictEqual(response.status, "WRONG_CREDENTIALS_ERROR");

            // Assert wrong credentials
            formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, []);
            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS PRE_API_HOOKS SIGN_IN"]);
        });

        it("Successful Sign In", async function() {
            await toggleSignInSignUp(page);
            await successfulSignUp(page);
            await clearBrowserCookies(page);

            let cookies = await page.cookies();
            assert.deepStrictEqual(cookies, []); // Make sure cookies were removed.

            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await toggleSignInSignUp(page);

            let showPasswordIcon = await getShowPasswordIcon(page);
            assert.strictEqual(showPasswordIcon, null);
            let types = await getInputTypes(page);
            assert.deepStrictEqual(types, ["email", "password"]);

            // Set correct values.
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" }
            ]);

            showPasswordIcon = await getShowPasswordIcon(page);
            assert.notStrictEqual(showPasswordIcon, null);

            await toggleShowPasswordIcon(page);
            types = await getInputTypes(page);
            assert.deepStrictEqual(types, ["email", "text"]);

            const adornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornments.length, 0);

            // Submit.
            const [{ request, response }, hasEmailExistMethodBeenCalled] = await Promise.all([
                submitFormReturnRequestAndResponse(page, SIGN_IN_API),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API),
                page.waitForNavigation({ waitUntil: "networkidle0" })
            ]);

            // Verify that email exists API has not been called.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);

            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.strictEqual(
                request.postData(),
                '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"}]}'
            );

            assert.strictEqual(response.status, "OK");

            // Verify cookies were set.
            cookies = await page.cookies();
            assert.deepStrictEqual(cookies.map(c => c.name), [
                "sIRTFrontend",
                "sFrontToken",
                "sIdRefreshToken",
                "sAccessToken"
            ]);

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
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS PRE_API_HOOKS SIGN_UP",
                "ST_LOGS ON_HANDLE_EVENT SIGN_UP_COMPLETE",
                "ST_LOGS GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS PRE_API_HOOKS SIGN_IN",
                "ST_LOGS ON_HANDLE_EVENT SIGN_IN_COMPLETE",
                "ST_LOGS GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS PRE_API_HOOKS SIGN_OUT"
            ]);
        });
    });
});

describe("SuperTokens SignIn feature/theme => Server Error", function() {
    let browser;
    let page;
    let consoleLogs;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
    });

    beforeEach(async function() {
        page = await browser.newPage();
        await clearBrowserCookies(page);
        consoleLogs = [];
        page.on("console", consoleObj => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
        await toggleSignInSignUp(page);
    });

    it("Server Error shows Something went wrong general error", async function() {
        await setInputValues(page, [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" }
        ]);

        await submitForm(page);

        await page.waitForResponse(response => {
            return response.url() === SIGN_IN_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
        assert.deepStrictEqual(consoleLogs, ["ST_LOGS PRE_API_HOOKS SIGN_IN"]);
    });
});
