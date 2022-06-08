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
    submitForm,
    defaultSignUp,
    sendVerifyEmail,
    signUp,
    logoutFromEmailVerification,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import {
    TEST_SERVER_BASE_URL,
    SIGN_UP_API,
    SIGN_IN_API,
    TEST_CLIENT_BASE_URL,
    RESET_PASSWORD_TOKEN_API,
    SEND_VERIFY_EMAIL_API,
    SIGN_OUT_API,
} from "../constants";

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

        it("Generate password reset token error", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);

            await page.evaluate(() =>
                localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD SEND_RESET_PASSWORD_EMAIL")
            );

            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);

            // Submit.
            const [{ response }] = await Promise.all([
                submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API),
            ]);

            assert.deepStrictEqual(response, {
                status: "GENERAL_ERROR",
                message: "general error from API reset password",
            });

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response.message);
        });

        it("Consume reset password token error", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?token=TOKEN`);

            await page.evaluate(() => localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD SUBMIT_NEW_PASSWORD"));

            // Set password mismatch
            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "Str0ngP@ssw0rd" },
            ]);

            // Submit.
            await submitForm(page);

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, "general error from API reset password consume");
        });
    });

    describe("Email verification", function () {
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
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
        });

        it("Sending email verification error", async function () {
            await page.evaluate(() => localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_PASSWORD SEND_VERIFY_EMAIL"));

            // first we sign up so that we have a session are on the email verification page
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            let [, response] = await Promise.all([
                defaultSignUp(page),
                page.waitForResponse(
                    (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
                ),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");

            response = await response.json();

            // even though the API returns a general error on mount, we do not show that
            // in the UI
            assert.deepStrictEqual(response, {
                status: "GENERAL_ERROR",
                message: "general error from API email verification code",
            });

            let generalError = await page.evaluate(
                (value) =>
                    document
                        .querySelector("#supertokens-root")
                        .shadowRoot.querySelector(`[data-supertokens~='${value}']`),
                "generalError"
            );
            assert.deepStrictEqual(generalError, null);

            // now we click the resend button, which should show in the UI:
            await sendVerifyEmail(page);
            let response1 = await page.waitForResponse(
                (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
            );

            response1 = await response1.json();

            assert.deepStrictEqual(response1, {
                status: "GENERAL_ERROR",
                message: "general error from API email verification code",
            });

            generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response1.message);
        });

        it("Test general error during sign out", async function () {
            await toggleSignInSignUp(page);
            await page.evaluate(() => localStorage.setItem("SHOW_GENERAL_ERROR", "SESSION SIGN_OUT"));

            const rid = "emailpassword";
            await signUp(
                page,
                [
                    { name: "email", value: "john.doe2@supertokens.io" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                    { name: "name", value: "John Doe" },
                    { name: "age", value: "20" },
                ],
                '{"formFields":[{"id":"email","value":"john.doe2@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}',
                rid
            );

            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");

            await logoutFromEmailVerification(page);

            let response1 = await page.waitForResponse(
                (response) => response.url() === SIGN_OUT_API && response.status() === 200
            );

            response1 = await response1.json();

            assert.deepStrictEqual(response1, {
                status: "GENERAL_ERROR",
                message: "general error from signout API",
            });

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response1.message);
        });
    });

    describe("Session", function () {});

    describe("ThirdParty", function () {});

    describe("ThirdPartyEmailPassword", function () {});

    describe("Passwordless", function () {});

    describe("ThirdPartyPasswordless", function () {});
});
