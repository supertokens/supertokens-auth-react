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
import { ST_ROOT_ID } from "../../lib/build/constants";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import { RESET_PASSWORD_INVALID_TOKEN_ERROR } from "../../lib/build/constants";
import {
    clearBrowserCookies,
    getResendResetPasswordEmailLink,
    sendEmailResetPasswordSuccessMessage,
    getPlaceholders,
    getLabelsText,
    setInputValue,
    getGeneralError,
    submitForm,
    getFieldErrors,
    getSubmitFormButtonLabel,
    getInputNames
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

const RESET_PASSWORD_TOKEN_API = `${TEST_SERVER_BASE_URL}/auth/user/password/reset/token`;
const RESET_PASSWORD_API = `${TEST_SERVER_BASE_URL}/auth/user/password/reset`;

/*
 * Tests.
 */
describe("SuperTokens Reset password feature/theme", function() {
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

            // Set values.
            await setInputValue(page, "email", "john.doe@supertokens.io");

            // Submit.
            await submitForm(page);

            // Assert Request.
            const sendEmailResetPasswordRequest = await page.waitForRequest(RESET_PASSWORD_TOKEN_API, {
                request: "POST"
            });
            assert.strictEqual(sendEmailResetPasswordRequest.headers().rid, "emailpassword");
            assert.strictEqual(
                sendEmailResetPasswordRequest.postData(),
                '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"}]}'
            );

            // Assert Response.
            const sendEmailResetPasswordResponse = await page.waitForResponse(response => {
                return response.url() === RESET_PASSWORD_TOKEN_API && response.status() === 200;
            });
            const responseData = await sendEmailResetPasswordResponse.json();
            assert.strictEqual(responseData.status, "OK");

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

            // Set incorrect values.
            await setInputValue(page, "password", "password");
            await setInputValue(page, "confirm-password", "password");

            // Submit.
            await submitForm(page);

            // Front end validation
            let formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, [
                "Password must contain at least one number",
                "Password must contain at least one number"
            ]);

            // Set password mismatch
            await setInputValue(page, "password", "Str0ngP@ssw0rd");
            await setInputValue(page, "confirm-password", "Str0ngP@ssw0rdButMismatch");

            // Submit.
            await submitForm(page);

            formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Confirmation password doesn't match"]);

            // Set correct values.
            await setInputValue(page, "confirm-password", "Str0ngP@ssw0rd");

            // Submit.
            await submitForm(page);

            // Assert Request.
            const newPasswordResetPasswordRequest = await page.waitForRequest(RESET_PASSWORD_API, { request: "POST" });
            assert.strictEqual(newPasswordResetPasswordRequest.headers().rid, "emailpassword");
            assert.deepStrictEqual(
                newPasswordResetPasswordRequest.postData(),
                '{"formFields":[{"id":"password","value":"Str0ngP@ssw0rd"}],"token":"TOKEN"}'
            );

            // Assert Response.
            const sendEmailResetPasswordResponse = await page.waitForResponse(response => {
                return response.url() === RESET_PASSWORD_API && response.status() === 200;
            });

            // Assert Invalid token response.
            const responseData = await sendEmailResetPasswordResponse.json();
            assert.strictEqual(responseData.status, "RESET_PASSWORD_INVALID_TOKEN_ERROR");
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
        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth/reset-password`);
    });

    it("Should use custom callback props", async function() {
        // Send Email.
        await setInputValue(page, "email", "john.doe@supertokens.io");
        await submitForm(page);
        await page.waitForNavigation({ waitUntil: "networkidle0" });

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS onCallSendResetEmailAPI,  email:john.doe@supertokens.io",
            "ST_CALLBACKS onHandleSuccess RESET_PASSWORD_EMAIL_SENT"
        ]);

        let pathname = await page.evaluate(() => window.location.pathname);
        assert.deepStrictEqual(pathname, "/custom-success-redirect");

        consoleLogs = [];
        await page.goto(`${TEST_CLIENT_BASE_URL}/custom/auth/reset-password?token=TOKEN`);

        // Set password mismatch
        await setInputValue(page, "password", "Str0ngP@ssw0rd");
        await setInputValue(page, "confirm-password", "Str0ngP@ssw0rdButMismatch");

        // Submit.
        await submitForm(page);

        // Use front end validators before calling API.
        const formFieldsErrors = await getFieldErrors(page);
        assert.deepStrictEqual(formFieldsErrors, ["Confirmation password doesn't match"]);

        await setInputValue(page, "confirm-password", "Str0ngP@ssw0rd");
        await submitForm(page);

        await page.waitForNavigation({ waitUntil: "networkidle0" });

        assert.deepStrictEqual(consoleLogs, [
            "ST_CALLBACKS onCallSubmitNewPasswordAPI, password:Str0ngP@ssw0rd token:TOKEN",
            "ST_CALLBACKS onHandleSuccess PASSWORD_RESET_SUCCESSFUL"
        ]);

        pathname = await page.evaluate(() => window.location.pathname);
        // Session.doesSessionExist returns true, allow to stay on /dashboard
        assert.deepStrictEqual(pathname, "/custom-success-redirect");
    });
});
