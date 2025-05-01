"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerComponentSession, getServerActionSession, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export async function checkSSRSession(session) {
    // const session = await getServerActionSession(cookiesStore);

    console.log("session", session);
    return Promise.resolve(true);
}
