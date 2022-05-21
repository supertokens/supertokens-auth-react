import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { getApiDomain } from "../App";
Session.addAxiosInterceptors(axios);

export default function Footer() {
    return (
        <div
            onClick={async () => {
                /**
                 * We call the API manually here because if we use EmailPassword.signOut,
                 * if first checks if a session exists. And if it doesn't we don't call the API.
                 *
                 * Since we have changed the doesSessionExist logic to return false for this route,
                 * it won't call the sign out API even though a session exist. The only way to force
                 * it to call it would be via user context, which we don't have yet (on the frontend).
                 *
                 * So we call the API here manually.
                 *
                 */
                await axios.post(
                    getApiDomain() + "/auth/signout",
                    {},
                    {
                        headers: {
                            rid: "session",
                        },
                    }
                );
                redirectToAuth({
                    redirectBack: false,
                });
            }}
            style={{
                marginTop: "10px",
                color: "#888888",
                cursor: "pointer",
            }}>
            Change phone number
        </div>
    );
}
