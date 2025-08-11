import { cookies, headers } from "next/headers";
import styles from "../page.module.css";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CelebrateIcon, SeparatorLine } from "../../assets/images";
import { CallAPIButton } from "./callApiButton";
import { LinksComponent } from "./linksComponent";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";

import { getServerComponentSession, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";
import { useState } from "react";
import { MiddlewareServerActionButton } from "./middlewareServerActionButton";
import { ServerActionButton } from "./serverActionButton";

init(ssrConfig());

export async function HomePage() {
    const cookiesStore = await cookies();
    const session = await getServerComponentSession(cookiesStore);
    console.log(session.userId);

    /**
     * SessionAuthForNextJS will handle proper redirection for the user based on the different session states.
     * It will redirect to the login page if the session does not exist etc.
     */
    return (
        <SessionAuthForNextJS>
            <div className={styles.homeContainer}>
                <div className={styles.mainContainer}>
                    <div className={`${styles.topBand} ${styles.successTitle} ${styles.bold500}`}>
                        <Image src={CelebrateIcon} alt="Login successful" className={styles.successIcon} /> Login
                        successful
                    </div>
                    <div className={styles.innerContent}>
                        <div>Your userID is:</div>
                        <div className={`${styles.truncate} ${styles.userId}`}>{session.userId}</div>
                        <CallAPIButton />
                        <ServerActionButton />
                    </div>
                </div>
                <LinksComponent />
                <Image className={styles.separatorLine} src={SeparatorLine} alt="separator" />
            </div>
        </SessionAuthForNextJS>
    );
}
