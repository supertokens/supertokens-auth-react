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
    getSubmitFormButton,
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
            await waitForSTElement(page, "[data-supertokens~='forgotPasswordLink']");
            await getSubmitFormButton(page);

            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);
            {
                const submitButton = await getSubmitFormButton(page);
                // Wait until the ... appears in the button indicating loading
                await page.waitForFunction((e) => e.innerText.endsWith("..."), {}, submitButton);
                // Wait until the ... disappears from the button indicating it's done
                await page.waitForFunction((e) => !e.innerText.endsWith("..."), {}, submitButton);
            }

            // We switch back over to sign in...
            await toggleSignInSignUp(page);
            await waitForSTElement(page, "[data-supertokens~='forgotPasswordLink']");

            // It only shows up after navigation
            await waitForSTElement(page, "#signInMessage");

            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);
            const userId = await page.evaluate(() => window.__supertokensSessionRecipe.getUserId());

            {
                const submitButton = await getSubmitFormButton(page);
                // Wait until the ... appears in the button indicating loading
                await page.waitForFunction((e) => e.innerText.endsWith("..."), {}, submitButton);
                // Wait until the ... disappears from the button indicating it's done
                await page.waitForFunction((e) => !e.innerText.endsWith("..."), {}, submitButton);
            }

            const userIdEle = await page.waitForSelector("#userId");
            const userIdText = await page.evaluate((e) => e.innerText, userIdEle);
            assert.strictEqual(userIdText, userId);
        });
    });
});
