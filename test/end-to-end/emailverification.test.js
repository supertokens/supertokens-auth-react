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
import { SEND_VERIFY_EMAIL_API, VERIFY_EMAIL_API, TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import {
    clearBrowserCookies,
    clickLinkWithRightArrow,
    getVerificationEmailErrorTitle,
    getVerificationEmailTitle,
    setInputValues,
    submitForm,
    sendVerifyEmail,
    getGeneralSuccess,
    toggleSignInSignUp
} from "../helpers";

import { successfulSignUp } from "./signup.test";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */

describe("SuperTokens Email Verification feature/theme", function() {
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
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`);
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

    describe("Email verification screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", consoleObj => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            clearBrowserCookies(page);
        });

        it("Should redirect to login page when email verification screen is accessed without a valid session", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email`);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
        });

        it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await successfulSignUp(page);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS PRE_API_HOOKS SIGN_UP",
                "ST_LOGS ON_HANDLE_EVENT SIGN_UP_COMPLETE",
                "ST_LOGS GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS SEND_VERIFY_EMAIL"
            ]);
        });

        it("Should redirect to verify email screen on successful sign in when mode is REQUIRED and email is not verified", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" }
            ]);
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            // Click on resend email should show "Email Resent" success message
            await sendVerifyEmail(page);
            await page.waitForResponse(
                response => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
            );
            const generalSuccess = await getGeneralSuccess(page);
            assert.deepStrictEqual(generalSuccess, "Email resent");

            // Click on Logout should remove session and redirect to login page
            await Promise.all([clickLinkWithRightArrow(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS PRE_API_HOOKS SIGN_IN",
                "ST_LOGS ON_HANDLE_EVENT SIGN_IN_COMPLETE",
                "ST_LOGS GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS PRE_API_HOOKS IS_EMAIL_VERIFIED",
                "ST_LOGS GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS SIGN_OUT",
                "ST_LOGS GET_REDIRECTION_URL SIGN_IN_AND_UP"
            ]);
        });
    });
    describe("Verify Email with token screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", consoleObj => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            clearBrowserCookies(page);
        });

        it("Should show invalid token screen when token is invalid or expired", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
            await page.waitForResponse(response => response.url() === VERIFY_EMAIL_API && response.status() === 200);
            await new Promise(r => setTimeout(r, 50)); // Make sure to wait for status to update.
            const verificationEmailInvalidTokenText = await getVerificationEmailTitle(page);
            assert.deepStrictEqual(verificationEmailInvalidTokenText, "The email verification link has expired");

            // Click Continue should redirect to /auth when no session is present
            await Promise.all([clickLinkWithRightArrow(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS PRE_API_HOOKS VERIFY_EMAIL",
                "ST_LOGS GET_REDIRECTION_URL SIGN_IN_AND_UP"
            ]);
        });

        it('Should show "Email Verification successful" screen when token is valid', async function() {
            /*
             * TODO
             * - Should show \"Email Verification successful\" screen when token is valid
             * - Click on "Continue" redirects to onSuccessfulRedirect
             */
        });

        it("Should allow to verify an email without a valid session", async function() {
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS PRE_API_HOOKS VERIFY_EMAIL"]);
        });
    });
    describe("Email Verified", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", consoleObj => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?mode=REQUIRED`);
        });
        it("Should redirect to onSuccessfulRedirect when email is already verified", async function() {
            // TODO.
        });
    });
});

describe("SuperTokens Email Verification feature/theme server errors", function() {
    let browser;
    let page;
    let consoleLogs;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`);
    });

    after(async function() {
        await browser.close();
    });

    describe("Verify Email with token screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", consoleObj => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN`);
        });

        it('Should show "Something went wrong" screen when API failure', async function() {
            await page.waitForResponse(response => response.url() === VERIFY_EMAIL_API && response.status() === 500);
            await new Promise(r => setTimeout(r, 50)); // Make sure to wait for status to update.
            const verificationEmailErrorTitle = await getVerificationEmailErrorTitle(page);
            assert.deepStrictEqual(verificationEmailErrorTitle, "!\n Something went wrong");
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS PRE_API_HOOKS VERIFY_EMAIL"]);
        });
    });
});

describe("SuperTokens Email Verification isEmailVerified server error", function() {
    let browser;
    let page;
    let consoleLogs;

    before(async function() {
        // Start server.
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
    });

    describe("Verify Email with token screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            consoleLogs = [];
            page.on("console", consoleObj => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            clearBrowserCookies(page);
        });

        it("Should ignore email verification when isEmailVerified server request fails", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`);
            await successfulSignUp(page);

            // Stop server.
            await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                method: "POST"
            }).catch(console.error);

            // No redirection to /auth/veirfy-email if API call fails.
            await page.goto(`${TEST_CLIENT_BASE_URL}/dashboard?mode=REQUIRED`);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS PRE_API_HOOKS SIGN_UP",
                "ST_LOGS ON_HANDLE_EVENT SIGN_UP_COMPLETE",
                "ST_LOGS GET_REDIRECTION_URL VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS SEND_VERIFY_EMAIL",
                "ST_LOGS PRE_API_HOOKS IS_EMAIL_VERIFIED"
            ]);
        });
    });
});
