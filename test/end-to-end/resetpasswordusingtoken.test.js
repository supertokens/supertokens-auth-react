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
import fetch from "isomorphic-fetch";
import {
    EMAIL_EXISTS_API,
    RESET_PASSWORD_API,
    RESET_PASSWORD_TOKEN_API,
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
} from "../constants";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getInputAdornmentsError,
    getFieldErrors,
    getGeneralError,
    getInputNames,
    getLabelsText,
    getLatestURLWithToken,
    getPlaceholders,
    getInputAdornmentsSuccess,
    getSubmitFormButtonLabel,
    getTextByDataSupertokens,
    getResendResetPasswordEmailLink,
    hasMethodBeenCalled,
    sendEmailResetPasswordSuccessMessage,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse,
    toggleSignInSignUp,
    defaultSignUp,
    screenshotOnFailure,
    getAuthPageHeaderText,
    getResetPasswordFormBackButton,
    waitForSTElement,
    getResetPasswordSuccessBackToSignInButton,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Reset password", function () {
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

        // Sign Up first.
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await toggleSignInSignUp(page);
        await defaultSignUp(page);
    });

    after(async function () {
        await browser.close();

        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST",
        }).catch(console.error);
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    describe("Reset password enter email form test", function () {
        beforeEach(async function () {
            page = await browser.newPage();
            consoleLogs = [];
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);
        });

        it("Should redirect to Sign In screen when back button is clicked", async function () {
            const backButton = await getResetPasswordFormBackButton(page);

            await backButton.click();

            const signInPageHeader = await waitForSTElement(page, "[data-supertokens='headerTitle']");

            // checks if the window path has changed to '/auth'
            const pathAfterBackButtonClick = await page.evaluate(() => window.location.pathname);
            assert.equal(pathAfterBackButtonClick, "/auth");

            // checks if the page title is 'Sign In'
            const pageTitle = await signInPageHeader.evaluate((header) => header.innerText);
            assert.equal(pageTitle, "Sign In");
        });

        it("Should send reset password for valid email", async function () {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, ["Email"]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, [""]);

            // Set incorrect email.
            await setInputValues(page, [{ name: "email", value: "john.doe.io" }]);

            const formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Email is invalid"]);

            let successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 0);

            let errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 1);

            // Set values.
            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);

            successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 1);

            errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 0);

            // Submit.
            const [{ request, response }, hasEmailExistMethodBeenCalled] = await Promise.all([
                submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API),
            ]);

            // Assert Request.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);
            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.strictEqual(request.postData(), '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"}]}');

            // Assert Response.
            assert.strictEqual(response.status, "OK");

            // Assert success page.
            const successMessage = await sendEmailResetPasswordSuccessMessage(page);

            assert.deepStrictEqual(
                successMessage,
                "A password reset email has been sent to john.doe@supertokens.io, if it exists in our system. Resend or change email"
            );

            // Click on "resend or change email" => go back to form.
            const resendResetPasswordEmailLink = await getResendResetPasswordEmailLink(page);
            await resendResetPasswordEmailLink.click();
            const buttonLabel = await getSubmitFormButtonLabel(page);
            assert.deepStrictEqual(buttonLabel, "Email me");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SEND_PASSWORD_RESET_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_RESET_PASSWORD_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT RESET_PASSWORD_EMAIL_SENT",
            ]);
        });

        it("Should redirect the user back to sign in screen when link is clicked on success page", async function () {
            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);

            // Submit.
            const [{ request, response }, hasEmailExistMethodBeenCalled] = await Promise.all([
                submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API),
            ]);

            // Assert Request.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);
            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.strictEqual(request.postData(), '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"}]}');

            // Assert Response.
            assert.strictEqual(response.status, "OK");

            // Assert success page.
            const successMessage = await sendEmailResetPasswordSuccessMessage(page);

            assert.deepStrictEqual(
                successMessage,
                "A password reset email has been sent to john.doe@supertokens.io, if it exists in our system. Resend or change email"
            );

            // click on "<- Sign in" button
            const backToSignInButton = await getResetPasswordSuccessBackToSignInButton(page);
            await backToSignInButton.click();

            // check if redirected to sign in form
            const buttonLabel = await getSubmitFormButtonLabel(page);
            assert.deepStrictEqual(buttonLabel, "SIGN IN");
        });
    });

    describe("Reset password new password form test", function () {
        beforeEach(async function () {
            page = await browser.newPage();
            // Catch console.log sent from PRE API HOOKS.
            consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?token=TOKEN`);
        });

        it("Should return error form fields if password is in incorrect format", async function () {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["password", "confirm-password"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, ["New password", "Confirm password"]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, ["New password", "Confirm your password"]); // Email placeholder as defined in signUpForm.formFields.

            let successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 0);

            let errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 0);

            // Set incorrect values.
            await setInputValues(page, [
                { name: "password", value: "password" },
                { name: "confirm-password", value: "password" },
            ]);

            successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 0);

            // Front end validation
            let formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, [
                "Password must contain at least one number",
                "Password must contain at least one number",
            ]);

            errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 2);

            // Set password mismatch
            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "Str0ngP@ssw0rdButMismatch" },
            ]);

            successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 2);

            // Submit.
            await submitForm(page);

            formFieldsErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldsErrors, ["Confirmation password doesn't match"]);
            errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 1);
            // Set correct values.
            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "Str0ngP@ssw0rd" },
            ]);

            successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 2);

            // Submit.
            const { request, response } = await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

            // Assert Request.
            assert.strictEqual(request.headers().rid, "emailpassword");
            assert.deepStrictEqual(
                request.postData(),
                '{"formFields":[{"id":"password","value":"Str0ngP@ssw0rd"}],"token":"TOKEN","method":"token"}'
            );

            // Assert Invalid token response.
            assert.strictEqual(response.status, "RESET_PASSWORD_INVALID_TOKEN_ERROR");
            const generalError = await getGeneralError(page);

            assert.deepStrictEqual(generalError, "Invalid password reset token");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SUBMIT_NEW_PASSWORD",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SUBMIT_NEW_PASSWORD",
            ]);
        });

        it("Should reset password successfully and redirect to success URL if token is defined", async function () {
            // Send reset password email.
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);
            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
            await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API);
            // Get valid token.
            const latestURLWithToken = await getLatestURLWithToken();
            await page.goto(latestURLWithToken);

            // Submit new password
            await setInputValues(page, [
                { name: "password", value: "NEW_Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "NEW_Str0ngP@ssw0rd" },
            ]);
            await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

            const title = await getTextByDataSupertokens(page, "headerTitle");
            assert.deepStrictEqual(title, "Success!");
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
        });
    });
});
