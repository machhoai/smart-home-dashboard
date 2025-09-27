import React from "react";
import { useEffect, useState } from "react";
import { LoaderCircle, Navigation, Wifi, WifiOff, } from "lucide-react";
import RGBSlider from "./RGBSlider";
import HueSlider from "./HueSlider";
import ColorTemperatureSlider from "./ColorTemperatureSlider";
import BrightSlider from "./BrightSlider";
import VerticalBrightSlider from "./VerticalBrightSlider";
import { useDevice } from "../hooks/useDevice";
import { useDevices } from "../hooks/useDevices";
import DJDevicesGrid from "./DJDevicesGrid";
import DevicesGrid from "./DevicesGrid";

const MyDashboard = () => {
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

    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        try {
            const res = await fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat=10.6956953&lon=106.7395591&appid=23ab1814bb3199a48b4ebd7b307bc7ec&units=metric&lang=vi"
            );
            const data = await res.json();
            setWeather(data);
        } catch (err) {
            console.error("Fetch weather error:", err);
        }
    };

    useEffect(() => {
        fetchWeather(); // gọi ngay khi load

        const interval = setInterval(fetchWeather, 15 * 60 * 1000); // 15 phút
        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     if (!weather) {
    //         return
    //     }
    //     console.log(weather.weather[0]);

    // }, [weather])

    const { devices, loading: listLoading } = useDevices();

    useEffect(() => {
        if (!devices) {
            return
        }
        console.log(devices);

    }, [devices])

    // const { details, status, loading: deviceLoading } = useDevice(selectedDeviceId);


    if (listLoading) return <p>Đang tải danh sách...</p>;
    // if (deviceLoading) return <p>Đang tải thiết bị...</p>;

    return (
        <div className=" text-white w-screen h-screen p-3 relative font-normal overflow-hidden"
        // style={{ backgroundImage: "url('/milky-way-starry-sky-night-mountains-lake-reflection-cold-5k-4480x2520-287.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className=" flex flex-col w-full h-full gap-3">
                <div className="flex gap-3 flex-wrap w-full h-1/6">
                    <div className="w-full flex-grow-0 h-full ">
                        <span className="glass-card flex  items-center gap-3 !h-full !w-full p-5 justify-evenly">
                            <div className="clock flex flex-col flex-1 justify-center items-center gap-2">
                                <h1 className="text-4xl">{time}</h1>
                                <p>{date}</p>
                            </div>
                            <span className="h-full flex flex-1 overflow-hidden items-center justify-evenly px-3">
                                <img
                                    src={
                                        weather?.weather?.[0]?.icon
                                            ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                                            : "/fallback-icon.png" // icon mặc định nếu chưa có dữ liệu
                                    }
                                    style={{ scale: 1.5 }}
                                    className="h-full"
                                    alt={weather?.weather?.[0]?.description || "Loading weather"}
                                />
                                <span className="flex flex-col items-end justify-between h-full">
                                    <p className="text-lg font-light flex gap-2 items-center"><Navigation size={16} /> Nhà Bè</p>
                                    <span className="flex flex-col items-end">
                                        <p className="text-5xl">
                                            {weather?.main?.temp !== undefined ? weather.main.temp.toFixed(0) : "NA"}&deg;
                                        </p>
                                        <p>
                                            {weather?.weather?.[0]?.description
                                                ? weather.weather[0].description.charAt(0).toUpperCase() +
                                                weather.weather[0].description.slice(1)
                                                : "Loading..."}
                                        </p>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="flex gap-2 flex-nowrap w-full h-full">
                    <div className="flex flex-col gap-2 w-60 h-full flex-shrink-0">
                        {
                            listLoading ? (
                                <p className="text-gray-400 text-sm">Đang tải thiết bị...</p>
                            ) : (
                                devices.length >= 1 && (
                                    <DJDevicesGrid devices={devices} />
                                )
                            )
                        }
                    </div>
                    <div className="flex flex-wrap justify-start w-full items-start gap-2"
                        style={{ height: "fit-content" }}
                    >
                        {
                            listLoading ? (
                                <p className="text-gray-400 text-sm">Đang tải thiết bị...</p>
                            ) : (
                                devices.length >= 1 && (
                                    <DevicesGrid devices={devices} />
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;