import React, { useState, useRef } from "react";
import "./ColorTemperatureSlider.css";

function ColorTempSlider({ initial, onChange }) {
    const [tempColor, setTempColor] = useState(initial);
    // console.log(tempColor);

    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;
        setTempColor(val);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onChange({ properties: { temp_value: val * 10 } })
        }, 200);
    };

    return (
        // Thêm một container cho slider đã xoay
        <div className="color-temp-slider-container"
            onClick={(e) => {
                e.stopPropagation(); // 👈 Chặn sự kiện click nổi lên cha
                // handleClick({ properties: { work_mode: "colour" } });
            }}
        >
            <input
                type="range"
                min="0"
                max="100"
                value={tempColor}
                onChange={handleChange}
                className="color-temp-slider"
            />
        </div>
    );
}

export default ColorTempSlider;