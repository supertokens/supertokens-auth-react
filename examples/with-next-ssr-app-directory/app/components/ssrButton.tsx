"use client";

import { checkSSRSession } from "../actions/checkSSRSession";
import { authenticateServerAction, init } from "supertokens-auth-react/nextjs/ssr";
import styles from "../page.module.css";
import { ssrConfig } from "../config/ssr";

import { getAccessToken, attemptRefreshingSession } from "supertokens-web-js/recipe/session";

init(ssrConfig());

export const SSRButton = () => {
    return (
        <div
            style={{ marginTop: "20px" }}
            onClick={async (e) => {
                // const session = await getAccessToken();
                // console.log("sessionn in component", session);
                const result = await authenticateServerAction(checkSSRSession);
                console.log(result);
            }}
            className={styles.sessionButton}
        >
            Check SSR Session
        </div>
    );
};
