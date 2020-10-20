export declare function getRecipeIdFromSearch(search: string): string | null;
export declare function normalisePath(path: string): string;
export declare function removePendingSlashFromPath(path: string): string;
export declare function getNormalisedRouteWithoutWebsiteBasePath(path: string, basePath: string): string;
export declare function normaliseUrlOrThrowError(url: string): string;
export declare function isIpV4Address(ip: string): boolean;
export declare function isLocalhost(url: string): boolean;
export declare function isTest(): boolean;
