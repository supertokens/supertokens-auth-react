import assert from "assert";
import fetch from "isomorphic-fetch";
import puppeteer from "puppeteer";
import {
    toggleSignInSignUp,
    defaultSignUp,
    screenshotOnFailure,
    assertProviders,
    clickOnProviderButton,
    loginWithAuth0,
    setPasswordlessFlowType,
    waitForSTElement,
    getPasswordlessDevice,
    setInputValues,
    submitForm,
    clearBrowserCookiesWithoutAffectingConsole,
    isPasswordlessSupported,
    isThirdPartyPasswordlessSupported,
} from "../helpers";
// Run the tests in a DOM environment.
require("jsdom-global")();
import {
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    SIGN_IN_UP_API,
    TEST_APPLICATION_SERVER_BASE_URL,
} from "../constants";

describe("getRedirectionURL Tests", function () {
    describe("Test that isNewUser is passed correctly", function () {
        describe("Email Password Recipe", function () {
            let browser;
            let page;
            before(async function () {
                await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                    method: "POST",
                }).catch(console.error);

                browser = await puppeteer.launch({
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    headless: true,
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
                page = await browser.newPage();
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
            });

            it("Test that isNewUser is true when signing up", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "emailpassword-true");
            });
        });

        describe("Third party recipe", function () {
            let browser;
            let page;
            before(async function () {
                await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                    method: "POST",
                }).catch(console.error);

                browser = await puppeteer.launch({
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    headless: true,
                });
                page = await browser.newPage();
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`);
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
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            it("Test that isNewUser works correctly", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
                await clickOnProviderButton(page, "Auth0");
                await Promise.all([
                    loginWithAuth0(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdparty-true");
            });
        });

        describe("Thirdpartyemailpassword recipe", function () {
            let browser;
            let page;
            before(async function () {
                await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                    method: "POST",
                }).catch(console.error);

                browser = await puppeteer.launch({
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    headless: true,
                });
                page = await browser.newPage();
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
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            it("Test that isNewUser is true when signing up with email", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page, "thirdpartyemailpassword");
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdpartyemailpassword-true");
            });

            it("Test that isNewUser works correctly when signing up with auth 0", async function () {
                await assertProviders(page);
                await clickOnProviderButton(page, "Auth0");
                await Promise.all([
                    loginWithAuth0(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdpartyemailpassword-true");
            });
        });

        describe("Passwordless recipe", function () {
            let browser;
            let page;
            const exampleEmail = "test@example.com";
            // Mocha calls cleanup functions even if the test block is skipped, this helps skipping the after block
            let didSkip = false;

            before(async function () {
                let _isPasswordlessSupported = await isPasswordlessSupported();
                if (!_isPasswordlessSupported) {
                    didSkip = true;
                    this.skip();
                    return;
                }

                await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);
                await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                    method: "POST",
                    headers: [["content-type", "application/json"]],
                    body: JSON.stringify({
                        configUpdates: [
                            { key: "passwordless_code_lifetime", value: 4000 },
                            { key: "passwordless_max_code_input_attempts", value: 3 },
                        ],
                    }),
                }).catch(console.error);

                browser = await puppeteer.launch({
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    headless: true,
                });
                page = await browser.newPage();
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setPasswordlessFlowType("EMAIL", "USER_INPUT_CODE");
            });

            after(async function () {
                // Dont cleanup if tests were skipped
                if (didSkip) {
                    return;
                }
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
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            it("Test that isNewUser is passed correctly", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: "email", value: exampleEmail }]);
                await submitForm(page);
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);
                await page.waitForSelector(".sessionInfo-user-id");

                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "passwordless-true");
            });
        });

        describe("ThirdPartyPasswordless recipe", function () {
            let browser;
            let page;
            const exampleEmail = "test@example.com";
            // Mocha calls cleanup functions even if the test block is skipped, this helps skipping the after block
            let didSkip = false;

            before(async function () {
                let _isThirdPartyPasswordlessSupported = await isThirdPartyPasswordlessSupported();
                if (!_isThirdPartyPasswordlessSupported) {
                    didSkip = true;
                    this.skip();
                    return;
                }

                await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
                    method: "POST",
                    headers: [["content-type", "application/json"]],
                    body: JSON.stringify({
                        configUpdates: [
                            { key: "passwordless_code_lifetime", value: 4000 },
                            { key: "passwordless_max_code_input_attempts", value: 3 },
                        ],
                    }),
                }).catch(console.error);

                browser = await puppeteer.launch({
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    headless: true,
                });
                page = await browser.newPage();
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setPasswordlessFlowType("EMAIL", "USER_INPUT_CODE");
            });

            after(async function () {
                // Dont cleanup if tests were skipped
                if (didSkip) {
                    return;
                }

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
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            it("Test that isNewUser is passed correctly", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: "email", value: exampleEmail }]);
                await submitForm(page);
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);
                await page.waitForSelector(".sessionInfo-user-id");

                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdpartypasswordless-true");
            });

            it("Test that isNewUser works correctly when signing up with auth 0", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
                await clickOnProviderButton(page, "Auth0");
                await Promise.all([
                    loginWithAuth0(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdpartypasswordless-true");
            });
        });
    });
});
