import { useEffect, useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const getDeviceStatus = async (id) => {
    const response = await fetch(`${BASE_URL}/api/device/${id}`);
    if (!response.ok) throw new Error("Failed to fetch device status");
    return response.json();
};

const getDeviceDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/api/device_details/${id}`);
    if (!response.ok) throw new Error("Failed to fetch device details");
    return response.json();
};

const setDeviceStatus = async (id, properties) => {

    const response = await fetch(`${BASE_URL}/api/set_status/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Failed to set device status: ${errText}`);
    }
    return response.json();
};

export function useDevice(id) {
    const [details, setDetails] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevice = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const [detailsData, statusData] = await Promise.all([
                getDeviceDetails(id),
                getDeviceStatus(id),
            ]);
            setDetails(detailsData);
            setStatus(statusData);
        } catch (err) {
            setError(err.message || "Failed to load device");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const updateStatus = useCallback(
        async (properties) => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const data = await setDeviceStatus(id, properties);
                return data
            } catch (err) {
                setError(err.message || "Failed to update status");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [id]
    );

    useEffect(() => {
        fetchDevice();
    }, [fetchDevice]);

    return {
        details,
        status,
        loading,
        error,
        refetch: fetchDevice,
        updateStatus
    };
}
