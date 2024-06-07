import React, { useEffect, useState } from "react";
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
export interface ImageDataState {
  issue_name: string;
  image: imageData[];
}
const PhotosComp = ({ control, setValue, register }: Props) => {
  // const files = watch("files");
  const { imageDataOld, updateFormData, setimageDataOld } = useFormData();
  const [imageData, setimageData] = useState<ImageDataState[]>(imageDataOld);
  // const [percentCount, setPercentCount] = useState<number>(0);

  useEffect(() => {
    updateFormData({ files: imageData });
    setValue("files", imageData);
    setimageDataOld(imageData);
  }, [imageData]);

  const { issueDataOld } = useFormData();
  const issueNames = issueDataOld
    .filter((item) => item.sub_issue.some((sub) => sub.checked))
    .map((item) => item.issue_name);

  const handleImageData = (newImages: imageData[], issue_name: string) => {
    setimageData((prevData) => {
      const existingEntryIndex = prevData.findIndex(
        (entry) => entry.issue_name === issue_name
      );

      if (existingEntryIndex !== -1) {
        return prevData.map((entry, index) => {
          if (index === existingEntryIndex) {
            return {
              ...entry,
              image: [...entry.image, ...newImages],
            };
          }
          return entry;
        });
      } else {
        return [...prevData, { issue_name, image: newImages }];
      }
    });
  };

  const handleRemove = (url: string, issueName: string) => {
    setimageData((prevData) => {
      return prevData.map((entry) => {
        if (entry.issue_name === issueName) {
          // Filter out the image with the specified URL
          const updatedImages = entry.image.filter(
            (image) => image.url !== url
          );
          return { ...entry, image: updatedImages };
        }
        return entry;
      });
    });
  };
  return (
    <>
      {issueNames &&
        issueNames.map((issue: string) => (
          <React.Fragment key={issue}>
            <div className="CdnPurpleIssueTitleInUplaodImage">{issue}</div>
            <div className="CdnPurpleQueDetailDiv">
              <DragAndDropComp
                onFileData={(img) => handleImageData(img, issue)}
                inputRef={`files.[${issue}]`}
                setValue={setValue}
                control={control}
                key={issue}
              />
            </div>
            <div className="CdnPurpleImageDescWrppaer">
              <div className="CdnPurpleIssueImageWrapper">
                {imageData
                  .filter((item) => item.issue_name === issue)
                  .map((item: ImageDataState, index: number) => (
                    <div
                      key={index}
                      className="CdnPurpleImageDescWrppaer"
                      style={{ flexDirection: "row", flexWrap: "wrap" }}
                    >
                      {item.image.map((img, imgIndex) => (
                        <div key={imgIndex} className="CdnPurpleImgRelativeDiv">
                          <img
                            src={img.url}
                            alt={`Image ${imgIndex}`}
                            className="CdnPurpleIssueImage"
                          />
                          <button
                            className="CdnPurpleTrashIcon"
                            type="button"
                            onClick={() =>
                              handleRemove(img.url, item.issue_name)
                            }
                          >
                            <img src={trashIcon} alt="Delete" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
              <div className="CdnPurpleTextAreaWrapper">
                <label htmlFor="desc">Description for {issue} issue</label>
                <TextArea
                  name={`desc.${issue}`}
                  register={register}
                  placeholder="Tell us more about your problem on the photo"
                  id="desc"
                />
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export default PhotosComp;

{
  /* {imageData.length > 0 && (
  <div className="CdnPurpleUploadingStateDiv">
    <p className="CdnPurpleUploadStatetext">
      {percentCount === 100 ? "Uploaded..." : "Uploading..."}
    </p>
    <p className="CdnPurpleUploadSize">
      {imageData[imageData.length - 1]?.image.size}
    </p>
    <div className="CdnPurpleUploadLoadingBarWrapper">
      <div className="CdnPurpleProgressBarLoader">
        <div
          className="CdnPurpleProgressBarWidth"
          key={percentCount}
          key={imageData[imageData.length - 1]?.size}
          style={{
            width: `${percentCount}%`,
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
      </div>
      <div className="CdnPurplePercentage">{percentCount}%</div>
    </div>
  </div>
)} */
}
