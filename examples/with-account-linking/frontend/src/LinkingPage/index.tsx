import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { redirectToThirdPartyLogin } from "supertokens-auth-react/recipe/thirdparty";
import { signUp } from "supertokens-auth-react/recipe/emailpassword";
import Passwordless, { clearLoginAttemptInfo } from "supertokens-auth-react/recipe/passwordless";

import { getApiDomain } from "../config";
import "./styles.css";

export const LinkingPage: React.FC = () => {
    const location = useLocation();
    const sessionContext = useSessionContext();

    const [userInfo, setUserInfo] = useState<any>();

    const [error, setError] = useState(new URLSearchParams(location.search).get("error"));
    const [success, setSuccess] = useState(new URLSearchParams(location.search).get("success"));

    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [showEnterOTPField, setShowEnterOTPField] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>("");

    const loadUserInfo = useCallback(async () => {
        const res = await fetch(`${getApiDomain()}/userInfo`);
        setUserInfo(await res.json());
    }, [setUserInfo]);

    const addPassword = useCallback(async () => {
        const resp = await signUp({
            formFields: [
                { id: "email", value: userInfo.user.emails[0] },
                { id: "password", value: password },
            ],
        });

        if (resp.status !== "OK") {
            setSuccess(null);
            setError("reason" in resp ? resp.reason : resp.status);
        } else {
            setSuccess("Successfully added password");
            setError(null);
            loadUserInfo();
        }
    }, [setError, setSuccess, password]);

    const addPhoneNumber = useCallback(async () => {
        if (phoneNumber === undefined) {
            return;
        }
        let cancel = false;
        try {
            let response = await Passwordless.createCode({
                phoneNumber,
                shouldTryLinkingWithSessionUser: true,
            });

            if (cancel) {
                return;
            }
            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                // the reason string is a user friendly message
                // about what went wrong. It can also contain a support code which users
                // can tell you so you know why their sign in / up was not allowed.
                window.alert(response.reason);
            } else {
                setShowEnterOTPField(true);
            }
        } catch (err: any) {
            setError(err.message);
        }

        return () => {
            cancel = true;
        };
    }, [setError, phoneNumber]);

    const verifyOtp = useCallback(async () => {
        if (phoneNumber === undefined) {
            return;
        }
        let cancel = false;
        try {
            let response = await Passwordless.consumeCode({
                userInputCode: otp,
            });

            if (cancel) {
                return;
            }
            if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                // the reason string is a user friendly message
                // about what went wrong. It can also contain a support code which users
                // can tell you so you know why their sign in / up was not allowed.
                window.alert("Incorrect OTP. Please try again");
            } else if (response.status !== "OK") {
                window.alert("OTP expired. Please try again");
                setShowEnterOTPField(false);
            } else {
                clearLoginAttemptInfo();
                setSuccess("Successfully added phone number");
                setShowEnterOTPField(false);
                loadUserInfo();
            }
        } catch (err: any) {
            setError(err.message);
        }

        return () => {
            cancel = true;
        };
    }, [setError, setSuccess, otp, loadUserInfo]);

    useEffect(() => {
        loadUserInfo();
    }, [loadUserInfo]);

    if (sessionContext.loading === true) {
        return null;
    }

    let passwordLoginMethods = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "emailpassword");
    let thirdPartyLoginMethods = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "thirdparty");
    let phoneLoginMethods = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "passwordless");

    return (
        <div className="fill" id="home-container">
            <NavLink to="/">Back</NavLink>
            {error && <div className="error-message"> {error} </div>}
            {success && <div className="success-message"> {success} </div>}

            {userInfo === undefined ? (
                <div> Login methods loading... </div>
            ) : (
                <ul className="loginMethods">
                    {passwordLoginMethods.map((lm: any) => (
                        <div key={lm.recipeUserId} className="emailpassword login-method">
                            <span className="recipeId">{lm.recipeId}</span>
                            <span className="userId">{lm.recipeUserId}</span>
                            <span className="contactInfo"> Email: {lm.email}</span>
                        </div>
                    ))}
                    {thirdPartyLoginMethods.map((lm: any) => (
                        <div key={lm.recipeUserId} className="thirdparty login-method">
                            <span className="recipeId">{lm.recipeId}</span>
                            <span className="userId">{lm.recipeUserId}</span>
                            <span className="contactInfo">
                                Provider: {lm.thirdParty.id} ({lm.thirdParty.userId}) - Email: {lm.email}
                            </span>
                        </div>
                    ))}
                    {phoneLoginMethods.map((lm: any) => (
                        <div key={lm.recipeUserId} className="passwordless login-method">
                            <span className="recipeId">{lm.recipeId}</span>
                            <span className="userId">{lm.recipeUserId}</span>
                            {lm.phoneNumber && <span className="contactInfo"> Phone number: {lm.phoneNumber}</span>}
                            {lm.email && <span className="contactInfo"> Email: {lm.email}</span>}
                        </div>
                    ))}
                </ul>
            )}
            {passwordLoginMethods?.length === 0 &&
                (thirdPartyLoginMethods?.some((lm: any) => lm.email !== undefined && lm.verified) ? (
                    <form
                        onSubmit={(ev) => {
                            addPassword();
                            ev.preventDefault();
                            return false;
                        }}>
                        <input type="password" onChange={(ev) => setPassword(ev.currentTarget.value)}></input>
                        <button type="submit"> Add password </button>
                    </form>
                ) : (
                    <div> Please add an email address by connecting a google account before adding a password </div>
                ))}
            {phoneLoginMethods?.length === 0 && (
                <form
                    onSubmit={(ev) => {
                        if (showEnterOTPField) {
                            verifyOtp();
                        } else {
                            addPhoneNumber();
                        }
                        ev.preventDefault();
                        return false;
                    }}>
                    {showEnterOTPField ? (
                        <div>
                            <input type="otp" value={otp} onChange={(ev) => setOtp(ev.currentTarget.value)}></input>
                            <button type="submit"> Submit OTP </button>
                        </div>
                    ) : (
                        <div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(ev) => setPhoneNumber(ev.currentTarget.value)}></input>
                            <button type="submit"> Add phone number </button>
                        </div>
                    )}
                </form>
            )}
            {thirdPartyLoginMethods?.length === 0 && (
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault();
                        return false;
                    }}>
                    <button onClick={() => redirectToThirdPartyLogin({ thirdPartyId: "google" })}>
                        Add Google account
                    </button>
                </form>
            )}
        </div>
    );
};
