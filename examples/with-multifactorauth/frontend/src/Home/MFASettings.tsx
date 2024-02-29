import { useCallback, useState } from "react";
import { useAsyncCall } from "../useAsyncCallOnMount";
import { getApiDomain } from "../config";
import { useNavigate } from "react-router-dom";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";

export default function MFASettings({ mfaRequirement }: { mfaRequirement: string }) {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState<{ metadata: { enable3FA: boolean; enable2FA: boolean } } | undefined>();
    const [error, setError] = useState<unknown>();
    const handleUserInfo = useCallback(
        async (res: Response): Promise<void> => {
            if (res.status === 200) {
                setUserInfo(await res.clone().json());
            } else {
                setError(new Error("Failed to load user info"));
            }
        },
        [setUserInfo, setError]
    );
    const updateUserInfo = useAsyncCall(async () => fetch(`${getApiDomain()}/userinfo`), handleUserInfo, setError);

    const submitMFA = (mfaInfo: { enable2FA: boolean; enable3FA: boolean }) => {
        fetch(`${getApiDomain()}/updateMFA`, {
            method: "POST",
            headers: new Headers([["content-type", "application/json"]]),
            body: JSON.stringify({
                ...mfaInfo,
            }),
        }).then(() => {
            updateUserInfo();
        });
    };

    if (error) {
        throw error;
    }

    return (
        <>
            {/* <pre className="userInfoJSON">{userInfo && JSON.stringify(userInfo, null, 2)}</pre> */}
            <div className="mfaInfo">This page requires {mfaRequirement}</div>
            <div className="mfaInfo login-requirements">
                {!userInfo
                    ? "Loading"
                    : userInfo.metadata.enable3FA
                    ? "3FA required during sign in"
                    : userInfo.metadata.enable2FA
                    ? "2FA required during sign in"
                    : "No MFA requirements for sign in"}
            </div>
            <div className="mfa-button-container set-requirements">
                <label>Set login MFA requirements:</label>
                <div onClick={() => submitMFA({ enable2FA: false, enable3FA: false })} className="sessionButton">
                    No MFA
                </div>
                <div onClick={() => submitMFA({ enable2FA: true, enable3FA: false })} className="sessionButton">
                    2FA
                </div>
                <div onClick={() => submitMFA({ enable2FA: false, enable3FA: true })} className="sessionButton">
                    3FA
                </div>
            </div>
            <div className="mfa-button-container factor-redirection">
                <label>Redirect to MFA pages:</label>
                <div
                    onClick={() => MultiFactorAuth.redirectToFactorChooser(true, undefined, nav)}
                    className="sessionButton">
                    Factor chooser
                </div>
                <div
                    onClick={() =>
                        MultiFactorAuth.redirectToFactor(MultiFactorAuth.FactorIds.OTP_PHONE, true, true, nav)
                    }
                    className="sessionButton">
                    Add phone-based OTP
                </div>
                <div
                    onClick={() => MultiFactorAuth.redirectToFactor(MultiFactorAuth.FactorIds.TOTP, true, true, nav)}
                    className="sessionButton">
                    Add TOTP
                </div>
            </div>
        </>
    );
}
