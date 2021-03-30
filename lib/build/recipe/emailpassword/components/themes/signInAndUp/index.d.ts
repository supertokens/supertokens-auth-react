import * as React from "react";
import { SignInAndUpThemeProps } from "../../../types";
export declare class SignInAndUpTheme extends React.PureComponent<SignInAndUpThemeProps, {
    isSignUp: boolean;
}> {
    constructor(props: SignInAndUpThemeProps);
    render(): JSX.Element;
}
declare function SignInAndUpThemeWrapper(props: SignInAndUpThemeProps): JSX.Element;
export default SignInAndUpThemeWrapper;
