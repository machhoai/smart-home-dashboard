import React, { useRef, useState, useEffect } from "react";
import "./VerticalBrightSlider.css";
import { Sun } from "lucide-react";

export default function VerticalBrightSlider({
    height = 220,
    width = 30,
    initial = 40,
    onChangeDebounced,
    debounceMs = 180,
    invert = true,
}) {
    const trackRef = useRef(null);
    const timeoutRef = useRef(null);
    const [value, setValue] = useState(Math.max(0, Math.min(100, initial)));
    const [isDragging, setDragging] = useState(false);

    const thumbSize = 32;
    const thumbHalf = thumbSize / 2;

    useEffect(() => {
        if (typeof initial === "number") {
            const clamped = Math.max(0, Math.min(100, initial));
            setValue(clamped);
        }
    }, [initial]);

    // useEffect(() => {
    //     console.log("Current value:", value);
    // }, [value]);

    // Tính vị trí thumb
    const pos =
        ((invert ? 1 - value / 100 : value / 100) * (height - thumbSize)) +
        thumbHalf;

    // cập nhật value từ clientY
    const updateFromClientY = (clientY) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();

        let y = clientY - rect.top;
        y = Math.max(thumbHalf, Math.min(rect.height - thumbHalf, y));

        const ratio = (y - thumbHalf) / (rect.height - thumbSize);
        const newValue = Math.round((invert ? 1 - ratio : ratio) * 100);

        setValue(newValue);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onChangeDebounced?.(newValue);
        }, debounceMs);
    };

    const handlePointerDown = (e) => {
        setDragging(true);
        updateFromClientY(e.clientY);

        const handleMove = (ev) => updateFromClientY(ev.clientY);
        const handleUp = (ev) => {
            updateFromClientY(ev.clientY);
            setDragging(false);
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div
            className="vbs-root"
            style={{ height: `${height}px`, width: `${width}px` }}
        >
            <div
                className="vbs-track"
                ref={trackRef}
                onPointerDown={handlePointerDown}
            >
                <Sun className="vbs-icon" size={16} />
                {/* Fill trên */}
                <div
                    className="vbs-fill-top"
                    style={{
                        height: `${pos}px`,
                        background: "#808080",
                        opacity: 0.5,
                    }}
                />

                {/* Fill dưới */}
                <div
                    className="vbs-fill-bottom"
                    style={{
                        top: `${pos - 16}px`,
                        bottom: 0,
                        borderRadius: "1000px",
                        background: "#C9C9C9",
                    }}
                />

                {/* Thumb */}
                <div
                    className={`vbs-thumb ${isDragging ? "dragging" : ""}`}
                    style={{ top: `${pos - 1}px` }}
                />
            </div>
        </div>
    );
}
