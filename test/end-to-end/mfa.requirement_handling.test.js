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
    screenshotOnFailure,
    getTestEmail,
    getFactorChooserOptions,
    isMFASupported,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import { TEST_CLIENT_BASE_URL } from "../constants";
import { getTestPhoneNumber } from "../exampleTestHelpers";
import {
    tryEmailPasswordSignUp,
    waitForDashboard,
    completeOTP,
    setupOTP,
    tryEmailPasswordSignIn,
    chooseFactor,
    setupTOTP,
    completeTOTP,
    goToFactorChooser,
} from "./mfa.helpers";

/*
 * Tests.
 */
describe("SuperTokens SignIn w/ MFA", function () {
    let browser;
    let page;
    let consoleLogs = [];

    const appConfig = {
        accountLinkingConfig: {
            enabled: true,
            shouldAutoLink: {
                shouldAutomaticallyLink: true,
                shouldRequireVerification: false,
            },
        },
    };

    before(async function () {
        if (!(await isMFASupported())) {
            this.skip();
        }
        await backendHook("before");
        browser = await setupBrowser();

        const coreUrl = await setupCoreApp();
        appConfig.coreUrl = coreUrl;
        await setupST(appConfig);
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
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

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await page?.close();
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    describe("requirement handling", () => {
        let email, phoneNumber;
        let secret;
        before(async () => {
            page = await browser.newPage();

            email = await getTestEmail();
            phoneNumber = getTestPhoneNumber();

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
            await goToFactorChooser(page, true, false);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);
            await setupOTP(page, "PHONE", phoneNumber);
            secret = await setupTOTP(page);

            await page.close();
        });

        describe("multistep requirement list", () => {
            it("multistep requirements should happen in order (allOfInAnyOrder -> oneOf)", async () => {
                appConfig.mfaInfo = {
                    requirements: [{ allOfInAnyOrder: ["otp-phone", "totp"] }, { oneOf: ["otp-email"] }],
                };
                await setupST(appConfig);

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
                appConfig.mfaInfo = {
                    requirements: [{ oneOf: ["otp-phone", "totp"] }, { allOfInAnyOrder: ["totp", "otp-email"] }],
                };
                await setupST(appConfig);

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
                appConfig.mfaInfo = {
                    requirements: ["otp-phone", "totp", "otp-email"],
                };
                await setupST(appConfig);

                await tryEmailPasswordSignIn(page, email);
                await completeOTP(page, "PHONE");
                await completeTOTP(page, secret);
                await completeOTP(page, "EMAIL");
                await waitForDashboard(page);
            });
        });

        describe("allOfInAnyOrder", () => {
            it("should pass if all requirements are complete", async () => {
                appConfig.mfaInfo = {
                    requirements: [{ allOfInAnyOrder: ["otp-phone", "totp", "otp-email"] }],
                };
                await setupST(appConfig);

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
                appConfig.mfaInfo = {
                    requirements: [{ allOfInAnyOrder: [] }],
                };
                await setupST(appConfig);

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });

        describe("oneOf", () => {
            it("should pass if one of the requirements are complete", async () => {
                appConfig.mfaInfo = {
                    requirements: [{ oneOf: ["otp-phone", "totp", "otp-email"] }],
                };
                await setupST(appConfig);

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp", "otp-email"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);

                await waitForDashboard(page);
            });
            it("should pass if the array is empty", async () => {
                appConfig.mfaInfo = {
                    requirements: [{ oneOf: [] }],
                };
                await setupST(appConfig);

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });
    });
});
