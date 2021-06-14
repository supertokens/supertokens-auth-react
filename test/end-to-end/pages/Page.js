import { ST_ROOT_SELECTOR, TEST_CLIENT_BASE_URL } from "../../constants";

export class Page {
    static async gotoAndWait(page, path) {
        return Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${path}`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    }

    constructor(page) {
        this.page = page;
    }

    doNavigation(fn) {
        return Promise.all([fn(), this.page.waitForNavigation({ waitUntil: "networkidle0" })]);
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
