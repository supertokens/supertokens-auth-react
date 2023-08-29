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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    clickOnProviderButton,
    getUserIdWithFetch,
    getLogoutButton,
    loginWithAuth0,
    setInputValues,
    submitForm,
    waitForSTElement,
    getPasswordlessDevice,
    setPasswordlessFlowType,
    getFeatureFlags,
    isReact16,
    setAccountLinkingConfig,
    signUp,
    toggleSignInSignUp,
    getInputAdornmentsSuccess,
    getInputAdornmentsError,
    getFieldErrors,
    assertProviders,
    getGeneralError,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API } from "../constants";
import { getThirdPartyTestCases } from "./thirdparty.test";
import { getPasswordlessTestCases } from "./passwordless.test";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Account linking Third Party Passwordless", function () {
    let browser;
    let page;
    let consoleLogs;

    const signInUpPageLoadLogs = isReact16()
        ? ["ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO"]
        : [
              "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
              "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
          ];

    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("thirdpartypasswordless")) {
            this.skip();
        }
    });

    describe("Recipe combination tests", () => {
        before(async function () {
            await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                method: "POST",
            }).catch(console.error);

            await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                method: "POST",
            }).catch(console.error);

            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: false,
            });
            page = await browser.newPage();
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
        });

        after(async function () {
            await browser.close();
            await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                method: "POST",
            }).catch(console.error);

            await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
                method: "POST",
            }).catch(console.error);
        });

        beforeEach(async function () {
            consoleLogs = [];
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE_AND_MAGIC_LINK");
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL_OR_PHONE`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
        });

        afterEach(async function () {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
        });

        it("should consolidate accounts", async function () {
            const email = "bradparishdoh@gmail.com";
            setAccountLinkingConfig(true, true, true);
            // 1. Sign up with credentials
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE");
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
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

            await waitForSTElement(page, `input[name=emailOrPhone]`);

            // 3. Sign in with auth0 with same address.
            await clickOnProviderButton(page, "Auth0");
            await Promise.all([
                loginWithAuth0(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
            const thirdPartyUserId = await getUserIdWithFetch(page);

            // 4. Compare userIds
            assert.strictEqual(thirdPartyUserId, passwordlessUserId);
        });

        it("should not allow sign up w/ emailpassword in case of conflict", async function () {
            const email = `test-user+${Date.now()}@supertokens.com`;

            await setAccountLinkingConfig(true, true, true);
            // 1. Sign up with credentials
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE");
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

            // 2. Log out
            const logoutButton = await getLogoutButton(page);
            await Promise.all([await logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            await waitForSTElement(page, `input[name=emailOrPhone]`);

            // 3. Try sign up with email password
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await toggleSignInSignUp(page);

            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: "Asdf12.." },
                { name: "name", value: "asdf" },
                { name: "age", value: "20" },
            ]);
            const successAdornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(successAdornments.length, 3);

            const errorAdornments = await getInputAdornmentsError(page);
            assert.strictEqual(errorAdornments.length, 1);
            let fieldErrors = await getFieldErrors(page);

            assert.deepStrictEqual(fieldErrors, ["This email already exists. Please sign in instead"]);
        });

        it("should not allow sign up w/ an unverified thirdparty user in case of conflict", async function () {
            const email = `test-user-${Date.now()}@supertokens.com`;

            await setAccountLinkingConfig(true, true, true);
            // 1. Sign up with credentials
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE");
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

            // 2. Log out
            const logoutButton = await getLogoutButton(page);
            await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            await waitForSTElement(page, `input[name=emailOrPhone]`);

            // 3. Try sign up with third party
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await assertProviders(page);

            await clickOnProviderButton(page, "Mock Provider");
            const url = new URL(page.url());
            assert.strictEqual(url.pathname, `/mockProvider/auth`);
            assert.ok(url.searchParams.get("state"));

            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${email}&userId=${email}&isVerified=false&state=${url.searchParams.get(
                        "state"
                    )}`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            assert.strictEqual(new URL(page.url()).pathname, "/auth/");
            assert.strictEqual(
                await getGeneralError(page),
                "Cannot sign in / up due to security reasons. Please contact support. (EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT)"
            );
        });

        it("should not allow using thirdparty sign in with changed email in case of conflict", async function () {
            const email = `test-user-${Date.now()}@supertokens.com`;
            const email2 = `test-user-2-${Date.now()}@supertokens.com`;

            await setAccountLinkingConfig(true, true, true);
            // 1. Sign up with credentials
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE");
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

            // 2. Log out
            const logoutButton = await getLogoutButton(page);
            await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            await waitForSTElement(page, `input[name=emailOrPhone]`);

            // 3. Sign up with third party
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await assertProviders(page);

            await clickOnProviderButton(page, "Mock Provider");
            const url = new URL(page.url());
            assert.strictEqual(url.pathname, `/mockProvider/auth`);
            assert.ok(url.searchParams.get("state"));

            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${email2}&userId=${email}&isVerified=false&state=${url.searchParams.get(
                        "state"
                    )}`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

            // 4. Log out
            const logoutButton2 = await getLogoutButton(page);
            await Promise.all([logoutButton2.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            // 5. Sign in with changed email address (thirdPartyUserId matching the previous sign in)
            await assertProviders(page);

            await clickOnProviderButton(page, "Mock Provider");
            const url2 = new URL(page.url());
            assert.strictEqual(url2.pathname, `/mockProvider/auth`);
            assert.ok(url2.searchParams.get("state"));

            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${email}&userId=${email}&isVerified=false&state=${url2.searchParams.get(
                        "state"
                    )}`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            assert.strictEqual(new URL(page.url()).pathname, "/auth/");
            assert.strictEqual(
                await getGeneralError(page),
                "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ANOTHER_PRIM_USER_HAS_EMAIL)"
            );
        });
    });
});
