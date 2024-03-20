import { PreParsedRequest, CollectingResponse } from "supertokens-node/framework/custom/index.js";
import { HTTPMethod } from "supertokens-node/types";
import Session, { SessionContainer, VerifySessionOptions } from "supertokens-node/lib/build/recipe/session/index.js";
import SessionRecipe from "supertokens-node/lib/build/recipe/session/recipe.js";
import { availableTokenTransferMethods } from "supertokens-node/lib/build/recipe/session/constants.js";
import { getToken } from "supertokens-node/lib/build/recipe/session/cookieAndHeaders.js";
import { parseJWTWithoutSignatureVerification } from "supertokens-node/lib/build/recipe/session/jwt.js";

export function getCookieFromRequest(request: Request) {
    const cookies: Record<string, string> = {};
    const cookieHeader = request.headers.get("Cookie");
    if (cookieHeader) {
        const cookieStrings = cookieHeader.split(";");
        for (const cookieString of cookieStrings) {
            const [name, value] = cookieString.trim().split("=");
            cookies[name] = decodeURIComponent(value);
        }
    }
    return cookies;
}

export function getQueryFromRequest(request: Request) {
    const query: Record<string, string> = {};
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    searchParams.forEach((value, key) => {
        query[key] = value;
    });
    return query;
}
export function createPreParsedRequest(request: Request): PreParsedRequest {
    return new PreParsedRequest({
        cookies: getCookieFromRequest(request),
        url: request.url as string,
        method: request.method as HTTPMethod,
        query: getQueryFromRequest(request),
        headers: request.headers,
        getFormBody: async () => {
            return await request.formData();
        },
        getJSONBody: async () => {
            return await request.json();
        },
    });
}

export async function getSessionDetails(
    request: Request,
    options?: VerifySessionOptions,
    userContext?: Record<string, unknown>
): Promise<{
    session: SessionContainer | undefined;
    hasToken: boolean;
    hasInvalidClaims: boolean;
    nextResponse?: Response;
}> {
    console.log("Getting session details...");

    const baseRequest = createPreParsedRequest(request);
    console.log("Pre-parsed request created.");

    const baseResponse = new CollectingResponse();
    console.log("Collecting response object created.");

    // Possible introp issue.
    const recipe = (SessionRecipe as any).default.instance;
    console.log("Session recipe instance obtained.");

    const tokenTransferMethod = recipe.config.getTokenTransferMethod({
        req: baseRequest,
        forCreateNewSession: false,
        userContext,
    });
    console.log("Token transfer method determined:", tokenTransferMethod);

    const transferMethods = tokenTransferMethod === "any" ? availableTokenTransferMethods : [tokenTransferMethod];
    console.log("Available token transfer methods:", transferMethods);

    const hasToken = transferMethods.some((transferMethod) => {
        const token = getToken(baseRequest, "access", transferMethod);
        if (!token) {
            console.log("Token not found for transfer method:", transferMethod);
            return false;
        }
        try {
            parseJWTWithoutSignatureVerification(token);
            console.log("Token parsed successfully.");
            return true;
        } catch {
            console.log("Failed to parse token:", token);
            return false;
        }
    });
    console.log("Does the user have a token?", hasToken);

    try {
        const session = await Session.getSession(baseRequest, baseResponse, options, userContext);
        console.log("Session obtained:", session);
        return {
            session,
            hasInvalidClaims: false,
            hasToken,
        };
    } catch (err) {
        console.error("Error while getting session:", err);
        if (Session.Error.isErrorFromSuperTokens(err)) {
            console.log("SuperTokens error detected.");
            return {
                hasToken,
                hasInvalidClaims: err.type === Session.Error.INVALID_CLAIMS,
                session: undefined,
                nextResponse: new Response("Authentication required", {
                    status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
                }),
            };
        } else {
            console.error("Unknown error occurred:", err);
            throw err;
        }
    }
}
