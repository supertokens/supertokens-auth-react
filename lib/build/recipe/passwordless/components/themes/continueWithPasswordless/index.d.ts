/// <reference types="react" />
import type { PartialAuthComponentProps } from "../../../../../types";
import type { NormalisedConfig } from "../../../types";
export declare const ContinueWithPasswordlessTheme: (
    props: PartialAuthComponentProps & {
        config: NormalisedConfig;
        continueWithPasswordlessClicked: () => void;
    }
) => JSX.Element;
