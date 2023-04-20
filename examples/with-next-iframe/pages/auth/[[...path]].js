import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { getRoutingComponent, canHandleRoute } from "supertokens-auth-react/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { redirectToAuth } from "supertokens-auth-react";

const SuperTokensComponentNoSSR = dynamic(
    new Promise((res) => res(() => getRoutingComponent([EmailVerificationPreBuiltUI, EmailPasswordPreBuiltUI]))),
    {
        ssr: false,
    }
);

export default function Auth() {
    useEffect(() => {
        if (canHandleRoute([EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI]) === false) {
            redirectToAuth();
        }
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <SuperTokensComponentNoSSR />
            </main>
        </div>
    );
}
