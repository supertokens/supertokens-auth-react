import { getCookieValue, setFrontendCookie } from "./utils";

// language -> key -> copy
export type TranslationStore = Record<string, Record<string, string>>;
export type TranslationFunc = (key: string) => string;

export type TranslationContextType = {
    translate: TranslationFunc;
};

export type TranslationEventMap = {
    LanguageChange: string;
    TranslationLoaded: TranslationStore;
};

export type TranslationEventHandler<K extends keyof TranslationEventMap> = (
    event: K,
    detail: TranslationEventMap[K]
) => void;

export type TranslationControlEventSource = {
    on: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
    off: <K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>) => void;
};

export class TranslationController implements TranslationControlEventSource {
    handlers: Map<keyof TranslationEventMap, TranslationEventHandler<any>[]> = new Map();

    emit<K extends keyof TranslationEventMap>(event: K, detail: TranslationEventMap[K]): void {
        const handlerList = this.handlers.get(event) || [];

        for (const h of handlerList) {
            h(event, detail);
        }
    }

    on<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void {
        const handlerList: TranslationEventHandler<K>[] = this.handlers.get(event) || [];

        this.handlers.set(event, handlerList.concat(handler));
    }

    off<K extends keyof TranslationEventMap>(event: K, handler: TranslationEventHandler<K>): void {
        const handlerList: TranslationEventHandler<K>[] = this.handlers.get(event) || [];

        this.handlers.set(
            event,
            handlerList.filter((h) => h !== handler)
        );
    }
}

const CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";

export function saveCurrentLanguage(language: string, cookieDomain: string | undefined): void {
    try {
        setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain);
    } catch {
        // This can throw if we are not in a browser
        // Since this is just saving a preference we can safely ignore the exception
    }
}

export function getCurrentLanguageFromCookie(): string | null {
    try {
        return getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME);
    } catch {
        // This can throw if we are not in a browser
        // Since this is just loading a preference we can safely ignore the exception
        return null;
    }
}
