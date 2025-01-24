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
} from "../helpers";
import { tryWebauthnSignUp } from "./webauthn.helpers";
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
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS WITH SIGN UP",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
            ]);
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
    });
});
