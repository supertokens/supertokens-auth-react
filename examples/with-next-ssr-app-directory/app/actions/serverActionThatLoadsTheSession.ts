"use server";

import { cookies } from "next/headers";
import { getServerActionSession, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export async function serverActionThatLoadsTheSession() {
    const cookiesStore = await cookies();
    const { status, session } = await getServerActionSession(cookiesStore);
    if (status !== "valid") {
        // User is not authenticated return early or throw an error
        return;
    }

    // Perform the authenticated action
    const userId = session.userId;
    console.log("userId", userId);
    return Promise.resolve(true);
}
