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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    assertProviders,
    clickOnProviderButton,
    defaultSignUp,
    getUserIdWithFetch,
    getLogoutButton,
    signUp,
    toggleSignInSignUp,
    loginWithAuth0,
    getLoginWithRedirectToSignIn,
    getLoginWithRedirectToSignUp,
    getAuthPageHeaderText,
    screenshotOnFailure,
    setInputValues,
    submitForm,
    getGeneralError,
    waitForSTElement,
    waitFor,
    getFieldErrors,
    clickOnProviderButtonWithoutWaiting,
    getFeatureFlags,
    setSelectDropdownValue,
    getInputField,
    getLabelsText,
    isReact16,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    SIGN_IN_UP_API,
    SIGN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
    EMAIL_EXISTS_API,
    GET_AUTH_URL_API,
    SIGN_IN_API,
} from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Third Party Email Password", function () {
    let browser;
    let page;
    let consoleLogs;

    const appConfig = {};

    before(async function () {
        await backendHook("before");
        const coreUrl = await setupCoreApp();
        appConfig.coreUrl = coreUrl;
        await setupST(appConfig);

        browser = await setupBrowser();
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    });

    describe("redirectToAuth test", function () {
        it("Show signin first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignIn(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign In");
        });

        it("Show signup first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignUp(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign Up");
        });
    });

    describe("Third Party Email Password test", function () {
        it("Successful signup with credentials", async function () {
            await toggleSignInSignUp(page);
            await defaultSignUp(page, "thirdpartyemailpassword");
            const pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
        });

        it("should show error message on sign up with duplicate email on sign up click", async function () {
            await toggleSignInSignUp(page);

            const requestHandler = (request) => {
                if (request.url().includes(EMAIL_EXISTS_API) && request.method() === "GET") {
                    return request.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "OK",
                            exists: false,
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@assw0rd" },
                    { name: "name", value: "Supertokens" },
                    { name: "age", value: "20" },
                ]);
                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='inputErrorMessage']");
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            let [emailError] = await getFieldErrors(page);
            assert.deepStrictEqual(emailError, "This email already exists. Please sign in instead.");
        });

        it("should show error message when duplicate email is typed", async function () {
            await toggleSignInSignUp(page);

            const requestHandler = (request) => {
                if (request.url().includes(EMAIL_EXISTS_API) && request.method() === "GET") {
                    return request.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "OK",
                            exists: true,
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            let [emailError] = await getFieldErrors(page);
            assert.deepStrictEqual(emailError, "This email already exists. Please sign in instead");
        });

        it("should clear errors when switching to signup", async function () {
            await setInputValues(page, [
                { name: "email", value: `john.doe+${Date.now()}@supertokens.io` },
                { name: "password", value: "********" },
            ]);

            await submitForm(page);

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, "Incorrect email and password combination");
            await toggleSignInSignUp(page);
            await waitForSTElement(page, "[data-supertokens~=generalError]", true);
        });

        it("should clear errors when switching to sign in", async function () {
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: `john.doe+${Date.now()}@supertokens.io` },
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
                { name: "age", value: "20" },
            ]);

            const requestHandler = (request) => {
                if (request.url() === SIGN_UP_API && request.method() === "POST") {
                    return request.respond({
                        status: 500,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "BAD_INPUT",
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await submitForm(page);

                await page.waitForResponse((response) => response.url() === SIGN_UP_API && response.status() === 500);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            // Assert server Error
            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
            await toggleSignInSignUp(page);
            await waitForSTElement(page, "[data-supertokens~=generalError]", true);
        });

        it("Successful signin/up with auth0", async function () {
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
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SIGN_IN_AND_UP",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD PRE_API_HOOKS THIRD_PARTY_SIGN_IN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });

        it("No account consolidation", async function () {
            // 1. Sign up with credentials
            await toggleSignInSignUp(page);
            await signUp(
                page,
                [
                    { name: "email", value: "bradparishdoh@gmail.com" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                    { name: "name", value: "John Doe" },
                    { name: "age", value: "20" },
                ],
                '{"formFields":[{"id":"email","value":"bradparishdoh@gmail.com"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}',
                "thirdpartyemailpassword"
            );
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            const emailPasswordUserId = await getUserIdWithFetch(page);
            const logoutButton = await getLogoutButton(page);
            await Promise.all([await logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth");
            // 2. Sign in with auth0 with same address.
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/dashboard");
            const thirdPartyUserId = await getUserIdWithFetch(page);

            // 3. Compare userIds
            assert.notDeepStrictEqual(thirdPartyUserId, emailPasswordUserId);
        });

        it("clientType should be included when getting the auth url", async function () {
            await page.evaluate(() => {
                localStorage.setItem("clientType", `test-web`);
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const res = await Promise.all([
                page.waitForRequest((request) => request.url().startsWith(GET_AUTH_URL_API)),
                clickOnProviderButtonWithoutWaiting(page, "Auth0"),
            ]);

            const url = new URL(res[0].url());
            assert.strictEqual(url.searchParams.get("clientType"), "test-web");
        });

        it.skip("should handle no providers enabled on the backend", async function () {
            if (!(await getFeatureFlags()).includes("recipeConfig")) {
                this.skip();
            }
            await assertProviders(page);
            await setupST({
                ...appConfig,
                enabledRecipes: ["thirdparty"],
                enabledProviders: [],
            });

            await Promise.all([
                page.waitForResponse(
                    (response) => response.url().startsWith(GET_AUTH_URL_API) && response.status() === 400
                ),
                clickOnProviderButtonWithoutWaiting(page, "Auth0"),
            ]);
            assert.strictEqual(await getGeneralError(page), "Something went wrong. Please try again.");
        });
    });

    describe("Third Party callback error tests", function () {
        it("No state (Duplicate from third party)", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SIGN_IN_AND_UP",
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth/");
            assert.deepStrictEqual(search, "?error=signin");
        });
    });

    describe("Test pre api hooks", function () {
        beforeEach(async function () {
            await page.evaluate(() => window.localStorage.removeItem("getAuthorisationURLFromBackend-pre-api-hook"));
            await page.evaluate(() =>
                window.localStorage.removeItem("getAuthorisationURLWithQueryParamsAndSetState-pre-api-hook")
            );
        });

        afterEach(async function () {
            await page.evaluate(() => window.localStorage.removeItem("getAuthorisationURLFromBackend-pre-api-hook"));
            await page.evaluate(() =>
                window.localStorage.removeItem("getAuthorisationURLWithQueryParamsAndSetState-pre-api-hook")
            );
        });

        it("Test that pre api hook is called when using it in overrides", async function () {
            // This will trigger a function call to getAuthorisationURLWithQueryParamsAndSetState
            await page.evaluate(() =>
                window.dispatchEvent(new Event("TPEP.getAuthorisationURLWithQueryParamsAndSetState"))
            );
            await waitFor(2000); // Adding delay to let network call finish

            // getAuthorisationURLWithQueryParamsAndSetState calls getAuthorisationURLFromBackend internally
            const getAuthFromBackendInStorage = await page.evaluate(() =>
                window.localStorage.getItem("getAuthorisationURLFromBackend-pre-api-hook")
            );

            assert.strictEqual(getAuthFromBackendInStorage, "true");
        });
    });
});
