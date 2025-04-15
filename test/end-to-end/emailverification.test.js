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
import fetch from "isomorphic-fetch";
import {
    SEND_VERIFY_EMAIL_API,
    VERIFY_EMAIL_API,
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    SIGN_OUT_API,
    TEST_APPLICATION_SERVER_BASE_URL,
    SOMETHING_WENT_WRONG_ERROR,
} from "../constants";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    clickLinkWithRightArrow,
    getVerificationEmailErrorTitle,
    getVerificationEmailErrorMessage,
    getTextByDataSupertokens,
    getLatestURLWithToken,
    setInputValues,
    submitForm,
    sendVerifyEmail,
    getGeneralSuccess,
    getGeneralError,
    toggleSignInSignUp,
    defaultSignUp,
    signUp,
    screenshotOnFailure,
    waitForText,
    logoutFromEmailVerification,
    waitForSTElement,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    getDefaultSignUpFieldValues,
    getTestEmail,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    getLogoutButton,
    setupST,
} from "../helpers";

describe("Email Verification", () => {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        await backendHook("before");

        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");

        const coreUrl = await setupCoreApp();
        await setupST({ coreUrl });

        page = await browser.newPage();

        consoleLogs = [];
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
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

    describe("Core Functionality", function () {
        describe("Email verification screen", function () {
            it("Should redirect to auth from email verification protected page if the user is deleted", async function () {
                await toggleSignInSignUp(page);

                const email = await getTestEmail();
                const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email });
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

                await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/deleteUser`, {
                    method: "POST",
                    headers: [["content-type", "application/json"]],
                    body: JSON.stringify({
                        email,
                        rid: "emailpassword",
                    }),
                });
                await new Promise((r) => setTimeout(r, 11000));
                consoleLogs = [];
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/dashboard`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                // In strict mode useEffects may be called twice in development mode,
                // but sometimes the second call is aborted by the navigation in the first
                if (
                    consoleLogs[consoleLogs.length - 1] === "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH" &&
                    consoleLogs[consoleLogs.length - 2] === "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH"
                ) {
                    consoleLogs.pop();
                }

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT UNAUTHORISED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT UNAUTHORISED",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                ]);
            });

            it("Should redirect to auth if the user has been deleted", async function () {
                await toggleSignInSignUp(page);
                const email = await getTestEmail();
                const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email });
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
                await waitForUrl(page, "/auth/verify-email");

                await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/deleteUser`, {
                    method: "POST",
                    headers: [["content-type", "application/json"]],
                    body: JSON.stringify({
                        email,
                        rid: "emailpassword",
                    }),
                });
                await new Promise((r) => setTimeout(r, 11000));

                consoleLogs = [];
                await page.reload({ waitUntil: ["networkidle0"] });
                // Click on Logout should remove session and redirect to login page
                await waitForUrl(page, "/auth/");

                // In strict mode useEffects may be called twice in development mode,
                // but sometimes the second call is aborted by the navigation in the first
                if (
                    consoleLogs[consoleLogs.length - 1] === "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH" &&
                    consoleLogs[consoleLogs.length - 2] === "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH"
                ) {
                    consoleLogs.pop();
                }

                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT UNAUTHORISED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT UNAUTHORISED",
                    "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                ]);
            });

            it("Should redirect to login page when email verification screen is accessed without a valid session", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await waitForUrl(page, "/auth/");
            });

            it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                await waitForUrl(page, "/auth/verify-email");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                    "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                    "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                    "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION GET_REDIRECTION_URL VERIFY_EMAIL",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT ACCESS_TOKEN_PAYLOAD_UPDATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE SEND_VERIFICATION_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS SEND_VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                ]);
            });

            it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified and then post verification should redirect with original redirectPath (w/ leading slash) and newUser", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here%3Ffoo%3Dbar`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForUrl(page, "/auth/verify-email");

                // we wait for email to be created
                await new Promise((r) => setTimeout(r, 1000));

                // we fetch the email verification link and go to that
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);

                // click on the continue button
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                // check that we are in /redirect-here?foo=bar
                await waitForUrl(page, "/redirect-here?foo=bar", false);
            });

            it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified and then post verification should redirect with original redirectPath (w/o leading slash) and newUser", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%3Ffoo%3Dbar`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForUrl(page, "/auth/verify-email");

                // we wait for email to be created
                await new Promise((r) => setTimeout(r, 1000));

                // we fetch the email verification link and go to that
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);

                // click on the continue button
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                // check that we are in /?foo=bar
                await waitForUrl(page, "/?foo=bar", false);
            });

            it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified and then post verification should redirect with original redirectPath (query params + fragment) and newUser", async function () {
                await Promise.all([
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth?redirectToPath=${encodeURIComponent(
                            "/redirect-here?foo=bar#cell=4,1-6,2"
                        )}`
                    ),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForUrl(page, "/auth/verify-email");

                // we wait for email to be created
                await new Promise((r) => setTimeout(r, 1000));

                // we fetch the email verification link and go to that
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);

                // click on the continue button
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                await waitForUrl(page, "/redirect-here?foo=bar#cell=4,1-6,2", false);
            });

            it("Should redirect to verify email screen on successful sign up when mode is REQUIRED and email is not verified and then post verification should redirect with original redirectPath (only fragment) and newUser", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=${encodeURIComponent("#cell=4,1-6,2")}`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                await waitForUrl(page, "/auth/verify-email");

                // we wait for email to be created
                await new Promise((r) => setTimeout(r, 1000));

                // we fetch the email verification link and go to that
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);

                // click on the continue button
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                // check that we are in /#cell=4,1-6,2
                await waitForUrl(page, "/#cell=4,1-6,2", false);
            });

            it("Should redirect to verify email screen on successful sign in when mode is REQUIRED and email is not verified", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                await logoutFromEmailVerification(page);
                await new Promise((r) => setTimeout(r, 1000));
                consoleLogs = [];

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                ]);
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await new Promise((r) => setTimeout(r, 2000));
                await waitForUrl(page, "/auth/verify-email");
                // Click on resend email should show "Email Resent" success message
                await sendVerifyEmail(page);
                await page.waitForResponse(
                    (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
                );
                const generalSuccess = await getGeneralSuccess(page);
                assert.deepStrictEqual(generalSuccess, "Email resent");

                // Click on Logout should remove session and redirect to login page
                await Promise.all([
                    logoutFromEmailVerification(page),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_IN",
                    "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_IN",
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION GET_REDIRECTION_URL VERIFY_EMAIL",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT ACCESS_TOKEN_PAYLOAD_UPDATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE SEND_VERIFICATION_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS SEND_VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE SEND_VERIFICATION_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS SEND_VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                    "ST_LOGS SESSION OVERRIDE SIGN_OUT",
                    "ST_LOGS SESSION PRE_API_HOOKS SIGN_OUT",
                    "ST_LOGS SESSION ON_HANDLE_EVENT SIGN_OUT",
                    "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                ]);
            });

            it("Should redirect to verify email screen on successful sign in when mode is REQUIRED after unverify", async function () {
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                await logoutFromEmailVerification(page);
                await new Promise((r) => setTimeout(r, 1000));
                consoleLogs = [];

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                ]);

                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

                await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
                await waitForUrl(page, "/auth/verify-email");

                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);

                const title = await getTextByDataSupertokens(page, "headerTitle");
                assert.deepStrictEqual(title, "Email verification successful!");

                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await page.waitForSelector(".sessionInfo-user-id");
                await waitForUrl(page, "/dashboard");

                await page.evaluate((url) => window.fetch(url), `${TEST_APPLICATION_SERVER_BASE_URL}/unverifyEmail`);
                await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");

                await waitForUrl(page, "/auth/verify-email");
            });
        });

        describe("Verify Email with token screen", function () {
            it("Should show invalid token screen when token is invalid or expired", async function () {
                consoleLogs = [];
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
                await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
                await Promise.all([
                    submitForm(page),
                    page.waitForResponse(
                        (response) => response.url() === VERIFY_EMAIL_API && response.status() === 200
                    ),
                ]);

                await waitForText(
                    page,
                    "[data-supertokens~=headerTinyTitle]",
                    "The email verification link has expired"
                );
                // Click Continue should redirect to /auth when no session is present
                await Promise.all([
                    clickLinkWithRightArrow(page),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS VERIFY_EMAIL",
                    "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                ]);
            });

            it("Should ask for user interaction when token is valid with no session", async function () {
                // Sign Up, logout, clear logs
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");
                await logoutFromEmailVerification(page);
                await new Promise((r) => setTimeout(r, 100));
                consoleLogs = [];

                // Attempt verification without a session
                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);
                await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
                await submitForm(page);

                await waitForText(page, "[data-supertokens~=headerTitle]", "Email verification successful!");

                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await waitForUrl(page, "/auth/");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT EMAIL_VERIFIED_SUCCESSFUL",
                    "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                ]);
            });

            it('Should show "Email Verification successful" screen when token is valid with an active session', async function () {
                consoleLogs = [];
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken),
                ]);
                const title = await getTextByDataSupertokens(page, "headerTitle");
                assert.deepStrictEqual(title, "Email verification successful!");
                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await page.waitForSelector(".sessionInfo-user-id");
                await waitForUrl(page, "/dashboard");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                    "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                    "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                    "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                    "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION GET_REDIRECTION_URL VERIFY_EMAIL",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
                    "ST_LOGS SESSION ON_HANDLE_EVENT ACCESS_TOKEN_PAYLOAD_UPDATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE SEND_VERIFICATION_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS SEND_VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS VERIFY_EMAIL",
                    "ST_LOGS SESSION ON_HANDLE_EVENT ACCESS_TOKEN_PAYLOAD_UPDATED",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT EMAIL_VERIFIED_SUCCESSFUL",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS EMAIL_PASSWORD GET_REDIRECTION_URL SUCCESS",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_JWT_PAYLOAD_SECURELY",
                    "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                ]);
            });

            it("should successfully redirect after email verification without react-router-dom", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?router=no-router&rid=emailpassword&mode=REQUIRED`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);

                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                const latestURLWithToken = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken + "&router=no-router"),
                ]);
                const appHeader = await page.waitForSelector(".App > h1");
                const appHeaderText = await page.evaluate((e) => e.innerText, appHeader);
                assert.strictEqual(appHeaderText, "Without Routing");

                const title = await getTextByDataSupertokens(page, "headerTitle");
                assert.deepStrictEqual(title, "Email verification successful!");

                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await page.waitForSelector(".sessionInfo-user-id");

                await waitForUrl(page, "/dashboard");
            });

            it("Should allow to verify an email without a valid session", async function () {
                consoleLogs = [];
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN&mode=REQUIRED`);
                await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
                await Promise.all([
                    submitForm(page),
                    page.waitForResponse(
                        (response) => response.url() === VERIFY_EMAIL_API && response.status() === 200
                    ),
                ]);
                await waitForUrl(page, "/auth/verify-email");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS VERIFY_EMAIL",
                ]);
            });
        });
        describe("Email Verified", function () {
            it("Should redirect to onSuccessfulRedirect when email is already verified", async function () {
                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);

                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues();
                await signUp(page, fieldValues, postValues, "emailpassword");

                const latestURLWithToken_ = await getLatestURLWithToken();
                await Promise.all([
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                    page.goto(latestURLWithToken_),
                ]);
                const title_ = await getTextByDataSupertokens(page, "headerTitle");
                assert.deepStrictEqual(title_, "Email verification successful!");

                await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);
                await page.waitForSelector(".sessionInfo-user-id");

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                // In this case we redirect to the default ("/")
                const pathname = await page.evaluate(() => window.location.pathname);
                assert.deepStrictEqual(pathname, "/");
            });
        });
    });

    describe("Server errors", function () {
        describe("Verify Email with token screen", function () {
            // TODO: Debug and Fix
            it('Should show "Something went wrong" screen when API failure', async function () {
                await page.setRequestInterception(true);
                page.on("request", (request) => {
                    if (request.url() === VERIFY_EMAIL_API && request.method() === "POST") {
                        request.respond({
                            // Previous behavior was a result of core being shut down
                            // Emulating the same here
                            status: 500,
                            // body: "Error: No SuperTokens core available to query",
                        });
                    } else {
                        request.continue();
                    }
                });

                consoleLogs = [];
                await page.goto(`${TEST_CLIENT_BASE_URL}/auth/verify-email?token=TOKEN`);
                await waitForText(page, "[data-supertokens~=headerTitle]", "Verify your email address");
                await Promise.all([
                    submitForm(page),
                    page.waitForResponse(
                        (response) => response.url() === VERIFY_EMAIL_API && response.status() === 500
                    ),
                ]);
                await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
                const verificationEmailErrorTitle = await getVerificationEmailErrorTitle(page);
                assert.deepStrictEqual(verificationEmailErrorTitle, "!\nSomething went wrong");
                assert.deepStrictEqual(consoleLogs, [
                    "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                    "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                    "ST_LOGS EMAIL_VERIFICATION OVERRIDE VERIFY_EMAIL",
                    "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS VERIFY_EMAIL",
                ]);
            });
        });
    });

    describe("General errors", function () {
        describe("Verify Email with token screen", function () {
            beforeEach(async function () {
                if (!(await isGeneralErrorSupported())) {
                    this.skip();
                }
                await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
            });

            it('Should show "General Error" when API returns "GENERAL_ERROR"', async function () {
                await toggleSignInSignUp(page);
                const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: "john.doe3@supertokens.io" });
                await signUp(page, fieldValues, postValues, "emailpassword");

                const latestURLWithToken = await getLatestURLWithToken();
                await page.goto(latestURLWithToken);

                await setGeneralErrorToLocalStorage("EMAIL_VERIFICATION", "VERIFY_EMAIL", page);
                await page.waitForResponse(
                    (response) => response.url() === VERIFY_EMAIL_API && response.status() === 200
                );
                await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
                const verificationEmailErrorTitle = await getVerificationEmailErrorTitle(page);
                const verificationEmailErrorMessage = await getVerificationEmailErrorMessage(page);
                assert.deepStrictEqual(verificationEmailErrorTitle, "!\nSomething went wrong");
                assert.deepStrictEqual(verificationEmailErrorMessage, "general error from API email verify");
            });
        });

        describe("Send verification email screen", function () {
            beforeEach(async function () {
                if (!(await isGeneralErrorSupported())) {
                    this.skip();
                }

                await page.evaluate(() => localStorage.removeItem("SHOW_GENERAL_ERROR"));
            });

            it('Should show "General Error" when API returns "GENERAL_ERROR" on resend', async function () {
                await setGeneralErrorToLocalStorage("EMAIL_VERIFICATION", "SEND_VERIFY_EMAIL", page);

                await Promise.all([
                    page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
                    page.waitForNavigation({ waitUntil: "networkidle0" }),
                ]);
                await toggleSignInSignUp(page);
                await defaultSignUp(page);
                await waitForUrl(page, "/auth/verify-email");
                await Promise.all([
                    sendVerifyEmail(page),
                    page.waitForResponse(
                        (response) => response.url() === SEND_VERIFY_EMAIL_API && response.status() === 200
                    ),
                ]);
                await new Promise((r) => setTimeout(r, 50)); // Make sure to wait for status to update.
                const generalError = await getGeneralError(page);
                assert.deepStrictEqual(generalError, "general error from API email verification code");
            });
        });
    });

    describe("isEmailVerified server error", function () {
        describe("Verify Email with token screen", function () {
            // TODO: this test doesn't actually work cause it doesn't stop the server... strange
            // it("Should ignore email verification when isEmailVerified server request fails", async function () {
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/auth?mode=REQUIRED`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //     await toggleSignInSignUp(page);
            //     await defaultSignUp(page);
            //     // Stop server.
            //     await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            //         method: "POST",
            //     }).catch(console.error);
            //     // No redirection to /auth/veirfy-email if API call fails.
            //     await Promise.all([
            //         page.goto(`${TEST_CLIENT_BASE_URL}/dashboard?mode=REQUIRED`),
            //         page.waitForNavigation({ waitUntil: "networkidle0" }),
            //     ]);
            //     await waitForUrl(page(pathname, "/dashboard");
            //     assert.deepStrictEqual(consoleLogs, [
            //         "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
            //         "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
            //         "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
            //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
            //         "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
            //         "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
            //         "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
            //         "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",
            //         "ST_LOGS EMAIL_VERIFICATION GET_REDIRECTION_URL VERIFY_EMAIL",
            //         "ST_LOGS EMAIL_VERIFICATION OVERRIDE SEND_VERIFICATION_EMAIL",
            //         "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS SEND_VERIFY_EMAIL",
            //         "ST_LOGS EMAIL_VERIFICATION ON_HANDLE_EVENT VERIFY_EMAIL_SENT",
            //         "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
            //         "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
            //         "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            //         "ST_LOGS EMAIL_VERIFICATION OVERRIDE IS_EMAIL_VERIFIED",
            //         "ST_LOGS EMAIL_VERIFICATION PRE_API_HOOKS IS_EMAIL_VERIFIED",
            //     ]);
            // });
        });
    });

    describe("signOut errors", function () {
        it("Test that Something Went Wrong is displayed when signOut throws an error", async function () {
            await toggleSignInSignUp(page);
            await page.evaluate(() => localStorage.setItem("SHOW_GENERAL_ERROR", "SESSION SIGN_OUT"));

            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: "john.doe2@supertokens.io" });
            await signUp(page, fieldValues, postValues, "emailpassword");

            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");

            await page.setRequestInterception(true);
            const requestHandler = (request) => {
                if (request.url() === SIGN_OUT_API && request.method() === "POST") {
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

            await logoutFromEmailVerification(page);

            await page.waitForResponse((response) => response.url() === SIGN_OUT_API && response.status() === 400);

            page.off("request", requestHandler);
            await page.setRequestInterception(false);

            const error = await waitForSTElement(page, "[data-supertokens~='generalError']");
            assert.strictEqual(await error.evaluate((e) => e.textContent), SOMETHING_WENT_WRONG_ERROR);
        });
    });

    describe("Claim refresh with clock skew", function () {
        it("should not go into an infinite loop during claim refresh with adjusted clock skew", async function () {
            const coreUrl = await setupCoreApp({
                coreConfig: {
                    access_token_validity: 2 * 60 * 60, // 2 hours
                },
            });
            await setupST({ coreUrl });
            await toggleSignInSignUp(page);

            // Override Date.now() to simulate a clock skew of 1 hour
            await page.evaluate(() => {
                globalThis.originalNow = Date.now;
                Date.now = function () {
                    return originalNow() + 60 * 60 * 1000;
                };
            });

            let claimRefreshCalledCount = 0;

            await page.setRequestInterception(true);

            page.on("request", (req) => {
                if (
                    req.url() === `${TEST_APPLICATION_SERVER_BASE_URL}/auth/user/email/verify` &&
                    req.method() === "GET"
                ) {
                    // Simulate a failure after 5 claim refresh API calls to avoid an infinite loop
                    if (claimRefreshCalledCount >= 5) {
                        return req.respond({ status: 500, contentType: "text/plain", body: "Something went wrong" });
                    } else {
                        claimRefreshCalledCount++;
                    }
                }
                req.continue();
            });

            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: await getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");
            assert(claimRefreshCalledCount < 2);
        });
    });
});
