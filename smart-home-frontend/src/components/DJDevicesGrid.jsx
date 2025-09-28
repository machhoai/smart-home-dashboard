import { Wifi, WifiOff } from "lucide-react";
import VerticalBrightSlider from "./VerticalBrightSlider";
import { useDevice } from "../hooks/useDevice";
import { useEffect, useState } from "react";
import ColorTempSlider from "./ColorTemperatureSlider";

export default function DJDevicesGrid({ devices, message }) {
    const djDevices = devices.filter((d) => d.category === "dj");

    return (
        <div className="flex flex-col gap-2 w-60 h-full flex-shrink-0">
            {djDevices.map((device) => {
                // Kiểm tra nếu message này dành cho thiết bị hiện tại
                const isTargetDevice =
                    message?.key === device.id || message?.key === device.uuid;

                // Nếu trùng → truyền message xuống DeviceCard
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
    const { status, details, loading, error, refetch } = useDevice(deviceId);
    const [isOnline, setIsOnline] = useState(details?.result?.is_online === true)
    const [isOn, setIsOn] = useState(status?.result?.find(item => item.code === "switch_led")?.value === true)
    const [brightValue, setBrightValue] = useState(status?.result?.find(item => item.code === "bright_value_v2")?.value / 10)
    const [workMode, setWorkMode] = useState(status?.result?.find(item => item.code === "work_mode")?.value === "white")
    const [tempValue, setTempValue] = useState(status?.result?.find(item => item.code === "temp_value_v2")?.value)
    const [colourData, setColourData] = useState(status?.result?.find(item => item.code === "temp_value_v2")?.value)

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
                    case "switch_led":
                        setIsOn(p.value === true);
                        break;
                    case "bright_value":
                    case "bright_value_v2":
                        setBrightValue(p.value / 10);
                        break;
                    case "work_mode":
                        setWorkMode(p.value === "white");
                        break;
                    case "temp_value":
                        setTempValue(p.value);
                        break;
                    case "temp_value_v2":
                        setTempValue(p.value);
                        break;
                    case "colour_data":
                        setColourData(p.value);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [message]);

    useEffect(() => {
        if (!status?.result) return;


        const switchLed = status.result.find(i => i.code === "switch_led")?.value === true;
        const brightVal = status.result.find(i => i.code === "bright_value_v2")?.value / 10;
        const mode = status.result.find(i => i.code === "work_mode")?.value === "white";
        const temp = status.result.find(i => i.code === "temp_value_v2")?.value / 10;
        const colour = status.result.find(i => i.code === "colour_data")?.value;

        setIsOn(switchLed);
        setBrightValue(brightVal);
        setWorkMode(mode);
        setTempValue(temp);
        setColourData(colour);

        setIsOnline(details?.result?.is_online === true);
    }, [status, details]);


    return (
        <span
            key={device.id || device.uuid}
            className={`flex glass-card items-center gap-3 w-full h-full p-2 justify-between`}
            style={{ height: "fit-content", backgroundColor: isOn && isOnline ? "#036AAB" : "rgb(102, 102, 102)", }}
        >
            {/* Bên trái */}
            <span className="flex flex-col justify-between h-full w-full">
                {/* Phần trên: Tiêu đề */}
                <span className="flex items-center gap-2">
                    <span
                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1"
                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                    >
                        <img
                            src={`https://images.tuyaus.com/${device.icon}`}
                            className="icon w-full h-full object-contain"
                            alt={device.customName}
                        />
                    </span>
                    <p className="title text-sm font-medium truncate max-w-[100px]">
                        {device.customName || "Đèn"}
                    </p>
                </span>

                {/* Phần dưới: Nút điều khiển + wifi */}
                <span className="flex flex-col gap-12 mt-2">
                    <span className="flex justify-evenly items-center text-sm">
                        <button className={`hover:underline ${workMode ? " text-gray-400" : "text-white"}`}>Màu</button>
                        <span>|</span>
                        <button className={`hover:underline ${!workMode ? " text-gray-400" : "text-white"}`}>Trắng</button>
                    </span>
                    <span className="flex">
                        {details?.result?.is_online ?
                            <Wifi size={16} color="white" />
                            :
                            <WifiOff size={16} color="white" />
                        }

                    </span>
                </span>
            </span>

            {/* Bên phải: Slider */}
            <span className="flex gap-2 items-center">
                <VerticalBrightSlider
                    key={`bright-${brightValue}`}
                    initial={brightValue ?? 0}
                />
                <ColorTempSlider
                    key={`temp-${tempValue}`}
                    initial={tempValue ?? 0}
                />
            </span>
        </span>
    );
}