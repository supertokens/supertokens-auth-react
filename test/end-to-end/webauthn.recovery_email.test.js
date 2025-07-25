import {
    backendHook,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    waitForSTElement,
    getTestEmail,
    isWebauthnSupported,
    setupCoreApp,
    setupST,
} from "../helpers";
import { openRecoveryAccountPage, signUpAndSendRecoveryEmail, getTokenFromEmail } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn Recovery Email", () => {
    let browser;
    let page;
    let consoleLogs = [];
    let skipped = false;

    before(async function () {
        if (!(await isWebauthnSupported())) {
            skipped = true;
            this.skip();
        }

        await backendHook("before");
        const coreUrl = await setupCoreApp();
        await setupST({ coreUrl });

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
        await page?.close();
        await browser?.close();
        await backendHook("after");
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await toggleSignInSignUp(page);
    });

    describe("Recovery Email Test", () => {
        it("should show the success page when the email is sent", async () => {
            const email = await getTestEmail();
            await signUpAndSendRecoveryEmail(page, email);
            await new Promise((res) => setTimeout(res, 1000));

            // It should be successful and the user should see the success page
            const emailSentTextContainer = await waitForSTElement(page, "[data-supertokens~='headerTitle']");
            const emailSentText = await emailSentTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(emailSentText, "Email sent");

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
            ]);

            // Verify that the email is sent by fetching the token through the API
            const token = await getTokenFromEmail(email);
            assert.ok(token);
        });
        it("change email button should take the user back to the recovery view", async () => {
            const email = await getTestEmail();
            await openRecoveryAccountPage(page, email, true);
            await new Promise((res) => setTimeout(res, 1000));

            // Find the change email button and click it
            const changeEmailButton = await waitForSTElement(page, "[data-supertokens~='changeEmailBtn']");
            await changeEmailButton.click();

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
                "ST_LOGS WEBAUTHN OVERRIDE GENERATE RECOVER ACCOUNT TOKEN",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS GENERATE_RECOVER_ACCOUNT_TOKEN",
            ]);
            const headerTextContainer = await waitForSTElement(
                page,
                "[data-supertokens~='passkeyRecoverAccountFormHeader']"
            );
            const headerText = await headerTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(headerText, "Recover Account");
        });
        it("should show the recovery email page", async () => {
            await openRecoveryAccountPage(page, null, false);

            const headerTextContainer = await waitForSTElement(
                page,
                "[data-supertokens~='passkeyRecoverAccountFormHeader']"
            );
            const headerText = await headerTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(headerText, "Recover Account");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
            ]);
        });
        it("should show error when recovery is not allowed", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "RECOVER_ACCOUNT_NOT_ALLOWED");
            });
            const email = await getTestEmail();
            await openRecoveryAccountPage(page, email, true);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(errorText, "Account Recovery is not allowed, please contact support.");

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", undefined);
            });
        });
        it("should show general error if error is thrown", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });
            const email = await getTestEmail();
            await openRecoveryAccountPage(page, email, true);
            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "Something went wrong while trying to send recover account token, please try again."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", undefined);
            });
        });
        it("should take the user back when the back button is clicked", async () => {
            await openRecoveryAccountPage(page, null, false);
            const backButton = await waitForSTElement(page, "[data-supertokens~='backButton']");
            await backButton.click();

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN GET_REDIRECTION_URL SEND_RECOVERY_EMAIL",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
            ]);
        });
    });
});
