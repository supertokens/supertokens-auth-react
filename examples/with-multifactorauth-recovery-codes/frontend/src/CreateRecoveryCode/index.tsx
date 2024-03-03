import "./CreateRecoveryCode.css";
import { useState } from "react";
import { getApiDomain } from "../config";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function CreateRecoveryCode() {
    const [recoveryCode, setRecoveryCode] = useState();

    async function createRecoveryCode() {
        try {
            let response = await axios.post(getApiDomain() + "/createRecoveryCode");
            setRecoveryCode(response.data.recoveryCode);
        } catch (err: any) {
            if (err.isAxiosError) {
                window.alert(
                    `Call failed: ${err.response.statusText}(${err.response.status}): ${err.response.data.message}`
                );
            } else {
                window.alert(`Call failed`);
            }
        }
    }

    return (
        <div className="fill" id="home-container">
            <h2> Please create a recovery code </h2>
            {recoveryCode && <div className="recovery-code">{recoveryCode}</div>}
            <div className="bottom-links-container">
                <div onClick={createRecoveryCode} className="sessionButton createRecoveryCode">
                    Create recovery code
                </div>
                <NavLink to="/" className="sessionButton">
                    Go to Home page
                </NavLink>
            </div>
        </div>
    );
}
