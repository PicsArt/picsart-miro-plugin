import { useState } from "react";
import './fileFormat.css';

const FileFormat = ({ setFileFormat }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [choice, setChoice] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("jpg");

  // Handle the selection of a format
  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
    setIsOpen(false);
	  setChoice(true);
    setFileFormat(format);
  };

  return (
    <div className="file-format-container">
      <div className="main-dropdown-box" onClick={() => setIsOpen((prev) => !prev)}>
        <span>{choice ? selectedFormat.toUpperCase() : "File Format"}</span>
        <span className="plus-icon">{isOpen ? '-' : '+'}</span>
      </div>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={() => handleFormatSelect("JPG")}>JPG</div>
          <div className="dropdown-item" onClick={() => handleFormatSelect("PNG")}>PNG</div>
          <div className="dropdown-item" onClick={() => handleFormatSelect("WEBP")}>WEBP</div>
        </div>
      )}
    </div>
  );
};

export default FileFormat;
