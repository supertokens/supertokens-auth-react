"use client";

import { serverActionThatLoadsTheSession } from "../actions/serverActionThatLoadsTheSession";
import { confirmAuthenticationAndCallServerAction, init } from "supertokens-auth-react/nextjs/ssr";
import styles from "../page.module.css";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export const ServerActionButton = () => {
    return (
        <div
            style={{ marginTop: "20px" }}
            onClick={async (e) => {
                // The wrapper function ensures that the user is authenticated before calling the server action
                const result = await confirmAuthenticationAndCallServerAction(serverActionThatLoadsTheSession);
            }}
            className={styles.sessionButton}
        >
            Call Server Action
        </div>
    );
};
