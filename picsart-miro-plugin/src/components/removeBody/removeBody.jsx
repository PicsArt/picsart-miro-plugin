import MakeTransparent from "../bodyFilter/makeTransparent/makeTransparent";
import BackgroundColor from "../bodyFilter/backgroundColor/backgroundColor";
import Shadow from "../bodyFilter/shadow/shadow";
import Strock from "../bodyFilter/strock/strock";
import OutputType from "../bodyFilter/outputType/outputType";
import FileFormat from "../bodyFilter/fileFormat/fileFormat";
import ProcessingButton from "../processingButton/processingButton";
import { useState } from "react";


const RemoveBody = ({ disabledButton, imagesArray, setImagesArray, removeHandleProcess }) => {

    const [backgroundColor, setBackgroundColor] = useState(null);
    const [shadow, setShadow] = useState({
        'shadow': 'disabled',
        'shadow_opacity': '20',
        'shadow_blur': '50',
    });
    const [strock, setStrock] = useState({
        'stroke_size': '0',
        'stroke_color': 'FFFFFF',
        'stroke_opacity': '100',
    });

    const [outputType, setOutputType] = useState('cutout');
    const [fileFormat, setFileFormat] = useState('PNG');

    const form = {
        backgroundColor: backgroundColor,
        shadow: shadow,
        strock: strock,
        outputType: outputType,
        fileFormat: fileFormat
    };

    return (
        <div>
            {/* <MakeTransparent disabledButton={disabledButton} imagesArray={imagesArray} setImagesArray={setImagesArray} removeHandleProcess={removeHandleProcess} /> */}
            <BackgroundColor setBackgroundColor={setBackgroundColor} />
            <Shadow setShadow={setShadow} />
            <Strock setStrock={setStrock} />
            <OutputType setOutputType={setOutputType} />
            {/* if you want to use file format you can just delete comment */}
            {/* <FileFormat setFileFormat={setFileFormat} /> */}
            <ProcessingButton disabledButton={disabledButton} imagesArray={imagesArray} setImagesArray={setImagesArray} removeHandleProcess={removeHandleProcess} removeFilterOptions={form} />
        </div>
    );
};

export default RemoveBody;
