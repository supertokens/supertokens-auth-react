"use client";

import { checkSSRSession } from "../actions/checkSSRSession";
import styles from "../page.module.css";

export const SSRButton = () => {
    return (
        <div
            style={{ marginTop: "20px" }}
            onClick={async (e) => {
                await checkSSRSession(e);
            }}
            className={styles.sessionButton}
        >
            Check SSR Session
        </div>
    );
};
