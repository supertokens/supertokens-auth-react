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
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");

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
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        }),
        ThirdPartyEmailPassword.init(),
        Session.init(),
    ],
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

            // Sent the otp
            await waitForSTElement(page, "[name=phoneNumber_text]");
            assert.strictEqual(page.url(), websiteDomain + "/second-factor");

            // Attempt reloading Home
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            // Redirect back to OTP screen
            await waitForSTElement(page, "[name=phoneNumber_text]");
            await setInputValues(page, [
                {
                    name: "phoneNumber_text",
                    value: phoneNumber,
                },
            ]);
            await submitForm(page);

            // Redirected to email verification screen (OTP screen from passwordless w/ overrides)
            await waitForSTElement(page, "[name=userInputCode]");
            // Attempt reloading Home
            await Promise.all([page.goto(websiteDomain), page.waitForNavigation({ waitUntil: "networkidle0" })]);
            await waitForSTElement(page, "[name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            // Create a new OTP and use it (we don't have access to the originally sent one)
            await Passwordless.createNewCodeForDevice({
                deviceId: loginAttemptInfo.deviceId,
                userInputCode: testOTP,
            });
            await setInputValues(page, [{ name: "userInputCode", value: testOTP }]);
            await submitForm(page);

            const callApiBtn = await page.waitForSelector(".sessionButton");

            const [user] = await ThirdPartyEmailPassword.getUsersByEmail(email);

            let setAlertContent;
            let alertContent = new Promise((res) => (setAlertContent = res));
            page.on("dialog", async (dialog) => {
                setAlertContent(dialog.message());
                await dialog.dismiss();
            });
            await callApiBtn.click();

            const alertText = await alertContent;
            assert(alertText.startsWith("Session Information:"));
            const sessionInfo = JSON.parse(alertText.replace(/^Session Information:/, ""));
            assert.strictEqual(sessionInfo.userId, user.id);
        });
    });
});
