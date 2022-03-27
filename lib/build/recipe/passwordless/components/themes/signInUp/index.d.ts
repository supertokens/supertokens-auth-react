/// <reference types="react" />
import { SignInUpProps } from "../../../types";
export declare enum SignInUpScreens {
    CloseTab = 0,
    LinkSent = 1,
    EmailForm = 2,
    PhoneForm = 3,
    EmailOrPhoneForm = 4,
    UserInputCodeForm = 5,
}
declare function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element;
export default SignInUpThemeWrapper;
export declare function getActiveScreen(props: Pick<SignInUpProps, "featureState" | "config">): SignInUpScreens;
