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
    screenshotOnFailure,
    toggleSignInSignUp,
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
    assertProviders,
    clickOnProviderButton,
    clickOnProviderButtonWithoutWaiting,
    loginWithMockProvider,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    backendHook,
    createCoreApp,
    waitForUrl,
} from "../helpers";

import {
    TEST_SERVER_BASE_URL,
    SIGN_UP_API,
    SIGN_IN_API,
    TEST_CLIENT_BASE_URL,
    RESET_PASSWORD_TOKEN_API,
    SEND_VERIFY_EMAIL_API,
    SIGN_OUT_API,
    GET_AUTH_URL_API,
    SIGN_IN_UP_API,
} from "../constants";

let browser;
let page;
let consoleLogs;

describe("General error rendering", function () {
    before(async function () {
        const _isGeneralErrorSupported = await isGeneralErrorSupported();
        if (!_isGeneralErrorSupported) {
            this.skip();
        }

        await backendHook("before");
        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        await createCoreApp();
        page = await browser.newPage();

        consoleLogs = [];
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await page?.close();
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    describe("EmailPassword", function () {
        getEmailPasswordTests("emailpassword", "EMAIL_PASSWORD");
    });

    describe("Email verification", function () {
        beforeEach(async function () {
            await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
        });

        it("Sending email verification error", async function () {
            await page.evaluate(() =>
                localStorage.setItem("SHOW_GENERAL_ERROR", "EMAIL_VERIFICATION SEND_VERIFY_EMAIL")
            );

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
            await waitForUrl(page, "/auth/verify-email");

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

            await waitForUrl(page, "/auth/verify-email");

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

    describe("ThirdParty", function () {
        getThirdPartyTests("thirdparty", "THIRD_PARTY");
    });

    describe("ThirdPartyEmailPassword", function () {
        getEmailPasswordTests("thirdpartyemailpassword", "THIRD_PARTY_EMAIL_PASSWORD");
        getThirdPartyTests("thirdpartyemailpassword", "THIRD_PARTY_EMAIL_PASSWORD");
    });

    describe("ThirdPartyPasswordless", function () {
        getThirdPartyTests("thirdpartypasswordless", "THIRD_PARTY_PASSWORDLESS");
    });

    /**
     * NOTE:
     *
     * This section is not needed because general error tests are already included for
     * create, resend and consume code in passwordless.test.js
     */
    // describe("Passwordless", function () {});

    /**
     * NOTE:
     *
     * This section is not needed because we already test for signOut throwing
     * general error in the Email verification block
     */
    // describe("Session", function () {});
});

function getEmailPasswordTests(rid, ridForStorage) {
    describe("Email Password Tests", function () {
        beforeEach(async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=${rid}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
        });

        it("Sign up error", async function () {
            await toggleSignInSignUp(page);
            await setGeneralErrorToLocalStorage(ridForStorage, "EMAIL_PASSWORD_SIGN_UP", page);

            // Set values.
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
                { name: "age", value: "20" },
            ]);

            let [{ response }] = await Promise.all([submitFormReturnRequestAndResponse(page, SIGN_UP_API)]);

            assert(response.status === "GENERAL_ERROR" && response.message === "general error from API sign up");

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response.message);
        });

        it("Sign in error", async function () {
            await setGeneralErrorToLocalStorage(ridForStorage, "EMAIL_PASSWORD_SIGN_IN", page);

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
            await setGeneralErrorToLocalStorage(ridForStorage, "EMAIL_EXISTS", page);

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
            await setGeneralErrorToLocalStorage(ridForStorage, "SEND_RESET_PASSWORD_EMAIL", page);

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
            await setGeneralErrorToLocalStorage(ridForStorage, "SUBMIT_NEW_PASSWORD", page);

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
}

function getThirdPartyTests(rid, ridForStorage) {
    describe("Third Party Tests", function () {
        beforeEach(async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=${rid}`);
            await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
        });

        it("Test general errors when fetching authorization url", async function () {
            await setGeneralErrorToLocalStorage(ridForStorage, "GET_AUTHORISATION_URL", page);

            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await assertProviders(page);

            let [_, response1] = await Promise.all([
                clickOnProviderButtonWithoutWaiting(page, "Mock Provider"),
                page.waitForResponse(
                    (response) =>
                        response.url().includes(GET_AUTH_URL_API) &&
                        response.request().method() === "GET" &&
                        response.status() === 200
                ),
            ]);

            response1 = await response1.json();

            assert.deepStrictEqual(response1, {
                status: "GENERAL_ERROR",
                message: "general error from API authorisation url get",
            });

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response1.message);
        });

        it("Test general errors when calling signinup", async function () {
            await setGeneralErrorToLocalStorage(ridForStorage, "THIRD_PARTY_SIGN_IN_UP", page);

            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await assertProviders(page);
            await clickOnProviderButton(page, "Mock Provider");

            let [_, response1] = await Promise.all([
                loginWithMockProvider(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);

            response1 = await response1.json();

            assert.deepStrictEqual(response1, {
                status: "GENERAL_ERROR",
                message: "general error from API sign in up",
            });

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, response1.message);
        });
    });
}
