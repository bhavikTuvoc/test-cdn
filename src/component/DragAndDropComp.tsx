import React, { useState } from "react";
import { Controller } from "react-hook-form";
import dropIcon from "../assets/Featured icon.svg";
import { imageData } from "./PhotosComp";

interface DragAndDropCompProps {
  allowMultiple?: boolean;
  onFileData?: (files: imageData[]) => void; // Callback to handle additional file data processing
  inputRef: any;
  setValue: any;
  control: any;
}

function formatFileSize(bytes: number) {
  if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(2) + " MB"; // Megabytes
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " KB"; // Kilobytes
  } else {
    return bytes + " bytes";
  }
}

const DragAndDropComp: React.FC<DragAndDropCompProps> = ({
  allowMultiple = true,
  onFileData,
  inputRef,
  control,
}) => {
  const [error, setError] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const handleFilesChange = (selectedFiles: File[]) => {
    // Generate URLs for image preview
    // const fileUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    const filesWithUrls = selectedFiles.map((file) => ({
      file: file,
      size: formatFileSize(file.size),
      url: URL.createObjectURL(file),
    }));

    if (onFileData) {
      onFileData(filesWithUrls);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const filteredFiles = Array.from(event.dataTransfer.files).filter(
        (file) =>
          ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)
      );

      if (!allowMultiple && filteredFiles.length > 1) {
        setError(true);
      } else {
        handleFilesChange(filteredFiles);
        setError(false);
      }
    }
  };

  return (
    <>
      <label
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ opacity: isDragOver ? 0.7 : 1 }}
        className={`CdnPurpleDragAndDropDiv ${
          isDragOver ? "CdnPurpleBgDragover" : ""
        }`}
      >
        <img src={dropIcon} alt="Drop here" className="CdnPurpleDropIcon" />
        <div className="CdnPurpleTextContainer">
          <p className="CdnPurpleHeroTextContainer">
            <span className="CdnPurpleHeroText">Click to upload</span> or drag
            and drop
          </p>
          <p className="CdnPurpleHeroTextContainer">
            SVG, PNG, JPG, or GIF (max. 800*400px)
          </p>
        </div>
        <Controller
          control={control}
          name={inputRef}
          render={({ field: { onBlur, ref } }) => (
            <input
              type="file"
              multiple={allowMultiple}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const filteredFiles = files.filter((file) =>
                  ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
                );
                if (!allowMultiple && filteredFiles.length > 1) {
                  setError(true);
                } else {
                  handleFilesChange(filteredFiles);
                  setError(false);
                }
              }}
              onBlur={onBlur}
              ref={ref}
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
            />
          )}
        />
      </label>
      {error && <p>Multiple files not allowed</p>}
    </>
  );
};

export default DragAndDropComp;
