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
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
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
    loginWithGoogle,
    clearBrowserCookiesWithoutAffectingConsole,
    clickOnProviderButton,
    loginWithAuth0,
    isMultitenancySupported,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    DEFAULT_WEBSITE_BASE_PATH,
    ST_ROOT_SELECTOR,
    TEST_SERVER_BASE_URL,
    SIGN_IN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
} from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Multitenancy dynamic login methods", function () {
    let browser;
    let page;
    let pageCrashed;

    before(async function () {
        const isSupported = await isMultitenancySupported();
        if (!isSupported) {
            this.skip();
        }
    });

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
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await clearDynamicLoginMethodsSettings(page);
    });

    afterEach(async function () {
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
        await screenshotOnFailure(this, browser);
        if (page) {
            await page.close();
        }
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

    it("Renders correct signup form with emailpassword when core list of providers is empty", async function () {
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
        const providers = await getProvidersLabels(page);
        compareArrayContents(providers, [
            "Continue with Github",
            "Continue with Google",
            "Continue with Facebook",
            "Continue with Auth0",
        ]);
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
        await enableDynamicLoginMethods(page, {
            emailPassword: { enabled: false },
            passwordless: { enabled: false },
            thirdParty: {
                enabled: true,
                providers: [{ id: "apple", name: "Apple" }],
            },
        });
        await Promise.all([page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`)]);

        const spinner = await waitForSTElement(page, "[data-supertokens~=delayedRender]");
        assert.ok(spinner);
        await page.waitForTimeout(2000);
        const providers = await getProvidersLabels(page);
        compareArrayContents(providers, ["Continue with Apple"]);
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

        const spinner = await waitForSTElement(page, "[data-supertokens~=delayedRender]");
        assert.ok(spinner);
        await page.waitForTimeout(2000);
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
        compareArrayContents(providers, ["Continue with Apple"]);
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
        compareArrayContents(providers, [
            "Continue with Github",
            "Continue with Google",
            "Continue with Facebook",
            "Continue with Auth0",
        ]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdpartyemailpassword with emailpassword disabled if FE only has tpep but only thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdpartyemailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdpartyemailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, false);

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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, true);

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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and ep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdpartyemailpassword", "emailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdpartypasswordless if FE has tppwless and ep and both emailpassword and thirdparty is enabled", async function () {
        await setEnabledRecipes(page, ["thirdpartypasswordless", "emailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyPasswordlessDivider']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should show thirdpartyemailpassword if FE has tpep and tppwless and all 3 enabled in core", async function () {
        await setEnabledRecipes(page, ["thirdpartypasswordless", "thirdpartyemailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show thirdpartypwless if rid has FE has tpep and tppwless and all 3 enabled in core", async function () {
        await setEnabledRecipes(page, ["thirdpartypasswordless", "thirdpartyemailpassword"]);
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, false);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("should should show something went wrong if logging in with disabled method", async function () {
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
        await waitForSTElement(page, `[data-supertokens~='thirdPartyEmailPasswordDivider']`, true);

        // Emailpassword
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, []);
    });

    it("should should be able to log in with dynamically added tp providers", async function () {
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

export async function enableDynamicLoginMethods(page, mockLoginMethods, tenantId = "public", app = "public") {
    let coreResp = await fetch(`http://localhost:9000/appid-${app}/recipe/multitenancy/tenant`, {
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

    for (const provider of mockLoginMethods["thirdParty"]?.providers) {
        coreResp = await fetch(`http://localhost:9000/appid-${app}/${tenantId}/recipe/multitenancy/config/thirdparty`, {
            method: "PUT",
            headers: new Headers([
                ["content-type", "application/json"],
                ["rid", "multitenancy"],
            ]),
            body: JSON.stringify({
                skipValidation: true,
                config: {
                    ...providerConfigs[provider.id.split("-")[0]],
                    thirdPartyId: provider.id,
                    name: provider.name,
                },
            }),
        });

        assert.strictEqual(coreResp.status, 200);
    }
    coreResp = await fetch(`http://localhost:9000/appid-${app}/${tenantId}/recipe/multitenancy/tenant`, {
        method: "GET",
        headers: new Headers([
            ["content-type", "application/json"],
            ["rid", "multitenancy"],
        ]),
    });

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

const providerConfigs = {
    apple: {
        clients: [
            {
                clientId: "4398792-io.supertokens.example.service",
                additionalConfig: {
                    keyId: "7M48Y4RYDL",
                    privateKey:
                        "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                    teamId: "YWQCXGJRJL",
                },
            },
        ],
    },
    github: {
        clients: [
            {
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                clientId: "467101b197249757c71f",
            },
        ],
    },
    google: {
        clients: [
            {
                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
            },
        ],
    },
    auth0: {
        // this contains info about forming the authorisation redirect URL without the state params and without the redirect_uri param
        authorizationEndpoint: `https://${process.env.AUTH0_DOMAIN}/authorize`,
        authorizationEndpointQueryParams: {
            scope: "openid profile email email_verified",
        },
        jwksURI: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        tokenEndpoint: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        clients: [
            {
                clientId: process.env.AUTH0_CLIENT_ID,
                clientSecret: process.env.AUTH0_CLIENT_SECRET,
            },
        ],
        userInfoMap: {
            fromIdTokenPayload: {
                userId: "sub",
                email: "email",
                emailVerified: "email_verified",
            },
        },
    },
    test: {
        // We add a client since it's required
        clients: [
            {
                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
            },
        ],
    },
};
