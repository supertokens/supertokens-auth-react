import * as React from "react";
import { NormalisedConfig } from "../../../types";
import ThirdParty from "../../../../thirdparty/recipe";
declare type ThirdPartyOnlySignInUpProps = {
    thirdPartyRecipe: ThirdParty;
    config: NormalisedConfig;
    history?: any;
};
export declare const ThirdPartyOnlySignInUpWrapper: React.FC<ThirdPartyOnlySignInUpProps>;
export {};
