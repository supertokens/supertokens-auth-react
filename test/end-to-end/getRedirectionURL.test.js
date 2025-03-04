import assert from "assert";
import fetch from "isomorphic-fetch";
import puppeteer from "puppeteer";
import {
    toggleSignInSignUp,
    defaultSignUp,
    screenshotOnFailure,
    assertProviders,
    clickOnProviderButton,
    loginWithMockProvider,
    setPasswordlessFlowType,
    waitForSTElement,
    getPasswordlessDevice,
    setInputValues,
    submitForm,
    clearBrowserCookiesWithoutAffectingConsole,
    isPasswordlessSupported,
    isThirdPartyPasswordlessSupported,
    backendBeforeEach,
    setupBrowser,
    backendHook,
    createCoreApp,
} from "../helpers";

import {
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    SIGN_IN_UP_API,
    TEST_APPLICATION_SERVER_BASE_URL,
} from "../constants";

describe("getRedirectionURL Tests", function () {
    let browser;
    let page;

    before(async function () {
        await backendHook("before");
        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    describe("Test that isNewRecipeUser is passed correctly", function () {
        describe("Email Password Recipe", function () {
            beforeEach(async function () {
                page = await browser.newPage();
                await createCoreApp();

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
            });

            afterEach(async function () {
                await page?.close();
            });

            it("Test that isNewRecipeUser is true when signing up", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "emailpassword-true");
            });
        });

        describe("Third party recipe", function () {
            before(async function () {
                await createCoreApp();
                page = await browser.newPage();
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            after(async function () {
                await page?.close();
            });

            it("Test that isNewRecipeUser works correctly", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
                await clickOnProviderButton(page, "Mock Provider");
                await Promise.all([
                    loginWithMockProvider(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdparty-true");
            });
        });

        describe("Thirdpartyemailpassword recipe", function () {
            before(async function () {
                await createCoreApp();
                page = await browser.newPage();
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            after(async function () {
                await page?.close();
            });

            it("Test that isNewRecipeUser is true when signing up with email", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page, "thirdpartyemailpassword");
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "emailpassword-true");
            });

            it("Test that isNewRecipeUser works correctly when signing up with auth 0", async function () {
                await assertProviders(page);
                await clickOnProviderButton(page, "Mock Provider");
                await Promise.all([
                    loginWithMockProvider(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdparty-true");
            });
        });

        describe("Passwordless recipe", function () {
            const exampleEmail = "test@example.com";

            before(async function () {
                let _isPasswordlessSupported = await isPasswordlessSupported();
                if (!_isPasswordlessSupported) {
                    this.skip();
                    return;
                }

                await createCoreApp({
                    coreConfig: {
                        passwordless_code_lifetime: 4000,
                        passwordless_max_code_input_attempts: 3,
                    },
                    passwordlessFlowType: "USER_INPUT_CODE",
                    passwordlessContactMethod: "EMAIL",
                });

                page = await browser.newPage();
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            after(async function () {
                await page?.close();
            });

            it("Test that isNewRecipeUser is passed correctly", async function () {
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
            const exampleEmail = "test@example.com";

            before(async function () {
                let _isThirdPartyPasswordlessSupported = await isThirdPartyPasswordlessSupported();
                if (!_isThirdPartyPasswordlessSupported) {
                    this.skip();
                }

                await createCoreApp({
                    coreConfig: {
                        passwordless_code_lifetime: 4000,
                        passwordless_max_code_input_attempts: 3,
                    },
                    passwordlessFlowType: "USER_INPUT_CODE",
                    passwordlessContactMethod: "EMAIL",
                });

                page = await browser.newPage();
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, []);
                await page.evaluate(() => localStorage.removeItem("isNewUserCheck"));
            });

            after(async function () {
                await page?.close();
            });

            it("Test that isNewRecipeUser is passed correctly", async function () {
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

            it("Test that isNewRecipeUser works correctly when signing up with auth 0", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await assertProviders(page);
                await clickOnProviderButton(page, "Mock Provider");
                await Promise.all([
                    loginWithMockProvider(page),
                    page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
                ]);
                const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                assert.equal(newUserCheck, "thirdparty-true");
            });
        });

        describe("No Redirection", function () {
            describe("Email Password Recipe", function () {
                before(async function () {
                    await createCoreApp();
                    page = await browser.newPage();

                    // We need to set the localStorage value before the page loads to ensure ST initialises with the correct value
                    await page.evaluateOnNewDocument(() => {
                        localStorage.setItem("disableRedirectionAfterSuccessfulSignInUp", "true");
                        localStorage.removeItem("isNewUserCheck");
                    });

                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                });

                after(async function () {
                    await page?.close();
                });

                it("should not do any redirection after successful sign up", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await toggleSignInSignUp(page);
                    const urlBeforeSignUp = await page.url();
                    await defaultSignUp(page);
                    const urlAfterSignUp = await page.url();

                    const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                    assert.equal(newUserCheck, "emailpassword-true");
                    assert(urlAfterSignUp.startsWith(urlBeforeSignUp));
                });
            });

            describe("Passwordless recipe", function () {
                const exampleEmail = "test@example.com";

                before(async function () {
                    let _isPasswordlessSupported = await isPasswordlessSupported();
                    if (!_isPasswordlessSupported) {
                        this.skip();
                    }

                    await createCoreApp({
                        coreConfig: {
                            passwordless_code_lifetime: 4000,
                            passwordless_max_code_input_attempts: 3,
                        },
                        passwordlessFlowType: "USER_INPUT_CODE",
                        passwordlessContactMethod: "EMAIL",
                    });

                    page = await browser.newPage();
                    // We need to set the localStorage value before the page loads to ensure ST initialises with the correct value
                    await page.evaluateOnNewDocument(() => {
                        localStorage.setItem("disableRedirectionAfterSuccessfulSignInUp", "true");
                        localStorage.removeItem("isNewUserCheck");
                    });
                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                    await Promise.all([
                        page.goto(
                            `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL`
                        ),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                });

                after(async function () {
                    await page?.close();
                });

                it("should not do any redirection after successful sign up", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await setInputValues(page, [{ name: "email", value: exampleEmail }]);
                    await submitForm(page);
                    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                    const urlBeforeSignUp = await page.url();

                    const loginAttemptInfo = JSON.parse(
                        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                    );
                    const device = await getPasswordlessDevice(loginAttemptInfo);
                    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                    await submitForm(page);
                    // wait until network idle to ensure that the page has not been redirected
                    await page.waitForNetworkIdle();

                    const urlAfterSignUp = await page.url();
                    const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                    assert.equal(newUserCheck, "passwordless-true");
                    assert.equal(urlBeforeSignUp, urlAfterSignUp);
                });
            });

            describe("ThirdPartyPasswordless recipe: Magic Link", function () {
                const exampleEmail = "test@example.com";

                before(async function () {
                    let _isThirdPartyPasswordlessSupported = await isThirdPartyPasswordlessSupported();
                    if (!_isThirdPartyPasswordlessSupported) {
                        this.skip();
                    }

                    await createCoreApp({
                        coreConfig: {
                            passwordless_code_lifetime: 4000,
                            passwordless_max_code_input_attempts: 3,
                        },
                        passwordlessFlowType: "MAGIC_LINK",
                        passwordlessContactMethod: "EMAIL",
                    });

                    page = await browser.newPage();
                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                    // We need to set the localStorage value before the page loads to ensure ST initialises with the correct value
                    await page.evaluateOnNewDocument(() => {
                        localStorage.setItem("disableRedirectionAfterSuccessfulSignInUp", "true");
                        localStorage.removeItem("isNewUserCheck");
                    });

                    await Promise.all([
                        page.goto(
                            `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL`
                        ),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                });

                after(async function () {
                    await page?.close();
                });

                it("should not do any redirection after successful sign up", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await setInputValues(page, [{ name: "email", value: exampleEmail }]);
                    await submitForm(page);
                    await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                    const loginAttemptInfo = JSON.parse(
                        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                    );
                    const device = await getPasswordlessDevice(loginAttemptInfo);

                    const magicLink = device.codes[0].urlWithLinkCode;

                    await page.goto(magicLink);
                    await page.waitForNetworkIdle();

                    const urlAfterSignUp = await page.url();
                    const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                    assert.equal(newUserCheck, "passwordless-true");
                    assert.equal(magicLink, urlAfterSignUp);
                });
            });

            describe("ThirdParty Recipe", function () {
                before(async function () {
                    await createCoreApp();

                    page = await browser.newPage();
                    // We need to set the localStorage value before the page loads to ensure ST initialises with the correct value
                    await page.evaluateOnNewDocument(() => {
                        localStorage.setItem("disableRedirectionAfterSuccessfulSignInUp", "true");
                        localStorage.removeItem("isNewUserCheck");
                    });

                    await clearBrowserCookiesWithoutAffectingConsole(page, []);
                });

                after(async function () {
                    await page?.close();
                });

                it("should not do any redirection after successful sign up", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await assertProviders(page);
                    await clickOnProviderButton(page, "Mock Provider");

                    await Promise.all([
                        loginWithMockProvider(page),
                        page.waitForResponse(
                            (response) => response.url() === SIGN_IN_UP_API && response.status() === 200
                        ),
                    ]);

                    const urlAfterSignUp = await page.url();
                    const newUserCheck = await page.evaluate(() => localStorage.getItem("isNewUserCheck"));
                    assert.equal(newUserCheck, "thirdparty-true");
                    assert(urlAfterSignUp.includes("/auth/callback/mock-provider"));
                });
            });
        });
    });
});
