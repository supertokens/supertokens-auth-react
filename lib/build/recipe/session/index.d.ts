import { CreateRecipeFunction } from "../../types";
import { SessionUserInput } from "./types";
export default class SessionAPIWrapper {
    static init(config: SessionUserInput): CreateRecipeFunction;
}
export declare const init: typeof SessionAPIWrapper.init;
export { SessionAPIWrapper };
