import { useEffect, useRef, useState } from "react";

export const useAsyncCall = <T>(
    func: () => Promise<T>,
    handler: (res: T) => void,
    errorHandler?: (err: any) => void
) => {
    const [key, setKey] = useState(Date.now());
    const signInUpPromise = useRef<[any, Promise<T>] | undefined>(undefined);

    useEffect(() => {
        if (signInUpPromise.current === undefined || signInUpPromise.current[0] !== key) {
            signInUpPromise.current = [key, func()];
        }
        const abort = new AbortController();

        signInUpPromise.current[1].then(
            (resp) => {
                if (abort.signal.aborted) {
                    return;
                }
                handler(resp);
            },
            (err) => {
                if (abort.signal.aborted) {
                    return;
                }
                if (errorHandler !== undefined) {
                    errorHandler(err);
                }
            }
        );

        return () => abort.abort();
    }, [handler, errorHandler, key]);

    return () => setKey(Date.now());
};
