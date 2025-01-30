import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL } from "../constants";
import {
    backendBeforeEach,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    toggleSignInSignUp,
    setEnabledRecipes,
    waitForSTElement,
    submitForm,
} from "../helpers";
import { tryWebauthnSignIn } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn SignIn", () => {
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

    describe("SignIn test", () => {
        it("signup with passkey", async () => {
            await tryWebauthnSignIn(page);

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
            ]);
        });
        it("should recover successfully from a recoverable error", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("webauthnErrorStatus", "FAILED_TO_AUTHENTICATE_USER");
            });
            await tryWebauthnSignIn(page);
            await waitForSTElement(page, "[data-supertokens~='passkeyRecoverableErrorContainer']");

            // Remove the error and retry
            await page.evaluateOnNewDocument(() => {
                localStorage.removeItem("webauthnErrorStatus");
            });

            await submitForm(page);
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
            await waitForSTElement(page, "[data-supertokens~='passkeyRecoverableErrorContainer']");
        });
        it("should show general error in the same view", async () => {
            // Set the error to be thrown
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem("throwWebauthnError", "true");
            });
            await tryWebauthnSignIn(page);
            await waitForSTElement(page, "[data-supertokens~='passkeyRecoverableErrorContainer']");
        });
    });
});
