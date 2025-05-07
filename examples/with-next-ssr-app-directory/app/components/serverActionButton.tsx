"use client";

import { serverActionThatLoadsTheSession } from "../actions/serverActionThatLoadsTheSession";
import styles from "../page.module.css";

export const ServerActionButton = () => {
    return (
        <div
            style={{ marginTop: "20px" }}
            onClick={async (e) => {
                const result = await serverActionThatLoadsTheSession();
                console.log(result);
            }}
            className={styles.sessionButton}
        >
            Server Action that loads the session
        </div>
    );
};
