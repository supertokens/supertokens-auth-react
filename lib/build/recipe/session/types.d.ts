import { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
import { ClaimValidationError } from "supertokens-website";
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextUpdate;
};
export declare type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type SessionContextUpdate = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
export declare type LoadedSessionContext = {
    loading: false;
    invalidClaims: ClaimValidationError[];
} & SessionContextUpdate;
export declare type SessionContextType =
    | LoadedSessionContext
    | {
          loading: true;
      };
