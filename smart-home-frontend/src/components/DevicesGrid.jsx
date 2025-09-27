import { Wifi } from "lucide-react";

export default function DevicesGrid({ devices }) {
    return (
        <div className="flex flex-wrap justify-start items-start gap-2 w-full">
            {devices.map((device) => {
                if (device.category !== "dj")
                    return (
                        <span
                            key={device.id || device.uuid}
                            className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
                            style={{
                                height: "fit-content",
                                aspectRatio: "1 / 1",
                                flexBasis: "calc(33.333% - 0.5rem)",
                                minWidth: "120px",
                            }}
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
            })}
        </div>
    );
}

