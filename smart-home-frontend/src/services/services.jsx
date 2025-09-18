const BASE_URL = import.meta.env.VITE_BASE_URL;

const getDevicesList = async () => {
    console.log("Fetching devices list from", `${BASE_URL}/api/devices`);
    const response = await fetch(`${BASE_URL}/api/devices`);
    if (!response.ok) throw new Error("Failed to fetch devices");
    return response.json();
};

const getDeviceStatus = async (id) => {
    const response = await fetch(`${BASE_URL}/api/device/${id}`);
    if (!response.ok) throw new Error("Failed to fetch device status");
    return response.json();
};

const getDeviceDetails = async (id) => {
    const response = await fetch(`${BASE_URL}/api/device_details/${id}`);
    if (!response.ok) throw new Error("Failed to fetch device details");
    return response.json();
}

export { getDevicesList, getDeviceStatus, getDeviceDetails };