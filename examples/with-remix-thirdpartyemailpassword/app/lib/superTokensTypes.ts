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

export interface SessionDataForUI {
  note: string;
  userId: string;
  sessionHandle: string;
  accessTokenPayload: object;
}

