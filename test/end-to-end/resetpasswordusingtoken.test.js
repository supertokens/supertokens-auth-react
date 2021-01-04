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
    EMAIL_EXISTS_API,
    RESET_PASSWORD_API,
    RESET_PASSWORD_TOKEN_API,
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL
} from "../constants";
import { RESET_PASSWORD_INVALID_TOKEN_ERROR } from "../../lib/build/constants";
import {
    clearBrowserCookies,
    getFieldErrors,
    getGeneralError,
    getInputNames,
    getLabelsText,
    getPlaceholders,
    getSuccessInputAdornments,
    getSubmitFormButtonLabel,
    getResendResetPasswordEmailLink,
    hasMethodBeenCalled,
    sendEmailResetPasswordSuccessMessage,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe.only("SuperTokens Reset password feature/theme", function() {
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

        // Sign Up first.
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
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

    describe("Reset password enter email form test", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);
        });

        it("Should send reset password for valid email", async function() {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, []); // No labels.

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, ["Your work email"]); // Email placeholder as defined in signUpForm.formFields.

            // Set incorrect email.
            await setInputValues(page, [{ name: "email", value: "john.doe.io" }]);

            const formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["!\nEmail is invalid"]);

            let adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 0);

            // Set values.
            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);

            adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 1);

            // Submit.
            const [{ request, response }, hasEmailExistMethodBeenCalled] = await Promise.all([
                submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API)
            ]);

            // Assert Request.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);
            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.strictEqual(request.postData(), '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"}]}');

            // Assert Response.
            assert.strictEqual(response.status, "OK");

            // Assert success page.
            const successMessage = await sendEmailResetPasswordSuccessMessage(page);

            assert.deepStrictEqual(successMessage, "Please check your email for the password recovery link. Resend");

            // Click on "resend => go back to form.
            const resendResetPasswordEmailLink = await getResendResetPasswordEmailLink(page);
            await resendResetPasswordEmailLink.click();
            const buttonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(buttonLabel, "Email me");
        });
    });

    describe("Reset password new password form test", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?token=TOKEN`);
        });

        it("Should return error form fields if password is in incorrect format", async function() {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["password", "confirm-password"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, []); // No labels.

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, ["New password", "Confirm your password"]); // Email placeholder as defined in signUpForm.formFields.

            let adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 0);

            // Set incorrect values.
            await setInputValues(page, [
                { name: "password", value: "password" },
                { name: "confirm-password", value: "password" }
            ]);

            adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 0);

            // Front end validation
            let formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, [
                "!\nPassword must contain at least one number",
                "!\nPassword must contain at least one number"
            ]);

            // Set password mismatch
            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "Str0ngP@ssw0rdButMismatch" }
            ]);

            adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 2);

            // Submit.
            await submitForm(page);

            formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["!\nConfirmation password doesn't match"]);

            // Set correct values.
            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "Str0ngP@ssw0rd" }
            ]);

            adornments = await getSuccessInputAdornments(page);
            assert.strictEqual(adornments.length, 2);

            // Submit.
            const { request, response } = await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

            // Assert Request.
            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.deepStrictEqual(
                request.postData(),
                '{"formFields":[{"id":"password","value":"Str0ngP@ssw0rd"}],"token":"TOKEN"}'
            );

            // Assert Invalid token response.
            assert.strictEqual(response.status, "RESET_PASSWORD_INVALID_TOKEN_ERROR");
            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, RESET_PASSWORD_INVALID_TOKEN_ERROR);
        });

        it("Should reset password successfully and redirect to onSuccessRedirectURL if token is defined", async function() {
            // TODO? How to test this without a valid token?
        });
    });
});

describe("SuperTokens ResetPassword feature/theme callbacks", function() {
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
        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth/reset-password`, { waitUntil: "domcontentloaded" });
    });

    it("Should use custom callback props", async function() {
        // Send Email.
        await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
        await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS onCallSendResetEmailAPI,  email:john.doe@supertokens.io",
            "ST_CALLBACKS onHandleSuccess RESET_PASSWORD_EMAIL_SENT"
        ]);

        let pathname = await page.evaluate(() => window.location.pathname);
        assert.deepStrictEqual(pathname, "/custom-success-redirect");

        consoleLogs = [];
        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth/reset-password?token=TOKEN`);

        // Set password mismatch
        await setInputValues(page, [
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "confirm-password", value: "Str0ngP@ssw0rdButMismatch" }
        ]);

        // Submit.
        await submitForm(page);

        // Use front end validators before calling API.
        const formFieldsErrors = await getFieldErrors(page);
        assert.deepStrictEqual(formFieldsErrors, ["!\nConfirmation password doesn't match"]);

        await setInputValues(page, [{ name: "confirm-password", value: "Str0ngP@ssw0rd" }]);
        await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS onCallSubmitNewPasswordAPI, password:Str0ngP@ssw0rd token:TOKEN",
            "ST_CALLBACKS onHandleSuccess PASSWORD_RESET_SUCCESSFUL"
        ]);

        pathname = await page.evaluate(() => window.location.pathname);
        // Session.doesSessionExist returns true, allow to stay on /dashboard
        assert.deepStrictEqual(pathname, "/custom-success-redirect");
    });
});
