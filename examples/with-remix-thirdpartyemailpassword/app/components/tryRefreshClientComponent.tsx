import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import Session from "supertokens-auth-react/recipe/session/index.js";
import SuperTokens from "supertokens-auth-react";

export const TryRefreshComponent = () => {
    // Get the navigation function from Remix
    const navigate = useNavigate();
    // State to track if an error occurred during session refresh
    const [didError, setDidError] = useState(false);

    // Effect to attempt refreshing the session when the component mounts
    useEffect(() => {
        void Session.attemptRefreshingSession()
            .then((hasSession) => {
                if (hasSession) {
                    navigate(window.location.pathname);
                } else {
                    SuperTokens.redirectToAuth();
                }
            })
            .catch(() => {
                setDidError(true);
            });
    }, [navigate]);

    if (didError) {
        return <div>Something went wrong, please reload the page</div>;
    }
    return <div>Loading...</div>;
};
