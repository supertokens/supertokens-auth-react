import { PreParsedRequest, CollectingResponse } from "supertokens-node/framework/custom/index.js";
import { HTTPMethod } from "supertokens-node/types";
import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";
import Session from "supertokens-node/lib/build/recipe/session/index.js";

export function getCookieFromRequest(request: Request) {
  const cookies: Record<string, string> = {};
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookieStrings = cookieHeader.split(";");
    for (const cookieString of cookieStrings) {
      const [name, value] = cookieString.trim().split("=");
      cookies[name] = value;
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
  request: Request
): Promise<{ session: SessionContainerInterface | null; error: Error | null }> {
  const preParsedRequest = createPreParsedRequest(request);
  const baseResponse = new CollectingResponse();
  const options = {};
  const userContext = {};

  try {
    const session = await Session.getSession(
      preParsedRequest,
      baseResponse,
      options,
      userContext
    );
    return { session, error: null };
  } catch (error) {
    return {
      session: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
