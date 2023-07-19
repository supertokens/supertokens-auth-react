type UIEventMap = {
    LoginMethodsLoaded: string;
};

type UIEventHandler<K extends keyof UIEventMap> = (event: K, detail: UIEventMap[K]) => void;

export class UIController {
    handlers: Map<keyof UIEventMap, UIEventHandler<any>[]> = new Map();

    emit<K extends keyof UIEventMap>(event: K, detail?: UIEventHandler<K>): void {
        const handlerList = this.handlers.get(event) || [];

        for (const h of handlerList) {
            h(event, detail);
        }
    }

    on<K extends keyof UIEventMap>(event: K, handler: UIEventHandler<K>): void {
        const handlerList: any[] = this.handlers.get(event) || [];

        this.handlers.set(event, handlerList.concat(handler));
    }

    off<K extends keyof UIEventMap>(event: K, handler: UIEventHandler<K>): void {
        const handlerList: any[] = this.handlers.get(event) || [];

        this.handlers.set(
            event,
            handlerList.filter((h) => h !== handler)
        );
    }
}
