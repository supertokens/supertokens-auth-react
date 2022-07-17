import assert from "assert";
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL } from "../constants";
import { AuthPage } from "./pages/AuthPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { clearBrowserCookiesWithoutAffectingConsole, screenshotOnFailure } from "../helpers";

describe("Embed components", async () => {
    let browser;
    let page;

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });

        await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
            method: "POST",
        }).catch(console.error);
        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await clearBrowserCookiesWithoutAffectingConsole(page, []);
    });

    after(async function () {
        await page.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);
        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);

        await browser.close();
    });

    afterEach(function () {
        return screenshotOnFailure(this, browser);
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
            // First, sign in, as we signed up previously
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
            });

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
