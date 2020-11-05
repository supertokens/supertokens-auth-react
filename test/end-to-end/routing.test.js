/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { ST_ROOT_CONTAINER } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Routing in Test App", function() {
    let testAppChildProcess, browser;
    const SignInButtonQuerySelector = `document.querySelector('#${ST_ROOT_CONTAINER}').shadowRoot.querySelector('button').innerText`;
    const signInLabel = "SIGN IN";

    before(async function() {
        testAppChildProcess = spawn("./test/startTestApp.sh", ["--no-build"]);

        testAppChildProcess.stderr.on("data", function(data) {
            console.log("stderr:" + data);
        });

        testAppChildProcess.stdout.on("data", function(data) {
            if (data.toString().startsWith("LOGS:")) {
                console.log(data.toString());
            }
        });

        await new Promise(r => setTimeout(r, 4000));

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
        testAppChildProcess.kill();
    });

    describe("using react-router-dom", function() {
        it("/about should not load any SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/about`);
            const superTokensComponent = await page.$(`.${ST_ROOT_CONTAINER}`);
            assert.strictEqual(superTokensComponent, null);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, { waitUntil: "domcontentloaded" });
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });

        it("/auth?rid=email-password should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?rid=email-password`, { waitUntil: "domcontentloaded" });
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });

        it("/auth?rid=unknown-rid should load first components.", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?rid=unknown`);
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });
    });

    describe("without react-router-dom", function() {
        it("/about should not load any SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/about?router=no-router`, { waitUntil: "domcontentloaded" });
            const superTokensComponent = await page.$(`.${ST_ROOT_CONTAINER}`);
            assert.strictEqual(superTokensComponent, null);
        });

        it("/auth should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?router=no-router`, { waitUntil: "domcontentloaded" });
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });

        it("/auth?rid=email-password should load SignInUp components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?router=no-router&rid=email-password`, {
                waitUntil: "domcontentloaded"
            });
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });

        it("/auth?rid=unknown-rid should load first SuperTokens components that matches", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth?router=no-router&rid=unknown`, {
                waitUntil: "domcontentloaded"
            });
            const superTokensComponent = await page.$(`#${ST_ROOT_CONTAINER}`);
            assert.notStrictEqual(superTokensComponent, null);
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });

        it("/custom-supertokens-login should load SignIn SuperTokens components", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/custom-supertokens-login`, {
                waitUntil: "domcontentloaded"
            });
            const superTokensComponent = await page.$(`#${ST_ROOT_CONTAINER}`);
            assert.notStrictEqual(superTokensComponent, null);
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, signInLabel);
        });
    });
});
