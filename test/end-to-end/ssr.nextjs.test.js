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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getInputNames,
    getLabelsText,
    getTestEmail,
    getPlaceholders,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse,
    screenshotOnFailure,
    getTextInDashboardNoAuth,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
    waitForSTElement,
} from "../helpers";
import { TEST_CLIENT_BASE_URL } from "../constants";

const ACCESS_TOKEN_COOKIE_NAME = "sAccessToken";
const FRONT_TOKEN_COOKIE_NAME = "sFrontToken";
const REFRESH_TOKEN_COOKIE_NAME = "sRefreshToken";
const REDIRECT_ATTEMPT_MAX_COUNT = 5;
const REDIRECT_ATTEMPT_COUNT_COOKIE_NAME = "stSsrSessionRefreshAttempt";
const CURRENT_PATH_COOKIE_NAME = "sCurrentPath";
const REDIRECT_PATH_PARAM_NAME = "stRedirectTo";
const SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME = "sSessionRefreshed";
const SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME = "sSessionRevoked";

const email = getTestEmail("nextjs");
const password = "password123";

async function signOut(page) {
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
}

async function signIn(page) {
    await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: password },
    ]);
    await submitForm(page);
    await waitForUrl(page, "/");
}

function decodeFrontToken(frontToken) {
    return JSON.parse(decodeURIComponent(escape(atob(frontToken))));
}

function encodeFrontToken(frontToken) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(frontToken))));
}

async function didSessionRefresh(page) {
    const cookies = await page.cookies();
    const refreshTokenIndicatorCookie = cookies.find((c) => c.name === SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME);
    assert.equal(refreshTokenIndicatorCookie?.value, "true");
}

async function wasSessionRevoked(page) {
    let newCookies = await page.cookies();
    const refreshTokenIndicatorCookie = newCookies.find((c) => c.name === SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME);
    assert.equal(refreshTokenIndicatorCookie?.value, "true");
}

async function hasServerComponentUserId(page) {
    const userIdElement = await page.waitForSelector("[data-testid~=getServerComponentSession-userId]");
    const textContent = await userIdElement.evaluate((el) => el.textContent);
    assert.notEqual(textContent, "");
}

async function triggerServerAction(page) {
    const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
    await actionButton.click();
    await new Promise((res) => setTimeout(res, 1000));
    const userIdElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
    const textContent = await userIdElement.evaluate((el) => el.textContent);
    const [status, userId] = textContent.split(":");
    return { userId: userId.trim(), status: status.trim() };
}

describe("SuperTokens NextJS SSR", function () {
    let browser;
    let page;
    before(async function () {
        browser = await setupBrowser();
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?show=signup`);
        await setInputValues(page, [
            { name: "email", value: email },
            { name: "password", value: password },
        ]);
        await submitForm(page);
        await waitForUrl(page, "/");
        await signOut(page);
        await page.close();
    });

    beforeEach(async function () {
        page = await browser.newPage();
        const client = await page.target().createCDPSession();
        await client.send("Network.clearBrowserCookies");
        await client.send("Network.clearBrowserCache");
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
    });

    after(async function () {
        await browser?.close();
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await page?.close();
    });

    describe("NextJS SSR", function () {
        describe("getServerComponentSession", function () {
            it("refresh if the tokens do not match", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                assert.notEqual(frontTokenCookie.value, undefined);
                const decodedFrontToken = decodeFrontToken(frontTokenCookie.value);
                decodedFrontToken.up = {};
                page.setCookie({
                    ...frontTokenCookie,
                    value: encodeFrontToken(decodedFrontToken),
                });

                await page.reload();
                await Promise.all([didSessionRefresh(page), hasServerComponentUserId(page)]);
                await signOut(page);
            });

            it("show the user id if the session is valid", async function () {
                await signIn(page);
                await hasServerComponentUserId(page);
                await page.reload();
                await hasServerComponentUserId(page);
                await signOut(page);
            });

            it("refresh if the front token has expired", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                assert.notEqual(frontTokenCookie.value, undefined);
                const decodedFrontToken = decodeFrontToken(frontTokenCookie.value);
                decodedFrontToken.ate = Date.now() - 3600000;
                await page.setCookie({
                    ...frontTokenCookie,
                    value: encodeFrontToken(decodedFrontToken),
                });

                await page.reload();
                await Promise.all([didSessionRefresh(page), hasServerComponentUserId(page)]);
                await signOut(page);
            });

            it("refresh if the access token does not exist", async function () {
                await signIn(page);
                await page.deleteCookie({ name: ACCESS_TOKEN_COOKIE_NAME });

                await page.reload();
                await Promise.all([didSessionRefresh(page), hasServerComponentUserId(page)]);
                await signOut(page);
            });

            it("logout if the access token is invalid", async function () {
                await signIn(page);

                let cookies = await page.cookies();
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: ACCESS_TOKEN_COOKIE_NAME });
                await page.setCookie({
                    ...accessTokenCookie,
                    value: "invalid.access.token",
                });

                await page.reload();
                await wasSessionRevoked(page);
                await waitForUrl(page, "/auth");
            });

            it("logout if the front token does not exist", async function () {
                await signIn(page);
                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                await page.reload();
                await wasSessionRevoked(page);
                await waitForUrl(page, "/auth");
            });

            it("logout if the front token is invalid", async function () {
                await signIn(page);

                let cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                await page.setCookie({
                    ...frontTokenCookie,
                    value: "invalid.access.token",
                });

                await page.reload();
                await wasSessionRevoked(page);
                await waitForUrl(page, "/auth");
            });
        });

        describe("getServerActionSession", function () {
            it("show the user id if the session is valid", async function () {
                await signIn(page);
                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "valid");
                assert.notEqual(userId, "");
                await signOut(page);
            });

            it("show expired if the tokens do not match", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                assert.notEqual(frontTokenCookie.value, undefined);
                const decodedFrontToken = decodeFrontToken(frontTokenCookie.value);
                decodedFrontToken.up = {};
                page.setCookie({
                    ...frontTokenCookie,
                    value: encodeFrontToken(decodedFrontToken),
                });

                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "expired");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show expired if the access token does not exist", async function () {
                await signIn(page);
                await page.deleteCookie({ name: ACCESS_TOKEN_COOKIE_NAME });
                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "expired");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show expired if the front token is expired", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                assert.notEqual(frontTokenCookie.value, undefined);
                const decodedFrontToken = decodeFrontToken(frontTokenCookie.value);
                decodedFrontToken.ate = Date.now() - 3600000;
                await page.setCookie({
                    ...frontTokenCookie,
                    value: encodeFrontToken(decodedFrontToken),
                });

                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "expired");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show invalid if the access token is invalid", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: ACCESS_TOKEN_COOKIE_NAME });
                await page.setCookie({
                    ...accessTokenCookie,
                    value: "invalid.access.token",
                });

                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "invalid");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show invalid if the front token is invalid", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === FRONT_TOKEN_COOKIE_NAME);
                assert.notEqual(frontTokenCookie, undefined);
                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                await page.setCookie({
                    ...frontTokenCookie,
                    value: "invalid.access.token",
                });

                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "invalid");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show invalid if the front token does not exist", async function () {
                await signIn(page);
                await page.deleteCookie({ name: FRONT_TOKEN_COOKIE_NAME });
                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "invalid");
                assert.equal(userId, "");
                await signOut(page);
            });

            it("show invalid if the access token is invalid", async function () {
                await signIn(page);
                const cookies = await page.cookies();
                const accessTokenCookie = cookies.find((c) => c.name === ACCESS_TOKEN_COOKIE_NAME);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: ACCESS_TOKEN_COOKIE_NAME });
                await page.setCookie({
                    ...accessTokenCookie,
                    value: "invalid.access.token",
                });

                const { userId, status } = await triggerServerAction(page);
                assert.equal(status, "invalid");
                assert.equal(userId, "");
                await signOut(page);
            });
        });
    });
});
