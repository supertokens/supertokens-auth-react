import { TEST_CLIENT_BASE_URL } from "../constants";
import { toggleSignInSignUp, setInputValues, submitForm } from "../helpers";

export async function tryWebauthnSignUp(page, email) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=webauthn`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await toggleSignInSignUp(page);

    await setInputValues(page, [{ name: "email", value: email }]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}

export async function tryWebauthnSignIn(page) {
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=webauthn`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await submitForm(page);
    await new Promise((res) => setTimeout(res, 1000));
}
