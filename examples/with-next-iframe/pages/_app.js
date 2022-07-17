import "../styles/globals.css";
import React from "react";
import { useEffect } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { frontendConfig } from "../config/frontendConfig";

if (typeof window !== "undefined") {
    SuperTokensReact.init(frontendConfig());
}

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        async function doRefresh() {
            if (pageProps.fromSupertokens === "needs-refresh") {
                if (await Session.attemptRefreshingSession()) {
                    location.reload();
                } else {
                    // user has been logged out
                    redirectToAuth();
                }
            }
        }
        doRefresh();
    }, [pageProps.fromSupertokens]);
    if (pageProps.fromSupertokens === "needs-refresh") {
        return null;
    }
    return (
        <SuperTokensWrapper>
            <Component {...pageProps} />
        </SuperTokensWrapper>
    );
}

export default MyApp;
