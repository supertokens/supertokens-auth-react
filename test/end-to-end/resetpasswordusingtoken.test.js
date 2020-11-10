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
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Reset password feature/theme", function() {
    let browser;

    before(async function() {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
    });

    describe("Reset password enter email form test", function() {
        it("Should send reset password for valid email", async function() {});
        it("Should redirect to form if click on resend link after successful reset password", async function() {});
        it("Should show general error if server failure", async function() {});
        it("Should call onHandleSuccess props if present", async function() {});
    });

    describe("Reset password new password form test", function() {
        it("Should return error form fields if password is in incorrect format", async function() {});
        it("Should return error form fields if password does not match", async function() {});
        it("Should return general error if token is undefined", async function() {});
        it("Should reset password successfully and show Login button if token is defined", async function() {});
    });
});
