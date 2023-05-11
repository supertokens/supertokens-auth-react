import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

export default function CallAPIView() {
    async function callAPIClicked() {
        let hasuraTokenPayload = await Session.getAccessTokenPayloadSecurely();
        let jwt = null;
        if (hasuraTokenPayload.jwt === undefined) {
            jwt = await Session.getAccessToken();
        } else {
            // This branch is only required if there are valid access tokens created before the update
            // It can be removed after the validity period ends
            jwt = hasuraTokenPayload.jwt;
        }
        // We can also use apollo client here instead.
        let response = await axios({
            method: "post",
            url: "https://funky-blowfish-90.hasura.app/v1/graphql",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "content-type": "application/json",
            },
            data: {
                query: `query MyQuery {
                    user_info {
                        email,
                        name
                    }
                }`,
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
