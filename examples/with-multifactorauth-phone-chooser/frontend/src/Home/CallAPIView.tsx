import axios from "axios";
import { getApiDomain } from "../config";
import { redirectToFactor } from "supertokens-auth-react/recipe/multifactorauth";
import { useNavigate } from "react-router-dom";
import MultiFactorAuth from "supertokens-auth-react/recipe/multifactorauth";

export default function CallAPIView() {
    const navigate = useNavigate();

    async function callAPIClicked() {
        let response = await axios.get(getApiDomain() + "/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    async function goToPhoneSetup() {
        await MultiFactorAuth.redirectToFactor({
            factorId: MultiFactorAuth.FactorIds.OTP_PHONE,
            setup: true,
            redirectBack: true,
            navigate,
        });
    }

    return (
        <div className="bottom-links-container call-api">
            <div onClick={callAPIClicked} className="sessionButton">
                Get session info
            </div>
            <div onClick={goToPhoneSetup} className="sessionButton">
                Add phone number
            </div>
        </div>
    );
}
