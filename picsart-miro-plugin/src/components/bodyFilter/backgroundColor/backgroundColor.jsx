import { useState, useEffect, useRef } from 'react';
import './backgroundColor.css';
import { HexColorPicker } from "react-colorful";
import ColorWheelImg from '/src/assets/colorwheel.png';
import AwesomeColorPicker from '../../awesomeColorPicker/awesomeColorPicker';


const BackgroundColor = ({ setBackgroundColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colorInputRef = useRef(null); // Ref for the color input container

    // Toggle color picker visibility when clicking on the span
    const toggleColorPicker = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="color-picker-container" ref={colorInputRef}>
            <div
                className="main-box"
                onClick={toggleColorPicker}
            >
                <span>Background Color</span>
                <img
                    src={ColorWheelImg}
                    alt="Color Wheel"
                    className="colorwheel-icon"
                />
            </div>

            {isOpen && <AwesomeColorPicker setBackgroundColor={setBackgroundColor} />}

        </div>
    );
};

export default BackgroundColor;
