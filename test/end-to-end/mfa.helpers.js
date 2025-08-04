import assert from "assert";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLogoutButton,
    setInputValues,
    submitForm,
    submitFormUnsafe,
    toggleSignInSignUp,
    waitForSTElement,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
    getLatestURLWithToken,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { TEST_APPLICATION_SERVER_BASE_URL } from "../constants";
import { TEST_CLIENT_BASE_URL } from "../constants";
import { getTestPhoneNumber } from "../exampleTestHelpers";

export async function setupUserWithAllFactors(page) {
    const email = await getTestEmail();
    const phoneNumber = getTestPhoneNumber();
    await clearBrowserCookiesWithoutAffectingConsole(page, []);
    await page.evaluate(() => window.localStorage.setItem("enableAllRecipes", "true"));
    await page.evaluate(() => window.localStorage.setItem("mode", "REQUIRED"));

    await tryEmailPasswordSignUp(page, email);

    await waitForSTElement(page, "[data-supertokens~='sendVerifyEmailIcon']");
    // we wait for sometime so that the api to generate the token is called
    await new Promise((res) => setTimeout(res, 500));
    const latestURLWithToken = await getLatestURLWithToken();
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.goto(latestURLWithToken)]);

    // wait until all the handlers are set up
    await waitFor(250);

    // click on the continue button
    await Promise.all([submitForm(page), page.waitForNavigation({ waitUntil: "networkidle0" })]);

    await chooseFactor(page, "otp-email");
    await completeOTP(page);

    await waitForDashboard(page);
    await setupOTP(page, "PHONE", phoneNumber);

    await waitForDashboard(page);
    const totpSecret = await setupTOTP(page);
    return { email, phoneNumber, totpSecret };
}

export async function addToRequiredSecondaryFactorsForUser(page, factorId) {
    await page.evaluate(
        (baseUrl, factorId) =>
            window.fetch(`${baseUrl}/addRequiredFactor`, {
                method: "POST",
                headers: new Headers([["content-type", "application/json"]]),
                body: JSON.stringify({
                    factorId,
                }),
            }),
        TEST_APPLICATION_SERVER_BASE_URL,
        factorId
    );
}

export async function completeOTP(page, contactMethod) {
    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );
    if (contactMethod) {
        assert.strictEqual(loginAttemptInfo.contactMethod, contactMethod);
    }
    const device = await getPasswordlessDevice(loginAttemptInfo);
    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
    await submitForm(page);
}
export async function logout(page) {
    await waitForDashboard(page);
    const logoutButton = await getLogoutButton(page);
    await Promise.all([logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await waitForSTElement(page);
}
export async function waitForDashboard(page) {
    await Promise.all([page.waitForSelector(".sessionInfo-user-id"), page.waitForNetworkIdle()]);
}
export async function waitForAccessDenied(page) {
    const error = await waitForSTElement(page, "[data-supertokens~=accessDenied]");
    return error.evaluate((e) => e.textContent);
}
export async function waitForLoadingScreen(page) {
    const error = await waitForSTElement(page, "[data-supertokens~=loadingScreen]");
    return error.evaluate((e) => e.textContent);
}
export async function waitForBlockedScreen(page) {
    const error = await waitForSTElement(page, "[data-supertokens~=blockedScreen]");
    return error.evaluate((e) => e.textContent);
}
export async function setupOTP(page, contactMethod, phoneNumber, goToChooser = true) {
    if (goToChooser) {
        await goToFactorChooser(page);
        await chooseFactor(page, contactMethod === "PHONE" ? "otp-phone" : "otp-email");
    }

    await setInputValues(page, [
        { name: contactMethod === "PHONE" ? "phoneNumber_text" : "email", value: phoneNumber },
    ]);
    await submitForm(page);

    await completeOTP(page);
}
export async function setupTOTP(page) {
    await goToFactorChooser(page);
    await chooseFactor(page, "totp");
    const secret = await getTOTPSecret(page);

    await completeTOTP(page, secret);
    await waitFor(1000);
    return secret;
}
export async function getTOTPSecret(page) {
    const showSecret = await waitForSTElement(page, "[data-supertokens~=showTOTPSecretBtn]");
    await showSecret.click();

    const secretDiv = await waitForSTElement(page, "[data-supertokens~=totpSecret]");
    const secret = await secretDiv.evaluate((e) => e.textContent);
    return secret;
}

export async function completeTOTP(page, secret) {
    let resp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/getTOTPCode`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({ secret }),
    });

    const respBody = await resp.json();

    const { totp } = respBody;
    await setInputValues(page, [{ name: "totp", value: totp }]);
    await submitForm(page);
}
export async function tryEmailPasswordSignUp(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth-for-factors/?factors=emailpassword`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
        { name: "name", value: "asdf" },
        { name: "age", value: "20" },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}
export async function tryEmailPasswordSignIn(page, email, queryParams) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth-for-factors/?factors=emailpassword${queryParams ?? ""}`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await setInputValues(page, [
        { name: "email", value: email },
        { name: "password", value: "Asdf12.." },
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}
export async function tryPasswordlessSignInUp(page, contactInfo, queryParams, isPhone = false) {
    await page.evaluate(() => localStorage.removeItem("supertokens-passwordless-loginAttemptInfo"));
    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth-for-factors/?factors=${isPhone ? "otp-phone" : "otp-email"}${
                queryParams ?? ""
            }`
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await setInputValues(page, [{ name: isPhone ? "phoneNumber_text" : "email", value: contactInfo }]);
    await submitForm(page);

    await waitForSTElement(page, "[data-supertokens~=input][name=userInputCode]");

    const loginAttemptInfo = JSON.parse(
        await page.evaluate(() => localStorage.getItem("supertokens-passwordless-loginAttemptInfo"))
    );
    const device = await getPasswordlessDevice(loginAttemptInfo);
    await setInputValues(page, [{ name: "userInputCode", value: device.codes[0].userInputCode }]);
    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}
export async function goToFactorChooser(page, waitForList = true) {
    const ele = await page.waitForSelector(".goToFactorChooser");
    await waitFor(500);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), ele.click()]);
    if (waitForList) {
        await waitForSTElement(page, "[data-supertokens~=factorChooserList]");
    }
}
export async function chooseFactor(page, id) {
    const ele = await waitForSTElement(page, `[data-supertokens~=factorChooserOption][data-supertokens~=${id}]`);
    await waitFor(100);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), ele.click()]);
    await waitForSTElement(page);
}

export async function tryWebauthnSignUp(page) {
    await goToFactorChooser(page);
    await chooseFactor(page, "webauthn");
    await waitForSTElement(page, "[data-supertokens~=webauthn-mfa]");
    const link = await waitForSTElement(page, "[data-supertokens~='link']");
    await link.click();
    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 1000));
}

export async function tryWebauthnSignIn(page) {
    await waitForSTElement(page, "[data-supertokens~=webauthn-mfa]");
    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 1000));
}
