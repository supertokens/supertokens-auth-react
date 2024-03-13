import { SessionContainerInterface } from "supertokens-node/lib/build/recipe/session/types";

export type PartialRemixRequest = {
  method: string;
  url: string;
  headers: Headers;
  formData: () => Promise<FormData>;
  json: () => Promise<unknown>;
  cookies: {
    getAll: () => { name: string; value: string }[];
  };
};

export type HTTPMethod = "post" | "get" | "delete" | "put" | "options" | "trace";

export interface ExtendedSession extends SessionContainerInterface {
  accessToken: string;
  frontToken: string;
  refreshToken: string;
  antiCsrfToken: string;
  sessionHandle: string;
  userId: string;
  userDataInAccessToken: {
      iat: number;
      exp: number;
      sub: string;
      tId: string;
      rsub: string;
      sessionHandle: string;
      refreshTokenHash1: string;
      parentRefreshTokenHash1: null | string;
      antiCsrfToken: null | string;
      iss: string;
      'st-ev': { v: boolean; t: number };
      'st-role': { v: unknown[]; t: number };
      'st-perm': { v: unknown[]; t: number };
  };
  accessTokenUpdated?: boolean;
  tenantId?: string;
}

export interface SessionDataForUI {
  note: string;
  userId: string;
  sessionHandle: string;
  accessTokenPayload: object;
}

