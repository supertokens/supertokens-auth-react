import type { PartialAuthComponentProps } from "../../../../../types";
import type { ContinueFor, NormalisedConfig } from "../../../types";
interface ContinueWithPasskeyProps {
    continueFor: ContinueFor;
    continueWithPasskeyClicked: (continueFor: ContinueFor) => void;
}
export declare const ContinueWithPasskeyTheme: (
    props: PartialAuthComponentProps & {
        config: NormalisedConfig;
    } & ContinueWithPasskeyProps
) => import("react/jsx-runtime").JSX.Element;
export {};
