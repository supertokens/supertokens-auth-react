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
    waitForSTElement,
    toggleSignInSignUp,
} = require("../../../test/exampleTestHelpers");

const SuperTokensNode = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Passwordless = require("supertokens-node/recipe/passwordless");

// Run the tests in a DOM environment.
require("jsdom-global")();

const apiDomain = "http://localhost:3001";
const websiteDomain = "http://localhost:4200";
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
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        }),
        EmailVerification.init({ mode: "OPTIONAL" }),
        EmailPassword.init(),
        Session.init(),
    ],
});

describe("SuperTokens Example Basic tests", function () {
    let browser;
    let page;
    const email = getTestEmail();
    const testPW = "Str0ngP@ssw0rd";

    describe("Passwordless test", function () {
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

        it("Successful signup with credentials", async function () {
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            const signInBtn = await page.waitForSelector("#signInBtn");
            await Promise.all([signInBtn.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            // redirected to /auth
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);

            // Redirected to email verification screen
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
            const user = await EmailPassword.getUserByEmail(email);

            // Attempt reloading Home
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

            // Create a new token and use it (we don't have access to the originally sent one)
            const tokenInfo = await EmailVerification.createEmailVerificationToken(user.id, user.email);
            await page.goto(`${websiteDomain}/auth/verify-email?token=${tokenInfo.token}`);
            await submitForm(page);

            const userIdEle = await page.waitForSelector("#userId");
            const userIdText = await page.evaluate((e) => e.innerText, userIdEle);
            assert.equal(userIdText, user.id);
        });
    });
});
