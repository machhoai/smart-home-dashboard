import React, { useState } from "react";
import "./HueSlider.css";

function HueSlider() {
    const [hue, setHue] = useState(30);

    const color = `hsl(${hue}, 100%, 50%)`;

    const handleChange = (e) => {
        const val = e.target.value;

        // Update UI ngay để slider mượt
        setHue(val);

        // Debounce API call hoặc logic nặng
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            console.log("Call API with:", val);
        }, 200);
    };

    return (
        <div className=""
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
