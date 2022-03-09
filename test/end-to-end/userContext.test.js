/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLatestURLWithToken,
    toggleSignInSignUp,
    defaultSignUp,
    setInputValues,
    submitFormReturnRequestAndResponse,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, RESET_PASSWORD_TOKEN_API, RESET_PASSWORD_API } from "../constants";
import assert from "assert";

// Run the tests in a DOM environment.
require("jsdom-global")();

describe("SuperTokens userContext with UI components test", function () {
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

        page = await browser.newPage();

        // Sign Up first.
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await toggleSignInSignUp(page);
        await defaultSignUp(page);
    });

    after(async function () {
        await browser.close();

        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST",
        }).catch(console.error);
    });

    describe("Reset password using token tests", function () {
        beforeEach(async function () {
            page = await browser.newPage();
            consoleLogs = [];
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            await page.goto(`${TEST_CLIENT_BASE_URL}/custom-reset-password`);
        });

        it("Test that passing userContext to Reset password works", async function () {
            await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
            await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_TOKEN_API);

            // TODO NEMI: This is a hack, check if there is a better way
            const latestURLWithToken = (await getLatestURLWithToken()).replace(
                "/auth/reset-password",
                "/custom-reset-password"
            );
            await page.goto(latestURLWithToken);

            await setInputValues(page, [
                { name: "password", value: "NEW_Str0ngP@ssw0rd" },
                { name: "confirm-password", value: "NEW_Str0ngP@ssw0rd" },
            ]);
            await submitFormReturnRequestAndResponse(page, RESET_PASSWORD_API);

            assert(
                consoleLogs.includes("ST_LOGS EMAIL_PASSWORD OVERRIDE SEND_PASSWORD_RESET_EMAIL RECEIVED_USER_CONTEXT")
            );

            assert(consoleLogs.includes("ST_LOGS EMAIL_PASSWORD OVERRIDE SUBMIT_NEW_PASSWORD RECEIVED_USER_CONTEXT"));

            assert(
                consoleLogs.includes("ST_LOGS EMAIL_PASSWORD OVERRIDE GET_RESET_TOKEN_FROM_URL RECEIVED_USER_CONTEXT")
            );
        });
    });
});
