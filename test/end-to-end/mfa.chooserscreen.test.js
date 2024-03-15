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

    describe("chooser screen", () => {
        let email, phoneNumber;
        let totpSecret;
        before(async () => {
            page = await browser.newPage();
            ({ email, phoneNumber, totpSecret } = await setupUserWithAllFactors(page));
            await page.close();
        });

        it("should redirect to the factor screen during sign in if only one factor is available (limited by FE recipe inits)", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("enableAllRecipes", "false");
                window.localStorage.setItem("clientRecipeListForDynamicLogin", JSON.stringify(["emailpassword"]));
            });

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totpSecret);
            await waitForDashboard(page);
        });

        it("should redirect to the factor screen during sign in if only one factor is available (limited by alreadySetup/allowedToSetup)", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("enableAllRecipes", "false");
                window.localStorage.setItem("clientRecipeListForDynamicLogin", JSON.stringify(["emailpassword"]));
            });

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],

                alreadySetup: ["totp"],
                allowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totpSecret);
            await waitForDashboard(page);
        });
        it("should redirect to the factor screen during sign in if only one factor is available (limited by next array)", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["totp"] }],
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totpSecret);
            await waitForDashboard(page);
        });

        it("should show all factors the user can complete or set up in the next array", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["totp", "otp-email"] }],
            });

            await tryEmailPasswordSignIn(page, email);

            const options = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(options), new Set(["otp-email", "totp"]));
        });

        it("should show all factors the user can complete or set up if the next array is empty", async () => {
            await setMFAInfo({
                requirements: [],
                alreadySetup: ["otp-phone", "otp-email"],
                allowedToSetup: ["totp"],
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page);

            const optionsAfter2FA = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(optionsAfter2FA), new Set(["otp-phone", "otp-email", "totp"]));
        });

        it("should show access denied if there are no available options during sign in", async () => {
            await setMFAInfo({
                requirements: ["otp-phone"],
                alreadySetup: ["otp-email"],
                allowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForAccessDenied(page);
        });

        it("should show access denied if there are no available options after sign in", async () => {
            await setMFAInfo({
                requirements: [],
                alreadySetup: [],
                allowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page, false);

            await waitForAccessDenied(page);
        });

        it("should show a back link only if visited after sign in", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForSTElement(page, "[data-supertokens~=factorChooserList]");

            await waitForSTElement(page, "[data-supertokens~=backButton]", true);
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);

            await goToFactorChooser(page);

            await waitForSTElement(page, "[data-supertokens~=backButton]");
        });

        it("should show a logout link", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForSTElement(page, "[data-supertokens~=factorChooserList]");

            await waitForSTElement(page, "[data-supertokens~=secondaryLinkWithLeftArrow]");
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);

            await goToFactorChooser(page);

            await waitForSTElement(page, "[data-supertokens~=secondaryLinkWithLeftArrow]");
        });

        it("should handle MFA info API failures gracefully", async () => {
            await setMFAInfo({
                requirements: [],
                alreadySetup: ["otp-phone", "otp-email"],
                allowedToSetup: [],
            });

            await page.setRequestInterception(true);
            const requestHandler = (request) => {
                if (request.url() === MFA_INFO_API && request.method() === "PUT") {
                    return request.respond({
                        status: 400,
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
            page.on("request", requestHandler);
            try {
                await tryEmailPasswordSignIn(page, email);
                await expectErrorThrown(page, () => goToFactorChooser(page, false));
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }
        });
    });
});
