import { useState } from "react";
import DragAndDropComp from "./DragAndDropComp";
import { SubCategory } from "./types";
import trashIcon from "../assets/trash-01.svg";

type Props = {
  accChild: SubCategory[];
  accTitle: string;
};

export interface imageData {
  file: File;
  url: string;
}
const PhotosComp = ({}: Props) => {
  const [imageData, setimageData] = useState<imageData[]>([]);

  const handleImageData = (item: imageData[]) => {
    setimageData([...imageData, ...item]);
  };

  const handleRemove = (url: string) => {
    const filteredImages = imageData.filter((image) => image.url !== url);
    setimageData(filteredImages);
  };

  return (
    <>
      <div className="queDetailDiv">
        <DragAndDropComp onFileData={handleImageData} />
      </div>
      <div className="ImageDescWrppaer">
        <div className="issueImageWrapper">
          {imageData &&
            imageData.map((item: imageData, index: number) => (
              <div key={index} className="imgRelativeDiv">
                <img src={item.url} alt={`${index}`} className="issueimage" />
                <button
                  className="trashIcon"
                  type="button"
                  onClick={() => handleRemove(item.url)}
                >
                  <img src={trashIcon} />
                </button>
              </div>
            ))}
        </div>
        <div className="textAreaWrapper">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            placeholder="Tell us more about your problem on the photo"
          />
        </div>
      </div>
    </>
  );
};

export default PhotosComp;
