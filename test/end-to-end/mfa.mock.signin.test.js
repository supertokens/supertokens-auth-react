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
    getLogoutButton,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    waitForSTElement,
    screenshotOnFailure,
    backendBeforeEach,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
    getFactorChooserOptions,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { CREATE_CODE_API, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL } from "../constants";
import { getTestPhoneNumber } from "../exampleTestHelpers";

/*
 * Tests.
 */
describe.skip("SuperTokens SignIn w/ MFA", function () {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function () {
        await backendBeforeEach();

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
        await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));
    });

    it("sign in with email-otp (auto-setup)", async function () {
        const email = await getTestEmail();

        await setMFAInfo({
            requirements: ["otp-email"],
        });

        await tryEmailPasswordSignUp(page, email);

        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

        const loginAttemptInfo = JSON.parse(
            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
        );
        const device = await getPasswordlessDevice(loginAttemptInfo);
        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
        await submitForm(page);

        await waitForDashboard(page);
    });

    describe("sign in + setup + sign in with chooser flow", () => {
        it("set up otp-phone and sign-in", async function () {
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
            });

            await tryEmailPasswordSignUp(page, email);

            await completeOTP(page);

            await waitForDashboard(page);
            await setupOTP(page, "PHONE", phoneNumber);

            await logout(page);
            await tryEmailPasswordSignIn(page, email);
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);
            await waitForDashboard(page);
        });

        it("set up otp-email and sign-in", async function () {
            await setMFAInfo({
                requirements: [],
            });
            const email = await getTestEmail();
            const phoneNumber = getTestPhoneNumber();

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitForDashboard(page);
            await setupOTP(page, "EMAIL", email);

            await logout(page);

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email"] }],
            });

            await tryPasswordlessSignInUp(page, phoneNumber);

            await waitFor(500);
            await completeOTP(page);
            await waitForDashboard(page);
        });

        it("set up totp and sign-in", async function () {
            await setMFAInfo({
                requirements: [],
            });
            const email = await getTestEmail();

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "totp"] }],
            });

            await tryEmailPasswordSignUp(page, email);
            await completeOTP(page);

            await waitForDashboard(page);

            const totp = await setupTOTP(page);

            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            await chooseFactor(page, "totp");
            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });
    });

    describe("chooser screen", () => {
        let email, phoneNumber;
        let totp;
        before(async () => {
            page = await browser.newPage();
            ({ email, phoneNumber, totp } = await setupUserWithAllFactors(page));
            await page.close();
        });

        it("should redirect to the factor screen during sign in if only one factor is available (limited by FE recipe inits)", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("enableAllRecipes", "false");
                window.localStorage.setItem("clientRecipeListForDynamicLogin", JSON.stringify(["emailpassword"]));
            });

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],
                hasTOTP: true,
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });

        it("should redirect to the factor screen during sign in if only one factor is available (limited by isAlreadySetup/isAllowedToSetup)", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("enableAllRecipes", "false");
                window.localStorage.setItem("clientRecipeListForDynamicLogin", JSON.stringify(["emailpassword"]));
            });

            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone", "totp"] }],
                hasTOTP: true,
                isAlreadySetup: ["totp"],
                isAllowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });
        it("should redirect to the factor screen during sign in if only one factor is available (limited by next array)", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["totp"] }],
                hasTOTP: true,
            });

            await tryEmailPasswordSignIn(page, email);

            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });

        it("should show all factors the user can complete or set up in the next array", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["totp", "otp-email"] }],
                hasTOTP: true,
            });

            await tryEmailPasswordSignIn(page, email);

            const options = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(options), new Set(["otp-email", "totp"]));
        });

        it("should show all factors the user can complete or set up if the next array is empty", async () => {
            await setMFAInfo({
                requirements: [],
                hasTOTP: false,
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page);

            const optionsBefore2FA = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(optionsBefore2FA), new Set(["otp-phone", "otp-email"]));

            await chooseFactor(page, "otp-phone");
            await completeOTP(page);
            await goToFactorChooser(page);

            const optionsAfter2FA = await getFactorChooserOptions(page);
            assert.deepStrictEqual(new Set(optionsAfter2FA), new Set(["otp-phone", "otp-email", "totp"]));
        });

        it("should show access denied if there are no available options during sign in", async () => {
            await setMFAInfo({
                requirements: ["otp-phone"],
                isAlreadySetup: ["otp-email"],
                isAllowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForAccessDenied(page);
        });

        it("should show access denied if there are no available options after sign in", async () => {
            await setMFAInfo({
                requirements: [],
                isAlreadySetup: [],
                isAllowedToSetup: [],
            });

            await tryEmailPasswordSignIn(page, email);
            await goToFactorChooser(page, false);

            await waitForAccessDenied(page);
        });

        it("should show throw if the only next option is an unknown factor id", async () => {
            await setMFAInfo({
                requirements: ["unknown"],
            });

            await expectErrorThrown(page, () => tryEmailPasswordSignIn(page, email));
        });

        it("should show a back link only if visited after sign in", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
                hasTOTP: false,
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForSTElement(page, "[data-supertokens~=factorChooserList]");

            await waitForSTElement(page, "[data-supertokens~=backButton]", true);
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);

            await goToFactorChooser(page);

            await waitForSTElement(page, "[data-supertokens~=backButton]");
        });

        it("should show a logout link", async () => {
            await setMFAInfo({
                requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
                hasTOTP: false,
            });

            await tryEmailPasswordSignIn(page, email);
            await waitForSTElement(page, "[data-supertokens~=factorChooserList]");

            await waitForSTElement(page, "[data-supertokens~=secondaryLinkWithLeftArrow]");
            await chooseFactor(page, "otp-phone");
            await completeOTP(page);

            await goToFactorChooser(page);

            await waitForSTElement(page, "[data-supertokens~=secondaryLinkWithLeftArrow]");
        });
    });
    ``;

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

                it("should show access denied if the app navigates to the setup page but the user it is not allowed to set up the factor", async () => {
                    await setMFAInfo({
                        requirements: [],
                        isAlreadySetup: [factorId],
                        isAllowedToSetup: [],
                        resp: {
                            email,
                            phoneNumber,
                        },
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await waitForAccessDenied(page);
                });

                it("should show access denied if setup is not allowed but the factor is not set up", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        isAlreadySetup: [],
                        isAllowedToSetup: [],
                    });

                    await tryEmailPasswordSignIn(page, email);

                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);
                    await waitForAccessDenied(page);
                });

                it("should handle createCode failures gracefully", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        isAlreadySetup: [factorId],
                        isAllowedToSetup: [],
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

                it("should enable you to change the contact info during setup", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        isAlreadySetup: [],
                        isAllowedToSetup: [factorId],
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
                        "[data-supertokens~=pwlessMFAOTPFooter] [data-supertokens~=secondaryText]:nth-child(1)"
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
                        isAlreadySetup: [factorId],
                        isAllowedToSetup: [],
                        resp: {
                            email,
                            phoneNumber,
                        },
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
                        isAlreadySetup: [],
                        isAllowedToSetup: [factorId],
                        resp: {
                            email,
                            phoneNumber,
                        },
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
                it("should show a link redirecting to the chooser screen if other options are available during sign in - setup", async () => {
                    await setMFAInfo({
                        requirements: [{ oneOf: [factorId, "totp"] }],
                        isAlreadySetup: ["totp"],
                        isAllowedToSetup: [factorId],
                        resp: {
                            email,
                            phoneNumber,
                        },
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await chooseFactor(page, factorId);

                    const chooseAnotherFactor = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwlessMFAFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );

                    await chooseAnotherFactor.click();
                    await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
                });
                it("should show a link redirecting to the chooser screen if other options are available during sign in - verification", async () => {
                    await setMFAInfo({
                        requirements: [{ oneOf: [factorId, "totp"] }],
                        isAlreadySetup: [factorId, "totp"],
                        isAllowedToSetup: [],
                        resp: {
                            email,
                            phoneNumber,
                        },
                    });

                    await tryEmailPasswordSignIn(page, email);
                    await chooseFactor(page, factorId);

                    const chooseAnotherFactor = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwlessMFAOTPFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await chooseAnotherFactor.click();
                    await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
                });

                it("should show a logout link - setup", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        isAlreadySetup: [],
                        isAllowedToSetup: [factorId],
                        resp: {
                            email,
                            phoneNumber,
                        },
                    });

                    await tryEmailPasswordSignIn(page, email);

                    const logoutButton = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwlessMFAFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                    await waitForSTElement(page, "[data-supertokens~=input][name=email]");
                    assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);
                });

                it("should show a logout link - verification", async () => {
                    await setMFAInfo({
                        requirements: [factorId],
                        isAlreadySetup: [factorId],
                        isAllowedToSetup: [],
                        resp: {
                            email,
                            phoneNumber,
                        },
                    });

                    await tryEmailPasswordSignIn(page, email);

                    const logoutButton = await waitForSTElement(
                        page,
                        "[data-supertokens~=pwlessMFAOTPFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                    );
                    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                    await waitForSTElement(page, "[data-supertokens~=input][name=email]");
                    assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);
                });
            }
        });

        describe("totp", () => {
            const factorId = "totp";

            let email, phoneNumber;
            before(async () => {
                await setMFAInfo({
                    isAllowedToSetup: ["totp"],
                });
                page = await browser.newPage();

                email = await getTestEmail(factorId);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

                await page.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
                await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

                await tryEmailPasswordSignUp(page, email);
                await setupTOTP(page);
                await waitForDashboard(page);

                await page.close();
            });

            it("should show access denied if the app navigates to the setup page but the user it is not allowed to set up the factor", async () => {
                await setMFAInfo({
                    requirements: [],
                    isAlreadySetup: [factorId],
                    isAllowedToSetup: [],
                    resp: {
                        email,
                        phoneNumber,
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}?setup=true`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await waitForAccessDenied(page);
            });

            it("should show access denied if setup is not allowed but the factor is not set up", async () => {
                await setMFAInfo({
                    requirements: [factorId],
                    isAlreadySetup: [],
                    isAllowedToSetup: [],
                });

                await tryEmailPasswordSignIn(page, email);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/mfa/${factorId}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await waitForAccessDenied(page);
            });

            // TODO: re-enable this
            it.skip("should handle createDevice failures gracefully", async () => {
                await setMFAInfo({
                    requirements: [factorId],
                    isAlreadySetup: [factorId],
                    isAllowedToSetup: [],
                });

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url() === CREATE_DEVICE_API && request.method() === "POST") {
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

            it("should show a link redirecting back if visited after sign in - setup", async () => {
                await setMFAInfo({
                    requirements: [],
                    isAlreadySetup: [factorId],
                    isAllowedToSetup: [],
                    resp: {
                        email,
                        phoneNumber,
                    },
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
                    isAlreadySetup: [],
                    isAllowedToSetup: [factorId],
                    resp: {
                        email,
                        phoneNumber,
                    },
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

            it("should show a link redirecting to the chooser screen if other options are available during sign in - setup", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: [factorId, "otp-email"] }],
                    isAlreadySetup: ["otp-email"],
                    isAllowedToSetup: [factorId],
                    resp: {
                        email,
                        phoneNumber,
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await chooseFactor(page, factorId);

                const chooseAnotherFactor = await waitForSTElement(
                    page,

                    "[data-supertokens~=totpMFASetupFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                );

                await chooseAnotherFactor.click();
                await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
            });

            it("should show a link redirecting to the chooser screen if other options are available during sign in - verification", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: [factorId, "otp-email"] }],
                    isAlreadySetup: [factorId, "otp-email"],
                    isAllowedToSetup: [],
                    resp: {
                        email,
                        phoneNumber,
                    },
                });

                await tryEmailPasswordSignIn(page, email);
                await chooseFactor(page, factorId);

                const chooseAnotherFactor = await waitForSTElement(
                    page,
                    "[data-supertokens~=totpMFAVerificationFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                );
                await chooseAnotherFactor.click();
                await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
            });

            it("should show a logout link - setup", async () => {
                await setMFAInfo({
                    requirements: [factorId],
                    isAlreadySetup: [],
                    isAllowedToSetup: [factorId],
                    resp: {
                        email,
                        phoneNumber,
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                const logoutButton = await waitForSTElement(
                    page,

                    "[data-supertokens~=totpMFASetupFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                );
                await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await waitForSTElement(page, "[data-supertokens~=input][name=email]");
                assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);
            });

            it("should show a logout link - verify", async () => {
                await setMFAInfo({
                    requirements: [factorId],
                    isAlreadySetup: [factorId],
                    isAllowedToSetup: [],
                    resp: {
                        email,
                        phoneNumber,
                    },
                });

                await tryEmailPasswordSignIn(page, email);

                const logoutButton = await waitForSTElement(
                    page,

                    "[data-supertokens~=totpMFAVerificationFooter] [data-supertokens~=secondaryText]:nth-child(1)"
                );
                await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await waitForSTElement(page, "[data-supertokens~=input][name=email]");
                assert.strictEqual(await page.url(), `${TEST_CLIENT_BASE_URL}/auth/`);
            });
        });
    });

    describe("default requirements", () => {
        let email, phoneNumber;
        before(async () => {
            await setMFAInfo({});
            page = await browser.newPage();

            email = await getTestEmail();
            phoneNumber = getTestPhoneNumber();

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            await tryEmailPasswordSignUp(page, email);
            await waitForDashboard(page);

            await page.close();
        });

        beforeEach(async () => {
            await setMFAInfo({});
        });

        it("should not require any factors after sign up", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);
        });

        it("should not allow you to set up a secondary factor before completing 2FA", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            await goToFactorChooser(page);

            const list = await getFactorChooserOptions(page);

            assert.deepStrictEqual(list, ["otp-email"]);
        });

        it("should not allow you to set up all other factors after completing 2FA", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            // TODO: validate
            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);

            await goToFactorChooser(page);

            const list = await getFactorChooserOptions(page);

            assert.deepStrictEqual(new Set(list), new Set(["otp-email", "otp-phone", "totp"]));
        });

        it("should require 2fa to sign in after setting up another factor", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);

            const totp = await setupTOTP(page);
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            const list = await getFactorChooserOptions(page);
            // TODO: validate this, maybe it should only be totp?
            assert.deepStrictEqual(new Set(list), new Set(["otp-email", "totp"]));
            await chooseFactor(page, "totp");
            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });
        it("should not require any factors after sign up", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);
        });

        it("should not allow you to set up a secondary factor before completing 2FA", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            await goToFactorChooser(page);

            const list = await getFactorChooserOptions(page);

            assert.deepStrictEqual(list, ["otp-email"]);
        });

        it("should not allow you to set up all other factors after completing 2FA", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            // TODO: validate
            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);

            await goToFactorChooser(page);

            const list = await getFactorChooserOptions(page);

            assert.deepStrictEqual(new Set(list), new Set(["otp-email", "otp-phone", "totp"]));
        });

        it("should require 2fa to sign in after setting up another factor", async () => {
            await tryEmailPasswordSignIn(page, email);

            await waitForDashboard(page);

            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);

            const totp = await setupTOTP(page);
            await logout(page);

            await tryEmailPasswordSignIn(page, email);
            const list = await getFactorChooserOptions(page);
            // TODO: validate this, maybe it should only be totp?
            assert.deepStrictEqual(new Set(list), new Set(["otp-email", "totp"]));
            await chooseFactor(page, "totp");
            await completeTOTP(page, totp);
            await waitForDashboard(page);
        });
    });

    describe("requirement handling", () => {
        let email, phoneNumber;
        let totp;
        before(async () => {
            await setMFAInfo({});
            page = await browser.newPage();

            email = await getTestEmail();
            phoneNumber = getTestPhoneNumber();

            await setMFAInfo({});
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await page.evaluate(() => window.localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await page.evaluate(() => window.localStorage.removeItem("clientRecipeListForDynamicLogin"));
            await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

            await tryEmailPasswordSignUp(page, email);
            await waitForDashboard(page);
            await goToFactorChooser(page);
            await chooseFactor(page, "otp-email");
            await completeOTP(page);
            await setupOTP(page, "PHONE", phoneNumber);
            totp = await setupTOTP(page);

            await page.close();
        });

        describe("multistep requirement list", () => {
            it("multistep requirements should happen in order (allOf -> oneOf)", async () => {
                await setMFAInfo({
                    requirements: [{ allOf: ["otp-phone", "totp"] }, { oneOf: ["otp-email"] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);
                await completeTOTP(page, totp);
                await completeOTP(page);
                await waitForDashboard(page);
            });

            it("multistep requirements should happen in order (oneOf -> allOf)", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: ["otp-phone", "totp"] }, { allOf: ["totp", "otp-email"] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);
                const factors2 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors2), new Set(["otp-email", "totp"]));
                await chooseFactor(page, "totp");
                await completeTOTP(page, totp);
                await completeOTP(page);
                await waitForDashboard(page);
            });
            it("string requirements strictly set the order of the factor screens", async () => {
                await setMFAInfo({
                    requirements: ["otp-phone", "totp", "otp-email"],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                await completeOTP(page, "PHONE");
                await completeTOTP(page, totp);
                await completeOTP(page, "EMAIL");
                await waitForDashboard(page);
            });
        });

        describe("allOf", () => {
            it("should pass if all requirements are complete", async () => {
                await setMFAInfo({
                    requirements: [{ allOf: ["otp-phone", "totp", "otp-email"] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp", "otp-email"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);

                const factors2 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors2), new Set(["totp", "otp-email"]));
                await chooseFactor(page, "otp-email");
                await completeOTP(page);

                await completeTOTP(page, totp);
                await waitForDashboard(page);
            });
            it("should pass if the array is empty", async () => {
                await setMFAInfo({
                    requirements: [{ allOf: [] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });
        describe("oneOf", () => {
            it("should pass if one of the requirements are complete", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: ["otp-phone", "totp", "otp-email"] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                const factors1 = await getFactorChooserOptions(page);
                assert.deepStrictEqual(new Set(factors1), new Set(["otp-phone", "totp", "otp-email"]));
                await chooseFactor(page, "otp-phone");
                await completeOTP(page);

                await waitForDashboard(page);
            });
            it("should pass if the array is empty", async () => {
                await setMFAInfo({
                    requirements: [{ oneOf: [] }],
                    hasTOTP: true,
                });

                await tryEmailPasswordSignIn(page, email);
                await waitForDashboard(page);
            });
        });
    });
});

async function setupUserWithAllFactors(page) {
    // TODO: it'd be cleaner if this part was not done through the app
    const email = await getTestEmail();
    const phoneNumber = getTestPhoneNumber();
    await clearBrowserCookiesWithoutAffectingConsole(page, []);
    await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));

    await setMFAInfo({
        requirements: [{ oneOf: ["otp-email", "otp-phone"] }],
    });

    await tryEmailPasswordSignUp(page, email);

    await completeOTP(page);

    await waitForDashboard(page);
    await setupOTP(page, "PHONE", phoneNumber);

    await waitForDashboard(page);
    const totp = await setupTOTP(page);
    return { email, phoneNumber, totp };
}

async function setMFAInfo(mfaInfo) {
    let resp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/setMockMFAInfo`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify(mfaInfo),
    });
    assert.strictEqual(resp.status, 200);
}

async function completeOTP(page, contactMethod) {
    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );
    if (contactMethod) {
        assert.strictEqual(loginAttemptInfo.contactMethod, contactMethod);
    }
    const device = await getPasswordlessDevice(loginAttemptInfo);
    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
    await submitForm(page);
}

async function logout(page) {
    await waitForDashboard(page);
    const logoutButton = await getLogoutButton(page);
    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await waitForSTElement(page);
}

async function waitForDashboard(page) {
    await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
}

async function waitForAccessDenied(page) {
    const error = await waitForSTElement(page, "[data-supertokens~=accessDeniedError]");
    return error.evaluate((e) => e.textContent);
}

async function setupOTP(page, contactMethod, phoneNumber) {
    await goToFactorChooser(page);
    await chooseFactor(page, contactMethod === "PHONE" ? "otp-phone" : "otp-email");

    await setInputValues(page, [
        { name: contactMethod === "PHONE" ? "phoneNumber_text" : "email", value: phoneNumber },
    ]);
    await submitForm(page);

    await completeOTP(page);
}

async function setupTOTP(page) {
    await goToFactorChooser(page);
    await chooseFactor(page, "totp");
    const showSecret = await waitForSTElement(page, "[data-supertokens~=showTOTPSecretBtn]");
    await showSecret.click();

    const secretDiv = await waitForSTElement(page, "[data-supertokens~=totpSecret]");
    const secret = await secretDiv.evaluate((e) => e.textContent);

    const totp = secret.substring(secret.length - 4);

    await completeTOTP(page, totp);
    return totp;
}

async function completeTOTP(page, totp) {
    await setInputValues(page, [{ name: "totp", value: totp }]);
    await submitForm(page);
}

async function tryEmailPasswordSignUp(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
        { name: "name", value: "asdf" },
        { name: "age", value: "20" },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}

async function tryEmailPasswordSignIn(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=emailpassword`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}

async function tryPasswordlessSignInUp(page, contactInfo) {
    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=passwordless`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await setInputValues(page, [{ name: "emailOrPhone", value: contactInfo }]);
    await submitForm(page);

    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );
    const device = await getPasswordlessDevice(loginAttemptInfo);
    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}

async function tryThirdPartySignInUp(page, email, isVerified = true, userId = email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/?rid=thirdparty`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await assertProviders(page);

    await clickOnProviderButton(page, "Mock Provider");
    const url = new URL(page.url());
    assert.strictEqual(url.pathname, `/mockProvider/auth`);
    assert.ok(url.searchParams.get("state"));

    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${encodeURIComponent(
                email
            )}&userId=${encodeURIComponent(userId)}&isVerified=${isVerified}&state=${url.searchParams.get("state")}`
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await new Promise((res) => setTimeout(res, 1000));
}

async function expectErrorThrown(page, cb) {
    let onErrorBoundaryHit;
    let hitErrorBoundary = new Promise((res) => {
        onErrorBoundaryHit = res;
    });
    page.on("console", (ev) => {
        // console.log(ev.text());
        if (ev.text() === "ST_THROWN_ERROR") {
            onErrorBoundaryHit(true);
        }
    });
    await Promise.all([hitErrorBoundary, cb()]);
    assert(hitErrorBoundary);
}
async function goToFactorChooser(page, waitForList = true) {
    const ele = await page.waitForSelector(".goToFactorChooser");
    await waitFor(100);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), ele.click()]);
    if (waitForList) {
        await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
    }
}

async function chooseFactor(page, id) {
    const ele = await waitForSTElement(page, `[data-supertokens~=factorChooserOption][data-supertokens~=${id}]`);
    await waitFor(100);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), ele.click()]);
    await waitForSTElement(page);
}