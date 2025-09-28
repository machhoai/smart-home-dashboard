import { Wifi, WifiOff } from "lucide-react";
import VerticalBrightSlider from "./VerticalBrightSlider";
import { useDevice } from "../hooks/useDevice";
import { useEffect, useState } from "react";
import ColorTempSlider from "./ColorTemperatureSlider";

export default function DJDevicesGrid({ devices }) {
    const djDevices = devices.filter((d) => d.category === "dj");

    return (
        <div className="flex flex-col gap-2 w-60 h-full flex-shrink-0">
            {djDevices.map((device) => (
                <DeviceCard key={device.id || device.uuid} device={device} />
            ))}
        </div>
    );
}


const DeviceCard = ({ device }) => {
    const deviceId = device.id || device.uuid;
    const { status, details, loading, error, refetch } = useDevice(deviceId);
    const isOn = status?.result?.find(item => item.code === "switch_led")?.value === true && details?.result?.is_online === true;
    const brightValue = status?.result?.find(item => item.code === "bright_value_v2")?.value / 10;
    const workMode = status?.result?.find(item => item.code === "work_mode")?.value;
    const tempValue = status?.result?.find(item => item.code === "temp_value_v2")?.value;

    // useEffect(() => {
    //     console.log(status);
    //     console.log(details);
    //     console.log(brightValue);



    //     // if (status, details, loading, error) {
    //     //     console.log(status);
    //     //     console.log(details);
    //     //     console.log(loading);
    //     //     console.log(error);
    //     // }
    // }, [status, details, loading, error])

    return (
        <span
            key={device.id || device.uuid}
            className={`flex glass-card items-center gap-3 w-full h-full p-2 justify-between`}
            style={{ height: "fit-content", backgroundColor: isOn ? "#036AAB" : "rgb(102, 102, 102)", }}
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
                        <button className="hover:underline">Màu</button>
                        <span>|</span>
                        <button className="hover:underline">Trắng</button>
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
                <VerticalBrightSlider initial={brightValue} />
                <ColorTempSlider />
            </span>
        </span>
    );
}