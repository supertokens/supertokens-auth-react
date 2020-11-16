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
import { spawn } from "child_process";
import puppeteer from "puppeteer";
import { ST_ROOT_CONTAINER, DEFAULT_WEBSITE_BASE_PATH } from "../../lib/build/constants";
import { assertShouldShowSignInAndUpWidget, assertShouldShowResetPasswordWidget } from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL } from "../constants";

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
            const superTokensComponent = await page.$(`.${ST_ROOT_CONTAINER}`);
            assert.strictEqual(superTokensComponent, null);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth?rid=emailpassword should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth?rid=unknown-rid should load first component (sign in widget)", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`);
            await assertShouldShowResetPasswordWidget(page, true, true);
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`);
            await assertShouldShowResetPasswordWidget(page, true, false);
        });

        it("/auth/unknown-path should redirect to /auth", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });
    });

    describe("without react-router-dom", function() {
        it("/about should not load any SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/about?router=no-router`);
            const superTokensComponent = await page.$(`.${ST_ROOT_CONTAINER}`);
            assert.strictEqual(superTokensComponent, null);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?router=no-router`);
            await assertShouldShowResetPasswordWidget(page, true, true);
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
            const page = await browser.newPage();
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&router=no-router`
            );
            await assertShouldShowResetPasswordWidget(page, true, false);
        });

        it("/auth?rid=emailpassword should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=emailpassword&router=no-router`
            );
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth?rid=unknown-rid should load first SuperTokens components that matches", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=unknown`);
            const pathname = await page.evaluate(() => window.location.pathname);
            await assert.strictEqual(pathname, DEFAULT_WEBSITE_BASE_PATH);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/auth/unknown-path should redirect to /auth", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path?router=no-router`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });

        it("/custom-supertokens-login should load SignIn SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/custom-supertokens-login`);
            await assertShouldShowSignInAndUpWidget(page, true);
        });
    });
});
