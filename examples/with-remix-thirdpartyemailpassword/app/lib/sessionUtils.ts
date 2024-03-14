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
  request: Request,
  options?: VerifySessionOptions,
  userContext?: Record<string, unknown>
): Promise<{
  session: SessionContainer | undefined;
  hasToken: boolean;
  hasInvalidClaims: boolean;
  nextResponse?: Response;
}> {
  const baseRequest = createPreParsedRequest(request);
  const baseResponse = new CollectingResponse();

  const recipe = SessionRecipe.getInstanceOrThrowError();

  const tokenTransferMethod = recipe.config.getTokenTransferMethod({
      req: baseRequest,
      forCreateNewSession: false,
      userContext,
  });
  const transferMethods = tokenTransferMethod === "any" ? availableTokenTransferMethods : [tokenTransferMethod];
  const hasToken = transferMethods.some((transferMethod) => {
      const token = getToken(baseRequest, "access", transferMethod);
      if (!token) {
          return false;
      }
      try {
          parseJWTWithoutSignatureVerification(token);
          return true;
      } catch {
          return false;
      }
  });

  try {
      const session = await Session.getSession(baseRequest, baseResponse, options, userContext);
      return {
          session,
          hasInvalidClaims: false,
          hasToken,
      };
  } catch (err) {
      if (Session.Error.isErrorFromSuperTokens(err)) {
          return {
              hasToken,
              hasInvalidClaims: err.type === Session.Error.INVALID_CLAIMS,
              session: undefined,
              nextResponse: new Response("Authentication required", {
                  status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
              }),
          };
      } else {
          throw err;
      }
  }
}


// export async function temp () {
//   const preParsedRequest = createPreParsedRequest(request);
//   const baseResponse = new CollectingResponse();
//   const options = {};
//   const userContext = {};

//   try {
//     const session = await Session.getSession(
//       preParsedRequest,
//       baseResponse,
//       options,
//       userContext
//     );
//     return { session, error: null };
//   } catch (error) {
//     return {
//       session: null,
//       error: error instanceof Error ? error : new Error(String(error)),
//     };
//   }
// }

