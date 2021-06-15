import { ST_ROOT_SELECTOR } from "../../constants";

export class Page {
    constructor(page, testContext) {
        this.page = page;
        this.testContext = testContext;
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
