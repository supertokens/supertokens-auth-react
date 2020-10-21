export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function removePendingSlashFromPath(path: string): string;
export declare function getNormalisedRouteWithoutWebsiteBasePath(path: string, basePath: string): string;
export declare function normaliseURLDomainOrThrowError(input: string): string;
export declare function normaliseURLPathOrThrowError(input: string): string;
export declare function isTest(): boolean;
