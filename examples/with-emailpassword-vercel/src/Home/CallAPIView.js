import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {
    async function callAPIClicked() {
        const protocol = process.env.REACT_APP_VERCEL_URL !== undefined ? 'https://': '';
        // this will also automatically refresh the session if needed
        let response = await axios.get(protocol + getApiDomain() + "/api/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div>
    );
}
