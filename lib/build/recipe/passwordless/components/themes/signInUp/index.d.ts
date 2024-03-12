/// <reference types="react" />
import type { DynamicLoginMethodsContextValue } from "../../../../multitenancy/dynamicLoginMethodsContext";
import type { SignInUpProps } from "../../../types";
export declare enum SignInUpScreens {
    LinkSent = 0,
    EmailForm = 1,
    PhoneForm = 2,
    EmailOrPhoneForm = 3,
    UserInputCodeForm = 4,
}
declare function SignInUpThemeWrapper(props: SignInUpProps): JSX.Element;
export default SignInUpThemeWrapper;
export declare function getActiveScreen(
    props: Pick<SignInUpProps, "featureState" | "config">,
    currentDynamicLoginMethods: DynamicLoginMethodsContextValue
): SignInUpScreens;
