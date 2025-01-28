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
        it("should be able to sign in with webauthn", async () => {
            await tryWebauthnSignIn(page);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS WEBAUTHN OVERRIDE AUTHENTICATE CREDENTIAL WITH SIGN IN",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
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
