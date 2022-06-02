import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { getApiDomain } from "../App";
import { RecipeInterface } from "supertokens-auth-react/recipe/passwordless";
Session.addAxiosInterceptors(axios);

export default function Footer(props: { recipeImplementation: RecipeInterface }) {
    return (
        <div
            onClick={async () => {
                await Session.signOut({
                    userContext: {
                        forceOriginalCheck: true,
                    },
                });

                /**
                 * This removes the saved phone number from localstorage so that
                 * next time, when the user logs in, their new phone number is sent the OTP
                 */
                await props.recipeImplementation.clearLoginAttemptInfo({
                    userContext: {},
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
