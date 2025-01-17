/// <reference types="react" />
import type { ContinueOnSuccessParams, SignUpFormProps } from "../../../types";
export declare enum SignUpScreen {
    SignUpForm = 0,
    PasskeyConfirmation = 1,
    Error = 2,
    RecoverAccount = 3,
    RecoverEmailSent = 4,
}
export declare const SignUpFormInner: import("react").ComponentType<
    SignUpFormProps & {
        footer?: JSX.Element | undefined;
        onContinueClick: (params: ContinueOnSuccessParams) => void;
        setActiveScreen: React.Dispatch<React.SetStateAction<SignUpScreen>>;
    }
>;
export declare const SignUpForm: (
    props: SignUpFormProps & {
        footer?: JSX.Element | undefined;
        onContinueClick: (params: ContinueOnSuccessParams) => void;
        activeScreen: SignUpScreen;
        setActiveScreen: React.Dispatch<React.SetStateAction<SignUpScreen>>;
    }
) => JSX.Element | null;
