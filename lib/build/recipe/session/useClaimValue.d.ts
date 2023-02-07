import type { SessionClaim } from "supertokens-web-js/recipe/session";
export declare const useClaimValue: <T>(claim: SessionClaim<T>) =>
    | {
          loading: true;
      }
    | {
          loading: false;
          doesSessionExist: boolean;
          value: T | undefined;
      };
