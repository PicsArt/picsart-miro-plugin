import { useEffect, useState } from "react";
import RemoveUpscaleButton from '../components/removeUpscaleButton/removeUpscaleButton'
import RemoveBody from "../components/removeBody/removeBody";
import UpscaleBody from "../components/upscaleBody/upscaleBody";
import Balance from "../components/balance/balance";

const Editing = () => {

  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [removeUpscaleState, setRemoveUpscaleState] = useState(true);
  const [credits, setCredits] = useState(0);
  const [imagesArray, setImagesArray] = useState([]);

  // miro.board.ui.on('selection:update', async (event) => {

  //   const selectedWidgets = event.items;
  //   const imageWidgets = selectedWidgets.filter(widget => {
  //     return widget.type === 'image';
  //   });

  //   if (!imagesArray.length && imageWidgets.length !== 0) {
  //     const tempArray = [];
  //     setDisabledButton(false);
  //     for (let i = 0; i < imageWidgets.length; ++i) {
  //       const imgUrl = await imageWidgets[i].getDataUrl();
  //       tempArray.push({
  //         url: imgUrl,
  //         width: imageWidgets[i].width,
  //         x: imageWidgets[i].x,
  //         y: imageWidgets[i].y,
  //         type: imageWidgets[i].type,
  //         id: imageWidgets[i].id,
  //       });
  //     }

  //     console.log('au');
  //     setImagesArray(tempArray);
  //   } else if (imageWidgets.length === 0) {
  //     console.log('vau');
  //     setDisabledButton(true);
  //     setImagesArray([]);
  //   }
  // });

  useEffect(() => {
    const handleSelectionUpdate = async (event) => {
      const selectedWidgets = event.items;
      const imageWidgets = selectedWidgets.filter(widget => widget.type === 'image');

      if (!imagesArray.length && imageWidgets.length !== 0) {
        const tempArray = [];
        setDisabledButton(false);
        for (let i = 0; i < imageWidgets.length; ++i) {
          const imgUrl = await imageWidgets[i].getDataUrl();
          tempArray.push({
            url: imgUrl,
            width: imageWidgets[i].width,
            x: imageWidgets[i].x,
            y: imageWidgets[i].y,
            type: imageWidgets[i].type,
            id: imageWidgets[i].id,
          });
        }

        setImagesArray(tempArray);
      } else if (imageWidgets.length === 0) {
        setDisabledButton(true);
        setImagesArray([]);
      }
    };

    miro.board.ui.on('selection:update', handleSelectionUpdate);

    return () => {
      miro.board.ui.off('selection:update', handleSelectionUpdate);
    };
  }, [imagesArray])

  const handleProcessed = async (currentImg, remainingCredits, imageUrl) => {
    setImage(currentImg.url);
    setCredits(remainingCredits);
    await miro.board.createImage({
      url: imageUrl,
      x: currentImg.x,
      y: currentImg.y,
      width: currentImg.width,
    });
    await miro.board.remove({
      id: currentImg.id,
      type: currentImg.type
    });
  };

  function setStateRemoveUpscale(changedState) {
      setRemoveUpscaleState(changedState);
  }

  return (
      <div>
          <RemoveUpscaleButton buttonStateChanger={setStateRemoveUpscale} />
          { removeUpscaleState ? <RemoveBody disabledButton={disabledButton} imagesArray={imagesArray} setImagesArray={setImagesArray} removeHandleProcess={handleProcessed} /> : <UpscaleBody disabledButton={disabledButton} imagesArray={imagesArray} setImagesArray={setImagesArray} upscaleHandleProcess={handleProcessed} /> }
          <Balance credits={credits} setCredits={setCredits}/>
      </div>
  );
};

export default Editing;
