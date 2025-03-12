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
    getTextInDashboardNoAuth,
    screenshotOnFailure,
    setupBrowser,
} from "../helpers";
import { TEST_CLIENT_BASE_URL } from "../constants";

describe("Refresh errors", function () {
    describe("500", function () {
        let browser;
        let page;

        before(async function () {
            browser = await puppeteer.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            });
        });

        after(async function () {
            await browser.close();
        });

        afterEach(function () {
            return screenshotOnFailure(this, browser);
        });

        beforeEach(async function () {
            page = await browser.newPage();
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
        });

        it("should be handled as logged out", async function () {
            await page.evaluate(() => {
                document.cookie = "sAccessToken=asdfasdf;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax";
                document.cookie = "sRefreshToken=asdfasdf;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax";
                document.cookie =
                    "sFrontToken=eyJ1aWQiOiIzMjU1Y2U0Zi1jMmM2LTQ4MWUtOTEzMC1jNmZiOGM3YjU4OGYiLCJhdGUiOjE2NjI1NTgyMTEzOTAsInVwIjp7InN0LWV2Ijp7InYiOnRydWUsInQiOjE2NjI1NDc4NDM2MDR9fX0=;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax";
            });
            const consoleLogs = [];
            await page.on("console", (log) => {
                const text = log.text();
                if (text.startsWith("ST_")) {
                    consoleLogs.push(text);
                }
            });
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/dashboard-no-auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            // We don't rethrow from doesSessionExist
            let text = await getTextInDashboardNoAuth(page);
            assert.strictEqual(text, "Not logged in");
        });
    });
});
