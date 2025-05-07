"use client";

import { serverActionThatReceivesTheSession } from "../actions/serverActionThatReceivesTheSession";
import { authenticateServerAction, init } from "supertokens-auth-react/nextjs/ssr";
import styles from "../page.module.css";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export const MiddlewareServerActionButton = () => {
    return (
        <div
            style={{ marginTop: "20px" }}
            onClick={async (e) => {
                const result = await authenticateServerAction(serverActionThatReceivesTheSession);
                console.log(result);
            }}
            className={styles.sessionButton}
        >
            Server Action that receives the session
        </div>
    );
};
