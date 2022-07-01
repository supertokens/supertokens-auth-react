import { UserInput as WebJSInputType, RecipeEvent } from "supertokens-web-js/recipe/session/types";
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextType;
};
export declare type InputType = WebJSInputType & {
    onHandleEvent?: (event: RecipeEventWithSessionContext) => void;
};
export declare type SessionContextType =
    | {
          doesSessionExist: boolean;
          userId: string;
          accessTokenPayload: any;
          loading: false;
      }
    | {
          loading: true;
      };
