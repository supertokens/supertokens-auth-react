import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {
    async function callAPIClicked() {
        let hasuraJWT = (await Session.getAccessTokenPayloadSecurely())["jwt"];

        // We can also use apollo client here instead.
        let response = await axios({
            method: "post",
            url: "https://informed-glowworm-75.hasura.app/v1/graphql",
            headers: {
                Authorization: `Bearer ${hasuraJWT}`,
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
