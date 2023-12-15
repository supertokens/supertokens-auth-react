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
    const phoneNumber = getTestPhoneNumber();
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

            const btnSelector1FA = ".call-api div:nth-of-type(1)";
            const btnSelector2FA = ".call-api div:nth-of-type(2)";
            const btnSelector3FA = ".call-api div:nth-of-type(3)";
            await checkCallAPIBtn(page, btnSelector1FA, true);
            await checkCallAPIBtn(page, btnSelector2FA, false);
            await checkCallAPIBtn(page, btnSelector3FA, false);

            const addPhone = await page.waitForSelector(".factor-redirection div:nth-of-type(2)");
            await addPhone.click();

            await setInputValues(page, [{ name: "phoneNumber_text", value: phoneNumber }]);

            await submitForm(page);

            await completeOTP(page);

            await checkCallAPIBtn(page, btnSelector1FA, true);
            await checkCallAPIBtn(page, btnSelector2FA, true);
            await checkCallAPIBtn(page, btnSelector3FA, false);

            // set to 3fa
            await page.click(".set-requirements div:nth-of-type(3)");
            await page.waitForFunction(() => {
                const reqs = document.querySelector(".login-requirements");

                return reqs.textContent === "3FA required during sign in";
            });

            // Log out
            await page.click("div.bottom-links-container > div:nth-child(3) > div");
            await setInputValues(page, [
                { name: "email", value: email },
                { name: "password", value: testPW },
            ]);
            await submitForm(page);
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);
            await new Promise((res) => setTimeout(res, 500));
            // complete otp-email as well
            await completeOTP(page);

            const factorChooser = await page.waitForSelector(".factor-redirection div:nth-of-type(1)");
            await factorChooser.click();
            await chooseFactor(page, "totp");
            await waitForSTElement(page, "[data-supertokens~=totpDeviceQR]");
        });
    });
});

async function checkCallAPIBtn(page, btnSelector, shouldSucceed) {
    const callApiBtn = await page.waitForSelector(btnSelector);
    let setAlertContent;
    let alertContent = new Promise((res) => (setAlertContent = res));
    const dialogHandler = async (dialog) => {
        setAlertContent(dialog.message());
        await dialog.dismiss();
    };
    page.on("dialog", dialogHandler);
    await callApiBtn.click();
    await alertContent;
    page.off("dialog", dialogHandler);

    const alertText = await alertContent;
    if (shouldSucceed) {
        assert(alertText.startsWith("Session Information:"));
    } else {
        assert(alertText.includes("invalid claim"));
    }
}

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
