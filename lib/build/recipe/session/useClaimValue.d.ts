import { SessionClaim } from "supertokens-web-js/recipe/session";
export declare const useClaimValue: <T>(claim: SessionClaim<T>) =>
    | {
          loading: true;
          value: undefined;
      }
    | {
          loading: false;
          value: T | undefined;
      };
