import React, { useState, useRef } from "react";
import "./ColorTemperatureSlider.css";

function ColorTempSlider() {
    const [tempColor, setTempColor] = useState(30);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;

        // Update UI ngay để slider mượt
        setTempColor(val);

        // Debounce API call hoặc logic nặng
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("Call API with:", val);
        }, 200);
    };

    return (
        <input
            type="range"
            min="0"
            max="360"
            value={tempColor}
            onChange={handleChange}
            className="color-tepm-slider"
        />
    );
}

export default ColorTempSlider;

