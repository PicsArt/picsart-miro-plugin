import { useState, useContext } from 'react';
import { ApiKeyContext } from '../../settings/apiKeyProvider';
import ErrorMessage from '../errorMessage/errorMessage';
import axios from 'axios';
import './processingButton.css'
import Loading from '../loading/loading';


const ProcessingButton = (props) => {
	const [isLoading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState('');
    const { apiKey } = useContext(ApiKeyContext);


    async function upscaleHandler(filterOptions) {
        if (props.disabledButton) return;
		setLoading(prev => true);

        try {
            for (let i = 0; i < props.imagesArray.length; ++i) {
                const form = new FormData();
                form.append('upscale_factor', filterOptions[0].value); // 2, 4, 6, 8
                // if you want to use file format you can change
                // 'JPG' to filterOptions[1].value
                form.append('format', 'JPG'); // ['JPG', 'PNG', 'WEBP']

                const response = await fetch(props.imagesArray[i].url); // img === dataUrl
                const blob = await response.blob();
                form.append('image', blob, `uploaded-image.png`);

                const options = {
                    method: 'POST',
                    url: 'https://api.picsart.io/tools/1.0/upscale',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'multipart/form-data',
                        'X-Picsart-API-Key': apiKey,
                        'X-Picsart-Plugin': 'Miro'
                    },
                    data: form,
                };

                try {
                    const response = await axios.request(options);
                    const credits = response.headers['x-picsart-credit-available'];
                    const imageUrl = response.data.data.url;
                    await props.upscaleHandleProcess(props.imagesArray[i], credits, imageUrl);
                } catch (error) {
                    console.error(error.response.data.detail);
                }
            }
        } finally {
            props.setImagesArray([]);
			setLoading(prev => false);
        }
    }

    async function removeBgHandler(imagesArray, setImagesArray, removeHandleProcess, removeFilterOptions) {
        if (props.disabledButton) return;
        
		setLoading(prev => true);

        try {
            for (let i = 0; i < imagesArray.length; ++i) {
                const form = new FormData();
                form.append('output_type', removeFilterOptions.outputType);
                form.append('scale', 'fit');
                form.append('auto_center', 'false');
                form.append('stroke_size', removeFilterOptions.strock.stroke_size);
                form.append('stroke_opacity', removeFilterOptions.strock.stroke_opacity);
                form.append('shadow', removeFilterOptions.shadow.shadow);
                form.append('shadow_opacity', removeFilterOptions.shadow.shadow_opacity);
                form.append('shadow_blur', removeFilterOptions.shadow.shadow_blur);
                form.append('format', removeFilterOptions.fileFormat);

                if (removeFilterOptions.backgroundColor) form.append('bg_color', removeFilterOptions.backgroundColor);
                else form.append('stroke_color', removeFilterOptions.strock.stroke_color);

                const response = await fetch(imagesArray[i].url); // img === dataUrl
                const blob = await response.blob();
                form.append('image', blob, `uploaded-image.png`);

                const options = {
                    method: 'POST',
                    url: 'https://api.picsart.io/tools/1.0/removebg',
                    headers: {
                        accept: 'application/json',
                        'X-Picsart-API-Key': apiKey,
                        'X-Picsart-Plugin': 'Miro'
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
                } finally {
                    setImagesArray([]);
                }

            }
        } finally {
            props.setImagesArray([]);
			setLoading(prev => false);
        }
    }

    return (
        <div>
            <div 
            className={props.disabledButton ? "start-processing-disabled" : "start-processing"}
			onClick={ async () => {
				if (!props.imagesArray.length) {
					setErrorText("Please choose image");
				} else if (props.filterOptions) {
                    setErrorText('');
					await upscaleHandler(props.filterOptions);
				} else {
                    setErrorText('');
					await removeBgHandler(props.imagesArray, props.setImagesArray, props.removeHandleProcess, props.removeFilterOptions);
				}
			}
			}
			>
			    <span>Start Processing</span>
		    </div>
            {errorText && <ErrorMessage message={errorText} />}
			{isLoading && <Loading/>}
        </div>
    );
};

export default ProcessingButton;
