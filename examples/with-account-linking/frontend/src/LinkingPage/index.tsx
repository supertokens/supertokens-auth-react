import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { redirectToThirdPartyLogin } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

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

    const loadUserInfo = useCallback(async () => {
        const res = await fetch(`${getApiDomain()}/userInfo`);
        setUserInfo(await res.json());
    }, [setUserInfo]);

    const addPassword = useCallback(async () => {
        const resp = await fetch(`${getApiDomain()}/addPassword`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                password,
            }),
        });

        const respBody = await resp.json();
        if (respBody.status !== "OK") {
            setSuccess(null);
            setError(respBody.reason ?? respBody.message ?? respBody.status);
        } else {
            setSuccess("Successfully added password");
            setError(null);
        }
    }, [setError, setSuccess, password]);

    const addPhoneNumber = useCallback(async () => {
        const resp = await fetch(`${getApiDomain()}/addPhoneNumber`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                phoneNumber,
            }),
        });

        const respBody = await resp.json();
        if (respBody.status !== "OK") {
            setError(respBody.reason ?? respBody.message ?? respBody.status);
        } else {
            setSuccess("Successfully added password");
        }
        loadUserInfo();
    }, [setError, setSuccess, loadUserInfo, phoneNumber]);

    useEffect(() => {
        loadUserInfo();
    }, [loadUserInfo]);

    if (sessionContext.loading === true) {
        return null;
    }

    let passwordLoginMethods = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "emailpassword");
    let thirdPartyLoginMethod = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "thirdparty");
    let phoneLoginMethod = userInfo?.user.loginMethods.filter((lm: any) => lm.recipeId === "passwordless");

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
                    {thirdPartyLoginMethod.map((lm: any) => (
                        <div key={lm.recipeUserId} className="thirdparty login-method">
                            <span className="recipeId">{lm.recipeId}</span>
                            <span className="userId">{lm.recipeUserId}</span>
                            <span className="contactInfo">
                                Provider: {lm.thirdParty.id} ({lm.thirdParty.userId}) - Email: {lm.email}
                            </span>
                        </div>
                    ))}
                    {phoneLoginMethod.map((lm: any) => (
                        <div key={lm.recipeUserId} className="passwordless login-method">
                            <span className="recipeId">{lm.recipeId}</span>
                            <span className="userId">{lm.recipeUserId}</span>
                            {lm.phoneNumber && <span className="contactInfo"> Phone number: {lm.phoneNumber}</span>}
                            {lm.email && <span className="contactInfo"> Email: {lm.email}</span>}
                        </div>
                    ))}
                </ul>
            )}
            {passwordLoginMethods?.length === 0 && (
                <form
                    onSubmit={(ev) => {
                        addPassword();
                        ev.preventDefault();
                        return false;
                    }}>
                    <input type="password" onChange={(ev) => setPassword(ev.currentTarget.value)}></input>
                    <button type="submit"> Add password </button>
                </form>
            )}
            {phoneLoginMethod?.length === 0 && (
                <form
                    onSubmit={(ev) => {
                        addPhoneNumber();
                        ev.preventDefault();
                        return false;
                    }}>
                    <input type="tel" onChange={(ev) => setPhoneNumber(ev.currentTarget.value)}></input>
                    <button type="submit"> Add phone number </button>
                </form>
            )}
            {thirdPartyLoginMethod?.length === 0 && (
                <form>
                    <button onClick={() => redirectToThirdPartyLogin({ thirdPartyId: "google" })}>
                        Add Google account
                    </button>
                </form>
            )}
        </div>
    );
};
