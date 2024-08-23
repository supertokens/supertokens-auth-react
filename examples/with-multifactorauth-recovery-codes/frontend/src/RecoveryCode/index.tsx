import "./RecoveryCode.css";
import { useAsyncCall } from "../useAsyncCallOnMount";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { getApiDomain } from "../config";
import { User } from "supertokens-web-js/types";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import axios from "axios";

export default function RecoveryCode() {
    const nav = useNavigate();
    const [code, setCode] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    async function consumeCode() {
        const reset = await axios.post(getApiDomain() + "/useRecoveryCode", { recoveryCode: code });
        if (reset.data.status !== "OK") {
            setError("Recovery code not found");
        } else {
            await MultiFactorAuth.redirectToFactor({
                factorId: "totp",
                forceSetup: true,
                redirectBack: false,
                navigate: nav,
            });
        }
    }

    return (
        <div className="fill" id="home-container">
            {error && <div className="error"> {error}</div>}
            <form
                onSubmit={(ev) => {
                    consumeCode().catch((err) => setError(err.message));
                    ev.preventDefault();
                    return false;
                }}
                className="recoveryForm">
                <div className="inputGroup">
                    <label htmlFor="recoveryCode"> Recovery code </label>
                    <input type="text" name="recoveryCode" onChange={(ev) => setCode(ev.currentTarget.value)}></input>
                </div>
                <button type="submit" className="sessionButton">
                    Reset TOTP
                </button>
                <a onClick={() => nav(-1)}> Back </a>
            </form>
        </div>
    );
}
