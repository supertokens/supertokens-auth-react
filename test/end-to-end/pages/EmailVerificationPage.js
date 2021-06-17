import { Page } from "./Page";
import { TEST_CLIENT_BASE_URL } from "../../constants";

export class EmailVerificationPage extends Page {
    static async navigate(page, testContext) {
        const testParams = new URLSearchParams(testContext);

        const url = `${TEST_CLIENT_BASE_URL}/auth/verify-email?${testParams}`;

        const emailVerificationPage = new EmailVerificationPage(page, testContext);

        await emailVerificationPage.doNavigation(() => page.goto(url));

        return emailVerificationPage;
    }
}
