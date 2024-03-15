import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useNavigate } from '@remix-run/react';
import Session from "supertokens-auth-react/recipe/session/index.js";
import SuperTokens from "supertokens-auth-react";

export const TryRefreshComponent = () => {
    // Get the navigation function from Remix
    const navigate = useNavigate();
    // State to track if an error occurred during session refresh
    const [didError, setDidError] = useState(false);

    // Effect to attempt refreshing the session when the component mounts
    useEffect(() => {
        // Attempt to refresh the session
        void Session.attemptRefreshingSession()
            .then((hasSession) => {
                // If session refresh was successful, navigate to the current path
                if (hasSession) {
                    navigate(window.location.pathname);
                } else {
                    // If session refresh failed, redirect to authentication page
                    SuperTokens.redirectToAuth();
                }
            })
            // If an error occurs during session refresh, set didError to true
            .catch(() => {
                setDidError(true);
            });
    }, [navigate]); // Run the effect whenever navigate changes (not used in this effect)

    // If an error occurred during session refresh, display an error message
    if (didError) {
        return <div>Something went wrong, please reload the page</div>;
    }

    // Display a loading message while attempting to refresh the session
    return <div>Loading...</div>;
};
