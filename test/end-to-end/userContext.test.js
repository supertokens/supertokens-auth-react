/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLatestURLWithToken,
    toggleSignInSignUp,
    defaultSignUp,
    setInputValues,
    submitFormReturnRequestAndResponse,
    assertProviders,
    clickOnProviderButton,
    loginWithAuth0,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    RESET_PASSWORD_TOKEN_API,
    RESET_PASSWORD_API,
    SIGN_IN_UP_API,
} from "../constants";
import assert from "assert";

// Run the tests in a DOM environment.
require("jsdom-global")();

describe("SuperTokens userContext with UI components test", function () {
    let browser;
    let page;
    let consoleLogs = [];

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

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    });

    it("Test that user context gets passed correctly when resetting password", async function () {
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword&mode=OFF&forUserContext=true`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        // Sign Up first.
        await toggleSignInSignUp(page);
        await defaultSignUp(page, "thirdpartyemailpassword");

        await page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?disableDefaultUI=true&forUserContext=true`);

        await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
        await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API);

        const latestURLWithToken = await getLatestURLWithToken();
        await page.goto(latestURLWithToken + "&disableDefaultUI=true&forUserContext=true");

        await setInputValues(page, [
            { name: "password", value: "NEW_Str0ngP@ssw0rd" },
            { name: "confirm-password", value: "NEW_Str0ngP@ssw0rd" },
        ]);
        await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SEND_PASSWORD_RESET_EMAIL RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SUBMIT_NEW_PASSWORD RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_RESET_TOKEN_FROM_URL RECEIVED_USER_CONTEXT"
            )
        );
    });

    it("Test that userContext is passed correctly when using third party with Auth0", async function () {
        await page.setRequestInterception(true);
        page.on("request", (req) => {
            const originalURL = req.url();
            // For this test we want to use the SignInUpCallback component manually
            if (req.isNavigationRequest() && req.url().includes("/auth/callback/auth0")) {
                const URLObj = new URL(originalURL);
                URLObj.pathname = "/auth/customcallback/auth0";
                req.respond({
                    status: 302,
                    headers: {
                        location: URLObj.toString(),
                    },
                });
            } else {
                req.continue();
            }
        });

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?disableDefaultUI=true&forUserContext=true`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        await assertProviders(page);
        await clickOnProviderButton(page, "Auth0");
        await Promise.all([
            loginWithAuth0(page),
            page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
        ]);
        const pathname = await page.evaluate(() => window.location.pathname);
        assert.deepStrictEqual(pathname, "/dashboard");

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes("ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GENERATE_STATE RECEIVED_USER_CONTEXT")
        );

        assert(
            consoleLogs.includes("ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SET_OAUTH_STATE RECEIVED_USER_CONTEXT")
        );

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_AUTHORISATION_URL RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes("ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE SIGN_IN_AND_UP RECEIVED_USER_CONTEXT")
        );

        assert(
            consoleLogs.includes("ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_STATE RECEIVED_USER_CONTEXT")
        );

        assert(consoleLogs.includes("ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE VERIFY_STATE RECEIVED_USER_CONTEXT"));

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_AUTH_CODE_FROM_URL RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_OAUTH_AUTHORISATION_URL RECEIVED_USER_CONTEXT"
            )
        );

        assert(
            consoleLogs.includes(
                "ST_LOGS THIRD_PARTY_EMAIL_PASSWORD OVERRIDE GET_AUTH_ERROR_FROM_URL RECEIVED_USER_CONTEXT"
            )
        );
    });
});
