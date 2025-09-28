import { useEffect, useState, useRef, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

export function useMessages() {
    const [messages, setMessages] = useState([]);
    const eventSourceRef = useRef(null);

    // ✅ Kết nối SSE khi component mount
    useEffect(() => {
        const eventSource = new EventSource(`${BASE_URL}/events`);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setMessages((prev) => [data, ...prev]);
            } catch (err) {
                console.error("Invalid SSE data:", event.data);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            // Có thể reconnect hoặc đóng SSE tùy chiến lược
        };

        // 🧹 Cleanup khi component unmount
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, []);

    // ✅ Hàm clear messages (nếu muốn)
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return { messages, clearMessages };
}
