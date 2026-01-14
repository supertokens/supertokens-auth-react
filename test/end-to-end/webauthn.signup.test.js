import {
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    getTestEmail,
    waitForSTElement,
    submitFormUnsafe,
    setInputValues,
    isWebauthnSupported,
    waitForUrl,
    getUserIdFromSessionContext,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import { tryWebauthnSignUp, openWebauthnSignUp } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn SignUp", () => {
    let browser;
    let page;
    let consoleLogs = [];
    let skipped = false;
    const appConfig = {
        enabledRecipes: ["webauthn", "emailpassword", "session", "dashboard", "userroles", "multifactorauth"],
    };

    before(async function () {
        if (!(await isWebauthnSupported())) {
            skipped = true;
            this.skip();
        }

        await backendHook("before");
        const coreUrl = await setupCoreApp();
        appConfig.coreUrl = coreUrl;
        await setupST(appConfig);

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

    describe("SignUp test", () => {
        it("should not show the back button and continue without passkey button if there is only one recipe", async () => {
            await setupST({ ...appConfig, enabledRecipes: ["webauthn", "session", "multifactorauth"] });
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
            await submitFormUnsafe(page);
            await new Promise((res) => setTimeout(res, 1000));

            const backBtnAfterSubmit = await page.$("[data-supertokens~='backButton']");
            assert.strictEqual(backBtnAfterSubmit, null);

            // Make sure the continue without passkey button is not shown
            const continueWithoutPasskeyBtnAfterSubmit = await page.$("[data-supertokens~='continueWithoutPasskey']");
            assert.strictEqual(continueWithoutPasskeyBtnAfterSubmit, null);

            // Reset the recipes after test is done
            await setupST({ ...appConfig });
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
            await submitFormUnsafe(page);
            // Redirected to onSuccessFulRedirectUrl
            const onSuccessFulRedirectUrl = "/dashboard";
            // Session.doesSessionExist returns true, allow to stay on /dashboard
            await waitForUrl(page, onSuccessFulRedirectUrl);

            // Test that sessionInfo was fetched successfully
            await getUserIdFromSessionContext(page);

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
            ]);
        });
        it("should successfully throw an error if the user already exists", async () => {
            const email = await getTestEmail();
            await tryWebauthnSignUp(page, email);

            await submitFormUnsafe(page);
            // Redirected to onSuccessFulRedirectUrl
            const onSuccessFulRedirectUrl = "/dashboard";
            // Session.doesSessionExist returns true, allow to stay on /dashboard
            await waitForUrl(page, onSuccessFulRedirectUrl);

            // Test that sessionInfo was fetched successfully
            await getUserIdFromSessionContext(page);

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
            ]);

            await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);

            await page.waitForTimeout(1000);

            await tryWebauthnSignUp(page, email);

            // We should be in the confirmation page now.
            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
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
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS WEBAUTHN",
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
            await submitFormUnsafe(page);
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
            await submitFormUnsafe(page);

            await waitForSTElement(page, "[data-supertokens~='generalError']");

            // Remove the error and retry
            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });

            await submitFormUnsafe(page);
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
            await submitFormUnsafe(page);

            await waitForSTElement(page, "[data-supertokens~='generalError']");

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
            await submitFormUnsafe(page);

            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
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
            await submitFormUnsafe(page);

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
            await submitFormUnsafe(page);

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
                localStorage.setItem(
                    "overrideWebauthnSupport",
                    JSON.stringify({
                        status: "OK",
                        browserSupportsWebauthn: false,
                        platformAuthenticatorIsAvailable: false,
                    })
                );
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
                localStorage.removeItem("overrideWebauthnSupport");
            });
        });
    });
});
