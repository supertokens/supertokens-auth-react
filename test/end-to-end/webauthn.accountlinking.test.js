/*
 * Copyright (c) 2022, SuperTokens.com
 * All rights reserved.
 */

import { TEST_CLIENT_BASE_URL } from "../constants";
import {
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    getTestEmail,
    waitForSTElement,
    submitForm,
    setInputValues,
    getPasswordlessDevice,
    waitForUrl,
    changeEmail,
    getLatestURLWithToken,
    getUserIdWithFetch,
    submitFormUnsafe,
    backendHook,
    setupCoreApp,
    setupST,
    isWebauthnSupported,
} from "../helpers";
import {
    openRecoveryAccountPage,
    tryWebauthnSignUp,
    getTokenFromEmail,
    openRecoveryWithToken,
    tryWebauthnSignIn,
} from "./webauthn.helpers";
import { tryPasswordlessSignInUp } from "./accountlinking.test";
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
    let skipped = false;
    const appConfig = {
        enabledRecipes: [
            "webauthn",
            "emailpassword",
            "session",
            "dashboard",
            "userroles",
            "multifactorauth",
            "passwordless",
            "emailverification",
            "accountlinking",
        ],
    };

    before(async function () {
        if (!(await isWebauthnSupported())) {
            skipped = true;
            this.skip();
        }

        await backendHook("before");
        const coreUrl = await setupCoreApp();
        appConfig.coreUrl = coreUrl;
        await setupST(appConfig);

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
        if (skipped) {
            return;
        }

        await page?.close();
        await browser?.close();
        await backendHook("after");
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await toggleSignInSignUp(page);
    });

    it("Should create separate users when signing up with same email using different auth methods (account linking disabled)", async function () {
        // Disable account linking
        await setupST({
            ...appConfig,
            accountLinkingConfig: {
                enabled: true,
                shouldAutoLink: {
                    shouldAutomaticallyLink: false,
                    shouldRequireVerification: false,
                },
            },
        });
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
        await page.waitForTimeout(4000);

        // Extract second userId from console logs
        const userId2 = await page.evaluate(() => document.querySelector(".session-context-userId").textContent);

        // Verify that two different users were created
        assert.notStrictEqual(
            userId1,
            userId2,
            "Different auth methods with same email should create separate users when account linking is disabled"
        );
    });

    it("should handle email updates correctly for user that signed up with webauthn", async () => {
        await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));
        await setupST({
            ...appConfig,
            accountLinkingConfig: {
                enabled: true,
                shouldAutoLink: {
                    shouldAutomaticallyLink: false,
                    shouldRequireVerification: false,
                },
            },
        });
        const email = await getTestEmail();

        await tryWebauthnSignUp(page, email);

        // We should be in the confirmation page now.
        await submitForm(page);

        await waitForUrl(page, "/auth/verify-email");

        // we wait for email to be created
        await new Promise((r) => setTimeout(r, 1000));

        // we fetch the email verification link and go to that
        const latestURLWithToken = await getLatestURLWithToken();
        await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.goto(latestURLWithToken)]);

        // click on the continue button
        await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
        await waitForUrl(page, "/dashboard");

        await page.waitForTimeout(4000);

        // Change the email for the webauthn user
        await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
        const recipeUserId = await getUserIdWithFetch(page);
        assert.ok(recipeUserId);

        // Find the div with classname logoutButton and click it using normal
        // puppeteer selector
        const logoutButton = await page.waitForSelector("div.logoutButton");
        await logoutButton.click();
        await new Promise((res) => setTimeout(res, 1000));

        const newEmail = getTestEmail("new");
        const res = await changeEmail("webauthn", recipeUserId, newEmail, null);

        // Sign in with the new email
        await tryWebauthnSignIn(page);

        // Since mode is required, user should be redirected to verify email
        // screen as the email was changed and the new email is not verified.
        await waitForUrl(page, "/auth/verify-email");

        await page.waitForTimeout(4000);
    });

    it("should allow same emails to be linked but requiring verification", async () => {
        await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));
        await setupST({
            ...appConfig,
            accountLinkingConfig: {
                enabled: true,
                shouldAutoLink: {
                    shouldAutomaticallyLink: true,
                    shouldRequireVerification: true,
                },
            },
        });
        const email = await getTestEmail();

        await tryPasswordlessSignInUp(page, email);
        await page.waitForTimeout(1000);

        await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
        const userId1 = await getUserIdWithFetch(page);
        assert.ok(userId1);

        await page.waitForTimeout(1000);

        // Find the div with classname logoutButton and click it using normal
        // puppeteer selector
        const logoutButton = await page.waitForSelector("div.logoutButton");
        await logoutButton.click();
        await new Promise((res) => setTimeout(res, 1000));

        // Try to signup with the same email through webauthn now
        await tryWebauthnSignUp(page, email);

        // We should be in the confirmation page now.
        await submitForm(page);

        await page.waitForTimeout(1000);
        await waitForSTElement(page, "[data-supertokens~='generalError']");

        // Try to recover the webauthn account using the same email
        await openRecoveryAccountPage(page, email, true);
        await page.waitForTimeout(1000);

        // Get the token from the email
        const token = await getTokenFromEmail(email);
        assert.ok(token);

        // Use the token to recover the account
        await openRecoveryWithToken(page, token);

        // We should be in the recovery page now, click the continue button
        await submitFormUnsafe(page);

        await new Promise((res) => setTimeout(res, 2000));

        const successContainer = await waitForSTElement(page, "[data-supertokens~='headerText']");
        const headerText = await successContainer.evaluate((el) => el.textContent);

        // Assert the text contains "Account recovered successfully!"
        assert.deepStrictEqual(headerText, "Account recovered successfully!");
    });
});
