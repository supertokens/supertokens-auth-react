"use server";

import { cookies } from "next/headers";
import { getServerActionSessionWithoutClaimValidation, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";

init(ssrConfig());

export async function protectedAction() {
    const cookiesStore = await cookies();
    const { status, session } = await getServerActionSessionWithoutClaimValidation(cookiesStore);

    if (status !== "valid") {
        return { status, userId: undefined };
    }

    return { status, userId: session.userId };
}
