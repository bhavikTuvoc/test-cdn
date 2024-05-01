import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dropIcon from "../assets/Featured icon.svg";
import { imageData } from "./PhotosComp";

interface FormData {
  files: File[]; // Using File[]
}

interface DragAndDropCompProps {
  allowMultiple?: boolean;
  onFileData?: (files: imageData[]) => void; // Callback to handle additional file data processing
}

const DragAndDropComp: React.FC<DragAndDropCompProps> = ({
  allowMultiple = true,
  onFileData,
}) => {
  const { control, setValue } = useForm<FormData>({
    defaultValues: {
      files: [],
    },
  });
  const [error, setError] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFilesChange = (selectedFiles: File[]) => {
    setValue("files", selectedFiles, { shouldValidate: true });

    // Generate URLs for image preview
    // const fileUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    const filesWithUrls = selectedFiles.map((file) => ({
      file: file,
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
        htmlFor="photo"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ opacity: isDragOver ? 0.7 : 1 }}
        className={`dragAndDropDiv ${isDragOver ? "bgDragover" : ""}`}
      >
        <img src={dropIcon} alt="Drop here" className="dropIcon" />
        <div className="textContainer">
          <p className="herotextContainer">
            <span className="heroText">Click to upload</span> or drag and drop
          </p>
          <p className="herotextContainer">
            SVG, PNG, JPG, or GIF (max. 800*400px)
          </p>
        </div>
        <Controller
          control={control}
          name="files"
          render={({ field: { onBlur, ref } }) => (
            <input
              type="file"
              id="photo"
              multiple={allowMultiple}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const filteredFiles = files.filter((file) =>
                  ["image/png", "image/jpeg", "image/svg+xml"].includes(
                    file.type
                  )
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
              accept=".png, .jpg, .jpeg, .svg"
            />
          )}
        />
      </label>
      {error && <p>Multiple files not allowed</p>}
    </>
  );
};

export default DragAndDropComp;