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

import {
    clearBrowserCookiesWithoutAffectingConsole,
    setInputValues,
    submitForm,
    waitForSTElement,
    screenshotOnFailure,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
    isMFASupported,
    expectErrorThrown,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import { getTestPhoneNumber } from "../exampleTestHelpers";
import {
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
    waitForAccessDenied,
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
        page?.evaluate(() => window.localStorage.removeItem("firstFactors"));
        await page?.close();
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    it("sign in with email-otp (auto-setup)", async function () {
        const email = await getTestEmail();

        setupST({
            ...appConfig,
            mfaInfo: {
                requirements: ["otp-email"],
            }
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

    describe("sign in flows", () => {
        it("set up otp-phone and sign-in", async function () {
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
                },
            });

            await tryEmailPasswordSignUp(page, email);
            await chooseFactor(page, "otp-phone");

            await setupOTP(page, "PHONE", phoneNumber, false);

            await waitForDashboard(page);

            await logout(page);
            await tryEmailPasswordSignIn(page, email, "&redirectToPath=%2Fredirect-here");
            await completeOTP(page, "PHONE");

            await page.waitForNavigation({ waitUntil: "networkidle0" });

            await waitForUrl(page, "/redirect-here");
        });

        it("set up otp-email and sign-in", async function () {
            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: [],
                },
            });
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitForDashboard(page);
            await setupOTP(page, "EMAIL", email);

            await logout(page);

            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email"] }],
                },
            });

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitFor(500);
            await completeOTP(page);
            await waitForDashboard(page);

            await logout(page);
            await tryPasswordlessSignInUp(page, phoneNumber, "&redirectToPath=%2Fredirect-here");
            await waitFor(500);
            await completeOTP(page);

            await page.waitForNavigation({ waitUntil: "networkidle0" });

            await waitForUrl(page, "/redirect-here");
        });

        it("set up totp and sign-in", async function () {
            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: [],
                },
            });
            const email = await getTestEmail();

            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "totp"] }],
                },
            });

            await tryEmailPasswordSignUp(page, email);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);

            await waitForDashboard(page);

            const secret = await setupTOTP(page);

            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await chooseFactor(page, "totp");
            await completeTOTP(page, secret);
            await waitForDashboard(page);

            await logout(page);
            await tryEmailPasswordSignIn(page, email, "&redirectToPath=%2Fredirect-here");
            await chooseFactor(page, "totp");
            await completeTOTP(page, secret);

            await page.waitForNavigation({ waitUntil: "networkidle0" });

            await waitForUrl(page, "/redirect-here");
        });

        it("should show access denied if the only next option is an unknown factor id", async () => {
            const email = await getTestEmail();
            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: ["unknown"],
                    alreadySetup: ["unknown"],
                },
            });

            await tryEmailPasswordSignUp(page, email);
            await waitForAccessDenied(page);
        });

        it("should throw error if there are no valid next options", async () => {
            setupST({
                ...appConfig,
                mfaInfo: {
                    requirements: ["unknown"],
                },
            });

            const email = await getTestEmail();
            await expectErrorThrown(page, () => tryEmailPasswordSignUp(page, email));
        });
    });
});
