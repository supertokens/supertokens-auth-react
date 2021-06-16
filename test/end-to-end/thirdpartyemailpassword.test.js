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
import {
    clearBrowserCookies,
    assertProviders,
    clickOnProviderButton,
    defaultSignUp,
    getUserIdWithFetch,
    getLogoutButton,
    signUp,
    toggleSignInSignUp,
    loginWithGithub,
    getLoginWithRedirectToSignIn,
    getLoginWithRedirectToSignUp,
    getAuthPageHeaderText,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Third Party Email Password", function () {
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

    beforeEach(async function () {
        consoleLogs = [];
        await clearBrowserCookies(page);
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`);
    });

    describe("redirectToAuth test", function () {
        it("Show signin first", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}`);
            let elem = await getLoginWithRedirectToSignIn(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation();
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign In");
        });

        it("Show signup first", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}`);
            let elem = await getLoginWithRedirectToSignUp(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation();
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign Up");
        });
    });

    describe("Third Party Email Password test", function () {
        it("Successful signup with credentials", async function () {
            await toggleSignInSignUp(page);
            await defaultSignUp(page, "thirdpartyemailpassword");
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
        });

        // In case OAuth configs are not set locally.
        if (process.env.SKIP_OAUTH === "true") {
            return;
        }

        it("Successful signin/up with github", async function () {
            await assertProviders(page);
            await clickOnProviderButton(page, "Github");
            await Promise.all([
                loginWithGithub(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS SIGN_IN",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
            ]);
        });

        it("No account consolidation", async function () {
            // 1. Sign up with credentials
            await toggleSignInSignUp(page);
            await signUp(
                page,
                [
                    { name: "email", value: "bradparishdoh@gmail.com" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                    { name: "name", value: "John Doe" },
                    { name: "age", value: "20" },
                ],
                '{"formFields":[{"id":"email","value":"bradparishdoh@gmail.com"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}',
                "thirdpartyemailpassword"
            );
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            const emailPasswordUserId = await getUserIdWithFetch(page);
            const logoutButton = await getLogoutButton(page);
            await Promise.all([await logoutButton.click(), page.waitForNavigation()]);

            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            // 2. Sign in with github with same address.
            await clickOnProviderButton(page, "Github");
            await Promise.all([
                loginWithGithub(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            const thirdPartyUserId = await getUserIdWithFetch(page);

            // 3. Compare userIds
            assert.notDeepStrictEqual(thirdPartyUserId, emailPasswordUserId);
        });
    });

    describe("Third Party callback error tests", function () {
        it("No state (Duplicate from third party)", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD GET_REDIRECTION_URL SIGN_IN_AND_UP",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
                "ST_LOGS SESSION OVERRIDE DOES_SESSION_EXIST",
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdpartyemailpassword&error=signin");
        });
    });
});
