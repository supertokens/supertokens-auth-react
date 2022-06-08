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
import fetch from "isomorphic-fetch";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getAuthPageHeaderText,
    screenshotOnFailure,
    clickForgotPasswordLink,
    getResetPasswordFormBackButton,
    waitForSTElement,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Email Password", function () {
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
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
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

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    });

    describe("Reset Password form back button", function () {
        it("Successfully redirects to Sign In screen when back button is clicked", async function () {
            await clickForgotPasswordLink(page);

            await waitForSTElement(page);
            const pathBeforeBackButtonClick = await page.evaluate(() => window.location.pathname);

            assert.equal(pathBeforeBackButtonClick, "/auth/reset-password");

            const backButton = await getResetPasswordFormBackButton(page);

            // assert that the back button exists
            assert.notEqual(backButton, null);
            assert.notEqual(backButton, undefined);

            await backButton.click();

            await waitForSTElement(page);
            const pathAfterBackButtonClick = await page.evaluate(() => window.location.pathname);

            assert.equal(pathAfterBackButtonClick, "/auth");

            const pageTitle = await getAuthPageHeaderText(page);

            assert.equal(pageTitle, "Sign In");
        });
    });
});
