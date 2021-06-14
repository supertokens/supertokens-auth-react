import { ST_ROOT_SELECTOR, TEST_CLIENT_BASE_URL } from "../../constants";

export class AuthPage {
    static async navigate(page, testContext = {}) {
        const testParams = new URLSearchParams(testContext);

        const url = `${TEST_CLIENT_BASE_URL}/auth?${testParams}`;
        console.log(url);

        await Promise.all([page.goto(url), page.waitForNavigation({ waitUntil: "networkidle0" })]);

        return new AuthPage(page);
    }

    constructor(page) {
        this.page = page;
    }

    async isFeatureMounted() {
        /**
         * @type {Element}
         */
        const root = await this.page.evaluate(
            (ST_ROOT_SELECTOR) => document.querySelector(ST_ROOT_SELECTOR),
            ST_ROOT_SELECTOR
        );

        return root !== null;
    }
}
