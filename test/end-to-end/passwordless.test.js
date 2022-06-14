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

/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import assert from "assert";
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getPasswordlessDevice,
    setInputValues,
    waitForSTElement,
    waitFor,
    getFeatureFlags,
    waitForText,
    screenshotOnFailure,
    setPasswordlessFlowType,
    isReact16,
    clickOnPasswordlessResendButton,
} from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Passwordless", function () {
    getPasswordlessTestCases({
        authRecipe: "passwordless",
        logId: "PASSWORDLESS",
    });
});

export function getPasswordlessTestCases({ authRecipe, logId }) {
    let browser;
    let page;
    let consoleLogs = [];
    const signInUpPageLoadLogs = isReact16()
        ? [`ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`]
        : [`ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`, `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`];

    const examplePhoneNumber = "+36701231212";
    const exampleEmail = "test@example.com";

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    describe("with EMAIL", () => {
        getTestCases("EMAIL", "email", exampleEmail);
    });

    describe("with PHONE", () => {
        getTestCases("PHONE", "phoneNumber_text", examplePhoneNumber);
    });

    describe("with PHONE_OR_EMAIL", () => {
        describe("using an email", () => {
            getTestCases("EMAIL_OR_PHONE", "emailOrPhone", exampleEmail);
        });
        describe("using a phone number", () => {
            getTestCases("EMAIL_OR_PHONE", "emailOrPhone", examplePhoneNumber);
        });

        describe("switching input type", () => {
            const inputName = "emailOrPhone";
            const contactMethod = "EMAIL_OR_PHONE";

            before(async function () {
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe));
                await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE");
            });

            after(async function () {
                await browser.close();
                await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                    method: "POST",
                }).catch(console.error);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                consoleLogs.length = 0;
            });

            it("Successful signin", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: exampleEmail }]);
                await submitForm(page);
                const changeButton = await waitForSTElement(page, "[data-supertokens~=secondaryLinkWithLeftArrow]");
                await changeButton.click();
                await setInputValues(page, [{ name: inputName, value: exampleEmail }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin when clicking on resend code", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: exampleEmail }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const ogLoginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const ogDevice = await getPasswordlessDevice(ogLoginAttemptInfo);
                assert.deepStrictEqual(ogDevice.codes.length, 1);

                // we wait for the resend button to show
                await new Promise((r) => setTimeout(r, 2500));
                await clickOnPasswordlessResendButton(page);

                // we wait for API to complete
                await new Promise((r) => setTimeout(r, 1000));
                const newLoginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const newDevice = await getPasswordlessDevice(newLoginAttemptInfo);
                assert.deepStrictEqual(newDevice.codes.length, 2);
                assert.notDeepEqual(newDevice.codes[0].userInputCode, newDevice.codes[1].userInputCode);

                await setInputValues(page, [{ name: "userInputCode", value: newDevice.codes[1].userInputCode }]);
                await submitForm(page);

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE RESEND_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_RESEND_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });
        });

        describe("guessing phone numbers", () => {
            describe("with default country defined", () => {
                const inputName = "emailOrPhone";
                const contactMethod = "EMAIL_OR_PHONE";

                before(async function () {
                    ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, {
                        defaultCountry: "HU",
                    }));
                    await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE");
                });

                after(async function () {
                    await browser.close();
                    await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                        method: "POST",
                    }).catch(console.error);

                    await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                        method: "POST",
                    }).catch(console.error);
                });

                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                    consoleLogs.length = 0;
                });

                it("should guess correctly for a local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "06701234324" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "+36701234324");
                });

                it("should guess correctly for a shorter local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "701234325" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "+36701234325");
                });

                it("should guess correctly for missed + sign", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "36701234326" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "+36701234326");
                });

                it("should not change for too long input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654654654654654654654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "654654654654654654654");
                });

                it("should prepend country code for too short input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "+36654");
                });
            });

            describe("without default country defined", () => {
                const inputName = "emailOrPhone";
                const contactMethod = "EMAIL_OR_PHONE";

                before(async function () {
                    ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe));
                    await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE");
                });

                after(async function () {
                    await browser.close();
                    await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                        method: "POST",
                    }).catch(console.error);

                    await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                        method: "POST",
                    }).catch(console.error);
                });

                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                    consoleLogs.length = 0;
                });

                it("should show phone UI for a local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "06701234324" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "06701234324");
                });

                it("should show phone UI for a shorter local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "701234325" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "701234325");
                });

                it("should show phone UI for missed + sign", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "36701234326" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "36701234326");
                });

                it("should show phone UI for too long input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654654654654654654654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "654654654654654654654");
                });

                it("should show phone UI for too short input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone_text]`);
                    await checkInputValue(page, input, "654");
                });
            });

            describe("with guessing disabled", () => {
                const inputName = "emailOrPhone";
                const contactMethod = "EMAIL_OR_PHONE";

                before(async function () {
                    ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, {
                        disablePhoneGuess: true,
                    }));
                    await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE");
                });

                after(async function () {
                    await browser.close();
                    await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                        method: "POST",
                    }).catch(console.error);

                    await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                        method: "POST",
                    }).catch(console.error);
                });

                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                    consoleLogs.length = 0;
                });

                it("should not change for a local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "06701234324" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "06701234324");
                });

                it("should not change for a shorter local number", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "701234325" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "701234325");
                });

                it("should not change for missed + sign", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "36701234326" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "36701234326");
                });

                it("should not change for too long input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654654654654654654654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "654654654654654654654");
                });

                it("should not change for too short input", async function () {
                    await Promise.all([
                        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                        page.waitForNavigation({ waitUntil: "networkidle0" }),
                    ]);

                    await setInputValues(page, [{ name: inputName, value: "654" }]);
                    await submitForm(page);
                    const input = await waitForSTElement(page, `[data-supertokens~=input][name=emailOrPhone]`);
                    await checkInputValue(page, input, "654");
                });
            });
        });
    });

    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("passwordless")) {
            this.skip();
        }
    });

    function getTestCases(contactMethod, inputName, contactInfo) {
        describe(`UserInputCode`, function () {
            before(async function () {
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe));
                await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE");
            });

            after(async function () {
                await browser.close();
                await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                    method: "POST",
                }).catch(console.error);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                consoleLogs.length = 0;
            });

            it("Successful signin", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin w/ redirectToPath", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                await page.waitForNavigation({ waitUntil: "networkidle0" });

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/redirect-here");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                ]);
            });

            it("Submitting empty id", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await submitForm(page);

                const error = await waitForSTElement(page, "[data-supertokens~=generalError]");
                assert.strictEqual(
                    await error.evaluate((e) => e.textContent),
                    `${
                        contactMethod === "EMAIL_OR_PHONE"
                            ? "Email or Phone number"
                            : contactMethod === "EMAIL"
                            ? "Email"
                            : "Phone number"
                    } is invalid`
                );
                await waitForSTElement(page, "[data-supertokens~=inputErrorMessage]", true);
            });

            it("Submitting invalid id", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: "email2example.com" }]);
                await submitForm(page);

                const error = await waitForSTElement(page, "[data-supertokens~=generalError]");

                assert.strictEqual(
                    await error.evaluate((e) => e.textContent),
                    `${
                        contactMethod === "EMAIL_OR_PHONE"
                            ? "Email or Phone number"
                            : contactMethod === "EMAIL"
                            ? "Email"
                            : "Phone number"
                    } is invalid`
                );
                await waitForSTElement(page, "[data-supertokens~=inputErrorMessage]", true);
            });

            it("Submitting incorrect codes", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "input[name=userInputCode]");
                for (let i = 3; i > 0; i--) {
                    await setInputValues(page, [{ name: "userInputCode", value: "000000" }]);
                    await submitForm(page);

                    if (i === 1) {
                        await waitForSTElement(page, `input[name=${inputName}]`);
                        const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                        assert.deepStrictEqual(
                            await error.evaluate((e) => e.textContent),
                            `Login unsuccessful. Please try again.`
                        );
                    } else {
                        const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                        assert.deepStrictEqual(await error.evaluate((e) => e.textContent), `Invalid OTP`);
                    }
                }

                assert.deepStrictEqual(
                    [
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        ...signInUpPageLoadLogs,
                        `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                        `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    ],
                    consoleLogs
                );

                // We check that the error is cleared if we are editing the contact info
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await waitForSTElement(page, "[data-supertokens~='generalError']", true);
                await submitForm(page);
                // The error shouldn't reappear in the user input code screen either
                await waitForSTElement(page, "input[name=userInputCode]");
                await waitForSTElement(page, "[data-supertokens~='generalError']", true);
            });

            it("Submitting expired codes", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "input[name=userInputCode]");
                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await waitFor(5500);
                for (let i = 3; i > 0; i--) {
                    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                    await submitForm(page);

                    if (i === 1) {
                        await waitForSTElement(page, `input[name=${inputName}]`);
                        const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                        assert.deepStrictEqual(
                            await error.evaluate((e) => e.textContent),
                            `Login unsuccessful. Please try again.`
                        );
                    } else {
                        const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                        assert.deepStrictEqual(await error.evaluate((e) => e.textContent), `Expired OTP.`);
                    }
                }

                assert.deepStrictEqual(
                    [
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        ...signInUpPageLoadLogs,
                        `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                        `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    ],
                    consoleLogs
                );

                // We check that the error is cleared if we are editing the contact info
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await waitForSTElement(page, "[data-supertokens~='generalError']", true);
                await submitForm(page);
                // The error shouldn't reappear in the user input code screen either
                await waitForSTElement(page, "input[name=userInputCode]");
                await waitForSTElement(page, "[data-supertokens~='generalError']", true);
            });

            it("create code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("resend code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/resend")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("consume code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/consume")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });
        });

        describe(`Link`, function () {
            before(async function () {
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe));
                await setPasswordlessFlowType(contactMethod, "MAGIC_LINK");
            });

            after(async function () {
                await browser.close();
                await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                    method: "POST",
                }).catch(console.error);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                consoleLogs.length = 0;
            });

            it("Successful signin", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await page.goto(device.codes[0].urlWithLinkCode);

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin on new device", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);

                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                await page.goto(device.codes[0].urlWithLinkCode);

                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin w/ stored redirectToPath", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await page.goto(device.codes[0].urlWithLinkCode);
                await page.waitForNavigation({ waitUntil: "networkidle0" });

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/redirect-here");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                ]);
            });

            it("create code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("resend code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/resend")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                // We also check that we remained on the link sent screen
                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("consume code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/consume")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await page.goto(device.codes[0].urlWithLinkCode);

                // We have been redirected to linkSent
                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("No linkCode", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Bad linkCode", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify?preAuthSessionId=asdf#asdfasfd`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='generalError']");
                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Bad preAuthSessionId good linkCode", async function () {
                const device = await setupDevice(page, inputName, contactInfo);
                consoleLogs.length = 0;

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode.replace(device.preAuthSessionId, "asdf")),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='generalError']");

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Bad linkCode right preAuthSessionId", async function () {
                const device = await setupDevice(page, inputName, contactInfo);
                consoleLogs.length = 0;

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode.replace(/#.*/, "#asdf")),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='generalError']");

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Missing preAuthSessionId", async function () {
                const device = await setupDevice(page, inputName, contactInfo);
                consoleLogs.length = 0;

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode.replace(/[?&]preAuthSessionId=[^&#]+/, "")),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Missing linkCode", async function () {
                const device = await setupDevice(page, inputName, contactInfo);
                consoleLogs.length = 0;

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode.replace(/#.*/, "")),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                ]);
            });
        });

        describe(`Link/Code`, function () {
            before(async function () {
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe));
                await setPasswordlessFlowType(contactMethod, "USER_INPUT_CODE_AND_MAGIC_LINK");
            });

            after(async function () {
                await browser.close();
                await fetch(`${TEST_SERVER_BASE_URL}/after`, {
                    method: "POST",
                }).catch(console.error);

                await fetch(`${TEST_SERVER_BASE_URL}/stop`, {
                    method: "POST",
                }).catch(console.error);
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));

                consoleLogs.length = 0;
            });

            it("Successful signin with link", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);

                await page.goto(device.codes[0].urlWithLinkCode);

                await page.waitForSelector(".sessionInfo-user-id");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin with link in another tab", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);

                const anotherTab = await browser.newPage();
                await anotherTab.goto(device.codes[0].urlWithLinkCode);
                await anotherTab.waitForSelector(".sessionInfo-user-id");

                await waitForText(page, "[data-supertokens~=headerTitle]", "Success!");

                await page.reload({ waitUntil: ["networkidle0"] });

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    ...(isReact16()
                        ? [
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                          ]
                        : [
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                          ]),
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
                await anotherTab.close();
            });

            it("Successful signin with user input code", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("Successful signin with user input code and redirectToPath", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                await page.waitForNavigation({ waitUntil: "networkidle0" });
                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/redirect-here");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                ]);
            });

            it("Successful signin with user input code in another tab", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);

                const anotherTab = await browser.newPage();
                await Promise.all([
                    anotherTab.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    anotherTab.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await waitForSTElement(anotherTab, "[data-supertokens~=input][name=userInputCode]");
                await setInputValues(anotherTab, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(anotherTab);

                await waitForText(page, "[data-supertokens~=headerTitle]", "Success!");

                await page.reload({ waitUntil: ["networkidle0"] });

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    ...(isReact16()
                        ? [
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                          ]
                        : [
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                              `ST_LOGS ${logId} ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                              `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                          ]),
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
                await anotherTab.close();
            });

            it("Clicking link of invalid device", async function () {
                const device = await setupDevice(page, inputName, contactInfo, false, false);

                for (let i = 3; i > 0; i--) {
                    await setInputValues(page, [{ name: "userInputCode", value: "22223" }]);
                    await submitForm(page);

                    if (i === 1) {
                        await waitForSTElement(page, `[data-supertokens~=input][name=${inputName}]`);
                    } else {
                        await waitForSTElement(page, "[data-supertokens~='generalError']");
                    }
                }

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='generalError']");

                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");

                assert.deepStrictEqual(
                    [
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        ...signInUpPageLoadLogs,
                        `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                        `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                        ...signInUpPageLoadLogs,
                    ],
                    consoleLogs
                );
            });

            it("Successful signin with userInputCode after wrong link", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);

                const anotherTab = await browser.newPage();

                anotherTab.on("console", (consoleObj) => {
                    const log = consoleObj.text();
                    if (log.startsWith("ST_LOGS")) {
                        consoleLogs.push(log);
                    }
                });
                await anotherTab.goto(device.codes[0].urlWithLinkCode + "''");
                await anotherTab.waitForNavigation({ waitUntil: "networkidle0" });

                const pathname = await anotherTab.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/auth");

                await waitForSTElement(anotherTab, "[data-supertokens~=input][name=userInputCode]");
                await waitForSTElement(anotherTab, "[data-supertokens~='generalError']");

                await setInputValues(anotherTab, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await waitForSTElement(anotherTab, "[data-supertokens~='generalError']", true);
                await submitForm(anotherTab);

                await anotherTab.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
                    `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SIGN_IN_AND_UP`,
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} GET_REDIRECTION_URL SUCCESS`,
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
                await anotherTab.close();
            });

            it("create code network error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url().endsWith("signinup/code")) {
                        request.abort();
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);
                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                await waitForSTElement(page, "[data-supertokens~='generalError']");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("create code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("consume code network error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url().endsWith("signinup/code/consume")) {
                        request.abort();
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);
                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);
                await waitForSTElement(page, "[data-supertokens~='generalError']");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("consume code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/consume")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const loginAttemptInfo = JSON.parse(
                    await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                );
                const device = await getPasswordlessDevice(loginAttemptInfo);
                await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                await submitForm(page);

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("resend code network error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url().endsWith("signinup/code/resend")) {
                        request.abort();
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);
                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();
                await waitForSTElement(page, "[data-supertokens~='generalError']");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("resend code general error", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.method() === "POST" && request.url().endsWith("signinup/code/resend")) {
                        request.respond({
                            status: 200,
                            contentType: "application/json",
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "GENERAL_ERROR",
                                message: "Test Message!!!",
                            }),
                        });
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "Test Message!!!");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });
        });
    }
}

async function checkInputValue(page, input, expected) {
    const actual = await page.evaluate((ele) => ele.value, input);
    assert.equal(actual.replace(/\s/g, ""), expected);
}

async function setupDevice(page, inputName, contactInfo, forLinkOnly = true, cleanLoginAttemptInfo = true) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await waitForSTElement(page, `[data-supertokens~=input][name=${inputName}]`);
    await setInputValues(page, [{ name: inputName, value: contactInfo }]);
    await submitForm(page);

    if (forLinkOnly) {
        await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
    } else {
        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
    }

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );
    if (cleanLoginAttemptInfo) {
        await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
    }

    return getPasswordlessDevice(loginAttemptInfo);
}

async function initBrowser(contactMethod, consoleLogs, authRecipe, { defaultCountry, disablePhoneGuess } = {}) {
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

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--remote-debugging-port=9222"],
        headless: true,
    });
    const page = await browser.newPage();
    page.on("console", (consoleObj) => {
        const log = consoleObj.text();
        if (log.startsWith("ST_LOGS")) {
            consoleLogs.push(log);
        }
    });

    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth?authRecipe=${authRecipe}&passwordlessContactMethodType=${contactMethod}` +
                (defaultCountry !== undefined ? `&passwordlessDefaultCountry=${defaultCountry}` : "") +
                (disablePhoneGuess !== undefined ? `&passwordlessDisablePhoneGuess=true` : "")
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    return { browser, page };
}

// We have multiple buttons in this form. Modifying the original would break other tests...
async function submitForm(page) {
    const button = await waitForSTElement(page, "[data-supertokens~='button'][type='submit']");
    return button.click();
}
