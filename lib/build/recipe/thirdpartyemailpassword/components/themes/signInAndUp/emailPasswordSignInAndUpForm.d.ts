/// <reference types="react" />
import { SignInAndUpThemeProps as EmailPasswordSignInAndUpThemeProps } from "../../../../emailpassword/types";
export default function EmailPasswordSignInAndUpForm(props: EmailPasswordSignInAndUpThemeProps & {
    status: "SIGN_IN" | "SIGN_UP";
}): JSX.Element;
