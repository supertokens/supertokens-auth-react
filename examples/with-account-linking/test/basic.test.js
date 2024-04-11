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
} = require("../../../test/exampleTestHelpers");

const SuperTokensNode = require("../backend/node_modules/supertokens-node");
const Session = require("../backend/node_modules/supertokens-node/recipe/session");
const EmailVerification = require("../backend/node_modules/supertokens-node/recipe/emailverification");
const EmailPassword = require("../backend/node_modules/supertokens-node/recipe/emailpassword");
const Passwordless = require("../backend/node_modules/supertokens-node/recipe/passwordless");
const axios = require("axios");

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
    const phoneNumber = getTestPhoneNumber();
    const testOTP = "1234";
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

            await page.waitForSelector(".sessionButton");

            await page.goto(`${websiteDomain}/link`);

            await page.waitForSelector(".emailpassword.login-method");
            await checkLoginMethods(page, [{ loginMethod: "emailpassword", email }]);

            {
                const input = await page.waitForSelector("[type=tel]");
                await input.type(phoneNumber);
                await page.click("[type=tel]+button");
            }

            {
                const otpInput = await page.waitForSelector("[type=otp]");
                let otp = await axios("http://localhost:3001/get-otp-for-testing");
                otp = otp.data;
                await otpInput.type(otp + "");
                await page.click("[type=otp]+button");
            }

            await page.waitForSelector(".passwordless.login-method");

            await checkLoginMethods(page, [
                { loginMethod: "emailpassword", email },
                { loginMethod: "passwordless", phoneNumber },
            ]);

            await page.evaluate(() => __supertokensSessionRecipe.signOut({}));
            await new Promise((res) => setTimeout(res, 200));

            await page.goto(`${websiteDomain}/auth?rid=passwordless`);

            await setInputValues(page, [{ name: "emailOrPhone", value: email }]);
            await submitForm(page);

            await waitForSTElement(page, "[name=userInputCode]");

            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );

            await Passwordless.createNewCodeForDevice({
                tenantId: "public",
                deviceId: loginAttemptInfo.deviceId,
                userInputCode: testOTP,
            });

            await setInputValues(page, [{ name: "userInputCode", value: testOTP }]);
            await submitForm(page);
            const callApiBtn = await page.waitForSelector(".sessionButton");
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
            assert.strictEqual(sessionInfo.userId, userId);

            await page.goto(`${websiteDomain}/link`);

            await page.waitForSelector(".emailpassword.login-method");
            await checkLoginMethods(page, [
                { loginMethod: "emailpassword", email },
                { loginMethod: "passwordless", phoneNumber },
                { loginMethod: "passwordless", email },
            ]);
        });
    });
});

async function checkLoginMethods(page, expectedLoginMethods) {
    assert.strictEqual(await page.url(), `${websiteDomain}/link`);
    const methodDivs = await page.$$(".login-method");

    for (const div of methodDivs) {
        const classNameProp = await div.getProperty("className");
        const className = await classNameProp.jsonValue();
        const method = className.split(" ")[0];
        const contactInfo = (await (await div.$(".contactInfo")).evaluate((el) => el.textContent)).trim();

        assert(
            expectedLoginMethods.some(
                (m) =>
                    m.loginMethod === method &&
                    (m.email === undefined || contactInfo === `Email: ${m.email}`) &&
                    (m.phoneNumber === undefined || contactInfo === `Phone number: ${m.phoneNumber}`)
            )
        );
    }
    assert.strictEqual(methodDivs.length, expectedLoginMethods.length);
}
