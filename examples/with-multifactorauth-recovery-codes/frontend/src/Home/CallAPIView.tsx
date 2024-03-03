import axios from "axios";
import { getApiDomain } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CallAPIView() {
    const nav = useNavigate();
    async function callAPIClicked() {
        let response = await axios.get(getApiDomain() + "/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <>
            <div className="bottom-links-container">
                <div onClick={callAPIClicked} className="sessionButton">
                    Get session info
                </div>
                <div onClick={() => nav("/create-recovery-code")} className="sessionButton createRecoveryCode">
                    Create recovery code
                </div>
            </div>
        </>
    );
}
