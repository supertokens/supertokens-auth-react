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
import fetch from "isomorphic-fetch";
import {
    screenshotOnFailure,
    getSignInOrSignUpSwitchLink,
    clearBrowserCookiesWithoutAffectingConsole,
    setInputValues,
    getGeneralError,
    getLogoutButton,
    submitForm,
    getUserIdWithFetch,
    getFieldErrors,
    getSubmitFormButton,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, DEFAULT_WEBSITE_BASE_PATH, TEST_SERVER_BASE_URL } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Multitenancy tenant interactions", function () {
    let browser;
    let page;
    let pageCrashed;

    beforeEach(async function () {
        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        page = await browser.newPage();
        pageCrashed = false;
        page.on("console", (c) => {
            if (c.text() === "ST_THROWN_ERROR") {
                pageCrashed = true;
            }
            // console.log(c.text());
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await clearBrowserCookiesWithoutAffectingConsole(page, []);
        await clearDynamicLoginMethodsSettings(page);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        if (page) {
            await page.close();
        }
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    before(async () => {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"],
            headless: true,
        });
    });

    after(async function () {
        await browser.close();
    });

    describe("without user sharing", () => {
        it("should not allow sign into user created on public when using a custom tenants", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const email = await epSignUp(page);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email, "Incorrect email and password combination");
        });

        it("should not allow sign into user created on custom tenant when using public", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "public");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email, "Incorrect email and password combination");
        });

        it("should allow sign up on custom tenant after signing up on public", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email);
        });

        it("should allow sign up on public tenant after signing up on a custom", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "public");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email);
        });
    });

    describe("with user sharing", () => {
        it("should allow sign into user created on public when using a custom tenants", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const email = await epSignUp(page);
            const userId = await getUserIdWithFetch(page);
            addUserToTenant("public", "customer1", userId);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email);
        });

        it("should allow sign into user created on custom tenant when using public", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);

            const userId = await getUserIdWithFetch(page);
            addUserToTenant("public", "public", userId);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "public");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email);
        });

        it("should not allow sign up on custom tenant after signing up on public", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);
            const userId = await getUserIdWithFetch(page);
            addUserToTenant("public", "customer1", userId);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email, ["This email already exists. Please sign in instead"]);
        });

        it("should not allow sign up on public tenant after signing up on a custom", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            const userId = await getUserIdWithFetch(page);
            addUserToTenant("public", "public", userId);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "public");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email, ["This email already exists. Please sign in instead"]);
        });
    });

    describe("with removed user", () => {
        it("should not allow sign in", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const email = await epSignUp(page);

            const userId = await getUserIdWithFetch(page);
            removeUserFromTenant("public", "public", userId);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email, "Incorrect email and password combination");
        });

        it("should allow sign up", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page);

            const userId = await getUserIdWithFetch(page);
            removeUserFromTenant("public", "public", userId);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email);
            const userIdAfter = await getUserIdWithFetch(page);
            assert.notStrictEqual(userId, userIdAfter);
        });

        it("should log out on refresh", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignUp(page);

            const userId = await getUserIdWithFetch(page);
            removeUserFromTenant("public", "public", userId);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await getSubmitFormButton(page);
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/");
        });
    });

    describe("with removed tenant", () => {
        it("should not allow sign in", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const email = await epSignUp(page);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await removeTenant("public", "customer1");
            await epSignIn(page, email, "Something went wrong. Please try again.");
        });

        it("should not allow sign up", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await removeTenant("public", "customer1");
            await epSignUp(page, undefined, [], "Something went wrong. Please try again.");
        });

        it("should not crash even if dynamic login methods is enabled", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await removeTenant("public", "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await getSubmitFormButton(page);
            assert(!pageCrashed);
        });

        it("should keep the session active if dynamic login methods is not enabled", async function () {
            await setEnabledRecipes(page, ["passwordless", "emailpassword"]);
            await setupTenant("public", "customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignUp(page);

            await removeTenant("public", "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await getLogoutButton(page);

            assert(!pageCrashed);
        });
    });
});

function setEnabledRecipes(page, recipeIds) {
    return page.evaluate((serializedRecipeIdList) => {
        window.localStorage.setItem("clientRecipeListForDynamicLogin", serializedRecipeIdList);
    }, JSON.stringify(recipeIds));
}

function clearDynamicLoginMethodsSettings(page) {
    return page.evaluate(() => {
        window.localStorage.removeItem("usesDynamicLoginMethods");
        window.localStorage.removeItem("mockLoginMethodsForDynamicLogin");
        window.localStorage.removeItem("clientRecipeListForDynamicLogin");
        window.localStorage.removeItem("staticProviderList");
        window.localStorage.removeItem("mockTenantId");
    });
}

function setTenantId(page, id) {
    return page.evaluate((id) => {
        window.localStorage.setItem("mockTenantId", id);
    }, id);
}

export async function enableDynamicLoginMethods(page) {
    return page.evaluate(() => {
        window.localStorage.setItem("usesDynamicLoginMethods", "true");
    });
}

async function setupTenant(appId, tenantId, mockLoginMethods) {
    let coreResp = await fetch(`http://localhost:9000/appid-${appId}/recipe/multitenancy/tenant`, {
        method: "PUT",
        headers: new Headers([
            ["content-type", "application/json"],
            ["rid", "multitenancy"],
        ]),
        body: JSON.stringify({
            tenantId,
            emailPasswordEnabled: mockLoginMethods.emailPassword?.enabled === true,
            thirdPartyEnabled: mockLoginMethods.thirdParty?.enabled === true,
            passwordlessEnabled: mockLoginMethods.passwordless?.enabled === true,
            coreConfig: {},
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

async function addUserToTenant(appId, tenantId, userId) {
    let coreResp = await fetch(`http://localhost:9000/appid-${appId}/${tenantId}/recipe/multitenancy/tenant/user`, {
        method: "POST",
        headers: new Headers([
            ["content-type", "application/json"],
            ["rid", "multitenancy"],
        ]),
        body: JSON.stringify({
            userId,
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

async function removeUserFromTenant(appId, tenantId, userId) {
    let coreResp = await fetch(
        `http://localhost:9000/appid-${appId}/${tenantId}/recipe/multitenancy/tenant/user/remove`,
        {
            method: "POST",
            headers: new Headers([
                ["content-type", "application/json"],
                ["rid", "multitenancy"],
            ]),
            body: JSON.stringify({
                userId,
            }),
        }
    );
    assert.strictEqual(coreResp.status, 200);
}

async function removeTenant(appId, tenantId) {
    let coreResp = await fetch(`http://localhost:9000/appid-${appId}/recipe/multitenancy/tenant/remove`, {
        method: "POST",
        headers: new Headers([["rid", "multitenancy"]]),
        body: JSON.stringify({
            tenantId,
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

async function epSignUp(page, email, fieldErrors, generalError) {
    const link = await getSignInOrSignUpSwitchLink(page);
    const linkText = await link.evaluate((e) => e.textContent);
    if (linkText === "Sign Up") {
        await link.click();
    }
    if (email === undefined) {
        email = `john.doe.${Date.now()}@supertokens.io`;
    }

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Str0ngP@ssw0rd" },
        { name: "name", value: "John Doe" },
        { name: "age", value: "20" },
        { name: "country", value: "" },
    ]);

    let [_, shownFieldErrors, shownGeneralError] = await Promise.all([
        submitForm(page),
        fieldErrors !== undefined ? getFieldErrors(page) : undefined,
        generalError !== undefined ? getGeneralError(page) : undefined,
        fieldErrors === undefined && generalError === undefined ? getLogoutButton(page) : undefined,
    ]);

    if (fieldErrors !== undefined) {
        assert.deepStrictEqual(shownFieldErrors, fieldErrors);
    }

    if (generalError !== undefined) {
        assert.deepStrictEqual(shownGeneralError, generalError);
    }
    return email;
}

async function epSignIn(page, email, errorMessage) {
    const link = await getSignInOrSignUpSwitchLink(page);
    const linkText = await link.evaluate((e) => e.textContent);
    if (linkText === "Sign In") {
        await link.click();
    }
    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Str0ngP@ssw0rd" },
    ]);

    let [_, err] = await Promise.all([
        submitForm(page),
        errorMessage !== undefined ? getGeneralError(page) : getLogoutButton(page),
    ]);
    if (errorMessage !== undefined) {
        assert.strictEqual(err, errorMessage);
    }
    return err;
}
