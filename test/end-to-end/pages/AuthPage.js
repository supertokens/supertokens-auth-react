import { Page } from "./Page";
import { defaultSignUp, getSubmitFormButton, setInputValues, toggleSignInSignUp } from "../../helpers";
import { TEST_CLIENT_BASE_URL } from "../../constants";

export class AuthPage extends Page {
    static async navigate(page, testContext = {}) {
        const testParams = new URLSearchParams(testContext);

        const url = `${TEST_CLIENT_BASE_URL}/auth?${testParams}`;

        const authPage = new AuthPage(page, testContext);

        await authPage.doNavigation(() => page.goto(url));

        return authPage;
    }

    getSubmitFormButton() {
        return getSubmitFormButton(this.page);
    }

    async signIn(email, password) {
        await this.setInputForm(email, password);

        await this.submitForm();
    }

    async signUp() {
        await toggleSignInSignUp(this.page);
        await defaultSignUp(this.page);
    }

    async setInputForm(email, password) {
        await setInputValues(this.page, [
            { name: "email", value: email },
            { name: "password", value: password },
        ]);
    }

    async submitForm() {
        const submitButton = await this.getSubmitFormButton(this.page);
        await this.doNavigation(() => submitButton.click());
    }
}
