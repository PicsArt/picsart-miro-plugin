import { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import './awesomeColorPicker.css'

export default function AwesomeColorPicker ({ setBackgroundColor }) {
    const [color, setColor] = useState("#aabbcc");
    const [isOpen, setIsOpen] = useState(true);
    const [hexInput, setHexInput] = useState(color);

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setHexInput(newColor); // Update hex input when the color is changed via the picker
        setBackgroundColor(newColor);
    };

    const handleHexInputChange = (e) => {
        const newHex = e.target.value;
        setHexInput(newHex);
    };

    const handleHexSubmit = () => {
        // Validate the hex color code before applying
        if(/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
            setColor(hexInput);
        }
    };

    return (
        <>
            <section className='color-picker'>
                <HexColorPicker color={color} onChange={handleColorChange} />
            </section>

            <div
                className="hex-box"
                onClick={() => { setIsOpen((prev) => !prev); }}
            >
                <span>HEX</span>
                <span className="arrow-icon">{isOpen ? '▼' : '►'}</span>
            </div>

            {isOpen && (
                <div className="hex-box">
                    <input
                        type="text"
                        value={hexInput}
                        onChange={handleHexInputChange}
                        onBlur={handleHexSubmit}  // Submit when the input field loses focus
                        maxLength={7} // Limit input to 7 characters (e.g., #ffffff)
                        className="hex-input"  // Apply custom class for styling
                    />
                </div>
            )}
        </>
    );
}
