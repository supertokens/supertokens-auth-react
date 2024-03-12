import React from "react";
import type { TOTPMFACommonProps } from "../../../types";
export declare const CodeForm: React.ComponentType<
    TOTPMFACommonProps & {
        onSuccess: () => void;
        clearError: () => void;
        onError: (err: string) => void;
        footer?: JSX.Element | undefined;
    }
>;
