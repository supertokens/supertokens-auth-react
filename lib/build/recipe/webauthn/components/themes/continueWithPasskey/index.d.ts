import type { ContinueFor, NormalisedConfig } from "../../../types";
interface ContinueWithPasskeyProps {
    continueFor: ContinueFor;
    continueWithPasskeyClicked: (continueFor: ContinueFor) => void;
    isLoading?: boolean;
}
export declare const ContinueWithPasskeyTheme: (
    props: {
        config: NormalisedConfig;
    } & ContinueWithPasskeyProps
) => import("react/jsx-runtime").JSX.Element;
export {};
