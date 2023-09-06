import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAsyncCallOnMount } from "../useAsyncCallOnMount";

export const LinkingCallbackPage: React.FC = () => {
    const navigate = useNavigate();

    useAsyncCallOnMount(
        () =>
            ThirdPartyEmailPassword.thirdPartySignInAndUp({
                options: {
                    preAPIHook: async (input) => {
                        const url = new URL(input.url);
                        url.pathname = "/addThirdPartyUser";
                        input.url = url.toString();
                        return input;
                    },
                },
            }),
        (resp) => {
            if (resp.status === "OK") {
                navigate(`/link?success=${encodeURIComponent("Successfully added third-party account")}`);
            } else if ("reason" in resp) {
                navigate(`/link?error=${encodeURIComponent(resp.reason)}`);
            } else {
                navigate(`/link?error=${encodeURIComponent(resp.status)}`);
            }
        }
    );

    return (
        <div className="fill" id="home-container">
            Linking...
        </div>
    );
};
