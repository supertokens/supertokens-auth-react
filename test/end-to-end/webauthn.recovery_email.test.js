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
import { tryWebauthnSignIn, openRecoveryAccountPage } from "./webauthn.helpers";
import assert from "assert";

describe("SuperTokens Webauthn Recovery Email", () => {
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

    describe("Recovery Email Test", () => {
        it("should show the recovery email page", async () => {
            await openRecoveryAccountPage(page);

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
    });
});
