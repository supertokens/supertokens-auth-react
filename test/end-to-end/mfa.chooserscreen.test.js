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
    waitForSTElement,
    screenshotOnFailure,
    getFactorChooserOptions,
    isMFASupported,
    expectErrorThrown,
    setupBrowser,
    backendHook,
    createCoreApp,
} from "../helpers";
import { MFA_INFO_API } from "../constants";

import { TEST_CLIENT_BASE_URL } from "../constants";
import {
    waitForDashboard,
    completeOTP,
    tryEmailPasswordSignIn,
    chooseFactor,
    completeTOTP,
    setupUserWithAllFactors,
    goToFactorChooser,
    waitForAccessDenied,
} from "./mfa.helpers";
import { randomUUID } from "crypto";

/*
 * Tests.
 */
describe("SuperTokens SignIn w/ MFA", function () {
    let browser;
    let page;
    let consoleLogs = [];

    const appConfig = {
        appId: randomUUID(),
        accountLinkingConfig: {
            enabled: true,
            shouldAutoLink: {
                shouldAutomaticallyLink: true,
                shouldRequireVerification: false,
            },
        },
        mfaInfo: {
            requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
        },
    };

    before(async function () {
        if (!(await isMFASupported())) {
            this.skip();
        }

        backendHook("before");
        await createCoreApp(appConfig);

        browser = await setupBrowser();
    });

    beforeEach(async function () {
        backendHook("beforeEach");
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
        backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        backendHook("after");
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

            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],
                },
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

            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],

                    alreadySetup: ["totp"],
                    allowedToSetup: [],
                },
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totpSecret);
            await waitForDashboard(page);
        });
        it("should redirect to the factor screen during sign in if only one factor is available (limited by next array)", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["totp"] }],
                },
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totpSecret);
            await waitForDashboard(page);
        });

        it("should show all factors the user can complete or set up in the next array", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["totp", "otp-email"] }],
                },
            });

            await tryEmailPasswordSignIn(page, email);

            const options = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(options), new Set(["otp-email", "totp"]));
        });

        it("should show all factors the user can complete or set up if the next array is empty", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [],
                    alreadySetup: ["otp-phone", "otp-email"],
                    allowedToSetup: ["totp"],
                },
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page);

            const optionsAfter2FA = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(optionsAfter2FA), new Set(["otp-phone", "otp-email", "totp"]));
        });

        it("should throw error if there are no available options during sign in", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: ["otp-phone"],
                    alreadySetup: ["otp-email"],
                    allowedToSetup: [],
                },
            });

            await expectErrorThrown(page, () => tryEmailPasswordSignIn(page, email));
            await expectErrorThrown(page, () => page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa`));
        });

        it("should show access denied if there are no available options after sign in", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [],
                    alreadySetup: [],
                    allowedToSetup: [],
                },
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page, false);

            await waitForAccessDenied(page);
        });

        it("should show a back link only if visited after sign in", async () => {
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
                },
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
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
                },
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
            await createCoreApp({
                ...appConfig,
                mfaInfo: {
                    requirements: [],
                    alreadySetup: ["otp-phone", "otp-email"],
                    allowedToSetup: [],
                },
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
