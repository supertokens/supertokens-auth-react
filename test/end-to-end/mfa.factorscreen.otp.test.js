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

import assert from "assert";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    setInputValues,
    submitForm,
    waitForSTElement,
    screenshotOnFailure,
    backendBeforeEach,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
    getFactorChooserOptions,
    getGeneralError,
    isMFASupported,
    setAccountLinkingConfig,
    waitForUrl,
    setupBrowser,
} from "../helpers";
import fetch from "isomorphic-fetch";
import {
    CONSUME_CODE_API,
    CREATE_CODE_API,
    CREATE_TOTP_DEVICE_API,
    MFA_INFO_API,
    SOMETHING_WENT_WRONG_ERROR,
} from "../constants";

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import { getTestPhoneNumber } from "../exampleTestHelpers";
import {
    setMFAInfo,
    tryEmailPasswordSignUp,
    waitForDashboard,
    completeOTP,
    setupOTP,
    logout,
    tryEmailPasswordSignIn,
    chooseFactor,
    tryPasswordlessSignInUp,
    setupTOTP,
    completeTOTP,
    setupUserWithAllFactors,
    goToFactorChooser,
    waitForAccessDenied,
    waitForLoadingScreen,
    waitForBlockedScreen,
} from "./mfa.helpers";

/*
 * Tests.
 */
describe("SuperTokens SignIn w/ MFA", function () {
    let browser;
    let page;
    let consoleLogs = [];
    let skipped = false;

    before(async function () {
        if (!(await isMFASupported())) {
            skipped = true;
            this.skip();
            return;
        }
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        await setAccountLinkingConfig(true, true, false);
        browser = await setupBrowser();
    });

    after(async function () {
        if (skipped) {
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

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        if (page) {
            await page.close();
        }
    });

    beforeEach(async function () {
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            // console.log(log);
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

        await page.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
        await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
        await page.evaluate(() => window.localStorage.removeItem("mode"));
        await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));
    });

    describe("factor screens", () => {
        describe("otp", () => {
            describe("otp-phone", () => {
                getOTPTests("PHONE", "otp-phone");
            });

            describe("otp-email", () => {
                getOTPTests("EMAIL", "otp-email");
            });

            function getOTPTests(contactMethod, factorId) {
                let email, phoneNumber;
                before(async () => {
                    await setMFAInfo({});
                    page = await browser.newPage();

                    email = await getTestEmail(factorId);
                    phoneNumber = getTestPhoneNumber();

                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

                    await page.evaluate(() =>
                        window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo")
                    );
                    await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
                    await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

                    await tryEmailPasswordSignUp(page, email);
                    await waitForDashboard(page);

                    await page.close();
                });

                it("should respect redirectToPath", async () => {
                    await setMFAInfo({
                        requirements: [],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await Promise.all([
                        page.goto(
                            `${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true&redirectToPath=%2Fredirect-here`
                        ),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [
                        {
                            name: contactMethod === "PHONE" ? "phoneNumber_text" : "email",
                            value: contactMethod === "PHONE" ? phoneNumber : email,
                        },
                    ]);
                    await submitForm(page);
                    await completeOTP(page, contactMethod);

                    await page.waitForNavigation({ waitUntil: "networkidle0" });

                    await waitForUrl(page, "/redirect-here");
                });

                it("should show general error if the app navigates to the setup page but the user is not allowed to set up the factor", async () => {
                    await setMFAInfo({
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    const otherEmail = await getTestEmail(1);
                    const otherPhone = await getTestPhoneNumber(1);
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [
                        {
                            name: contactMethod === "PHONE" ? "phoneNumber_text" : "email",
                            value: contactMethod === "PHONE" ? otherPhone : otherEmail,
                        },
                    ]);
                    await submitForm(page);
                    const err = await getGeneralError(page);
                    assert.strictEqual(err, SOMETHING_WENT_WRONG_ERROR);
                });

                it("should show loading screen", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await new Promise((res) => setTimeout(res, 1500));

                    await page.setRequestInterception(true);
                    const requestHandler = (request) => {
                        if (request.url() === MFA_INFO_API && request.method() === "PUT") {
                            setTimeout(() => request.continue(), 1500);
                        } else {
                            return request.continue();
                        }
                    };
                    page.on("request", requestHandler);
                    try {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                            waitForLoadingScreen(page),
                        ]);
                        await waitForSTElement(
                            page,
                            "[data-supertokens~=pwless-mfa][data-supertokens~=footerLinkGroupVert]"
                        );
                    } finally {
                        page.off("request", requestHandler);
                        await page.setRequestInterception(false);
                    }
                });

                it("should handle MFA info API failures gracefully", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await new Promise((res) => setTimeout(res, 1500));

                    await page.setRequestInterception(true);
                    const requestHandler = (request) => {
                        if (request.url() === MFA_INFO_API && request.method() === "PUT") {
                            return request.respond({
                                status: 400,
                                headers: {
                                    "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                    "access-control-allow-credentials": "true",
                                },
                                body: JSON.stringify({
                                    status: "BAD_INPUT",
                                }),
                            });
                        }

                        return request.continue();
                    };
                    page.on("request", requestHandler);
                    try {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                            waitForAccessDenied(page),
                        ]);
                    } finally {
                        page.off("request", requestHandler);
                        await page.setRequestInterception(false);
                    }
                });

                it("should handle createCode failures gracefully", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    });

                    await page.setRequestInterception(true);
                    const requestHandler = (request) => {
                        if (request.url() === CREATE_CODE_API && request.method() === "POST") {
                            return request.respond({
                                status: 400,
                                headers: {
                                    "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                    "access-control-allow-credentials": "true",
                                },
                                body: JSON.stringify({
                                    status: "BAD_INPUT",
                                }),
                            });
                        }

                        return request.continue();
                    };
                    page.on("request", requestHandler);
                    try {
                        await tryEmailPasswordSignIn(page, email);
                        await waitForAccessDenied(page);
                    } finally {
                        page.off("request", requestHandler);
                        await page.setRequestInterception(false);
                    }
                });

                it("should handle consumeCode restart flow error", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [factorId],
                        allowedToSetup: [factorId],
                    });

                    await page.setRequestInterception(true);
                    const requestHandler = (request) => {
                        if (request.url() === CONSUME_CODE_API && request.method() === "POST") {
                            return request.respond({
                                status: 200,
                                headers: {
                                    "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                    "access-control-allow-credentials": "true",
                                },
                                body: JSON.stringify({
                                    status: "RESTART_FLOW_ERROR",
                                }),
                            });
                        }

                        return request.continue();
                    };
                    page.on("request", requestHandler);
                    try {
                        await tryEmailPasswordSignIn(page, email);

                        await completeOTP(page);

                        await waitForAccessDenied(page);
                    } finally {
                        page.off("request", requestHandler);
                        await page.setRequestInterception(false);
                    }
                });

                it("should handle consumeCode restart flow error when setting up factor", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                        noContacts: true,
                    });

                    await page.setRequestInterception(true);
                    const requestHandler = (request) => {
                        if (request.url() === CONSUME_CODE_API && request.method() === "POST") {
                            return request.respond({
                                status: 200,
                                headers: {
                                    "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                    "access-control-allow-credentials": "true",
                                },
                                body: JSON.stringify({
                                    status: "RESTART_FLOW_ERROR",
                                }),
                            });
                        }

                        return request.continue();
                    };
                    page.on("request", requestHandler);
                    try {
                        await tryEmailPasswordSignIn(page, email);

                        await setInputValues(page, [
                            contactMethod === "PHONE"
                                ? { name: "phoneNumber_text", value: getTestPhoneNumber() }
                                : { name: "email", value: await getTestEmail() },
                        ]);
                        await submitForm(page);

                        await completeOTP(page);

                        const error = await getGeneralError(page);
                        assert.strictEqual("Login unsuccessful. Please try again.", error);
                    } finally {
                        page.off("request", requestHandler);
                        await page.setRequestInterception(false);
                    }
                });

                it("should enable you to change the contact info during setup (w/ contact form)", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                        noContacts: true,
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await setInputValues(page, [
                        contactMethod === "PHONE"
                            ? { name: "phoneNumber_text", value: getTestPhoneNumber() }
                            : { name: "email", value: await getTestEmail() },
                    ]);
                    await submitForm(page);
                    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
                    const changeContact = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwless-mfa][data-supertokens~=otpFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await changeContact.click();

                    await setInputValues(page, [
                        contactMethod === "PHONE"
                            ? { name: "phoneNumber_text", value: phoneNumber }
                            : { name: "email", value: email },
                    ]);
                    await submitForm(page);
                    await completeOTP(page);
                });

                it("should show a link redirecting back if visited after sign in - setup", async () => {
                    await setMFAInfo({
                        requirements: [],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    const backBtn = await waitForSTElement(page, "[data-supertokens~=backButton]");
                    await backBtn.click();
                    await waitForDashboard(page);
                });
                it("should show a link redirecting back if visited after sign in - verification", async () => {
                    await setMFAInfo({
                        requirements: [],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    const backBtn = await waitForSTElement(page, "[data-supertokens~=backButton]");
                    await backBtn.click();
                    await waitForDashboard(page);
                });

                it("should show a back button redirecting to the chooser screen if other options are available during sign in - setup", async () => {
                    await setMFAInfo({
                        requirements: [{ oneOf: [factorId, "totp"] }],
                        alreadySetup: ["totp"],
                        allowedToSetup: [factorId],
                        noContacts: true,
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await chooseFactor(page, factorId);

                    const backButton = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwless-mfa] [data-supertokens~=backButton]"
                    );

                    await backButton.click();
                    await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
                });

                it("should show a back button redirecting to the chooser screen if other options are available during sign in - verification", async () => {
                    await setMFAInfo({
                        requirements: [{ oneOf: [factorId, "totp"] }],
                        alreadySetup: [factorId, "totp"],
                        allowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await chooseFactor(page, factorId);

                    const chooseAnotherFactor = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwless-mfa] [data-supertokens~=backButton]"
                    );
                    await chooseAnotherFactor.click();
                    await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
                });

                it("should show a logout link - setup", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [],
                        allowedToSetup: [factorId],
                        noContacts: true,
                    });

                    await tryEmailPasswordSignIn(page, email);

                    const logoutButton = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwless-mfa][data-supertokens~=footer] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                    await waitForSTElement(page, "[data-supertokens~=authPage]");
                    assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);
                });

                it("should show a logout link - verification", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        alreadySetup: [factorId],
                        allowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    const logoutButton = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwless-mfa][data-supertokens~=otpFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                    await waitForSTElement(page, "[data-supertokens~=authPage]");
                    assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);

                    // This part checks that the login attempt info has been cleared
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=passwordless`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await waitForSTElement(page, "[data-supertokens~=input][name=email]");
                });
            }
        });
    });
});
