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
import { spawn } from "child_process";
import puppeteer from "puppeteer";
import { DEFAULT_WEBSITE_BASE_PATH } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL } from "../constants";
import { getSubmitFormButtonLabel, assertNoSTComponents } from "../helpers";
/*
 * Tests.
 */
describe("SuperTokens Routing in Test App", function() {
    let browser;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
    });

    describe("using react-router-dom", function() {
        it("/about should not load any SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/about`);
            await assertNoSTComponents(page);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth?rid=emailpassword should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth?rid=unknown-rid should load first component (sign up widget)", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Email me");
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Change password");
        });

        it("/auth/unknown-path should not render any ST component", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`);
            await assertNoSTComponents(page);
        });
    });

    describe("without react-router-dom", function() {
        it("/about should not load any SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/about?router=no-router`);
            await assertNoSTComponents(page);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?router=no-router`);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Email me");
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
            const page = await browser.newPage();
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&router=no-router`
            );
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Change password");
        });

        it("/auth?rid=emailpassword should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=emailpassword&router=no-router`
            );
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth?rid=unknown-rid should load first SuperTokens components that matches", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=unknown`);
            const pathname = await page.evaluate(() => window.location.pathname);
            await assert.strictEqual(pathname, DEFAULT_WEBSITE_BASE_PATH);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });

        it("/auth/unknown-path should not render any ST component", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path?router=no-router`);
            await assertNoSTComponents(page);
        });

        it("/custom-supertokens-login should load SignIn SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/custom-supertokens-login`);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN UP");
        });
    });
});
