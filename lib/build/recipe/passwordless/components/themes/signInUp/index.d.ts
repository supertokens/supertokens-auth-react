/// <reference types="react" />
import type { SignInUpProps } from "../../../types";
export declare enum SignInUpScreens {
    EmailForm = 0,
    PhoneForm = 1,
    EmailOrPhoneForm = 2,
}
declare function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element;
export default SignInUpThemeWrapper;
export declare function getActiveScreen(factorIds: string[]): SignInUpScreens;
