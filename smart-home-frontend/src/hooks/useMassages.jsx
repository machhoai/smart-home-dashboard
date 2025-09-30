import { useEffect, useState, useRef, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

export function useMessages() {
    const [messages, setMessages] = useState([]);
    const eventSourceRef = useRef(null);
    const reconnectTimerRef = useRef(null);
    const retryCountRef = useRef(0);

    const connect = useCallback(() => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }

        console.log("🔌 Connecting to SSE...");
        const eventSource = new EventSource(`${BASE_URL}/events`);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log("✅ SSE connected");
            retryCountRef.current = 0; // reset retry khi thành công
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // console.log(data);

                setMessages((prev) => [data, ...prev]);
            } catch (err) {
                console.error("Invalid SSE data:", event.data);
            }
        };

        eventSource.onerror = (err) => {
            console.error("❌ SSE error:", err);
            eventSource.close();
            eventSourceRef.current = null;

            // 🕒 Tính thời gian retry theo cấp số nhân
            const retryDelay = Math.min(30000, 1000 * 2 ** retryCountRef.current); // max 30s
            console.log(`⏳ Reconnecting SSE in ${retryDelay / 1000}s...`);
            reconnectTimerRef.current = setTimeout(() => {
                retryCountRef.current += 1;
                connect();
            }, retryDelay);
        };
    }, []);

    useEffect(() => {
        connect();

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            if (reconnectTimerRef.current) {
                clearTimeout(reconnectTimerRef.current);
            }
        };
    }, [connect]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return { messages, clearMessages };
}
