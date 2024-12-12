import React from 'react';
import './imputFilter.css'
import { useState } from 'react';

const isNumericOption = (option) => {
	return ("123456789".includes(option));
}

const ImputFilter = ({ options, onChange, label, onDropdownClick }) => {

	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);


  const handleSelect = (option) => {
      onChange(option);
      onDropdownClick();
	  setSelectedOption(option);
	  setIsOpen((prev) => false);
  };

  return (


	 <div className="file-format-container">
       <div className="main-box" onClick={() => setIsOpen((prev) => !prev)}>
         <span>{selectedOption == null ? label : selectedOption}</span>
         <span className="plus-icon">{isOpen ? '-' : '+'}</span>
       </div>
       {isOpen && (
         <div className="dropdown-menu">
           {options.map((option) => (
             <div
               key={option}
               className="dropdown-item"
               onClick={() => handleSelect(option)}
             >
               {(isNumericOption(option)) ? option.concat("x") : option}
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

export default ImputFilter;
