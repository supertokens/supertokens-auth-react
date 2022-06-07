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
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getPasswordlessDevice,
    setInputValues,
    waitForSTElement,
    waitFor,
    getFeatureFlags,
    waitForText,
    screenshotOnFailure,
    setPasswordlessFlowType,
    isReact16,
    getInputNames,
    getLabelsText,
    getPlaceholders,
    getInputAdornmentsSuccess,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("General error rendering", function () {
    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("generalerror")) {
            this.skip();
        }
    });

    describe("EmailPassword", function () {
        let browser;
        let page;
        let consoleLogs = [];
        before(async function () {
            await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                method: "POST",
            }).catch(console.error);

            await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                method: "POST",
            }).catch(console.error);

            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            });
        });

        afterEach(function () {
            return screenshotOnFailure(this, browser);
        });

        beforeEach(async function () {
            page = await browser.newPage();
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
        });
    });

    describe("ThirdParty", function () {});

    describe("ThirdPartyEmailPassword", function () {});

    describe("Passwordless", function () {});

    describe("ThirdPartyPasswordless", function () {});
});
