// pages/auth/[[...path]].js
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "app/layouts/Layout";
import SuperTokens from "supertokens-auth-react";

const SuperTokensComponentNoSSR = dynamic(
    () =>
        Promise.resolve().then(() => {
            return () => SuperTokens.getRoutingComponent() || null;
        }),
    {
        ssr: false
    }
);

export default function Auth() {
    useEffect(() => {
        if (SuperTokens.canHandleRoute() === false) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div>
            <Layout>
                <SuperTokensComponentNoSSR />
            </Layout>
        </div>
    );
}
