"use server";

import { cookies } from "next/headers";
import { getServerActionSession, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export async function serverActionThatLoadsTheSession() {
    const cookiesStore = await cookies();
    const session = await getServerActionSession(cookiesStore);
    console.log("session", session);
    return Promise.resolve(true);
}
