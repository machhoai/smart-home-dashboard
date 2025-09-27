import React from "react";
import { Wifi } from "lucide-react"; // icon như bạn đang dùng

export default function DevicesGrid({ devices = [] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {
                devices.length > 0 && (devices.map((device) => (
                    <span
                        key={device.id || device.uuid || device.customName || Math.random()} // ưu tiên id/uuid nếu có
                        className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
                        style={{
                            height: "fit-content",
                            aspectRatio: "1 / 1",
                            flexBasis: "calc(33.333% - 0.75rem)", // chia 3 cột
                            minWidth: "120px",
                        }}
                    >
                        <span className="flex flex-col justify-between h-full w-full">
                            {/* Header: Icon + Tên */}
                            <span className="flex flex-nowrap justify-start items-center gap-2">
                                <span
                                    className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1"
                                    style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                >
                                    <img
                                        src={`https://images.tuyaus.com/${device.icon}`}
                                        className="icon h-full w-full object-contain"
                                        alt={device.customName || device.name || "Thiết bị"}
                                    />
                                </span>
                                <p className="title text-xs truncate max-w-[90px]">
                                    {device.customName || "(Không tên)"}
                                </p>
                            </span>

                            {/* Footer: Wifi icon, trạng thái, ... */}
                            <span className="flex flex-col justify-between gap-10">
                                <span>
                                    <Wifi size={16} color="white" />
                                </span>
                            </span>
                        </span>
                    </span>
                )))
            }
        </div>
    );
}

// Hàm lấy icon theo loại thiết bị (có thể tùy chỉnh sau)
function getDeviceIcon(category) {
    switch (category) {
        case "kg": // công tắc
            return "/icons/switch.png";
        case "dj": // đèn
            return "/icons/lightbulb.png";
        case "tdq": // ổ cắm
            return "/icons/socket.png";
        case "sp": // loa
            return "/icons/speaker.png";
        case "pc": // bơm nước, hồ cá
            return "/icons/fish-tank.png";
        default:
            return "/icons/device.png";
    }
}