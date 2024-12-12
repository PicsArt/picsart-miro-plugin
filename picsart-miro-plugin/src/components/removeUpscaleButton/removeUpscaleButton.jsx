import React, { useState } from 'react';
import './removeUpscaleButton.css';

const RemoveUpscaleButton = ({ buttonStateChanger }) => {

	const [selectedButton, setSelectedButton] = useState('remove');

	const handleButtonClick = (isRemove) => {
		setSelectedButton(isRemove ? 'remove' : 'upscale');
		buttonStateChanger(isRemove);
	};

	return (
		<div className="button-container">
			{/* Remove BG Button */}
			<button
				className={`custom-button remove-btn ${
					selectedButton === 'remove' ? 'selected' : ''
				}`}
				onClick={() => handleButtonClick(true)}
			>
				Remove BG
			</button>
			{/* Upscale Image Button */}
			<button
				className={`custom-button upscale-btn ${
					selectedButton === 'upscale' ? 'selected' : ''
				}`}
				onClick={() => handleButtonClick(false)}
			>
				Enhance
			</button>
		</div>
	);
};

export default RemoveUpscaleButton;
