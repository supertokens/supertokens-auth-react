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
    assertProviders,
    clickOnProviderButton,
    getUserIdWithFetch,
    getLogoutButton,
    signUp,
    toggleSignInSignUp,
    loginWithAuth0,
    setInputValues,
    submitForm,
    waitForSTElement,
    getPasswordlessDevice,
    setPasswordlessFlowType,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Third Party Passwordless", function () {
    let browser;
    let page;
    let consoleLogs;

    const email = "bradparishdoh@gmail.com";

    before(async function () {
        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
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

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST",
        }).catch(console.error);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE_AND_MAGIC_LINK"),
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

    describe("Third Party Email Password test", function () {
        it("Successful signup with user input code", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            try {
                await setInputValues(page, [{ name: "emailOrPhone", value: "+36701231212" }]);
            } catch (ex) {
                await page.screenshot({ path: "screenshot.jpeg" });
                throw ex;
            }
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

        it("Successful signup with magic link", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await setInputValues(page, [{ name: "emailOrPhone", value: "+36701231212" }]);
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await page.goto(device.codes[0].urlWithLinkCode);

            await page.waitForSelector(".sessionInfo-user-id");
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
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE REDIRECT_TO_THIRD_PARTY_LOGIN",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE SET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_AUTHORISATION_URL",
                "ST_LOGS THIRDPARTYPASSWORDLESS PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE THIRD_PARTY_SIGN_IN_AND_UP",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS PRE_API_HOOKS THIRD_PARTY_SIGN_IN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS THIRDPARTYPASSWORDLESS ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS GET_REDIRECTION_URL SUCCESS",
                "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });

        it("No account consolidation", async function () {
            // 1. Sign up with credentials
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "USER_INPUT_CODE");
            page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
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
            assert.notDeepStrictEqual(thirdPartyUserId, passwordlessUserId);
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
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE THIRD_PARTY_SIGN_IN_AND_UP",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRDPARTYPASSWORDLESS GET_REDIRECTION_URL SIGN_IN_AND_UP",
                "ST_LOGS THIRDPARTYPASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(pathname, "/auth");
            assert.deepStrictEqual(search, "?rid=thirdpartypasswordless&error=signin");
        });
    });
});
