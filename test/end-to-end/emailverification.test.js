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
describe("SuperTokens Email Verification feature/theme", function() {
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

    describe("Email verification screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`);
        });

        it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified", async function() {});
        it("Should redirect to verify email screen on successful sign in when mode is REQUIRED and email is not verified", async function() {});
        it('Should resend email when "Resend Email" button is clicked', async function() {
            /*
             * TODO
             * - Click on resend email should show "Email Resent" success message
             * - Click on Logout should remove session and redirect to login page
             */
        });
        it("Should redirect to login page when email verification screen is accessed without a valid session", async function() {});
    });

    describe("Verify Email with token screen", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?mode=REQUIRED&token=TOKEN`);
        });

        it("Should show invalid token screen when token is invalid or expired", async function() {});
        it('Should show "Something went wrong" screen when API failure', async function() {});
        it('Should show "Email Verification successful" screen when token is valid', async function() {
            /*
             * TODO
             * - Should show \"Email Verification successful\" screen when token is valid
             * - Click on "Continue" redirects to onSuccessfulRedirect
             */
        });

        it("Should allow to verify a session without a valid session", async function() {});
    });

    describe("Email Verified", function() {
        beforeEach(async function() {
            page = await browser.newPage();
            clearBrowserCookies(page);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?mode=REQUIRED`);
        });

        it("Should redirect to onSuccessfulRedirect when email is already verified", async function() {});
    });
});
