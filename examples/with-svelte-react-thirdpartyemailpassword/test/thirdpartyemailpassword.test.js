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
import {
    assertProviders,
    clickOnProviderButton,
    defaultSignUp,
    toggleSignInSignUp,
    loginWithAuth0,
} from "../../../test/helpers";
import { SIGN_IN_UP_API } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Third Party Email Password", function () {
    let browser;
    let page;

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    describe("Third Party Email Password test", function () {
        it("Successful signup with credentials", async function () {
            await toggleSignInSignUp(page);
            await defaultSignUp(page, "thirdpartyemailpassword");
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
        });

        it("Successful signin/up with auth0", async function () {
            await assertProviders(page);
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
        });
    });
});
