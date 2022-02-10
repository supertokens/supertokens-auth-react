import React from "react";
import { LoginAttemptInfo } from "../../../types";
export declare const ResendButton: React.ComponentType<{
    loginAttemptInfo: LoginAttemptInfo;
    resendEmailOrSMSGapInSeconds: number;
    onClick: () => void;
}>;
