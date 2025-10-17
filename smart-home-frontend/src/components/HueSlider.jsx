import React, { useState, useRef, useEffect } from "react";
import "./HueSlider.css";

function HueSlider({ tuyaColorValue, onChange }) {
    // console.log(tuyaColorValue);

    const [hue, setHue] = useState(0);
    const timeoutRef = useRef(null);

    // Parse giá trị Tuya khi nhận được
    useEffect(() => {
        if (tuyaColorValue == null) return;

        if (typeof tuyaColorValue === "number") {
            // 👉 Trường hợp truyền vào là số h (vd: 175)
            setHue(tuyaColorValue);
        }
        else if (typeof tuyaColorValue === "string") {
            try {
                // 👉 Trường hợp truyền vào là chuỗi JSON colour_data_v2
                const parsed = JSON.parse(tuyaColorValue);
                if (parsed && typeof parsed.h === "number") {
                    setHue(parsed.h);
                }
            } catch (err) {
                console.error("❌ Lỗi parse colour_data_v2:", err);
            }
        }
    }, [tuyaColorValue]);

    const handleChange = (e) => {
        const val = Number(e.target.value);
        setHue(val);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const payload = {
                code: "colour_data_v2", // dùng đúng code luôn ở đây cho rõ
                value: {
                    h: val,
                    s: 1000, // điều chỉnh nếu cần
                    v: 261,  // điều chỉnh nếu cần
                },
            };

            // ✅ Gửi đúng format
            onChange({
                properties: {
                    [payload.code]: payload.value, // Tuya cần value là object, không stringify
                }
            });
        }, 200);
    };

    return (
        <div className="hue-slider-container"
            onClick={(e) => {
                e.stopPropagation(); // 👈 Chặn sự kiện click nổi lên cha
                // handleClick({ properties: { work_mode: "colour" } });
            }}
        >
            <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleChange}
                className="hue-slider"
            />
        </div>
    );
}

export default HueSlider;
