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
    getTestPhoneNumber,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    waitForSTElement,
    chooseFactor,
} = require("../../../test/exampleTestHelpers");

const SuperTokensNode = require("../backend/node_modules/supertokens-node");
const Session = require("../backend/node_modules/supertokens-node/recipe/session");
const EmailVerification = require("../backend/node_modules/supertokens-node/recipe/emailverification");
const EmailPassword = require("../backend/node_modules/supertokens-node/recipe/emailpassword");
const Passwordless = require("../backend/node_modules/supertokens-node/recipe/passwordless");

// Run the tests in a DOM environment.
require("jsdom-global")();

const apiDomain = "http://localhost:3001";
const websiteDomain = "http://localhost:3000";
SuperTokensNode.init({
    supertokens: {
        // We are running these tests without running a local ST instance
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        // These largely shouldn't matter except for creating links which we can change anyway
        apiDomain: apiDomain,
        websiteDomain: websiteDomain,
        appName: "testNode",
    },
    recipeList: [
        EmailVerification.init({ mode: "OPTIONAL" }),
        EmailPassword.init(),
        Session.init(),
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
        }),
    ],
});

describe("SuperTokens Example Basic tests", function () {
    let browser;
    let page;
    const email = getTestEmail();
    const phoneNumber = getTestPhoneNumber(0);
    const phoneNumber2 = getTestPhoneNumber(1);
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

    describe("MultiFactorAuth", function () {
        it("Successful signup with multiple credentials", async function () {
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
            const tokenInfo = await EmailVerification.createEmailVerificationToken(
                "public",
                SuperTokensNode.convertToRecipeUserId(userId),
                email
            );
            await page.goto(`${websiteDomain}/auth/verify-email?token=${tokenInfo.token}`);

            await submitForm(page);

            await setInputValues(page, [{ name: "phoneNumber_text", value: phoneNumber }]);
            await submitForm(page);
            await completeOTP(page);

            const addPhoneBtn = await page.waitForSelector(".call-api div:nth-of-type(2)");
            await addPhoneBtn.click();

            await setInputValues(page, [{ name: "phoneNumber_text", value: phoneNumber2 }]);
            await submitForm(page);
            await completeOTP(page);

            await page.waitForSelector(".sessionButton");
            // Log out
            await page.click("div.bottom-links-container > div:nth-child(3) > div");
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);

            await page.waitForSelector(".phoneNumberList");

            const phoneNumbers = await page.evaluate(() =>
                Array.from(document.querySelectorAll(".phoneNumberCard"), (i) => i.textContent)
            );

            assert.deepStrictEqual(new Set(phoneNumbers), new Set([phoneNumber, phoneNumber2]));

            {
                await page.click(".phoneNumberCard:nth-of-type(1)");
                const phoneNumberOnScreen = await waitForSTElement(
                    page,
                    "[data-supertokens~=pwless-mfa] [data-supertokens~=headerSubtitle] strong"
                );
                assert.strictEqual(await phoneNumberOnScreen.evaluate((e) => e.textContent), phoneNumbers[0]);
            }

            const changePhoneBtn = await waitForSTElement(page, "[data-supertokens~=changePhoneNumber]");
            await changePhoneBtn.click();
            await page.waitForSelector(".phoneNumberList");

            {
                await page.click(".phoneNumberCard:nth-of-type(2)");
                const phoneNumberOnScreen = await waitForSTElement(
                    page,
                    "[data-supertokens~=pwless-mfa] [data-supertokens~=headerSubtitle] strong"
                );
                assert.strictEqual(await phoneNumberOnScreen.evaluate((e) => e.textContent), phoneNumbers[1]);
            }

            await completeOTP(page);
            await page.waitForSelector(".sessionButton");
        });
    });
});

async function completeOTP(page) {
    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
    await new Promise((res) => setTimeout(res, 500));

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );

    const resend = await Passwordless.createNewCodeForDevice({
        deviceId: loginAttemptInfo.deviceId,
        tenantId: loginAttemptInfo.tenantId ?? "public",
    });

    assert.strictEqual(resend.status, "OK");

    await setInputValues(page, [{ name: "userInputCode", value: resend.userInputCode }]);
    await submitForm(page);
}
