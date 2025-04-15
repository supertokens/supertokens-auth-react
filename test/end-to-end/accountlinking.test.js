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
    clickOnProviderButton,
    getUserIdWithFetch,
    getLogoutButton,
    setInputValues,
    submitForm,
    waitForSTElement,
    getPasswordlessDevice,
    getFeatureFlags,
    toggleSignInSignUp,
    getInputAdornmentsSuccess,
    getInputAdornmentsError,
    getFieldErrors,
    assertProviders,
    getGeneralError,
    getLatestURLWithToken,
    submitFormReturnRequestAndResponse,
    getTextByDataSupertokens,
    sendEmailResetPasswordSuccessMessage,
    setupBrowser,
    setupCoreApp,
    setupST,
    backendHook,
    screenshotOnFailure,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, RESET_PASSWORD_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Account linking", function () {
    let browser;
    let page;
    let consoleLogs;
    let coreUrl;

    const passwordlessFlowType = "USER_INPUT_CODE_AND_MAGIC_LINK";
    const passwordlessContactMethod = "EMAIL_OR_PHONE";

    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("accountlinking")) {
            this.skip();
        }

        coreUrl = await setupCoreApp();
        await setupST({ coreUrl });
    });

    describe("Recipe combination tests", () => {
        before(async function () {
            await backendHook("before");
            browser = await setupBrowser();
        });

        beforeEach(async function () {
            await backendHook("beforeEach");
            page = await browser.newPage();

            consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth/?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL_OR_PHONE`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.localStorage.removeItem("mode"));
        });

        afterEach(async function () {
            await screenshotOnFailure(this, browser);
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await page?.close();
            await backendHook("afterEach");
        });

        after(async function () {
            await browser.close();
            await backendHook("after");
        });

        describe("account consolidation", () => {
            const loginTypes = [
                ["passwordless", tryPasswordlessSignInUp],
                ["thirdparty", tryThirdPartySignInUp],
                ["emailpassword", tryEmailPasswordSignUp],
            ];

            for (const login1 of loginTypes) {
                for (const login2 of loginTypes) {
                    if (login1 !== login2) {
                        const doLogin1 = login1[1];
                        const doLogin2 = login2[1];

                        it(`should work for ${login1[0]} - ${login2[0]} w/ email verification not required`, async () => {
                            await setupST({
                                coreUrl,
                                passwordlessFlowType,
                                passwordlessContactMethod,
                                accountLinkingConfig: {
                                    enabled: true,
                                    shouldAutoLink: {
                                        shouldAutomaticallyLink: true,
                                        shouldRequireVerification: false,
                                    },
                                },
                            });

                            const email = `test-user+${Date.now()}@supertokens.com`;
                            // 1. Sign up with login method 1
                            await doLogin1(page, email);

                            await Promise.all([
                                page.waitForSelector(".sessionInfo-user-id"),
                                page.waitForNetworkIdle(),
                            ]);
                            const userId1 = await getUserIdWithFetch(page);

                            // 2. Log out
                            await logOut(page);

                            // 3. Sign in with other login method
                            await doLogin2(page, email, true);
                            await Promise.all([
                                page.waitForSelector(".sessionInfo-user-id"),
                                page.waitForNetworkIdle(),
                            ]);

                            const thirdPartyUserId = await getUserIdWithFetch(page);

                            // 4. Compare userIds
                            assert.strictEqual(thirdPartyUserId, userId1);
                        });

                        if (login2[0] !== "emailpassword") {
                            it(`should work for ${login1[0]} - ${login2[0]} w/ email verification required`, async () => {
                                await setupST({
                                    coreUrl,
                                    passwordlessFlowType,
                                    passwordlessContactMethod,
                                    accountLinkingConfig: {
                                        enabled: true,
                                        shouldAutoLink: {
                                            shouldAutomaticallyLink: true,
                                            shouldRequireVerification: true,
                                        },
                                    },
                                });

                                await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));

                                const email = `test-user+${Date.now()}@supertokens.com`;
                                // 1. Sign up with login method 1
                                await doLogin1(page, email);
                                if (login1[0] === "emailpassword") {
                                    await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
                                    await new Promise((res) => setTimeout(res, 250));
                                    const latestURLWithToken = await getLatestURLWithToken();
                                    await Promise.all([
                                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                                        page.goto(latestURLWithToken),
                                    ]);
                                    await Promise.all([
                                        submitForm(page),
                                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                                    ]);
                                }

                                await Promise.all([
                                    page.waitForSelector(".sessionInfo-user-id"),
                                    page.waitForNetworkIdle(),
                                ]);
                                const userId1 = await getUserIdWithFetch(page);

                                // 2. Log out
                                await logOut(page);

                                // 3. Sign in with other login method
                                await doLogin2(page, email, true);
                                await Promise.all([
                                    page.waitForSelector(".sessionInfo-user-id"),
                                    page.waitForNetworkIdle(),
                                ]);

                                const thirdPartyUserId = await getUserIdWithFetch(page);

                                // 4. Compare userIds
                                assert.strictEqual(thirdPartyUserId, userId1);
                            });
                        } else {
                            it(`should work for ${login1[0]} - password reset (invite link flow) w/ email verification required`, async () => {
                                await setupST({
                                    coreUrl,
                                    passwordlessFlowType,
                                    passwordlessContactMethod,
                                    accountLinkingConfig: {
                                        enabled: true,
                                        shouldAutoLink: {
                                            shouldAutomaticallyLink: true,
                                            shouldRequireVerification: true,
                                        },
                                    },
                                });

                                await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));

                                const email = `test-user+${Date.now()}@supertokens.com`;
                                // 1. Sign up with login method 1
                                await doLogin1(page, email);
                                if (login1[0] === "emailpassword") {
                                    await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
                                    await new Promise((res) => setTimeout(res, 250));
                                    const latestURLWithToken = await getLatestURLWithToken();
                                    await Promise.all([
                                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                                        page.goto(latestURLWithToken),
                                    ]);
                                    await Promise.all([
                                        submitForm(page),
                                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                                    ]);
                                }

                                await Promise.all([
                                    page.waitForSelector(".sessionInfo-user-id"),
                                    page.waitForNetworkIdle(),
                                ]);
                                const userId1 = await getUserIdWithFetch(page);

                                // 2. Log out
                                await logOut(page);

                                // 3. Sign in with other login method
                                await tryEmailPasswordResetPassword(page, email);
                                await Promise.all([
                                    page.waitForSelector(".sessionInfo-user-id"),
                                    page.waitForNetworkIdle(),
                                ]);

                                const thirdPartyUserId = await getUserIdWithFetch(page);

                                // 4. Compare userIds
                                assert.strictEqual(thirdPartyUserId, userId1);
                            });
                        }
                    }
                }
            }
        });

        describe("conflicting accounts", () => {
            it("should not allow sign up w/ emailpassword in case of conflict", async function () {
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });

                const email = `test-user+${Date.now()}@supertokens.com`;
                // 1. Sign up with credentials
                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 2. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                // 3. Try sign up with email password
                await tryEmailPasswordSignUp(page, email);

                const successAdornments = await getInputAdornmentsSuccess(page);
                assert.strictEqual(successAdornments.length, 4);

                const errorAdornments = await getInputAdornmentsError(page);
                assert.strictEqual(errorAdornments.length, 0);

                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign up due to security reasons. Please try logging in, use a different login method or contact support. (ERR_CODE_007)"
                );
            });

            it("should not allow sign in w/ an unverified emailpassword user in case of conflict", async function () {
                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: true,
                        },
                    },
                });

                const email = `test-user+${Date.now()}@supertokens.com`;
                // 1. Sign up without account linking with an unverified ep and tp users & log out
                // We need both, because when setting up the pwless user we'll link to the older one
                await tryThirdPartySignInUp(page, email, false);
                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
                await logOut(page);

                await tryEmailPasswordSignUp(page, email);
                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: false,
                        },
                    },
                });
                // 2. Sign up with passwordless to create a primary user
                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 3. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 4. Try sign in with emailpassword

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [
                    { name: "email", value: email },
                    { name: "password", value: "Asdf12.." },
                ]);

                await submitForm(page);
                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign in due to security reasons. Please try resetting your password, use a different login method or contact support. (ERR_CODE_008)"
                );
            });

            it("should not allow sign up w/ an unverified thirdparty user in case of conflict", async function () {
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });

                const email = `test-user+${Date.now()}@supertokens.com`;
                // 1. Sign up with credentials
                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 2. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                // 3. Try sign up with third party
                await tryThirdPartySignInUp(page, email, false);

                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_006)"
                );
            });

            it("should not allow using thirdparty sign in with changed email in case of conflict", async function () {
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });

                const email = `test-user+${Date.now()}@supertokens.com`;
                const email2 = `test-user-2+${Date.now()}@supertokens.com`;
                // 1. Sign up with credentials

                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 2. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                // 3. Sign up with third party
                await tryThirdPartySignInUp(page, email2, false);
                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 4. Log out
                await logOut(page);

                // 5. Sign in with changed email address (thirdPartyUserId matching the previous sign in)

                await tryThirdPartySignInUp(page, email, false, email2);

                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
                const features = await getFeatureFlags();
                if (features.includes("accountlinking-fixes")) {
                    assert.strictEqual(
                        await getGeneralError(page),
                        "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)"
                    );
                } else {
                    assert.strictEqual(
                        await getGeneralError(page),
                        "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ERR_CODE_005)"
                    );
                }
            });

            it("should not allow sign in w/ an unverified thirdparty user in case of conflict", async function () {
                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: true,
                        },
                    },
                });

                const email = `test-user+${Date.now()}@supertokens.com`;
                await tryEmailPasswordSignUp(page, email);
                await logOut(page);
                // 1. Sign up without account linking with an unverified tp user & log out
                await tryThirdPartySignInUp(page, email, false);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: false,
                        },
                    },
                });
                // 2. Sign up with passwordless to create a primary user
                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 3. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 4. Try sign in with third party
                await tryThirdPartySignInUp(page, email, false);

                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)"
                );
            });

            it("should not allow sign up w/ passwordless if it conflicts with an unverified user", async function () {
                const email = `test-user+${Date.now()}@supertokens.com`;

                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 1. Sign up without account linking with an unverified tp user & log out
                await tryEmailPasswordSignUp(page, email);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 2. Sign up with passwordless
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=passwordless`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
                await submitForm(page);

                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_002)"
                );
                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
            });

            it("should not allow sign up w/ passwordless if it conflicts with an unverified user", async function () {
                const email = `test-user+${Date.now()}@supertokens.com`;
                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 1. Sign up without account linking with an unverified tp user & log out
                await tryEmailPasswordSignUp(page, email);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 2. Sign in with passwordless
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=passwordless`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
                await submitForm(page);

                assert.strictEqual(
                    await getGeneralError(page),
                    "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_002)"
                );
                assert.strictEqual(new URL(page.url()).pathname, "/auth/");
            });

            it("should not allow password reset if it conflicts with an unverified user", async function () {
                const email = `test-user+${Date.now()}@supertokens.com`;
                const email2 = `test-user2+${Date.now()}@supertokens.com`;

                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: false,
                        },
                    },
                });
                // 1. Sign up without account linking with an unverified tp user & log out
                await tryThirdPartySignInUp(page, email2, false);
                await logOut(page);

                // 2. Sign up with an EP user that will be linked to the first one
                await tryEmailPasswordSignUp(page, email2);
                await logOut(page);

                // 3. Change the email of the initial tp user
                await tryThirdPartySignInUp(page, email, false, email2);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: false,
                        },
                    },
                });
                // 4. Add a recipe level user
                await tryEmailPasswordSignUp(page, email);
                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 5. Try resetting the password of the recipe leve user
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: "email", value: email }]);

                await submitForm(page);

                await new Promise((res) => setTimeout(res, 200));
                assert.deepStrictEqual(await getFieldErrors(page), [
                    "Reset password link was not created because of account take over risk. Please contact support. (ERR_CODE_001)",
                ]);
                assert.strictEqual(new URL(page.url()).pathname, "/auth/reset-password");
            });

            it("should allow sign in w/ a verified emailpassword user in case of conflict", async function () {
                const email = `test-user+${Date.now()}@supertokens.com`;
                await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));

                // Use a common appId over the test to allow re-inits
                const coreUrl = await setupCoreApp({ appId: "test-app-id" });
                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: false,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 1. Sign up without account linking with an unverified tp user & log out
                await tryEmailPasswordSignUp(page, email);
                await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

                await new Promise((res) => setTimeout(res, 250));
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                await logOut(page);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: false,
                        },
                    },
                });
                // 2. Sign up with passwordless to create a primary user
                await tryPasswordlessSignInUp(page, email);

                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);

                // 3. Log out
                await logOut(page);

                await waitForSTElement(page, `input[name=emailOrPhone]`);

                await setupST({
                    coreUrl,
                    passwordlessFlowType,
                    passwordlessContactMethod,
                    accountLinkingConfig: {
                        enabled: true,
                        shouldAutoLink: {
                            shouldAutomaticallyLink: true,
                            shouldRequireVerification: true,
                        },
                    },
                });
                // 4. Try sign in with emailpassword

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [
                    { name: "email", value: email },
                    { name: "password", value: "Asdf12.." },
                ]);

                await submitForm(page);
                await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
            });
        });
    });
});

async function tryEmailPasswordSignUp(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=emailpassword`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
        { name: "name", value: "asdf" },
        { name: "age", value: "20" },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 250));
}

async function tryPasswordlessSignInUp(page, email) {
    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=passwordless`),
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
}

async function tryThirdPartySignInUp(page, email, isVerified = true, userId = email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?authRecipe=thirdparty`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await assertProviders(page);

    await clickOnProviderButton(page, "Mock Provider");
    const url = new URL(page.url());
    assert.strictEqual(url.pathname, `/mockProvider/auth`);
    assert.ok(url.searchParams.get("state"));

    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${encodeURIComponent(
                email
            )}&userId=${encodeURIComponent(userId)}&isVerified=${isVerified}&state=${url.searchParams.get("state")}`
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
}

async function tryEmailPasswordResetPassword(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?authRecipe=emailpassword`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await setInputValues(page, [{ name: "email", value: email }]);

    await submitForm(page);
    const successMessage = await sendEmailResetPasswordSuccessMessage(page);

    assert.deepStrictEqual(
        successMessage,
        `A password reset email has been sent to ${email}, if it exists in our system. Resend or change email`
    );
    // Get valid token.
    const latestURLWithToken = await getLatestURLWithToken();
    await page.goto(latestURLWithToken);

    // Submit new password
    await setInputValues(page, [
        { name: "password", value: "Asdf12.." },
        { name: "confirm-password", value: "Asdf12.." },
    ]);
    await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

    const title = await getTextByDataSupertokens(page, "headerTitle");
    assert.deepStrictEqual(title, "Success!");
    await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 250));
}

async function logOut(page) {
    await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
    const logoutButton = await getLogoutButton(page);
    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await waitForSTElement(page);
}
