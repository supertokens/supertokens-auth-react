import fetch from "isomorphic-fetch";
import { TEST_SERVER_BASE_URL } from "../constants";
import {
    backendBeforeEach,
    setupBrowser,
    screenshotOnFailure,
    clearBrowserCookiesWithoutAffectingConsole,
    getTestEmail,
    waitForSTElement,
} from "../helpers";
import { openRecoveryWithToken, signUpAndSendRecoveryEmail, getTokenFromEmail } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn Recover Account", () => {
    let browser;
    let page;
    let consoleLogs = [];
    let email;

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
            assert.strictEqual(token.length, 128);

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
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS undefined",
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
                "ST_LOGS WEBAUTHN OVERRIDE GET REGISTER OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
                "ST_LOGS WEBAUTHN PRE_API_HOOKS REGISTER_OPTIONS",
            ]);
        });
    });
});
