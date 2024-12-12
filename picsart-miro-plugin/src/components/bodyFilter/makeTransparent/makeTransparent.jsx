import { useState, useContext, useEffect, useRef } from 'react';
import { ApiKeyContext } from '../../../settings/apiKeyProvider';
import ErrorMessage from '../../errorMessage/errorMessage';
import axios from 'axios';
import './makeTransparent.css';
import Loading from '../../loading/loading';

const MakeTransparent = ({ disabledButton, imagesArray, setImagesArray, removeHandleProcess }) => {
	const { apiKey } = useContext(ApiKeyContext);
	const componentRef = useRef(null);

	const [isLoading, setLoading] = useState(false);
	const [isComponentActive, setComponentActive] = useState(false);

	async function removeBg() {

		setLoading(prev => true);
		try {
			for (let i = 0; i < imagesArray.length; ++i) {
				const form = new FormData();
				form.append('output_type', 'cutout');
				form.append('bg_blur', '0');
				form.append('scale', 'fit');
				form.append('auto_center', 'false');
				form.append('stroke_size', '0');
				form.append('stroke_color', 'FFFFFF');
				form.append('stroke_opacity', '100');
				form.append('shadow', 'disabled');
				form.append('shadow_opacity', '20');
				form.append('shadow_blur', '50');
				form.append('format', 'PNG');

				const response = await fetch(imagesArray[i].url);
				const blob = await response.blob();
				form.append('image', blob, `uploaded-image.png`);

				const options = {
					method: 'POST',
					url: 'https://api.picsart.io/tools/1.0/removebg',
					headers: {
						accept: 'application/json',
						'X-Picsart-API-Key': apiKey
					},
					data: form,
				};

				try {
					const response = await axios.request(options);
					const credits = response.headers['x-picsart-credit-available'];
					const imageUrl = response.data.data.url;
					await removeHandleProcess(imagesArray[i], credits, imageUrl);
				} catch (error) {
					console.error(error.response.data.detail);
				}
			}
		} finally {
			setImagesArray(prev => []);
			setComponentActive(false);
			setLoading(prev => false);
		}
	}

	return (
		<div>
			<div
				className={disabledButton ? "main-box-disabled" : "main-box"}
				onClick={async () => {

					if (imagesArray.length && !disabledButton) {
						await removeBg();
					} else {
						setImagesArray([]);
						setComponentActive(true);
					}
				}}
			>
				<span>Make Transparent</span>

				<img
					src='/src/assets/checkboard.png'
					alt="Checkboard"
					className="checkboard-icon"
				/>
			</div>
			{isComponentActive && !imagesArray.length && <ErrorMessage message={"Please choose an image"} />}
			{isLoading && <Loading/>}
		</div>
	);
};

export default MakeTransparent;
