/*
 * Copyright (c) 2022, SuperTokens.com
 * All rights reserved.
 */

import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL, TEST_CLIENT_BASE_URL } from "../constants";
import {
    backendBeforeEach,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    getTestEmail,
    waitForSTElement,
    submitForm,
    setEnabledRecipes,
    setInputValues,
    setAccountLinkingConfig,
    getPasswordlessDevice,
} from "../helpers";
import { tryWebauthnSignUp } from "./webauthn.helpers";
import assert from "assert";

/*
 * Test case:
 * 1. The app has account linking disabled
 * 2. A user signs up using a non-webauthn factor (e.g.: passwordless)
 * 3. The user now tries signing up with webauthn using the same email
 *    -> this should work and create an entirely separate user with an unverified email address
 */
describe("SuperTokens WebAuthn Account Linking", function () {
    let browser;
    let page;
    let consoleLogs = [];
    let userId1;
    let userId2;
    const email = getTestEmail();

    before(async function () {
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        await setEnabledRecipes([
            "webauthn",
            "emailpassword",
            "passwordless",
            "session",
            "dashboard",
            "userroles",
            "multifactorauth",
        ]);

        browser = await setupBrowser();
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
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
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await toggleSignInSignUp(page);
    });

    it("Should create separate users when signing up with same email using different auth methods (account linking disabled)", async function () {
        // Disable account linking
        await setAccountLinkingConfig(false, false);
        const email = await getTestEmail();

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        // Signup using the email
        await setInputValues(page, [{ name: "email", value: email }]);
        await submitForm(page);

        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

        const loginAttemptInfo = JSON.parse(
            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
        );
        const device = await getPasswordlessDevice(loginAttemptInfo);
        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
        await submitForm(page);
        await page.waitForTimeout(2000);

        // We want to parse the text inside the session-context-userId div
        const userId1 = await page.evaluate(() => document.querySelector(".session-context-userId").textContent);

        // Find the div with classname logoutButton and click it using normal
        // puppeteer selector
        const logoutButton = await page.waitForSelector("div.logoutButton");
        await logoutButton.click();
        await new Promise((res) => setTimeout(res, 1000));

        await tryWebauthnSignUp(page, email);

        // We should be in the confirmation page now.
        await submitForm(page);
        await page.waitForTimeout(1000);

        // Extract second userId from console logs
        const userId2 = await page.evaluate(() => document.querySelector(".session-context-userId").textContent);

        // Verify that two different users were created
        assert.notStrictEqual(
            userId1,
            userId2,
            "Different auth methods with same email should create separate users when account linking is disabled"
        );
    });
});
