import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../assets/styles/drop-zone.css";

export const DropZone = ({ setImage, setError }) => {
  const [imageSrc, setImageSrc] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const aspectRatio = image.width / image.height;
        if (Math.abs(aspectRatio - 1) > 0.001) {
          setError('Please upload an image with a 1:1 aspect ratio.');
          return;
        }
        setImageSrc(reader.result);
        setImage(reader.result);
        setError(null);
      };
    };

    reader.readAsDataURL(file);
  }, [setImage, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-file">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        {imageSrc && <img src={imageSrc} alt="Preview" draggable={false} />}
      </div>
    </div>
  );
};