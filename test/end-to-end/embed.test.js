import assert from "assert";
import { AuthPage } from "./pages/AuthPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    screenshotOnFailure,
    setupBrowser,
    backendHook,
    createCoreApp,
    logoutFromEmailVerification,
} from "../helpers";

describe("Embed components", async () => {
        let browser;
        let page;
        let consoleLogs;
    
        before(async function () {
            await backendHook("before");
            browser = await setupBrowser();
        });
    
        beforeEach(async function () {
            await backendHook("beforeEach");
            await createCoreApp();
            page = await browser.newPage();
    
            consoleLogs = [];
            page.on("console", (consoleObj) => {
                const log = consoleObj.text();
                if (log.startsWith("ST_LOGS")) {
                    consoleLogs.push(log);
                }
            });
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        });
    
        afterEach(async function () {
            await screenshotOnFailure(this, browser);
            await page?.close();
            await backendHook("afterEach");
        });
    
        after(async function () {
            await browser?.close();
            await backendHook("after");
        });

    describe("EmailPassword SignInAndUp feature", () => {
        const testContext = {
            authRecipe: "emailpassword",
        };

        it("mount SignInAndUp on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount SignInAndUp on /auth route if disableDefaultUI = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultUI: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("ResetPassword feature", () => {
        const testContext = {};

        it("mount ResetPassword on /auth/reset-password route", async () => {
            const resetPasswordPage = await ResetPasswordPage.navigate(page, testContext);

            const isFeatureMounted = await resetPasswordPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount ResetPassword on /auth/reset-password if disableDefaultUI = true", async () => {
            const resetPasswordPage = await ResetPasswordPage.navigate(page, {
                ...testContext,
                disableDefaultUI: true,
            });

            const isFeatureMounted = await resetPasswordPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("EmailVerification feature", () => {
        const testContext = {
            mode: "REQUIRED",
        };

        it("mount EmailVerification on /auth/verify-email route", async () => {
            // First, sign up
            const authPage = await AuthPage.navigate(page, testContext);
            await authPage.signUp();

            const emailVerificationPage = await EmailVerificationPage.navigate(page, testContext);

            const isFeatureMounted = await emailVerificationPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount EmailVerification on /auth/verify-email if disableDefaultUI = true", async () => {
            // First, sign up and logout
            const authPage = await AuthPage.navigate(page, testContext);
            await authPage.signUp();
            await logoutFromEmailVerification(page);

            await authPage.signIn("john.doe@supertokens.io", "Str0ngP@ssw0rd");

            const emailVerificationPage = await EmailVerificationPage.navigate(page, {
                ...testContext,
                disableDefaultUI: true,
            });

            const isFeatureMounted = await emailVerificationPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("ThirdParty SignInAndUp feature", () => {
        const testContext = {
            authRecipe: "thirdparty",
        };

        it("mount supertokens on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount supertokens on /auth route if disableDefaultUI = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultUI: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("ThirdPartyEmailPassword SignInAndUp feature", () => {
        const testContext = {
            authRecipe: "thirdpartyemailpassword",
        };

        it("mount supertokens on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount supertokens on /auth route if disableDefaultUI = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultUI: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });
});
