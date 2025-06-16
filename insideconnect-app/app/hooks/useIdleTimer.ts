/* eslint-disable prettier/prettier */
// insideconnect-app/app/hooks/useIdleTimer.ts
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * A custom hook to detect user inactivity.
 * @param onIdle - Callback function to call when the user is idle.
 * @param idleTimeout - The time in milliseconds until the user is considered idle.
 */
export function useIdleTimer({ onIdle, idleTimeout }: { onIdle: () => void; idleTimeout: number }) {
    const [isIdle, setIsIdle] = useState(false);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    const handleEvent = useCallback(() => {
        setIsIdle(false);

        // Clear the previous timeout
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        // Set a new timeout
        timeoutId.current = setTimeout(() => {
            onIdle();
            setIsIdle(true);
        }, idleTimeout);
    }, [onIdle, idleTimeout]);

    // Function to manually reset the timer
    const reset = useCallback(() => {
        handleEvent();
    }, [handleEvent]);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

        // Add event listeners
        events.forEach(event => window.addEventListener(event, handleEvent));

        // Set the initial timer
        handleEvent();

        // Cleanup function
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            events.forEach(event => window.removeEventListener(event, handleEvent));
        };
    }, [handleEvent]);

    return { isIdle, reset };
}