export declare const WindowUtilities: {
    readonly fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
    history: {
        replaceState: (data: any, unused: string, url?: string | null | undefined) => void;
        readonly state: any;
    };
    location: {
        href: string;
        readonly search: string;
        readonly hash: string;
        readonly pathname: string;
        assign: (url: string) => void;
        readonly origin: string;
        readonly hostname: string;
    };
    readonly document: Document;
    readonly sessionStorage: Storage;
    readonly localStorage: Storage;
};
