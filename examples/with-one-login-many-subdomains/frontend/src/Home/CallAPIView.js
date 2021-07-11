import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { useHistory } from "react-router-dom";
import { getApiDomain } from "../utils";
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {
    const history = useHistory();

    async function callAPIClicked() {
        // this will also automatically refresh the session if needed
        let response = await axios.get(getApiDomain() + "/sessioninfo");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div>
    );
}
