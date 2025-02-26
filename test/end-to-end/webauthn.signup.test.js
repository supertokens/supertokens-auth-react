import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL } from "../constants";
import {
    backendBeforeEach,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    getTestEmail,
    waitForSTElement,
    submitForm,
    setEnabledRecipes,
    setInputValues,
} from "../helpers";
import { tryWebauthnSignUp, openWebauthnSignUp } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn SignUp", () => {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function () {
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        await setEnabledRecipes(["webauthn", "emailpassword", "session", "dashboard", "userroles"]);

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
        await toggleSignInSignUp(page);
    });

    describe("SignUp test", () => {
        it("should not show the back button and continue without passkey button if there is only one recipe", async () => {
            await setEnabledRecipes(["webauthn"]);
            await openWebauthnSignUp(page);

            // Use puppeteer to check if the back button is not shown
            const backBtn = await page.$("[data-supertokens~='backButton']");
            assert.strictEqual(backBtn, null);

            // Make sure the continue without passkey button is not shown
            const continueWithoutPasskeyBtn = await page.$("[data-supertokens~='continueWithoutPasskey']");
            assert.strictEqual(continueWithoutPasskeyBtn, null);

            // Should not show the back button after the form is submitted as well.
            const email = await getTestEmail();
            await setInputValues(page, [{ name: "email", value: email }]);
            await submitForm(page);
            await new Promise((res) => setTimeout(res, 1000));

            const backBtnAfterSubmit = await page.$("[data-supertokens~='backButton']");
            assert.strictEqual(backBtnAfterSubmit, null);

            // Make sure the continue without passkey button is not shown
            const continueWithoutPasskeyBtnAfterSubmit = await page.$("[data-supertokens~='continueWithoutPasskey']");
            assert.strictEqual(continueWithoutPasskeyBtnAfterSubmit, null);

            // Reset the recipes after test is done
            await setEnabledRecipes(["webauthn", "emailpassword", "session", "dashboard", "userroles"]);
        });
        it("should show the create a passkey successfully", async () => {
            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);
            const continueWithPasskeyContainer = await waitForSTElement(page, "[data-supertokens~='headerTitle']");
            const enteredEmailContainer = await waitForSTElement(page, "[data-supertokens~='enteredEmailId']");

            const headerText = await continueWithPasskeyContainer.evaluate((el) => el.textContent);
            const emailText = await enteredEmailContainer.evaluate((el) => el.textContent);

            // Assert the text contains "Create a passkey"
            assert.deepStrictEqual(headerText, "Create a passkey");
            assert.strictEqual(emailText, email);
        });
        it("should successfully signup the user and redirect", async () => {
            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);
            await page.waitForTimeout(2000);

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
            ]);
        });
        it("should successfully throw an error if the user already exists", async () => {
            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            await submitForm(page);
            await page.waitForTimeout(2000);

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
            ]);

            await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

            await page.waitForTimeout(1000);

            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);
            await page.waitForTimeout(1000);

            const errorTextContainer = await waitForSTElement(
                page,
                "[data-supertokens~='passkeyRecoverableErrorContainer']"
            );
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Email already exists, please sign in instead.");

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
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE REGISTER CREDENTIAL",
                "ST_LOGS WEBAUTHN OVERRIDE SIGN UP",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_UP",
            ]);
        });
        it("should show the email input not populated error", async () => {
            await tryWebauthnSignUp(page, "");
            await submitForm(page);
            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Please enter your email to continue.");
        });
        it("should recover successfully from a recoverable error", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "FAILED_TO_REGISTER_USER");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~='passkeyRecoverableErrorContainer']");

            // Remove the error and retry
            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });

            await submitForm(page);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
            ]);
        });
        it("should show recoverable error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "FAILED_TO_REGISTER_USER");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~='passkeyRecoverableErrorContainer']");

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });
        });
        it("should show not supported error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "WEBAUTHN_NOT_SUPPORTED");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);

            const errorTextContainer = await waitForSTElement(
                page,
                "[data-supertokens~='passkeyRecoverableErrorContainer']"
            );
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "Passkey is not supported on your browser, please try with a different browser."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });
        });
        it("should show something went wrong on general error", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~='somethingWentWrongContainer']");

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("throwWebauthnError");
            });
        });
        it("should go back to home when go back is clicked in something went wrong", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitForm(page);

            await waitForSTElement(page, "[data-supertokens~='somethingWentWrongContainer']");
            const goBackBtn = await waitForSTElement(page, "[data-supertokens~='errorGoBackLabel']");
            await goBackBtn.click();

            await waitForSTElement(page, "[data-supertokens~='signUpFormInnerContainer']");

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("throwWebauthnError");
            });
        });
        it("should show that webauthn is not supported on the browser", async () => {
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("disableWebauthnSupport", "true");
            });

            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            const errorTextContainer = await waitForSTElement(
                page,
                "[data-supertokens~='continueWithPasskeyButtonNotSupported']"
            );
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "Your browser does not support passkey flow, please try in a different browser."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("disableWebauthnSupport");
            });
        });
    });
});
