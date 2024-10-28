import { useCallback, useRef } from "react";

export const useDebounce = <T extends []>(
    callback: (...args: T) => void,
    delay: number
): ((...args: T) => void) => {
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined); // Ref to store timer

    return useCallback((...args: T) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current); // Clear existing timer
        }
        
        // Set a new timer
        timerRef.current = setTimeout(() => {
            callback(...args); // Call the original callback after delay
        }, delay);
    }, [callback, delay]);
};