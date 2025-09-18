import React, { useEffect, useState } from "react";
import { getDevicesList, getDeviceStatus, getDeviceDetails } from "../services/services"; // adjust import path if needed
import { useCallback } from "react";
import { use } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const Dashboard = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchDevices = useCallback(async () => {
        try {
            setLoading(true);

            // 1. Lấy danh sách thiết bị
            const devicesRes = await getDevicesList();
            const devicesList = devicesRes.result || [];
            console.table(devicesList);

            // 2. Với mỗi device gọi status + details song song
            const devicesWithStatus = await Promise.all(
                devicesList.map(async (device) => {
                    const [statusRes, detailsRes] = await Promise.all([
                        getDeviceStatus(device.id),
                        getDeviceDetails(device.id),
                    ]);

                    return {
                        ...device,
                        status: statusRes.result || [],
                        details: detailsRes.result || {},
                    };
                })
            );

            // 3. Lưu vào state
            setDevices(devicesWithStatus);
        } catch (err) {
            console.error("Error fetching devices:", err);
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    const getMessage = (setMessages) => {
        const eventSource = new EventSource(`${BASE_URL}/events`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [data, ...prev]);
        };

        eventSource.onerror = (err) => {
            console.error('SSE error:', err);
        };

        return eventSource;
    };

    useEffect(() => {
        fetchDevices();
        const es = getMessage(setMessages);
        return () => es.close();
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;
        console.log("New message received:", messages[0]);
    }, [messages]);

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Smart Home Dashboard</h1>
            {loading && <p>Loading devices...</p>}
            {!loading && (
                <ul>
                    {devices.map((d) => (
                        <li key={d.id} style={{ marginBottom: "1rem" }}>
                            <strong>{d.name}</strong> ({d.category})<br />
                            Online: {d.details?.is_online ? "✅ Yes" : "❌ No"} <br />
                            Status:{" "}
                            {d.status.map((s) => (
                                <span key={s.code}>
                                    {s.code}: {String(s.value)}{" "}
                                </span>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;