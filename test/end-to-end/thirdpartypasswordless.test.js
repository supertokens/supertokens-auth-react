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
    clickOnProviderButton,
    getUserIdWithFetch,
    getLogoutButton,
    loginWithMockProvider,
    setInputValues,
    submitForm,
    waitForSTElement,
    getPasswordlessDevice,
    getFeatureFlags,
    assertProviders,
    clickOnProviderButtonWithoutWaiting,
    getGeneralError,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
    screenshotOnFailure
} from "../helpers";
import { TEST_CLIENT_BASE_URL, SIGN_IN_UP_API, GET_AUTH_URL_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Third Party Passwordless", function () {
    let browser;
    let page;
    let consoleLogs;

    const email = "bradparishdoh@gmail.com";

    const signInUpPageLoadLogs = [
        "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
        "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
    ];

    const appConfig = {};

    before(async function () {
        backendHook("before");
        const features = await getFeatureFlags();
        if (!features.includes("passwordless")) {
            this.skip();
        }
    });

    describe("Recipe combination tests", () => {
        before(async function () {
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

        beforeEach(async function () {
            await backendHook("beforeEach");
            consoleLogs = [];
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await setupST({
                ...appConfig,
                passwordlessContactMethod: "EMAIL_OR_PHONE",
                passwordlessFlowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            });
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL_OR_PHONE`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
        });

        afterEach(async function () {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await screenshotOnFailure(this, browser);
            await backendHook("afterEach");
        });

        after(async function () {
            await page?.close();
            await browser?.close();
            await backendHook("after");
        });

        it("No account consolidation", async function () {
            // 1. Sign up with credentials
            await setupST({
                ...appConfig,
                passwordlessContactMethod: "EMAIL_OR_PHONE",
                passwordlessFlowType: "USER_INPUT_CODE",
            });
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "email", value: email }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
            const passwordlessUserId = await getUserIdWithFetch(page);

            // 2. Log out
            const logoutButton = await getLogoutButton(page);
            await Promise.all([await logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            await waitForSTElement(page, `input[name=email]`);

            // 3. Sign in with SSO with same address.
            await clickOnProviderButton(page, "Mock Provider");
            await Promise.all([
                loginWithMockProvider(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
            const thirdPartyUserId = await getUserIdWithFetch(page);

            // 4. Compare userIds
            assert.notDeepStrictEqual(thirdPartyUserId, passwordlessUserId);
        });

        it("Successful signin with passwordless w/ required email verification", async function () {
            await setupST({
                ...appConfig,
                passwordlessContactMethod: "EMAIL_OR_PHONE",
                passwordlessFlowType: "USER_INPUT_CODE",
            });
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "email", value: "surely-not-verified" + email }]);
            await submitForm(page);
            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
            await waitForUrl(page, "/dashboard");

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                ...signInUpPageLoadLogs,
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                ...signInUpPageLoadLogs,
                "ST_LOGS PASSWORDLESS OVERRIDE CREATE_CODE",
                "ST_LOGS PASSWORDLESS PRE_API_HOOKS PASSWORDLESS_CREATE_CODE",
                "ST_LOGS PASSWORDLESS ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT",
                "ST_LOGS PASSWORDLESS OVERRIDE SET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS PASSWORDLESS OVERRIDE CONSUME_CODE",
                "ST_LOGS PASSWORDLESS PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                "ST_LOGS PASSWORDLESS ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS PASSWORDLESS OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO",

                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS PASSWORDLESS",

                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });

        it("should handle no providers enabled on the backend", async function () {
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
});
