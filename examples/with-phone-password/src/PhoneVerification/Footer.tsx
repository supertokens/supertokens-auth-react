import Session from "supertokens-auth-react/recipe/session";
import { RecipeInterface } from "supertokens-auth-react/recipe/passwordless";
import { redirectToAuth } from "supertokens-auth-react";

export default function Footer(props: { recipeImplementation: RecipeInterface }) {
    return (
        <div
            onClick={async () => {
                await Session.signOut();

                /**
                 * This removes the saved phone number from localstorage so that
                 * next time, when the user logs in, their new phone number is sent the OTP
                 */
                await props.recipeImplementation.clearLoginAttemptInfo({
                    userContext: {},
                });

                await redirectToAuth({ redirectBack: false });
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
