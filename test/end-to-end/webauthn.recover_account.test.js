import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL } from "../constants";
import {
    backendBeforeEach,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    getTestEmail,
    waitForSTElement,
    submitFormUnsafe,
    isWebauthnSupported,
} from "../helpers";
import { openRecoveryWithToken, signUpAndSendRecoveryEmail, getTokenFromEmail } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn Recover Account", () => {
    let browser;
    let page;
    let consoleLogs = [];
    let email;
    let skipped = false;

    before(async function () {
        if (!(await isWebauthnSupported())) {
            skipped = true;
            this.skip();
        }
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        browser = await setupBrowser();
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
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

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

        // Signup and send the recovery email
        email = await getTestEmail();
        await signUpAndSendRecoveryEmail(page, email);
        await new Promise((res) => setTimeout(res, 1000));
    });

    describe("Recover Account Test", () => {
        it("should show the recovery token page", async () => {
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);

            // Use the token to recover the account
            await openRecoveryWithToken(page, token);

            const continueWithPasskeyContainer = await waitForSTElement(page, "[data-supertokens~='headerTitle']");
            const headerText = await continueWithPasskeyContainer.evaluate((el) => el.textContent);

            // Assert the text contains "Create a passkey"
            assert.deepStrictEqual(headerText, "Create a passkey");

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE REGISTER CREDENTIAL",
                "ST_LOGS WEBAUTHN OVERRIDE SIGN UP",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS WEBAUTHN",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE SIGN_OUT",
                "ST_LOGS SESSION PRE_API_HOOKS SIGN_OUT",
                "ST_LOGS SESSION ON_HANDLE_EVENT SIGN_OUT",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
                "ST_LOGS WEBAUTHN OVERRIDE GENERATE RECOVER ACCOUNT TOKEN",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS GENERATE_RECOVER_ACCOUNT_TOKEN",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
            ]);
        });
        it("should recover the account successfully", async () => {
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);

            // Use the token to recover the account
            await openRecoveryWithToken(page, token);

            // We should be in the recovery page now, click the continue button
            await submitFormUnsafe(page);

            await new Promise((res) => setTimeout(res, 2000));

            const successContainer = await waitForSTElement(page, "[data-supertokens~='headerText']");
            const headerText = await successContainer.evaluate((el) => el.textContent);

            // Assert the text contains "Account recovered successfully!"
            assert.deepStrictEqual(headerText, "Account recovered successfully!");

            // Click on the continue button
            await submitFormUnsafe(page);

            await new Promise((res) => setTimeout(res, 2000));

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE REGISTER CREDENTIAL",
                "ST_LOGS WEBAUTHN OVERRIDE SIGN UP",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS WEBAUTHN",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE SIGN_OUT",
                "ST_LOGS SESSION PRE_API_HOOKS SIGN_OUT",
                "ST_LOGS SESSION ON_HANDLE_EVENT SIGN_OUT",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
                "ST_LOGS WEBAUTHN OVERRIDE GENERATE RECOVER ACCOUNT TOKEN",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS GENERATE_RECOVER_ACCOUNT_TOKEN",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE REGISTER CREDENTIAL",
                "ST_LOGS WEBAUTHN OVERRIDE RECOVER ACCOUNT",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS RECOVER_ACCOUNT",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
            ]);
        });
        it("should show the error when the token is invalid", async () => {
            // Use the token to recover the account
            await openRecoveryWithToken(page, "test");

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "The token used for recovering the account is invalid. Please try with a different token or request a new one."
            );

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE REGISTER CREDENTIAL",
                "ST_LOGS WEBAUTHN OVERRIDE SIGN UP",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS WEBAUTHN",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE SIGN_OUT",
                "ST_LOGS SESSION PRE_API_HOOKS SIGN_OUT",
                "ST_LOGS SESSION ON_HANDLE_EVENT SIGN_OUT",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
                "ST_LOGS WEBAUTHN OVERRIDE GENERATE RECOVER ACCOUNT TOKEN",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS GENERATE_RECOVER_ACCOUNT_TOKEN",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
            ]);
        });
        it("should show error when webauthn error is thrown", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });

            // Use the token to recover the account
            await openRecoveryWithToken(page, "test");

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Something went wrong, please refresh the page or reach out to support.");

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", undefined);
            });
        });
        it("should show error when generated options are invalid", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", "INVALID_OPTIONS_ERROR");
            });

            // Use the token to recover the account
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);
            await openRecoveryWithToken(page, token);

            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Failed to recover account, please try again.");

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", undefined);
            });
        });
        it("should show error when credentials are invalid", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", "INVALID_CREDENTIALS_ERROR");
            });

            // Use the token to recover the account
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);
            await openRecoveryWithToken(page, token);

            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "The passkey is invalid, please try again, possibly with a different device."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", undefined);
            });
        });
        it("should show error when generated options are not found", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", "OPTIONS_NOT_FOUND_ERROR");
            });

            // Use the token to recover the account
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);
            await openRecoveryWithToken(page, token);

            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Failed to recover account, please try again.");

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", undefined);
            });
        });
        it("should show error when authenticator is invalid", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", "INVALID_AUTHENTICATOR_ERROR");
            });

            // Use the token to recover the account
            // Get the token from the email
            const token = await getTokenFromEmail(email);
            assert.ok(token);
            await openRecoveryWithToken(page, token);

            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Invalid authenticator, please try again.");

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", undefined);
            });
        });
        it("should show webauthn not supported error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnRecoverAccountErrorStatus", "WEBAUTHN_NOT_SUPPORTED");
            });

            const token = await getTokenFromEmail(email);
            assert.ok(token);

            await openRecoveryWithToken(page, token);

            // We should be in the recovery page now, click the continue button
            await submitFormUnsafe(page);
            await new Promise((res) => setTimeout(res, 1000));

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "Passkey is not supported on your browser, please try with a different browser."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnRecoverAccountErrorStatus");
            });
        });
    });
});
