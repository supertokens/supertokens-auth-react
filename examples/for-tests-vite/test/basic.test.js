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
const fetch = require("isomorphic-fetch");
const {
    getTestEmail,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    waitForSTElement,
} = require("../../../test/exampleTestHelpers");

const SuperTokensNode = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const { getProvidersLabels } = require("../../../test/helpers");

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
    recipeList: [ThirdPartyEmailPassword.init(), Session.init()],
});

describe("SuperTokens Example Basic tests", function () {
    let browser;
    let page;
    const email = getTestEmail();
    // maybe we could/should randomize this..
    const phoneNumber = "+18004444444";
    const testPW = "Str0ngP@ssw0rd";
    const testOTP = "test123456";

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: false,
        });
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    describe("Vite render", function () {
        it("Form is rendered", async function () {
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const providers = await getProvidersLabels(page);
            assert.deepStrictEqual(["Continue with Github"], providers);
        });
    });
});
