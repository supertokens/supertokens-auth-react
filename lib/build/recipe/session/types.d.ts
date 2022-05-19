import { UserInput as WebJSInputType } from "supertokens-web-js/recipe/session/types";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED" | "ACCESS_TOKEN_PAYLOAD_UPDATED";
          userContext: any;
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
          userContext: any;
      };
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextType;
};
export declare type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
