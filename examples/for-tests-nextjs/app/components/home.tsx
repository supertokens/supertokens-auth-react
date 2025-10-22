import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CelebrateIcon, SeparatorLine } from "../../assets/images";
import { CallAPIButton } from "./callApiButton";
import { LinksComponent } from "./linksComponent";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";

import { getServerComponentSessionWithoutClaimValidation, init } from "supertokens-auth-react/nextjs/ssr";
import { ssrConfig } from "../config/ssr";
import { MiddlewareServerActionButton } from "./middlewareServerActionButton";
import { ProtectedActionButton } from "./protectedActionButton";
import { UnprotectedActionButton } from "./unprotectedActionButton";
import { SignOutButton } from "./signOutButton";

init(ssrConfig());

export async function HomePage() {
    const cookiesStore = await cookies();
    const session = await getServerComponentSessionWithoutClaimValidation(cookiesStore);

    return (
        <SessionAuthForNextJS>
            <div id="supertokens-root" data-testid="home-page">
                <div style={{ display: "flex", gap: "10px" }}>
                    <div>getServerComponentSession:</div>
                    <div data-testid="getServerComponentSession-userId">{session.userId}</div>
                </div>
                <ProtectedActionButton />
                <UnprotectedActionButton />
                <SignOutButton />
            </div>
        </SessionAuthForNextJS>
    );
}
