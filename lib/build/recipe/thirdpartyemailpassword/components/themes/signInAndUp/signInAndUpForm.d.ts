/// <reference types="react" />
import { SignInAndUpThemeProps as EmailPasswordSignInAndUpThemeProps } from "../../../../emailpassword/types";
export default function SignInAndUpForm(props: EmailPasswordSignInAndUpThemeProps & {
    status: "SIGN_IN" | "SIGN_UP";
}): JSX.Element;
