import { CookieHandler, CookieHandlerInput } from "supertokens-website/utils/cookieHandling/types";
export default class SuperTokensCookieHandler {
    private static instance?;
    cookieHandler: CookieHandler;
    constructor(cookieHandlerInput?: CookieHandlerInput);
    static init(cookieHandlerInput?: CookieHandlerInput): void;
    static getInstanceOrThrow(): SuperTokensCookieHandler;
}
