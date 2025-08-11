import { getAppDirRequestHandler } from "supertokens-node/nextjs";
import Session, { refreshSessionWithoutRequestResponse } from "supertokens-node/recipe/session";
import { NextRequest, NextResponse } from "next/server";
import { ensureSuperTokensInit } from "../../../config/backend";
import { cookies } from "next/headers";

ensureSuperTokensInit();

const handleCall = getAppDirRequestHandler();

// input
// { refreshSessionWithoutRequestResponse }
// async function
//

export async function GET(request: NextRequest) {
    if (request.method === "GET" && request.url.includes("/session/refresh")) {
        return refreshSession(request);
    }
    const res = await handleCall(request);
    if (!res.headers.has("Cache-Control")) {
        // This is needed for production deployments with Vercel
        res.headers.set("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
    }
    return res;
}

export async function POST(request: NextRequest) {
    return handleCall(request);
}

export async function DELETE(request: NextRequest) {
    return handleCall(request);
}

export async function PUT(request: NextRequest) {
    return handleCall(request);
}

export async function PATCH(request: NextRequest) {
    return handleCall(request);
}

export async function HEAD(request: NextRequest) {
    return handleCall(request);
}

const refreshTokenCookieName = "sRefreshToken";
const refreshTokenHeaderName = "st-refresh-token";
async function refreshSession(request: NextRequest) {
    console.log("Attempting session refresh");
    const cookiesFromReq = await cookies();

    const refreshToken =
        request.cookies.get(refreshTokenCookieName)?.value || request.headers.get(refreshTokenHeaderName);
    if (!refreshToken) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    const redirectTo = new URL("/", request.url);

    try {
        const refreshResponse = await fetch(`http://localhost:3000/api/auth/session/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `sRefreshToken=${refreshToken}`,
            },
            credentials: "include",
        });
        // console.log("Performed session refresh request");
        // console.log(refreshResponse);
        // console.log(refreshResponse.headers);
        // console.log(await refreshResponse.text());

        const setCookieHeaders = refreshResponse.headers.getSetCookie();
        const frontToken = refreshResponse.headers.get("front-token");
        if (!frontToken) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        // TODO: Check for csrf token
        if (!setCookieHeaders.length) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        const response = NextResponse.redirect(redirectTo);
        let sAccessToken: string | null = null;
        let sRefreshToken: string | null = null;
        for (const header of setCookieHeaders) {
            if (header.includes("sAccessToken")) {
                const match = header.match(/sAccessToken=([^;]+)/);
                sAccessToken = match ? match[1] : null;
            }
            if (header.includes("sRefreshToken")) {
                const match = header.match(/sRefreshToken=([^;]+)/);
                sRefreshToken = match ? match[1] : null;
            }
            response.headers.append("set-cookie", header);
        }

        response.headers.append("set-cookie", `sFrontToken=${frontToken}`);
        response.headers.append("front-token", frontToken);
        response.headers.append("frontToken", frontToken);
        if (sAccessToken) {
            response.headers.append("sAccessToken", sAccessToken);

            cookiesFromReq.set("sAccessToken", sAccessToken);
        }
        if (sRefreshToken) {
            response.headers.append("sRefreshToken", sRefreshToken);

            cookiesFromReq.set("sRefreshToken", sRefreshToken);
        }

        cookiesFromReq.set("sFrontToken", frontToken);

        // console.log(sAccessToken, sRefreshToken);

        return response;
    } catch (err) {
        console.error("Error refreshing session");
        console.error(err);
        return NextResponse.redirect(new URL("/auth", request.url));
    }
}

// async function saveTokensFromHeaders(response: Response) {
//     logDebugMessage("saveTokensFromHeaders: Saving updated tokens from the response headers");
//
//     const refreshToken = response.headers.get("st-refresh-token");
//     if (refreshToken !== null) {
//         logDebugMessage("saveTokensFromHeaders: saving new refresh token");
//         await setToken("refresh", refreshToken);
//     }
//
//     const accessToken = response.headers.get("st-access-token");
//     if (accessToken !== null) {
//         logDebugMessage("saveTokensFromHeaders: saving new access token");
//         await setToken("access", accessToken);
//     }
//
//     const frontToken = response.headers.get("front-token");
//     if (frontToken !== null) {
//         logDebugMessage("saveTokensFromHeaders: Setting sFrontToken: " + frontToken);
//         await FrontToken.setItem(frontToken);
//         updateClockSkewUsingFrontToken({ frontToken, responseHeaders: response.headers });
//     }
//     const antiCsrfToken = response.headers.get("anti-csrf");
//     if (antiCsrfToken !== null) {
//         // At this point, the session has either been newly created or refreshed.
//         // Thus, there's no need to call getLocalSessionState with tryRefresh: true.
//         // Calling getLocalSessionState with tryRefresh: true will cause a refresh loop
//         // if cookie writes are disabled.
//         const tok = await getLocalSessionState(false);
//         if (tok.status === "EXISTS") {
//             logDebugMessage("saveTokensFromHeaders: Setting anti-csrf token");
//             await AntiCsrfToken.setItem(tok.lastAccessTokenUpdate, antiCsrfToken);
//         }
//     }
// }
