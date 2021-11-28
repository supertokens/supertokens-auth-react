import React from "react";
import { LoginAttemptInfo } from "../../../types";
export declare const ResendLinkButton: React.ComponentType<{
    loginAttemptInfo: LoginAttemptInfo;
    resendCodeTimeGap: number;
    onClick: () => void;
}>;
