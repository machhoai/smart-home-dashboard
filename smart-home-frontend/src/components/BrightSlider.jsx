import React, { useState, useRef } from "react";
import "./BrightSlider.css";

function BrightSlider() {
    const [bright, setBright] = useState(30);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;

        // Update state để UI mượt
        setBright(val);

        // Debounce API call
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("Call API with:", val);
        }, 200);
    };

    // Tính phần trăm đã chọn
    const percent = (bright / 100) * 100;

    return (
        <div className="slider-wrapper">
            <input
                type="range"
                min="0"
                max="100"
                value={bright}
                onChange={handleChange}
                className="bright-slider"
            />
        </div>
    );
}

export default BrightSlider;
