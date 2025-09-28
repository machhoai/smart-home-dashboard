import React, { useState, useRef } from "react";
import "./ColorTemperatureSlider.css";

function ColorTempSlider() {
    const [tempColor, setTempColor] = useState(30);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;
        setTempColor(val);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("Call API with:", val);
        }, 200);
    };

    return (
        // Thêm một container cho slider đã xoay
        <div className="color-temp-slider-container">
            <input
                type="range"
                min="0"
                max="360"
                value={tempColor}
                onChange={handleChange}
                className="color-temp-slider"
            />
        </div>
    );
}

export default ColorTempSlider;