import "./SelectPhone.css";
import { useAsyncCall } from "../useAsyncCallOnMount";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { getApiDomain } from "../config";
import { User } from "supertokens-web-js/types";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";
import Passwordless from "supertokens-auth-react/recipe/passwordless";

export default function SelectPhone() {
    const nav = useNavigate();
    const [userInfo, setUserInfo] = useState<{ user: User } | undefined>();
    const [error, setError] = useState<unknown>();
    const handleUserInfo = useCallback(
        async (res: Response): Promise<void> => {
            if (res.status === 200) {
                const loadedInfo = await res.clone().json();
                if (loadedInfo.user.phoneNumbers.length === 0) {
                    await MultiFactorAuth.redirectToFactor(MultiFactorAuth.FactorIds.OTP_PHONE, true, false, nav);
                } else if (loadedInfo.user.phoneNumbers.length === 1) {
                    await Passwordless.createCode({ phoneNumber: loadedInfo.user.phoneNumbers[0] });
                    await MultiFactorAuth.redirectToFactor(MultiFactorAuth.FactorIds.OTP_PHONE, false, false, nav);
                } else {
                    setUserInfo(loadedInfo);
                }
            } else {
                setError(new Error("Failed to load user info"));
            }
        },
        [setUserInfo, setError]
    );
    useAsyncCall(async () => fetch(`${getApiDomain()}/userinfo`), handleUserInfo, setError);

    if (error) {
        throw error;
    }

    if (userInfo === undefined) {
        return (
            <div className="fill" id="home-container">
                Loading
            </div>
        );
    }

    return (
        <div className="fill" id="home-container">
            <h2> Select phone number </h2>
            <ul className="phoneNumberList">
                {userInfo.user.phoneNumbers.map((number) => (
                    <li
                        className="phoneNumberCard"
                        onClick={() => {
                            Passwordless.createCode({ phoneNumber: number })
                                .then(async (info) => {
                                    if (info.status !== "OK") {
                                        setError(info.reason);
                                    } else {
                                        await Passwordless.setLoginAttemptInfo({
                                            attemptInfo: {
                                                ...info,
                                                lastResend: Date.now(),
                                                contactMethod: "PHONE",
                                                contactInfo: number,
                                                hasOtherPhoneNumbers: true,
                                            },
                                        });
                                        return MultiFactorAuth.redirectToFactor(
                                            MultiFactorAuth.FactorIds.OTP_PHONE,
                                            false,
                                            false,
                                            nav
                                        );
                                    }
                                })
                                .catch(setError);
                        }}>
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
}
