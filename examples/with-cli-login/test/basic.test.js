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
const { fork } = require("child_process");

// Run the tests in a DOM environment.
require("jsdom-global")();

const apiDomain = "http://localhost:3000";
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
    recipeList: [EmailVerification.init({ mode: "OPTIONAL" }), EmailPassword.init(), Session.init()],
});

describe("SuperTokens Example Basic tests", function () {
    let browser;
    let page;
    let cliProcess;
    const email = getTestEmail();
    const testPW = "Str0ngP@ssw0rd";

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
        page = await browser.newPage();
    });

    afterEach(() => {
        if (cliProcess !== undefined) {
            cliProcess.kill();
        }
        cliProcess = undefined;
    });

    after(async function () {
        await browser.close();
    });

    describe("CLI login test", function () {
        it("Successful signup with credentials", async function () {
            let setLink;
            let setLogin;
            const linkPromise = new Promise((res) => (setLink = res));
            const loggedInPromise = new Promise((res) => (setLogin = res));
            cliProcess = fork("cli.js", { stdio: "pipe" });
            cliProcess.stdout.on("data", (data) => {
                const message = data.toString();
                if (message.includes(apiDomain)) {
                    setLink(message.split("\n").find((line) => line.startsWith(apiDomain)));
                }
                if (message.startsWith("Login success! The CLI has a JWT:")) {
                    setLogin(true);
                }
            });
            const loginLink = await linkPromise;
            await Promise.all([page.goto(loginLink), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            // redirected to /auth
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);

            await page.waitForSelector(".sessionButton");
            await loggedInPromise;
        });
    });
});
