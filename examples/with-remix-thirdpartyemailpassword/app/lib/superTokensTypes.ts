export type HTTPMethod = "post" | "get" | "delete" | "put" | "options" | "trace";

export interface SessionDataForUI {
    note: string;
    userId: string;
    sessionHandle: string;
    accessTokenPayload: object;
}
