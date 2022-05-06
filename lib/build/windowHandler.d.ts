import { WindowHandler, WindowHandlerInput } from "supertokens-website/utils/windowHandling/types";
export default class SuperTokensWindowHandler {
    private static instance?;
    windowHandler: WindowHandler;
    constructor(windowHandlerInput?: WindowHandlerInput);
    static init(windowHandlerInput?: WindowHandlerInput): void;
    static getInstanceOrThrow(): SuperTokensWindowHandler;
}
