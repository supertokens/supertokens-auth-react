import { Page } from "./Page";
import { TEST_CLIENT_BASE_URL } from "../../constants";

export class ResetPasswordPage extends Page {
    static async navigate(page, testContext) {
        const testParams = new URLSearchParams(testContext);

        const url = `${TEST_CLIENT_BASE_URL}/auth/reset-password?${testParams}`;

        const resetPasswordPage = new ResetPasswordPage(page);
        await resetPasswordPage.doNavigation(() => page.goto(url));

        return resetPasswordPage;
    }
}
