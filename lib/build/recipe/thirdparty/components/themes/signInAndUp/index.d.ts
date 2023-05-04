/// <reference types="react" />
import type { SignInAndUpThemeProps } from "../../../types";
declare const SignInAndUpThemeWrapper: React.FC<
    SignInAndUpThemeProps<{
        id: string;
        buttonComponent: JSX.Element;
    }> & {
        userContext?: any;
    }
>;
export default SignInAndUpThemeWrapper;
