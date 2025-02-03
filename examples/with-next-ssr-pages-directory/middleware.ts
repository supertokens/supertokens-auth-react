import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionContainer, VerifySessionOptions } from "supertokens-node/recipe/session";
import { withSession } from "supertokens-node/nextjs";
import { ssrConfig } from "./config/ssrConfig";
import { refreshSession, revokeSession } from "supertokens-auth-react/nextjs/middleware";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";

const CURRENT_PATH_COOKIE_NAME = "sCurrentPath";
const FORCE_LOGOUT_PATH_PARAM_NAME = "forceLogout";

export default superTokensMiddleware(ssrConfig());

// This function should be exposed by the node sdk
function superTokensMiddleware(
    config: SuperTokensConfig,
    options?: VerifySessionOptions
): (request: NextRequest & { session?: SessionContainer }) => Promise<Response | void> {
    // Determined by checking if the frontend and backend are on the same domain
    const usesTheNextjsApiAsTheAuthenticationServer = true;

    return async (request: NextRequest & { session?: SessionContainer }) => {
        if (request.nextUrl.pathname.startsWith("/api/auth/session/refresh") && request.method === "GET") {
            return refreshSession(config, request);
        }

        if (request.nextUrl.pathname.startsWith("/api") && usesTheNextjsApiAsTheAuthenticationServer) {
            if (request.headers.has("x-user-id")) {
                console.warn(
                    "The FE tried to pass x-user-id, which is only supposed to be a backend internal header. Ignoring."
                );
                request.headers.delete("x-user-id");
            }

            if (request.nextUrl.pathname.startsWith("/api/auth")) {
                // this hits our pages/api/auth/* endpoints
                return NextResponse.next();
            }

            return withSession(
                request,
                async (err, session) => {
                    if (err) {
                        return NextResponse.json(err, { status: 500 });
                    }

                    if (session === undefined) {
                        return NextResponse.next();
                    }
                    return NextResponse.next({
                        headers: {
                            "x-user-id": session.getUserId(),
                        },
                    });
                },
                options
            );
        }

        if (
            request.nextUrl.pathname.startsWith("/auth") &&
            request.nextUrl.searchParams.get(FORCE_LOGOUT_PATH_PARAM_NAME) === "true"
        ) {
            return revokeSession(config, request);
        }

        // Save the current path so that we can use it during SSR
        // Used to redirect the user to the correct path after login/refresh
        // https://github.com/vercel/next.js/issues/43704#issuecomment-2090798307
        // TL;DR: You can not access pathname in SSR and requests that originate from redirect()
        const response = new Response(null, {});
        response.headers.set("x-middleware-next", "1");
        response.headers.append(
            "set-cookie",
            `${CURRENT_PATH_COOKIE_NAME}=${request.nextUrl.pathname}; Path=/; HttpOnly; SameSite=Strict`
        );
        return response;
    };
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|sw.js|workbox-|public/).*)",
    ],
};
