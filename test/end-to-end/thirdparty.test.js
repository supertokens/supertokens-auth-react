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
    assertProviders,
    assertNoSTComponents,
    generateState,
    clickOnProviderButton,
    loginWithAuth0,
    getGeneralError,
    waitFor,
    screenshotOnFailure,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API } from "../constants";

describe("SuperTokens Third Party", function () {
    getThirdPartyTestCases({
        authRecipe: "thirdparty",
        rid: "thirdparty",
        logId: "THIRD_PARTY",
        signInUpPageLoadLogs: [],
        thirdPartySignInUpLog: "SIGN_IN_AND_UP",
    });
});

export function getThirdPartyTestCases({ authRecipe, rid, logId, signInUpPageLoadLogs, thirdPartySignInUpLog }) {
    let browser;
    let page;
    let consoleLogs = [];

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
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=${authRecipe}`);
    });

    after(async function () {
        await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
    });

    describe("Third Party test", function () {
        it("Successful signin with Auth0", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                ...signInUpPageLoadLogs,
                `ST_LOGS ${logId} OVERRIDE GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE`,
                `ST_LOGS ${logId} OVERRIDE SET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_AUTHORISATION_URL`,
                `ST_LOGS ${logId} PRE_API_HOOKS GET_AUTHORISATION_URL`,
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`, // we add this twice because useMemo in getRoutingComponent is called twice during developmet,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} PRE_API_HOOKS THIRD_PARTY_SIGN_IN_UP`,
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });

        it("Successful signin with Auth0 and email verification", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                ...signInUpPageLoadLogs,
                `ST_LOGS ${logId} OVERRIDE GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE`,
                `ST_LOGS ${logId} OVERRIDE SET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_AUTHORISATION_URL`,
                `ST_LOGS ${logId} PRE_API_HOOKS GET_AUTHORISATION_URL`,
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} PRE_API_HOOKS THIRD_PARTY_SIGN_IN_UP`,
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED`,
                `ST_LOGS ${logId} PRE_API_HOOKS IS_EMAIL_VERIFIED`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                `ST_LOGS ${logId} OVERRIDE EMAIL_VERIFICATION IS_EMAIL_VERIFIED`,
                `ST_LOGS ${logId} PRE_API_HOOKS IS_EMAIL_VERIFIED`,
            ]);
        });

        it("Successful signin with auth0 and redirectToPath", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=/hello`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/hello");
        });

        it("Successful signin with auth0 and redirectToPath case sensitive", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2FCasE%2FCase-SensItive1-PAth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/CasE/Case-SensItive1-PAth");
        });

        // it("Successful signin with facebook", async function () {
        //     await Promise.all([
        //         page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        //         page.waitForNavigation({ waitUntil: "networkidle0" }),
        //     ]);
        //     await assertProviders(page);
        //     await clickOnProviderButton(page, "Facebook");
        //     await Promise.all([
        //         loginWithFacebook(page),
        //         page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
        //     ]);
        //     const pathname = await page.evaluate(() => window.location.pathname);
        //     assert.deepStrictEqual(pathname, "/dashboard");
        //     assert.deepStrictEqual(consoleLogs, [
        //         "ST_LOGS ${logId} PRE_API_HOOKS GET_AUTHORISATION_URL",
        //         "ST_LOGS ${logId} PRE_API_HOOKS SIGN_IN_UP",
        //         "ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS",
        //         "ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS",
        //     ]);
        // });

        // it("Successful signin with google", async function () {
        //     await Promise.all([
        //         page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        //         page.waitForNavigation({ waitUntil: "networkidle0" }),
        //     ]);
        //     await assertProviders(page);
        //     await clickOnProviderButton(page, "Google");
        //     await Promise.all([
        //         loginWithGoogle(page),
        //         page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
        //     ]);
        //     const pathname = await page.evaluate(() => window.location.pathname);
        //     assert.deepStrictEqual(pathname, "/dashboard");
        //     assert.deepStrictEqual(consoleLogs, [
        //         "ST_LOGS ${logId} PRE_API_HOOKS GET_AUTHORISATION_URL",
        //         "ST_LOGS ${logId} PRE_API_HOOKS SIGN_IN_UP",
        //         "ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS",
        //         "ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS",
        //     ]);
        // });

        it("field error on sign in up with translation key", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);

            await page.setRequestInterception(true);
            const requestHandler = (request) => {
                if (request.method() === "POST" && request.url() === SIGN_IN_UP_API) {
                    request.respond({
                        status: 200,
                        contentType: "application/json",
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "FIELD_ERROR",
                            error: "THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS",
                        }),
                    });
                    page.off("request", requestHandler);
                    page.setRequestInterception(false);
                } else {
                    request.continue();
                }
            };
            page.on("request", requestHandler);
            await clickOnProviderButton(page, "Auth0");
            await loginWithAuth0(page);
            const error = await getGeneralError(page);
            assert.deepStrictEqual(error, "Terms of Service");
        });

        it("field error on sign in up with non-translation key", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertProviders(page);

            await page.setRequestInterception(true);
            const requestHandler = (request) => {
                if (request.method() === "POST" && request.url() === SIGN_IN_UP_API) {
                    request.respond({
                        status: 200,
                        contentType: "application/json",
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "FIELD_ERROR",
                            error: "Test message!!!!",
                        }),
                    });
                    page.off("request", requestHandler);
                    page.setRequestInterception(false);
                } else {
                    request.continue();
                }
            };
            page.on("request", requestHandler);

            await clickOnProviderButton(page, "Auth0");
            await loginWithAuth0(page);

            const error = await getGeneralError(page);
            assert.deepStrictEqual(error, "Test message!!!!");
        });
    });

    describe("Third Party callback error tests", function () {
        it("No state", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                ...signInUpPageLoadLogs,
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert(search.endsWith("&error=signin"));
        });

        it("Invalid nonce", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid,
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NOT_NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                ...signInUpPageLoadLogs,
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert(search.endsWith("&error=signin"));
        });

        it("Wrong provider", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid,
                    thirdPartyId: "google",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                ...signInUpPageLoadLogs,
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert(search.endsWith("&error=signin"));
        });

        it("Unknown provider", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid,
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/unknown?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/callback/unknown");
            await assertNoSTComponents(page);
        });

        it("Expired state", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid,
                    thirdPartyId: "google",
                    expiresAt: Date.now() - 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                ...signInUpPageLoadLogs,
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert(search.endsWith("&error=signin"));
        });

        it("No code params", async function () {
            await generateState(
                {
                    state: "NONCE",
                    rid,
                    thirdPartyId: "github",
                    expiresAt: Date.now() + 10000,
                },
                page
            );

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github?state=NONCE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH", // This is the callback page load
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} OVERRIDE ${thirdPartySignInUpLog}`,
                `ST_LOGS ${logId} OVERRIDE GET_OAUTH_STATE`,
                `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                ...signInUpPageLoadLogs,
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert(search.endsWith("&error=signin"));
        });
    });
}
