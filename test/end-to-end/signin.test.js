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
import fetch from "isomorphic-fetch";

// Run the tests in a DOM environment.
require("jsdom-global")();

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignIn feature/theme", function() {
    let testAppChildProcess, browser;
    const SignInButtonQuerySelector = `document.querySelector('#${ST_ROOT_CONTAINER}').shadowRoot.querySelector('button').innerText`;

    before(async function() {
        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST"
        }).catch(console.error);

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

        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST"
        }).catch(console.error);
    });

    describe("SignIn test (default)", function() {
        it("Should contain email and password fields only (TODO)", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, { waitUntil: "domcontentloaded" });
            const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);
            assert.notStrictEqual(signInButton, null);
            assert.strictEqual(signInButton._remoteObject.value, "SIGN IN");
        });

        it('Should switch to signup when "Sign Up" is clicked.', async function() {});

        it('Should switch to resetPassword when "Forgot password" is clicked.', async function() {});

        it("Should disable clicking on signin when email and password are empty (TODO)", async function() {});

        it("Should show error message when email is not correct (TODO)", async function() {});

        it("Should show error message when password is too short (TODO)", async function() {});

        it("Should redirect to '/' on successful login (TODO)", async function() {});

        it("Clicking on signin before filling the fields shows error messages (TODO)", async function() {});

        it("Clicking on signin with incorrect email format shows error message (TODO)", async function() {});

        it("Clicking on signin with incorrect password format shows error messages(TODO)", async function() {});

        it("Wrong credentials shows wrong credentials general error (TODO)", async function() {});

        it("Good credentials redirects to onSuccessulRedirectURL (TODO)", async function() {});

        it("Server Error shows Something went wrong general error (TODO)", async function() {});

        it("Call doesSessionExist callback on load if provided (TODO)", async function() {});

        it("Call onHandleSuccess callback on success if provided (TODO)", async function() {});

        it("Redirect to onSuccessRedirect when doesSessionExist returns true (TODO)", async function() {});

        it("Call onCallSignInAPI callback on signin if provided (TODO)", async function() {});

        it("Call onCallSignUpAPI callback on signup if provided (TODO)", async function() {});

        it("Call onHandleForgotPasswordClicked callback on forgotPassword clicked if provided (TODO)", async function() {});

        it("Calling signOut should sign out properly (TODO)", async function() {});
    });
});
