import React from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function Home() {
    const { userId } = useSessionContext();

    return <div>test</div>;
}
