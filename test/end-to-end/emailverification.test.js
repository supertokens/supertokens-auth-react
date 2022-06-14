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
import { SEND_VERIFY_EMAIL_API, VERIFY_EMAIL_API, TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    clickLinkWithRightArrow,
    getVerificationEmailErrorTitle,
    getVerificationEmailErrorMessage,
    getVerificationEmailTitle,
    getTextByDataSupertokens,
    getLatestURLWithToken,
    setInputValues,
    submitForm,
    sendVerifyEmail,
    getGeneralSuccess,
    getGeneralError,
    toggleSignInSignUp,
    defaultSignUp,
    signUp,
    screenshotOnFailure,
    waitForText,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

describe("SuperTokens Email Verification", function () {
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
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
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

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        if (page) {
            await page.close();
        }
    });

    describe("Email verification screen", function () {
        beforeEach(async function () {
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

        it("Should redirect to login page when email verification screen is accessed without a valid session", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
        });

        it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            await defaultSignUp(page);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION SEND_VERIFICATION_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
            ]);
        });

        it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified and then post verification should redirect with original redirectPath and newUser", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
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

            // we wait for email to be created
            await new Promise((r) => setTimeout(r, 1000));

            // we fetch the email verification link and go to that
            const latestURLWithToken = await getLatestURLWithToken();
            await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.goto(latestURLWithToken)]);

            // click on the continue button
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            // check that we are in /redirect-here
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/redirect-here");
        });

        it("Should redirect to verify email screen on successful sign in when mode is REQUIRED and email is not verified", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
            ]);
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await new Promise((r) => setTimeout(r, 2000));
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            // Click on resend email should show "Email Resent" success message
            await sendVerifyEmail(page);
            await page.waitForResponse(
                (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
            );
            const generalSuccess = await getGeneralSuccess(page);
            assert.deepStrictEqual(generalSuccess, "Email resent");

            // Click on Logout should remove session and redirect to login page
            await Promise.all([clickLinkWithRightArrow(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_IN",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_IN",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION SEND_VERIFICATION_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION SEND_VERIFICATION_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                "ST_LOGS SESSION OVERRIDE SIGN_OUT",
                "ST_LOGS SESSION PRE_API_HOOKS SIGN_OUT",
                "ST_LOGS SESSION ON_HANDLE_EVENT SIGN_OUT",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SIGN_IN_AND_UP",
            ]);
        });
    });
    describe("Verify Email with token screen", function () {
        beforeEach(async function () {
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

        it("Should show invalid token screen when token is invalid or expired", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
            await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
            await Promise.all([
                submitForm(page),
                page.waitForResponse((response) => response.url() === VERIFY_EMAIL_API && response.status() === 200),
            ]);

            await waitForText(page, "[data-supertokens~=headerTinyTitle]", "The email verification link has expired");
            // Click Continue should redirect to /auth when no session is present
            await Promise.all([clickLinkWithRightArrow(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SIGN_IN_AND_UP",
            ]);
        });

        it("Should ask for user interaction when token is valid with no session", async function () {
            const latestURLWithToken = await getLatestURLWithToken();
            await page.goto(latestURLWithToken);
            await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
            await submitForm(page);

            await waitForText(page, "[data-supertokens~=headerTitle]", "Email verification successful!");

            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT EMAIL_VERIFIED_SUCCESSFUL",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SIGN_IN_AND_UP",
            ]);
        });

        it('Should show "Email Verification successful" screen when token is valid with an active session', async function () {
            await toggleSignInSignUp(page);
            await signUp(
                page,
                [
                    { name: "email", value: "john.doe3@supertokens.io" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                    { name: "name", value: "John Doe" },
                    { name: "age", value: "20" },
                ],
                '{"formFields":[{"id":"email","value":"john.doe3@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}',
                "emailpassword"
            );

            const latestURLWithToken = await getLatestURLWithToken();
            await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.goto(latestURLWithToken)]);
            const title = await getTextByDataSupertokens(page, "headerTitle");
            assert.deepStrictEqual(title, "Email verification successful!");
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await page.waitForSelector(".sessionInfo-user-id");
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION SEND_VERIFICATION_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT EMAIL_VERIFIED_SUCCESSFUL",
                "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
            ]);
        });

        it("Should allow to verify an email without a valid session", async function () {
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
            await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
            await Promise.all([
                submitForm(page),
                page.waitForResponse((response) => response.url() === VERIFY_EMAIL_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS VERIFY_EMAIL",
            ]);
        });
    });
    describe("Email Verified", function () {
        beforeEach(async function () {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?mode=REQUIRED`);
        });
        it("Should redirect to onSuccessfulRedirect when email is already verified", async function () {
            // TODO.
        });
    });
});

describe("SuperTokens Email Verification server errors", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`);
    });

    after(async function () {
        await browser.close();
    });

    describe("Verify Email with token screen", function () {
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
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        });

        it('Should show "Something went wrong" screen when API failure', async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN`);
            await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
            await Promise.all([
                submitForm(page),
                page.waitForResponse((response) => response.url() === VERIFY_EMAIL_API && response.status() === 500),
            ]);
            await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
            const verificationEmailErrorTitle = await getVerificationEmailErrorTitle(page);
            assert.deepStrictEqual(verificationEmailErrorTitle, "!\nSomething went wrong");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION VERIFY_EMAIL",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS VERIFY_EMAIL",
            ]);
        });
    });
});

describe("SuperTokens Email Verification general errors", function () {
    let browser;
    let page;
    let consoleLogs;
    const generalErrorMessageString = "General Error";

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
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
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

    describe("Verify Email with token screen", function () {
        beforeEach(async function () {
            page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on("request", (req) => {
                if (req.url().includes("/auth/user/email/verify") && req.method() === "POST") {
                    return req.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "GENERAL_ERROR",
                            message: generalErrorMessageString,
                        }),
                    });
                }

                req.continue();
            });
            consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        });

        it('Should show "General Error" when API returns "GENERAL_ERROR"', async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN`);
            await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
            await Promise.all([
                submitForm(page),
                page.waitForResponse((response) => response.url() === VERIFY_EMAIL_API && response.status() === 200),
            ]);
            await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
            const verificationEmailErrorTitle = await getVerificationEmailErrorTitle(page);
            const verificationEmailErrorMessage = await getVerificationEmailErrorMessage(page);
            assert.deepStrictEqual(verificationEmailErrorTitle, "!\nSomething went wrong");
            assert.deepStrictEqual(verificationEmailErrorMessage, generalErrorMessageString);
        });
    });

    describe("Send verification email screen", function () {
        beforeEach(async function () {
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

        it('Should show "General Error" when API returns "GENERAL_ERROR"', async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            await defaultSignUp(page);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            /**
             * This adds interception mid test because adding it before conflicted with
             * interceptors for defaultSignUp
             */
            await page.setRequestInterception(true);
            page.on("request", (req) => {
                if (req.url().includes("/auth/user/email/verify/token") && req.method() === "POST") {
                    return req.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "GENERAL_ERROR",
                            message: generalErrorMessageString,
                        }),
                    });
                }

                req.continue();
            });
            await sendVerifyEmail(page);
            await page.waitForResponse(
                (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
            );
            await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
            const generalError = await getGeneralError(page);
            assert.deepStrictEqual(generalError, generalErrorMessageString);
        });
    });
});

describe("SuperTokens Email Verification isEmailVerified server error", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        // Start server.
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

    after(async function () {
        await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);
    });

    describe("Verify Email with token screen", function () {
        beforeEach(async function () {
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

        // TODO: this test doesn't actually work cause it doesn't stop the server... strange
        // it("Should ignore email verification when isEmailVerified server request fails", async function () {
        //     await Promise.all([
        //         page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
        //         page.waitForNavigation({ waitUntil: "networkidle0" }),
        //     ]);
        //     await toggleSignInSignUp(page);
        //     await defaultSignUp(page);

        //     // Stop server.
        //     await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
        //         method: "POST",
        //     }).catch(console.error);

        //     // No redirection to /auth/veirfy-email if API call fails.
        //     await Promise.all([
        //         page.goto(`${TEST_CLIENT_BASE_URL}/dashboard?mode=REQUIRED`),
        //         page.waitForNavigation({ waitUntil: "networkidle0" }),
        //     ]);
        //     const pathname = await page.evaluate(() => window.location.pathname);
        //     assert.deepStrictEqual(pathname, "/dashboard");

        //     assert.deepStrictEqual(consoleLogs, [
        //         "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
        //         "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
        //         "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
        //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
        //         "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
        //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
        //         "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
        //         "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
        //         "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL VERIFY_EMAIL",
        //         "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION SEND_VERIFICATION_EMAIL",
        //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS SEND_VERIFY_EMAIL",
        //         "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
        //         "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
        //         "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
        //         "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
        //         "ST_LOGS SESSION OVERRIDE GET_USER_ID",
        //         "ST_LOGS EMAIL_PASSWORD OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED",
        //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS IS_EMAIL_VERIFIED",
        //     ]);
        // });
    });
});
