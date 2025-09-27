import { useEffect, useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.hoai.homes";

const getDevicesList = async () => {
    const response = await fetch(`${BASE_URL}/api/devices`);
    if (!response.ok) throw new Error("Failed to fetch devices");
    return response.json();
};

export function useDevices() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getDevicesList();
            // ✅ Lấy mảng thực từ key result
            setDevices(data.result || []);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    return {
        devices,
        loading,
        error,
        refetch: fetchDevices,
    };
}
