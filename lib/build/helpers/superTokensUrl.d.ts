export default class SuperTokensUrl {
    recipeId: string | null;
    normalisedPathname: string;
    matchesBasePath: boolean;
    normalisedPathnameWithoutWebsiteBasePath: string;
    constructor();
    static getRecipeIdFromSearch(search: string): string | null;
    static normalisePath(path: string): string;
    static removePendingSlashFromPath(path: string): string;
    static getNormalisedRouteWithoutWebsiteBasePath(path: string): string;
    static normaliseUrlOrThrowError(url: string): string;
}
