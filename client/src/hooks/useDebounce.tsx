import { useCallback, useRef } from "react";

export const useDebounce = <T extends any[]>(
    callback: (...args: T) => void,
    delay: number
): ((...args: T) => void) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    return useCallback(
        (...args: T) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};