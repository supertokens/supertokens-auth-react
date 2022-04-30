export declare const WindowUtilities: {
    location: {
        search: string;
        href: string;
        hash: string;
        pathname: string;
        assign: (url: string) => void;
        origin: string;
        hostname: string;
    };
    history: {
        replaceState: (data: any, unused: string, url?: string | null | undefined) => void;
        readonly state: any;
    };
    document: Document;
    sessionStorage: Storage;
    localStorage: Storage;
};
