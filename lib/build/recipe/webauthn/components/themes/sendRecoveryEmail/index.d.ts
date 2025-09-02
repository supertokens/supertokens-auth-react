/// <reference types="react" />
import { SendRecoveryEmailScreen } from "../../../types";
import type { SendRecoveryEmailFormThemeProps } from "../../../types";
export declare const SendRecoveryEmailFormThemeInner: (
    props: SendRecoveryEmailFormThemeProps & {
        activeScreen: SendRecoveryEmailScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SendRecoveryEmailScreen>>;
    }
) => JSX.Element | null;
declare const SendRecoveryEmailFormTheme: (props: SendRecoveryEmailFormThemeProps) => JSX.Element;
export default SendRecoveryEmailFormTheme;
