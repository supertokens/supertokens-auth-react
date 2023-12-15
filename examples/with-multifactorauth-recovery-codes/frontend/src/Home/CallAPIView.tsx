import axios from "axios";
import { getApiDomain } from "../config";
import { useState } from "react";

export default function CallAPIView() {
    const [recoveryCode, setRecoveryCode] = useState();

    async function callAPIClicked() {
        let response = await axios.get(getApiDomain() + "/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

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
        <>
            {recoveryCode && <div className="recovery-code">{recoveryCode}</div>}
            <div className="bottom-links-container">
                <div onClick={callAPIClicked} className="sessionButton">
                    Get session info
                </div>
                <div onClick={createRecoveryCode} className="sessionButton createRecoveryCode">
                    Create recovery code
                </div>
            </div>
        </>
    );
}
