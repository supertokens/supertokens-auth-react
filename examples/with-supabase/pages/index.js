import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import dynamic from "next/dynamic";
import supertokensNode from "supertokens-node";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import { backendConfig } from "../config/backendConfig";
import Session from "supertokens-node/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getSupabase } from "../utils/supabase";

const ThirdPartyEmailPasswordAuthNoSSR = dynamic(
    new Promise((res) => res(ThirdPartyEmailPassword.ThirdPartyEmailPasswordAuth)),
    { ssr: false }
);

export async function getServerSideProps(context) {
    // this runs on the backend, so we must call init on supertokens-node SDK
    supertokensNode.init(backendConfig());
    let session;
    try {
        session = await Session.getSession(context.req, context.res);
    } catch (err) {
        if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
            return { props: { fromSupertokens: "needs-refresh" } };
        } else if (err.type === Session.Error.UNAUTHORISED) {
            return { props: {} };
        } else {
            throw err;
        }
    }

    let email = (await ThirdPartyEmailPasswordNode.getUserById(session.getUserId())).email;

    return {
        props: { email },
    };
}

export default function Home(props) {
    return (
        <ThirdPartyEmailPasswordAuthNoSSR>
            <ProtectedPage email={props.email} />
        </ThirdPartyEmailPasswordAuthNoSSR>
    );
}

function ProtectedPage({ email }) {
    // retrieve the accessTokenPayload using sessionContext on the frontend
    const { accessTokenPayload } = useSessionContext();

    const [userName, setUserName] = useState("");
    useEffect(() => {
        async function getUserName() {
            // retrieves the supabase client who's JWT contains users email, this will be
            // used by supabase to check that the user can only access table entries which contain their own email
            const supabase = getSupabase(accessTokenPayload.supabase_token);
            // retrieve the user's name from the users table whose email matches the email in the JWT
            const { data } = await supabase.from("users").select("name").eq("email", email);

            if (data.length == 0) {
                console.log("You need to add a user in supabase with the email: " + email);
                setUserName("Unknown user");
            } else {
                setUserName(data[0].name);
            }
        }
        getUserName();
    }, []);

    async function logoutClicked() {
        await ThirdPartyEmailPassword.signOut();
        ThirdPartyEmailPassword.redirectToAuth();
    }

    async function fetchUserData() {
        const res = await fetch("/api/user");
        if (res.status === 200) {
            const json = await res.json();
            alert(JSON.stringify(json));
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
                <p className={styles.description}>
                    You are authenticated with SuperTokens! (Email: {email})
                    <br />
                    Your user name retrieved from Supabase: {userName}
                </p>

                <div
                    style={{
                        display: "flex",
                        height: "70px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingLeft: "75px",
                        paddingRight: "75px",
                    }}>
                    <div
                        onClick={logoutClicked}
                        style={{
                            display: "flex",
                            width: "116px",
                            height: "42px",
                            backgroundColor: "#000000",
                            borderRadius: "10px",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}>
                        SIGN OUT
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        height: "70px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingLeft: "75px",
                        paddingRight: "75px",
                    }}>
                    <div
                        onClick={fetchUserData}
                        style={{
                            display: "flex",
                            width: "150px",
                            height: "42px",
                            backgroundColor: "rgb(247 54 54)",
                            borderRadius: "10px",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}>
                        FETCH USER API
                    </div>
                </div>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a href="https://github.com/vercel/next.js/tree/canary/examples" className={styles.card}>
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}>
                        <h3>Deploy &rarr;</h3>
                        <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                    </a>
                </div>
            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    );
}
