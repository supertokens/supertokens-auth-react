"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    getServerComponentSession,
    getServerActionSession,
    init,
    AuthenticatedServerAction,
} from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export const serverActionThatReceivesTheSession: AuthenticatedServerAction<() => Promise<boolean>> = async (
    session
) => {
    console.log("session", session);

    return Promise.resolve(true);
};
