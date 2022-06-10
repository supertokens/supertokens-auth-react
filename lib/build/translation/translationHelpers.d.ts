export declare type TranslationStore = Record<string, Record<string, string | undefined>>;
export declare type TranslationFunc = (key: string) => string;
export declare type TranslationContextType = {
    translate: TranslationFunc;
};
export declare type TranslationEventMap = {
    LanguageChange: string;
    TranslationLoaded: TranslationStore;
};
export declare type TranslationEventHandler<K extends keyof TranslationEventMap> = (
    event: K,
    detail: TranslationEventMap[K]
) => void;
export declare type TranslationControlEventSource = {
    on: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
    off: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
};
export declare class TranslationController implements TranslationControlEventSource {
    handlers: Map<keyof TranslationEventMap, TranslationEventHandler<any>[]>;
    emit<K extends keyof TranslationEventMap>(event: K, detail: TranslationEventMap[K]): void;
    on<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void;
    off<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void;
}
export declare function saveCurrentLanguage(language: string, cookieDomain: string | undefined): Promise<void>;
export declare function getCurrentLanguageFromCookie(): Promise<string | null>;
