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
import { TEST_CLIENT_BASE_URL, DEFAULT_WEBSITE_BASE_PATH } from "../constants";
import {
    getSubmitFormButtonLabel,
    getLabelsText,
    assertProviders,
    clickForgotPasswordLink,
    getSubmitFormButtonLabelWithoutShadowDom,
    assertNoSTComponents,
    clearBrowserCookiesWithoutAffectingConsole,
    screenshotOnFailure,
    waitForUrl,
    setupBrowser,
} from "../helpers";
/*
 * Tests.
 */
describe("SuperTokens Routing in Test App", function () {
    let browser, page;

    before(async function () {
        browser = await setupBrowser();
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    describe("with react-router-dom", function () {
        before(async function () {
            page = await browser.newPage();
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
        });

        describe("with emailpassword", function () {
            it("/about should not load any SuperTokens components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/about`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 2);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
            });

            it("/auth?rid=unknown-rid should load first component (sign up widget)", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
            });

            it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "CHANGE PASSWORD");
            });

            it("/auth/unknown-path should not render any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });

        describe("with thirdparty", function () {
            before(async function () {
                page = await browser.newPage();
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                // set auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                // reset auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/about should not load any SuperTokens components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/about`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components for thirdparty", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
            });

            it("/auth?rid=unknown-rid should load first component (signInAndUp widget for thirdparty)", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
            });

            it("/auth/reset-password should not load any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth/reset-password?token=TOKEN should not load any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth/unknown-path should not render any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });

        describe("with both emailpassword and thirdparty", function () {
            before(async function () {
                page = await browser.newPage();
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                // set auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=both`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                // reset auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/about should not load any SuperTokens components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/about`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 2);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components for emailpassword", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 2);
            });

            it("/auth?rid=thirdparty should load SignInAndUp components for thirdparty", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=thirdparty`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
            });

            it("/auth?rid=unknown should load first component (signInAndUp widget for emailpassword)", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 2);
            });

            it("/auth/reset-password?rid=unknown should load reset-password SuperTokens component with Send Email", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=unknown`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?rid=emailpassword should load reset-password SuperTokens component with Send Email", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?rid=thirdparty should load reset-password SuperTokens component with Send Email", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=thirdparty`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "CHANGE PASSWORD");
            });

            it("/auth/reset-password?token=TOKEN&rid=emailpassword should load reset-password SuperTokens component with Change Password", async function () {
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&rid=emailpassword`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "CHANGE PASSWORD");
            });

            it("/auth/reset-password?token=TOKEN&rid=thirdparty should load reset-password SuperTokens component with Change Password", async function () {
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&rid=thirdparty`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "CHANGE PASSWORD");
            });

            it("/auth/unknown-path should not render any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });

        describe("with passwordless", function () {
            before(async function () {
                page = await browser.newPage();
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                // set auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=passwordless`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                // reset auth recipe type.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/about should not load any SuperTokens components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/about`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInUp components", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "CONTINUE");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 1);
            });

            it("/auth?rid=passwordless should load SignInUp components for passwordless", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=passwordless`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "CONTINUE");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 1);
            });

            it("/auth?rid=unknown-rid should load first component (signInUp widget for passwordless)", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "CONTINUE");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 1);
            });

            it("/auth/reset-password should not load any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth/reset-password?token=TOKEN should not load any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });

            it("/auth/unknown-path should not render any ST component", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });
    });

    describe("without react-router-dom", function () {
        before(async function () {
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            page = await browser.newPage();
        });

        it("/about should not load any SuperTokens components", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/about?router=no-router`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertNoSTComponents(page);
        });

        it("/auth should load SignInAndUp components", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN IN");
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?router=no-router`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Email me");
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function () {
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&router=no-router`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "CHANGE PASSWORD");
        });

        it("/auth?rid=emailpassword should load SignInAndUp components", async function () {
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=emailpassword&router=no-router`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN IN");
        });

        it("/auth?rid=unknown-rid should load first SuperTokens components that matches", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=unknown`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const pathname = await page.evaluate(() => window.location.pathname);
            await assert.strictEqual(pathname, DEFAULT_WEBSITE_BASE_PATH);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN IN");
        });

        it("/auth/unknown-path should not render any ST component", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path?router=no-router`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await assertNoSTComponents(page);
        });

        it("/custom-supertokens-login should load SignIn SuperTokens components", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/custom-supertokens-login`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const signInButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signInButtonLabel, "SIGN IN");
        });
    });

    describe("with custom websiteBasePath", function () {
        describe("=/custom", function () {
            before(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                page = await browser.newPage();
                // Update websiteBasePath config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/custom`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                page = await browser.newPage();
                // Reset websiteBasePath config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/custom should show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/custom`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
            });

            it("/custom/reset-password should show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/custom/reset-password`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth should not show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });

        describe("=/", function () {
            before(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                page = await browser.newPage();
                // Update websiteBasePath config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                page = await browser.newPage();
                // Reset websiteBasePath config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/ should show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN IN");
                // Click on forgot password link.
                await clickForgotPasswordLink(page);
                const buttonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(buttonLabel, "Email me");
            });

            it("/reset-password should show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/reset-password`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth should not show signin/signup", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertNoSTComponents(page);
            });
        });

        describe("=/en/auth", async function () {
            describe("rrdv5", () => {
                let skipped = false;
                before(function () {
                    if (process.env.RUN_RRD5 !== "true") {
                        skipped = true;
                        this.skip();
                    }
                });
                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                    page = await browser.newPage();
                    // Update websiteBasePath config.
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/en/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await page.evaluate(() => {
                        localStorage.setItem("react-router-dom-is-v5", "true");
                        localStorage.setItem("useReactRouterDom", "true");
                    });
                });

                after(async () => {
                    if (!skipped) {
                        await page.evaluate(() => {
                            localStorage.removeItem("useReactRouterDom", "true");
                            localStorage.removeItem("react-router-dom-is-v5");
                        });
                    }
                });

                it("/en/auth should show sign in form", async function () {
                    page.evaluate(() => localStorage.setItem("websiteBasePath", "/en/auth"));
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/en/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    const signInButtonLabel = await getSubmitFormButtonLabel(page);
                    assert.strictEqual(signInButtonLabel, "SIGN IN");
                });
            });

            describe("rrdv6", () => {
                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                    page = await browser.newPage();
                    // Update websiteBasePath config.
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/en/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await page.evaluate(() => {
                        localStorage.setItem("useReactRouterDom", "true");
                    });
                });

                it("/en/auth should show sign in form", async function () {
                    page.evaluate(() => localStorage.setItem("websiteBasePath", "/en/auth"));
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/en/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    const signInButtonLabel = await getSubmitFormButtonLabel(page);
                    assert.strictEqual(signInButtonLabel, "SIGN IN");
                });
            });

            after(async function () {
                page = await browser.newPage();
                // Reset websiteBasePath config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });
        });

        describe("default to signup = true", function () {
            before(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                page = await browser.newPage();
                // Update defaultToSignUp config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?defaultToSignUp=true`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                page = await browser.newPage();
                // Reset defaultToSignUp config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?defaultToSignUp=false`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/auth should show sign up form", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
            });
        });

        describe("useShadowDom = false", function () {
            before(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                page = await browser.newPage();
                // Update useShadowDom config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?useShadowDom=false`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            after(async function () {
                page = await browser.newPage();
                // Reset useShadowDom config.
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/?useShadowDom=true`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            it("/auth should show signin form", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                const signInButtonLabel = await getSubmitFormButtonLabelWithoutShadowDom(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
            });
        });
    });
});
