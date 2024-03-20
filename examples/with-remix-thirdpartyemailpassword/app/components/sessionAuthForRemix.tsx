import { useState, useEffect } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session/index.js";

type Props = Parameters<typeof SessionAuth>[0];

export const SessionAuthForRemix = (props: Props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return props.children;
    }

    return <SessionAuth {...props}>{props.children}</SessionAuth>;
};
