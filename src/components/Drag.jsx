import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Drag = ({ onSelectImage, source, defaultValue }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1048576) {
      setErrorMessage("File size exceeds 1MB");
      return;
    }
    setErrorMessage("");
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const syntheticEvent = {
        _reactName: "onChange",
        _targetInst: null,
        type: "change",
        nativeEvent: new Event("change"),
        target: { name: (source === "E" || source === "Up" )?`ImageEv`:'Logo', value: base64String },
      };
      onSelectImage(syntheticEvent);
    };
    reader.readAsDataURL(selectedFile);
    

  }, [onSelectImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-2 border-gray-400 rounded-lg border-dashed p-4">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-600">Déposez l'image ici...</p>
      ) : (
        <div className="">
          <p className="text-gray-600">Faites glisser et déposez une image ici, ou cliquez pour sélectionner</p>
          {(defaultValue && !file) && (<img src={defaultValue} alt="Selected Image" className="mt-2 h-40" />)}
        </div>
      )}
      {file && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Image sélectionnée:</h2>
          <div>
            <img src={URL.createObjectURL(file)} alt="Selected Image" className="mt-2 h-40" />
          </div>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default Drag;

