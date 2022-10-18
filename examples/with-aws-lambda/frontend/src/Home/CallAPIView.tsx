import axios from "axios";
import { getAPIDomain } from "../App";

export default function CallAPIView() {
    async function callAPIClicked() {
        // this will also automatically refresh the session if needed
        let response = await axios.get(getAPIDomain() + "/dev/user");
        window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div>
    );
}
