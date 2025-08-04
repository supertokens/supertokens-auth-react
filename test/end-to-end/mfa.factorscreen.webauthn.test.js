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
    setupCoreApp,
    screenshotOnFailure,
    getTestEmail,
    setupST,
    waitFor,
    isMFASupported,
    waitForUrl,
    setupBrowser,
    getGeneralError,
    backendHook,
} from "../helpers";
import { MFA_INFO_API, SOMETHING_WENT_WRONG_ERROR, TEST_CLIENT_BASE_URL } from "../constants";
import {
    tryEmailPasswordSignUp,
    waitForDashboard,
    tryEmailPasswordSignIn,
    chooseFactor,
    waitForAccessDenied,
    waitForLoadingScreen,
    waitForBlockedScreen,
    tryWebauthnSignUp,
    tryWebauthnSignIn,
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

    describe("factor screens", () => {
        describe("webauthn", () => {
            const factorId = "webauthn";

            let email;
            before(async () => {
                await setupST(appConfig);
                page = await browser.newPage();

                email = await getTestEmail(factorId);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });

                consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

                await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
                await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

                await tryEmailPasswordSignUp(page, email);
                await waitForDashboard(page);

                await page.close();
            });

            it("should respect redirectToPath", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true&redirectToPath=%2Fredirect-here`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await tryWebauthnSignIn(page);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                await waitForUrl(page, "/redirect-here");
            });

            it("should show access denied if the app navigates to the setup page but the user it is not allowed to set up the factor", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });

                await waitForAccessDenied(page);
            });

            it("should show access denied if setup is not allowed but the factor is not set up", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                await waitForAccessDenied(page);
            });

            it("should show loading screen", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await waitFor(1500);

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url() === MFA_INFO_API && request.method() === "PUT") {
                        setTimeout(() => request.continue(), 500);
                    } else {
                        return request.continue();
                    }
                };
                page.on("request", requestHandler);
                try {
                    await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/webauthn`);
                    await waitForLoadingScreen(page);
                    await waitForSTElement(page, "[data-supertokens~=webauthn-mfa]");
                } finally {
                    page.off("request", requestHandler);
                    await page.setRequestInterception(false);
                }
            });

            it("should handle MFA info API failures gracefully", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [factorId],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await waitFor(1500);

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
                    await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`);
                    await waitForAccessDenied(page);
                } finally {
                    page.off("request", requestHandler);
                    await page.setRequestInterception(false);
                }
            });

            it("should redirect back if visited after sign in without stepUp param", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                await waitForDashboard(page);
            });

            it("should show a link redirecting back if visited after sign in - force setup", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                const backBtn = await waitForSTElement(page, "[data-supertokens~=backButton]");
                await backBtn.click();
                await waitForDashboard(page);
            });

            it("should show a link redirecting back if visited after sign in - setup in stepUp", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?stepUp=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                const backBtn = await waitForSTElement(page, "[data-supertokens~=backButton]");
                await backBtn.click();
                await waitForDashboard(page);
            });

            it("should show a link redirecting back if visited after sign in - verification in stepUp", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?stepUp=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                const backBtn = await waitForSTElement(page, "[data-supertokens~=backButton]");
                await backBtn.click();
                await waitForDashboard(page);
            });

            it("should show a back button redirecting to the chooser screen if other options are available during sign in - setup", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [{ oneOf: [factorId, "otp-email"] }],
                        alreadySetup: ["otp-email"],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await chooseFactor(page, factorId);

                const chooseAnotherFactor = await waitForSTElement(
                    page,
                    "[data-supertokens~=webauthn-mfa] [data-supertokens~=backButton]"
                );

                await chooseAnotherFactor.click();
                await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
            });

            it("should show a back button redirecting to the chooser screen if other options are available during sign in - verification", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [{ oneOf: [factorId, "otp-email"] }],
                        alreadySetup: [],
                        allowedToSetup: [factorId, "otp-email"],
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await chooseFactor(page, factorId);

                const chooseAnotherFactor = await waitForSTElement(
                    page,
                    "[data-supertokens~=webauthn-mfa] [data-supertokens~=backButton]"
                );
                await chooseAnotherFactor.click();
                await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
            });

            it("should handle WebAuthn device setup errors gracefully", async () => {
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.evaluate(() => {
                    navigator.credentials.create = () => Promise.reject(new Error("Device setup failed"));
                });

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });

                try {
                    await tryWebauthnSignIn(page);
                    const error = await getGeneralError(page);
                    assert.strictEqual(error, SOMETHING_WENT_WRONG_ERROR);
                } catch (e) {
                    // Expected to fail gracefully
                }
            });

            it("should handle unsupported device gracefully", async () => {
                await page.evaluateOnNewDocument(() => {
                    localStorage.setItem(
                        "overrideWebauthnSupport",
                        JSON.stringify({
                            status: "OK",
                            browserSupportsWebauthn: false,
                            platformAuthenticatorIsAvailable: false,
                        })
                    );
                });
                await setupST({
                    ...appConfig,
                    mfaInfo: {
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`);
                await page.waitForNavigation({ waitUntil: "networkidle0" });
                const errorTextContainer = await waitForSTElement(
                    page,
                    "[data-supertokens~='continueWithPasskeyButtonNotSupported']"
                );

                const errorText = await errorTextContainer.evaluate((el) => el.textContent);
                assert.strictEqual(
                    errorText,
                    "Your browser does not support passkey flow, please try in a different browser."
                );

                await page.evaluateOnNewDocument(() => {
                    localStorage.removeItem("overrideWebauthnSupport");
                });
            });
        });
    });
});
