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
    waitForSTElement,
    screenshotOnFailure,
    getProvidersLabels,
    getInputNames,
    assertNoSTComponents,
    assertProviders,
    getProviderLogoCount,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
    isMultitenancySupported,
    isMultitenancyManagementEndpointsSupported,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, DEFAULT_WEBSITE_BASE_PATH, ST_ROOT_SELECTOR } from "../constants";

/*
 * Tests.
 */
describe.skip("SuperTokens Multitenancy w/ mocked login methods", function () {
    let browser;
    let page;
    let pageCrashed;

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
        await setupST({ coreUrl });

        page = await browser.newPage();
        pageCrashed = false;
        page.on("console", (c) => {
            if (c.text() === "ST_THROWN_ERROR") {
                pageCrashed = true;
            }
            // console.log(c.text());
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await clearDynamicLoginMethodsSettings(page);
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

    it("Renders correct signup form with emailpassword only when list of providers is empty", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: true },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: true,
                providers: [],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await assertProviders(page);
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("throws when core recipes have no overlap with frontend recipes", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: false,
                providers: [],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await assertNoSTComponents(page);
        assert(pageCrashed);
    });

    it("throws when core recipes have no overlap with frontend recipes without react-router-dom", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: false,
                providers: [],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await assertNoSTComponents(page);
        assert(pageCrashed);
    });

    it("Renders providers from core", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: true },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
    });

    it("should postpone render with no react-router-dom", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await Promise.all([page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`)]);
        const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
        assert.deepStrictEqual(superTokensComponent, null);
        await page.waitForTimeout(2000);
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
    });

    it("renders passwordless form only when enabled on the core", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
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
        const input = await page.$("[data-supertokens~=input][name=emailOrPhone]");
        assert.deepStrictEqual(input, null);

        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: false,
                providers: [],
            },
        });
        await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
        await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
    });

    it("renders thirdpartypasswordless form when enabled on the core", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
        await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
    });

    it("Renders providers based on the prefix", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "github",
                        name: "Github",
                    },
                    {
                        id: "github-1",
                        name: "Github-1",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Github", "Continue with Github-1"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    it("Renders custom provider set in the core", async function () {
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "test",
                        name: "Test",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Test"]);
        assert.strictEqual(await getProviderLogoCount(page), 0);
    });

    // Examples from https://supertokens.com/docs/contribute/decisions/multitenancy/0002
    it("should show built-in providers added in core w/ empty static provider list", async function () {
        await setStaticProviderList(page, []);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "apple",
                    },
                    {
                        id: "google",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple", "Continue with Google"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });
    it("should show static providers if the list from core is empty", async function () {
        await setStaticProviderList(page, ["google"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
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

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Google"]);
        assert.strictEqual(await getProviderLogoCount(page), 1);
    });

    it("should only show providers enabled on the core", async function () {
        await setStaticProviderList(page, ["apple", "google", "facebook"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "apple",
                    },
                    {
                        id: "google",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple", "Continue with Google"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    it("should only show providers enabled on the core initializing built-ins if necessary", async function () {
        await setStaticProviderList(page, ["apple", "google", "facebook"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "google",
                    },
                    {
                        id: "facebook",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Google", "Continue with Facebook"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    it("should only show providers enabled on the core even if there is no overlap between the lists", async function () {
        await setStaticProviderList(page, ["apple"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    {
                        id: "google",
                        name: "Google",
                    },
                    {
                        id: "facebook",
                    },
                ],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Google", "Continue with Facebook"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    // Examples from https://supertokens.com/docs/contribute/decisions/multitenancy/0006

    it("should should show emailpassword if it's the only one added on both", async function () {
        await setEnabledRecipes(page, ["emailpassword"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: true },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: false,
                providers: [],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.strictEqual(providers.length, 0);
        assert.strictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdpartyemailpassword with emailpassword disabled if FE only has tpep but only thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    // This is slightly different than the version in the ADR, since it hasn't been updated
    it("should should show emailpassword if FE has tp and ep but (no tpep) and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.strictEqual(providers.length, 0);
        assert.strictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdparty if FE has tp and pwless and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "passwordless"]);
        await enableDynamicLoginMethods(page, {
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and ep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdpartypasswordless if FE has tpep and ep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdparty", "passwordless", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
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

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and tppwless and all 3 enabled in core", async function () {
        await setEnabledRecipes(page, ["thirdparty", "passwordless", "emailpassword"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: true },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: true,
                providers: [],
            },
        });
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        // Thirdparty
        const providers = await getProvidersLabels(page);
        assert.notStrictEqual(providers.length, 0);
        assert.notStrictEqual(await getProviderLogoCount(page), 0);

        // Divider
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });
});

function enableDynamicLoginMethods(page, mockLoginMethods) {
    return page.evaluate((serializedLoginMethods) => {
        window.localStorage.setItem("usesDynamicLoginMethods", "true");
        window.localStorage.setItem("mockLoginMethodsForDynamicLogin", serializedLoginMethods);
    }, JSON.stringify(mockLoginMethods));
}

function setEnabledRecipes(page, recipeIds) {
    return page.evaluate((serializedRecipeIdList) => {
        window.localStorage.setItem("clientRecipeListForDynamicLogin", serializedRecipeIdList);
    }, JSON.stringify(recipeIds));
}

function setStaticProviderList(page, providerIds) {
    return page.evaluate((providerIds) => {
        window.localStorage.setItem("staticProviderList", providerIds);
    }, JSON.stringify(providerIds));
}

function clearDynamicLoginMethodsSettings(page) {
    return page.evaluate(() => {
        window.localStorage.removeItem("usesDynamicLoginMethods");
        window.localStorage.removeItem("mockLoginMethodsForDynamicLogin");
        window.localStorage.removeItem("clientRecipeListForDynamicLogin");
        window.localStorage.removeItem("staticProviderList");
    });
}
