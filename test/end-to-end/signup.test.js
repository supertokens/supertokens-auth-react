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
import fetch from "isomorphic-fetch";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLabelsText,
    getInputNames,
    getPlaceholders,
    getInputAdornmentsSuccess,
    getFieldErrors,
    hasMethodBeenCalled,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    defaultSignUp,
    getLoginWithRedirectToSignIn,
    getAuthPageHeaderText,
    getLoginWithRedirectToSignUp,
    screenshotOnFailure,
    getGeneralError,
    waitForSTElement,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import {
    EMAIL_EXISTS_API,
    SIGN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
} from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignUp", function () {
    let browser;
    let page;
    let consoleLogs;

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
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
    });

    after(async function () {
        await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await toggleSignInSignUp(page);
    });

    describe("redirectToAuth test", function () {
        it("Show signin first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignIn(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign In");
        });

        it("Show signup first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignUp(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign Up");
        });
    });

    describe("SignUp test ", function () {
        it("Should contain form fields as defined in SuperTokens.init call", async function () {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email", "password", "name", "age", "country"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, [
                "Your Email *",
                "Password *",
                "Full name *",
                "Your age *",
                "Your Country",
            ]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, [
                "Your work email",
                "Password",
                "First name and last name",
                "How old are you?",
                "Where do you live?",
            ]);

            const adornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornments.length, 0);
            assert.deepStrictEqual(consoleLogs, []);
        });

        it("Should show error messages", async function () {
            await submitForm(page);
            // Assert.
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Field is not optional",
                "Field is not optional",
                "Field is not optional",
                "Field is not optional",
            ]);

            // Set values with errors.
            await setInputValues(page, [
                { name: "email", value: "john@doe" },
                { name: "password", value: "test123" },
                { name: "name", value: "" },
                { name: "age", value: "17" },
            ]);

            // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Email is invalid",
                "Password must contain at least 8 characters, including a number",
                "You must be over 18 to register",
            ]);

            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
            ]);

            await submitForm(page);

            // // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["Email is invalid", "You must be over 18 to register"]);
            /**
             * This is because form validations now occur on the frontend side of things and not
             * in the recipe implementation. Which means that when you get a field error the recipe
             * implementation function does not actually get called
             */
            assert.deepStrictEqual(consoleLogs, []);
        });

        it("Successful signup", async function () {
            await defaultSignUp(page);
            const onSuccessFulRedirectUrl = "/dashboard";
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, onSuccessFulRedirectUrl);

            const cookies = await page.cookies();

            let cookieNames = cookies.map((c) => c.name);
            assert(cookieNames.filter((i) => i === "sIRTFrontend").length === 1);
            assert(cookieNames.filter((i) => i === "sFrontToken").length === 1);
            assert(cookieNames.filter((i) => i === "sIdRefreshToken").length === 1);
            assert(cookieNames.filter((i) => i === "sAccessToken").length === 1);
            assert(cookieNames.length === 4);

            // doesSessionExist return true, hence, redirecting to success URL
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, {
                waitUntil: "networkidle0",
            });

            pathname = await page.evaluate(() => window.location.pathname);
            assert.strictEqual(pathname, onSuccessFulRedirectUrl);

            // Clear cookies, try to signup with same address.
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, {
                waitUntil: "networkidle0",
            });
            await toggleSignInSignUp(page);

            // Set values.
            const [, hasEmailExistMethodBeenCalled] = await Promise.all([
                setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API),
            ]);

            // Assert.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["This email already exists. Please sign in instead"]);

            await setInputValues(page, [{ name: "email", value: "jane.doe@supertokens.io" }]);
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, []);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SESSION_ALREADY_EXISTS",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
            ]);
        });
    });
});

describe("SuperTokens SignUp => Server Error", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
    });

    after(async function () {
        await browser.close();
    });

    beforeEach(async function () {
        page = await browser.newPage();
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        await toggleSignInSignUp(page);
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    it("Server Error shows Something went wrong general error", async function () {
        await setInputValues(page, [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
        ]);
        await submitForm(page);

        await page.waitForResponse((response) => {
            return response.url() === SIGN_UP_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
    });

    it("should clear errors when switching to sign in", async function () {
        await setInputValues(page, [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
        ]);
        await submitForm(page);

        await page.waitForResponse((response) => {
            return response.url() === SIGN_UP_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
        await toggleSignInSignUp(page);
        await waitForSTElement(page, "[data-supertokens~=generalError]", true);
    });
});
