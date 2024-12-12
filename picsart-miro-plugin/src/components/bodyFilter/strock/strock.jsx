import { useState } from 'react';
import './strock.css';


const Strock = ({setStrock}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [size, setSize] = useState(0);
	const [opacity, setOpacity] = useState(1);
	const [hue, setHue] = useState(16777215);
	const [color, setColor] = useState(hue.toString(16).toUpperCase().padStart(6, '0'));

	return (
		<>
			<div className="main-box" onClick={() => setIsOpen((prev) => !prev)}>
				<span>Strock</span>
				<span className="plus-icon">{isOpen ? '-' : '+'}</span>
			</div>

			{isOpen && (
				<div className="slider-container">
				<div className="color-slider-wrapper">
					<label className="slider-label">Color:</label>
					<input
						type="range"
						min="0"
						max="16777215"
						value={hue}
						onChange={(e) => {
							setHue(e.target.value);
							const updatedColor = Number(e.target.value).toString(16).toUpperCase().padStart(6, '0');
							setColor(updatedColor);
							setStrock({
								'stroke_size': size,
								'stroke_color': updatedColor,
								'stroke_opacity': (opacity * 100).toFixed(0),
							});
						}}
						className="hue-slider"
					/>
					<div className="color-preview-container">
						<div
							className="color-preview"
							style={{
								backgroundColor: `#${color}`,
							}}
						></div>
						<span className="color-hex">#{color}</span>
					</div>
				</div>

					<div className="slider-wrapper">
						<label className="slider-label">Size:</label>
						<input
							type="range"
							min="0"
							max="100"
							value={size}
							onChange={(e) => {
								setSize(e.target.value);
								setStrock({
									'stroke_size': size,
    								'stroke_color': color,
    								'stroke_opacity': (opacity * 100).toFixed(0),
								});
							}}
							className="size-slider"
						/>
						<span className="slider-value">{size}</span>
					</div>
					<div className="slider-wrapper">
						<label className="slider-label">Opacity:</label>
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={opacity}
							onChange={(e) => {
								setOpacity(e.target.value);
								setStrock({
									'stroke_size': size,
    								'stroke_color': color,
    								'stroke_opacity': (opacity * 100).toFixed(0),
								});
							}}
							className="opacity-slider"
						/>
						<span className="slider-value">{(opacity * 100).toFixed(0)}%</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Strock;
