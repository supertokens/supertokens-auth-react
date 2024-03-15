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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    setInputValues,
    submitForm,
    waitForSTElement,
    screenshotOnFailure,
    backendBeforeEach,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
    getFactorChooserOptions,
    setAccountLinkingConfig,
    isMFASupported,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { CREATE_CODE_API, CREATE_TOTP_DEVICE_API, MFA_INFO_API, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import { getTestPhoneNumber } from "../exampleTestHelpers";
import {
    setMFAInfo,
    tryEmailPasswordSignUp,
    waitForDashboard,
    completeOTP,
    setupOTP,
    logout,
    tryEmailPasswordSignIn,
    chooseFactor,
    tryPasswordlessSignInUp,
    setupTOTP,
    completeTOTP,
    setupUserWithAllFactors,
    goToFactorChooser,
    waitForAccessDenied,
    expectErrorThrown,
    waitForLoadingScreen,
    waitForBlockedScreen,
    addToRequiredSecondaryFactorsForUser,
} from "./mfa.helpers";

/*
 * Tests.
 */
describe("SuperTokens SignIn w/ MFA", function () {
    let browser;
    let page;
    let consoleLogs = [];
    let skipped = false;

    before(async function () {
        if (!(await isMFASupported())) {
            skipped = true;
            this.skip();
            return;
        }
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        await setAccountLinkingConfig(true, true, false);
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
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

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        if (page) {
            await page.close();
        }
    });

    beforeEach(async function () {
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            // console.log(log);
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

        await page.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
        await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
        await page.evaluate(() => window.localStorage.removeItem("mode"));
        await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));
    });

    describe("default requirements", () => {
        let email, phoneNumber;
        beforeEach(async () => {
            await setMFAInfo({});
            const setupPage = await browser.newPage();

            email = await getTestEmail();
            phoneNumber = getTestPhoneNumber();

            await Promise.all([
                setupPage.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                setupPage.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await setupPage.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            await tryEmailPasswordSignUp(setupPage, email);
            await waitForDashboard(setupPage);

            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(setupPage, []);

            await setupPage.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await setupPage.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
            await setupPage.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            await setupPage.close();
        });

        it("should not require any factors after sign up", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);
            await goToFactorChooser(page);
            const list = await getFactorChooserOptions(page);

            assert.deepStrictEqual(new Set(list), new Set(["otp-email", "otp-phone", "totp"]));
        });

        it("should require 2fa to sign in after setting up a factor - totp", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            const secret = await setupTOTP(page);
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await waitForDashboard(page);
            await addToRequiredSecondaryFactorsForUser(page, "totp");
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await completeTOTP(page, secret);
            await waitForDashboard(page);
        });

        it("should require 2fa to sign in after setting up a factor - otp-email", async () => {
            await tryEmailPasswordSignIn(page, email);
            await addToRequiredSecondaryFactorsForUser(page, "otp-email");
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await completeOTP(page, "EMAIL");
            await waitForDashboard(page);
        });

        it("should require 2fa to sign in after setting up a factor - otp-phone", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            await setupOTP(page, "PHONE", getTestPhoneNumber());
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await waitForDashboard(page);
            await addToRequiredSecondaryFactorsForUser(page, "otp-phone");
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await completeOTP(page, "PHONE");
            await waitForDashboard(page);
        });
    });
});
