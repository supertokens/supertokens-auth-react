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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getPasswordlessDevice,
    setInputValues,
    waitForSTElement,
    waitFor,
    getFeatureFlags,
    screenshotOnFailure,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    getInputField,
    isAccountLinkingSupported,
    waitForUrl,
    setupBrowser,
    clickForgotPasswordLink,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";

import { TEST_CLIENT_BASE_URL, SOMETHING_WENT_WRONG_ERROR } from "../constants";
import { tryEmailPasswordSignUp, tryPasswordlessSignInUp } from "./mfa.helpers";

const examplePhoneNumber = "+36701231212";
const exampleEmail = "test@example.com";
const registeredEmailWithPass = "ep-test@example.com";
const unregPhoneNumber = "+36701231000";
const unregEmail = "test-unknown@example.com";

export function getPasswordlessTestCases({ authRecipe, logId, generalErrorRecipeName, contactMethod }) {
    const contactInfoSubmitLogsWithoutEmailChecks = [
        `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
        `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
    ];
    const contactInfoSubmitLogsWithEmailChecks = [
        "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
        "ST_LOGS PASSWORDLESS OVERRIDE DOES_EMAIL_EXIST",
        "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
        "ST_LOGS PASSWORDLESS PRE_API_HOOKS EMAIL_EXISTS",
        `ST_LOGS ${logId} OVERRIDE CREATE_CODE`,
        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CREATE_CODE`,
        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_CODE_SENT`,
        `ST_LOGS ${logId} OVERRIDE SET_LOGIN_ATTEMPT_INFO`,
    ];

    let browser;
    let page;
    let consoleLogs = [];

    const signInUpPageLoadLogs = [
        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
    ];

    const signinSuccessLogsOTP = [
        "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
        "ST_LOGS SESSION OVERRIDE GET_USER_ID",
        `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
        `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
        "ST_LOGS SESSION OVERRIDE GET_USER_ID",
    ];
    const signinSuccessLogsLink = [
        "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
        "ST_LOGS SESSION OVERRIDE GET_USER_ID",
        `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
        `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
        "ST_LOGS SESSION OVERRIDE GET_USER_ID",
    ];

    afterEach(function () {
        page.evaluate(() => localStorage.removeItem("defaultToEmail"));
        return screenshotOnFailure(this, browser);
    });

    if (contactMethod === "EMAIL") {
        describe("with EMAIL", () => {
            getTestCases("EMAIL", "email", exampleEmail);
        });
    }

    if (contactMethod === "PHONE") {
        describe("with PHONE", () => {
            getTestCases("PHONE", "phoneNumber_text", examplePhoneNumber);
        });
    }

    if (contactMethod === "EMAIL_OR_PHONE") {
        describe("with EMAIL_OR_PHONE", () => {
            describe("using an email", () => {
                getTestCases("EMAIL_OR_PHONE", "email", exampleEmail);
            });
            describe("using a phone number", () => {
                getTestCases("EMAIL_OR_PHONE", "phoneNumber_text", examplePhoneNumber);
            });

            describe("switching input type", () => {
                let contactInfoSubmitLogs =
                    authRecipe === "all"
                        ? contactInfoSubmitLogsWithEmailChecks
                        : contactInfoSubmitLogsWithoutEmailChecks;
                const inputNameEmail = "email";
                const inputNamePhone = "phoneNumber_text";
                const contactMethod = "EMAIL_OR_PHONE";

                before(async function () {
                    const coreUrl = await setupCoreApp({
                        appId: "test-app-id",
                        coreConfig: {
                            passwordless_code_lifetime: 4000,
                            passwordless_max_code_input_attempts: 3,
                        },
                    });
                    await setupST({
                        coreUrl,
                        passwordlessFlowType: "USER_INPUT_CODE",
                        passwordlessContactMethod: contactMethod,
                    });

                    ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, undefined));
                    if (authRecipe === "all") {
                        await tryEmailPasswordSignUp(page, registeredEmailWithPass);
                    }
                });

                after(async function () {
                    await browser?.close();
                    await backendHook("after");
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

                    await setInputValues(page, [{ name: inputNameEmail, value: unregEmail }]);
                    await submitForm(page);

                    if (authRecipe === "all") {
                        await waitForSTElement(page, "[data-supertokens~=input-password]");
                    } else {
                        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                        const backButton = await waitForSTElement(
                            page,
                            "[data-supertokens~=secondaryLinkWithLeftArrow]"
                        );
                        await backButton.click();
                    }

                    const changeButton = await waitForSTElement(page, "[data-supertokens~=contactMethodSwitcher]");
                    await changeButton.click();
                    await setInputValues(page, [{ name: inputNamePhone, value: examplePhoneNumber }]);
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

                        ...(authRecipe === "all"
                            ? []
                            : [
                                  ...contactInfoSubmitLogs,
                                  `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                                  `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                                  `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                                  `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                                  `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                              ]),

                        ...contactInfoSubmitLogs,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        ...signinSuccessLogsOTP,
                    ]);
                });

                if (authRecipe === "all") {
                    it("switching input methods after password input shows up", async function () {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                            page.waitForNavigation({ waitUntil: "networkidle0" }),
                        ]);

                        await waitForSTElement(page, "[data-supertokens~=input-phoneNumber]", true);
                        await setInputValues(page, [{ name: inputNameEmail, value: unregEmail }]);
                        await submitForm(page);

                        await waitForSTElement(page, "[data-supertokens~=continueWithPasswordlessLink]");
                        await waitForSTElement(page, "[data-supertokens~=input-password]");

                        const changeButton = await waitForSTElement(page, "[data-supertokens~=contactMethodSwitcher]");
                        await changeButton.click();

                        await waitForSTElement(page, "[data-supertokens~=input-password]", true);
                        await waitForSTElement(page, "[data-supertokens~=continueWithPasswordlessLink]", true);

                        await setInputValues(page, [{ name: inputNamePhone, value: examplePhoneNumber }]);
                        await submitForm(page);

                        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                        const loginAttemptInfo = JSON.parse(
                            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                        );
                        const device = await getPasswordlessDevice(loginAttemptInfo);
                        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                        await submitForm(page);

                        await page.waitForSelector(".sessionInfo-user-id");
                    });

                    it("sign in with a password", async function () {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                            page.waitForNavigation({ waitUntil: "networkidle0" }),
                        ]);

                        await setInputValues(page, [{ name: inputNameEmail, value: registeredEmailWithPass }]);
                        await submitForm(page);
                        await setInputValues(page, [{ name: "password", value: "Asdf12.." }]);
                        await waitForSTElement(page, "[data-supertokens~=continueWithPasswordlessLink]", true);
                        await submitForm(page);

                        await page.waitForSelector(".sessionInfo-user-id");
                    });

                    it("sign in OTP without a pw field showing when signing in with a registered pwless user", async function () {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                            page.waitForNavigation({ waitUntil: "networkidle0" }),
                        ]);

                        await setInputValues(page, [{ name: inputNameEmail, value: exampleEmail }]);
                        await submitForm(page);

                        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                        const loginAttemptInfo = JSON.parse(
                            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                        );
                        const device = await getPasswordlessDevice(loginAttemptInfo);
                        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                        await submitForm(page);

                        await page.waitForSelector(".sessionInfo-user-id");
                    });

                    it("sign in OTP without a pw field showing when signing in with a phone number", async function () {
                        await Promise.all([
                            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                            page.waitForNavigation({ waitUntil: "networkidle0" }),
                        ]);

                        const changeButton = await waitForSTElement(page, "[data-supertokens~=contactMethodSwitcher]");
                        await changeButton.click();

                        await setInputValues(page, [{ name: inputNamePhone, value: unregPhoneNumber }]);
                        await submitForm(page);

                        await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                        const loginAttemptInfo = JSON.parse(
                            await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
                        );
                        const device = await getPasswordlessDevice(loginAttemptInfo);
                        await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
                        await submitForm(page);

                        await page.waitForSelector(".sessionInfo-user-id");
                    });
                }
            });
        });
    }

    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("passwordless")) {
            this.skip();
        }
    });

    function getTestCases(contactMethod, inputName, contactInfo) {
        let contactInfoSubmitLogs =
            authRecipe === "all" && inputName == "email"
                ? contactInfoSubmitLogsWithEmailChecks
                : contactInfoSubmitLogsWithoutEmailChecks;

        let accountLinkingSupported;
        let coreUrl;
        const coreConfig = {
            passwordless_code_lifetime: 4000,
            passwordless_max_code_input_attempts: 3,
        };

        before(async function () {
            coreUrl = await setupCoreApp({
                appId: "test-app-id",
                coreConfig,
            });
        });

        describe(`UserInputCode`, function () {
            this.timeout(60000);

            before(async function () {
                await backendHook("before");
                await setupST({
                    coreUrl,
                    passwordlessFlowType: "USER_INPUT_CODE",
                    passwordlessContactMethod: contactMethod,
                });
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, undefined));
                accountLinkingSupported = await isAccountLinkingSupported();
            });

            after(async function () {
                await browser?.close();
                await backendHook("after");
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                await page.evaluate(
                    (inputName) => localStorage.setItem("defaultToEmail", inputName === "email"),
                    inputName
                );
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
                await page.evaluate(() => localStorage.removeItem("mode"));

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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsOTP,
                ]);
            });

            it("Successful signin with space in contactInfo", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: " " + contactInfo + " " }]);
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
                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsOTP,
                ]);
            });

            it("Successful signin w/ email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsOTP,
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

                await waitForUrl(page, "/redirect-here");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
                ]);
            });

            it("Successful signin w/ redirectToPath (w/ leading slash) and email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here%3Ffoo%3Dbar&mode=REQUIRED`),
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

                const { pathname, search } = await page.evaluate(() => window.location);
                assert.deepStrictEqual(pathname + search, "/redirect-here?foo=bar");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
                ]);
            });

            it("Successful signin w/ redirectPath (w/o leading slash) and email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%3Ffoo%3Dbar&mode=REQUIRED`),
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

                const { pathname, search } = await page.evaluate(() => window.location);
                assert.deepStrictEqual(pathname + search, "/?foo=bar");
            });

            it("Successful signin w/ redirectPath (query params + fragment)", async function () {
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED&redirectToPath=${encodeURIComponent(
                            "/redirect-here?foo=bar#cell=4,1-6,2"
                        )}`
                    ),
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

                const { pathname, search, hash } = await page.evaluate(() => window.location);
                assert.deepStrictEqual(pathname + search + hash, "/redirect-here?foo=bar#cell=4,1-6,2");
            });

            it("Successful signin w/ redirectPath (only fragment)", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=${encodeURIComponent("#cell=4,1-6,2")}`),
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

                const { pathname, search, hash } = await page.evaluate(() => window.location);
                assert.deepStrictEqual(pathname + search + hash, "/#cell=4,1-6,2");
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
                    `${inputName === "email" ? "Email" : "Phone number"} is invalid`
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
                    `${inputName === "email" ? "Email" : "Phone number"} is invalid`
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
                        const otpField = await getInputField(page, "userInputCode");
                        const fieldValue = await otpField.evaluate((f) => f.value);
                        assert.strictEqual(fieldValue, "");
                    }
                }

                assert.deepStrictEqual(
                    [
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        ...signInUpPageLoadLogs,

                        ...contactInfoSubmitLogs,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
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

                        ...contactInfoSubmitLogs,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
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
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CREATE_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API create code");
            });

            it("resend code general error", async function () {
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_RESEND_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API resend code");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            });

            it("consume code general error", async function () {
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CONSUME_CODE", page);

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

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API consume code");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            });
        });

        describe(`Link`, function () {
            before(async function () {
                await backendHook("before");
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, undefined));
                accountLinkingSupported = await isAccountLinkingSupported();
                await setupST({
                    coreUrl,
                    passwordlessFlowType: "MAGIC_LINK",
                    passwordlessContactMethod: contactMethod,
                });
            });

            after(async function () {
                await browser?.close();
                await backendHook("after");
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await page.evaluate(
                    (inputName) => localStorage.setItem("defaultToEmail", inputName === "email"),
                    inputName
                );
                await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
                await page.evaluate(() => localStorage.removeItem("mode"));

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
                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsLink,
                ]);
            });

            it("Successful signin w/ email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=required`),
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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsLink,
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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsLink,
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

                await waitForUrl(page, "/redirect-here");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
                ]);
            });

            it("Successful signin w/ stored redirectToPath and email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here&mode=REQUIRED`),
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

                await waitForUrl(page, "/redirect-here");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
                ]);
            });

            it("Successful signin w/ stored redirectToPath (only fragment) and email verification", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=${encodeURIComponent("#cell=4,1-6,2")}`),
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

                await waitForUrl(page, "/#cell=4,1-6,2", false);
            });

            it("create code general error", async function () {
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CREATE_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API create code");
            });

            it("resend code general error", async function () {
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_RESEND_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API resend code");
                // We also check that we remained on the link sent screen
                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
            });

            it("consume code general error", async function () {
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CONSUME_CODE", page);

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

                // We have been redirected to linkSent
                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
                await waitForUrl(page, "/auth/");

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API consume code");
            });

            it("consume code network error", async function () {
                await page.setRequestInterception(true);
                const requestHandler = (request) => {
                    if (request.url().endsWith("signinup/code/consume")) {
                        request.abort();
                    } else {
                        request.continue();
                    }
                };
                page.on("request", requestHandler);

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

                // We have been redirected to linkSent
                await waitForSTElement(page, "[data-supertokens~=sendCodeIcon]");
                await waitForUrl(page, "/auth/");

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), SOMETHING_WENT_WRONG_ERROR);

                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            });

            it("No linkCode", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
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
                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
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

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...(accountLinkingSupported ? [`ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`] : []),
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
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

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
                    ...signInUpPageLoadLogs,
                ]);
            });

            it("Missing preAuthSessionId", async function () {
                const device = await setupDevice(page, inputName, contactInfo);
                consoleLogs.length = 0;

                await Promise.all([
                    page.goto(device.codes[0].urlWithLinkCode.replace(/([?&])preAuthSessionId=[^&#]+&?/, "$1")),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
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

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
                    ...signInUpPageLoadLogs,
                ]);
            });
        });

        describe(`Link/Code`, function () {
            before(async function () {
                await backendHook("before");
                await setupST({
                    coreUrl,
                    passwordlessFlowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                    passwordlessContactMethod: contactMethod,
                });
                ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, undefined));
                accountLinkingSupported = await isAccountLinkingSupported();
            });

            after(async function () {
                await browser?.close();
                await backendHook("after");
            });

            beforeEach(async function () {
                await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
                await page.evaluate(
                    (inputName) => localStorage.setItem("defaultToEmail", inputName === "email"),
                    inputName
                );
                await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));

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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsLink,
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

                await page.reload({ waitUntil: ["networkidle0"] });

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",

                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    `ST_LOGS SESSION ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS undefined`,

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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsOTP,
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
                await waitForUrl(page, "/redirect-here");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                    `ST_LOGS ${logId} ON_HANDLE_EVENT SUCCESS`,
                    `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS ${logId}`,
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

                await anotherTab.waitForSelector(".sessionInfo-user-id");

                await page.reload({ waitUntil: ["networkidle0"] });

                await page.waitForSelector(".sessionInfo-user-id");

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    ...signInUpPageLoadLogs,

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",

                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    `ST_LOGS SESSION ON_HANDLE_EVENT SESSION_ALREADY_EXISTS`,

                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS undefined`,

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

                await waitForUrl(page, "/auth/");

                assert.deepStrictEqual(
                    [
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        ...signInUpPageLoadLogs,

                        ...contactInfoSubmitLogs,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS ${logId} OVERRIDE CLEAR_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                        "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                        `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                        `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                        `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                        `ST_LOGS ${logId} ON_HANDLE_EVENT PASSWORDLESS_RESTART_FLOW`,
                        `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
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

                const pathname = await waitForUrl(anotherTab, "/auth/");

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

                    ...contactInfoSubmitLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    `ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH`,
                    ...signInUpPageLoadLogs,
                    `ST_LOGS ${logId} OVERRIDE GET_LOGIN_ATTEMPT_INFO`,
                    `ST_LOGS ${logId} OVERRIDE CONSUME_CODE`,
                    `ST_LOGS ${logId} PRE_API_HOOKS PASSWORDLESS_CONSUME_CODE`,
                    ...signinSuccessLogsOTP,
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
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CREATE_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);
                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API create code");
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
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_CONSUME_CODE", page);

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

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API consume code");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
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
                const _isGeneralErrorSupported = await isGeneralErrorSupported();
                if (!_isGeneralErrorSupported) {
                    this.skip();
                }

                await setGeneralErrorToLocalStorage(generalErrorRecipeName, "PASSWORDLESS_RESEND_CODE", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await setInputValues(page, [{ name: inputName, value: contactInfo }]);
                await submitForm(page);

                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

                const resendBtn = await waitForSTElement(page, "[data-supertokens~=resendCodeBtn]:not(:disabled)");
                await resendBtn.click();

                const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
                assert.strictEqual(await error.evaluate((e) => e.textContent), "general error from API resend code");
                // We also check that we remained on the OTP screen
                await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");
            });
        });

        if (authRecipe === "all") {
            describe("with emailpassword combo", () => {
                before(async function () {
                    await backendHook("before");
                    await setupST({
                        coreUrl,
                        passwordlessFlowType: "USER_INPUT_CODE",
                        passwordlessContactMethod: contactMethod,
                    });
                    ({ browser, page } = await initBrowser(contactMethod, consoleLogs, authRecipe, undefined));
                    if (authRecipe === "all") {
                        await tryEmailPasswordSignUp(page, registeredEmailWithPass);
                    }
                });

                after(async function () {
                    await browser?.close();
                    await backendHook("after");
                });

                beforeEach(async function () {
                    await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

                    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
                    await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));

                    consoleLogs.length = 0;
                });

                it("should navigate to the sign in page when the user clicks on the forgot password link", async function () {
                    await page.goto(`${TEST_CLIENT_BASE_URL}/auth`);

                    await setInputValues(page, [{ name: "email", value: registeredEmailWithPass }]);
                    await submitForm(page);

                    const testVal = "nav check" + Date.now();

                    await page.evaluate((testVal) => {
                        window.testVal = testVal;
                    }, testVal);

                    await clickForgotPasswordLink(page);
                    await waitForUrl(page, "/auth/reset-password");

                    const testValAfterNav = await page.evaluate(() => window.testVal);
                    assert.strictEqual(testVal, testValAfterNav);
                });
            });
        }
    }
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

async function initBrowser(contactMethod, consoleLogs, authRecipe, { defaultCountry } = {}) {
    const browser = await setupBrowser();
    const page = await browser.newPage();
    page.on("console", (consoleObj) => {
        const log = consoleObj.text();
        // console.log(log);
        if (log.startsWith("ST_LOGS")) {
            consoleLogs.push(log);
        }
    });

    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth?authRecipe=${authRecipe}&passwordlessContactMethodType=${contactMethod}` +
                (defaultCountry !== undefined ? `&passwordlessDefaultCountry=${defaultCountry}` : "")
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await new Promise((res) => setTimeout(res, 500));

    if (["EMAIL", "EMAIL_OR_PHONE"].includes(contactMethod)) {
        await tryPasswordlessSignInUp(page, exampleEmail, undefined, false);
        await clearBrowserCookiesWithoutAffectingConsole(page, []);
    }

    if (["PHONE", "EMAIL_OR_PHONE"].includes(contactMethod)) {
        await tryPasswordlessSignInUp(page, examplePhoneNumber, undefined, true);
        await clearBrowserCookiesWithoutAffectingConsole(page, []);
    }

    return { browser, page };
}

// We have multiple buttons in this form. Modifying the original would break other tests...
async function submitForm(page) {
    const button = await waitForSTElement(page, "[data-supertokens~='button'][type='submit']");
    return button.click();
}
