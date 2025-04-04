import { useState } from "react";

const OutputType = ({ setOutputType }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [choice, setChoice] = useState(false);
  	const [selectedFormat, setSelectedFormat] = useState("cutout");

  	// Handle the selection of a format
  	const handleFormatSelect = (format) => {
    	setSelectedFormat(format);
    	setIsOpen(false);
	  	setChoice(true);
		setOutputType(format);
  	};

  	return (
    	<div className="file-format-container">
      		<div className="main-dropdown-box" 
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						setIsOpen((prev) => !prev)
					}
				}} 
			    onClick={() => setIsOpen((prev) => !prev)}>
        		<span>{choice ? selectedFormat.toUpperCase() : "Output Type"}</span>
        		<span className="plus-icon">{isOpen ? '-' : '+'}</span>
      		</div>

      		{isOpen && (
        	<div className="dropdown">
          		<div className="dropdown-item" tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						handleFormatSelect("cutout")
					}
				}} 
				onClick={() => handleFormatSelect("cutout")}>Cutout</div>
          		<div className="dropdown-item"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						handleFormatSelect("mask")
					}
				}} 
				onClick={() => handleFormatSelect("mask")}>Mask</div>
        	</div>
      		)}
    	</div>
  	);
};

export default OutputType;
