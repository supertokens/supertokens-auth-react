import { VerifyEmailAPI, SendVerifyEmailAPI, VerifyEmailThemeResponse, SendVerifyEmailThemeResponse } from "../../../types";
export declare function handleVerifyEmailAPI(rid: string, verifyEmailAPI: VerifyEmailAPI, token: string): Promise<VerifyEmailThemeResponse>;
export declare function handleSendVerifyEmailAPI(rid: string, sendVerifyEmailAPI: SendVerifyEmailAPI): Promise<SendVerifyEmailThemeResponse>;
