import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPickerComponent() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [color, setColor] = useState('#07C4CC');

  const handleButtonClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <div>
      {!isPickerOpen ? (
        <div
          onClick={handleButtonClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px dashed lightgray',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '250px',
          }}
        >
          <span style={{ flex: 1, color: 'gray' }}>Background color</span>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: color,
            }}
          ></div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={handleButtonClick}>
            <span>Background color</span>
          </div>
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}

export default ColorPickerComponent;
