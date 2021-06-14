import assert from "assert";
import puppeteer from "puppeteer";
import { TEST_SERVER_BASE_URL } from "../constants";
import { AuthPage } from "./pages/AuthPage";

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

        page = await browser.newPage();
    });

    after(async function () {
        await page.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);
        await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
            method: "POST",
        }).catch(console.error);

        await browser.close();
    });

    describe("EmailPassword recipe", () => {
        const testContext = {
            authRecipe: "emailpassword",
        };

        it("mount supertokens on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount supertokens on /auth route if disableDefaultImplementation = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultImplementation: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("ThirdParty recipe", () => {
        const testContext = {
            authRecipe: "thirdparty",
        };

        it("mount supertokens on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount supertokens on /auth route if disableDefaultImplementation = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultImplementation: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });

    describe("ThirdPartyEmailPassword recipe", () => {
        const testContext = {
            authRecipe: "thirdpartyemailpassword",
        };

        it("mount supertokens on /auth route", async () => {
            const authPage = await AuthPage.navigate(page, testContext);

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, true);
        });

        it("don't mount supertokens on /auth route if disableDefaultImplementation = true", async () => {
            const authPage = await AuthPage.navigate(page, {
                ...testContext,
                disableDefaultImplementation: true,
            });

            const isFeatureMounted = await authPage.isFeatureMounted();

            assert.strictEqual(isFeatureMounted, false);
        });
    });
});
