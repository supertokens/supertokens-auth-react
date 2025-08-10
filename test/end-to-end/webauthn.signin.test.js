import {
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    waitForSTElement,
    submitFormUnsafe,
    waitForUrl,
    getUserIdFromSessionContext,
    isWebauthnSupported,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import { tryWebauthnSignIn } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn SignIn", () => {
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

    describe("SignIn test", () => {
        it("signup with passkey", async () => {
            // Override to enable webauthn support
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem(
                    "overrideWebauthnSupport",
                    JSON.stringify({
                        status: "OK",
                        browserSupportsWebauthn: true,
                        platformAuthenticatorIsAvailable: true,
                    })
                );
            });

            await tryWebauthnSignIn(page);

            // Redirected to onSuccessFulRedirectUrl
            const onSuccessFulRedirectUrl = "/dashboard";
            // Session.doesSessionExist returns true, allow to stay on /dashboard
            await waitForUrl(page, onSuccessFulRedirectUrl);

            // Test that sessionInfo was fetched successfully
            await getUserIdFromSessionContext(page);

            // Most of the sign-in mock is defined in the override for the web
            // test server.
            //
            // In here, we are just asserting the logs to ensure that all the necessary
            // functions are being called in the correct order and all of them are present.

            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE AUTHENTICATE CREDENTIAL WITH SIGN IN",
                "ST_LOGS WEBAUTHN OVERRIDE GET SIGN IN OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_IN_OPTIONS",
                "ST_LOGS WEBAUTHN OVERRIDE AUTHENTICATE CREDENTIAL",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS WEBAUTHN OVERRIDE SIGN IN",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS SIGN_IN",
                "ST_LOGS SESSION ON_HANDLE_EVENT ACCESS_TOKEN_PAYLOAD_UPDATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS WEBAUTHN",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });
        it("should recover successfully from a recoverable error", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "FAILED_TO_AUTHENTICATE_USER");
            });
            await tryWebauthnSignIn(page);
            await waitForSTElement(page, "[data-supertokens~='generalError']");

            // Remove the error and retry
            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });

            await submitFormUnsafe(page);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE AUTHENTICATE CREDENTIAL WITH SIGN IN",
                "ST_LOGS WEBAUTHN OVERRIDE AUTHENTICATE CREDENTIAL WITH SIGN IN",
            ]);
        });
        it("should show recoverable error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "FAILED_TO_AUTHENTICATE_USER");
            });
            await tryWebauthnSignIn(page);
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
            await tryWebauthnSignIn(page);
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
        it("should show error if invalid options error is thrown", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "INVALID_OPTIONS_ERROR");
            });
            await tryWebauthnSignIn(page);
            const errorTextContainer = await waitForSTElement(page, "[data-supertokens~='generalError']");
            const errorText = await errorTextContainer.evaluate((el) => el.textContent);
            assert.strictEqual(
                errorText,
                "The request either timed out, was canceled or the device is already registered. Please try again or try using another device."
            );

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });
        });
        it("should show general error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });
            await tryWebauthnSignIn(page);
            await waitForSTElement(page, "[data-supertokens~='generalError']");

            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("throwWebauthnError");
            });
        });
    });
});
