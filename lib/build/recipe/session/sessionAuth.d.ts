import React, { PropsWithChildren } from "react";
import { SessionClaimValidator } from "./types";
import { FeatureBaseProps } from "../../types";
declare type Props = FeatureBaseProps & {
    requireAuth?: boolean;
    redirectToLogin?: () => void;
    onSessionExpired?: () => void;
    overwriteDefaultClaimValidators?: (
        defaultClaimValidators: SessionClaimValidator<any>[]
    ) => SessionClaimValidator<any>[];
};
declare const SessionAuth: React.FC<PropsWithChildren<Props>>;
export default SessionAuth;
