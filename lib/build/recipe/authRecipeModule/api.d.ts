import AuthRecipeModule from ".";
import { SuccessAPIResponse } from "../../types";
export declare function signOut<T, S, R, N>(recipe: AuthRecipeModule<T, S, R, N>): Promise<SuccessAPIResponse>;
