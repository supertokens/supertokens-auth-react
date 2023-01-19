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
    RESET_PASSWORD_API,
    RESET_PASSWORD_TOKEN_API,
    SIGN_IN_API,
    SIGN_IN_UP_API,
    SIGN_UP_API,
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    VERIFY_EMAIL_API,
} from "../constants";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLatestURLWithToken,
    getPasswordlessDevice,
    setPasswordlessFlowType,
    waitFor,
} from "../helpers";
import percySnapshot from "@percy/puppeteer";

// Run the tests in a DOM environment.
require("jsdom-global")();

describe("Visual testing", function () {
    // The test "cases" depend on each, they are more like steps..
    // Meaning we should bail after the first failure
    this.bail(true);

    let browser;
    let page;

    let c = 0;
    let titleStack = [];
    const snapshot = async (page, title) => {
        const fullTitle = `${titleStack.join(" - ")}: ${title}`;
        // await page.screenshot({ path: `./test_report/${++c}-${fullTitle.replace(/ |:/g, "_")}.jpg` });
        await percySnapshot(page, fullTitle);
    };

    async function snapshotDuringRequest(page, { clickSelector, cb, apiPath, method, title }) {
        const requestDone = new DeferredPromise();
        const requestHandler = async (request) => {
            // If method called before hasMethodBeenCalled timeouts, update methodCalled.
            if (request.url().endsWith(apiPath) && (method === undefined || request.method() === method)) {
                await snapshot(page, title);
                requestDone.resolve();
            }
            request.continue();
        };
        await page.setRequestInterception(true);
        page.on("request", requestHandler);
        try {
            if (cb) {
                await cb();
            } else {
                await page.click(clickSelector);
            }
            await requestDone.promise;
        } finally {
            page.off("request", requestHandler);
            await page.setRequestInterception(false);
        }
    }

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

        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?useShadowDom=false`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
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

    beforeEach(function () {
        titleStack = [this.currentTest.title];
        let c = this.currentTest.parent;
        while (c.title !== "Visual testing") {
            titleStack.unshift(c.title);
            c = c.parent;
        }
    });

    afterEach(function () {
        titleStack = [];
    });

    describe("Email password", () => {
        it("Sign up", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=emailpassword&mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~='headerSubtitle']");
            // Switch to sign up
            await page.click("[data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "weak" });
            await page.click("[name=email]"); // switch focus out of the password field to trigger validation
            await snapshot(page, "weak password");

            await setInputValue(page, { name: "password", value: "Str0ngP@ssw0rd" });
            await snapshot(page, "filled with strong password");

            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "filled with password shown");

            await page.click("[data-supertokens~='button'][type=submit]");
            await snapshot(page, "missing required fields");

            await setInputValue(page, { name: "name", value: "John Doe" });
            await setInputValue(page, { name: "age", value: "asdf" });
            await page.click("[data-supertokens~='button'][type=submit]");
            await snapshot(page, "custom field validation failure");

            await setInputValue(page, { name: "age", value: "20" });
            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: SIGN_UP_API,
                title: "during sign up call",
            });

            await page.waitForNavigation({ waitUntil: "networkidle0" });
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~='headerSubtitle']");
            // Switch to sign up
            await page.click("[data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "weak" });
            await snapshot(page, "email already taken");
        });

        it("Sign in", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await snapshot(page, "empty");

            await page.click("[data-supertokens='button']");
            await snapshot(page, "empty submit");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword@supertokens.io" });
            await page.click("[data-supertokens='button']");
            await snapshot(page, "empty password");

            await setInputValue(page, { name: "password", value: "weak" });
            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "wrong password");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword2@supertokens.io" });
            // we wait for the error to go away
            await page.waitForSelector("[data-supertokens~=generalError]", { hidden: true });

            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "email not exists");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "Str0ngP@ssw0rd" });
            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "password shown");

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: SIGN_IN_API,
                title: "during sign in call",
            });
        });

        it("Email verification", async () => {
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let pathname = await page.evaluate(() => window.location.pathname);
            assert.deepStrictEqual(pathname, "/auth/verify-email");

            // we wait for email to be created
            await page.waitForSelector("[data-supertokens~='sendVerifyEmailIcon']");
            await snapshot(page, "verify email screen");

            await waitFor(1000); // Make sure the link is created

            // we fetch the email verification link and go to that
            const latestURLWithToken = await getLatestURLWithToken();

            // click continue + snapshot while loading
            await snapshotDuringRequest(page, {
                cb: () => page.goto(latestURLWithToken),
                title: "link during verify",
                apiPath: VERIFY_EMAIL_API,
            });

            await page.waitForSelector("[data-supertokens='button']");
            await snapshot(page, "verification success");

            await page.click("[data-supertokens='button']");

            await snapshot(page, "verification success + continue");

            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await page.goto(latestURLWithToken);
            await page.waitForSelector("[data-supertokens~=container]");
            await page.waitForSelector("[data-supertokens='button']");
            await snapshot(page, "requires interaction");
            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[data-supertokens~=headerTinyTitle]");
            await snapshot(page, "link invalid link");
        });

        it("Reset password", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await page.click("[data-supertokens~='forgotPasswordLink']");
            await snapshot(page, "screen empty");

            await setInputValue(page, { name: "email", value: "john.doe" });
            await page.click("body");
            await snapshot(page, "invalid email");

            await setInputValue(page, { name: "email", value: "john.doe+emailpassword@supertokens.io" });
            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~=button]",
                title: "during password reset submit",
                apiPath: RESET_PASSWORD_TOKEN_API,
            });

            await page.waitForSelector("[data-supertokens~=enterEmailSuccessMessage]");
            await snapshot(page, "email sent");

            await page.hover("[data-supertokens~=secondaryLinkWithLeftArrow]");
            await snapshot(page, "hover over back arrow");

            // wait to make sure link is created
            await waitFor(500);

            const latestURLWithToken = await getLatestURLWithToken();
            await page.goto(latestURLWithToken);
            await page.waitForSelector("[name=confirm-password]");
            await snapshot(page, "submit new password form empty");

            await setInputValue(page, { name: "password", value: "weak" });
            await page.click("[name=confirm-password]"); // switch focus out of the password field to trigger validation
            await snapshot(page, "weak password");

            await setInputValue(page, { name: "password", value: "Asdf12.." });
            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "password show");

            await setInputValue(page, { name: "confirm-password", value: "weak" });
            await page.click("[name=password]"); // switch focus out of the password field to trigger validation
            await snapshot(page, "weak confirm-password");

            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "confirm-password show");

            await setInputValue(page, { name: "confirm-password", value: "Mismatching12.." });
            await page.click("[data-supertokens~=button");
            await snapshot(page, "mismatching passwords");

            await setInputValue(page, { name: "confirm-password", value: "Asdf12.." });
            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~=button]",
                title: "during new password submit",
                apiPath: RESET_PASSWORD_API,
            });
            await page.waitForSelector("[data-supertokens~=submitNewPasswordSuccessMessage]");
            await snapshot(page, "password reset success");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/reset-password?rid=emailpassword&token=TASD`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await setInputValue(page, { name: "password", value: "Asdf12.." });
            await setInputValue(page, { name: "confirm-password", value: "Asdf12.." });
            await page.click("[data-supertokens~=button");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "invalid token");
        });
    });

    describe("Third party", () => {
        it("Sign in up", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "initial view");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=signin`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "general error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=no_email_present`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "no_email_present error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=custom&message=test_error_message`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "custom error");
        });

        it("Callback screen", async () => {
            await Promise.all([
                await page.click("[data-supertokens~=providerGoogle]"),
                await page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdparty`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            const oauthState = JSON.parse(
                await page.evaluate(() => sessionStorage.getItem("supertokens-oauth-state-2"))
            );
            await snapshotDuringRequest(page, {
                cb: () =>
                    page.goto(
                        `${TEST_CLIENT_BASE_URL}/auth/callback/google?code=68ef254asdfasdf1234asdf1234asdf1234&state=${oauthState.stateForAuthProvider}`
                    ),
                apiPath: SIGN_IN_UP_API,
                title: "during sign in up call",
            });
        });
    });

    describe("Passwordless", () => {
        it("Email form", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "email", value: "asdf" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid email");

            await setInputValue(page, { name: "email", value: "john.doe@supertokens.io" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call",
            });
            await page.waitForSelector("[name=userInputCode]");
        });

        it("Phone form", async () => {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=PHONE`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");
            // emailOrPhone_text
            await setInputValue(page, { name: "phoneNumber_text", value: "213456" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid phone number");

            await page.click("[data-supertokens~=phoneInputWrapper] [role=combobox]");
            await snapshot(page, "country dropdown");
            const focusedElement = await page.evaluateHandle(() => document.activeElement);
            await focusedElement.type("hu");
            await snapshot(page, "country dropdown search");
            await setInputValue(page, { name: "phoneNumber_text", value: "+36701111111" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call",
            });
            await page.waitForSelector("[name=userInputCode]");
        });

        it("Email + phone form", async () => {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL_OR_PHONE&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "emailOrPhone", value: "asdf" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid email");

            await setInputValue(page, { name: "emailOrPhone", value: "john.doe@supertokens.io" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call with email",
            });
            await page.waitForSelector("[name=userInputCode]");
            await page.evaluate(() => localStorage.clear());
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL_OR_PHONE&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValue(page, { name: "emailOrPhone", value: "213456" });
            await page.click("[data-supertokens='button']");
            await snapshot(page, "invalid phone number");

            await page.click("[data-supertokens~=phoneInputWrapper] [role=combobox]");
            await snapshot(page, "country dropdown");
            const focusedElement = await page.evaluateHandle(() => document.activeElement);
            await focusedElement.type("hu");
            await snapshot(page, "country dropdown search");
            await setInputValue(page, { name: "emailOrPhone_text", value: "+36701111111" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call with phone number",
            });
        });

        it("OTP screen", async () => {
            await page.waitForSelector("[name=userInputCode]");
            await snapshot(page, "fresh load with phone number");

            await page.evaluate(() => localStorage.clear());
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await page.waitForSelector("[name=email]");
            await setInputValue(page, { name: "email", value: "john.doe@supertokens.io" });

            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[name=userInputCode]");
            await snapshot(page, "fresh load with email");

            await page.waitForSelector("[data-supertokens~=resendCodeBtn]:not([disabled])");
            await snapshot(page, "resend enabled");

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~=resendCodeBtn]",
                apiPath: "/auth/signinup/code/resend",
                title: "during resend request",
            });
            await snapshot(page, "resend success");

            await page.click("[data-supertokens~='button'][type=submit]");
            await snapshot(page, "empty submit with success notif");

            await page.waitForSelector("[data-supertokens~=generalSuccess]", { hidden: true });
            await snapshot(page, "empty submit");

            await setInputValue(page, { name: "userInputCode", value: "asdf" });
            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~='button'][type=submit]",
                apiPath: "/auth/signinup/code/consume",
                title: "during submit",
            });

            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "wrong OTP submitted");
        });

        it("Link sent screen", async () => {
            await page.evaluate(() => localStorage.clear());
            await setPasswordlessFlowType("EMAIL_OR_PHONE", "MAGIC_LINK");
            await page.evaluate(() => localStorage.clear());
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=EMAIL&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValue(page, { name: "email", value: "john.doe@supertokens.io" });

            await page.click("[data-supertokens=button]");
            await page.waitForSelector("[data-supertokens~=sendCodeIcon");

            await snapshot(page, "with email");

            await setPasswordlessFlowType("EMAIL_OR_PHONE", "MAGIC_LINK");
            await page.evaluate(() => localStorage.clear());
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=passwordless&passwordlessContactMethodType=PHONE&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValue(page, { name: "phoneNumber_text", value: "+36701111111" });

            await page.click("[data-supertokens=button]");
            await page.waitForSelector("[data-supertokens~=sendCodeIcon");

            await snapshot(page, "with phone");

            await page.waitForSelector("[data-supertokens~=resendCodeBtn]:not([disabled])");
            await snapshot(page, "resend enabled");

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~=resendCodeBtn]",
                apiPath: "/auth/signinup/code/resend",
                title: "during resend request",
            });
            await page.waitForSelector("[data-supertokens~=generalSuccess]");
            await snapshot(page, "resend success");

            await failRequest(page, {
                clickSelector: "[data-supertokens~=resendCodeBtn]",
                apiPath: "/auth/signinup/code/resend",
            });
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "resend request error");
        });

        it("Magic link screen", async () => {
            const loginAttemptInfo = JSON.parse(
                await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
            );
            const device = await getPasswordlessDevice(loginAttemptInfo);
            await snapshotDuringRequest(page, {
                cb: () => page.goto(device.codes[0].urlWithLinkCode),
                apiPath: "/auth/signinup/code/consume",
                title: "during consume",
            });

            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await page.goto(device.codes[0].urlWithLinkCode);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "requiring interaction");

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens~='button']",
                apiPath: "/auth/signinup/code/consume",
                title: "during consume if requires interaction",
            });
            await page.waitForSelector("[data-supertokens~=generalError]");
        });
    });

    describe("Third party + Email password", () => {
        it("Password sign up", async () => {
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword&mode=REQUIRED`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~='headerSubtitle']");
            // Switch to sign up
            await page.click("[data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "email", value: "john.doe+thirdpartyemailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "weak" });
            await page.click("[name=email]"); // switch focus out of the password field to trigger validation
            await snapshot(page, "weak password");

            await setInputValue(page, { name: "password", value: "Str0ngP@ssw0rd" });
            await snapshot(page, "filled with strong password");

            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "filled with password shown");

            await page.click("[data-supertokens~='button'][type=submit]");
            await snapshot(page, "missing required fields");

            await setInputValue(page, { name: "name", value: "John Doe" });
            await setInputValue(page, { name: "age", value: "asdf" });
            await page.click("[data-supertokens~='button'][type=submit]");
            await snapshot(page, "custom field validation failure");

            await setInputValue(page, { name: "age", value: "20" });
            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: SIGN_UP_API,
                title: "during sign up call",
            });

            await page.waitForNavigation({ waitUntil: "networkidle0" });
            await clearBrowserCookiesWithoutAffectingConsole(page, []);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~='headerSubtitle']");
            // Switch to sign up
            await page.click("[data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']");

            await setInputValue(page, { name: "email", value: "john.doe+thirdpartyemailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "weak" });
            await snapshot(page, "email already taken");
        });

        it("Password sign in", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");

            await page.click("[data-supertokens='button']");
            await snapshot(page, "empty submit");

            await setInputValue(page, { name: "email", value: "john.doe+thirdpartyemailpassword@supertokens.io" });
            await page.click("[data-supertokens='button']");
            await snapshot(page, "empty password");

            await setInputValue(page, { name: "password", value: "weak" });
            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "wrong password");

            await setInputValue(page, { name: "email", value: "john.doe+thirdpartyemailpassword2@supertokens.io" });
            // we wait for the error to go away
            await page.waitForSelector("[data-supertokens~=generalError]", { hidden: true });

            await page.click("[data-supertokens='button']");
            await page.waitForSelector("[data-supertokens~=generalError]");
            await snapshot(page, "email not exists");

            await setInputValue(page, { name: "email", value: "john.doe+thirdpartyemailpassword@supertokens.io" });
            await setInputValue(page, { name: "password", value: "Str0ngP@ssw0rd" });
            await page.click("[data-supertokens~=showPassword]");
            await snapshot(page, "password shown");

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: SIGN_IN_API,
                title: "during sign in call",
            });
        });

        it("Third party Sign in up", async () => {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "initial view");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=signin`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "general error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=no_email_present`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "no_email_present error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=custom&message=test_error_message`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "custom error");
        });
    });

    describe("Third party + Passwordless", () => {
        it("Third party Sign in up", async () => {
            await clearBrowserCookiesWithoutAffectingConsole(page, []);

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "initial view");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=signin`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "general error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=no_email_present`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "no_email_present error");

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?error=custom&message=test_error_message`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "custom error");
        });
        it("Email form", async () => {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "email", value: "asdf" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid email");

            await setInputValue(page, { name: "email", value: "john.doe@supertokens.io" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call",
            });

            await page.waitForSelector("[data-supertokens~=sendCodeIcon");
        });

        it("Phone form", async () => {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=PHONE`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");
            // emailOrPhone_text
            await setInputValue(page, { name: "phoneNumber_text", value: "213456" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid phone number");

            await page.click("[data-supertokens~=phoneInputWrapper] [role=combobox]");
            await snapshot(page, "country dropdown");
            const focusedElement = await page.evaluateHandle(() => document.activeElement);
            await focusedElement.type("hu");
            await snapshot(page, "country dropdown search");
            await setInputValue(page, { name: "phoneNumber_text", value: "+36701111111" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call",
            });
            await page.waitForSelector("[data-supertokens~=sendCodeIcon");
        });

        it("Email + phone form", async () => {
            await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL_OR_PHONE&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.waitForSelector("[data-supertokens~=container]");
            await snapshot(page, "empty");

            await setInputValue(page, { name: "emailOrPhone", value: "asdf" });
            await page.click("body");
            await waitFor(500);
            await snapshot(page, "invalid email");

            await setInputValue(page, { name: "emailOrPhone", value: "john.doe@supertokens.io" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call with email",
            });
            await page.waitForSelector("[data-supertokens~=sendCodeIcon");
            await page.evaluate(() => localStorage.clear());
            await Promise.all([
                page.goto(
                    `${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartypasswordless&passwordlessContactMethodType=EMAIL_OR_PHONE&useShadowDom=false`
                ),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            await setInputValue(page, { name: "emailOrPhone", value: "213456" });
            await page.click("[data-supertokens='button']");
            await snapshot(page, "invalid phone number");

            await page.click("[data-supertokens~=phoneInputWrapper] [role=combobox]");
            await snapshot(page, "country dropdown");
            const focusedElement = await page.evaluateHandle(() => document.activeElement);
            await focusedElement.type("hu");
            await snapshot(page, "country dropdown search");
            await setInputValue(page, { name: "emailOrPhone_text", value: "+36701111111" });

            await snapshotDuringRequest(page, {
                clickSelector: "[data-supertokens='button']",
                apiPath: "/auth/signinup/code",
                title: "during create code call with phone number",
            });
            await page.waitForSelector("[data-supertokens~=sendCodeIcon");
        });
    });
});

async function setInputValue(page, f) {
    const input = await page.waitForSelector(`[name=${f.name}]`);
    await input.click({ clickCount: 3 });
    await input.type(f.value);
}

async function failRequest(page, { clickSelector, cb, apiPath, method }) {
    const requestDone = new DeferredPromise();
    const requestHandler = async (request) => {
        // If method called before hasMethodBeenCalled timeouts, update methodCalled.
        if (request.url().endsWith(apiPath) && (method === undefined || request.method() === method)) {
            request.abort();
            requestDone.resolve();
        } else {
            request.continue();
        }
    };
    await page.setRequestInterception(true);
    page.on("request", requestHandler);
    try {
        if (cb) {
            await cb();
        } else {
            await page.click(clickSelector);
        }
        await requestDone.promise;
    } finally {
        page.off("request", requestHandler);
        await page.setRequestInterception(false);
    }
}
class DeferredPromise {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
