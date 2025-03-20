import { TEST_APPLICATION_SERVER_BASE_URL, TEST_CLIENT_BASE_URL } from "../constants";
import { toggleSignInSignUp, setInputValues, submitFormUnsafe, waitForSTElement } from "../helpers";

export async function openWebauthnSignUp(page) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=webauthn`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);
}

export async function tryWebauthnSignUp(page, email) {
    await openWebauthnSignUp(page);

    await setInputValues(page, [{ name: "email", value: email }]);

    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 1000));
}

export async function tryWebauthnSignIn(page) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=webauthn`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 1000));
}

export async function openRecoveryAccountPage(page, email = null, shouldSubmit = true) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=webauthn`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);

    const recoverAccountLink = await waitForSTElement(page, "[data-supertokens~='recoverAccountTrigger']");
    await recoverAccountLink.click();
    await new Promise((res) => setTimeout(res, 1000));

    if (!shouldSubmit) {
        return;
    }

    await setInputValues(page, [{ name: "email", value: email }]);
    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 1000));
}

export async function signUpAndLogout(page, email) {
    await tryWebauthnSignUp(page, email);

    // We should be in the confirmation page now.
    await submitFormUnsafe(page);
    await new Promise((res) => setTimeout(res, 2000));

    // Find the div with classname logoutButton and click it using normal
    // puppeteer selector
    const logoutButton = await page.waitForSelector("div.logoutButton");
    await logoutButton.click();
    await new Promise((res) => setTimeout(res, 1000));
}

export async function signUpAndSendRecoveryEmail(page, email) {
    await signUpAndLogout(page, email);

    // Click the send recovery email button
    await openRecoveryAccountPage(page, email, true);
}

export async function getTokenFromEmail(email) {
    // Make an API call to get the token from the email
    // Since the email can contain special characters, we need to encode it
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/webauthn/get-token?email=${encodedEmail}`);
    const data = await response.json();
    return data.token;
}

export async function openRecoveryWithToken(page, token) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth/webauthn/recover?token=${token}`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
}
