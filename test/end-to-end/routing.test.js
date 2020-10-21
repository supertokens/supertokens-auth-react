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
import { CLASS_CONTAINER } from "../../lib/build/constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

const TEST_APP_BASE_URL = "http://localhost:3031";
/*
 * Tests.
 */
describe("SuperTokens Routing in Test App", function() {
    let testAppChildProcess, browser;
    before(async function() {
        testAppChildProcess = spawn("./testApp.sh", ["--start"]);

        testAppChildProcess.stderr.on("data", function(data) {
            console.log("stderr:" + data);
        });

        testAppChildProcess.stdout.on("data", function(data) {
            if (data.toString().startsWith("LOGS:")) {
                console.log(data.toString());
            }
        });

        await new Promise(r => setTimeout(r, 3000));

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true
        });
    });

    after(async function() {
        await browser.close();
        testAppChildProcess.kill();
        spawn("./testApp.sh", ["--stop"]);
    });

    describe("using react-router-dom", function() {
        it("/about should not load any ST components.", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_APP_BASE_URL}/about`, { waitUntil: "networkidle2" });
            const superTokensComponent = await page.$(`.${CLASS_CONTAINER}`);
            assert.strictEqual(superTokensComponent, null);
        });

        it("/auth should load ST components.", async function() {
            const page = await browser.newPage();
            await page.goto(`${TEST_APP_BASE_URL}/auth`, { waitUntil: "networkidle2" });
            const superTokensComponent = await page.$(`.${CLASS_CONTAINER}`);
            assert.notStrictEqual(superTokensComponent, null);
        });
    });
});
