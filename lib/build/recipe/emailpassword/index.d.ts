import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./components/SignInAndUp";
import SignInAndUpTheme from "./components/SignInAndUpTheme";
export default class EmailPasswordAPIWrapper {
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
}
export { SignInAndUp, SignInAndUpTheme };
