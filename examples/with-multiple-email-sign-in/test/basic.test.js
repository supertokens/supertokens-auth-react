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

const assert = require("assert");
const puppeteer = require("puppeteer");
const {
    getTestEmail,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    waitForSTElement,
} = require("../../../test/exampleTestHelpers");

const SuperTokensNode = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

// Run the tests in a DOM environment.
require("jsdom-global")();

const apiDomain = "http://localhost:3001";
const websiteDomain = "http://localhost:3000";
SuperTokensNode.init({
    supertokens: {
        // We are running these tests without running a local ST instance
        connectionURI: "https://try.supertokens.com",
    },
    appInfo: {
        // These largely shouldn't matter except for creating links which we can change anyway
        apiDomain: apiDomain,
        websiteDomain: websiteDomain,
        appName: "testNode",
    },
    recipeList: [EmailVerification.init({ mode: "OPTIONAL" }), EmailPassword.init(), Session.init()],
});

describe("SuperTokens Example Basic tests", function () {
    let browser;
    let page;
    const email = getTestEmail();
    const testPW = "Str0ngP@ssw0rd";

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    describe("Email Password test", function () {
        it("Successful signup with credentials", async function () {
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            // redirected to /auth
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);

            // Redirected to email verification screen
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
            const userId = await page.evaluate(() => window.__supertokensSessionRecipe.getUserId());

            // Attempt reloading Home
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

            // Create a new token and use it (we don't have access to the originally sent one)
            const tokenInfo = await EmailVerification.createEmailVerificationToken(userId, email);
            await page.goto(`${websiteDomain}/auth/verify-email?token=${tokenInfo.token}`);
            await waitForSTElement(page, "[data-supertokens='button']");
            await submitForm(page);

            {
                const userIdEle = await page.waitForSelector("#userId");
                const userIdText = await page.evaluate((e) => e.innerText, userIdEle);
                assert.strictEqual(userIdText, userId);
            }

            const email2 = getTestEmail();

            const emailInput = await page.waitForSelector("#emailInput");
            await emailInput.type(email2);

            const emailBtn = await page.waitForSelector("#emailBtn");
            await emailBtn.click();

            await new Promise((res) => setTimeout(res, 1000));

            const logoutBtn = await page.waitForSelector("#logoutBtn");
            await logoutBtn.click();

            await setInputValues(page, [
                { name: "email", value: email2 },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);
            // Redirected to email verification screen
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
            const tokenInfo2 = await EmailVerification.createEmailVerificationToken(userId, email2);
            await page.goto(`${websiteDomain}/auth/verify-email?token=${tokenInfo2.token}`);
            await waitForSTElement(page, "[data-supertokens='button']");
            await submitForm(page);

            {
                const userIdEle = await page.waitForSelector("#userId");
                const userIdText = await page.evaluate((e) => e.innerText, userIdEle);
                assert.strictEqual(userIdText, userId);
            }
        });
    });
});
