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
    screenshotOnFailure,
    isUserRolesSupported,
    defaultSignUp,
    toggleSignInSignUp,
    setInputValues,
    submitForm,
    getInvalidClaimsJSON as getInvalidClaims,
    waitFor,
    waitForText,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import { TEST_APPLICATION_SERVER_BASE_URL, TEST_CLIENT_BASE_URL } from "../constants";

describe("User Roles in the frontend", function () {
    before(async function () {
        backendHook("before");
        const isRolesSupported = await isUserRolesSupported();
        if (!isRolesSupported) {
            this.skip();
        }
    });

    describe("UserRolesClaim", function () {
        let browser;
        let page;
        before(async function () {
            const coreUrl = await setupCoreApp();
            await setupST({ coreUrl });

            browser = await setupBrowser();
            page = await browser.newPage();
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            await defaultSignUp(page);
            await page.close();
        });

        beforeEach(async function () {
            backendHook("beforeEach");
            page = await browser.newPage();
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            // sign in
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await setInputValues(page, [
                { name: "email", value: "john.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
            ]);
            await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await page.waitForSelector(".sessionInfo-user-id");
        });

        afterEach(async function () {
            await screenshotOnFailure(this, browser);
            await page?.close();
            await backendHook("afterEach");
        });
    
        after(async function () {
            await browser?.close();
            await backendHook("after");
        });

        it("should be able to read in the frontend", async () => {
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.UserRoleClaim.getValueFromPayload(payload)
                    )
                ),
                []
            );
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.PermissionClaim.getValueFromPayload(payload)
                    )
                ),
                []
            );
        });

        it("should be able to read in the frontend with values set", async () => {
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.UserRoleClaim.getValueFromPayload(payload)
                    )
                ),
                []
            );
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.PermissionClaim.getValueFromPayload(payload)
                    )
                ),
                []
            );
        });

        it("should show the access denied screen when added to validators", async () => {
            await page.evaluate(
                (url) =>
                    window.fetch(url, {
                        method: "POST",
                        headers: [["content-type", "application/json"]],
                        body: JSON.stringify({
                            role: "testRole",
                            permissions: ["testPerm"],
                        }),
                    }),
                `${TEST_APPLICATION_SERVER_BASE_URL}/setRole`
            );
            await page.evaluate(() => {
                window.setClaimValidators([
                    window.UserRoleClaim.validators.includes("admin"),
                    window.PermissionClaim.validators.excludes("testPerm"),
                ]);
            });
            await waitForText(page, "[data-supertokens~=headerTitle]", "Access denied");
        });

        it("should redirect away when added to validators", async () => {
            await page.evaluate(
                (url) =>
                    window.fetch(url, {
                        method: "POST",
                        headers: [["content-type", "application/json"]],
                        body: JSON.stringify({
                            role: "testRole",
                            permissions: ["testPerm"],
                        }),
                    }),
                `${TEST_APPLICATION_SERVER_BASE_URL}/setRole`
            );
            await Promise.all([
                page.evaluate(() => {
                    // We do it like this because support for spread is weird
                    const adminValidator = window.UserRoleClaim.validators.includes("admin");
                    adminValidator.onFailureRedirection = () => "/not-an-admin";
                    window.setClaimValidators([adminValidator, window.PermissionClaim.validators.excludes("testPerm")]);
                }),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await waitForUrl(page, "/not-an-admin");
        });

        it("should set invalid claims when added to validators", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => {
                // We do it like this because support for spread is weird
                const adminValidator = window.UserRoleClaim.validators.includes("admin");
                adminValidator.showAccessDeniedOnFailure = false;
                window.setClaimValidators([adminValidator]);
            });
            await waitFor(500);
            await page.waitForSelector(".invalidClaims");
            assert.deepStrictEqual(await getInvalidClaims(page), [
                {
                    id: "st-role",
                    reason: {
                        message: "wrong value",
                        expectedToInclude: "admin",
                        actualValue: ["testRole"],
                    },
                },
            ]);
        });

        it("should fire the appropriate event for api invalid claims", async () => {
            await page.evaluate(
                (url) =>
                    window.fetch(url, {
                        method: "POST",
                        headers: [["content-type", "application/json"]],
                        body: JSON.stringify({
                            role: "testRole",
                            permissions: ["testPerm"],
                        }),
                    }),
                `${TEST_APPLICATION_SERVER_BASE_URL}/setRole`
            );
            await waitFor(500);
            const consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            await page.evaluate(
                (url) =>
                    window.fetch(url, {
                        method: "POST",
                        headers: [["content-type", "application/json"]],
                        body: JSON.stringify({
                            role: {
                                validator: "includes",
                                args: ["admin"],
                            },
                        }),
                    }),
                `${TEST_APPLICATION_SERVER_BASE_URL}/checkRole`
            );

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION ON_HANDLE_EVENT API_INVALID_CLAIM",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });
    });
});
