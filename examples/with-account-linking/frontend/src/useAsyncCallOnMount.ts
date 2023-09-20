import { useEffect, useRef } from "react";

export const useAsyncCallOnMount = <T>(
    func: () => Promise<T>,
    handler: (res: T) => void,
    errorHandler?: (err: any) => void
) => {
    const signInUpPromise = useRef<Promise<T> | undefined>(undefined);

    useEffect(() => {
        if (signInUpPromise.current === undefined) {
            signInUpPromise.current = func();
        }
        const abort = new AbortController();

        signInUpPromise.current.then(
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
    }, [handler, errorHandler]);
};
