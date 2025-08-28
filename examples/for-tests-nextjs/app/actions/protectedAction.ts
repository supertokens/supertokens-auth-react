"use server";

import { cookies } from "next/headers";
import { getServerActionSession, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export async function protectedAction() {
    const cookiesStore = await cookies();
    const { status, session } = await getServerActionSession(cookiesStore);
    if (status !== "valid") {
        return;
    }

    return session.userId;
}
