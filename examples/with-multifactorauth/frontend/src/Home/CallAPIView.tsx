import axios from "axios";
import { getApiDomain } from "../config";

export default function CallAPIView() {
    async function callAPIClicked() {
        let response = await axios.get(getApiDomain() + "/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    async function call2FAProtectedAPIClicked() {
        try {
            let response = await axios.get(getApiDomain() + "/sessioninfo-2fa");
            window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
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

    async function call3FAProtectedAPIClicked() {
        try {
            let response = await axios.get(getApiDomain() + "/sessioninfo-3fa");
            window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
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
        <div className="mfa-button-container call-api">
            <label>Call API:</label>
            <div onClick={callAPIClicked} className="sessionButton">
                Get session info
            </div>
            <div onClick={call2FAProtectedAPIClicked} className="sessionButton">
                Call 2FA protected API
            </div>
            <div onClick={call3FAProtectedAPIClicked} className="sessionButton">
                Call 3FA protected API
            </div>
        </div>
    );
}
