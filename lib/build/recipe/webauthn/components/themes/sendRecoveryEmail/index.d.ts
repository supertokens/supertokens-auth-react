/// <reference types="react" />
import type { SendRecoveryEmailFormThemeProps } from "../../../types";
export declare enum SendRecoveryEmailScreen {
    RecoverAccount = 0,
    RecoverEmailSent = 1,
}
export declare const SendRecoveryEmailFormThemeInner: (
    props: SendRecoveryEmailFormThemeProps & {
        activeScreen: SendRecoveryEmailScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    }
) => JSX.Element | null;
declare const SendRecoveryEmailFormTheme: (props: SendRecoveryEmailFormThemeProps) => JSX.Element;
export default SendRecoveryEmailFormTheme;
