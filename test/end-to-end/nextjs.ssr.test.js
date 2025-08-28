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

async function signOut(page) {
    const signOutButton = await page.waitForSelector("[data-testid='signOut']");
    await signOutButton.click();
}

async function didSessionRefresh(page) {
    const cookies = await page.cookies();
    const sessionRefreshCookie = cookies.find((c) => c.name === "sSSRRefresh");
    return sessionRefreshCookie?.value === "true";
}

async function wasSessionRevoked(page) {
    const cookies = await page.cookies();
    const sessionRevokeCookie = cookies.find((c) => c.name === "sRevokeSession");
    return sessionRevokeCookie?.value === "true";
}

describe("SuperTokens NextJS SSR", function () {
    let browser;
    let page;
    const email = getTestEmail("nextjs");
    const password = "password123";
    before(async function () {
        browser = await setupBrowser();
        page = await browser.newPage();
        await page.goto(`${TEST_CLIENT_BASE_URL}/auth?show=signup`);
        await setInputValues(page, [
            { name: "email", value: email },
            { name: "password", value: password },
        ]);
        await submitForm(page);
        await new Promise((res) => setTimeout(res, 2000));
        await signOut(page);
        await new Promise((res) => setTimeout(res, 2000));
        await page.close();
    });

    beforeEach(async function () {
        page = await browser.newPage();
    });

    after(async function () {
        await browser?.close();
    });

    afterEach(async function () {
        await signOut(page);
        await new Promise((res) => setTimeout(res, 2000));
        await page.close();
    });

    describe("NextJS SSR", function () {
        describe("getServerComponentSession", function () {
            // it("show the user id if the session is valid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //     const userIdElement = await page.waitForSelector("[data-testid~=getServerComponentSession-userId]");
            //     assert.notEqual(userIdElement, "");
            //     await page.reload();
            //     const hasSessionRefreshed = await didSessionRefresh(page);
            //     assert.equal(hasSessionRefreshed, false);
            // });

            it("refresh if the front token has expired", async function () {
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
                await setInputValues(page, [
                    { name: "email", value: email },
                    { name: "password", value: password },
                ]);
                await submitForm(page);
                await new Promise((res) => setTimeout(res, 1000));

                // Navigate to home to establish session
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                // Manipulate cookies to simulate expired front token
                let cookies = await page.cookies();
                const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
                const accessTokenCookie = cookies.find((c) => c.name === "sAccessToken");
                assert.notEqual(frontTokenCookie, undefined);
                assert.notEqual(accessTokenCookie, undefined);

                await page.deleteCookie({ name: "sFrontToken" });
                const decodedFrontToken = JSON.parse(decodeURIComponent(escape(atob(frontTokenCookie.value))));
                decodedFrontToken.ate = Date.now() - 3600000;
                const expiredFrontTokenValue = btoa(unescape(encodeURIComponent(JSON.stringify(decodedFrontToken))));

                await page.setCookie({
                    name: "sFrontToken",
                    value: expiredFrontTokenValue,
                    domain: frontTokenCookie.domain,
                    path: frontTokenCookie.path,
                    httpOnly: frontTokenCookie.httpOnly,
                    secure: frontTokenCookie.secure,
                    sameSite: frontTokenCookie.sameSite,
                });

                await page.reload();
                let newCookies = await page.cookies();
                const updatedFrontTokenCookie = newCookies.find((c) => c.name === "sFrontToken");
                assert.notEqual(updatedFrontTokenCookie?.value, undefined);
                assert.notEqual(updatedFrontTokenCookie.value, frontTokenCookie.value);
                assert.notEqual(updatedFrontTokenCookie.value, expiredFrontTokenValue);
                const userIdElement = await page.waitForSelector("[data-testid~=getServerComponentSession-userId]");
                const textContent = await userIdElement.evaluate((el) => el.textContent);
                assert.notEqual(textContent, "");
            });

            // it("refresh if the tokens do not match", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Manipulate cookies to make tokens mismatch
            //     let cookies = await page.cookies();
            //     const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
            //     const accessTokenCookie = cookies.find((c) => c.name === "sAccessToken");
            //
            //     if (frontTokenCookie && accessTokenCookie) {
            //         // Modify front token to have different session handle than access token
            //         await page.deleteCookie({ name: "sFrontToken" });
            //         const mismatchedFrontTokenPayload = JSON.stringify({
            //             uid: "different-user-id",
            //             ate: Date.now() + 3600000,
            //             up: {},
            //             exp: Math.floor(Date.now() / 1000) + 3600,
            //         });
            //         const mismatchedFrontToken =
            //             btoa(JSON.stringify({ alg: "none" })) + "." + btoa(mismatchedFrontTokenPayload) + ".";
            //
            //         await page.setCookie({
            //             name: "sFrontToken",
            //             value: mismatchedFrontToken,
            //             domain: frontTokenCookie.domain,
            //             path: frontTokenCookie.path,
            //             httpOnly: frontTokenCookie.httpOnly,
            //             secure: frontTokenCookie.secure,
            //             sameSite: frontTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Reload page to trigger server component session check
            //     await page.reload();
            //     const hasSessionRefreshed = await didSessionRefresh(page);
            //     assert.equal(hasSessionRefreshed, true);
            //
            //     // Should still show user ID after refresh
            //     const userIdElement = await page.waitForSelector("[data-testid~=getServerComponentSession-userId]");
            //     assert.notEqual(await userIdElement.textContent(), "");
            // });
            //
            // it("refresh if the access token does not exist", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Remove only the access token cookie
            //     await page.deleteCookie({ name: "sAccessToken" });
            //
            //     // Reload page to trigger server component session check
            //     await page.reload();
            //     const hasSessionRefreshed = await didSessionRefresh(page);
            //     assert.equal(hasSessionRefreshed, true);
            //
            //     // Should still show user ID after refresh
            //     const userIdElement = await page.waitForSelector("[data-testid~=getServerComponentSession-userId]");
            //     assert.notEqual(await userIdElement.textContent(), "");
            // });
            //
            // it("logout if the access token is invalid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Set invalid access token
            //     let cookies = await page.cookies();
            //     const accessTokenCookie = cookies.find((c) => c.name === "sAccessToken");
            //
            //     if (accessTokenCookie) {
            //         await page.deleteCookie({ name: "sAccessToken" });
            //         await page.setCookie({
            //             name: "sAccessToken",
            //             value: "invalid.access.token",
            //             domain: accessTokenCookie.domain,
            //             path: accessTokenCookie.path,
            //             httpOnly: accessTokenCookie.httpOnly,
            //             secure: accessTokenCookie.secure,
            //             sameSite: accessTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Reload page to trigger server component session check
            //     await page.reload();
            //     const sessionRevoked = await wasSessionRevoked(page);
            //     assert.equal(sessionRevoked, true);
            //
            //     // Should redirect to auth page or show login
            //     await waitForUrl(page, "/auth");
            // });
            //
            // it("logout if the front token does not exist", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Remove only the front token cookie
            //     await page.deleteCookie({ name: "sFrontToken" });
            //
            //     // Reload page to trigger server component session check
            //     await page.reload();
            //     const sessionRevoked = await wasSessionRevoked(page);
            //     assert.equal(sessionRevoked, true);
            //
            //     // Should redirect to auth page or show login
            //     await waitForUrl(page, "/auth");
            // });
            //
            // it("logout if the front token is invalid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Set invalid front token
            //     let cookies = await page.cookies();
            //     const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
            //
            //     if (frontTokenCookie) {
            //         await page.deleteCookie({ name: "sFrontToken" });
            //         await page.setCookie({
            //             name: "sFrontToken",
            //             value: "invalid.front.token",
            //             domain: frontTokenCookie.domain,
            //             path: frontTokenCookie.path,
            //             httpOnly: frontTokenCookie.httpOnly,
            //             secure: frontTokenCookie.secure,
            //             sameSite: frontTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Reload page to trigger server component session check
            //     await page.reload();
            //     const sessionRevoked = await wasSessionRevoked(page);
            //     assert.equal(sessionRevoked, true);
            //
            //     // Should redirect to auth page or show login
            //     await waitForUrl(page, "/auth");
            // });
        });

        describe("getServerActionSession", function () {
            // it("show the user id if the session is valid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should show user ID (non-empty result)
            //     assert.notEqual(result, "");
            //     assert.notEqual(result, "undefined");
            // });
            //
            // it("show expired if the tokens do not match", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Manipulate cookies to make tokens mismatch
            //     let cookies = await page.cookies();
            //     const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
            //
            //     if (frontTokenCookie) {
            //         // Modify front token to have different session handle than access token
            //         await page.deleteCookie({ name: "sFrontToken" });
            //         const mismatchedFrontTokenPayload = JSON.stringify({
            //             uid: "different-user-id",
            //             ate: Date.now() + 3600000,
            //             up: {},
            //             exp: Math.floor(Date.now() / 1000) + 3600,
            //         });
            //         const mismatchedFrontToken =
            //             btoa(JSON.stringify({ alg: "none" })) + "." + btoa(mismatchedFrontTokenPayload) + ".";
            //
            //         await page.setCookie({
            //             name: "sFrontToken",
            //             value: mismatchedFrontToken,
            //             domain: frontTokenCookie.domain,
            //             path: frontTokenCookie.path,
            //             httpOnly: frontTokenCookie.httpOnly,
            //             secure: frontTokenCookie.secure,
            //             sameSite: frontTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for expired session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show expired if the access token does not exist", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Remove only the access token cookie
            //     await page.deleteCookie({ name: "sAccessToken" });
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for expired session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show expired if the front token is expired", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Manipulate cookies to simulate expired front token
            //     let cookies = await page.cookies();
            //     const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
            //
            //     if (frontTokenCookie) {
            //         // Set expired front token by modifying the header to have a past exp time
            //         await page.deleteCookie({ name: "sFrontToken" });
            //         const expiredFrontTokenPayload = JSON.stringify({
            //             uid: frontTokenCookie.value
            //                 ? JSON.parse(atob(frontTokenCookie.value.split(".")[1])).uid
            //                 : "test",
            //             ate: Date.now() + 3600000,
            //             up: {},
            //             exp: Math.floor(Date.now() / 1000) - 3600, // expired 1 hour ago
            //         });
            //         const expiredFrontToken =
            //             btoa(JSON.stringify({ alg: "none" })) + "." + btoa(expiredFrontTokenPayload) + ".";
            //
            //         await page.setCookie({
            //             name: "sFrontToken",
            //             value: expiredFrontToken,
            //             domain: frontTokenCookie.domain,
            //             path: frontTokenCookie.path,
            //             httpOnly: frontTokenCookie.httpOnly,
            //             secure: frontTokenCookie.secure,
            //             sameSite: frontTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for expired session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show expired if the access token is invalid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Set invalid access token
            //     let cookies = await page.cookies();
            //     const accessTokenCookie = cookies.find((c) => c.name === "sAccessToken");
            //
            //     if (accessTokenCookie) {
            //         await page.deleteCookie({ name: "sAccessToken" });
            //         await page.setCookie({
            //             name: "sAccessToken",
            //             value: "invalid.access.token",
            //             domain: accessTokenCookie.domain,
            //             path: accessTokenCookie.path,
            //             httpOnly: accessTokenCookie.httpOnly,
            //             secure: accessTokenCookie.secure,
            //             sameSite: accessTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for expired session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show invalid if the front token is invalid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Set invalid front token
            //     let cookies = await page.cookies();
            //     const frontTokenCookie = cookies.find((c) => c.name === "sFrontToken");
            //
            //     if (frontTokenCookie) {
            //         await page.deleteCookie({ name: "sFrontToken" });
            //         await page.setCookie({
            //             name: "sFrontToken",
            //             value: "invalid.front.token",
            //             domain: frontTokenCookie.domain,
            //             path: frontTokenCookie.path,
            //             httpOnly: frontTokenCookie.httpOnly,
            //             secure: frontTokenCookie.secure,
            //             sameSite: frontTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for invalid session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show invalid if the front token does not exist", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Remove only the front token cookie
            //     await page.deleteCookie({ name: "sFrontToken" });
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for invalid session
            //     assert.equal(result, "" || result === "undefined");
            // });
            //
            // it("show invalid if the access token is invalid", async function () {
            //     await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
            //     await setInputValues(page, [
            //         { name: "email", value: email },
            //         { name: "password", value: password },
            //     ]);
            //     await submitForm(page);
            //     await new Promise((res) => setTimeout(res, 1000));
            //
            //     // Navigate to home to establish session
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //
            //     // Set invalid access token
            //     let cookies = await page.cookies();
            //     const accessTokenCookie = cookies.find((c) => c.name === "sAccessToken");
            //
            //     if (accessTokenCookie) {
            //         await page.deleteCookie({ name: "sAccessToken" });
            //         await page.setCookie({
            //             name: "sAccessToken",
            //             value: "invalid.access.token",
            //             domain: accessTokenCookie.domain,
            //             path: accessTokenCookie.path,
            //             httpOnly: accessTokenCookie.httpOnly,
            //             secure: accessTokenCookie.secure,
            //             sameSite: accessTokenCookie.sameSite,
            //         });
            //     }
            //
            //     // Click the getServerActionSession button
            //     const actionButton = await page.waitForSelector("[data-testid='getServerActionSession-button']");
            //     await actionButton.click();
            //
            //     // Wait for action result
            //     await new Promise((res) => setTimeout(res, 1000));
            //     const resultElement = await page.waitForSelector("[data-testid='getServerActionSession-result']");
            //     const result = await resultElement.textContent();
            //
            //     // Should return undefined/empty for invalid session
            //     assert.equal(result, "" || result === "undefined");
            // });
        });
    });
});
