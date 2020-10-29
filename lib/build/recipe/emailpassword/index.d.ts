import { CreateRecipeFunction } from "../../types";
import { EmailPasswordConfig } from "./types";
import SignInAndUp from "./components/signInAndUp/SignInAndUp";
import SignInAndUpTheme from "./components/signInAndUp/themes/default";
export default class EmailPasswordAPIWrapper {
    static init(config: EmailPasswordConfig): CreateRecipeFunction;
}
export { SignInAndUp, SignInAndUpTheme };
