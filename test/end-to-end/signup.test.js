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

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignUp feature/theme", function() {
    let browser;
    const SignInButtonQuerySelector = `document.querySelector('#${ST_ROOT_CONTAINER}').shadowRoot.querySelector('button').innerText`;

    before(async function() {
        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST"
        }).catch(console.error);

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST"
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST"
        }).catch(console.error);
    });

    describe("SignUp test (default)", function() {
        it('Should switch to signin when "Sign In" is clicked (TODO)', async function() {});

        it("Should show error message when email is not correct (TODO)", async function() {});

        it("Should show error message when password is too short (TODO)", async function() {});

        it("Should redirect to '/' on successful signup (TODO)", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, { waitUntil: "domcontentloaded" });
        });

        it("Signup without filling all required fields shows error (TODO)", async function() {});

        it("Server error shows general error banner (TODO)", async function() {});

        it("Optional fields are not required (TODO)", async function() {});

        it("Wrong email format shows field error (TODO)", async function() {});
    });
});
