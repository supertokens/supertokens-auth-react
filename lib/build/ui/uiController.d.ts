declare type UIEventMap = {
    LoginMethodsLoaded: string;
};
declare type UIEventHandler<K extends keyof UIEventMap> = (event: K, detail: UIEventMap[K]) => void;
export declare class UIController {
    handlers: Map<keyof UIEventMap, UIEventHandler<any>[]>;
    emit<K extends keyof UIEventMap>(event: K, detail?: UIEventHandler<K>): void;
    on<K extends keyof UIEventMap>(event: K, handler: UIEventHandler<K>): void;
    off<K extends keyof UIEventMap>(event: K, handler: UIEventHandler<K>): void;
}
export {};
