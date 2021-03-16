export default class NormalisedURLPath {
    private value;
    constructor(url: string);
    startsWith: (other: NormalisedURLPath) => boolean;
    appendPath: (other: NormalisedURLPath) => NormalisedURLPath;
    getAsStringDangerous: () => string;
}
export declare function normaliseURLPathOrThrowError(input: string): string;
