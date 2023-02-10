import { RecipeRoutes } from "../recipeRoutes";
import ThirdParty from "./recipe";

export const getThirdPartyPreBuiltUIRoutes = (router: any) => {
    const ThirdPartPrebuiltRoutes = new RecipeRoutes(ThirdParty.getInstanceOrThrow() as any);
    return RecipeRoutes.getRoutes(router, ThirdPartPrebuiltRoutes);
};
