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

/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import assert from "assert";
import { spawn } from "child_process";
import puppeteer from "puppeteer";
import { DEFAULT_WEBSITE_BASE_PATH } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL } from "../constants";
import {
    getSubmitFormButtonLabel,
    getLabelsText,
    assertProviders,
    clickForgotPasswordLink,
    getSubmitFormButtonLabelWithoutShadowDom,
    assertNoSTComponents,
    toggleSignInSignUp,
    clearBrowserCookies
} from "../helpers";
/*
 * Tests.
 */
describe("SuperTokens Routing in Test App", function() {
    let browser, page;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
        page = await browser.newPage();
    });

    after(async function() {
        await browser.close();
    });

    describe("with react-router-dom", function() {
        before(async function() {
            page = await browser.newPage();
            await clearBrowserCookies(page);
        });

        describe("with emailpassword", function() {
            it("/about should not load any SuperTokens components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/about`);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 5);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
            });

            it("/auth?rid=unknown-rid should load first component (sign up widget)", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
            });

            it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Change password");
            });

            it("/auth/unknown-path should not render any ST component", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`);
                await assertNoSTComponents(page);
            });
        });

        describe("with thirdparty", function() {
            before(async function() {
                page = await browser.newPage();
                await clearBrowserCookies(page);
                // set auth recipe type.
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty`);
            });

            after(async function() {
                // reset auth recipe type.
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/?authRecipe=emailpassword`);
            });

            it("/about should not load any SuperTokens components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/about`);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);
                await assertProviders(page);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components for thirdparty", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`);
                await assertProviders(page);
            });

            it("/auth?rid=unknown-rid should load first component (signInAndUp widget for thirdparty)", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`);
                await assertProviders(page);
            });

            it("/auth/reset-password should not load any ST component", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password`);
                await assertNoSTComponents(page);
            });

            it("/auth/reset-password?token=TOKEN should not load any ST component", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`);
                await assertNoSTComponents(page);
            });

            it("/auth/unknown-path should not render any ST component", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`);
                await assertNoSTComponents(page);
            });
        });

        describe("with both emailpassword and thirdparty", function() {
            before(async function() {
                page = await browser.newPage();
                await clearBrowserCookies(page);
                // set auth recipe type.
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=both`);
            });

            after(async function() {
                // reset auth recipe type.
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/?authRecipe=emailpassword`);
            });

            it("/about should not load any SuperTokens components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/about`);
                await assertNoSTComponents(page);
            });

            it("/auth should load SignInAndUp components", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 5);
            });

            it("/auth?rid=emailpassword should load SignInAndUp components for emailpassword", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=emailpassword`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 5);
            });

            it("/auth?rid=thirdparty should load SignInAndUp components for thirdparty", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=thirdparty`);
                await assertProviders(page);
            });

            it("/auth?rid=unknown should load first component (signInAndUp widget for emailpassword)", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?rid=unknown`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
                const labels = await getLabelsText(page);
                assert.strictEqual(labels.length, 5);
            });

            it("/auth/reset-password?rid=unknown should load reset-password SuperTokens component with Send Email", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=unknown`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?rid=emailpassword should load reset-password SuperTokens component with Send Email", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=emailpassword`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?rid=thirdparty should load reset-password SuperTokens component with Send Email", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?rid=thirdparty`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Change password");
            });

            it("/auth/reset-password?token=TOKEN&rid=emailpassword should load reset-password SuperTokens component with Change Password", async function() {
                await page.goto(
                    `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&rid=emailpassword`
                );
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Change password");
            });

            it("/auth/reset-password?token=TOKEN&rid=thirdparty should load reset-password SuperTokens component with Change Password", async function() {
                await page.goto(
                    `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&rid=thirdparty`
                );
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Change password");
            });

            it("/auth/unknown-path should not render any ST component", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path`);
                await assertNoSTComponents(page);
            });
        });
    });

    describe("without react-router-dom", function() {
        before(async function() {
            await clearBrowserCookies(page);
            page = await browser.newPage();
        });

        it("/about should not load any SuperTokens components", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/about?router=no-router`);
            await assertNoSTComponents(page);
        });

        it("/auth should load SignInAndUp components", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router`);
            const signUpButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signUpButtonLabel, "SIGN UP");
        });

        it("/auth/reset-password should load reset-password SuperTokens component with Send Email", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?router=no-router`);
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Email me");
        });

        it("/auth/reset-password?token=TOKEN should load reset-password SuperTokens component with Change Password", async function() {
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/reset-password?token=TOKEN&router=no-router`
            );
            const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(resetPasswordButtonLabel, "Change password");
        });

        it("/auth?rid=emailpassword should load SignInAndUp components", async function() {
            await page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=emailpassword&router=no-router`
            );
            const signUpButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signUpButtonLabel, "SIGN UP");
        });

        it("/auth?rid=unknown-rid should load first SuperTokens components that matches", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?router=no-router&rid=unknown`);
            const pathname = await page.evaluate(() => window.location.pathname);
            await assert.strictEqual(pathname, DEFAULT_WEBSITE_BASE_PATH);
            const signUpButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signUpButtonLabel, "SIGN UP");
        });

        it("/auth/unknown-path should not render any ST component", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}/unknown-path?router=no-router`);
            await assertNoSTComponents(page);
        });

        it("/custom-supertokens-login should load SignIn SuperTokens components", async function() {
            await page.goto(`${TEST_CLIENT_BASE_URL}/custom-supertokens-login`);
            const signUpButtonLabel = await getSubmitFormButtonLabel(page);
            assert.strictEqual(signUpButtonLabel, "SIGN UP");
        });
    });

    describe("with custom websiteBasePath", function() {
        describe("=/custom", function() {
            before(async function() {
                await clearBrowserCookies(page);
                page = await browser.newPage();
                // Update websiteBasePath config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/custom`);
            });

            after(async function() {
                page = await browser.newPage();
                // Reset websiteBasePath config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/auth`);
            });

            it("/custom should show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/custom`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
            });

            it("/custom/reset-password should show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/custom/reset-password`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth should not show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
                await assertNoSTComponents(page);
            });
        });

        describe("=/", function() {
            before(async function() {
                await clearBrowserCookies(page);
                page = await browser.newPage();
                // Update websiteBasePath config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/`);
            });

            after(async function() {
                page = await browser.newPage();
                // Reset websiteBasePath config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?websiteBasePath=/auth`);
            });

            it("/ should show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/`);
                const signUpButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signUpButtonLabel, "SIGN UP");
                // Click on forgot password link.
                await toggleSignInSignUp(page);
                await clickForgotPasswordLink(page);
                const buttonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(buttonLabel, "Email me");
            });

            it("/reset-password should show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/reset-password`);
                const resetPasswordButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(resetPasswordButtonLabel, "Email me");
            });

            it("/auth should not show signin/signup", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
                await assertNoSTComponents(page);
            });
        });

        describe("default to signup = false", function() {
            before(async function() {
                await clearBrowserCookies(page);
                page = await browser.newPage();
                // Update defaultToSignUp config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?defaultToSignUp=false`);
            });

            after(async function() {
                page = await browser.newPage();
                // Reset defaultToSignUp config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?defaultToSignUp=true`);
            });

            it("/auth should show signin form", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
                const signInButtonLabel = await getSubmitFormButtonLabel(page);
                assert.strictEqual(signInButtonLabel, "SIGN IN");
            });
        });

        describe("useShadowDom = false", function() {
            before(async function() {
                await clearBrowserCookies(page);
                page = await browser.newPage();
                // Update useShadowDom config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?useShadowDom=false`);
            });

            after(async function() {
                page = await browser.newPage();
                // Reset useShadowDom config.
                await page.goto(`${TEST_CLIENT_BASE_URL}/?useShadowDom=true`);
            });

            it("/auth should show signin form", async function() {
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);
                const signInButtonLabel = await getSubmitFormButtonLabelWithoutShadowDom(page);
                assert.strictEqual(signInButtonLabel, "SIGN UP");
            });
        });
    });
});
