import React from "react";
import { useEffect, useState } from "react";
import { LoaderCircle, Navigation, Wifi, WifiOff, } from "lucide-react";
import RGBSlider from "./RGBSlider";
import HueSlider from "./HueSlider";
import ColorTemperatureSlider from "./ColorTemperatureSlider";
import BrightSlider from "./BrightSlider";
import VerticalBrightSlider from "./VerticalBrightSlider";

const Test = () => {
    const [time, setTime] = useState(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const formatDate = (date) => {
        const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        const d = date.getDay();  // 0-6
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");

        return `${days[d]}, ${day} tháng ${month}`;
    };

    const [date, setDate] = useState(formatDate(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            );
            setDate(formatDate(new Date()));
        }, 1000); // update mỗi giây

        return () => clearInterval(timer); // clear khi unmount
    }, []);

    return (
        <div className=" text-white w-screen h-screen p-3 relative font-normal overflow-hidden"
        // style={{ backgroundImage: "url('/milky-way-starry-sky-night-mountains-lake-reflection-cold-5k-4480x2520-287.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            {/* <div className="fixedMsg fixed top-7 right-1/2 translate-x-1/2 bg-[#121212] w-60 rounded-full flex px-3 py-1 gap-20"
                style={{ transform: "translateX(50%)", backgroundColor: "#121212" }}
            >
                <p className="text-md">Đang xử lí...</p>
                <LoaderCircle className="animate-spin absolute right-2" size={23} />
            </div> */}
            <div className=" flex flex-col w-full h-full gap-3">
                <div className="flex gap-3 flex-wrap w-full h-1/6">
                    <div className="w-full flex-grow-0 h-full ">
                        <span className="glass-card flex  items-center gap-3 !h-full !w-full p-5 justify-evenly">
                            <div className="clock flex flex-col flex-1 justify-center items-center gap-2">
                                <h1 className="text-4xl">{time}</h1>
                                <p>{date}</p>
                            </div>
                            <span className="h-full flex flex-1  overflow-hidden items-center justify-center">
                                <img src="/weather/sn04.png" className="h-full" alt="" />
                                <span className="flex flex-col items-end justify-between h-full">
                                    <p className="text-lg font-light flex gap-2 items-center"><Navigation size={16} /> Nhà Bè</p>
                                    <span className="flex flex-col items-end">
                                        <p className="text-5xl">25&deg;</p>
                                        <p>Cloud during day</p>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 flex-nowrap w-full h-full">
                    <div className="flex flex-col gap-2 w-60 flex-shrink-0">
                        <span className="flex glass-card items-center gap-3 w-full p-2 justify-between"
                            style={{ height: "fit-content" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon" alt="" />
                                    </span>
                                    <p className="title">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span className="flex justify-evenly items-center text-sm">
                                        <button>Màu</button>
                                        |
                                        <button>Trắng</button>
                                    </span>
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                            <span className="flex gap-2 items-center">
                                <VerticalBrightSlider />
                                <ColorTemperatureSlider />
                            </span>
                        </span>
                        <span className="flex glass-card items-center gap-3 w-full p-2 justify-between"
                            style={{ height: "fit-content" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span className="flex justify-evenly items-center text-sm">
                                        <button>Màu</button>
                                        |
                                        <button>Trắng</button>
                                    </span>
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                            <span className="flex gap-2">
                                <VerticalBrightSlider />
                                <ColorTemperatureSlider />
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-start w-full items-start gap-2"
                        style={{ height: "fit-content" }}
                    >
                        <span className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
                            style={{ height: "fit-content", aspectRatio: 1 / 1, flexBasis: 1 / 3, minWidth: "120px" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="flex flex-nowrap justify-start items-center gap-2">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title text-xs">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                        </span>
                        <span className="flex glass-card flex-1 items-center gap-3 h-full p-2 justify-between"
                            style={{ height: "fit-content", aspectRatio: 1 / 1, flexBasis: 1 / 3, minWidth: "120px" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="flex flex-nowrap justify-start items-center gap-2">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title text-xs">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                        </span>
                        <span className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
                            style={{ height: "fit-content", aspectRatio: 1 / 1, flexBasis: 1 / 3, minWidth: "120px" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="flex flex-nowrap justify-start items-center gap-2">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title text-xs">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                        </span>
                        <span className="flex glass-card flex-1 items-center gap-3 w-full p-2 justify-between"
                            style={{ height: "fit-content", aspectRatio: 1 / 1, flexBasis: 1 / 3, minWidth: "120px" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="flex flex-nowrap justify-start items-center gap-2">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title text-xs">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                        </span>
                        <span className="flex glass-card flex-1 items-center gap-3 p-2 justify-between"
                            style={{ height: "fit-content", aspectRatio: 1 / 1, flexBasis: 1 / 3, minWidth: "120px" }}
                        >
                            <span className="flex flex-col justify-between h-full w-full">
                                <span className="flex flex-nowrap justify-start items-center gap-2">
                                    <span
                                        className="flex items-center w-8 h-8 rounded-full justify-center gap-2 p-1 "
                                        style={{ backgroundColor: "rgba(125, 124, 124, 0.5)" }}
                                    >
                                        <img src="/image 1.png" className="icon h-full w-full" alt="" />
                                    </span>
                                    <p className="title text-xs">Đèn phòng ngủ</p>
                                </span>
                                <span className="flex flex-col justify-between gap-10">
                                    <span>
                                        <Wifi size={16} color="white" />
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test;