import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {
    async function callAPIClicked() {
        let hasuraJWT = (await Session.getAccessTokenPayloadSecurely())["jwt"];

        // this will also automatically refresh the session if needed
        let response = await axios.get("https://informed-glowworm-75.hasura.app/api/rest/userinfo", {
            headers: {
                Authorization: `Bearer ${hasuraJWT}`,
            },
        });
        window.alert("User Information:\n" + JSON.stringify(response.data, null, 2));
    }

    return (
        <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div>
    );
}
