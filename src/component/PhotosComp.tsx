import { useEffect, useState } from "react";
import DragAndDropComp from "./DragAndDropComp";
import { SubCategory } from "./types";
import trashIcon from "../assets/trash-01.svg";
import { useFormData } from "../Provider/FormDataConext";
import TextArea from "./TextAreaComponent";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

type Props = {
  accChild: SubCategory[];
  accTitle: string;
  control: any;
  setValue: any;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
};
export interface imageData {
  file: File;
  url: string;
  size: string;
}
const PhotosComp = ({ control, setValue, register, watch }: Props) => {
  // const files = watch("files");
  const { imageDataOld, updateFormData, setimageDataOld, setDesc, desc } =
    useFormData();
  const [imageData, setimageData] = useState<imageData[]>(imageDataOld);
  const [percentCount, setPercentCount] = useState<number>(0);

  useEffect(() => {
    updateFormData({ files: imageData });
    setimageDataOld(imageData);
  }, [imageData]);

  const descVal = watch("desc");

  useEffect(() => {
    setDesc(descVal);
  }, [descVal]);

  useEffect(() => {
    if (imageData.length > 0) {
      setPercentCount(0); // Reset progress to 0
      const interval = setInterval(() => {
        setPercentCount((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return oldProgress + 10; // Increment progress
        });
      }, 25); // Adjust time interval as needed

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [imageData]);

  const handleImageData = (item: imageData[]) => {
    setimageData([...imageData, ...item]);
  };

  const handleRemove = (url: string) => {
    const filteredImages = imageData.filter((image) => image.url !== url);
    setimageData(filteredImages);
    setValue(
      "files",
      filteredImages.map((image) => image.file)
    );
  };

  return (
    <>
      <div className="CdnPurpleQueDetailDiv">
        <DragAndDropComp
          onFileData={handleImageData}
          inputRef="files"
          setValue={setValue}
          control={control}
        />
      </div>
      <div className="CdnPurpleImageDescWrppaer">
        <div className="CdnPurpleIssueImageWrapper">
          {imageData &&
            imageData.map((item: imageData, index: number) => (
              <div key={index} className="CdnPurpleImgRelativeDiv">
                <img
                  src={item.url}
                  alt={`${index}`}
                  className="CdnPurpleIssueImage"
                />
                <button
                  className="CdnPurpleTrashIcon"
                  type="button"
                  onClick={() => handleRemove(item.url)}
                >
                  <img src={trashIcon} />
                </button>
              </div>
            ))}
        </div>
        <div className="CdnPurpleTextAreaWrapper">
          <label htmlFor="desc">Description</label>
          <TextArea
            name="desc"
            register={register}
            value={desc}
            placeholder="Tell us more about your problem on the photo"
            id="desc"
          />
        </div>
      </div>
      {imageData.length > 0 && (
        <div className="CdnPurpleUploadingStateDiv">
          <p className="CdnPurpleUploadStatetext">
            {percentCount === 100 ? "Uploaded..." : "Uploading..."}
          </p>
          <p className="CdnPurpleUploadSize">
            {imageData[imageData.length - 1]?.size}
          </p>
          <div className="CdnPurpleUploadLoadingBarWrapper">
            <div className="CdnPurpleProgressBarLoader">
              <div
                className="CdnPurpleProgressBarWidth"
                key={percentCount}
                // key={imageData[imageData.length - 1]?.size}
                style={{
                  width: `${percentCount}%`,
                  transition: "width 0.3s ease-in-out",
                }}
              ></div>
            </div>
            <div className="CdnPurplePercentage">{percentCount}%</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotosComp;
