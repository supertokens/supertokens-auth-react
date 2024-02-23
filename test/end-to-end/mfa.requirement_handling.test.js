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

    before(async function () {
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

    describe("requirement handling", () => {
        let email, phoneNumber;
        let secret;
        before(async () => {
            await setMFAInfo({});
            page = await browser.newPage();

            email = await getTestEmail();
            phoneNumber = getTestPhoneNumber();

            await setMFAInfo({});
            await setAccountLinkingConfig(true, true, false);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await page.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
            await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            await tryEmailPasswordSignUp(page, email);
            await waitForDashboard(page);
            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);
            await setupOTP(page, "PHONE", phoneNumber);
            secret = await setupTOTP(page);

            await page.close();
        });

        describe("multistep requirement list", () => {
            it("multistep requirements should happen in order (allOfInAnyOrder -> oneOf)", async () => {
                await setMFAInfo({
                    requirements: [{ allOfInAnyOrder: ["otp-phone", "totp"] }, { oneOf: ["otp-email"] }],
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);
                await completeTOTP(page, secret);
                await completeOTP(page);
                await waitForDashboard(page);
            });

            it("multistep requirements should happen in order (oneOf -> allOfInAnyOrder)", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: ["otp-phone", "totp"] }, { allOfInAnyOrder: ["totp", "otp-email"] }],
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);
                const factors2 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors2), new Set(["otp-email", "totp"]));
                await chooseFactor(page, "totp");
                await completeTOTP(page, secret);
                await completeOTP(page);
                await waitForDashboard(page);
            });
            it("string requirements strictly set the order of the factor screens", async () => {
                await setMFAInfo({
                    requirements: ["otp-phone", "totp", "otp-email"],
                });

                await tryEmailPasswordSignIn(page, email);
                await completeOTP(page, "PHONE");
                await completeTOTP(page, secret);
                await completeOTP(page, "EMAIL");
                await waitForDashboard(page);
            });
        });

        describe("allOfInAnyOrder", () => {
            it("should pass if all requirements are complete", async () => {
                await setMFAInfo({
                    requirements: [{ allOfInAnyOrder: ["otp-phone", "totp", "otp-email"] }],
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp", "otp-email"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);

                const factors2 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors2), new Set(["totp", "otp-email"]));
                await chooseFactor(page, "otp-email");
                await completeOTP(page);

                await completeTOTP(page, secret);
                await waitForDashboard(page);
            });
            it("should pass if the array is empty", async () => {
                await setMFAInfo({
                    requirements: [{ allOfInAnyOrder: [] }],
                });

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });

        describe("oneOf", () => {
            it("should pass if one of the requirements are complete", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: ["otp-phone", "totp", "otp-email"] }],
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp", "otp-email"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);

                await waitForDashboard(page);
            });
            it("should pass if the array is empty", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: [] }],
                });

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });
    });
});
