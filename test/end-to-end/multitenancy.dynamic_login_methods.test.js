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
    getProviderLogoCount,
    getGeneralError,
    getSignInOrSignUpSwitchLink,
    setInputValues,
    submitForm,
    clearBrowserCookiesWithoutAffectingConsole,
    clickOnProviderButton,
    loginWithMockProvider,
    isMultitenancySupported,
    isMultitenancyManagementEndpointsSupported,
    setupTenant,
    getTextByDataSupertokens,
    loginWithAuth0,
    setupCoreApp,
    setupST,
    backendHook,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    DEFAULT_WEBSITE_BASE_PATH,
    SIGN_IN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
    LOGIN_METHODS_API,
} from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Multitenancy dynamic login methods", function () {
    let browser;
    let page;
    let pageCrashed;
    let appId;

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
            // console.log(c.text());
            if (c.text() === "ST_THROWN_ERROR") {
                pageCrashed = true;
            }
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

    it("Renders correct signup form with emailpassword when core list of providers is empty", async function () {
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
        const providers = await getProvidersLabels(page);
        compareArrayContents(
            providers,
            (await isMultitenancyManagementEndpointsSupported())
                ? [
                      "Continue with Github",
                      "Continue with Google",
                      "Continue with Facebook",
                      "Continue with Auth0",
                      "Continue with Mock Provider",
                  ]
                : ["Continue with Github", "Continue with Google", "Continue with Facebook", "Continue with Auth0"]
        );
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
        compareArrayContents(providers, ["Continue with Apple"]);
    });

    it("should postpone render with react-router-dom", async function () {
        await page.setRequestInterception(true);
        const requestHandler = (request) => {
            if (request.url().startsWith(LOGIN_METHODS_API)) {
                setTimeout(() => request.continue(), 500);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);

        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);

        const spinner = await waitForSTElement(page, "[data-supertokens~=delayedRender]");
        assert.ok(spinner);
        await page.waitForTimeout(2000);
        const providers = await getProvidersLabels(page);
        compareArrayContents(providers, ["Continue with Apple"]);
    });

    it("should postpone render with no react-router-dom", async function () {
        await page.setRequestInterception(true);
        let resolveLoginMethodsReq;
        const loginMethodsReqPromise = new Promise((res) => {
            resolveLoginMethodsReq = res;
        });
        const requestHandler = async (request) => {
            if (request.url().startsWith(LOGIN_METHODS_API)) {
                await loginMethodsReqPromise;
                request.continue();
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`);

        const spinner = await waitForSTElement(page, "[data-supertokens~=delayedRender]");
        assert.ok(spinner);
        resolveLoginMethodsReq();
        const providers = await getProvidersLabels(page);
        compareArrayContents(providers, ["Continue with Apple"]);
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
        const input = await page.$("[data-supertokens~=input][name=email]");
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
        await waitForSTElement(page, "[data-supertokens~=input][name=email]");
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
        compareArrayContents(providers, ["Continue with Apple"]);
        await waitForSTElement(page, "[data-supertokens~=input][name=email]");
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
        compareArrayContents(providers, ["Continue with Github", "Continue with Github-1"]);
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

        compareArrayContents(providers, ["Continue with Test"]);
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
        compareArrayContents(providers, ["Continue with Apple", "Continue with Google"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    it("should show BE static providers if the list from core is empty", async function () {
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
        compareArrayContents(
            providers,
            (await isMultitenancyManagementEndpointsSupported())
                ? [
                      "Continue with Github",
                      "Continue with Google",
                      "Continue with Facebook",
                      "Continue with Auth0",
                      "Continue with Mock Provider",
                  ]
                : ["Continue with Github", "Continue with Google", "Continue with Facebook", "Continue with Auth0"]
        );
        assert.strictEqual(await getProviderLogoCount(page), 3);
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
        compareArrayContents(providers, ["Continue with Apple", "Continue with Google"]);
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
        compareArrayContents(providers, ["Continue with Google", "Continue with Facebook"]);
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
        compareArrayContents(providers, ["Continue with Google", "Continue with Facebook"]);
        assert.strictEqual(await getProviderLogoCount(page), 2);
    });

    // Examples from https://supertokens.com/docs/contribute/decisions/multitenancy/0006

    it("should show emailpassword if it's the only one added on both", async function () {
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

    it("should show thirdpartyemailpassword with emailpassword disabled if FE only has tpep but only thirdparty is enabled", async function () {
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
        assert.strictEqual(await getTextByDataSupertokens(page, "headerTitle"), "Sign Up / Sign In");
    });

    it("should show thirdpartyemailpassword if FE has tpep and both emailpassword and thirdparty is enabled", async function () {
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
    it.skip("should show emailpassword if FE has tp and ep but (no tpep) and both emailpassword and thirdparty is enabled", async function () {
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

    it.skip("should show thirdparty if FE has tp and pwless and both emailpassword and thirdparty is enabled", async function () {
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

    it("should show thirdpartyemailpassword if FE has tpep and ep and both emailpassword and thirdparty is enabled", async function () {
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

    it("should show thirdpartypasswordless if FE has tppwless and ep and both emailpassword and thirdparty is enabled", async function () {
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
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should show thirdpartyemailpassword if FE has tpep and tppwless and all 3 enabled in core", async function () {
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
        assert.deepStrictEqual(inputNames, ["email"]);
    });

    it("should show thirdpartypwless if rid has FE has tpep and tppwless and all 3 enabled in core", async function () {
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
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=thirdpartypasswordless`),
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
        assert.deepStrictEqual(inputNames, ["email"]);
    });

    it("should show thirdpartyemailpassword if FE has only tpep and thirdparty is disbled in core", async function () {
        await setEnabledRecipes(page, ["thirdparty", "emailpassword"]);
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

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should show thirdpartyemailpassword if FE has only tpep and thirdparty is disbled in core", async function () {
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

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should show thirdpartpasswordless if FE has only tppwless and thirdparty is disbled in core", async function () {
        await setEnabledRecipes(page, ["thirdparty", "passwordless"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: true },
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

        // pwless
        await waitForSTElement(page, "[data-supertokens~=input][name=email]");
    });

    it("should show thirdpartpasswordless if FE has only tppwless and passwordless is disbled in core", async function () {
        await setEnabledRecipes(page, ["thirdparty", "passwordless"]);
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

        // pwless
        await waitForSTElement(page, "[data-supertokens~=input][name=email]", true);
    });

    it("should show something went wrong if logging in with disabled method", async function () {
        await setEnabledRecipes(page, ["emailpassword"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: true },
            thirdParty: {
                enabled: false,
                providers: [],
            },
        });

        await page.evaluate(() => {
            window.localStorage.setItem("usesDynamicLoginMethods", "false");
        });

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const link = await getSignInOrSignUpSwitchLink(page);
        await link.click();

        const email = `john.doe.${Date.now()}@supertokens.io`;

        await setInputValues(page, [
            { name: "email", value: email },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
            { name: "country", value: "" },
        ]);

        let [_, error] = await Promise.all([submitForm(page), getGeneralError(page)]);

        assert.strictEqual(error, SOMETHING_WENT_WRONG_ERROR);
    });

    it.skip("should show thirdparty if FE has tp and pwless and both emailpassword and thirdparty is enabled", async function () {
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
        await waitForSTElement(page, `[data-supertokens~='dividerWithOr']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should be able to log in with dynamically added tp providers", async function () {
        // This test is particularly slow, overriding the timeout to be slightly longer than default
        this.timeout(40000);

        await setEnabledRecipes(page, ["thirdparty"]);
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [
                    { id: "apple", name: "Apple" },
                    { id: "auth0", name: "Auth0" },
                    { id: "auth0-1", name: "Auth0 CustomName" },
                ],
            },
        });

        await page.evaluate((TEST_CLIENT_BASE_URL) => {
            localStorage.setItem("thirdPartyRedirectURL", `${TEST_CLIENT_BASE_URL}/auth/callback/auth0`);
        }, TEST_CLIENT_BASE_URL);

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        await clickOnProviderButton(page, "Auth0");
        await Promise.all([
            loginWithAuth0(page),
            page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
        ]);
        await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
        await clearBrowserCookiesWithoutAffectingConsole(page, []);

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        await clickOnProviderButton(page, "Auth0 CustomName");
        await Promise.all([
            loginWithAuth0(page),
            page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
        ]);
        await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
        await clearBrowserCookiesWithoutAffectingConsole(page, []);
    });
});

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

export async function enableDynamicLoginMethods(page, mockLoginMethods, tenantId = "public") {
    await setupTenant(tenantId, mockLoginMethods);

    return page.evaluate(() => {
        window.localStorage.setItem("usesDynamicLoginMethods", "true");
    });
}

/**
 *
 * @param {Array<string>} actual
 * @param {Array<string>} expected
 * @returns
 */
function compareArrayContents(actual, expected) {
    return assert.deepStrictEqual(actual.sort(), expected.sort());
}
