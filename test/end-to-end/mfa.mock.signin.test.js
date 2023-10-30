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
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    clickForgotPasswordLink,
    getFieldErrors,
    getGeneralError,
    getInputNames,
    getInputTypes,
    getLogoutButton,
    getLabelsText,
    getPlaceholders,
    getUserIdWithAxios,
    getSessionHandleWithAxios,
    getUserIdWithFetch,
    getSessionHandleWithFetch,
    getShowPasswordIcon,
    getSubmitFormButtonLabel,
    getInputAdornmentsSuccess,
    hasMethodBeenCalled,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse,
    toggleShowPasswordIcon,
    toggleSignInSignUp,
    getInputAdornmentsError,
    defaultSignUp,
    getUserIdFromSessionContext,
    getTextInDashboardNoAuth,
    waitForSTElement,
    screenshotOnFailure,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    getInvalidClaimsJSON as getInvalidClaims,
    waitForText,
    backendBeforeEach,
    getTestEmail,
    getPasswordlessDevice,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { SOMETHING_WENT_WRONG_ERROR, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

import { EMAIL_EXISTS_API, SIGN_IN_API, TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_OUT_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignIn", function () {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function () {
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: false,
        });
    });

    after(async function () {
        await browser.close();

        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
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

    describe("SignIn test ", function () {
        it("Successful Sign In", async function () {
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            const email = await getTestEmail();
            await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            let resp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/setMFAInfo`, {
                method: "POST",
                headers: new Headers([["content-type", "application/json"]]),
                body: JSON.stringify({
                    requirements: ["otp-email"],
                }),
            });
            assert.strictEqual(resp.status, 200);
            console.log(await resp.text());
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await toggleSignInSignUp(page);

            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: "Asdf12.." },
                { name: "name", value: "asdf" },
                { name: "age", value: "20" },
            ]);

            await submitForm(page);
            await new Promise((res) => setTimeout(res, 250));

            await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
            await submitForm(page);

            await page.waitForSelector(".sessionInfo-user-id");
        });
    });
});
