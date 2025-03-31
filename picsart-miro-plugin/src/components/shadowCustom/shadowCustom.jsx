import { useState } from "react";
import './shadowCustom.css';


const ShadowCustom = ({ blur, opacity, setNestedShadow , setShadow }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [choice, setChoice] = useState(false);
  	const [selectedOption, setSelectedOption] = useState("disabled");

  // Handle the selection of a format
  const handleOptionSelect = (format) => {
    setSelectedOption(format);
    setIsOpen(false);
	  setChoice(true);
    setNestedShadow(format);
    setShadow({
      'shadow': format,
      'shadow_opacity': opacity,
      'shadow_blur': blur,
    });
  };


  return (
    <div className="file-format-container">
      <div className="main-box" tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
						  setIsOpen((prev) => !prev)
            }
          }} 
          onClick={() => setIsOpen((prev) => !prev)}>
        <span>{choice ? selectedOption.toUpperCase() : "Custom"}</span>
        <span className="plus-icon">{isOpen ? '▼' : '►'}</span>
      </div>

      {isOpen && (
        <div className="dropdown">
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("custom")}
          onClick={() => handleOptionSelect("custom")}
        >
          Custom
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("bottom-right")}
          onClick={() => handleOptionSelect("bottom-right")}
        >
          Bottom-right
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("bottom")}
          onClick={() => handleOptionSelect("bottom")}
        >
          Bottom
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("bottom-left")}
          onClick={() => handleOptionSelect("bottom-left")}
        >
          Bottom-left
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("left")}
          onClick={() => handleOptionSelect("left")}
        >
          Left
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("right")}
          onClick={() => handleOptionSelect("right")}
        >
          Right
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("top-left")}
          onClick={() => handleOptionSelect("top-left")}
        >
          Top-left
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("top")}
          onClick={() => handleOptionSelect("top")}
        >
          Top
        </div>
        <div
          className="dropdown-item"
          tabIndex={0}
          onKeyDown={(event) => event.key === "Enter" && handleOptionSelect("top-right")}
          onClick={() => handleOptionSelect("top-right")}
        >
          Top-right
        </div>
      </div>      
      )}
    </div>
  );
};

export default ShadowCustom;
