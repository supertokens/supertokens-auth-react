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
    waitForSTElement,
    getPasswordlessDevice,
    getSessionHandleWithFetch,
    getLatestURLWithToken,
    sendEmailResetPasswordSuccessMessage,
    getTextByDataSupertokens,
    getVerificationEmailErrorTitle,
    isMultitenancySupported,
    isMultitenancyManagementEndpointsSupported,
    setupTenant,
    addUserToTenant,
    removeUserFromTenant,
    removeTenant,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    DEFAULT_WEBSITE_BASE_PATH,
    SOMETHING_WENT_WRONG_ERROR,
    ST_ROOT_SELECTOR,
    TEST_APPLICATION_SERVER_BASE_URL,
} from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Multitenancy tenant interactions", function () {
    let browser;
    let page;
    let pageCrashed;

    const appConfig = {};

    before(async function () {
        await backendHook("before");
        const isSupported = (await isMultitenancySupported()) && (await isMultitenancyManagementEndpointsSupported());
        if (!isSupported) {
            this.skip();
        }

        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");

        const coreUrl = await setupCoreApp();
        appConfig.coreUrl = coreUrl;
        await setupST(appConfig);

        page = await browser.newPage();

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
        await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
        await page.evaluate(() => localStorage.removeItem("mode"));
        pageCrashed = false;
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
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

    describe("without user sharing", () => {
        it("should not allow sign into user created on public when using a custom tenants", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            addUserToTenant("customer1", userId);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email);
        });

        it("should allow sign into user created on custom tenant when using public", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            addUserToTenant("public", userId);
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "public");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email);
        });

        it("should not allow sign up on custom tenant after signing up on public", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            addUserToTenant("customer1", userId);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email, ["This email already exists. Please sign in instead"]);
        });

        it("should not allow sign up on public tenant after signing up on a custom", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await waitForUrl(page, "/dashboard");
            const userId = await getUserIdWithFetch(page);
            addUserToTenant("public", userId);

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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await addUserToTenant("customer1", userId);
            await removeUserFromTenant("public", userId);

            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignIn(page, email, "Incorrect email and password combination");
        });

        it("should allow sign up", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await addUserToTenant("customer1", userId);
            await removeUserFromTenant("public", userId);
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
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await addUserToTenant("customer1", userId);
            await removeUserFromTenant("public", userId);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await getSubmitFormButton(page);
            await waitForUrl(page, "/auth/");
        });
    });

    describe("with removed tenant", () => {
        it("should not allow sign in", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("customer1", {
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

            await removeTenant("customer1");
            await epSignIn(page, email, SOMETHING_WENT_WRONG_ERROR);
        });

        it("should not allow sign up", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("customer1", {
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
            await removeTenant("customer1");
            await epSignUp(page, undefined, [], SOMETHING_WENT_WRONG_ERROR);
        });

        it("should crash if dynamic login methods is enabled", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await removeTenant("customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            assert.strictEqual(await page.waitForSelector(ST_ROOT_SELECTOR, { timeout: 1000, hidden: true }), null);

            assert(pageCrashed);
        });

        it("should keep the session active if even if dynamic login methods is enabled", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignUp(page);

            await page.waitForSelector(".fetch .sessionInfo-user-id");
            await page.waitForSelector(".axios .sessionInfo-user-id");

            await removeTenant("customer1");

            let getDynamicLoginMethodsCalled = false;
            await page.setRequestInterception(true);
            const requestHandler = (request) => {
                if (
                    request.url() === `${TEST_APPLICATION_SERVER_BASE_URL}/auth/customer1/loginmethods?` &&
                    request.method() === "GET"
                ) {
                    getDynamicLoginMethodsCalled = true;
                }

                return request.continue();
            };
            page.on("request", requestHandler);

            try {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await getLogoutButton(page);

                assert(!pageCrashed);
                assert(!getDynamicLoginMethodsCalled);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }
        });

        it("should revoke magic links on removed tenants", async function () {
            await setupST({
                ...appConfig,
                passwordlessContactMethod: "EMAIL_OR_PHONE",
                passwordlessFlowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            });
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await setTenantId(page, "customer1");
            await enableDynamicLoginMethods(page);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);

            await removeTenant("customer1");
            await setTenantId(page, "public");

            await Promise.all([
                page.goto(device.codes[0].urlWithLinkCode),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            assert.strictEqual(await getGeneralError(page), SOMETHING_WENT_WRONG_ERROR);
        });
    });

    describe("passwordless sign in", () => {
        beforeEach(async () => {
            await setupST({
                ...appConfig,
                passwordlessContactMethod: "EMAIL_OR_PHONE",
                passwordlessFlowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            });
        });

        it("should work using OTP on the public tenants", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("public", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await page.waitForSelector(".sessionInfo-user-id");
        });

        it("should work using magic links on the public tenants", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("public", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await page.goto(device.codes[0].urlWithLinkCode);

            await page.waitForSelector(".sessionInfo-user-id");
        });

        it("should work using OTP on a custom tenants", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await page.waitForSelector(".sessionInfo-user-id");
        });

        it("should work using magic links on a custom tenants", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await page.goto(device.codes[0].urlWithLinkCode);

            await page.waitForSelector(".sessionInfo-user-id");
            assert((await getSessionHandleWithFetch(page)).endsWith("_customer1"));
        });

        it("should work using magic links on a custom tenants even if the current app has the wrong tenant id", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setTenantId(page, "public");
            await page.goto(device.codes[0].urlWithLinkCode);

            await page.waitForSelector(".sessionInfo-user-id");
            assert((await getSessionHandleWithFetch(page)).endsWith("_customer1"));
        });

        it("should work using OTP on a custom tenants even if the current app has the wrong tenant id", async function () {
            await setEnabledRecipes(page, ["passwordless"]);
            await setupTenant("customer1", {
                emailPassword: { enabled: false },
                passwordless: { enabled: true },
                thirdParty: {
                    enabled: false,
                    providers: [],
                },
            });
            await enableDynamicLoginMethods(page);
            await setTenantId(page, "customer1");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const contactInfo = `john.doe.${Date.now()}@supertokens.io`;
            await setInputValues(page, [{ name: "email", value: contactInfo }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setTenantId(page, "public");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await page.waitForSelector(".sessionInfo-user-id");

            await page.waitForSelector(".sessionInfo-user-id");
            assert((await getSessionHandleWithFetch(page)).endsWith("_customer1"));
        });
    });

    describe("password reset links", () => {
        it("should reset password only on the tenant the link was created customer1 -> public", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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

            const newPassword = await resetPassword(page, email);

            await epSignIn(page, email, "Incorrect email and password combination");
            await epSignIn(page, email, undefined, newPassword);

            await setTenantId(page, "customer1");
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignIn(page, email, "Incorrect email and password combination", newPassword);
            await epSignIn(page, email);
        });

        it("should reset password only on the tenant the link was created", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "public");
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

            const newPassword = await resetPassword(page, email);

            await epSignIn(page, email, "Incorrect email and password combination");
            await epSignIn(page, email, undefined, newPassword);

            await setTenantId(page, "public");
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignIn(page, email, "Incorrect email and password combination", newPassword);
            await epSignIn(page, email);
        });

        it("should be revoked when removing tenants", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
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
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);

            await setInputValues(page, [{ name: "email", value: email }]);
            await submitForm(page);
            await sendEmailResetPasswordSuccessMessage(page);
            const latestURLWithToken = await getLatestURLWithToken();
            await removeTenant("customer1");
            await page.goto(latestURLWithToken);

            const newPassword = "NEW_Str0ngP@ssw0rd";
            await setInputValues(page, [
                { name: "password", value: newPassword },
                { name: "confirm-password", value: newPassword },
            ]);
            await submitForm(page);
            assert.strictEqual(await getGeneralError(page), "Something went wrong. Please try again.");
        });
    });

    describe("email verification links", () => {
        it("should verify email only on the tenant in the link", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page, undefined, undefined, undefined, true);

            await new Promise((res) => setTimeout(res, 1000));
            const latestURLWithTokenCustomer1 = await getLatestURLWithToken();

            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await setTenantId(page, "public");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await epSignUp(page, email, undefined, undefined, true);

            await new Promise((res) => setTimeout(res, 1000));
            const latestURLWithTokenPublic = await getLatestURLWithToken();

            assert.notStrictEqual(latestURLWithTokenPublic, latestURLWithTokenCustomer1);
            await page.goto(latestURLWithTokenCustomer1);
            await submitForm(page);
            // We verify the email on the customer1 tenant, but we are logged in on public, so we get back to the email verification screen
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

            await page.goto(latestURLWithTokenPublic);
            await submitForm(page);
            // This time we verify the email on the public tenant so we get to the logged-in screen
            await getLogoutButton(page);

            await setTenantId(page, "customer1");
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await epSignIn(page, email);
        });

        it("should be revoked when removing tenants", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });
            await setupTenant("customer1", {
                emailPassword: { enabled: true },
                passwordless: { enabled: false },
                thirdParty: {
                    enabled: true,
                    providers: [],
                },
            });

            await setTenantId(page, "customer1");
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const email = await epSignUp(page, undefined, undefined, undefined, true);

            await new Promise((res) => setTimeout(res, 1000));
            const latestURLWithToken = await getLatestURLWithToken();
            await removeTenant("customer1");
            await page.goto(latestURLWithToken);

            assert.strictEqual(await getVerificationEmailErrorTitle(page), "!\nSomething went wrong");
        });
    });

    describe("AllowedDomainsClaim", () => {
        it("should return the right value on a custom tenant", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("customer1", {
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

            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.AllowedDomainsClaim.getValueFromPayload(payload)
                    )
                ),
                ["customer1.example.com", "localhost"]
            );
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.AllowedDomainsClaim.validators.hasAccessToCurrentDomain().validate(payload)
                    )
                ),
                {
                    isValid: true,
                }
            );
        });

        it("should return the right value on the default tenant", async function () {
            await setEnabledRecipes(page, ["emailpassword"]);
            await setupTenant("public", {
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

            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.AllowedDomainsClaim.getValueFromPayload(payload)
                    )
                ),
                ["public.example.com", "localhost"]
            );
            assert.deepStrictEqual(
                await page.evaluate(() =>
                    window.Session.getAccessTokenPayloadSecurely().then((payload) =>
                        window.AllowedDomainsClaim.validators.hasAccessToCurrentDomain().validate(payload)
                    )
                ),
                {
                    isValid: true,
                }
            );
        });
    });
});

async function resetPassword(page, email) {
    await clearBrowserCookiesWithoutAffectingConsole(page, []);
    await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password`);

    await setInputValues(page, [{ name: "email", value: email }]);
    await submitForm(page);
    await sendEmailResetPasswordSuccessMessage(page);
    const latestURLWithToken = await getLatestURLWithToken();
    await page.goto(latestURLWithToken);

    const newPassword = "NEW_Str0ngP@ssw0rd";
    await setInputValues(page, [
        { name: "password", value: newPassword },
        { name: "confirm-password", value: newPassword },
    ]);
    await submitForm(page);

    await new Promise((res) => setTimeout(res, 1000));
    const title = await getTextByDataSupertokens(page, "headerTitle");
    assert.deepStrictEqual(title, "Success!");
    await submitForm(page);
    return newPassword;
}

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

async function epSignUp(page, email, fieldErrors, generalError, emailVerificationRequired) {
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
        fieldErrors === undefined && generalError === undefined
            ? emailVerificationRequired === true
                ? waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']")
                : getLogoutButton(page)
            : undefined,
    ]);

    if (fieldErrors !== undefined) {
        assert.deepStrictEqual(shownFieldErrors, fieldErrors);
    }

    if (generalError !== undefined) {
        assert.deepStrictEqual(shownGeneralError, generalError);
    }
    return email;
}

async function epSignIn(page, email, errorMessage, password = "Str0ngP@ssw0rd") {
    const link = await getSignInOrSignUpSwitchLink(page);
    const linkText = await link.evaluate((e) => e.textContent);
    if (linkText === "Sign In") {
        await link.click();
    }
    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: password },
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
