import React from "react";

const RGBSlider = () => {
    const [r, setR] = React.useState(255);
    const [g, setG] = React.useState(0);
    const [b, setB] = React.useState(0);

    const color = `rgb(${r}, ${g}, ${b})`;

    return (
        <div className="flex flex-col gap-4 w-64">
            <div>
                <label>R: {r}</label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <label>G: {g}</label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={g}
                    onChange={(e) => setG(e.target.value)}
                    className="w-full"
                />
            </div>
            <div>
                <label>B: {b}</label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="w-full"
                />
            </div>

            <div
                className="w-32 h-32 rounded-xl shadow-lg border"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}

export default RGBSlider;