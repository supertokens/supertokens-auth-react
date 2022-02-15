import { NormalisedConfig, RecipeInterface } from "../types";
import EmailVerification from "../../emailverification/recipe";
export default function getRecipeImplementation(
    config: NormalisedConfig,
    emailVerificationInstance: EmailVerification | undefined
): RecipeInterface;
