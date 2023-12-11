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
    isMFASupported,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { CREATE_CODE_API, CREATE_TOTP_DEVICE_API, MFA_INFO_API } from "../constants";

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

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
    });

    after(async function () {
        if (skipped) {
            return;
        }
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

    it("sign in with email-otp (auto-setup)", async function () {
        const email = await getTestEmail();

        await setMFAInfo({
            requirements: ["otp-email"],
        });

        await tryEmailPasswordSignUp(page, email);

        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

        const loginAttemptInfo = JSON.parse(
            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
        );
        const device = await getPasswordlessDevice(loginAttemptInfo);
        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
        await submitForm(page);

        await waitForDashboard(page);
    });

    describe("sign in + setup + sign in with chooser flow", () => {
        it("set up otp-phone and sign-in", async function () {
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
            });

            await tryEmailPasswordSignUp(page, email);

            await completeOTP(page);

            await waitForDashboard(page);
            await setupOTP(page, "PHONE", phoneNumber);

            await logout(page);
            await tryEmailPasswordSignIn(page, email);
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);
            await waitForDashboard(page);
        });

        it("set up otp-email and sign-in", async function () {
            await setMFAInfo({
                requirements: [],
            });
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitForDashboard(page);
            await setupOTP(page, "EMAIL", email);

            await logout(page);

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email"] }],
            });

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitFor(500);
            await completeOTP(page);
            await waitForDashboard(page);
        });

        it("set up totp and sign-in", async function () {
            await setMFAInfo({
                requirements: [],
            });
            const email = await getTestEmail();

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "totp"] }],
            });

            await tryEmailPasswordSignUp(page, email);
            await completeOTP(page);

            await waitForDashboard(page);

            const secret = await setupTOTP(page);

            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await chooseFactor(page, "totp");
            await completeTOTP(page, secret);
            await waitForDashboard(page);
        });
    });
});
