export declare const WindowUtilities: {
    fetch: ((input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>) & typeof fetch;
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
    document: Document;
    sessionStorage: Storage;
    localStorage: Storage;
};
