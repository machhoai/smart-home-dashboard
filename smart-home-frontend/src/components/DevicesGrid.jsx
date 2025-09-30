import { Wifi } from "lucide-react";
import { useDevice } from "../hooks/useDevice";
import { useEffect, useState } from "react";

export default function DevicesGrid({ devices, message }) {

    return (
        <div className="flex flex-wrap justify-start items-start gap-2 w-full">
            {devices.map((device) => {
                const isTargetDevice =
                    message?.key === device.id || message?.key === device.uuid;
                if (device.category !== "dj")
                    return (
                        <DeviceCard
                            key={device.id || device.uuid}
                            device={device}
                            message={isTargetDevice ? message : null}
                        />
                    );
            })}
        </div>
    );
}


const DeviceCard = ({ device, message }) => {
    const deviceId = device.id || device.uuid;
    const { status, details, loading, error, refetch, updateStatus } = useDevice(deviceId);
    const [isOnline, setIsOnline] = useState(details?.result?.is_online === true)
    const [isOn, setIsOn] = useState(status?.result?.find(item => item.code === "switch_led")?.value === true)
    const [isUpdateStatusSuccess, setIsUpdateStatusSuccess] = useState()

    useEffect(() => {
        if (!message || message.length > 0) return;

        const bizCode = message?.payload?.data?.bizCode;

        // 🟡 Xử lý Online / Offline
        if (bizCode === "deviceOnline") {
            setIsOnline(true);
            return;
        }
        if (bizCode === "deviceOffline") {
            setIsOnline(false);
            return;
        }

        // 🟢 Xử lý Property update
        if (bizCode === "devicePropertyMessage") {
            const props = message?.payload?.data?.bizData?.properties ?? [];

            props.forEach((p) => {
                switch (p.code) {
                    case "switch_1":
                        setIsOn(p.value === true);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [message]);

    useEffect(() => {
        if (!status?.result) return;

        const switch_1 = status.result.find(i => i.code === "switch_1")?.value === true;

        setIsOnline(details?.result?.is_online === true);
    }, [status, details]);

    const handleClick = async () => {
        try {
            if (!isOnline) {
                console.warn("⚠️ Thiết bị đang offline — không thể gửi lệnh.");
                return;
            }

            const newValue = !isOn;

            const result = await updateStatus({
                switch_1: newValue,
            });
            setIsUpdateStatusSuccess(result.success)

        } catch (err) {
            setIsUpdateStatusSuccess(false)
            console.error("❌ Gửi lệnh toggle thất bại:", err);
        }
    };


    return (
        <span
            key={device.id || device.uuid}
            className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
            style={{
                height: "fit-content",
                aspectRatio: "1 / 1",
                flexBasis: "calc(33.333% - 0.5rem)",
                minWidth: "120px",
                backgroundColor: isOn && isOnline ? "#036AAB" : "rgb(102, 102, 102)"
            }}
            onClick={handleClick}
        >
            <span className="flex flex-col justify-between h-full w-full">
                <span className="flex flex-nowrap justify-start items-center gap-2">
                    <span
                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1"
                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                    >
                        <img
                            src={`https://images.tuyaus.com/${device.icon}`}
                            className="icon h-full w-full object-contain"
                            alt={device.customName}
                        />
                    </span>
                    <p className="title text-xs truncate max-w-[90px]">
                        {device.customName || "Thiết bị"}
                    </p>
                </span>
                <span className="flex flex-col justify-between gap-10">
                    <Wifi size={16} color="white" />
                </span>
            </span>
        </span>
    );
}

