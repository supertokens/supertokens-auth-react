import { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
import { ClaimValidationError } from "supertokens-website";
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextUpdate;
};
export declare type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type SessionContextUpdate = Omit<LoadedSessionContext, "invalidClaims" | "loading">;
declare type LoadedSessionContext = {
    loading: false;
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
    invalidClaims: ClaimValidationError[];
};
export declare type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
export {};
