import React from "react";
import { useEffect, useState } from "react";
import { LoaderCircle, Navigation } from "lucide-react";
import GlassSurface from './GlassSurface'

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
        <div className=" text-white w-screen h-screen p-7 relative font-normal"
            style={{ backgroundImage: "url('/milky-way-starry-sky-night-mountains-lake-reflection-cold-5k-4480x2520-287.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="fixedMsg fixed top-7 right-1/2 translate-x-1/2 bg-[#121212] w-60 rounded-full flex px-3 py-1 gap-20"
                style={{ transform: "translateX(50%)", backgroundColor: "#121212" }}
            >
                <p className="text-md">Đang xử lí...</p>
                <LoaderCircle className="animate-spin absolute right-2" size={23} />
            </div>
            <div className="w-full h-full grid grid-cols-1"
                style={{
                    gridTemplateRows: "auto 1fr",
                    gap: "10px"
                }}
            >
                <div className="clock flex items-end justify-start gap-2">
                    <h1 className="text-3xl">{time}</h1>
                    <p>{date}</p>
                </div>
                <div className=" flex flex-col w-full h-full gap-5">
                    <div className="flex gap-5 flex-wrap w-full h-44">
                        <div className="w-96 flex-grow-0 h-full ">
                            <span className="flex items-center bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-3xl border-gray-500 border gap-3 h-full w-full p-5 px-7 justify-between"
                            >
                                <img src="/weather/sn04.png" className="h-full" alt="" />
                                <span className="flex flex-col items-end justify-between h-full">
                                    <p className="text-lg font-light flex gap-2 items-center"><Navigation size={16} /> Nhà Bè</p>
                                    <span className="flex flex-col items-end">
                                        <p className="text-5xl">25&deg;</p>
                                        <p>Cloud during day</p>
                                    </span>
                                </span>
                            </span>
                        </div>
                        <div className="flex-grow h-full">
                            <span className="flex items-center gap-3 h-full w-full p-5 px-7 justify-between bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-3xl border-gray-500 border">
                                <span className="flex flex-col items-center justify-between h-full">
                                    <p>Hôm nay</p>
                                    <img src="/weather/sn04.png" className="h-1/2" alt="" />
                                    <p className="text-sm">Mưa nhỏ</p>
                                </span>
                                <span className="flex flex-col items-center justify-between h-full">
                                    <p>Ngày mai</p>
                                    <img src="/weather/sn04.png" className="h-1/2" alt="" />
                                    <p className="text-sm">Mưa nhỏ</p>
                                </span>
                                <span className="flex flex-col items-center justify-between h-full">
                                    <p>Thứ Bảy</p>
                                    <img src="/weather/sn04.png" className="h-1/2" alt="" />
                                    <p className="text-sm">Mưa nhỏ</p>
                                </span>
                                <span className="flex flex-col items-center justify-between h-full">
                                    <p>Chủ Nhật</p>
                                    <img src="/weather/sn04.png" className="h-1/2" alt="" />
                                    <p className="text-sm">Mưa nhỏ</p>
                                </span>
                                <span className="flex flex-col items-center justify-between h-full">
                                    <p>Thứ Hai</p>
                                    <img src="/weather/sn04.png" className="h-1/2" alt="" />
                                    <p className="text-sm">Mưa nhỏ</p>
                                </span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Test;