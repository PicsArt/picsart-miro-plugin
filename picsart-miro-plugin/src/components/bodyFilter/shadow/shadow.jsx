import { useState } from 'react';
import './shadow.css'
import ShadowCustom from '../../shadowCustom/shadowCustom';

const Shadow = ({ setShadow }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [blur, setBlur] = useState(50);
	const [opacity, setOpacity] = useState(0.2);
	const [nestedShadow, setNestedShadow] = useState('disabled');
	// Construct the color based on the hue value

    return (
		<>
			<div className="main-box" onClick={() => setIsOpen((prev) => !prev)}>
				<span>Shadow</span>
				<span className="plus-icon">{isOpen ? '-' : '+'}</span>
			</div>

			{isOpen && (

				<>
				<ShadowCustom blur={blur} opacity={(opacity * 100).toFixed(0)} setNestedShadow={setNestedShadow} setShadow={setShadow}/>

				<div className="slider-container">
					<div className="slider-wrapper">
						<label className="slider-label">Blur:</label>
						<input
							type="range"
							min="0"
							max="100"
							value={blur}
							onChange={(e) => {
								setBlur(e.target.value)
								setShadow({
									// tmp
									'shadow': nestedShadow,
      								'shadow_opacity': (opacity * 100).toFixed(0),
      								'shadow_blur': blur,
								});
							}}
							className="blur-slider"
						/>
						<span className="slider-value">{blur}</span>
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
								setOpacity(e.target.value)
								setShadow({
									'shadow': nestedShadow,
      								'shadow_opacity': (opacity * 100).toFixed(0),
      								'shadow_blur': blur,
								});
							}}
							className="opacity-slider"
						/>
						<span className="slider-value">{(opacity * 100).toFixed(0)}%</span>
					</div>

				</div>

			</>
			)}
		</>
    );
};

export default Shadow;
