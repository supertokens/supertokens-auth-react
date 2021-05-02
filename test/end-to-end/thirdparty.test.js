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
    assertNoSTComponents,
    generateState,
    clickOnProviderButton,
    loginWithGithub,
    loginWithFacebook,
    loginWithGoogle,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Third Party", function () {
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
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`);
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
    });

    describe("Third Party test", function () {
        // In case OAuth configs are not set locally.
        if (process.env.SKIP_OAUTH === "true") {
            return;
        }

        it("Successful signin with github", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await assertProviders(page);
            await clickOnProviderButton(page, "Github");
            await Promise.all([
                loginWithGithub(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to append to authorisation url
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to send to /signinup POST api
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS SIGN_IN",
                "ST_LOGS THIRD_PARTY ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SUCCESS",
            ]);
        });

        it("Successful signin with github and redirectToPath", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=/hello`);
            await assertProviders(page);
            await clickOnProviderButton(page, "Github");
            await Promise.all([
                loginWithGithub(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/hello");
        });

        it("Successful signin with facebook", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await assertProviders(page);
            await clickOnProviderButton(page, "Facebook");
            await Promise.all([
                loginWithFacebook(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to append to authorisation url
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to send to /signinup POST api
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS SIGN_IN",
                "ST_LOGS THIRD_PARTY ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SUCCESS",
            ]);
        });

        it("Successful signin with google", async function () {
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            await assertProviders(page);
            await clickOnProviderButton(page, "Google");
            await Promise.all([
                loginWithGoogle(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to append to authorisation url
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL GET_REDIRECT_URL", // to send to /signinup POST api
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS SIGN_IN",
                "ST_LOGS THIRD_PARTY ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SUCCESS",
            ]);
        });
    });

    describe("Third Party callback error tests", function () {
        it("No state", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SIGN_IN_AND_UP"]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdparty&error=no_query_state");
        });

        it("Invalid nonce", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid: "thirdparty",
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NOT_NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SIGN_IN_AND_UP"]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdparty&error=state_mismatch");
        });

        it("Wrong provider", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid: "thirdparty",
                    thirdPartyId: "google",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SIGN_IN_AND_UP"]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdparty&error=provider_mismatch");
        });

        it("Unknown provider", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid: "thirdparty",
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/unknown?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, []);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/callback/unknown");
            await assertNoSTComponents(page);
        });

        it("Expired state", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid: "thirdparty",
                    thirdPartyId: "google",
                    expiresAt: Date.now() - 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SIGN_IN_AND_UP"]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdparty&error=state_expired");
        });

        it("No code params", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid: "thirdparty",
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, ["ST_LOGS THIRD_PARTY GET_REDIRECTION_URL SIGN_IN_AND_UP"]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdparty&error=no_code");
        });
    });
});
