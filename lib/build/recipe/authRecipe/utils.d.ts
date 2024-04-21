import type { Config, NormalisedConfig } from "./types";
import type { PartialAuthComponent } from "../../types";
export declare function normaliseAuthRecipe<T, S, R>(config: Config<T, S, R>): NormalisedConfig<T, S, R>;
export declare function selectComponentsToCoverAllFirstFactors(
    comps: PartialAuthComponent[],
    firstFactorIds: string[]
): PartialAuthComponent[] | undefined;
