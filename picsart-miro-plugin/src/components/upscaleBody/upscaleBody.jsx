import ImputFilter from "../imputFilter/imputFilter";
import { useState } from "react";
import ProcessingButton from "../processingButton/processingButton";
import './upscaleBody.css'

const UpscaleBody = ({ disabledButton, imagesArray, setImagesArray, upscaleHandleProcess}) => {

    const [upscaleFactor, setUpscaleFactor] = useState('2');
    const [fileFormat, setFileFormat] = useState('JPG');

    const [dropdownStates, setDropdownStates] = useState({
        outputType: false,
        shadow: false,
        fileFormat: false,
        backgroundOptions: false,
        strokeOptions: false,
        upscaleFactor: false
    });

    const toggleDropdown = (option) => {
        setDropdownStates((prev) => ({
          ...prev,
          [option]: !prev[option],
        }));
    };

    const ImputFilterOptions = [
        {
            label: "Upscale Factor",
            options: ['2', '4', '6', '8'],
            value: upscaleFactor,
            onChange: setUpscaleFactor,
            isOpen: dropdownStates.upscaleFactor,
            onDropdownClick: () => { toggleDropdown('upscaleFactor') }
        },
        // {
        //     label: "File Format",
        //     options: ['JPG', 'PNG', 'WEBP'],
        //     value: fileFormat,
        //     onChange: setFileFormat,
        //     isOpen: dropdownStates.fileFormat,
        //     onDropdownClick: () => { toggleDropdown('fileFormat') }
        // }
    ];

    return (
        <div>

            <span className="helper-text">
                Improve your image resolution with ease. Please
                select your upscale factor:
			</span>

            {ImputFilterOptions.map((item) =>
                <ImputFilter
                    label={item.label}
                    options={item.options}
                    value={item.value}
                    onChange={item.onChange}
                    isOpen={item.isOpen}
                    onDropdownClick={item.onDropdownClick}
                />
            )}
            <ProcessingButton disabledButton={disabledButton} imagesArray={imagesArray} setImagesArray={setImagesArray} upscaleHandleProcess={upscaleHandleProcess} filterOptions={ImputFilterOptions} />
        </div>
    );
};

export default UpscaleBody;
