/// <reference types="react" />
import type { SignInAndUpThemeProps } from "../../../types";
export declare const ThirdPartySignInAndUpProvidersForm: React.FC<
    SignInAndUpThemeProps<{
        id: string;
        buttonComponent: JSX.Element;
    }>
>;
export declare const ProvidersForm: import("react").ComponentType<
    SignInAndUpThemeProps<{
        id: string;
        buttonComponent: JSX.Element;
    }> & {
        children?: import("react").ReactNode;
    }
>;
